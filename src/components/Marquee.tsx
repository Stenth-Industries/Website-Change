import React from 'react';
import { motion } from 'motion/react';

const results = [
  "5X GROWTH IN DEMO BOOKINGS THROUGH CLEAR ICP SEGMENTATION",
  "312% QUALIFIED LEADS IN 2 MONTHS VIA FUNNEL REPOSITIONING",
  "180K IN FIRST 30 DAYS WITH FAST-TRACK MVP LAUNCH",
  "ZERO AD WASTE ON COLD TRAFFIC",
  "RETARGETING STRATEGY THAT WORKS",
  "REAL AUDIENCE MAPPING USING MVP"
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
              <span className="text-brand-dark text-[10px] font-bold uppercase tracking-widest">
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
              <span className="text-brand-dark text-[10px] font-bold uppercase tracking-widest">
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
