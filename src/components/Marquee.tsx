import React from 'react';
import { motion } from 'motion/react';

const results = [
  "GROWTH CONSULTING FOR AMBITIOUS BUSINESSES",
  "SENIOR-LED · FOUNDER-RUN · NO JUNIORS",
  "STRATEGY BEFORE SPEND — ALWAYS",
  "SEO · GOOGLE ADS · WEB · CONTENT · ANALYTICS",
  "NO LONG-TERM LOCK-IN CONTRACTS",
  "BOOK A FREE STRATEGY SESSION"
];

export default function Marquee() {
  return (
    <div className="bg-brand-accent py-4 overflow-hidden border-y border-brand-dark/10">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 items-center"
        >
          {results.map((text, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="text-brand-dark text-xs font-bold uppercase tracking-widest">
                {text}
              </span>
              <span className="w-2 h-2 bg-brand-dark rounded-full" />
            </div>
          ))}
        </motion.div>
        {/* Duplicate for seamless loop */}
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 items-center"
        >
          {results.map((text, i) => (
            <div key={i + 'copy'} className="flex items-center gap-12">
              <span className="text-brand-dark text-xs font-bold uppercase tracking-widest">
                {text}
              </span>
              <span className="w-2 h-2 bg-brand-dark rounded-full" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
