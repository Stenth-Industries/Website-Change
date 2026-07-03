import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';

const StatSlab = ({ val, label, story, index, progress, mouseX, mouseY }: any) => {
  const ref = useRef(null);
  const depth = useMemo(() => 1 + index * 0.15, [index]);

  // High-fidelity inertial fluid motion
  const yBase = useTransform(progress, [0, 1], [60 * depth, -60 * depth]);
  const y = useSpring(yBase, { stiffness: 120, damping: 35 });

  const rotateXBase = useTransform(mouseY, [0, 1000], [8, -8]);
  const rotateX = useSpring(rotateXBase, { stiffness: 80, damping: 25 });

  const rotateYBase = useTransform(mouseX, [0, 1400], [-8, 8]);
  const rotateY = useSpring(rotateYBase, { stiffness: 80, damping: 25 });

  // Holographic Chromatic Aberration positions
  const shiftX = useTransform(mouseX, [0, 1400], [-3, 3]);
  const shiftY = useTransform(mouseY, [0, 1000], [-3, 3]);

  return (
    <motion.div
      ref={ref}
      style={{ y, rotateX, rotateY, zIndex: 10 - index }}
      className="relative group w-full aspect-[4/3] rounded-[2.5rem] p-8 overflow-hidden 
                 border border-white/10 bg-white/[0.01] backdrop-blur-[100px] 
                 shadow-[0_45px_100px_-20px_rgba(0,0,0,0.6)] transition-all duration-700
                 hover:bg-white/[0.03] hover:border-white/30 hover:shadow-blue-500/15"
    >
      {/* Holographic RGB Shift Layers */}
      <motion.div
        style={{ x: shiftX, y: shiftY }}
        className="absolute inset-0 border border-red-500/10 rounded-[2.5rem] pointer-events-none mix-blend-screen opacity-0 group-hover:opacity-40 transition-opacity duration-700"
      />
      <motion.div
        style={{ x: useTransform(shiftX, v => -v), y: useTransform(shiftY, v => -v) }}
        className="absolute inset-0 border border-blue-500/10 rounded-[2.5rem] pointer-events-none mix-blend-screen opacity-0 group-hover:opacity-40 transition-opacity duration-700"
      />

      {/* Internal Glare Flare */}
      <motion.div
        style={{
          left: useTransform(mouseX, [0, 1400], ["-30%", "130%"]),
          top: useTransform(mouseY, [0, 1000], ["-30%", "130%"])
        }}
        className="absolute w-96 h-96 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
      />

      <div className="relative z-10 h-full flex flex-col justify-end">
        {/* Story Lead-in */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 0.9, x: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-blue-400 mb-4 font-bold"
        >
          {story}
        </motion.div>

        {/* Ignition Metrics */}
        <motion.div
          className="text-6xl md:text-8xl font-display text-white mb-2 tracking-tighter"
          whileInView={{
            filter: ["brightness(1) blur(0px)", "brightness(2) blur(4px)", "brightness(1) blur(0px)"],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.1 }}
        >
          {val}
        </motion.div>

        <p className="text-xs uppercase font-mono tracking-[0.5em] text-blue-500/70 font-bold">
          {label}
        </p>
      </div>

      {/* Technical Decals */}
      <div className="absolute top-8 right-8 opacity-30">
        <div className="w-16 h-px bg-gradient-to-r from-blue-500/40 to-transparent" />
        <div className="h-16 w-px bg-gradient-to-b from-blue-500/40 to-transparent absolute top-0 left-0" />
      </div>
    </motion.div>
  );
};

export default function Stats() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  const stats = [
    { val: '1:1', label: 'Senior-Led, No Juniors', story: 'You work with the founders' },
    { val: '48h', label: 'Response Time', story: 'We move at your pace' },
    { val: '0', label: 'Long-Term Lock-Ins', story: 'Earn your business monthly' },
    { val: '100%', label: 'Focused on Your Growth', story: 'Revenue over vanity metrics' }
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-40 px-6 md:px-12 bg-brand-dark text-brand-light relative overflow-hidden"
    >
      {/* Cinematic Aurora Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{
            x: useTransform(mouseX, [0, 1400], [-120, 120]),
            y: useTransform(mouseY, [0, 1000], [-80, 80]),
            opacity: useTransform(scrollYProgress, [0.1, 0.4, 0.7], [0.2, 0.8, 0.2])
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1000px] bg-blue-600/5 blur-[200px] rounded-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,#01080F_100%)]" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-wrap justify-center gap-8 md:gap-32 mb-40 opacity-70 text-sm uppercase tracking-[0.6em] font-medium text-brand-light">
          <span>Strategy</span>
          <span>Performance</span>
          <span>Growth</span>
          <span>Retention</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          {/* Narrative Content */}
          <div className="lg:col-span-5 space-y-20">
            <div className="space-y-10">
              <div className="flex items-center gap-6">
                <div className="w-16 h-px bg-blue-600/40" />
                <span className="font-mono text-xs uppercase tracking-[0.6em] text-blue-500">Performance Index</span>
              </div>

              <h2 className="text-8xl md:text-[10rem] leading-[0.8] tracking-tighter">
                We do not just <br />
                <span className="text-gradient">run marketing.</span>
              </h2>
            </div>

            <div className="max-w-md space-y-12 border-l border-white/5 pl-10 ml-2">
              <p className="text-brand-light/80 text-base leading-relaxed font-light">
                Our methodology is built on data and delivered with precision. We prioritise qualified leads and revenue over vanity metrics.
              </p>
              <p className="text-2xl md:text-3xl font-light leading-snug text-white/90 tracking-tight">
                Stenth operates as your strategic partner. We bridge the gap between where your vision is now and where it deserves to be.
              </p>
            </div>
          </div>

          {/* Cinematic Narrative Sculpture */}
          <div className="lg:col-span-7 relative">
            {/* Particle Data-Stream Connectivity */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0" viewBox="0 0 600 850">
              <motion.path
                d="M 150 150 L 450 350 L 150 550 L 450 750"
                fill="none"
                stroke="rgba(111, 156, 235, 0.1)"
                strokeWidth="1"
              />
              {/* Particle flow */}
              <motion.path
                d="M 150 150 L 450 350 L 150 550 L 450 750"
                fill="none"
                stroke="rgba(111, 156, 235, 0.6)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="1 100"
                animate={{ strokeDashoffset: [1000, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <motion.path
                d="M 150 150 L 450 350 L 150 550 L 450 750"
                fill="none"
                stroke="rgba(111, 156, 235, 0.4)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="1 80"
                animate={{ strokeDashoffset: [800, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
              />
            </svg>

            <div className="grid grid-cols-2 gap-6 md:gap-12 perspective-[2500px] relative z-10">
              {stats.map((s, i) => (
                <div key={s.label} className={`relative ${i % 2 !== 0 ? 'mt-40 md:mt-64' : ''}`}>
                  <StatSlab
                    {...s}
                    index={i}
                    progress={scrollYProgress}
                    mouseX={mouseX}
                    mouseY={mouseY}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
