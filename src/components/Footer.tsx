import React from 'react';
import { motion } from 'motion/react';
import { Mail, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="pt-24 pb-12 px-6 md:px-12 bg-brand-dark border-t border-brand-light/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          <div className="md:col-span-6">
            <h2 className="text-6xl md:text-8xl mb-8 leading-none">
              Let's Scale <br />
              <span className="text-brand-accent">Together.</span>
            </h2>
            <p className="text-xl text-brand-muted max-w-md mb-12">
              Ready to stop guessing and start growing? Our team is available for both online and offline consultations.
            </p>
            
            <div className="flex flex-col gap-4">
              <a href="mailto:info@stenth.com" className="text-2xl md:text-4xl font-display hover:text-brand-accent transition-colors flex items-center gap-4">
                info@stenth.com <Mail size={32} />
              </a>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-brand-accent mb-2">Canada Hub</p>
                  <p className="text-sm text-brand-muted">368 Prince of Wales Dr, Mississauga, ON L5B 0A1</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-brand-accent mb-2">Australia Hub</p>
                  <p className="text-sm text-brand-muted">Picnic Ave Clyde North VIC 3978, Australia</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 md:pt-12">
            <p className="text-xs uppercase tracking-[0.4em] font-bold text-brand-muted mb-8">Navigation</p>
            <ul className="space-y-4">
              {['Services', 'About', 'Process', 'Contact'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-lg hover:text-brand-accent transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 md:pt-12">
            <p className="text-xs uppercase tracking-[0.4em] font-bold text-brand-muted mb-8">Social</p>
            <div className="flex gap-6">
              <a href="https://www.instagram.com/stenth.official" target="_blank" rel="noopener noreferrer" aria-label="Stenth on Instagram" className="hover:text-brand-accent transition-colors"><Instagram size={24} /></a>
              <a href="https://www.linkedin.com/company/stenth" target="_blank" rel="noopener noreferrer" aria-label="Stenth on LinkedIn" className="hover:text-brand-accent transition-colors"><Linkedin size={24} /></a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-brand-light/5 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8">
              <img 
                src="/Logo.png" 
                alt="Stenth Logo" 
                className="w-full h-full object-contain opacity-50 hover:opacity-100 transition-opacity"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <span className="font-display text-2xl tracking-tighter">STENTH</span>
            <span className="text-xs text-brand-muted uppercase tracking-widest">© 2026 Stenth Agency. All rights reserved.</span>
          </div>
          <div className="flex gap-8 text-xs text-brand-muted uppercase tracking-widest">
            <a href="/privacy.html" className="hover:text-brand-light transition-colors">Privacy Policy</a>
            <a href="/terms.html" className="hover:text-brand-light transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
