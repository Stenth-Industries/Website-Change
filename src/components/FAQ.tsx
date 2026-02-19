import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What if we waste the budget again – like last time?",
    answer: "We don't launch in a silo. All budget is deployed based on real-time data and pre-defined KPIs. If something isn't working, we pivot immediately. Our 'MVP Launch' phase ensures you're not burning cash on unproven strategies."
  },
  {
    question: "Our product is complex – will you even get it?",
    answer: "We specialize in complex products. Our 'Deep Brief' phase is designed to extract the core value proposition and translate it into high-converting messaging."
  },
  {
    question: "We've launched before – nothing worked. Why should this be different?",
    answer: "Most agencies focus on traffic. We focus on the entire growth engine: from the first click to the final conversion and retention."
  },
  {
    question: "We're a small team – we don't have the bandwidth.",
    answer: "That's exactly why we're here. We act as your extended growth team, handling everything from strategy to execution so you can focus on your product."
  },
  {
    question: "Are you sure we're a fit? Will you even take us on?",
    answer: "We only work with clients where we know we can deliver a massive ROI. If we're not a fit, we'll tell you upfront."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-6 md:px-12 bg-brand-dark">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl leading-none mb-8">
            "We've tried agencies before. <br />
            <span className="text-brand-accent">It didn't work out."</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-brand-light/10 rounded-2xl overflow-hidden bg-brand-light/5"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full p-6 md:p-8 flex justify-between items-center text-left hover:bg-brand-light/5 transition-colors"
              >
                <span className="text-lg md:text-xl font-bold uppercase tracking-tight">
                  {faq.question}
                </span>
                {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 md:p-8 pt-0 text-brand-muted leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-24 flex flex-col items-center gap-8">
          <div className="w-16 h-16 rounded-full border border-brand-accent flex items-center justify-center animate-pulse">
            <Plus className="text-brand-accent" />
          </div>
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-muted">Growth Diagnostic</p>
        </div>
      </div>
    </section>
  );
}
