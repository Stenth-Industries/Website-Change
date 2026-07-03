import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Search, CheckCircle2, AlertTriangle, XCircle, RefreshCw } from 'lucide-react';
import { CAL_BOOKING_URL } from '../constants';

/* Optional PageSpeed Insights API key (free, 25k queries/day). Without it the
   scan uses Google's shared anonymous quota, which throttles quickly. Safe to
   expose client-side when referrer-restricted to stenth.com in Cloud Console. */
const PSI_KEY: string | undefined = (import.meta as any).env?.VITE_PSI_KEY;

/* ── Scoring ──────────────────────────────────────────────────────────────
   Lighthouse convention: 0–49 poor, 50–89 needs work, 90–100 good.
   Status colors always ship with the number and a label — never color alone. */
const tone = (score: number) =>
  score >= 90
    ? { color: '#4ade80', label: 'Good' }
    : score >= 50
      ? { color: '#fbbf24', label: 'Needs work' }
      : { color: '#f87171', label: 'Poor' };

type Verdict = 'pass' | 'warn' | 'fail';

interface Finding {
  verdict: Verdict;
  text: string;
  detail?: string;
}

interface ScanResult {
  url: string;
  scores: { key: string; label: string; value: number }[];
  findings: Finding[];
}

/* ── PSI response → plain-language findings ──────────────────────────────── */
function buildResult(pageUrl: string, data: any): ScanResult {
  const lh = data.lighthouseResult;
  const cats = lh.categories;
  const audits = lh.audits;

  const scores = [
    { key: 'performance', label: 'Speed', value: Math.round((cats.performance?.score ?? 0) * 100) },
    { key: 'seo', label: 'SEO', value: Math.round((cats.seo?.score ?? 0) * 100) },
    { key: 'accessibility', label: 'Accessibility', value: Math.round((cats.accessibility?.score ?? 0) * 100) },
    { key: 'best-practices', label: 'Best Practices', value: Math.round((cats['best-practices']?.score ?? 0) * 100) },
  ];

  const findings: Finding[] = [];
  const audit = (id: string) => audits[id];
  const v = (score: number | null): Verdict => (score === null ? 'warn' : score >= 0.9 ? 'pass' : score >= 0.5 ? 'warn' : 'fail');

  const lcp = audit('largest-contentful-paint');
  if (lcp?.displayValue) {
    findings.push({
      verdict: v(lcp.score),
      text: `On a phone, your main content appears in ${lcp.displayValue.trim()}`,
      detail: lcp.score >= 0.9 ? 'Fast enough that visitors stay.' : 'Every extra second costs enquiries. Under 2.5s is the target.',
    });
  }

  const https = audit('is-on-https');
  if (https) {
    findings.push({
      verdict: https.score === 1 ? 'pass' : 'fail',
      text: https.score === 1 ? 'Your site is served securely over HTTPS' : 'Your site is not fully secure (HTTPS)',
      detail: https.score === 1 ? undefined : 'Browsers warn visitors away from insecure sites, and Google ranks them lower.',
    });
  }

  const viewport = audit('viewport');
  if (viewport) {
    findings.push({
      verdict: viewport.score === 1 ? 'pass' : 'fail',
      text: viewport.score === 1 ? 'Your site is set up for mobile screens' : 'Your site is not configured for mobile screens',
      detail: viewport.score === 1 ? undefined : 'Most searches for local services happen on a phone.',
    });
  }

  const metaDesc = audit('meta-description');
  if (metaDesc) {
    findings.push({
      verdict: metaDesc.score === 1 ? 'pass' : 'fail',
      text: metaDesc.score === 1 ? 'Your pages tell Google what they are about (meta description)' : 'Your homepage has no meta description',
      detail: metaDesc.score === 1 ? undefined : 'This is the text Google shows under your name in results. Right now Google is guessing.',
    });
  }

  const title = audit('document-title');
  if (title && title.score !== 1) {
    findings.push({
      verdict: 'fail',
      text: 'Your homepage is missing a proper title tag',
      detail: 'The title is the single strongest on-page ranking signal.',
    });
  }

  const weight = audit('total-byte-weight');
  if (weight?.displayValue && weight.score !== null && weight.score < 0.9) {
    findings.push({
      verdict: v(weight.score),
      text: `Your page weighs ${weight.displayValue.replace('Total size was ', '').trim()}`,
      detail: 'Heavy pages are slow on mobile data, and slow pages lose visitors.',
    });
  }

  const blocking = audit('render-blocking-resources');
  if (blocking && blocking.score !== null && blocking.score < 0.9 && blocking.displayValue) {
    const saving = blocking.displayValue.replace(/^Potential savings of\s*/i, '').trim();
    findings.push({
      verdict: v(blocking.score),
      text: `Code is blocking your page from appearing (${saving} of potential savings)`,
      detail: 'Visitors stare at a blank screen while this loads.',
    });
  }

  const alt = audit('image-alt');
  if (alt && alt.score !== null && alt.score < 1) {
    findings.push({
      verdict: v(alt.score),
      text: 'Some images are invisible to Google and screen readers (missing alt text)',
    });
  }

  // Keep the list focused: worst first, cap at 7
  const order: Record<Verdict, number> = { fail: 0, warn: 1, pass: 2 };
  findings.sort((a, b) => order[a.verdict] - order[b.verdict]);
  return { url: pageUrl, scores, findings: findings.slice(0, 7) };
}

/* ── Score dial ───────────────────────────────────────────────────────────── */
const Dial = ({ label, value, delay }: { key?: React.Key; label: string; value: number; delay: number }) => {
  const t = tone(value);
  const R = 42;
  const C = 2 * Math.PI * R;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-3 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6"
    >
      <div className="relative w-28 h-28">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="7" />
          <motion.circle
            cx="50" cy="50" r={R} fill="none" stroke={t.color} strokeWidth="7" strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={{ strokeDashoffset: C * (1 - value / 100) }}
            transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-3xl">{value}</span>
        </div>
      </div>
      <div className="text-center">
        <p className="font-sans text-sm font-semibold">{label}</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] mt-1" style={{ color: t.color }}>
          {t.label}
        </p>
      </div>
    </motion.div>
  );
};

const VerdictIcon = ({ verdict }: { verdict: Verdict }) =>
  verdict === 'pass' ? (
    <CheckCircle2 size={18} style={{ color: '#4ade80' }} className="flex-shrink-0 mt-0.5" />
  ) : verdict === 'warn' ? (
    <AlertTriangle size={18} style={{ color: '#fbbf24' }} className="flex-shrink-0 mt-0.5" />
  ) : (
    <XCircle size={18} style={{ color: '#f87171' }} className="flex-shrink-0 mt-0.5" />
  );

/* ── Scanning progress messages ──────────────────────────────────────────── */
const SCAN_STEPS = [
  'Loading your site on a simulated phone…',
  'Measuring how fast content appears…',
  'Checking what Google can see…',
  'Testing mobile usability…',
  'Scoring against 150+ checks…',
  'Almost there: compiling your report…',
];

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function ScanPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [phase, setPhase] = useState<'idle' | 'scanning' | 'done' | 'error'>('idle');
  const [stepIdx, setStepIdx] = useState(0);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    document.title = 'Stenth Scan — Free 60-Second Website Check';
  }, []);

  useEffect(() => {
    if (phase !== 'scanning') return;
    const id = setInterval(() => setStepIdx((i) => Math.min(i + 1, SCAN_STEPS.length - 1)), 5000);
    return () => clearInterval(id);
  }, [phase]);

  const runScan = async (e: React.FormEvent) => {
    e.preventDefault();
    let target = (inputRef.current?.value ?? '').trim();
    if (!target) return;
    if (!/^https?:\/\//i.test(target)) target = 'https://' + target;
    try {
      new URL(target);
    } catch {
      setErrorMsg("That doesn't look like a website address. Try something like yourfirm.com.au");
      setPhase('error');
      return;
    }

    setPhase('scanning');
    setStepIdx(0);
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 75000);

    try {
      const api =
        'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=' +
        encodeURIComponent(target) +
        '&strategy=mobile&category=PERFORMANCE&category=SEO&category=ACCESSIBILITY&category=BEST_PRACTICES' +
        (PSI_KEY ? '&key=' + encodeURIComponent(PSI_KEY) : '');
      const res = await fetch(api, { signal: controller.signal });
      if (!res.ok) {
        if (res.status === 429) {
          throw new Error(
            "Google's free scan quota is used up for the moment. Try again in a few minutes, or skip the queue and book the full audit instead."
          );
        }
        const body = await res.json().catch(() => null);
        throw new Error(body?.error?.message || `Scan failed (${res.status})`);
      }
      const data = await res.json();
      if (!data.lighthouseResult) throw new Error('Google could not load that site. Check the address and try again.');
      setResult(buildResult(target, data));
      setPhase('done');
    } catch (err: any) {
      setErrorMsg(
        err?.name === 'AbortError'
          ? 'The scan timed out. The site may be very slow, or it blocks automated tests.'
          : err?.message || 'Something went wrong running the scan.'
      );
      setPhase('error');
    } finally {
      clearTimeout(timeout);
    }
  };

  const overall = result ? Math.round(result.scores.reduce((s, x) => s + x.value, 0) / result.scores.length) : 0;

  return (
    <div className="relative min-h-screen bg-brand-dark text-brand-light font-sans">
      <div className="noise-bg" />

      {/* ── Top bar ───────────────────────────────────────────────────── */}
      <header className="relative z-20 flex items-center justify-between px-6 md:px-12 py-6">
        <a href="/" className="flex items-center gap-3">
          <img src="/Logo.png" alt="Stenth" className="w-8 h-8 object-contain" />
          <span className="font-display text-xl tracking-tighter">STENTH</span>
        </a>
        <a
          href={CAL_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs uppercase tracking-[0.3em] font-bold text-brand-accent border border-brand-accent/30 px-5 py-2.5 rounded-full hover:bg-brand-accent hover:text-brand-dark transition-all duration-300"
        >
          Book Free Session
        </a>
      </header>

      <main className="relative z-10 px-6 md:px-12 pb-24">
        {/* ── Hero + input ─────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto text-center pt-10 md:pt-16 pb-12">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-brand-accent mb-6">Stenth Scan</p>
          <h1 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-[0.95] mb-6">
            How healthy is <span className="text-brand-accent">your website?</span>
          </h1>
          <p className="text-lg md:text-xl text-brand-light/70 leading-relaxed max-w-2xl mx-auto mb-10">
            Real data from Google's own testing engine, translated into plain
            English. About 60 seconds. No email required.
          </p>

          <form onSubmit={runScan} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <div className="flex-1 flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-6 py-4 focus-within:border-brand-accent/60 transition-colors">
              <Search size={16} className="text-white/40 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                name="site"
                placeholder="yourfirm.com.au"
                autoComplete="url"
                className="w-full bg-transparent outline-none text-brand-light placeholder:text-white/30 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={phase === 'scanning'}
              className="px-8 py-4 rounded-full bg-brand-accent text-brand-dark text-xs uppercase tracking-[0.3em] font-bold hover:shadow-[0_0_40px_rgba(111,156,235,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {phase === 'scanning' ? 'Scanning…' : 'Scan My Site'}
            </button>
          </form>
        </section>

        {/* ── States ───────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {phase === 'scanning' && (
            <motion.section
              key="scanning"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-xl mx-auto text-center py-16"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                className="w-10 h-10 mx-auto mb-8 rounded-full border-2 border-white/10 border-t-brand-accent"
              />
              <AnimatePresence mode="wait">
                <motion.p
                  key={stepIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="font-mono text-sm text-brand-light/70"
                >
                  {SCAN_STEPS[stepIdx]}
                </motion.p>
              </AnimatePresence>
              <p className="mt-4 text-xs text-white/30 font-mono uppercase tracking-[0.2em]">
                Google runs a full test of your live site — usually 20 to 40 seconds
              </p>
            </motion.section>
          )}

          {phase === 'error' && (
            <motion.section
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-xl mx-auto text-center py-12"
            >
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
                <AlertTriangle size={22} style={{ color: '#fbbf24' }} className="mx-auto mb-4" />
                <p className="text-brand-light/80 mb-6">{errorMsg}</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                  <button
                    onClick={() => setPhase('idle')}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-bold text-brand-accent"
                  >
                    <RefreshCw size={14} /> Try again
                  </button>
                  <a
                    href={CAL_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-accent text-brand-dark text-xs uppercase tracking-[0.3em] font-bold hover:shadow-[0_0_40px_rgba(111,156,235,0.5)] transition-all duration-300"
                  >
                    Book the Full Audit <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </motion.section>
          )}

          {phase === 'done' && result && (
            <motion.section
              key="done"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-5xl mx-auto"
            >
              {/* Verdict line */}
              <div className="text-center mb-10">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-3">
                  {result.url.replace(/^https?:\/\//, '').replace(/\/$/, '')} · mobile test
                </p>
                <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight">
                  Overall: <span style={{ color: tone(overall).color }}>{overall}/100 · {tone(overall).label}</span>
                </h2>
              </div>

              {/* Dials */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {result.scores.map((s, i) => (
                  <Dial key={s.key} label={s.label} value={s.value} delay={i * 0.08} />
                ))}
              </div>

              {/* Findings */}
              <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.02] p-8 md:p-10 mb-12">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50 mb-6">
                  What we found
                </p>
                <ul className="space-y-5">
                  {result.findings.map((f, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <VerdictIcon verdict={f.verdict} />
                      <div>
                        <p className="text-brand-light/85">{f.text}</p>
                        {f.detail && <p className="text-sm text-brand-light/45 mt-1">{f.detail}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Close */}
              <div className="rounded-[2rem] border border-brand-accent/25 bg-brand-accent/[0.04] p-8 md:p-12 text-center">
                <h3 className="font-display text-3xl md:text-5xl uppercase tracking-tighter leading-none mb-5">
                  The scan sees your code.<br />
                  <span className="text-brand-accent">The full audit sees your market.</span>
                </h3>
                <p className="text-brand-light/70 max-w-2xl mx-auto leading-relaxed mb-8">
                  This 60-second scan covers what a machine can measure. The full audit
                  adds what wins clients: where you rank for the searches that matter,
                  how your Google Business Profile compares to competitors, and where
                  your market's paid traffic actually goes. Free, and the findings are
                  yours to keep.
                </p>
                <a
                  href={CAL_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-accent text-brand-dark text-xs uppercase tracking-[0.3em] font-bold hover:shadow-[0_0_40px_rgba(111,156,235,0.5)] transition-all duration-300"
                >
                  Book the Full Audit <ArrowRight size={16} />
                </a>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* ── Footer strip ─────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/[0.06] px-6 md:px-12 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/Logo.png" alt="Stenth" className="w-6 h-6 object-contain opacity-60" />
            <span className="text-xs text-brand-light/40 uppercase tracking-widest">
              © 2026 Stenth · Powered by Google PageSpeed data
            </span>
          </div>
          <div className="flex gap-8 text-xs text-brand-light/40 uppercase tracking-widest">
            <a href="/" className="hover:text-brand-light transition-colors">Main Site</a>
            <a href="/law-firms" className="hover:text-brand-light transition-colors">For Law Firms</a>
            <a href="/privacy.html" className="hover:text-brand-light transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
