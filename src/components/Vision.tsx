import React from 'react';
import { motion } from 'motion/react';

export default function Vision() {
  return (
    <section className="py-24 px-6 md:px-12 bg-brand-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="aspect-[3/4] rounded-[40px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <img 
                src="https://picsum.photos/seed/vision/800/1200" 
                alt="Visionary Design" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-brand-accent text-brand-dark p-8 rounded-3xl hidden md:block">
              <p className="text-sm font-bold uppercase tracking-widest">Sarah West</p>
              <p className="text-[10px] uppercase tracking-widest opacity-60">Co-Founder & Strategy Officer</p>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-12">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-accent mb-8">Our Philosophy</p>
            <h2 className="text-6xl md:text-8xl leading-none mb-12">
              Imagine <br />
              <span className="text-brand-accent">What Happens</span> <br />
              When Design <br />
              Starts Working <br />
              Like Strategy.
            </h2>
            <div className="max-w-md space-y-6">
              <p className="text-xl text-brand-muted leading-relaxed">
                "We're not the kind of agency you hire to 'just do marketing'. We partner with teams who want to build a marketing engine — a system that scales, predicts, and delivers consistently."
              </p>
              <button className="flex items-center gap-4 text-brand-light font-bold uppercase tracking-widest text-xs border-b border-brand-light/20 pb-2 hover:border-brand-accent transition-colors">
                Meet Your Crew ↗
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Text */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none hidden lg:block">
        <h3 className="text-[20vw] font-display leading-none rotate-90 origin-center">INSIDE</h3>
      </div>
    </section>
  );
}
