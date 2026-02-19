import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const navItems = ['Services', 'About', 'Portfolio', 'Contact'];

  return (
    <nav className="fixed top-0 left-0 w-full z-40 px-6 py-8 md:px-12 flex justify-between items-center mix-blend-difference">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3 group cursor-pointer"
      >
        <div className="w-10 h-10 relative">
          <img 
            src="https://raw.githubusercontent.com/StenthAgency/assets/main/logo.png" 
            alt="Stenth Logo" 
            className="w-full h-full object-contain group-hover:rotate-12 transition-transform duration-500"
            onError={(e) => {
              // Fallback if image fails
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full bg-brand-accent rounded-lg flex items-center justify-center font-display text-brand-dark">S</div>';
            }}
          />
        </div>
        <span className="font-display text-2xl tracking-tighter group-hover:text-brand-accent transition-colors">STENTH</span>
      </motion.div>
      
      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[11px] uppercase tracking-[0.2em] font-medium opacity-60 hover:opacity-100 transition-opacity"
          >
            {item}
          </a>
        ))}
      </div>

      <a
        href="#contact"
        className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold border-b border-brand-light/20 pb-1 hover:border-brand-light transition-colors"
      >
        Book Free Session <ArrowUpRight size={14} />
      </a>
    </nav>
  );
}
