import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'motion/react';
import { CAL_BOOKING_URL } from '../constants';


const reasons = [
  {
    line1: 'Growth Compounds.',
    line2: 'Guesswork Doesn\'t.',
    desc: 'We build the full system: website, search, content, and intake. Every channel feeds the next, so your visibility stacks up instead of starting over.',
    stat: '4',
    suffix: '',
    statLabel: 'Channels, one system',
    decimals: 0,
  },
  {
    line1: 'We Plan Before',
    line2: 'We Spend. Period.',
    desc: 'Not a single dollar moves until we have the data, the audience, and the strategy locked in. Precision over speed. Every time.',
    stat: '0',
    suffix: '',
    statLabel: 'Spent before strategy',
    decimals: 0,
  },
  {
    line1: 'Revenue Is The',
    line2: 'Metric That Matters.',
    desc: 'Impressions don\'t pay wages. We track enquiries, conversions, and revenue: the numbers that actually move your business forward.',
    stat: '100',
    suffix: '%',
    statLabel: 'Focused on real results',
    decimals: 0,
  },
  {
    line1: 'Senior Talent.',
    line2: 'Day One To Done.',
    desc: 'The team that pitches you is the team that runs your account. No hand-offs. No juniors learning on your budget. Just expertise, start to finish.',
    stat: '1',
    suffix: ':1',
    statLabel: 'Senior-led, no juniors',
    decimals: 0,
  },
  {
    line1: 'We Move Fast,',
    line2: 'From Day One.',
    desc: 'We don\'t take six months to warm up. We audit, build, and launch quickly, because every delayed week is revenue your business doesn\'t get back.',
    stat: '14',
    suffix: '',
    statLabel: 'Day strategy roadmap',
    decimals: 0,
  },
  {
    line1: 'We\'re Proactive.',
    line2: 'Not On-Call.',
    desc: 'You\'ll hear from us before you think to reach out. We\'re watching the data, flagging the shifts, and bringing you the next move. Not waiting to be briefed.',
    stat: '48',
    suffix: 'h',
    statLabel: 'Max response time',
    decimals: 0,
  },
];

// Count-up hook
function useCountUp(target: number, decimals: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 600;
    const interval = 16;
    const steps = duration / interval;
    const increment = target / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(parseFloat(start.toFixed(decimals)));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [active, target, decimals]);
  return value;
}

const FeatureRow = ({ item, index }: { key?: React.Key; item: (typeof reasons)[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });
  const isEven = index % 2 === 0;

  // Count-up
  const count = useCountUp(parseFloat(item.stat), item.decimals, isInView);
  const displayStat = `${item.decimals > 0 ? count.toFixed(item.decimals) : Math.floor(count)}${item.suffix}`;

  // Parallax on ghost number
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const ghostY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const ghostYSpring = useSpring(ghostY, { stiffness: 60, damping: 20 });

  return (
    <div ref={ref} className="relative">
      {/* Directional divider — draws from cursor-correct side */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="h-px bg-white/5 w-full"
        style={{ originX: isEven ? 0 : 1 }}
      />

      <div
        className={`flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-0 py-16 md:py-24 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}
      >
        {/* Ghost Index + Icon */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-1/4 flex flex-col gap-6 relative"
        >
          {/* Ghost number with independent parallax */}
          <motion.span
            style={{ y: ghostYSpring }}
            className="font-display text-[7rem] leading-none text-white/[0.04] select-none pointer-events-none absolute -top-4 left-0"
            aria-hidden
          >
            {String(index + 1).padStart(2, '0')}
          </motion.span>

          {/* Large accent numeral — replaces icon */}
          <div className="relative mt-16">
            <span
              className="font-display text-6xl leading-none select-none"
              style={{ color: '#6F9CEB', opacity: 0.7 }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-5/12 relative"
        >
          {/* Luminance flash on entry */}
          <motion.div
            initial={{ opacity: 0.6 }}
            animate={isInView ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute inset-0 bg-brand-light/5 blur-2xl pointer-events-none"
          />
          <h3 className="text-4xl md:text-5xl lg:text-6xl leading-[0.85] tracking-tight relative z-10">
            <span className="block text-brand-light">{item.line1}</span>
            <span className="block" style={{ color: '#6F9CEB' }}>{item.line2}</span>
          </h3>
        </motion.div>

        {/* Desc + Stat */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 40 : -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full md:w-1/3 flex flex-col gap-6 items-start text-left ${isEven ? 'md:pl-12' : 'md:pr-12'}`}
        >
          <p className="text-brand-light/80 text-base md:text-lg leading-relaxed max-w-sm">{item.desc}</p>
          <div className="flex flex-col gap-0.5 items-start">
            <motion.span
              className="font-display text-4xl text-brand-accent"
            >
              {displayStat}
            </motion.span>
            <span className="text-xs uppercase tracking-[0.4em] font-mono text-white/70">
              {item.statLabel}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default function Reasons() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section className="py-24 md:py-36 px-6 md:px-12 bg-brand-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="mb-4 md:mb-8">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.5em] font-mono text-brand-accent mb-8"
          >
            Why Us
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl leading-[0.85] tracking-tight">
              Reasons Clients<br />
              <span className="text-gradient">Rely On Us.</span>
            </h2>
            <p className="text-brand-light/80 text-base md:text-lg leading-relaxed max-w-sm md:pb-2 hidden md:block">
              Six principles that define how we work, and why the right brands choose to partner with Stenth.
            </p>
          </motion.div>
        </div>

        {/* Feature Rows */}
        <div className="mt-8">
          {reasons.map((item, index) => (
            <FeatureRow key={item.line1} item={item} index={index} />
          ))}
          <div className="h-px bg-white/5 w-full" />
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <p className="text-brand-light/80 text-lg md:text-xl">
            Ready to be one of our{' '}
            <span className="text-brand-light font-medium">founding case studies?</span>
          </p>
          <motion.a
            href={CAL_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 6 }}
            className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] font-bold text-brand-accent"
          >
            Book a free strategy call →
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
