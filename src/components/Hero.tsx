import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'motion/react';
import { Plus, Radio } from 'lucide-react';

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollY } = useScroll();

  const springConfig = { damping: 20, stiffness: 100 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  const bgY = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex flex-col justify-end px-6 pb-12 md:px-12 md:pb-24 overflow-hidden bg-brand-dark">
      {/* Video Texture Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover grayscale contrast-125"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-flowing-dark-smoke-2471-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-brand-dark/60" />
      </div>

      {/* Interactive Spotlight */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${spotlightX}px ${spotlightY}px, rgba(111, 156, 235, 0.15), transparent 80%)`
        }}
      />

      {/* Live Status Indicator */}
      <div className="absolute top-32 left-6 md:left-12 z-20 flex items-center gap-3">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-accent"></span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-accent">Strategy. Marketing. Growth.</span>
      </div>

      {/* Background Large Text & Logo */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none opacity-[0.03] select-none flex flex-col items-center"
      >
        <div className="w-[30vw] h-[30vw] mb-8">
           <img 
            src="https://raw.githubusercontent.com/StenthAgency/assets/main/logo.png" 
            alt="Stenth Logo Watermark" 
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-[40vw] leading-none text-center font-display">
          STENTH
        </h1>
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-4 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-brand-accent text-sm md:text-base font-medium uppercase tracking-widest leading-tight">
              Digital Marketing<br />
              That Builds<br />
              Businesses.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-4 text-brand-muted"
          >
            <div className="h-[1px] w-12 bg-brand-muted/30" />
            <p className="text-[10px] uppercase tracking-[0.3em]">
              Data-driven strategies & measurable results
            </p>
          </motion.div>
        </div>

        <div className="md:col-span-4 flex justify-center md:justify-start">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-brand-accent/30 flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent transition-all duration-500 overflow-hidden">
              <Plus className="text-brand-accent group-hover:text-brand-dark transition-colors relative z-10" size={32} />
              <motion.div 
                className="absolute inset-0 bg-brand-accent opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />
            </div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Start Growing</span>
          </motion.button>
        </div>

        <div className="md:col-span-4 text-right hidden md:block">
          <div className="space-y-2">
            <p className="text-brand-muted text-[10px] uppercase tracking-widest">Our Focus:</p>
            <p className="text-sm opacity-60 italic">Transforming brands into market leaders</p>
            <div className="flex justify-end gap-1 pt-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-1 h-1 rounded-full ${i === 0 ? 'bg-brand-accent' : 'bg-brand-muted/30'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 md:mt-24 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[9vw] md:text-[10vw] leading-[0.85] font-display text-brand-light whitespace-nowrap relative"
        >
          <span className="relative z-10 text-gradient">Build Your Business</span>
          {/* Video Mask Overlay (Subtle) */}
          <div className="absolute inset-0 z-0 mix-blend-overlay opacity-40 pointer-events-none overflow-hidden">
             <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover scale-150"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-liquid-ink-swirling-in-water-4445-large.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.h1>
        
        <div className="flex flex-wrap gap-x-12 gap-y-4 mt-8 opacity-40">
          {['Paid Advertising', 'SEO Services', 'Web Development', 'Content Marketing', 'Analytics & Tracking', 'Branding'].map((text, i) => (
            <motion.span 
              key={text} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + (i * 0.1) }}
              className="text-[10px] uppercase tracking-[0.2em] font-medium whitespace-nowrap"
            >
              {text}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

