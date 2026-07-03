import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Star, Phone, Search, TrendingUp, Globe, BarChart3, ArrowRight, Check } from 'lucide-react';
import { CAL_BOOKING_URL } from '../constants';

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
} as const;

/* ── Outreach personalization: /law-firms?firm=smith-legal ───────────────
   Renders the firm's name into the page. Accepts slugs or plain text;
   anything unexpected falls back to the generic page. */
function getFirmName(): string | null {
  const raw = new URLSearchParams(window.location.search).get('firm');
  if (!raw) return null;
  const cleaned = raw
    .replace(/[-_+]/g, ' ')
    .replace(/[^a-zA-Z0-9&'. ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 40);
  if (cleaned.length < 2) return null;
  return cleaned.replace(/\b[a-z]/g, (c) => c.toUpperCase());
}

/* ── Google results mockup: the signature visual ─────────────────────────── */
const SearchMockup = ({ firm }: { firm: string | null }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, rotate: -1 }}
    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    className="w-full max-w-lg mx-auto rounded-3xl border border-white/10 bg-[#0b1220] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] overflow-hidden"
  >
    {/* Search bar */}
    <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.07] bg-white/[0.03]">
      <Search size={16} className="text-white/40" />
      <span className="font-sans text-sm text-white/80">family lawyer melbourne</span>
    </div>

    <div className="p-6 space-y-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 flex items-center gap-2">
        <MapPin size={12} className="text-brand-accent" /> Map pack · the results that get the calls
      </p>

      {/* Row 1 */}
      <div className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
        <div>
          <p className="text-sm text-white/70 font-medium">Established Firm A</p>
          <p className="text-xs text-white/40 flex items-center gap-1">
            <Star size={10} className="text-amber-400 fill-amber-400" /> 4.9 · 120 reviews
          </p>
        </div>
        <Phone size={14} className="text-white/30" />
      </div>

      {/* Row 2 — the empty seat */}
      <div className="relative flex items-center justify-between rounded-xl border-2 border-dashed border-brand-accent/60 bg-brand-accent/[0.06] px-4 py-3">
        <div>
          <p className="text-sm text-brand-accent font-semibold">{firm ? `${firm} belongs here` : 'Your firm belongs here'}</p>
          <p className="text-xs text-white/50">This spot wins the enquiry.</p>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-brand-accent border border-brand-accent/40 rounded-full px-2.5 py-1">
          Open
        </span>
      </div>

      {/* Row 3 */}
      <div className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
        <div>
          <p className="text-sm text-white/70 font-medium">Established Firm B</p>
          <p className="text-xs text-white/40 flex items-center gap-1">
            <Star size={10} className="text-amber-400 fill-amber-400" /> 4.7 · 86 reviews
          </p>
        </div>
        <Phone size={14} className="text-white/30" />
      </div>
    </div>
  </motion.div>
);

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function LawFirmsPage() {
  const firm = getFirmName();

  useEffect(() => {
    document.title = firm
      ? `${firm} — Growth Audit by Stenth`
      : 'Digital Marketing for Melbourne Law Firms — Stenth';
    window.scrollTo(0, 0);
  }, [firm]);

  const pains = [
    'New matters depend on referrals, and referrals are unpredictable.',
    "You're invisible in the map pack for the searches that matter.",
    'Directories and comparison sites outrank your own website.',
    'The phone rings, but nobody knows which marketing made it ring.',
    'Competitors run ads on your firm name and you get the bill in lost matters.',
  ];

  const services = [
    {
      icon: MapPin,
      title: 'Local SEO & the Map Pack',
      copy: 'Google Business Profile built out properly, review generation that runs itself, and the local signals that put your firm in the map pack for your practice areas and suburbs.',
    },
    {
      icon: TrendingUp,
      title: 'Google Ads for High-Intent Searches',
      copy: 'Campaigns built around the searches people make when they actually need a lawyer this week. High-intent keywords only, with negative lists that keep spend off browsers and students.',
    },
    {
      icon: Globe,
      title: 'A Website That Converts Enquiries',
      copy: 'Fast, credible, and built around one job: turning a worried visitor into a booked consultation. Practice-area pages that answer the questions clients search before they call.',
    },
    {
      icon: BarChart3,
      title: 'Call Tracking & Honest Attribution',
      copy: 'Every call, form, and booking traced back to the channel that produced it. You see cost per enquiry by source, so every marketing dollar answers for itself.',
    },
  ];

  const auditItems = [
    'Where your firm ranks for your practice areas and suburbs, versus your three closest competitors',
    'Your Google Business Profile scored against the firms winning the map pack',
    'Site speed and mobile experience, tested the way a client on a phone experiences it',
    'The paid-search landscape for your practice areas: who bids, on what, and the gaps',
    'A 30-minute walkthrough of what we found. No obligation, and the findings are yours to keep',
  ];

  return (
    <div className="relative min-h-screen bg-brand-dark text-brand-light font-sans">
      <div className="noise-bg" />

      {/* ── Top bar ──────────────────────────────────────────────────── */}
      <header className="relative z-20 flex items-center justify-between px-6 md:px-12 py-6">
        <a href="/" className="flex items-center gap-3">
          <img src="/Logo.png" alt="Stenth" className="w-8 h-8 object-contain" />
          <span className="font-display text-xl tracking-tighter">STENTH</span>
        </a>
        <a
          href="#audit"
          className="text-xs uppercase tracking-[0.3em] font-bold text-brand-accent border border-brand-accent/30 px-5 py-2.5 rounded-full hover:bg-brand-accent hover:text-brand-dark transition-all duration-300"
        >
          Free Firm Audit
        </a>
      </header>

      <main className="relative z-10">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="px-6 md:px-12 pt-12 md:pt-20 pb-20 md:pb-28">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            <div className="lg:col-span-6">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="font-mono text-xs uppercase tracking-[0.4em] text-brand-accent mb-6"
              >
                {firm ? `Prepared for ${firm}` : 'For Melbourne Law Firms'}
              </motion.p>
              <h1 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-[0.95] mb-8">
                Your next client is searching{' '}
                <span className="text-brand-accent">right now.</span>
              </h1>
              <p className="text-lg md:text-xl text-brand-light/70 leading-relaxed max-w-xl mb-10">
                When someone in Melbourne needs a lawyer, they search, compare the top
                results, and call one or two firms. The firms they find first win the
                matter.{' '}
                {firm
                  ? `We've started looking at where ${firm} shows up. Book a call and we'll walk you through what we found.`
                  : 'We make sure one of them is yours.'}
              </p>
              <div className="flex flex-wrap items-center gap-5">
                <a
                  href="#audit"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-accent text-brand-dark text-xs uppercase tracking-[0.3em] font-bold hover:shadow-[0_0_40px_rgba(111,156,235,0.5)] transition-all duration-300"
                >
                  Get Your Free Audit <ArrowRight size={16} />
                </a>
                <span className="text-xs text-brand-light/40 uppercase tracking-[0.2em] font-mono">
                  No cost. No obligation.
                </span>
              </div>
            </div>
            <div className="lg:col-span-6">
              <SearchMockup firm={firm} />
            </div>
          </div>
        </section>

        {/* ── Pains ────────────────────────────────────────────────────── */}
        <section className="px-6 md:px-12 py-20 md:py-28 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            <motion.div {...reveal} className="lg:col-span-5">
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-brand-accent mb-6">
                Sound Familiar?
              </p>
              <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter leading-[0.95]">
                Great firms lose to average firms with better{' '}
                <span className="text-brand-accent">visibility.</span>
              </h2>
            </motion.div>
            <div className="lg:col-span-7 flex flex-col divide-y divide-white/[0.06]">
              {pains.map((pain, i) => (
                <motion.div
                  key={i}
                  {...reveal}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-baseline gap-6 py-6"
                >
                  <span className="font-mono text-xs text-brand-accent/60 flex-shrink-0">
                    0{i + 1}
                  </span>
                  <p className="text-lg md:text-xl text-brand-light/80">{pain}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ─────────────────────────────────────────────────── */}
        <section className="px-6 md:px-12 py-20 md:py-28 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto">
            <motion.div {...reveal} className="max-w-3xl mb-16">
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-brand-accent mb-6">
                What We Do For Firms
              </p>
              <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter leading-[0.95]">
                One system, built around how clients choose lawyers.
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((s, i) => (
                <motion.div
                  key={s.title}
                  {...reveal}
                  transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="group rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:p-10 hover:border-brand-accent/30 hover:bg-white/[0.04] transition-all duration-500"
                >
                  <s.icon size={26} className="text-brand-accent mb-6" />
                  <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tight mb-4">
                    {s.title}
                  </h3>
                  <p className="text-brand-light/60 leading-relaxed">{s.copy}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Stenth / honesty block ───────────────────────────────── */}
        <section className="px-6 md:px-12 py-20 md:py-28 border-t border-white/[0.06]">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div {...reveal}>
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-brand-accent mb-6">
                Straight Talk
              </p>
              <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter leading-[0.95] mb-8">
                Senior people. Founding-firm terms. No lock-in.
              </h2>
              <p className="text-lg md:text-xl text-brand-light/70 leading-relaxed max-w-3xl mx-auto">
                Stenth is a senior-led consultancy building its Melbourne client base,
                and that works in your favour. You work directly with the founders, you
                get founding-firm pricing on your first engagement, and we earn your
                business month to month. No long contracts, no juniors learning on your
                budget, and reporting that ties spend to enquiries, not impressions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Audit offer ──────────────────────────────────────────────── */}
        <section id="audit" className="px-6 md:px-12 py-20 md:py-28 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            <motion.div {...reveal} className="lg:col-span-6">
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-brand-accent mb-6">
                The Free Audit
              </p>
              <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter leading-[0.95] mb-8">
                See exactly where {firm ?? 'your firm'} stands.{' '}
                <span className="text-brand-accent">Free.</span>
              </h2>
              <p className="text-lg text-brand-light/70 leading-relaxed mb-10 max-w-xl">
                We audit {firm ? `${firm}'s` : "your firm's"} entire online presence
                and hand you the findings, whether or not you ever work with us. It
                takes us a few days and costs you nothing but a 30-minute call.
              </p>
              <a
                href={CAL_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-accent text-brand-dark text-xs uppercase tracking-[0.3em] font-bold hover:shadow-[0_0_40px_rgba(111,156,235,0.5)] transition-all duration-300"
              >
                Book Your Audit Call <ArrowRight size={16} />
              </a>
              <p className="mt-5 text-xs text-brand-light/40 font-mono uppercase tracking-[0.2em]">
                Or email info@stenth.com · Impatient?{' '}
                <a href="/scan" className="text-brand-accent hover:underline normal-case tracking-normal font-sans font-semibold">
                  Run the 60-second scan yourself
                </a>
              </p>
            </motion.div>
            <motion.div
              {...reveal}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:p-10">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand-light/50 mb-6">
                  What your audit covers
                </p>
                <ul className="space-y-5">
                  {auditItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-brand-accent/15 border border-brand-accent/40 flex items-center justify-center">
                        <Check size={11} className="text-brand-accent" />
                      </span>
                      <span className="text-brand-light/75 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
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
            <a href="/privacy.html" className="hover:text-brand-light transition-colors">Privacy</a>
            <a href="/terms.html" className="hover:text-brand-light transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
