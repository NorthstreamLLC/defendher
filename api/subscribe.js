// Vercel serverless function: POST /api/subscribe
// Validates the email, drops bot submissions, and appends a row to the Google Sheet through
// an Apps Script web app (see scripts/google-apps-script.gs).
// Env vars (set in Vercel): GOOGLE_SCRIPT_URL, SUBSCRIBE_SECRET

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
  const { email, source, website } = body;

  // Honeypot: real visitors never fill this hidden field.
  if (website) return res.status(200).json({ ok: true });

  const clean = String(email || '').trim().toLowerCase();
  if (clean.length > 254 || !EMAIL_RE.test(clean)) {
    return res.status(400).json({ ok: false, error: 'invalid_email' });
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
      body: JSON.stringify({
        secret: process.env.SUBSCRIBE_SECRET || '',
        email: clean,
        source: String(source || '').slice(0, 60),
        page: String(req.headers.referer || '').slice(0, 200),
      }),
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
