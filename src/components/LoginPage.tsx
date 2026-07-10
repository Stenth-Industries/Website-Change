import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, ArrowRight, Github } from 'lucide-react';
import { BorderBeam } from '@/components/ui/border-beam';

export default function LoginPage() {
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-brand-dark p-4 md:p-8 font-sans overflow-hidden">

      {/* ── PREMIUM MESH GRADIENT BACKGROUND ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-black" />
        <div className="noise-bg opacity-[0.05] z-10" />

        <motion.div
          animate={{
            rotate: [0, 90, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(111,156,235,0.06)_0%,transparent_70%)] blur-[80px]"
        />

        <motion.div
          animate={{
            rotate: [0, -90, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -left-1/4 w-[80vw] h-[80vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(67,56,202,0.06)_0%,transparent_70%)] blur-[100px]"
        />
      </div>

      {/* ── CENTERED PREMIUM CARD ── */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[440px] flex flex-col"
      >
        <div className="relative rounded-2xl bg-white/[0.02] border border-white/10 p-8 sm:p-10 shadow-2xl backdrop-blur-xl overflow-hidden">
          {/* Subtle top highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          {/* BorderBeam: animated Stenth Blue light traveling around the card */}
          <BorderBeam
            colorFrom="#6F9CEB"
            colorTo="#4361EE"
            size={300}
            duration={8}
            borderWidth={1.5}
          />

          <div className="flex flex-col items-center text-center mb-10">
            <img src="/Logo.png" alt="Stenth" className="h-[34px] w-auto object-contain drop-shadow-md mb-8" />
            <h2 className="text-[22px] font-semibold text-white tracking-tight mb-2">
              Welcome back
            </h2>
            <p className="text-[13.5px] text-white/50">
              Please enter your details to sign in to Stenth.
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

            {/* Input Group */}
            <div className="space-y-4">

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-white/70 ml-1">Email</label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors duration-300 ${emailFocus ? 'text-brand-accent' : 'text-white/40'}`}>
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-brand-accent/50 focus:bg-black/40 transition-all duration-300 shadow-inner"
                    placeholder="name@company.com"
                  />
                  {/* Focus Glow */}
                  <div className={`absolute -inset-0.5 bg-brand-accent/20 rounded-xl blur-sm -z-10 transition-opacity duration-300 ${emailFocus ? 'opacity-100' : 'opacity-0'}`} />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-[13px] font-medium text-white/70">Password</label>
                  <a href="#" className="text-[12px] font-medium text-brand-accent hover:text-brand-accent/80 transition-colors">
                    Forgot password?
                  </a>
                </div>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors duration-300 ${passwordFocus ? 'text-brand-accent' : 'text-white/40'}`}>
                    <Lock size={16} />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-brand-accent/50 focus:bg-black/40 transition-all duration-300 shadow-inner tracking-widest"
                    placeholder="••••••••"
                  />
                  {/* Focus Glow */}
                  <div className={`absolute -inset-0.5 bg-brand-accent/20 rounded-xl blur-sm -z-10 transition-opacity duration-300 ${passwordFocus ? 'opacity-100' : 'opacity-0'}`} />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full group relative flex items-center justify-center gap-2 rounded-xl bg-white text-black font-semibold text-[14px] py-3.5 mt-2 hover:bg-white/90 transition-all duration-300 active:scale-[0.98] shadow-lg shadow-white/10 hover:shadow-white/20"
            >
              Sign In
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center gap-4 py-2">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[12px] text-white/40">or continue with</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="group flex items-center justify-center gap-2 bg-black/20 border border-white/10 rounded-xl py-3 text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-[13px] font-medium">Google</span>
              </button>
              <button
                type="button"
                className="group flex items-center justify-center gap-2 bg-black/20 border border-white/10 rounded-xl py-3 text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <Github size={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                <span className="text-[13px] font-medium">GitHub</span>
              </button>
            </div>
          </form>
        </div>

        <p className="mt-8 text-center text-[13px] text-white/40">
          Don't have an account?{' '}
          <a href="#" className="text-white hover:text-brand-accent transition-colors font-medium">
            Contact Sales
          </a>
        </p>
      </motion.div>
    </div>
  );
}
