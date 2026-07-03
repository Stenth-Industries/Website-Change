import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OrbitingCircles } from './ui/orbiting-circles';
import { BrandIcons } from './BrandIcons';
import { Search, Palette, Rocket, Activity } from 'lucide-react';

// ─── Process nodes ───────────────────────────────────────────────────────
const processNodes = [
    { label: 'Strategy', color: '#6F9CEB', angle: 0 },
    { label: 'Creative', color: '#a78bfa', angle: 90 },
    { label: 'Launch', color: '#34d399', angle: 180 },
    { label: 'Optimise', color: '#fbbf24', angle: 270 },
];

// ─── Floating activity cards that cycle ───────────────────────────────────────
const activityCards = [
    { title: 'Strategy Mapped', metric: '01', sub: 'audit complete', color: '#6F9CEB' },
    { title: 'Campaign Built', metric: '02', sub: 'ready to launch', color: '#34d399' },
    { title: 'Live & Tracked', metric: '03', sub: 'enquiries flowing', color: '#fbbf24' },
    { title: 'Optimised Weekly', metric: '04', sub: 'every metric reviewed', color: '#a78bfa' },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function HowItWorks() {
    const [cardIndex, setCardIndex] = useState(0);

    // Cycle floating activity cards
    useEffect(() => {
        const interval = setInterval(() => {
            setCardIndex(i => (i + 1) % activityCards.length);
        }, 2800);
        return () => clearInterval(interval);
    }, []);

    const card = activityCards[cardIndex];

    return (
        <section className="py-32 px-6 md:px-12 bg-brand-dark overflow-hidden relative">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <p className="text-xs uppercase tracking-[0.4em] font-bold text-brand-accent mb-6">How It Works</p>
                    <h2 className="text-5xl md:text-8xl leading-none mb-6">
                        Stenth at the<br />
                        <span className="text-brand-accent">centre of it all.</span>
                    </h2>
                    <p className="text-brand-light/80 max-w-xl mx-auto text-lg leading-relaxed font-sans normal-case tracking-normal">
                        One growth partner. Every channel connected. Your entire marketing ecosystem — orchestrated, measured, and optimised in one place.
                    </p>
                </motion.div>

                {/* Main interactive grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* ── DYNAMIC ORBIT VISUAL ── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative flex items-center justify-center min-h-[500px]"
                    >
                        <div className="relative flex h-[500px] w-full items-center justify-center">
                            {/* Central Stenth Node */}
                            <div className="z-20 flex items-center justify-center bg-brand-dark rounded-full p-5 border border-brand-accent/30 shadow-[0_0_60px_-12px_rgba(111,156,235,0.35)]">
                                <div className="w-24 h-24 relative">
                                    <img
                                        src="/Logo.png"
                                        alt="Stenth Logo"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>

                            {/* Inner Orbit: Process Steps */}
                            {[
                                { num: '01', label: 'Strategy', delay: 0 },
                                { num: '02', label: 'Creative', delay: 6.25 },
                                { num: '03', label: 'Launch', delay: 12.5 },
                                { num: '04', label: 'Optimise', delay: 18.75 },
                            ].map((step) => (
                                <OrbitingCircles
                                    key={step.label}
                                    className="size-14 border-none bg-transparent"
                                    duration={25}
                                    radius={110}
                                    delay={step.delay}
                                >
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="w-11 h-11 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center">
                                            <span className="font-display text-sm text-brand-accent tracking-tight">{step.num}</span>
                                        </div>
                                        <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-white/60 whitespace-nowrap">
                                            {step.label}
                                        </span>
                                    </div>
                                </OrbitingCircles>
                            ))}

                            {/* Outer Orbit: Platform Integrations (Reverse) */}
                            {[
                                BrandIcons.meta,
                                BrandIcons.googleAds,
                                BrandIcons.tiktok,
                                BrandIcons.hubspot,
                                BrandIcons.linkedin,
                                BrandIcons.shopify,
                                BrandIcons.stripe,
                                BrandIcons.youtube,
                                BrandIcons.instagram,
                                BrandIcons.twitter
                            ].map((Icon, idx) => (
                                <OrbitingCircles
                                    key={idx}
                                    className="size-10 border-none bg-transparent opacity-80"
                                    duration={40}
                                    radius={210}
                                    delay={idx * (40 / 10)}
                                    reverse
                                >
                                    <Icon />
                                </OrbitingCircles>
                            ))}
                        </div>

                        {/* ── FLOATING ACTIVITY CARD ── */}
                        <div className="absolute -bottom-10 right-0 md:right-0 w-52 z-30">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={cardIndex}
                                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                    transition={{ duration: 0.4 }}
                                    className="bg-brand-dark/90 backdrop-blur-xl border rounded-2xl px-5 py-4 shadow-2xl"
                                    style={{ borderColor: `${card.color}40` }}
                                >
                                    <p className="text-xs uppercase tracking-[0.3em] text-brand-light/80 mb-2 font-bold">{card.title}</p>
                                    <div className="flex items-baseline gap-2">
                                        <p className="font-display text-4xl tracking-tighter" style={{ color: card.color }}>
                                            {card.metric}
                                        </p>
                                        <p className="text-xs text-brand-light font-medium">{card.sub.split(' vs ')[0]}</p>
                                    </div>
                                    <p className="text-xs text-brand-light/60 mt-1 uppercase tracking-widest leading-none">Our process</p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* ── RIGHT SIDE: TEXT + STEPS ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-12"
                    >
                        {/* Introduction text */}
                        <div>
                            <p className="text-xs uppercase tracking-[0.4em] font-bold text-brand-accent mb-4">One hub. Every channel.</p>
                            <p className="text-2xl md:text-3xl font-medium leading-tight mb-6">
                                Stenth plugs into your full marketing stack and acts as the <span className="text-brand-accent">strategic brain</span> — connecting signals across every platform into one unified growth system.
                            </p>
                            <p className="text-brand-light/80 leading-relaxed">
                                Strategy shaped by data. Creative built to convert. Campaigns launched fast. Every result tracked and fed back into the next cycle.
                            </p>
                        </div>

                        {/* Process steps */}
                        <div className="space-y-4">
                            {processNodes.map((node, i) => (
                                <motion.div
                                    key={node.label}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * i }}
                                    className="flex items-start gap-4 p-4 rounded-2xl border border-brand-light/5 hover:border-brand-light/10 transition-colors group"
                                >
                                    <div
                                        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 text-xs font-bold font-display"
                                        style={{ border: `1px solid ${node.color}60`, color: node.color, background: `${node.color}12` }}
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </div>
                                    <div>
                                        <h3
                                            className="font-display text-xl uppercase tracking-tighter mb-1 group-hover:text-brand-accent transition-colors"
                                            style={{ color: node.color }}
                                        >
                                            {node.label}
                                        </h3>
                                        <p className="text-brand-light/80 text-sm leading-relaxed">
                                            {[
                                                'Deep audit of your current stack, competitors, and untapped market opportunities.',
                                                'Campaigns crafted around your brand voice, product, and conversion goals.',
                                                'Full-funnel rollout across all channels — from day one with real data.',
                                                'Continuous iteration tracking every metric that matters to your bottom line.',
                                            ][i]}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Stat chips */}
                        <div className="flex flex-wrap gap-4 pt-4 border-t border-brand-light/5">
                            {[
                                { n: '8+', label: 'Platforms Connected' },
                                { n: '4', label: 'Process Stages' },
                                { n: '1', label: 'Unified Dashboard' },
                            ].map(s => (
                                <div key={s.label} className="text-center">
                                    <p className="font-display text-4xl text-brand-accent">{s.n}</p>
                                    <p className="text-xs uppercase tracking-widest text-brand-light/60">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
