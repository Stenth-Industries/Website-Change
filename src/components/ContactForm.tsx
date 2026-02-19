import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function ContactForm() {
  return (
    <section className="py-24 px-6 md:px-12 bg-brand-dark">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h2 className="text-6xl md:text-8xl leading-none mb-12">
              Let's Build <br />
              <span className="text-brand-accent">A System.</span>
            </h2>
            <p className="text-xl text-brand-muted max-w-md mb-12">
              Your growth shouldn't depend on luck or vibes. Let's build a predictable, scalable engine backed by data and strategy.
            </p>

            <div className="p-8 rounded-3xl bg-brand-light/5 border border-brand-light/5">
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-muted mb-4">Not ready to chat?</p>
              <h3 className="text-2xl mb-6">Download our 2025 B2B Funnel Checklist</h3>
              <button className="flex items-center gap-2 text-brand-accent font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all">
                Download Free PDF <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="bg-brand-light p-8 md:p-12 rounded-[40px] text-brand-dark">
            <h3 className="text-4xl mb-8">Map Your Next <span className="text-brand-accent">Growth Step</span></h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-brand-dark/10 py-2 focus:border-brand-accent outline-none transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Company Website</label>
                  <input type="text" className="w-full bg-transparent border-b border-brand-dark/10 py-2 focus:border-brand-accent outline-none transition-colors" placeholder="example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">What do you want to improve?</label>
                <select className="w-full bg-transparent border-b border-brand-dark/10 py-2 focus:border-brand-accent outline-none transition-colors appearance-none">
                  <option>Select your goal</option>
                  <option>SEO & Organic Growth</option>
                  <option>Paid Ads Scaling</option>
                  <option>AI Automation</option>
                  <option>Full Funnel Build</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Your Goal</label>
                <textarea className="w-full bg-transparent border-b border-brand-dark/10 py-2 focus:border-brand-accent outline-none transition-colors min-h-[100px]" placeholder="Tell us about your targets..." />
              </div>

              <button className="w-full py-6 bg-brand-dark text-brand-light rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-brand-accent hover:text-brand-dark transition-all">
                Get My Audit Plan
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
