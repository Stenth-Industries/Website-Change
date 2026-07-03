import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Star, Phone, Search, TrendingUp, Globe, BarChart3, ArrowRight, Check, X } from 'lucide-react';
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

  const comparison = [
    {
      label: 'Who does the work',
      stenth: 'The founders, directly',
      typical: 'Whoever was assigned this month',
    },
    {
      label: 'Contract',
      stenth: 'Month to month, earn it or lose it',
      typical: '12-month lock-in',
    },
    {
      label: 'Client roster',
      stenth: 'A handful of firms, by design',
      typical: 'Hundreds of accounts per manager',
    },
    {
      label: 'Reporting',
      stenth: 'Cost per enquiry, by channel',
      typical: 'Impressions, clicks, and vibes',
    },
    {
      label: 'Audit findings',
      stenth: 'Yours to keep, free',
      typical: 'A teaser for the sales pitch',
    },
    {
      label: 'Your website',
      stenth: 'Fully yours, always',
      typical: 'Held on their platform',
    },
  ];

  const roadmap = [
    {
      period: '0–3 months',
      title: 'Foundations',
      copy: 'Tracking installed, Google Business Profile rebuilt, site speed fixed, and the first high-intent campaigns live. You see every enquiry and its source from week one.',
    },
    {
      period: '3–6 months',
      title: 'Early Wins',
      copy: 'Paid campaigns tuned on real enquiry data, map pack movement in your suburbs, and review velocity that keeps compounding.',
    },
    {
      period: '6–12 months',
      title: 'Compounding',
      copy: 'Organic rankings mature and start replacing paid clicks. Cost per enquiry falls while enquiry volume grows.',
    },
    {
      period: '12+ months',
      title: 'Market Position',
      copy: 'Your firm holds the searches that matter in your practice areas. Competitors budget around you, not the other way round.',
    },
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

        {/* ── Comparison: Stenth vs typical agency ─────────────────────── */}
        <section className="px-6 md:px-12 py-20 md:py-28 border-t border-white/[0.06]">
          <div className="max-w-5xl mx-auto">
            <motion.div {...reveal} className="max-w-3xl mb-14">
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-brand-accent mb-6">
                The Difference
              </p>
              <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter leading-[0.95]">
                Stenth vs the typical <span className="text-brand-accent">agency retainer.</span>
              </h2>
            </motion.div>

            <motion.div {...reveal} className="rounded-[2rem] border border-white/10 overflow-hidden">
              {/* Header row */}
              <div className="grid grid-cols-[1.1fr_1fr_1fr] md:grid-cols-3 bg-white/[0.04] border-b border-white/10">
                <div className="p-4 md:p-6" />
                <div className="p-4 md:p-6 flex items-center gap-2">
                  <img src="/Logo.png" alt="" className="w-5 h-5 object-contain hidden md:block" />
                  <span className="font-display text-base md:text-xl uppercase tracking-tight text-brand-accent">Stenth</span>
                </div>
                <div className="p-4 md:p-6">
                  <span className="font-display text-base md:text-xl uppercase tracking-tight text-brand-light/50">Typical Agency</span>
                </div>
              </div>
              {comparison.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-[1.1fr_1fr_1fr] md:grid-cols-3 ${i % 2 ? 'bg-white/[0.02]' : ''} ${i ? 'border-t border-white/[0.06]' : ''}`}
                >
                  <div className="p-4 md:p-6 font-mono text-[10px] md:text-xs uppercase tracking-[0.15em] text-brand-light/50 flex items-center">
                    {row.label}
                  </div>
                  <div className="p-4 md:p-6 flex items-start gap-2.5">
                    <span className="mt-0.5 flex-shrink-0 w-4.5 h-4.5 md:w-5 md:h-5 rounded-full bg-brand-accent/15 border border-brand-accent/40 flex items-center justify-center">
                      <Check size={10} className="text-brand-accent" />
                    </span>
                    <span className="text-sm md:text-base text-brand-light/85 leading-snug">{row.stenth}</span>
                  </div>
                  <div className="p-4 md:p-6 flex items-start gap-2.5">
                    <span className="mt-0.5 flex-shrink-0 w-4.5 h-4.5 md:w-5 md:h-5 rounded-full bg-white/[0.05] border border-white/15 flex items-center justify-center">
                      <X size={10} className="text-brand-light/40" />
                    </span>
                    <span className="text-sm md:text-base text-brand-light/40 leading-snug">{row.typical}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Roadmap: the first 12 months ─────────────────────────────── */}
        <section className="px-6 md:px-12 py-20 md:py-28 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto">
            <motion.div {...reveal} className="max-w-3xl mb-16">
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-brand-accent mb-6">
                What To Expect
              </p>
              <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter leading-[0.95]">
                Your first <span className="text-brand-accent">12 months.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roadmap.map((step, i) => (
                <motion.div
                  key={step.period}
                  {...reveal}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 hover:border-brand-accent/30 transition-colors duration-500"
                >
                  <span className="font-display text-5xl tracking-tighter text-brand-accent/20 absolute top-6 right-7">
                    0{i + 1}
                  </span>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand-accent mb-4">
                    {step.period}
                  </p>
                  <h3 className="font-display text-2xl uppercase tracking-tight mb-4">{step.title}</h3>
                  <p className="text-sm text-brand-light/60 leading-relaxed">{step.copy}</p>
                </motion.div>
              ))}
            </div>
            <motion.p {...reveal} className="mt-8 text-xs text-brand-light/35 font-mono uppercase tracking-[0.2em]">
              Timelines shift with budget and market competitiveness. Your audit call comes with a plan for your firm, not a template.
            </motion.p>
          </div>
        </section>

        {/* ── Founders: who you'll work with ───────────────────────────── */}
        <section className="px-6 md:px-12 py-20 md:py-28 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div {...reveal} className="lg:col-span-5">
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-brand-accent mb-6">
                No Account Managers
              </p>
              <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter leading-[0.95] mb-8">
                The people on your audit call <span className="text-brand-accent">own the company.</span>
              </h2>
              <p className="text-lg text-brand-light/70 leading-relaxed max-w-xl">
                Stenth is run by its two founders, and every law firm engagement is
                handled by them personally. When you call, you reach the person
                responsible for your results, not a coordinator reading your file.
              </p>
            </motion.div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: 'Ansh Rai',
                  role: 'Co-Founder',
                  copy: 'AI, computer science, and marketing technology. Builds the systems that find where your enquiries really come from.',
                },
                {
                  name: 'Aakash Lakhataria',
                  role: 'Co-Founder',
                  copy: 'AI-driven marketing, analytics, and paid media. Runs campaigns shaped by hands-on work with Google Ads specialists.',
                },
              ].map((f, i) => (
                <motion.div
                  key={f.name}
                  {...reveal}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 hover:border-brand-accent/30 transition-colors duration-500"
                >
                  <div className="w-12 h-12 rounded-full bg-brand-accent/15 border border-brand-accent/40 flex items-center justify-center font-display text-lg text-brand-accent mb-6">
                    {f.name.split(' ').map((w) => w[0]).join('')}
                  </div>
                  <h3 className="font-display text-2xl uppercase tracking-tight">{f.name}</h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-accent mt-1 mb-4">{f.role}</p>
                  <p className="text-sm text-brand-light/60 leading-relaxed">{f.copy}</p>
                </motion.div>
              ))}
            </div>
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
