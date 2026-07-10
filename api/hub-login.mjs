/* Login for /hub, the internal directory page linking to the ops + client
   dashboards. Sets an HttpOnly session cookie on success; hub-check.mjs
   validates it, hub-logout.mjs clears it. Same login/check/logout shape as
   the VPS dashboards (dashboard.stenth.com, blottman.stenth.com), just
   implemented as a Vercel function since this domain has no n8n behind it. */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const PASSWORD = process.env.HUB_PASSWORD;
  const SESSION_SECRET = process.env.HUB_SESSION_SECRET;
  if (!PASSWORD || !SESSION_SECRET) {
    console.error('hub-login: HUB_PASSWORD / HUB_SESSION_SECRET not set in the environment');
    return res.status(500).json({ error: 'Login is not configured yet' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const password = typeof body.password === 'string' ? body.password : '';

  if (password !== PASSWORD) {
    return res.status(401).json({ ok: false });
  }

  res.setHeader(
    'Set-Cookie',
    `hub_session=${SESSION_SECRET}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`
  );
  return res.status(200).json({ ok: true });
}
