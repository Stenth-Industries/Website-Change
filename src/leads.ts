/* Lead submission used by every form on the site.
   Primary path is the same-origin relay (/api/contact) so ad blockers and
   filtered DNS can't kill it; direct FormSubmit is the fallback, which also
   covers local dev where the Vercel function doesn't run. */
export async function submitLead(payload: Record<string, unknown>): Promise<void> {
  const init: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  };

  try {
    const r = await fetch('/api/contact', init);
    if (r.ok) return;
    throw new Error(`relay ${r.status}`);
  } catch {
    const r = await fetch('https://formsubmit.co/ajax/info@stenth.com', init);
    if (!r.ok) throw new Error(`formsubmit ${r.status}`);
    const data = await r.json().catch(() => null);
    if (data && String(data.success) === 'false') throw new Error('formsubmit rejected');
  }
}
