import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'motion/react';

/* ── Animated count-up stat ───────────────────────────────────────────── */
const CountUp = ({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {prefix}
      {Math.round(val).toLocaleString()}
      {suffix}
    </span>
  );
};

const stats = [
  { to: 2, suffix: '', label: 'Founders, Hands-On' },
  { to: 2, suffix: '', label: 'Countries — CA & AU' },
  { to: 24, suffix: 'h', label: 'Response Time' },
  { to: 100, suffix: '%', label: 'Focused on Your Growth' },
];

const founders = [
  {
    name: 'Ansh Rai',
    role: 'Co-Founder',
    bio: 'Global expertise in Artificial Intelligence, Computer Science, and Marketing Technology — shaped by projects across Canada, Australia, the Dominican Republic, and the US.',
  },
  {
    name: 'Aakash Lakhataria',
    role: 'Co-Founder',
    bio: 'Deep experience in AI-driven marketing, business analytics, and project management — forged through ventures like Bellacana and The Moon Stadium, alongside hands-on collaboration with Google Ads experts.',
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-brand-dark py-28 md:py-36 px-6 md:px-12"
    >
      {/* Giant background wordmark */}
      <div className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 select-none opacity-[0.025] hidden lg:block">
        <h3 className="font-display text-[18vw] leading-none tracking-tighter rotate-90 origin-center">
          STORY
        </h3>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-brand-accent mb-6">
            Our Story
          </p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.95] mb-8">
            The Story Behind{' '}
            <span className="text-brand-accent">Stenth</span>
          </h2>
          <p className="font-sans text-xl md:text-2xl text-brand-light/90 leading-relaxed max-w-2xl">
            We don't just market businesses. We help them grow, the right way.
          </p>
        </motion.div>

        {/* ── Narrative + Image ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-20 items-start">
          {/* Story copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-lg text-brand-light/70 leading-relaxed"
          >
            <p>
              The story of STENTH is, at its core, the story of two best friends chasing a dream.
              We — <span className="text-brand-light font-medium">Aakash Lakhataria</span> and{' '}
              <span className="text-brand-light font-medium">Ansh Rai</span> — grew up side by side,
              always talking about the future, always dreaming of creating something bigger than ourselves.
            </p>
            <p>
              Life took us abroad to Canada for our studies, but no matter how busy we got, the
              conversations never stopped. Nights turned into mornings as we sketched out ideas,
              imagined possibilities, and kept coming back to the same belief: one day, we'll build
              something of our own.
            </p>
            <p>
              In 2022, that belief finally took shape. One night, Aakash had a dream — so vivid he
              woke up knowing exactly what to do. The dream gave us a name:{' '}
              <span className="text-brand-accent font-semibold">STENTH</span>. The very next morning,
              he drove to Ansh's house and, with fire in his eyes, said,{' '}
              <span className="italic text-brand-light/90">"I saw our future. It's called STENTH."</span>{' '}
              From that moment on, it was real.
            </p>
            <p>
              What began with two childhood friends and a dream has grown into a focused,
              senior team operating across{' '}
              <span className="text-brand-light font-medium">Canada and Australia</span> — with
              experience spanning projects in the United States, India, the Dominican Republic,
              and beyond.
            </p>
            <p className="text-brand-light/90 text-xl font-medium pt-2 border-l-2 border-brand-accent/40 pl-6">
              Because at STENTH, this isn't just business. It's personal. It's our story, our
              friendship, and our future — shared with every brand we partner with.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[3/4] rounded-[40px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <img
                src="/tower.jpg"
                alt="Stenth — Founders & Team"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-brand-accent text-brand-dark p-7 rounded-3xl hidden md:block shadow-[0_20px_60px_-15px_rgba(111,156,235,0.5)]">
              <p className="text-sm font-bold uppercase tracking-widest">Est. 2022</p>
              <p className="text-xs uppercase tracking-widest opacity-70">Canada · Australia</p>
            </div>
          </motion.div>
        </div>

        {/* ── Founders ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-24">
          {founders.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 md:p-10 overflow-hidden transition-all duration-500 hover:border-white/25 hover:bg-white/[0.04]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <div className="flex items-baseline justify-between mb-5">
                  <h3 className="font-display text-3xl md:text-4xl uppercase tracking-tighter">
                    {f.name}
                  </h3>
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-accent">
                    {f.role}
                  </span>
                </div>
                <p className="text-base text-brand-light/70 leading-relaxed">{f.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Stats ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px mt-24 rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.04]">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-brand-dark p-8 md:p-10 flex flex-col items-center text-center"
            >
              <p className="font-display text-4xl md:text-6xl tracking-tighter mb-3">
                <CountUp to={s.to} suffix={s.suffix} />
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand-light/50">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
