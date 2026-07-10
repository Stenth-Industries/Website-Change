/* Session check for /hub — see hub-login.mjs. */
function getCookie(req, name) {
  const header = req.headers.cookie || '';
  for (const part of header.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return v.join('=');
  }
  return '';
}

export default async function handler(req, res) {
  const SESSION_SECRET = process.env.HUB_SESSION_SECRET;
  if (!SESSION_SECRET) {
    console.error('hub-check: HUB_SESSION_SECRET not set in the environment');
    return res.status(500).json({ error: 'Login is not configured yet' });
  }
  const valid = getCookie(req, 'hub_session') === SESSION_SECRET;
  return res.status(valid ? 200 : 401).json({ ok: valid });
}
