import React from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';

const stages = [
  { id: '01', name: 'Audit', pos: 'top' },
  { id: '02', name: 'Strategy', pos: 'right' },
  { id: '03', name: 'Creative', pos: 'bottom' },
  { id: '04', name: 'Launch', pos: 'left' },
  { id: '05', name: 'Optimisation', pos: 'center-left' },
  { id: '06', name: 'Analytics', pos: 'center-right' },
];

const steps = [
  { id: '01', title: 'Request', desc: 'After your request you meet directly with our strategy and growth team to map out your goals.' },
  { id: '02', title: 'Deep Brief', desc: 'We unpack your product, funnel, and market positioning to build a strategy tailored to your business.' },
  { id: '03', title: 'MVP Launch', desc: 'In 7-14 days, we roll out a minimal yet functional funnel that collects real data and gets early traction.' },
  { id: '04', title: 'Scaling', desc: 'We analyze, optimize, and scale what performs — every next step is backed by conversion metrics, not intuition.' },
];

export default function Process() {
  return (
    <section className="py-24 px-6 md:px-12 bg-brand-dark overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32">
          <h2 className="text-6xl md:text-9xl leading-none mb-8">
            You're the CMO. <br />
            <span className="text-brand-accent">We're the Launch Team.</span>
          </h2>
        </div>

        {/* Circular Stages Diagram */}
        <div className="relative h-[600px] flex items-center justify-center mb-48">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none">
            <h3 className="text-[30vw] font-display">STAGES</h3>
          </div>
          
          <div className="relative w-full max-w-2xl aspect-square">
            {/* Center Plus */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-brand-accent flex items-center justify-center z-10 bg-brand-dark">
              <Plus className="text-brand-accent" size={40} />
            </div>

            {/* Stage Nodes */}
            {stages.map((stage, i) => {
              const angle = (i / stages.length) * Math.PI * 2;
              const x = Math.cos(angle) * 40;
              const y = Math.sin(angle) * 40;
              
              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="absolute"
                  style={{ 
                    left: `${50 + x}%`, 
                    top: `${50 + y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-bold text-brand-accent">{stage.id}</span>
                    <span className="text-sm uppercase tracking-widest font-bold whitespace-nowrap">{stage.name}</span>
                  </div>
                </motion.div>
              );
            })}

            {/* Connecting Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
              <circle cx="50%" cy="50%" r="40%" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </div>
        </div>

        {/* Step by Step */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-accent mb-8">The Process</p>
            <h3 className="text-4xl md:text-6xl leading-tight mb-12">We follow a <span className="text-brand-accent">strategic, outcome-driven</span> process:</h3>
            
            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.id} className="group border-b border-brand-light/10 pb-4">
                  <div className="flex items-center gap-6">
                    <span className="text-4xl font-display opacity-20 group-hover:opacity-100 group-hover:text-brand-accent transition-all">
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
