// Vercel serverless function: POST /api/subscribe
// Handles two kinds of submissions and writes them to a Google Sheet through an Apps Script
// web app (see scripts/google-apps-script.gs):
//   - email signups (default)           -> "Subscribers" tab
//   - contact messages (type: 'message') -> "Messages" tab, and the script emails the owner
// Env vars (set in Vercel): GOOGLE_SCRIPT_URL, SUBSCRIBE_SECRET

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default async function handler(req, res) {
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

  if (type === 'message') {
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

  const url = process.env.GOOGLE_SCRIPT_URL;
  if (!url) {
    console.error('[subscribe] GOOGLE_SCRIPT_URL is not set');
    return res.status(500).json({ ok: false, error: 'not_configured' });
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.ok !== true) {
      console.error('[subscribe] sheet rejected the row', response.status, result);
      return res.status(502).json({ ok: false, error: 'storage_failed' });
    }
    return res.status(200).json({ ok: true, duplicate: Boolean(result.duplicate) });
  } catch (err) {
    console.error('[subscribe] request failed', err);
    return res.status(502).json({ ok: false, error: 'storage_failed' });
  }
}

function safeParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}
