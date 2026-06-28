import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';

const painPoints = [
    'Agencies that promise results but report impressions.',
    'Budgets burned on channels that were never right for you.',
    'Monthly decks full of charts that don\'t move your revenue.',
    'Junior teams learning the craft on your dime.',
];

export default function Problem() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);
    const isHeadlineInView = useInView(headlineRef, { once: true, margin: '-15%' });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    // Parallax on the giant ghost text
    const ghostY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
    // Subtle scale on the red accent line
    const lineScale = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

    // Split headline into words for staggered reveal
    const headline = 'Running growth is unnecessarily hard.';
    const words = headline.split(' ');

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-brand-dark py-32 md:py-48 px-6 md:px-12 border-t border-white/5"
        >
            {/* ── Background noise / vignette ── */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(220,38,38,0.06),transparent)]" />
            </div>

            {/* ── Giant ghost label ── */}
            <motion.span
                style={{ y: ghostY }}
                aria-hidden
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[18vw] leading-none text-white/[0.025] select-none pointer-events-none whitespace-nowrap z-0"
            >
                THE PROBLEM
            </motion.span>

            <div className="relative z-10 max-w-7xl mx-auto">

                {/* ── Eyebrow ── */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-4 mb-12 md:mb-16"
                >
                    {/* Red accent tick */}
                    <motion.span
                        style={{ scaleX: lineScale, background: '#ef4444', transformOrigin: 'left' }}
                        className="block h-px w-12"
                    />
                    <span className="font-mono text-xs uppercase tracking-[0.5em] text-red-500/80">
                        The Problem
                    </span>
                </motion.div>

                {/* ── Main headline ── */}
                <div ref={headlineRef} className="mb-16 md:mb-20 overflow-visible">
                    <h2
                        className="font-display uppercase tracking-tight leading-[0.82] text-[clamp(3rem,9vw,9rem)] text-brand-light"
                        aria-label={headline}
                    >
                        {words.map((word, i) => (
                            <span key={i} className="inline-block overflow-hidden mr-[0.18em] last:mr-0">
                                <motion.span
                                    className="inline-block"
                                    initial={{ y: '105%', opacity: 0 }}
                                    animate={
                                        isHeadlineInView
                                            ? { y: '0%', opacity: 1 }
                                            : { y: '105%', opacity: 0 }
                                    }
                                    transition={{
                                        duration: 0.85,
                                        delay: 0.05 + i * 0.07,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                >
                                    {/* Last word gets the red accent */}
                                    {i === words.length - 1 ? (
                                        <span style={{ color: '#ef4444' }}>{word}</span>
                                    ) : (
                                        word
                                    )}
                                </motion.span>
                            </span>
                        ))}
                    </h2>
                </div>

                {/* ── Two-column body ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">

                    {/* Left — context copy */}
                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-10%' }}
                        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-brand-light/80 text-base md:text-lg leading-relaxed max-w-lg"
                    >
                        Most businesses are told growth requires more budget, more tools, or more time. None of it is true. The real problem is <span className="text-brand-light font-medium">a system built on guesswork</span> — and a market full of agencies that are comfortable keeping it that way.
                    </motion.p>

                    {/* Right — pain-point list */}
                    <motion.ul
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-10%' }}
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
                        }}
                        className="flex flex-col gap-0"
                    >
                        {painPoints.map((point, i) => (
                            <motion.li
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, x: 20 },
                                    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                                }}
                                className="flex items-start gap-4 py-5 border-b border-white/5 group"
                            >
                                {/* Red dash bullet */}
                                <span className="mt-[0.4em] w-4 h-px bg-red-500/60 flex-shrink-0 group-hover:w-6 transition-all duration-300" />
                                <span className="text-brand-light/80 text-sm leading-relaxed group-hover:text-brand-light transition-colors duration-300">
                                    {point}
                                </span>
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>

                {/* ── Bridge line ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-20 md:mt-28 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-10 border-t border-white/5"
                >
                    <p className="font-display uppercase tracking-tight text-2xl md:text-3xl text-brand-light leading-tight max-w-lg">
                        That ends here.{' '}
                        <span style={{ color: '#6F9CEB' }}>These are the six reasons why.</span>
                    </p>
                    <motion.div
                        whileHover={{ x: 6 }}
                        className="font-mono text-xs uppercase tracking-[0.5em] text-brand-accent flex items-center gap-3"
                    >
                        <span className="w-6 h-px bg-brand-accent/60" />
                        See why clients choose Stenth
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
