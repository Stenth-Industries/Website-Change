import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'motion/react';

const HEADLINE = "BUILD YOUR BUSINESS";
const SERVICES = [
  'Paid Advertising',
  'SEO Services',
  'Web Development',
  'Content Marketing',
  'Analytics & Tracking',
  'Branding',
];

const MARQUEE_TEXT = [...SERVICES, ...SERVICES, ...SERVICES, ...SERVICES]; // quadrupled for seamless loop on wide screens

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollY } = useScroll();

  const auroraX = useSpring(useTransform(mouseX, [0, 1440], [-80, 80]), { stiffness: 60, damping: 30 });
  const auroraY = useSpring(useTransform(mouseY, [0, 900], [-40, 40]), { stiffness: 60, damping: 30 });

  const watermarkY = useTransform(scrollY, [0, 600], [0, 140]);
  const watermarkX = useSpring(useTransform(mouseX, [0, 1440], [-30, 30]), { stiffness: 40, damping: 25 });

  const headlineOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const headlineY = useTransform(scrollY, [0, 400], [0, 80]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-brand-dark">

      {/* ── Layer 0: Grain Texture ── */}
      <div className="noise-bg" aria-hidden />

      {/* ── Layer 1: Aurora Atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Primary glow – follows mouse */}
        <motion.div
          style={{ x: auroraX, y: auroraY }}
          className="absolute top-[20%] left-[30%] w-[900px] h-[700px] rounded-full bg-blue-600/10 blur-[180px]"
        />
        {/* Secondary glow – slow pulse, fixed */}
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-indigo-500/10 blur-[200px]"
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_30%,#01080F_100%)]" />
      </div>

      {/* ── Layer 2: Giant STENTH Watermark (parallax) ── */}
      <motion.div
        style={{ y: watermarkY, x: watermarkX }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        aria-hidden
      >
        <span
          className="font-display text-[28vw] leading-none tracking-tighter text-brand-light"
          style={{ opacity: 0.03 }}
        >
          STENTH
        </span>
      </motion.div>

      {/* ── Layer 3: Top Status Bar ── */}
      <div className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-10 md:pt-14">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent" />
          </div>
          <span className="text-xs uppercase tracking-[0.5em] font-mono text-brand-accent/70">
            Strategy. Marketing. Growth.
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="hidden md:block text-right"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-brand-light/70 font-mono">Stenth Agency</p>
          <p className="text-xs uppercase tracking-[0.4em] text-brand-light/40 font-mono">Est. 2024</p>
        </motion.div>
      </div>

      {/* ── Layer 4: Main Copy + Headline ── */}
      <motion.div
        style={{ opacity: headlineOpacity, y: headlineY }}
        className="relative z-10 px-6 md:px-12 flex flex-col gap-10 md:gap-16"
      >
        {/* Sub-copy block */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3 max-w-xs"
          >
            <p className="text-brand-accent text-base md:text-lg font-medium uppercase tracking-widest leading-snug">
              Digital Marketing<br />That Builds<br />Businesses.
            </p>
            <p className="text-brand-light/60 text-xs uppercase tracking-[0.35em] font-mono">
              Data-driven. Revenue-focused.
            </p>
          </motion.div>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ x: 4 }}
            className="hidden md:inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] font-bold text-brand-light/70 hover:text-brand-accent transition-colors group"
          >
            Book a Call
            <span className="inline-block group-hover:translate-x-1 transition-transform">↗</span>
          </motion.a>
        </div>

        {/* Staggered Headline — Two line editorial layout */}
        <div aria-label="Build Your Business" className="space-y-2">
          {/* Line 1: BUILD YOUR */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-[13vw] md:text-[13vw] leading-[0.85] font-display text-brand-light whitespace-nowrap"
            >
              BUILD YOUR
            </motion.div>
          </div>
          {/* Line 2: BUSINESS — offset + accent color */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-[13vw] md:text-[13vw] leading-[0.85] font-display whitespace-nowrap pl-[6vw]"
              style={{ color: '#6F9CEB' }}
            >
              BUSINESS.
            </motion.div>
          </div>
        </div>

        {/* ── Service Marquee Strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="w-full overflow-hidden border-t border-b border-white/5 py-3"
        >
          <div className="flex animate-marquee whitespace-nowrap gap-0 w-max">
            {MARQUEE_TEXT.map((text, i) => (
              <span key={i} className="flex items-center">
                <span className="text-xs uppercase tracking-[0.4em] font-mono text-brand-light/80 px-8">
                  {text}
                </span>
                <span className="text-brand-accent/60 text-sm">·</span>
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Layer 5: Bottom Bar ── */}
      <div className="relative z-10 px-6 md:px-12 pb-8 md:pb-10 flex items-center justify-between gap-6 border-t border-white/5 pt-6 mt-4">
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          {SERVICES.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.6 + i * 0.07 }}
              className="text-xs uppercase tracking-[0.3em] font-mono text-brand-light"
            >
              {s}
            </motion.span>
          ))}
        </div>
        <motion.a
          href="#contact"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0 }}
          whileHover={{ scale: 1.02 }}
          className="flex-shrink-0 text-xs uppercase tracking-[0.4em] font-bold text-brand-accent border border-brand-accent/30 px-5 py-2.5 rounded-full hover:bg-brand-accent hover:text-brand-dark transition-all duration-300"
        >
          Book Free Session ↗
        </motion.a>
      </div>
    </section>
  );
}
