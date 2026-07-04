import React from 'react';
import { motion } from 'motion/react';

/* The orbital hub in HowItWorks already visualises the working system, so
   this section keeps a single job: the four-step engagement narrative. */
const steps = [
  { id: '01', title: 'Request', desc: 'After your enquiry, you meet directly with our strategy team to map out your goals and the customers you want more of.' },
  { id: '02', title: 'Deep Brief', desc: 'We unpack your offers, ideal customers, and market to build a strategy tailored to your business.' },
  { id: '03', title: 'Quick Launch', desc: 'In 7 to 14 days, we roll out a focused setup: landing page, tracking, and a first campaign that starts collecting real enquiry data.' },
  { id: '04', title: 'Scaling', desc: 'We analyse, optimise, and scale what works. Every next step is backed by real enquiry and conversion data, not intuition.' },
];

export default function Process() {
  return (
    <section id="process" className="py-24 px-6 md:px-12 bg-brand-dark overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-6xl md:text-9xl leading-none mb-8">
            You run the business. <br />
            <span className="text-brand-accent">We run the growth.</span>
          </h2>
        </div>

        {/* Step by Step */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] font-bold text-brand-accent mb-8">The Process</p>
            <h3 className="text-4xl md:text-6xl leading-tight mb-12">We follow a <span className="text-brand-accent">strategic, outcome-driven</span> process:</h3>
            
            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.id} className="group border-b border-brand-light/10 pb-4">
                  <div className="flex items-center gap-6">
                    <span className="text-4xl font-display opacity-40 group-hover:opacity-100 group-hover:text-brand-accent transition-all">
                      {step.id}
                    </span>
                    <h4 className="text-3xl uppercase tracking-tighter">{step.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12 pt-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.id + 'desc'}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="max-w-md"
              >
                <p className="text-brand-muted leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
