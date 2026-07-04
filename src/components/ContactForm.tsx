import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { CAL_BOOKING_URL } from '../constants';
import { submitLead } from '../leads';

export default function ContactForm() {
  const [phase, setPhase] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setPhase('sending');
    try {
      await submitLead({
        _subject: `Growth audit request: ${data.get('name')}`,
        name: data.get('name'),
        email: data.get('email'),
        website: data.get('website'),
        goal: data.get('goal'),
        message: data.get('message'),
      });
      setPhase('sent');
    } catch {
      setPhase('error');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-brand-dark">
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
              <p className="text-xs uppercase tracking-[0.4em] font-bold text-brand-muted mb-4">Not ready to chat?</p>
              <h3 className="text-2xl mb-6">Take the 2026 B2B Funnel Checklist, live</h3>
              <div className="flex flex-col gap-3">
                <a
                  href="/funnel-check"
                  className="flex items-center gap-2 text-brand-accent font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all"
                >
                  Score Your Funnel in 3 Minutes <ArrowRight size={16} />
                </a>
                <a
                  href="/stenth-funnel-checklist.pdf"
                  download
                  className="flex items-center gap-2 text-brand-light/50 font-bold uppercase tracking-widest text-xs hover:text-brand-light hover:gap-4 transition-all"
                >
                  Or download the PDF <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-brand-light p-8 md:p-12 rounded-[40px] text-brand-dark">
            {phase === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center text-center min-h-[420px]"
              >
                <CheckCircle2 size={44} className="text-brand-accent mb-6" />
                <h3 className="text-4xl mb-4">Got it. <span className="text-brand-accent">We're on it.</span></h3>
                <p className="text-brand-dark/60 max-w-sm mb-8">
                  Your request is in. One of the founders will reply within 24 hours.
                  Want to skip the wait?
                </p>
                <a
                  href={CAL_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-dark text-brand-light text-xs uppercase tracking-[0.2em] font-bold hover:bg-brand-accent hover:text-brand-dark transition-all"
                >
                  Book a Call Now <ArrowRight size={14} />
                </a>
              </motion.div>
            ) : (
              <>
                <h3 className="text-4xl mb-8">Map Your Next <span className="text-brand-accent">Growth Step</span></h3>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold opacity-70">Name</label>
                      <input type="text" name="name" required className="w-full bg-transparent border-b border-brand-dark/10 py-2 focus:border-brand-accent outline-none transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold opacity-70">Email</label>
                      <input type="email" name="email" required className="w-full bg-transparent border-b border-brand-dark/10 py-2 focus:border-brand-accent outline-none transition-colors" placeholder="you@company.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold opacity-70">Company Website</label>
                    <input type="text" name="website" className="w-full bg-transparent border-b border-brand-dark/10 py-2 focus:border-brand-accent outline-none transition-colors" placeholder="example.com" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="goal-select" className="text-xs uppercase tracking-widest font-bold opacity-70">What do you want to improve?</label>
                    <select id="goal-select" name="goal" defaultValue="" className="w-full bg-transparent border-b border-brand-dark/10 py-2 focus:border-brand-accent outline-none transition-colors appearance-none">
                      <option value="" disabled>Select your goal</option>
                      <option>SEO & Organic Growth</option>
                      <option>Paid Ads Scaling</option>
                      <option>AI Automation</option>
                      <option>Full Funnel Build</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold opacity-70">Your Goal</label>
                    <textarea name="message" className="w-full bg-transparent border-b border-brand-dark/10 py-2 focus:border-brand-accent outline-none transition-colors min-h-[100px]" placeholder="Tell us about your targets..." />
                  </div>

                  <button
                    disabled={phase === 'sending'}
                    className="w-full py-6 bg-brand-dark text-brand-light rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-brand-accent hover:text-brand-dark transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {phase === 'sending' ? 'Sending…' : 'Get My Audit Plan'}
                  </button>
                  {phase === 'error' && (
                    <p className="text-center text-sm text-red-500">
                      That didn't go through. Please email us directly at{' '}
                      <a href="mailto:info@stenth.com" className="font-bold underline">info@stenth.com</a>
                    </p>
                  )}
                  <p className="text-center text-xs text-brand-dark/50">
                    Prefer to talk?{' '}
                    <a href={CAL_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-brand-accent hover:underline">
                      Book a free 30-minute call
                    </a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
