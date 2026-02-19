import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const models = [
  {
    title: 'Pilot Sprint',
    duration: '14-21 Days',
    desc: 'Test a single growth hypothesis with a fast-track MVP launch.',
    includes: [
      'Mini funnel design (Lead Magnet / LP)',
      '1-2 campaigns on Meta or Google Ads',
      'Conversion-focused landing page',
      'Copy & creative assets (up to 3 variations)',
      'Weekly reporting: CAC, LTV, ROI',
      'Optimization loop: 1 iteration included'
    ],
    cta: 'Start From Here'
  },
  {
    title: 'Diagnostic',
    duration: '30-45 Days',
    desc: 'A deep dive into your existing funnel to find and fix leaks.',
    includes: [
      'Full funnel audit with strategy comments',
      'Review of all accounts and creatives',
      'Market & competitor research',
      'Analysis of positioning, audience, and messaging',
      '2x 60-min consulting call with strategist',
      'Step-by-step roadmap for traction/scaling'
    ],
    cta: 'Start From Here'
  },
  {
    title: 'Full Project',
    duration: 'Custom',
    desc: 'End-to-end growth engine build and management.',
    includes: [
      'Full funnel build out (click to sale)',
      'Traffic plan + ad setup',
      'Ads on 2 platforms',
      'Landing pages & funnels',
      'Weekly strategy calls',
      'Full CRM / GTM / GA4 tracking',
      'Monthly strategic growth audit'
    ],
    cta: 'Start From Here',
    featured: true
  },
  {
    title: 'Partnership',
    duration: 'Retainer Based',
    desc: 'Long-term growth partnership for established brands.',
    includes: [
      'Dedicated strategist, analyst & ad team',
      'Ongoing funnel design and iterations',
      'Multi-channel Ads (FB, IG, Google, LinkedIn)',
      'Campaigns for retention, upsell, referral',
      'Monthly growth experiments roadmap',
      'Strategic reviews every 2 weeks',
      'Priority 24/5 messaging support'
    ],
    cta: 'Start From Here'
  }
];

export default function Engagement() {
  return (
    <section className="py-24 px-6 md:px-12 bg-brand-light text-brand-dark rounded-[40px] md:rounded-[80px] relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-muted mb-4">Engagement Models</p>
          <h2 className="text-6xl md:text-8xl leading-none">Choose Your <br />Speed.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {models.map((model, i) => (
            <motion.div
              key={model.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-3xl flex flex-col ${model.featured ? 'bg-brand-accent text-brand-dark' : 'bg-brand-dark text-brand-light'}`}
            >
              <div className="mb-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-display">{model.title}</h3>
                  <span className={`text-[10px] px-2 py-1 rounded-full border ${model.featured ? 'border-brand-dark/20' : 'border-brand-light/20'}`}>
                    {model.duration}
                  </span>
                </div>
                <p className={`text-sm ${model.featured ? 'opacity-80' : 'text-brand-muted'}`}>
                  {model.desc}
                </p>
              </div>

              <div className="flex-grow space-y-4 mb-12">
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">What's Included:</p>
                <ul className="space-y-3">
                  {model.includes.map((item, idx) => (
                    <li key={idx} className="text-xs flex gap-2">
                      <span className="opacity-40">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button className={`w-full py-4 rounded-full flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold transition-all ${model.featured ? 'bg-brand-dark text-brand-light hover:bg-brand-dark/90' : 'bg-brand-accent text-brand-dark hover:bg-brand-accent/90'}`}>
                {model.cta} <ArrowUpRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 pt-12 border-t border-brand-dark/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <h3 className="text-3xl md:text-4xl">No clue <span className="text-brand-accent">what to choose?</span> Let's fix that.</h3>
          <button className="px-8 py-4 rounded-full border border-brand-dark/20 text-xs uppercase tracking-[0.2em] font-bold hover:bg-brand-dark hover:text-brand-light transition-all">
            Try our quick-fit quiz
          </button>
        </div>
      </div>
    </section>
  );
}
