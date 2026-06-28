import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const MagneticLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.4);
    y.set((clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium text-white/50 hover:text-white transition-colors duration-300 block"
    >
      {children}
    </motion.a>
  );
};

export default function Navbar() {
  const { scrollYProgress, scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  const navScale = useTransform(scrollY, [0, 100], [1, 0.95]);
  const navY = useTransform(scrollY, [0, 100], [24, 16]);
  const navBgOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const unsub = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsub();
  }, [scrollY]);

  const navItems = [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none p-6 md:p-8">
      <motion.nav
        style={{ scale: navScale, y: navY }}
        className={`pointer-events-auto relative flex items-center gap-4 md:gap-8 px-4 md:px-6 py-3 rounded-full border transition-all duration-500 overflow-hidden ${isScrolled
            ? 'border-white/10 backdrop-blur-xl bg-brand-dark/40 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'border-transparent bg-transparent'
          }`}
      >
        {/* Background mesh on scroll */}
        <motion.div
          style={{ opacity: navBgOpacity }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5"
        />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10 flex items-center gap-3 pr-2 md:pr-4 border-r border-white/10"
        >
          <img
            src="/Logo.png"
            alt="Stenth Logo"
            className="h-7 md:h-8 w-auto object-contain hover:scale-110 transition-transform duration-500"
          />
        </motion.div>

        {/* Magnetic Nav Links */}
        <div className="hidden md:flex items-center relative z-10">
          {navItems.map((item) => (
            <MagneticLink key={item.label} href={item.href}>
              {item.label}
            </MagneticLink>
          ))}
        </div>

        {/* CTA Button */}
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10 group flex items-center gap-2 text-xs md:text-xs uppercase tracking-[0.2em] font-bold bg-white text-brand-dark px-4 md:px-6 py-2 rounded-full overflow-hidden hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-500"
        >
          <span className="relative z-10">Book Free Session</span>
          <ArrowUpRight size={14} className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          {/* Shimmer sweep */}
          <motion.div
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
          />
        </motion.a>

        {/* Integrated Mercury Progress Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-accent shadow-[0_-4px_10px_rgba(111,156,235,0.4)] origin-left z-20"
          style={{ scaleX }}
        />

        {/* Micro-Noise over glass */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] z-10"
          style={{ backgroundImage: NOISE_SVG }}
        />
      </motion.nav>
    </div>
  );
}
