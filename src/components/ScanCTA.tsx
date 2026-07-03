import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Search, ArrowRight, Gauge } from 'lucide-react';

/* Homepage on-ramp to /scan. Submitting navigates with ?site= so the scan
   page starts automatically. */
export default function ScanCTA() {
  const inputRef = useRef<HTMLInputElement>(null);

  const goScan = (e: React.FormEvent) => {
    e.preventDefault();
    const site = (inputRef.current?.value ?? '').trim();
    window.location.href = site ? `/scan?site=${encodeURIComponent(site)}` : '/scan';
  };

  return (
    <section className="relative px-6 md:px-12 py-24 md:py-32 border-t border-white/[0.06] overflow-hidden">
      {/* Giant background score */}
      <div className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 select-none opacity-[0.03] hidden lg:block">
        <span className="font-display text-[24vw] leading-none tracking-tighter">100</span>
      </div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-brand-accent mb-6 flex items-center gap-3">
            <Gauge size={14} /> Stenth Scan · Free
          </p>
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-[0.95] mb-6">
            Test your website in <span className="text-brand-accent">60 seconds.</span>
          </h2>
          <p className="text-lg md:text-xl text-brand-light/70 leading-relaxed max-w-xl">
            Speed, SEO, mobile, accessibility: real data from Google's own testing
            engine, translated into plain English. No email. No sales call. Just answers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <form
            onSubmit={goScan}
            className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:p-10"
          >
            <label className="block font-mono text-xs uppercase tracking-[0.3em] text-brand-light/50 mb-4">
              Your website address
            </label>
            <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-6 py-4 mb-4 focus-within:border-brand-accent/60 transition-colors">
              <Search size={16} className="text-white/40 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                name="site"
                placeholder="yourcompany.com"
                autoComplete="url"
                className="w-full bg-transparent outline-none text-brand-light placeholder:text-white/30 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-brand-accent text-brand-dark text-xs uppercase tracking-[0.3em] font-bold hover:shadow-[0_0_40px_rgba(111,156,235,0.5)] transition-all duration-300"
            >
              Scan My Site <ArrowRight size={16} />
            </button>
            <p className="mt-4 text-center text-[11px] text-brand-light/35 font-mono uppercase tracking-[0.2em]">
              Powered by Google PageSpeed data
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
