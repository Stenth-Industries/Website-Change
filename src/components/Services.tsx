import React from 'react';
import { motion } from 'motion/react';
import { Search, Globe, Cpu, BarChart3, Zap, Users } from 'lucide-react';

const services = [
  {
    title: 'Paid Advertising',
    description: 'Strategic ad campaigns across Meta, Google, and LinkedIn designed for maximum ROI and scale.',
    icon: Zap,
    tags: ['Meta Ads', 'Google Search', 'LinkedIn Ads']
  },
  {
    title: 'SEO Services',
    description: 'Dominate search results with data-driven SEO that brings high-intent organic traffic to your door.',
    icon: Search,
    tags: ['Technical SEO', 'Content Strategy', 'Local SEO']
  },
  {
    title: 'Web Development',
    description: 'High-performance, gorgeous websites built to convert visitors into loyal customers.',
    icon: Globe,
    tags: ['UX/UI Design', 'Custom Dev', 'Optimization']
  },
  {
    title: 'Content Marketing',
    description: 'Compelling storytelling and content strategies that build brand authority and trust.',
    icon: Cpu,
    tags: ['Copywriting', 'Video Strategy', 'Social Content']
  },
  {
    title: 'Analytics & Tracking',
    description: 'Full-funnel tracking and data analysis to ensure every dollar spent is accounted for.',
    icon: BarChart3,
    tags: ['GTM/GA4', 'Custom Dashboards', 'ROI Tracking']
  },
  {
    title: 'Branding Services',
    description: 'Complete brand management and identity design that resonates with your target audience.',
    icon: Users,
    tags: ['Brand Identity', 'Positioning', 'Visual Design']
  }
];

export default function Services() {
  return (
    <section id="approach" className="py-24 px-6 md:px-12 bg-brand-light text-brand-dark rounded-[40px] md:rounded-[80px] -mt-12 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-6xl md:text-8xl mb-8 leading-none">
              Our Core <br />
              <span className="text-brand-accent">Expertise</span>
            </h2>
            <p className="text-lg md:text-xl text-brand-muted font-medium leading-relaxed">
              We combine design aesthetics with technical precision. 
              Our goal isn't just to make things look good—it's to make them perform.
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-muted mb-2">Service Portfolio</p>
            <p className="text-4xl font-display">01 — 04</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-dark/10">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-brand-light p-8 md:p-12 hover:bg-brand-accent/5 transition-colors group"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-full border border-brand-dark/10 flex items-center justify-center group-hover:border-brand-accent transition-colors">
                  <service.icon size={20} className="text-brand-dark group-hover:text-brand-accent transition-colors" />
                </div>
                <span className="text-[10px] font-bold opacity-20">0{index + 1}</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl mb-4 group-hover:text-brand-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-brand-muted mb-8 max-w-sm">
                {service.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {service.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full border border-brand-dark/5 text-[10px] uppercase tracking-wider font-bold opacity-60">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
