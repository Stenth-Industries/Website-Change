import React, { useState, useEffect, useRef } from 'react';
import { Mail, Lock, ArrowRight, Github } from 'lucide-react';

export default function LoginPage() {
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const hueRef = useRef<SVGFEColorMatrixElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/hub-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.href = '/hub';
        return;
      }
      setError('Incorrect password. Please try again.');
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setSubmitting(false);
  }

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

    animateEthereal();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black p-4 md:p-8 font-sans overflow-hidden text-white">
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

      {/* ── Login Card ── */}
      <div 
        className="relative z-10 w-full max-w-[400px] flex flex-col"
        style={{
          animation: 'cardIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s forwards',
        }}
      >
        <style>{`
          @keyframes cardIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <div 
          className="relative rounded-xl p-10 backdrop-blur-md"
          style={{
            background: 'rgba(5, 8, 16, 0.45)',
            border: '1px solid rgba(111, 156, 235, 0.18)',
            boxShadow: '0 25px 60px -10px rgba(0,0,0,0.7), 0 0 80px -20px rgba(111, 156, 235, 0.15), 0 0 0 1px rgba(255,255,255,0.03) inset'
          }}
        >
          {/* Blue shimmer on top edge */}
          <div 
            className="absolute top-0 left-[10%] right-[10%] h-px rounded-sm" 
            style={{ background: 'linear-gradient(to right, transparent, rgba(111, 156, 235, 0.6), transparent)' }} 
          />

          <div className="flex flex-col items-center text-center mb-8">
            <div className="flex items-center gap-2 text-[17px] font-semibold mb-6 tracking-tight">
              <img src="/Logo.png" alt="Stenth" className="h-[26px] w-auto object-contain" />
              Stenth
            </div>
            <h2 className="text-[20px] font-semibold text-white tracking-tight mb-2">
              Welcome back
            </h2>
            <p className="text-[14px] text-zinc-400">
              Enter your details to sign in.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* Email */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-medium text-zinc-400">Email</label>
              </div>
              <div className="relative group">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 ${emailFocus ? 'text-[#6F9CEB]' : 'text-zinc-500'}`}>
                  <Mail size={15} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  className="w-full bg-white/[0.04] border border-[#1e1e1e] rounded-lg py-2.5 pl-9 pr-3 text-[14px] text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#6F9CEB]/40 focus:bg-[#6F9CEB]/[0.04] focus:ring-4 focus:ring-[#6F9CEB]/10 transition-all duration-200"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-medium text-zinc-400">Password</label>
                <a href="#" className="text-[12px] font-medium text-[#6F9CEB] hover:text-[#5b87d6] transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative group">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 ${passwordFocus ? 'text-[#6F9CEB]' : 'text-zinc-500'}`}>
                  <Lock size={15} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                  className="w-full bg-white/[0.04] border border-[#1e1e1e] rounded-lg py-2.5 pl-9 pr-3 text-[14px] text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#6F9CEB]/40 focus:bg-[#6F9CEB]/[0.04] focus:ring-4 focus:ring-[#6F9CEB]/10 transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#6F9CEB] text-black font-semibold text-[14px] py-2.5 hover:bg-[#5b87d6] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F9CEB] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-60"
            >
              {submitting ? 'Signing in…' : 'Sign In'}
            </button>
            {error && (
              <p className="text-[12.5px] text-red-400 text-center -mt-1">{error}</p>
            )}

            <div className="flex items-center gap-3 py-5">
              <div className="h-px bg-[#1e1e1e] flex-1" />
              <span className="text-[12px] text-zinc-600">or continue with</span>
              <div className="h-px bg-[#1e1e1e] flex-1" />
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                className="flex items-center justify-center gap-2 bg-white/[0.04] border border-[#1e1e1e] rounded-lg py-2.5 text-zinc-400 hover:text-white hover:bg-white/[0.07] hover:border-[#333333] transition-all duration-200 text-[13px] font-medium"
              >
                <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 bg-white/[0.04] border border-[#1e1e1e] rounded-lg py-2.5 text-zinc-400 hover:text-white hover:bg-white/[0.07] hover:border-[#333333] transition-all duration-200 text-[13px] font-medium"
              >
                <Github size={15} />
                GitHub
              </button>
            </div>
          </form>
        </div>
        
        <p className="text-center mt-7 text-[13px] text-zinc-400">
          Don't have an account? <a href="#" className="text-[#6F9CEB] hover:text-[#5b87d6] transition-colors ml-1">Contact Sales</a>
        </p>
      </div>
    </div>
  );
}
