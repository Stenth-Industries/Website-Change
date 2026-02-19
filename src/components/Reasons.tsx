import React from 'react';
import { motion } from 'motion/react';
import { Target, Zap, BarChart, Users, Layers, Lightbulb } from 'lucide-react';

const reasons = [
  {
    title: 'We Build Scalable Growth Systems',
    desc: 'Funnel + Traffic + Content + CRM - All aligned to grow revenue.',
    icon: Layers
  },
  {
    title: 'We Start with Strategy, Not Guesswork',
    desc: 'Data, psychology, and competitor research come first.',
    icon: Target
  },
  {
    title: 'We Track Real Business Metrics',
    desc: 'ROI, LTV, CAC, Conversions - Not just pretty graphs.',
    icon: BarChart
  },
  {
    title: 'One Skilled Expert Team, In-House',
    desc: 'No freelancers, no junior devs - Just full control.',
    icon: Users
  },
  {
    title: 'We Fill the Most Critical Team Gaps',
    desc: 'Messaging, Funnels, Automation - Done faster than hiring.',
    icon: Zap
  },
  {
    title: 'We Think Like Growth Partners',
    desc: 'Strategic, proactive, and focused on long-term impact.',
    icon: Lightbulb
  }
];

export default function Reasons() {
  return (
    <section className="py-24 px-6 md:px-12 bg-brand-dark border-t border-brand-light/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-accent mb-4">Why Us</p>
          <h2 className="text-5xl md:text-7xl leading-tight">Reasons Clients <br />Rely On Us:</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-light/5">
          {reasons.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-brand-dark p-12 group hover:bg-brand-accent/5 transition-colors"
            >
              <div className="flex justify-between items-start mb-8">
                <item.icon size={32} className="text-brand-accent opacity-40 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] font-bold opacity-20">0{index + 1}</span>
              </div>
              <h3 className="text-2xl mb-4 group-hover:text-brand-accent transition-colors">{item.title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
