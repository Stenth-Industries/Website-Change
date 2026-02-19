import React from 'react';
import { motion } from 'motion/react';

const testimonials = [
  {
    name: 'Sarah West',
    role: 'Co-Founder & Growth Lead',
    company: 'CloudOps Tools',
    quote: "We've been through 4 agencies before finding Stenth. They didn't just 'run ads', they rebuilt our entire funnel. Revenue is up 3x and our CAC is finally where it needs to be.",
    result: '3X Revenue Growth'
  },
  {
    name: 'John Mathews',
    role: 'CEO',
    company: 'MedTech Base',
    quote: "The AI agent they built for our lead qualification has saved us 20+ hours a week. It's like having a full-time sales assistant that never sleeps.",
    result: '20+ Hours Saved/Week'
  }
];

export default function Testimonials() {
  return (
    <section id="reviews" className="py-24 px-6 md:px-12 bg-brand-dark">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-accent mb-4">Testimonials</p>
          <h2 className="text-6xl md:text-8xl leading-none">What Our <br />Clients Are Saying</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-12 rounded-[40px] bg-brand-light/5 border border-brand-light/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                <span className="text-[15vw] font-display">0{i + 1}</span>
              </div>
              
              <div className="relative z-10">
                <div className="mb-8">
                  <div className="bg-brand-accent text-brand-dark px-4 py-2 rounded-full inline-block mb-6">
                    <span className="text-sm font-bold uppercase tracking-widest">{t.result}</span>
                  </div>
                  <p className="text-2xl md:text-3xl font-medium leading-relaxed italic opacity-80">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-accent/20" />
                  <div>
                    <h4 className="text-lg font-bold">{t.name}</h4>
                    <p className="text-xs text-brand-muted uppercase tracking-widest">{t.role} @ {t.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
