import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, X, Download, Mail, ListChecks } from 'lucide-react';
import { CAL_BOOKING_URL } from '../constants';
import { SECTIONS, TOTAL, bandFor, gapsFor } from '../checklist';

type Answer = 'yes' | 'no';

export default function ChecklistPage() {
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [emailState, setEmailState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useEffect(() => {
    document.title = 'The B2B Funnel Checklist 2026, Live — Stenth';
  }, []);

  const answered = Object.keys(answers).length;
  const checked = useMemo(
    () => new Set(Object.entries(answers).filter(([, v]) => v === 'yes').map(([k]) => Number(k))),
    [answers]
  );
  const score = checked.size;
  const band = bandFor(score);
  const gaps = gapsFor(checked, score);
  const done = answered === TOTAL;

  const setAnswer = (id: number, v: Answer) => setAnswers((a) => ({ ...a, [id]: v }));

  const downloadPdf = () => {
    const prev = document.title;
    document.title = `Stenth Funnel Checklist ${score}-of-30`;
    window.print();
    document.title = prev;
  };

  const emailResults = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get('email');
    setEmailState('sending');
    try {
      const res = await fetch('https://formsubmit.co/ajax/info@stenth.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Funnel checklist result: ${score}/30 (${band.label})`,
          _template: 'table',
          _captcha: 'false',
          email,
          score: `${score}/30 · ${band.label}`,
          biggest_gaps: gaps.map((g) => g.text).join(' | ') || 'none',
          not_ticked: SECTIONS.flatMap((s) => s.items)
            .filter((i) => !checked.has(i.id))
            .map((i) => i.id)
            .join(', ') || 'none',
        }),
      });
      if (!res.ok) throw new Error();
      setEmailState('sent');
    } catch {
      setEmailState('error');
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-dark text-brand-light font-sans">
      {/* ══════════════ SCREEN ══════════════ */}
      <div className="print:hidden">
        <div className="noise-bg" />

        {/* Top bar */}
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

        {/* Sticky progress */}
        <div className="sticky top-0 z-30 bg-brand-dark/90 backdrop-blur-md border-b border-white/[0.06]">
          <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between gap-6">
            <div className="flex-1 h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
              <div
                className="h-full rounded-full bg-brand-accent transition-all duration-500"
                style={{ width: `${(answered / TOTAL) * 100}%` }}
              />
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-light/60 flex-shrink-0">
              {answered}/{TOTAL} answered · <span style={{ color: band.color }}>{score} ticked</span>
            </p>
          </div>
        </div>

        <main className="relative z-10 px-6 md:px-12 pb-24">
          {/* Hero */}
          <section className="max-w-4xl mx-auto text-center pt-12 md:pt-16 pb-14">
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-brand-accent mb-6 flex items-center justify-center gap-2">
              <ListChecks size={14} /> The B2B Funnel Checklist 2026 · Live
            </p>
            <h1 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-[0.95] mb-6">
              Thirty checks. <span className="text-brand-accent">Where does your funnel leak?</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-light/70 leading-relaxed max-w-2xl mx-auto">
              Answer honestly as you go. Your score, your three biggest gaps, and a
              download of your results are waiting at the end. About three minutes.
            </p>
          </section>

          {/* Sections */}
          <div className="max-w-4xl mx-auto space-y-10">
            {SECTIONS.map((section) => (
              <motion.section
                key={section.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-10"
              >
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="font-display text-2xl text-brand-accent">0{section.n}</span>
                  <h2 className="font-display text-2xl md:text-3xl uppercase tracking-tight">{section.title}</h2>
                </div>
                <p className="text-sm text-brand-light/45 mb-8 ml-[2.4rem]">{section.tagline}</p>

                <div className="divide-y divide-white/[0.06]">
                  {section.items.map((item) => {
                    const a = answers[item.id];
                    return (
                      <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex-1">
                          <p className="text-brand-light/85 leading-snug">{item.text}</p>
                          <p className="text-xs text-brand-light/40 mt-0.5">{item.detail}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => setAnswer(item.id, 'yes')}
                            aria-pressed={a === 'yes'}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs uppercase tracking-[0.15em] font-bold border transition-all duration-300 ${
                              a === 'yes'
                                ? 'bg-brand-accent text-brand-dark border-brand-accent'
                                : 'border-white/15 text-brand-light/50 hover:border-brand-accent/50 hover:text-brand-accent'
                            }`}
                          >
                            <Check size={12} /> Yes
                          </button>
                          <button
                            onClick={() => setAnswer(item.id, 'no')}
                            aria-pressed={a === 'no'}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs uppercase tracking-[0.15em] font-bold border transition-all duration-300 ${
                              a === 'no'
                                ? 'bg-white/10 text-brand-light border-white/30'
                                : 'border-white/15 text-brand-light/50 hover:border-white/40 hover:text-brand-light'
                            }`}
                          >
                            <X size={12} /> Not yet
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.section>
            ))}
          </div>

          {/* Results */}
          <section className="max-w-4xl mx-auto mt-10">
            <div className="rounded-[2rem] border border-brand-accent/25 bg-brand-accent/[0.04] p-8 md:p-12">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand-accent mb-6">Your Score</p>
              <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8 mb-6">
                <p className="font-display text-7xl md:text-8xl leading-none tracking-tighter">
                  {score}<span className="text-brand-light/30 text-4xl md:text-5xl">/{TOTAL}</span>
                </p>
                <div>
                  <p className="font-display text-2xl md:text-3xl uppercase tracking-tight" style={{ color: band.color }}>
                    {done ? band.label : 'Keep going'}
                  </p>
                  <p className="text-brand-light/65 leading-relaxed max-w-xl mt-1">
                    {done ? band.copy : `Answer all ${TOTAL} checks to get your verdict and your three biggest gaps.`}
                  </p>
                </div>
              </div>

              {done && gaps.length > 0 && (
                <div className="rounded-2xl border border-white/10 bg-brand-dark/60 p-6 md:p-8 mb-8">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand-light/50 mb-5">
                    Your three biggest gaps · this is your quarter, sorted
                  </p>
                  <ol className="space-y-4">
                    {gaps.map((g, i) => (
                      <li key={g.id} className="flex items-baseline gap-4">
                        <span className="font-display text-xl text-brand-accent flex-shrink-0">{i + 1}</span>
                        <div>
                          <p className="text-brand-light/85">{g.text}</p>
                          <p className="text-xs text-brand-light/40 mt-0.5">{g.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {done && gaps.length === 0 && (
                <p className="text-brand-light/70 mb-8">
                  Every box ticked. Genuinely rare. Re-run this quarterly to keep it that way.
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <button
                  onClick={downloadPdf}
                  disabled={!done}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-brand-accent text-brand-dark text-xs uppercase tracking-[0.25em] font-bold hover:shadow-[0_0_40px_rgba(111,156,235,0.5)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Download size={14} /> Download My Results (PDF)
                </button>
                <a
                  href={CAL_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold text-brand-accent hover:underline"
                >
                  Boxes you couldn't tick? That's what we fix <ArrowRight size={14} />
                </a>
              </div>

              {/* Email results */}
              {emailState === 'sent' ? (
                <p className="text-sm text-brand-light/70 flex items-center gap-2">
                  <Check size={15} style={{ color: '#4ade80' }} />
                  Done. A founder will send your results with a fix-first plan within 24 hours.
                </p>
              ) : (
                <form onSubmit={emailResults} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                  <div className="flex-1 flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 focus-within:border-brand-accent/60 transition-colors">
                    <Mail size={14} className="text-white/35 flex-shrink-0" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email me my results + a fix-first plan"
                      className="w-full bg-transparent outline-none text-sm text-brand-light placeholder:text-white/30"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!done || emailState === 'sending'}
                    className="px-6 py-3 rounded-full border border-brand-accent/40 text-brand-accent text-xs uppercase tracking-[0.25em] font-bold hover:bg-brand-accent hover:text-brand-dark transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {emailState === 'sending' ? 'Sending…' : 'Send'}
                  </button>
                  {emailState === 'error' && (
                    <p className="text-xs text-red-400 self-center">Didn't go through. Email info@stenth.com instead.</p>
                  )}
                </form>
              )}
            </div>
          </section>
        </main>

        {/* Footer strip */}
        <footer className="relative z-10 border-t border-white/[0.06] px-6 md:px-12 py-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/Logo.png" alt="Stenth" className="w-6 h-6 object-contain opacity-60" />
              <span className="text-xs text-brand-light/40 uppercase tracking-widest">© 2026 Stenth · Canada &amp; Australia</span>
            </div>
            <div className="flex gap-8 text-xs text-brand-light/40 uppercase tracking-widest">
              <a href="/" className="hover:text-brand-light transition-colors">Main Site</a>
              <a href="/scan" className="hover:text-brand-light transition-colors">Free Scan</a>
              <a href="/roi" className="hover:text-brand-light transition-colors">Enquiry Calculator</a>
            </div>
          </div>
        </footer>
      </div>

      {/* ══════════════ PRINT ══════════════ */}
      <div className="hidden print:block bg-white text-[#0b1523] p-10" style={{ printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }}>
        <div className="flex items-center justify-between border-b-2 border-[#0b1523] pb-4 mb-6">
          <p className="font-display text-2xl tracking-tighter">STENTH<span className="text-[#4a7dd6]">.</span></p>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#5a6675]">B2B Funnel Checklist 2026 · Your Results</p>
        </div>

        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-display text-5xl leading-none">{score}/{TOTAL}</p>
            <p className="font-display text-xl uppercase tracking-tight text-[#4a7dd6] mt-1">{band.label}</p>
            <p className="text-sm text-[#425061] mt-1 max-w-md">{band.copy}</p>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5a6675]">
            {new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {gaps.length > 0 && (
          <div className="border border-[#4a7dd6] rounded-xl p-5 mb-8">
            <p className="font-display text-sm uppercase tracking-wide mb-3">Your three biggest gaps · this is your quarter, sorted</p>
            <ol className="space-y-2">
              {gaps.map((g, i) => (
                <li key={g.id} className="text-sm">
                  <span className="font-bold text-[#4a7dd6] mr-2">{i + 1}.</span>
                  <span className="font-semibold">{g.text}.</span> <span className="text-[#425061]">{g.detail}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {SECTIONS.map((section) => (
          <div key={section.n} className="mb-6" style={{ breakInside: 'avoid' }}>
            <p className="font-display text-lg uppercase tracking-tight border-b border-[#d5dbe3] pb-1 mb-2">
              {section.n}. {section.title}
            </p>
            <ul>
              {section.items.map((item) => {
                const yes = checked.has(item.id);
                return (
                  <li key={item.id} className="flex items-baseline gap-3 py-1 text-sm">
                    <span className={`font-bold ${yes ? 'text-[#2e9e5b]' : 'text-[#c43d3d]'}`}>{yes ? '✓' : '✗'}</span>
                    <span>
                      <span className="font-semibold">{item.text}.</span>{' '}
                      <span className="text-[#425061]">{item.detail}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <div className="mt-8 border-t-2 border-[#0b1523] pt-4 flex items-center justify-between">
          <p className="text-sm font-semibold">
            Boxes you couldn't tick? That's what we fix. <span className="text-[#4a7dd6]">stenth.com</span> · info@stenth.com
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5a6675]">© 2026 Stenth</p>
        </div>
      </div>
    </div>
  );
}
