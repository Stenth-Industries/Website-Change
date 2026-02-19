import React from 'react';
import { motion } from 'motion/react';

export default function Stats() {
  return (
    <section className="py-24 px-6 md:px-12 bg-brand-dark text-brand-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-8 md:gap-24 mb-32 opacity-40 text-[10px] uppercase tracking-[0.4em] font-bold">
          <span>SAAS</span>
          <span>EXPERT</span>
          <span>PRODUCT</span>
          <span>AGENCY</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <h2 className="text-6xl md:text-8xl leading-none">
              We don't just <br />
              <span className="text-brand-accent">Market Brands.</span>
            </h2>
            
            <div className="max-w-md space-y-8">
              <p className="text-brand-muted uppercase tracking-widest text-xs font-bold leading-relaxed">
                We build businesses through data-driven strategies and measurable results.
              </p>
              <p className="text-xl md:text-2xl font-medium leading-tight">
                Stenth is a <span className="text-brand-accent">Growth Engine</span> — we don't just provide services; we partner with you to scale your vision into a market leader.
              </p>
            </div>
          </div>

          <div className="relative h-[500px] flex items-center justify-center">
            {/* Isometric Stats Block */}
            <div className="relative w-full max-w-md perspective-[1000px]">
              <motion.div 
                initial={{ rotateX: 45, rotateZ: -45, y: 50, opacity: 0 }}
                whileInView={{ rotateX: 45, rotateZ: -45, y: 0, opacity: 1 }}
                animate={{ 
                  y: [0, -20, 0],
                }}
                transition={{ 
                  initial: { duration: 1, ease: "easeOut" },
                  animate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="relative transform-gpu"
              >
                {/* Top Face */}
                <div className="bg-brand-light p-12 shadow-2xl border border-brand-accent/20">
                  <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-2">
                      <p className="text-5xl font-display text-brand-dark">60+</p>
                      <p className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Launches</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-5xl font-display text-brand-dark">$4M+</p>
                      <p className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">In Revenue</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-5xl font-display text-brand-dark">X 12</p>
                      <p className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">ROI Up To</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-5xl font-display text-brand-dark">90%</p>
                      <p className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Customers Return</p>
                    </div>
                  </div>
                </div>
                
                {/* Side Faces (Simulated with borders and shadows) */}
                <div className="absolute top-full left-0 w-full h-12 bg-brand-muted/20 origin-top transform-gpu -skew-x-[45deg]" />
                <div className="absolute top-0 left-full w-12 h-full bg-brand-muted/10 origin-left transform-gpu -skew-y-[45deg]" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
