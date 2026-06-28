import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'motion/react';

// ── Statement data ────────────────────────────────────────────────────────────
const STATEMENTS = [
  {
    id: 'recognition',
    range: [0.0, 0.20] as [number, number],
    blocks: [
      { text: "You're spending money on marketing.", weight: 'primary' },
      { text: "You have no idea if it's working.", weight: 'secondary' },
    ],
    heat: 'rgba(251,191,36,0.06)',
  },
  {
    id: 'fragmentation',
    range: [0.25, 0.45] as [number, number],
    blocks: [
      { text: "3 agencies. 3 reports.", weight: 'primary' },
      { text: "3 different versions of the truth.", weight: 'accent' },
    ],
    heat: 'rgba(239,68,68,0.06)',
  },
  {
    id: 'attribution',
    range: [0.50, 0.70] as [number, number],
    blocks: [
      { text: "Your ads say it's working.", weight: 'primary' },
      { text: "Your revenue disagrees.", weight: 'secondary' },
    ],
    heat: 'rgba(239,68,68,0.08)',
  },
  {
    id: 'reframe',
    range: [0.75, 0.85] as [number, number],
    blocks: [
      { text: "This isn't bad luck.", weight: 'muted' },
      { text: "It's a systems problem.", weight: 'primary' },
    ],
    heat: 'rgba(255,255,255,0.03)',
    mono: true,
  },
] as const;

type Weight = 'primary' | 'secondary' | 'accent' | 'muted';

// ── Solid line animated block ─────────────────────────────────────────────
function AnimLine({
  text, weight, delay, mono
}: { key?: React.Key; text: string; weight: Weight; delay: number; mono?: boolean }) {
  
  // Predictable, non-overlapping responsive font sizes
  const sizeClass = weight === 'primary' ? 'text-4xl md:text-6xl lg:text-7xl leading-[1.1] font-bold'
    : weight === 'secondary' ? 'text-3xl md:text-5xl lg:text-6xl leading-[1.15] text-white/50'
      : weight === 'accent' ? 'text-3xl md:text-5xl lg:text-6xl leading-[1.15] text-brand-accent'
        : 'text-2xl md:text-4xl lg:text-5xl leading-[1.2] text-white/70';

  const fontClass = mono ? 'font-mono uppercase tracking-[0.1em]' : 'font-display uppercase tracking-tight';

  return (
    <motion.h3 
      initial={{ y: 20, opacity: 0, filter: 'blur(8px)' }}
      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
      exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
      transition={{ delay: delay, duration: 0.6, ease: 'easeOut' }}
      className={`text-center w-full px-4 ${sizeClass} ${fontClass}`}
    >
      {text}
    </motion.h3>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function BuildingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPct, setScrollPct] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });
  useEffect(() => smooth.on('change', v => setScrollPct(v)), [smooth]);

  const activeIdx = STATEMENTS.findIndex(
    s => scrollPct >= s.range[0] && scrollPct < s.range[1]
  );
  const activeStmt = activeIdx >= 0 ? STATEMENTS[activeIdx] : null;
  const inResolution = scrollPct >= 0.85;

  const heatColor = activeStmt?.heat ?? 'rgba(0,0,0,0)';
  
  // Always-visible scroll guide fades out near end
  const scrollGuideOpacity = useTransform(smooth, [0, 0.8], [1, 0]);
  const resolveOpacity = useTransform(smooth, [0.85, 0.95], [0, 1]);
  const resolveY = useTransform(smooth, [0.85, 0.98], [40, 0]);

  // Timeline Progress
  const progressH = useTransform(smooth, [0, 1], ['0%', '100%']);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#000] font-sans text-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#010308]">

        {/* ── Background Heat & Noise ─── */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-1000 mix-blend-screen"
          style={{ background: `radial-gradient(circle 800px at 50% 50%, ${heatColor}, transparent)` }}
        />
        <div className="noise-bg absolute inset-0 opacity-40 pointer-events-none z-10" />

        {/* ── Giant Section Header (ALWAYS VISIBLE, CLEAR) ───────────────────────── */}
        <div className="absolute top-12 md:top-16 left-0 right-0 z-20 flex flex-col items-center pointer-events-none">
          <p className="font-mono text-[11px] md:text-sm uppercase tracking-[0.4em] text-white/40 mb-2 border border-white/10 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm">
            Phase 1: The Problem
          </p>
          <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent" />
        </div>

        {/* ── Right-Side Progress Timeline (MOBILE FRIENDLY) ─────────── */}
        <div className="absolute right-4 md:right-12 top-1/4 bottom-1/4 w-[2px] bg-white/10 rounded-full z-40">
          <motion.div style={{ height: progressH }} className="w-full bg-brand-accent rounded-full origin-top shadow-[0_0_10px_#6F9CEB]" />
        </div>

        {/* ── Explicit Persistent Scroll Hint at Bottom ──────────── */}
        <motion.div 
          style={{ opacity: scrollGuideOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30 pointer-events-none"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/50">Keep Scrolling</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"
          />
        </motion.div>

        {/* ── Statements Container ───────────────────────────────────── */}
        <div className="relative w-full max-w-5xl px-6 md:px-16 z-20 flex flex-col items-center justify-center -mt-10">
          <AnimatePresence mode="wait">
            
            {/* ── Intro State ── */}
            {activeIdx === -1 && scrollPct < 0.05 && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center text-center"
              >
                <h2 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-tight mb-6">
                  Running growth is <br/>
                  <span className="text-white/20">unnecessarily hard.</span>
                </h2>
              </motion.div>
            )}

            {/* ── Floating Statements ── */}
            {activeStmt && !inResolution && (
              <motion.div
                key={activeStmt.id}
                className="flex flex-col items-center gap-4 w-full"
              >
                {activeStmt.blocks.map((block, bi) => (
                  <AnimLine
                    key={bi}
                    text={block.text}
                    weight={block.weight as Weight}
                    delay={bi * 0.15}
                    mono={'mono' in activeStmt && activeStmt.mono}
                  />
                ))}
              </motion.div>
            )}
            
          </AnimatePresence>
        </div>

        {/* ── The Solution Screen (Resolution) ─────────────── */}
        <motion.div
          style={{ opacity: resolveOpacity }}
          className="absolute inset-0 z-20 pointer-events-none bg-black/60 backdrop-blur-md"
        />
        <motion.div
          style={{ opacity: resolveOpacity, y: resolveY }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] md:w-[40vw] h-[70vw] md:h-[40vw] bg-brand-accent/20 blur-[100px] rounded-full pointer-events-none" />
          
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.6em] text-brand-accent mb-6 border border-brand-accent/30 px-5 py-2 rounded-full bg-brand-accent/5 backdrop-blur-sm">Phase 2: The Solution</p>

          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-none mb-6">
            Stenth is <br />
            <span className="text-brand-accent drop-shadow-[0_0_30px_rgba(111,156,235,0.6)]">the system.</span>
          </h2>

          <p className="font-sans text-sm md:text-xl text-white/80 max-w-2xl leading-relaxed mb-10">
            One unified growth architecture. No gaps. No guessing. Just clear attribution and compounding scale.
          </p>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            style={{ pointerEvents: 'auto' }}
            className="px-8 md:px-12 py-4 md:py-5 rounded-full bg-brand-accent text-brand-dark text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold hover:shadow-[0_0_40px_rgba(111,156,235,0.6)] transition-all duration-300"
          >
            Start Growing Now
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
