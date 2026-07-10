import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Gauge, Scale } from 'lucide-react';

interface HubLink {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

const LINKS: HubLink[] = [
  {
    title: 'Stenth Ops Dashboard',
    description: 'The lead-gen machine — funnel, conversion rates vs. targets, upcoming calls, warmup health, safety gates.',
    href: 'https://dashboard.stenth.com',
    icon: <Gauge size={20} />,
  },
  {
    title: 'Blottman — Client Performance',
    description: 'Live Google Ads spend, leads, and cost-per-lead for Blottman Law.',
    href: 'https://blottman.stenth.com',
    icon: <Scale size={20} />,
  },
];

export default function HubPage() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  return (
    <div className="relative min-h-screen bg-brand-dark font-sans overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-black" />
        <div className="noise-bg opacity-[0.05] z-10" />
        <motion.div
          animate={{ rotate: [0, 90, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1/4 -right-1/4 w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(111,156,235,0.06)_0%,transparent_70%)] blur-[80px]"
        />
        <motion.div
          animate={{ rotate: [0, -90, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-1/4 -left-1/4 w-[80vw] h-[80vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(67,56,202,0.06)_0%,transparent_70%)] blur-[100px]"
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[560px]"
        >
          <div className="flex flex-col items-center text-center mb-10">
            <img src="/Logo.png" alt="Stenth" className="h-[34px] w-auto object-contain drop-shadow-md mb-8" />
            <h1 className="text-[22px] font-semibold text-white tracking-tight mb-2">
              Dashboards
            </h1>
            <p className="text-[13.5px] text-white/50">
              Each one signs in separately — this is just the map.
            </p>
          </div>

          <div className="space-y-3">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-4 rounded-2xl bg-white/[0.02] border border-white/10 p-5 sm:p-6 shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-brand-accent/40 hover:bg-white/[0.04]"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
                  {link.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-semibold text-white">{link.title}</div>
                  <div className="text-[13px] text-white/50 mt-0.5 leading-snug">{link.description}</div>
                </div>
                <ArrowUpRight
                  size={18}
                  className="flex-shrink-0 text-white/30 group-hover:text-brand-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </a>
            ))}
          </div>

          <p className="mt-8 text-center text-[12.5px] text-white/30">
            More client dashboards will show up here as they're added.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
