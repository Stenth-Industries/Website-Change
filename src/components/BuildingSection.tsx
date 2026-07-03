import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion, MotionValue } from 'motion/react';
import { CAL_BOOKING_URL } from '../constants';

/* ── The chaos: fragments of a broken growth operation ───────────────────── */
const CHAOS = [
  { text: '3 REPORTS', left: 8, top: 14, rot: -8, drift: -6, size: 'text-4xl md:text-6xl', color: 'text-amber-400/80' },
  { text: 'NO ATTRIBUTION', left: 48, top: 18, rot: 5, drift: -10, size: 'text-3xl md:text-5xl', color: 'text-red-400/80' },
  { text: 'VANITY METRICS', left: 10, top: 72, rot: 6, drift: -8, size: 'text-2xl md:text-4xl', color: 'text-white/40' },
  { text: 'WASTED SPEND', left: 62, top: 76, rot: -5, drift: -12, size: 'text-3xl md:text-5xl', color: 'text-red-400/70' },
  { text: '3 TRUTHS', left: 76, top: 36, rot: 10, drift: -7, size: 'text-3xl md:text-5xl', color: 'text-amber-400/70' },
  { text: 'GUESSWORK', left: 4, top: 40, rot: -12, drift: -9, size: 'text-3xl md:text-6xl', color: 'text-white/60' },
  { text: 'ZERO CLARITY', left: 46, top: 66, rot: 7, drift: -13, size: 'text-3xl md:text-5xl', color: 'text-white/70' },
  { text: 'SILOED DATA', left: 33, top: 86, rot: 4, drift: -5, size: 'text-2xl md:text-4xl', color: 'text-white/40', hideMobile: true },
  { text: 'REVENUE DISAGREES', left: 24, top: 16, rot: -4, drift: -11, size: 'text-2xl md:text-4xl', color: 'text-white/50', hideMobile: true },
  { text: 'MIXED SIGNALS', left: 72, top: 58, rot: -9, drift: -6, size: 'text-2xl md:text-4xl', color: 'text-white/40', hideMobile: true },
  { text: 'RISING CPCS', left: 18, top: 28, rot: 9, drift: -8, size: 'text-2xl md:text-4xl', color: 'text-white/40', hideMobile: true },
  { text: 'AGENCY BLAME', left: 58, top: 24, rot: -7, drift: -9, size: 'text-2xl md:text-4xl', color: 'text-white/50', hideMobile: true },
];

/* ── A single fragment: drifts, then gets pulled into the core ───────────── */
function ChaosWord({ word, progress, index }: {
  key?: React.Key;
  word: typeof CHAOS[0];
  progress: MotionValue<number>;
  index: number;
}) {
  // Each fragment collapses on its own cue — a staggered implosion.
  // Fades late in its travel so the pull toward the core stays visible,
  // and the last fragments are still falling in as the headline assembles.
  const start = 0.3 + index * 0.012;
  const end = start + 0.22;

  const x = useTransform(progress, [0, start, end], ['0vw', '0vw', `${(50 - word.left) * 0.85}vw`]);
  const y = useTransform(progress, [0, start, end], ['0vh', `${word.drift}vh`, `${(44 - word.top) * 0.85}vh`]);
  const rotate = useTransform(progress, [0, start, end], [word.rot, word.rot, 0]);
  const scale = useTransform(progress, [start, end], [1, 0.2]);
  const opacity = useTransform(progress, [start + 0.08, end], [1, 0]);

  return (
    <motion.span
      aria-hidden
      style={{ x, y, rotate, scale, opacity, left: `${word.left}%`, top: `${word.top}%` }}
      className={`absolute whitespace-nowrap font-display uppercase tracking-tight select-none pointer-events-none ${word.size} ${word.color} ${word.hideMobile ? 'hidden md:block' : ''}`}
    >
      {word.text}
    </motion.span>
  );
}

/* ── Static fallback for reduced motion ──────────────────────────────────── */
function StaticVersion() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-32 text-center flex flex-col items-center">
      <p className="font-mono text-xs uppercase tracking-[0.4em] text-white/60 mb-8">The Problem</p>
      <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter leading-tight mb-8">
        Wasted spend. Three reports. <br />
        <span className="text-white/50">Zero clarity.</span>
      </h2>
      <p className="font-mono text-xs uppercase tracking-[0.5em] text-brand-accent mb-8 border border-brand-accent/30 px-5 py-2 rounded-full bg-brand-accent/5">
        The Solution
      </p>
      <h2 className="font-display text-5xl md:text-8xl uppercase tracking-tighter leading-none mb-6">
        Stenth is <span className="text-brand-accent">the system.</span>
      </h2>
      <p className="text-white/80 text-lg max-w-2xl mb-10">
        One unified growth architecture. Every channel. One truth.
      </p>
      <a href={CAL_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="px-10 py-4 rounded-full bg-brand-accent text-brand-dark text-xs uppercase tracking-[0.3em] font-bold">
        Book a Free Strategy Session
      </a>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────────────── */
export default function BuildingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  // Tight spring: just enough to take the notch out of wheel steps without
  // trailing the scrollbar — heavy smoothing here reads as lag, not cinema.
  const smooth = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 });

  // The gravity well at the center — intensifies as chaos gets pulled in
  const coreOpacity = useTransform(smooth, [0.28, 0.55, 0.82], [0, 0.55, 0.2]);
  const coreScale = useTransform(smooth, [0.28, 0.7], [0.4, 1.4]);

  // Payoff: assembles while the last fragments are still falling in
  const hlOpacity = useTransform(smooth, [0.48, 0.64], [0, 1]);
  const hlScale = useTransform(smooth, [0.48, 0.78], [1.14, 1]);
  const hlFilter = useTransform(smooth, [0.48, 0.64], ['blur(8px)', 'blur(0px)']);
  const subOpacity = useTransform(smooth, [0.64, 0.76], [0, 1]);
  const subY = useTransform(smooth, [0.64, 0.76], [24, 0]);
  const ctaEvents = useTransform(smooth, v => (v > 0.64 ? 'auto' : 'none'));

  // Caption crossfade: the act labels
  const probOpacity = useTransform(smooth, [0, 0.42, 0.54], [1, 1, 0]);
  const sysOpacity = useTransform(smooth, [0.58, 0.7], [0, 1]);

  if (prefersReduced) {
    return (
      <section className="relative bg-[#010308] text-white overflow-hidden">
        <StaticVersion />
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[260vh] bg-[#010308] font-sans text-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="noise-bg absolute inset-0 opacity-40 pointer-events-none" />

        {/* ── Gravity well ─────────────────────────────────────────────── */}
        <motion.div
          style={{ opacity: coreOpacity, scale: coreScale }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vmin] h-[60vmin] rounded-full bg-[radial-gradient(circle,rgba(111,156,235,0.35),rgba(111,156,235,0.08)_45%,transparent_70%)] pointer-events-none"
        />

        {/* ── Act labels ───────────────────────────────────────────────── */}
        <div className="absolute bottom-8 left-6 md:left-12 font-mono text-[10px] uppercase tracking-[0.5em] pointer-events-none">
          <motion.p style={{ opacity: probOpacity }} className="text-white/50">
            01 &mdash; Growth, Today
          </motion.p>
          <motion.p style={{ opacity: sysOpacity }} className="absolute inset-0 text-brand-accent whitespace-nowrap">
            02 &mdash; Growth, With Stenth
          </motion.p>
        </div>

        {/* ── The chaos field ──────────────────────────────────────────── */}
        <div className="absolute inset-0" aria-hidden>
          {CHAOS.map((word, i) => (
            <ChaosWord key={word.text} word={word} progress={smooth} index={i} />
          ))}
        </div>

        {/* ── The payoff ───────────────────────────────────────────────── */}
        <motion.div
          style={{ opacity: hlOpacity, scale: hlScale, filter: hlFilter, pointerEvents: ctaEvents as any }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6"
        >
          <h2 className="font-display text-6xl md:text-8xl lg:text-[9rem] uppercase tracking-tighter leading-[0.9]">
            Stenth is
            <br />
            <span className="text-brand-accent drop-shadow-[0_0_40px_rgba(111,156,235,0.5)]">
              the system.
            </span>
          </h2>

          <motion.div style={{ opacity: subOpacity, y: subY }} className="flex flex-col items-center">
            <p className="font-sans text-base md:text-xl text-white/80 max-w-xl leading-relaxed mt-8 mb-10">
              One unified growth architecture. Every channel. One truth.
            </p>
            <motion.a
              href={CAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="px-8 md:px-12 py-4 md:py-5 rounded-full bg-brand-accent text-brand-dark text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold hover:shadow-[0_0_40px_rgba(111,156,235,0.6)] transition-all duration-300"
            >
              Book a Free Strategy Session
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
