import puppeteer from 'puppeteer-core';

const OUT = 'C:/Users/anshr/AppData/Local/Temp/claude/D--stenth-web-change';

const mockPsi = (perf, seo, a11y, bp) => JSON.stringify({
  lighthouseResult: {
    categories: {
      performance: { score: perf }, seo: { score: seo },
      accessibility: { score: a11y }, 'best-practices': { score: bp },
    },
    audits: {
      'largest-contentful-paint': { score: 0.31, displayValue: '5.2 s' },
      'is-on-https': { score: 1 },
      viewport: { score: 1 },
      'meta-description': { score: 0 },
      'document-title': { score: 1 },
      'total-byte-weight': { score: 0.4, displayValue: 'Total size was 4,812 KiB' },
      'render-blocking-resources': { score: 0.5, displayValue: 'Potential savings of 1,240 ms' },
      'image-alt': { score: 0.5 },
    },
  },
});

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--window-size=1440,900'],
  defaultViewport: { width: 1440, height: 900 },
});
const errors = [];
const page = await browser.newPage();
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

// Face-off scan via mocked PSI: first request = you (weak), second = them (strong)
let n = 0;
await page.setRequestInterception(true);
page.on('request', (r) => {
  if (r.url().includes('pagespeedonline')) {
    n++;
    const body = r.url().includes('rival') ? mockPsi(0.91, 0.95, 0.92, 0.96) : mockPsi(0.43, 0.78, 0.91, 0.96);
    r.respond({ status: 200, contentType: 'application/json', headers: { 'Access-Control-Allow-Origin': '*' }, body });
  } else r.continue();
});
await page.goto('http://localhost:3000/scan?site=demo-firm.com.au&vs=rival-firm.com.au', { waitUntil: 'networkidle0', timeout: 45000 });
await page.waitForFunction(() => /head to head/i.test(document.body.innerText), { timeout: 25000 });
await new Promise((r) => setTimeout(r, 2000));
await page.screenshot({ path: `${OUT}/v3-1-faceoff.png`, fullPage: true });
console.log('PSI requests:', n, '| verdict line:', await page.evaluate(() => {
  const m = document.body.innerText.match(/YOU:.*|You:.*/);
  return m ? m[0].slice(0, 60) : 'NOT FOUND';
}));

// Email report card: fill and submit (goes to FormSubmit for real from localhost origin, which is activated)
await page.type('input[type="email"]', 'test-prospect@example.com');
await page.evaluate(() => {
  const btns = [...document.querySelectorAll('button')];
  btns.find((b) => /send it/i.test(b.textContent))?.click();
});
await page.waitForFunction(() => /on its way|didn't go through/i.test(document.body.innerText), { timeout: 30000 }).catch(() => {});
console.log('Email card state:', await page.evaluate(() =>
  /on its way/i.test(document.body.innerText) ? 'SENT' : /didn't go through/i.test(document.body.innerText) ? 'ERROR' : 'UNKNOWN'
));

// ROI calculator
const page2 = await browser.newPage();
page2.on('pageerror', (e) => errors.push('roi pageerror: ' + e.message));
await page2.goto('http://localhost:3000/roi', { waitUntil: 'networkidle0', timeout: 45000 });
await new Promise((r) => setTimeout(r, 1500));
await page2.screenshot({ path: `${OUT}/v3-2-roi.png`, fullPage: true });
const roiText = await page2.evaluate(() => document.body.innerText);
console.log('ROI defaults show $2,000/enquiry:', /\$2,000/.test(roiText), '| $240,000\\/yr for +10:', /\$240,000/.test(roiText));

await browser.close();
console.log('--- JS errors:', errors.length ? errors.join('\n') : 'none');
