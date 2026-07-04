/* Same-origin lead relay. Browsers post here (immune to ad-block DNS) and
   this function delivers the lead to info@stenth.com.

   Primary: Resend API when RESEND_API_KEY is set in the environment.
   Fallback: FormSubmit (works only from real browsers; Cloudflare 403s
   datacenter traffic, so this path exists for completeness, not reliance). */
const TO = 'info@stenth.com';

const asLines = (body) =>
  Object.entries(body)
    .filter(([k]) => !k.startsWith('_'))
    .map(([k, v]) => `${k}: ${String(v)}`)
    .join('\n');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  if (JSON.stringify(body).length > 10000) {
    return res.status(413).json({ error: 'Payload too large' });
  }

  const key = process.env.RESEND_API_KEY;
  if (key) {
    try {
      const replyTo = typeof body.email === 'string' && body.email.includes('@') ? body.email : undefined;
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Stenth Website <onboarding@resend.dev>',
          to: [TO],
          subject: String(body._subject || 'New website lead'),
          text: asLines(body),
          ...(replyTo ? { reply_to: [replyTo] } : {}),
        }),
      });
      if (r.ok) return res.status(200).json({ success: 'true' });
      console.error('resend rejected:', r.status, (await r.text()).slice(0, 300));
      return res.status(502).json({ error: 'Send failed' });
    } catch (err) {
      console.error('resend error:', err?.message);
      return res.status(502).json({ error: 'Send failed' });
    }
  }

  // No Resend key configured: attempt FormSubmit (usually 403s from servers).
  try {
    const r = await fetch(`https://formsubmit.co/ajax/${TO}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _captcha: 'false', _template: 'table', ...body }),
    });
    const data = await r.json().catch(() => ({}));
    const ok = r.ok && String(data.success) !== 'false';
    return res.status(ok ? 200 : 502).json(data);
  } catch {
    return res.status(502).json({ error: 'Relay failed' });
  }
}
