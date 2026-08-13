// Cal.com booking link used by every "book a session/call" CTA site-wide.
export const CAL_BOOKING_URL = 'https://cal.com/stenth/30min';

/* Where the law-firm landing pages send someone who wants to check we're a
   real company (logo and the "Main Site" footer link). These pages are served
   from their own outreach subdomain, so a bare "/" would drop a cold prospect
   onto whatever else that deploy is serving. Point it at the live public site
   instead. Change this to "/" once the main site on this deploy is the one we
   want prospects landing on. */
export const MAIN_SITE_URL = 'https://stenth.com';

/* n8n webhook pinged when a prospect opens their /r/<slug> report, which
   triggers the Telegram hot-lead alert (workflow "05 · Hot-lead Webhook").
   Empty string disables the ping. Live since 2026-07-08. */
export const REPORT_VIEW_WEBHOOK = 'https://n8n.stenth.com/webhook/report-view';
