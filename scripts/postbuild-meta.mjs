/* Generates per-route HTML files from dist/index.html with route-specific
   title, description, canonical, and social tags. vercel.json rewrites each
   route to its generated file, so shared links preview correctly while the
   same SPA bundle handles rendering.

   Practice-area copy lives in src/practices.ts; keep titles in sync. */
import fs from 'node:fs';
import path from 'node:path';

const ORIGIN = 'https://stenth.com';

const ROUTES = [
  {
    route: 'scan',
    title: 'Free 60-Second Website Scan — Stenth',
    desc: "Test any website's speed, SEO, mobile, and accessibility in 60 seconds. Real Google data in plain English. No email required, competitor comparison included.",
  },
  {
    route: 'roi',
    title: 'Enquiry Value Calculator — Stenth',
    desc: 'What is one enquiry actually worth to your firm? Three numbers you already know, one answer most firms have never calculated.',
  },
  {
    route: 'law-firms',
    title: 'Digital Marketing for Melbourne Law Firms — Stenth',
    desc: 'Local SEO, Google Ads, and websites that convert enquiries, built for Melbourne law firms. Free audit with findings you keep, no lock-in contracts.',
  },
  {
    route: 'law-firms/family-law',
    title: 'Family Law Firm Marketing Melbourne — Stenth',
    desc: 'Marketing for Melbourne family law firms: own the searches parents make late at night. Free audit, founder-led, no lock-in.',
  },
  {
    route: 'law-firms/immigration-law',
    title: 'Immigration Law Firm Marketing Melbourne — Stenth',
    desc: 'Marketing for Melbourne immigration lawyers: be the firm visa applicants keep seeing. Free audit, founder-led, no lock-in.',
  },
  {
    route: 'law-firms/personal-injury',
    title: 'Personal Injury Firm Marketing Melbourne — Stenth',
    desc: 'Marketing for Melbourne personal injury firms: win the searches injured people make once. Free audit, founder-led, no lock-in.',
  },
  {
    route: 'law-firms/conveyancing',
    title: 'Conveyancing Marketing Melbourne — Stenth',
    desc: 'Marketing for Melbourne conveyancers: get the call before the price-shoppers move on. Free audit, founder-led, no lock-in.',
  },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const base = fs.readFileSync('dist/index.html', 'utf8');
for (const { route, title, desc } of ROUTES) {
  const url = `${ORIGIN}/${route}`;
  const html = base
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description"[\s\S]*?content=")[^"]*(")/, `$1${esc(desc)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description"[\s\S]*?content=")[^"]*(")/, `$1${esc(desc)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta name="twitter:description"[\s\S]*?content=")[^"]*(")/, `$1${esc(desc)}$2`);

  const out = path.join('dist', `${route}.html`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log('meta:', out);
}
