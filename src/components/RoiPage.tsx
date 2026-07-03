import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calculator, TrendingUp } from 'lucide-react';
import { CAL_BOOKING_URL } from '../constants';

const fmt = (n: number) => '$' + Math.round(n).toLocaleString();

/* One labelled slider + number pair */
const Field = ({
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
}: {
  label: string;
  hint: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
}) => (
  <div>
    <div className="flex items-baseline justify-between mb-2 gap-4">
      <label className="font-mono text-xs uppercase tracking-[0.25em] text-brand-light/60">{label}</label>
      <div className="flex items-center gap-1 text-brand-light font-display text-2xl">
        {prefix && <span className="text-brand-light/50 text-lg">{prefix}</span>}
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="w-28 bg-transparent text-right outline-none border-b border-white/15 focus:border-brand-accent/60 transition-colors"
          aria-label={label}
        />
        {suffix && <span className="text-brand-light/50 text-lg">{suffix}</span>}
      </div>
    </div>
    <input
      type="range"
      value={Math.min(value, max)}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onChange(Number(e.target.value))}
      aria-label={`${label} slider`}
      className="w-full accent-[#6F9CEB]"
    />
    <p className="mt-2 text-xs text-brand-light/35">{hint}</p>
  </div>
);

export default function RoiPage() {
  const [caseValue, setCaseValue] = useState(8000);
  const [closeRate, setCloseRate] = useState(25);
  const [enquiries, setEnquiries] = useState(20);

  useEffect(() => {
    document.title = 'Enquiry Value Calculator — Stenth';
  }, []);

  const perEnquiry = caseValue * (closeRate / 100);
  const monthlyPipeline = perEnquiry * enquiries;
  const tenMoreMonthly = perEnquiry * 10;
  const tenMoreAnnual = tenMoreMonthly * 12;
  const maxCostPerEnquiry = perEnquiry / 5;

  const results = [
    {
      label: 'Each enquiry is worth',
      value: fmt(perEnquiry),
      note: 'Average value × close rate. This is the number every marketing dollar answers to.',
    },
    {
      label: 'Your current monthly pipeline',
      value: fmt(monthlyPipeline),
      note: 'What this month’s enquiries turn into at your close rate.',
    },
    {
      label: '10 more enquiries a month',
      value: fmt(tenMoreAnnual) + ' / yr',
      note: `${fmt(tenMoreMonthly)} a month in new revenue. This is the gap visibility decides.`,
    },
    {
      label: 'You can pay up to',
      value: fmt(maxCostPerEnquiry) + ' / enquiry',
      note: 'And still make 5x on every marketing dollar. Most firms have far more headroom than they think.',
    },
  ];

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
        <section className="max-w-4xl mx-auto text-center pt-10 md:pt-16 pb-14">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-brand-accent mb-6 flex items-center justify-center gap-2">
            <Calculator size={14} /> Enquiry Value Calculator
          </p>
          <h1 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-[0.95] mb-6">
            What is one enquiry <span className="text-brand-accent">actually worth?</span>
          </h1>
          <p className="text-lg md:text-xl text-brand-light/70 leading-relaxed max-w-2xl mx-auto">
            Three numbers you already know. One answer most firms have never
            calculated. Adjust the sliders to match your practice.
          </p>
        </section>

        <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:p-10 space-y-10"
          >
            <Field
              label="Average client value"
              hint="Total fees from a typical new client or matter."
              value={caseValue}
              onChange={setCaseValue}
              min={500}
              max={100000}
              step={500}
              prefix="$"
            />
            <Field
              label="Enquiry close rate"
              hint="Of the people who call or enquire, how many become clients?"
              value={closeRate}
              onChange={setCloseRate}
              min={5}
              max={90}
              step={5}
              suffix="%"
            />
            <Field
              label="Enquiries per month"
              hint="Calls, forms, and emails from potential new clients."
              value={enquiries}
              onChange={setEnquiries}
              min={1}
              max={200}
              step={1}
            />
          </motion.div>

          {/* Outputs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2rem] border border-brand-accent/20 bg-brand-accent/[0.03] p-8 md:p-10"
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand-accent mb-8 flex items-center gap-2">
              <TrendingUp size={13} /> Your numbers
            </p>
            <div className="space-y-8">
              {results.map((r) => (
                <div key={r.label}>
                  <p className="text-sm text-brand-light/55 mb-1">{r.label}</p>
                  <p className="font-display text-3xl md:text-4xl tracking-tight text-brand-light mb-1.5">{r.value}</p>
                  <p className="text-xs text-brand-light/40 leading-relaxed">{r.note}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Close */}
        <section className="max-w-6xl mx-auto mt-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:p-12 text-center">
            <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tighter leading-none mb-5">
              Now you know the stakes.<br />
              <span className="text-brand-accent">Find out where the enquiries go.</span>
            </h2>
            <p className="text-brand-light/70 max-w-2xl mx-auto leading-relaxed mb-8">
              Every month of weak visibility costs you the numbers above. The free
              audit shows exactly where your market's enquiries land today: who ranks,
              who runs ads, and where you sit. The findings are yours to keep.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-5">
              <a
                href={CAL_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-accent text-brand-dark text-xs uppercase tracking-[0.3em] font-bold hover:shadow-[0_0_40px_rgba(111,156,235,0.5)] transition-all duration-300"
              >
                Book the Free Audit <ArrowRight size={16} />
              </a>
              <a
                href="/scan"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-bold text-brand-accent hover:underline"
              >
                Or scan your site first <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer strip ─────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/[0.06] px-6 md:px-12 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/Logo.png" alt="Stenth" className="w-6 h-6 object-contain opacity-60" />
            <span className="text-xs text-brand-light/40 uppercase tracking-widest">
              © 2026 Stenth · Canada &amp; Australia
            </span>
          </div>
          <div className="flex gap-8 text-xs text-brand-light/40 uppercase tracking-widest">
            <a href="/" className="hover:text-brand-light transition-colors">Main Site</a>
            <a href="/scan" className="hover:text-brand-light transition-colors">Free Scan</a>
            <a href="/law-firms" className="hover:text-brand-light transition-colors">For Law Firms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
