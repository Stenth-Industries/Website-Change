import React, { useEffect, useState, useRef } from 'react';
import { ArrowUpRight, Gauge, Scale, LogOut } from 'lucide-react';

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
    icon: <Gauge size={18} />,
  },
  {
    title: 'Blottman — Client Performance',
    description: 'Live Google Ads spend, leads, and cost-per-lead for Blottman Law.',
    href: 'https://blottman.stenth.com',
    icon: <Scale size={18} />,
  },
];

export default function HubPage() {
  const [state, setState] = useState<'checking' | 'ready'>('checking');
  const hueRef = useRef<SVGFEColorMatrixElement>(null);

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/hub-check', { credentials: 'same-origin' })
      .then((r) => {
        if (cancelled) return;
        if (r.ok) setState('ready');
        else window.location.href = '/login';
      })
      .catch(() => {
        if (!cancelled) window.location.href = '/login';
      });
    return () => { cancelled = true; };
  }, []);

  // Ethereal Shadow Animation
  useEffect(() => {
    let hue = 0;
    let animationFrameId: number;
    const speed = 0.6; // degrees per frame

    const animateEthereal = () => {
      hue = (hue + speed) % 360;
      if (hueRef.current) {
        hueRef.current.setAttribute('values', String(hue));
      }
      animationFrameId = requestAnimationFrame(animateEthereal);
    };

    if (state === 'ready') {
      animateEthereal();
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [state]);

  function signOut() {
    fetch('/api/hub-logout', { method: 'POST', credentials: 'same-origin' }).finally(() => {
      window.location.href = '/login';
    });
  }

  if (state === 'checking') {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <div className="relative min-h-screen bg-black font-sans overflow-hidden text-white">
      {/* ── Ethereal Shadow Background ── */}
      <div className="fixed inset-0 z-0 overflow-hidden w-full h-full pointer-events-none">
        {/* Hidden SVG filter definition */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <filter id="ethereal-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                id="eth-turbulence"
                result="undulation"
                numOctaves="2"
                baseFrequency="0.0005,0.002"
                seed="0"
                type="turbulence"
              />
              <feColorMatrix
                id="eth-hue"
                ref={hueRef}
                in="undulation"
                type="hueRotate"
                values="0"
              />
              <feColorMatrix
                in="dist"
                result="circulation"
                type="matrix"
                values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="circulation"
                scale="80"
                result="dist"
              />
              <feDisplacementMap
                in="dist"
                in2="undulation"
                scale="80"
                result="output"
              />
            </filter>
          </defs>
        </svg>

        <div 
          className="absolute inset-[-100px]" 
          style={{ filter: 'url(#ethereal-filter) blur(6px)' }}
        >
          <div 
            className="w-full h-full"
            style={{
              backgroundColor: 'rgba(111, 156, 235, 0.55)',
              maskImage: "url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png')",
              WebkitMaskImage: "url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png')",
              maskSize: 'cover',
              WebkitMaskSize: 'cover',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center',
            }}
          />
        </div>
        <div 
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: "url('https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png')",
            backgroundSize: '240px',
            backgroundRepeat: 'repeat',
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <div 
          className="w-full max-w-[560px]"
          style={{
            animation: 'cardIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s forwards',
            opacity: 0,
            transform: 'translateY(10px)'
          }}
        >
          <style>{`
            @keyframes cardIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>

          <div className="flex flex-col items-center text-center mb-10">
            <img src="/Logo.png" alt="Stenth" className="h-[28px] w-auto object-contain mb-6" />
            <h1 className="text-[22px] font-semibold text-white tracking-tight mb-2">
              Dashboards
            </h1>
            <p className="text-[14px] text-zinc-400">
              Each one signs in separately — this is just the map.
            </p>
          </div>

          <div className="space-y-4">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-start gap-4 rounded-xl p-6 backdrop-blur-md overflow-hidden transition-all duration-300"
                style={{
                  background: 'rgba(5, 8, 16, 0.45)',
                  border: '1px solid rgba(111, 156, 235, 0.18)',
                  boxShadow: '0 15px 30px -10px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset'
                }}
              >
                {/* Blue shimmer on hover top edge */}
                <div 
                  className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6F9CEB]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-[#6F9CEB]/[0.08] border border-[#6F9CEB]/20 flex items-center justify-center text-[#6F9CEB] group-hover:bg-[#6F9CEB]/[0.15] transition-colors">
                  {link.icon}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="text-[15px] font-semibold text-white mb-1 group-hover:text-[#6F9CEB] transition-colors">{link.title}</div>
                  <div className="text-[13px] text-zinc-400 leading-relaxed pr-6">{link.description}</div>
                </div>
                <div className="absolute top-6 right-6 text-zinc-600 group-hover:text-[#6F9CEB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                  <ArrowUpRight size={18} />
                </div>
              </a>
            ))}
          </div>

          <p className="mt-8 text-center text-[13px] text-zinc-500">
            More client dashboards will show up here as they're added.
          </p>

          <button
            onClick={signOut}
            className="group mx-auto mt-6 flex items-center justify-center gap-2 rounded-lg bg-white/[0.04] border border-[#1e1e1e] py-2 px-4 text-zinc-400 hover:text-white hover:bg-white/[0.07] hover:border-[#333333] transition-all duration-200 text-[13px] font-medium"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
