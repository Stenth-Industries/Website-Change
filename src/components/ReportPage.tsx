import React, { useEffect, useRef, useState } from 'react';
import { motion, animate, useInView } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Lock,
  MessageSquareOff,
  Quote,
  CalendarClock,
} from 'lucide-react';
import { CAL_BOOKING_URL, REPORT_VIEW_WEBHOOK } from '../constants';

/* ── Per-prospect report data ─────────────────────────────────────────────
   One JSON file per prospect lives at /r-data/<slug>.json. The nightly n8n
   enrich workflow generates these and commits them via the GitHub API, so a
   Vercel deploy publishes each new report with zero manual steps. Every
   claim rendered here must be verifiable from the source data (rank checks,
   public reviews); never publish estimates as facts. */
type Verdict = 'pass' | 'warn' | 'fail';

interface ReportData {
  business: string;
  suburb: string;
  trade: string;
  keyword: string;
  searchesPerMonth: number;
  position: number;
  aboveYou: { name: string; note?: string }[];
  reviews: {
    rating: number;
    count: number;
    unanswered: number;
    competitorName?: string;
    competitorRating?: number;
    competitorCount?: number;
  };
  findings: { verdict: Verdict; text: string; detail?: string }[];
  stealPoint?: { competitor: string; quote: string; insight: string };
  missedEnquiries: number;
  generatedAt: string;
  expires: string;
}

const VERDICT_COLOR: Record<Verdict, string> = {
  pass: '#4ade80',
  warn: '#fbbf24',
  fail: '#f87171',
};

const VerdictIcon = ({ verdict }: { verdict: Verdict }) =>
  verdict === 'pass' ? (
    <CheckCircle2 size={18} style={{ color: VERDICT_COLOR.pass }} className="flex-shrink-0 mt-0.5" />
  ) : verdict === 'warn' ? (
    <AlertTriangle size={18} style={{ color: VERDICT_COLOR.warn }} className="flex-shrink-0 mt-0.5" />
  ) : (
    <XCircle size={18} style={{ color: VERDICT_COLOR.fail }} className="flex-shrink-0 mt-0.5" />
  );

/* ── Animated count-up (mirrors About.tsx) ───────────────────────────────── */
const CountUp = ({ to }: { to: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{Math.round(val).toLocaleString()}</span>;
};

/* ── The SERP ladder: who Google shows before you ─────────────────────────
   Signature moment of the page. Competitor rows stack above the prospect's
   highlighted row, with a collapsed gap when the prospect sits deep. */
const SerpLadder = ({ data }: { data: ReportData }) => {
  const shown = data.aboveYou.slice(0, 3);
  const gap = data.position - shown.length - 1;

  return (
    <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.02] overflow-hidden">
      <div className="px-7 md:px-9 pt-7 pb-4 border-b border-white/[0.06]">
        <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-brand-light/50">
          Google search · "{data.keyword}"
        </p>
      </div>
      <div>
        {shown.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-baseline gap-5 px-7 md:px-9 py-4 border-b border-white/[0.05]"
          >
            <span className="font-display text-xl text-brand-light/40 w-8 flex-shrink-0">{i + 1}</span>
            <div className="min-w-0">
              <p className="text-brand-light/85 font-medium truncate">{c.name}</p>
              {c.note && <p className="text-xs text-brand-light/40 mt-0.5">{c.note}</p>}
            </div>
          </motion.div>
        ))}
        {gap > 0 && (
          <div className="flex items-center gap-5 px-7 md:px-9 py-3 border-b border-white/[0.05]">
            <span className="w-8 flex-shrink-0 text-brand-light/25 tracking-widest">···</span>
            <p className="text-xs text-brand-light/35">
              {gap} more {gap === 1 ? 'business' : 'businesses'}
            </p>
          </div>
        )}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-baseline gap-5 px-7 md:px-9 py-5 bg-brand-accent/[0.08] border-l-2 border-brand-accent"
        >
          <span className="font-display text-xl text-brand-accent w-8 flex-shrink-0">{data.position}</span>
          <div>
            <p className="text-brand-light font-semibold">{data.business}</p>
            <p className="text-xs text-brand-accent/80 mt-0.5">You are here</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* ── States ──────────────────────────────────────────────────────────────── */
const Shell = ({ children }: { children: React.ReactNode }) => (
  <div className="relative min-h-screen bg-brand-dark text-brand-light">
    <div className="noise-bg" />
    <div className="relative max-w-4xl mx-auto px-6 md:px-10 py-16 md:py-24">{children}</div>
  </div>
);

const Unavailable = () => (
  <Shell>
    <div className="min-h-[60vh] flex flex-col items-start justify-center">
      <p className="font-mono text-xs uppercase tracking-[0.4em] text-brand-accent mb-6">Stenth</p>
      <h1 className="font-display text-4xl md:text-6xl uppercase tracking-tighter leading-[0.95] mb-6">
        This report has expired
      </h1>
      <p className="text-lg text-brand-light/60 max-w-xl mb-10">
        Reports are prepared for one business and taken down after their window closes. If yours
        should still be live, or you want a fresh one, we can rerun it.
      </p>
      <a
        href="mailto:info@stenth.com?subject=Rerun my report"
        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-accent text-brand-dark text-xs uppercase tracking-[0.25em] font-bold hover:shadow-[0_0_40px_rgba(111,156,235,0.5)] transition-all duration-300"
      >
        Request a rerun <ArrowRight size={16} />
      </a>
    </div>
  </Shell>
);

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function ReportPage({ slug }: { slug: string }) {
  const [data, setData] = useState<ReportData | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'missing'>('loading');

  useEffect(() => {
    // Slugs come from the URL; only fetch shapes we generate ourselves.
    if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
      setState('missing');
      return;
    }
    fetch(`/r-data/${slug}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: ReportData) => {
        setData(d);
        setState('ready');
        document.title = `${d.business} · Local Search Report — Stenth`;
      })
      .catch(() => setState('missing'));
  }, [slug]);

  /* Hot-lead signal: a prospect opening their report is the strongest buying
     signal the machine produces. Fire-and-forget to the n8n webhook, which
     pushes the Telegram alert. Silent no-op until the webhook URL is set. */
  useEffect(() => {
    if (state !== 'ready' || !REPORT_VIEW_WEBHOOK) return;
    const payload = JSON.stringify({ slug, at: new Date().toISOString(), ref: document.referrer });
    try {
      if (!navigator.sendBeacon?.(REPORT_VIEW_WEBHOOK, payload)) {
        fetch(REPORT_VIEW_WEBHOOK, { method: 'POST', body: payload, keepalive: true }).catch(() => {});
      }
    } catch {
      /* never let tracking break the page */
    }
  }, [state, slug]);

  if (state === 'loading') return <div className="min-h-screen bg-brand-dark" />;
  if (state === 'missing' || !data) return <Unavailable />;
  if (new Date(data.expires).getTime() < Date.now()) return <Unavailable />;

  const r = data.reviews;
  const bookUrl = `${CAL_BOOKING_URL}?utm_source=report&utm_content=${encodeURIComponent(slug)}`;

  return (
    <Shell>
      {/* ── Header ── */}
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-brand-accent">Stenth</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-light/40 flex items-center gap-2">
            <Lock size={11} /> Private · prepared for {data.business}
          </p>
        </div>
        <h1 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-[0.95] mb-6">
          {data.position - 1} businesses get the call{' '}
          <span className="text-brand-accent">before you do</span>
        </h1>
        <p className="text-lg md:text-xl text-brand-light/70 leading-relaxed max-w-2xl">
          When someone in {data.suburb} searches for {data.trade}, Google shows them{' '}
          {data.position - 1} other companies first. This is what that costs you, measured on{' '}
          {new Date(data.generatedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}.
        </p>
      </motion.header>

      {/* ── The ladder ── */}
      <div className="mt-14">
        <SerpLadder data={data} />
      </div>

      {/* ── Missed enquiries ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 rounded-[2rem] border border-white/[0.08] bg-white/[0.02] p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      >
        <div>
          <p className="font-display text-7xl md:text-8xl tracking-tighter text-brand-accent leading-none">
            ~<CountUp to={data.missedEnquiries} />
          </p>
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-brand-light/50 mt-3">
            Enquiries passing you by each month
          </p>
        </div>
        <p className="text-sm text-brand-light/55 leading-relaxed">
          Around {data.searchesPerMonth.toLocaleString()} people search "{data.keyword}" every
          month. Most clicks go to the top three results. At position {data.position}, your share
          is a rounding error. This estimate is based on published click-through rates by position,
          and winter is when it stings the most.
        </p>
      </motion.div>

      {/* ── Findings ── */}
      <section className="mt-20">
        <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tighter mb-8">
          What we found<span className="text-brand-accent">.</span>
        </h2>
        <div className="space-y-4">
          {data.findings.map((f, i) => (
            <motion.div
              key={f.text}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 md:p-6"
            >
              <VerdictIcon verdict={f.verdict} />
              <div>
                <p className="text-brand-light/85">{f.text}</p>
                {f.detail && <p className="text-sm text-brand-light/45 mt-1">{f.detail}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Reviews: the gap nobody is managing ── */}
      <section className="mt-20">
        <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tighter mb-8">
          {r.competitorName ? <>Your reviews vs theirs<span className="text-brand-accent">.</span></> : <>Your reviews<span className="text-brand-accent">.</span></>}
        </h2>
        <div className={`grid grid-cols-1 gap-4 ${r.competitorName ? 'md:grid-cols-2' : ''}`}>
          <div className="rounded-[2rem] border border-brand-accent/30 bg-brand-accent/[0.05] p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-accent mb-4">
              {data.business}
            </p>
            <p className="font-display text-5xl tracking-tighter">
              {r.rating.toFixed(1)}
              <span className="text-2xl text-brand-light/40"> / {r.count} reviews</span>
            </p>
            {r.unanswered > 0 && (
              <p className="flex items-center gap-2 text-sm mt-5" style={{ color: VERDICT_COLOR.warn }}>
                <MessageSquareOff size={15} className="flex-shrink-0" />
                {r.unanswered} recent {r.unanswered === 1 ? 'review has' : 'reviews have'} no reply from you
              </p>
            )}
          </div>
          {r.competitorName && (
            <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.02] p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-light/40 mb-4">
                {r.competitorName}
              </p>
              <p className="font-display text-5xl tracking-tighter text-brand-light/70">
                {(r.competitorRating ?? 0).toFixed(1)}
                <span className="text-2xl text-brand-light/40"> / {r.competitorCount} reviews</span>
              </p>
              <p className="text-sm text-brand-light/45 mt-5">
                Volume and freshness beat a perfect score. Google reads unanswered reviews as a
                business that stopped paying attention.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── The steal point ── */}
      {data.stealPoint && (
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 rounded-[2rem] border border-white/[0.08] bg-white/[0.02] p-8 md:p-12 relative overflow-hidden"
        >
          <Quote
            aria-hidden
            size={140}
            className="absolute -top-6 -right-4 text-white/[0.03] pointer-events-none"
          />
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand-accent mb-6">
            Where their customers are already unhappy
          </p>
          <blockquote className="text-xl md:text-2xl text-brand-light/85 leading-relaxed italic max-w-2xl">
            "{data.stealPoint.quote}"
          </blockquote>
          <p className="text-sm text-brand-light/40 mt-4">
            Public review left for {data.stealPoint.competitor}
          </p>
          <p className="text-brand-light/65 leading-relaxed mt-6 max-w-2xl border-l-2 border-brand-accent/40 pl-6">
            {data.stealPoint.insight}
          </p>
        </motion.section>
      )}

      {/* ── CTA ── */}
      <section className="mt-24 text-center">
        <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter leading-[0.95] mb-6">
          Every week at position {data.position}{' '}
          <span className="text-brand-accent">is a week they grow instead</span>
        </h2>
        <p className="text-lg text-brand-light/60 max-w-xl mx-auto mb-10">
          We take on a handful of {data.suburb} area businesses per trade, one per patch, so we
          never work for you and your competitor at once. Fifteen minutes to walk through this
          report is enough to know if it's a fit.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={bookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-brand-accent text-brand-dark text-xs uppercase tracking-[0.25em] font-bold hover:shadow-[0_0_40px_rgba(111,156,235,0.5)] transition-all duration-300"
          >
            <CalendarClock size={16} /> Book a 15-minute walkthrough
          </a>
          <a
            href={`mailto:info@stenth.com?subject=${encodeURIComponent(`Report questions: ${data.business}`)}`}
            className="inline-flex items-center gap-3 px-9 py-4 rounded-full border border-white/15 text-brand-light/80 text-xs uppercase tracking-[0.25em] font-bold hover:border-brand-accent/60 transition-colors duration-300"
          >
            Reply by email instead
          </a>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-light/30 mt-12">
          Private link · not indexed · comes down{' '}
          {new Date(data.expires).toLocaleDateString('en-AU', { day: 'numeric', month: 'long' })}
        </p>
      </section>
    </Shell>
  );
}
