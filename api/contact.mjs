/* Same-origin lead relay. Browsers post here (immune to ad-block DNS) and
   this function delivers the lead to the Stenth inbox.

   Delivery order, first configured wins:
   1. Gmail/Workspace SMTP via nodemailer (EMAIL_USER + EMAIL_PASS app
      password), same structure the previous stenth.com used.
   2. Resend API (RESEND_API_KEY).
   3. FormSubmit (keyless fallback; Cloudflare 403s most server traffic). */
import nodemailer from 'nodemailer';

const TO = process.env.EMAIL_TO || 'info@stenth.com';

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

  const subject = String(body._subject || 'New website lead');
  const replyTo = typeof body.email === 'string' && body.email.includes('@') ? body.email : undefined;

  // 1. SMTP (Gmail app password), the old site's structure
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: Number(process.env.EMAIL_PORT || 587),
        secure: Number(process.env.EMAIL_PORT || 587) === 465,
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });
      await transporter.sendMail({
        from: `"Stenth Website" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
        to: TO,
        subject,
        text: asLines(body),
        ...(replyTo ? { replyTo } : {}),
      });
      return res.status(200).json({ success: 'true' });
    } catch (err) {
      console.error('smtp error:', err?.message);
      // fall through to the next provider
    }
  }

  // 2. Resend
  if (process.env.RESEND_API_KEY) {
    try {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Stenth Website <onboarding@resend.dev>',
          to: [TO],
          subject,
          text: asLines(body),
          ...(replyTo ? { reply_to: [replyTo] } : {}),
        }),
      });
      if (r.ok) return res.status(200).json({ success: 'true' });
      console.error('resend rejected:', r.status, (await r.text()).slice(0, 300));
    } catch (err) {
      console.error('resend error:', err?.message);
    }
  }

  // 3. FormSubmit (rarely succeeds from datacenters, kept as last resort)
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
    return res.status(502).json({ error: 'All delivery paths failed' });
  }
}
