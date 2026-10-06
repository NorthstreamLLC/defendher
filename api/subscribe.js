// Vercel serverless function: POST /api/subscribe
// Handles two kinds of submissions and writes them to a Google Sheet through an Apps Script
// web app (see scripts/google-apps-script.gs):
//   - email signups (default)            -> "Subscribers" tab
//   - contact messages (type: 'message') -> "Messages" tab, and the script emails the owner
// GET /api/subscribe?check=1 reports which script version is deployed (writes nothing).
// Env vars (set in Vercel): GOOGLE_SCRIPT_URL, SUBSCRIBE_SECRET

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default async function handler(req, res) {
  const url = process.env.GOOGLE_SCRIPT_URL;

  if (req.method === 'GET' && req.query && req.query.check === '1') {
    if (!url) return res.status(500).json({ ok: false, error: 'not_configured' });
    const result = await callScript(url, { secret: process.env.SUBSCRIBE_SECRET || '', type: 'ping' });
    return res.status(200).json({
      ok: Boolean(result && result.ok),
      scriptVersion: result && result.version ? result.version : 'old or unreachable',
      detail: result && !result.ok ? result.error || null : null,
    });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
  const { email, source, website, type, name, message } = body;

  // Honeypot: real visitors never fill this hidden field.
  if (website) return res.status(200).json({ ok: true });

  const clean = String(email || '').trim().toLowerCase();
  if (clean.length > 254 || !EMAIL_RE.test(clean)) {
    return res.status(400).json({ ok: false, error: 'invalid_email' });
  }

  const payload = {
    secret: process.env.SUBSCRIBE_SECRET || '',
    email: clean,
    page: String(req.headers.referer || '').slice(0, 200),
  };

  const isMessage = type === 'message';
  if (isMessage) {
    const cleanName = String(name || '').trim().slice(0, 100);
    const cleanMessage = String(message || '').trim().slice(0, 3000);
    if (!cleanName || !cleanMessage) {
      return res.status(400).json({ ok: false, error: 'missing_fields' });
    }
    payload.type = 'message';
    payload.name = cleanName;
    payload.message = cleanMessage;
  } else {
    payload.type = 'subscribe';
    payload.source = String(source || '').slice(0, 60);
  }

  if (!url) {
    console.error('[subscribe] GOOGLE_SCRIPT_URL is not set');
    return res.status(500).json({ ok: false, error: 'not_configured' });
  }

  // Signups are safe to retry because the script ignores duplicates. Messages are not retried
  // so nobody gets the same message twice.
  let result = await callScript(url, payload);
  if (!result && !isMessage) result = await callScript(url, payload);

  if (!result || result.ok !== true) {
    console.error('[subscribe] sheet did not confirm the row', JSON.stringify(result));
    return res.status(502).json({ ok: false, error: 'storage_failed' });
  }
  return res.status(200).json({ ok: true, duplicate: Boolean(result.duplicate) });
}

// Apps Script answers a POST with a redirect to a one-time result URL. Follow it by hand so a
// flaky second hop can be retried without re-sending the data.
async function callScript(url, payload) {
  try {
    const first = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'manual',
    });

    if (first.status >= 300 && first.status < 400) {
      const location = first.headers.get('location');
      if (!location) return null;
      for (let attempt = 0; attempt < 3; attempt += 1) {
        try {
          const second = await fetch(location, { redirect: 'follow' });
          const parsed = safeParse(await second.text());
          if (parsed && typeof parsed === 'object' && 'ok' in parsed) return parsed;
        } catch (err) {
          console.error('[subscribe] reading result failed', attempt, String(err));
        }
        await sleep(400 * (attempt + 1));
      }
      return null;
    }

    const parsed = safeParse(await first.text());
    return parsed && typeof parsed === 'object' && 'ok' in parsed ? parsed : null;
  } catch (err) {
    console.error('[subscribe] request failed', String(err));
    return null;
  }
}

function safeParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
