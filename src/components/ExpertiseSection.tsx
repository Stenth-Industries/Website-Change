import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimation, AnimatePresence } from 'motion/react';
import { Zap, Search, Globe, Cpu, BarChart3, Layers, ArrowUpRight } from 'lucide-react';

const services = [
    {
        id: '01', title: 'Paid Advertising',
        description: 'We manage performance campaigns across Google, Meta, and LinkedIn with a level of precision most agencies simply do not apply. Every budget decision is grounded in revenue data, not vanity metrics, so your spend works exactly as hard as it should.',
        icon: Zap, tags: ['Google Ads', 'Meta Ads', 'LinkedIn Ads'],
        stats: [{ val: '3.8', label: 'Average ROAS', suffix: 'x' }, { val: '41', label: 'Reduction in Acquisition Cost', suffix: '%' }]
    },
    {
        id: '02', title: 'Expert SEO',
        description: 'Organic search is the highest-margin growth channel available to most businesses. We build the technical infrastructure, earn the authority, and create the content that earns rankings and holds them across competitive markets.',
        icon: Search, tags: ['Technical SEO', 'Link Building', 'Content Strategy'],
        stats: [{ val: '312', label: 'Average Organic Traffic Growth', suffix: '%' }, { val: '6', label: 'Months to Page One', suffix: 'mo' }]
    },
    {
        id: '03', title: 'Web Development',
        description: 'A well-engineered website makes every other marketing channel perform better. We design and build sites that are fast, focused, and built around a single goal: turning the right visitors into clients.',
        icon: Globe, tags: ['Conversion-First Design', 'Speed Engineering', 'CRO'],
        stats: [{ val: '98', label: 'PageSpeed Score', suffix: '' }, { val: '52', label: 'Average Conversion Uplift', suffix: '%' }]
    },
    {
        id: '04', title: 'Content Marketing',
        description: 'Clients make decisions long before they reach out. Strategic content positions you as the authoritative voice in your space, shortening sales cycles, reducing friction, and building the trust that converts at a higher rate.',
        icon: Cpu, tags: ['Authority Content', 'SEO Articles', 'Social & Video'],
        stats: [{ val: '4.2', label: 'Lower Cost Per Lead vs Paid', suffix: 'x' }, { val: '67', label: 'Increase in Qualified Enquiries', suffix: '%' }]
    },
    {
        id: '05', title: 'Analytics & Tracking',
        description: 'Growth decisions are only as good as the data behind them. We implement rigorous tracking across every channel and touchpoint, giving you a clear and accurate picture of where revenue comes from and where to invest next.',
        icon: BarChart3, tags: ['GA4 & GTM Setup', 'Revenue Attribution', 'Custom Dashboards'],
        stats: [{ val: '100', label: 'Full-Funnel Attribution', suffix: '%' }, { val: '28', label: 'Hours Saved Per Week', suffix: 'hrs' }]
    },
    {
        id: '06', title: 'Elite Branding',
        description: 'The strongest brands do not just look good. They create an immediate sense of quality that justifies premium pricing. We craft visual identities from the ground up, built to position you as the definitive choice in your category.',
        icon: Layers, tags: ['Brand Identity', 'Visual Language', 'Logo & Guidelines'],
        stats: [{ val: '100', label: 'Bespoke, No Templates', suffix: '%' }, { val: '3', label: 'Weeks to Full Delivery', suffix: 'wk' }]
    }
];

const NavDot = ({ isActive, scrollYProgress, index, total, label }: { key?: React.Key; isActive: boolean; scrollYProgress: any; index: number; total: number; label: string }) => {
    const start = index / total;
    const end = (index + 1) / total;
    const raw = useTransform(scrollYProgress, [start, end], [0, 62.8]);
    const offset = useSpring(useTransform(raw, v => 62.8 - v), { stiffness: 100, damping: 20 });

    return (
        <div className="flex items-center gap-5 group">
            <div className="relative w-4 h-4 flex-shrink-0">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="9" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" />
                    {isActive && (
                        <motion.circle cx="10" cy="10" r="9" fill="none" stroke="#2563eb" strokeWidth="2"
                            strokeDasharray="56.5" style={{ strokeDashoffset: offset }} strokeLinecap="round" />
                    )}
                </svg>
                <div className={`absolute inset-0 m-auto w-1 h-1 rounded-full transition-all duration-500 ${isActive ? 'bg-blue-400 scale-150' : 'bg-white/15'}`} />
            </div>
            <div className="flex flex-col">
                <span className={`font-sans transition-all duration-500 ${isActive
                    ? 'text-white text-sm font-semibold tracking-wide translate-x-1'
                    : 'text-gray-400 text-xs font-normal tracking-[0.3em] uppercase opacity-70'
                    }`}>
                    {label}
                </span>
                {isActive && (
                    <motion.div
                        layoutId="nav-underline"
                        className="h-px bg-blue-500/60 mt-0.5 w-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                )}
            </div>
        </div>
    );
};

const EditorialReveal = ({ text, active, delay = 0 }: { text: string; active: boolean; delay?: number }) => (
    <span className="inline-block overflow-hidden relative leading-normal">
        <motion.span
            initial={{ y: "110%", filter: "brightness(1) blur(0px)" }}
            animate={{
                y: active ? "0%" : "110%",
                filter: active ? ["brightness(1) blur(0px)", "brightness(2) blur(4px)", "brightness(1) blur(0px)"] : "brightness(1) blur(0px)"
            }}
            transition={{
                y: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: active ? 0.3 + delay : 0 },
                filter: { duration: 0.8, times: [0, 0.5, 1], ease: "easeOut", delay: active ? 0.3 + delay : 0 }
            }}
            className="inline-block"
        >
            {text}
        </motion.span>
    </span>
);

const ServiceCard = ({ service, index, total, scrollYProgress, scrollVelocity }: {
    key?: React.Key; service: typeof services[0]; index: number; total: number; scrollYProgress: any; scrollVelocity: any;
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [active, setActive] = useState(false);

    const start = index / total;
    const end = (index + 1) / total;
    const mid = (start + end) / 2;

    const y = useSpring(
        useTransform(scrollYProgress, [start, start + 0.1, mid, end - 0.05, end], [50, 0, 0, 0, -30]),
        { stiffness: 70, damping: 18 }
    );
    const scale = useTransform(scrollYProgress, [start, start + 0.1, end - 0.05, end], [0.98, 1, 1, 0.98]);
    const tilt = useSpring(useTransform(scrollVelocity, [-1500, 0, 1500], [2, 0, -2]), { stiffness: 80, damping: 20 });

    // Border flicker logic for "Visual Sound"
    const [flicker, setFlicker] = useState(1);
    useEffect(() => {
        if (active) {
            const interval = setInterval(() => {
                setFlicker(Math.random() > 0.95 ? 0.3 : 1);
            }, 50);
            return () => clearInterval(interval);
        }
    }, [active]);

    useEffect(() => {
        return scrollYProgress.on('change', (v: number) => {
            const now = v >= start && v < end;
            if (now && !active) {
                controls.start({ x: [0, -1, 1, -1, 0], transition: { duration: 0.15 } });
            }
            setActive(now);
        });
    }, [scrollYProgress, start, end, active, controls]);

    return (
        <motion.div
            style={{ y, scale, rotateX: tilt, zIndex: index, position: 'sticky', top: `${140 + index * 20}px`, perspective: 1200 }}
            className="w-full mb-[55vh] last:mb-0"
        >
            <motion.div
                ref={cardRef}
                animate={controls}
                onMouseMove={(e) => {
                    const r = cardRef.current?.getBoundingClientRect();
                    if (r) { mouseX.set(e.clientX - r.left); mouseY.set(e.clientY - r.top); }
                }}
                style={{ borderOpacity: flicker } as any}
                className="relative group bg-[#0a0a0a]/80 border border-white/[0.08] rounded-[2rem] p-10 md:p-14 overflow-hidden shadow-[0_80px_160px_-40px_rgba(0,0,0,1)] ring-1 ring-white/10 backdrop-blur-[40px]"
            >
                {/* Generative Soul Background */}
                <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]">
                    <svg className="w-full h-full">
                        <pattern id={`pattern-${index}`} x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <circle cx="1" cy="1" r="1" fill="#2563eb" />
                            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#2563eb" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100%" height="100%" fill={`url(#pattern-${index})`} />
                    </svg>
                </div>

                {/* X-Ray Technical Schematic reveal on hover */}
                <div className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-1000">
                    <svg className="w-full h-full">
                        <defs>
                            <pattern id={`grid-${index}`} width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
                    </svg>
                </div>

                {/* Optical Light Painting */}
                <motion.div
                    className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-1000 opacity-0 group-hover:opacity-100"
                    style={{
                        background: useTransform(
                            [mouseX, mouseY],
                            ([x, y]) => `radial-gradient(1000px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.12), transparent 70%)`
                        )
                    }}
                />

                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                        {/* Header section */}
                        <div className="flex justify-between items-start mb-16 pb-10 border-b border-white/[0.08]">
                            <div className="flex flex-col gap-4">
                                <span className="font-mono text-xs font-bold tracking-[0.5em] text-blue-400/90 uppercase">{service.id} &mdash; Service</span>
                                <h3 className="text-4xl md:text-6xl font-display uppercase tracking-tighter leading-[0.75] text-white">
                                    <EditorialReveal text={service.title} active={active} />
                                </h3>
                            </div>
                        </div>

                        {/* Description with bloom potential */}
                        <p className="text-gray-400 text-lg md:text-xl font-sans font-light max-w-2xl leading-relaxed mb-12">
                            {service.description.split(' ').map((word, i) => (
                                <span key={i} className="inline-block mr-[0.3em]">
                                    <EditorialReveal text={word} active={active} delay={i * 0.02} />
                                </span>
                            ))}
                        </p>
                    </div>

                    {/* Footer stats section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-auto pt-10 border-t border-white/[0.08]">
                        <div className="flex flex-wrap gap-3">
                            {service.tags.map(tag => (
                                <span key={tag} className="px-6 py-2 rounded-full border border-white/10 bg-white/[0.03] text-xs uppercase font-mono tracking-[0.5em] text-gray-400 hover:text-white hover:border-blue-500/30 transition-all cursor-none">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-16 justify-end">
                            {service.stats.map((s, i) => (
                                <div key={i} className="flex flex-col gap-2 text-right">
                                    <div className="text-3xl md:text-4xl font-display text-white">{s.val}{s.suffix}</div>
                                    <div className="text-xs font-mono uppercase tracking-[0.4em] text-gray-400">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default function ExpertiseSection() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
    const velocity = useVelocity(scrollYProgress);
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        return scrollYProgress.on('change', v => {
            setActiveIdx(Math.min(Math.floor(v * services.length), services.length - 1));
        });
    }, [scrollYProgress]);

    return (
        <section ref={ref} className="relative bg-[#050505] min-h-[700vh] overflow-visible">

            {/* Absolute Background System */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
                    <pattern id="xp-dots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="1" fill="#3b82f6" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#xp-dots)" />
                </svg>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(37,99,235,0.08),transparent)]" />
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-32 grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* Neural Control Center (Left) */}
                <aside className="lg:col-span-5 lg:sticky lg:top-[140px] lg:h-[calc(100vh-180px)] flex flex-col pt-4">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-8 h-px bg-blue-600" />
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.6em] text-blue-400">Our Services</span>
                    </div>

                    <div className="relative mb-10">
                        <div className="absolute -inset-10 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none" />
                        <h2 className="relative font-display uppercase tracking-tighter leading-none">
                            <span
                                className="block text-4xl md:text-5xl xl:text-6xl mb-1"
                                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.35)', color: 'transparent' }}
                            >
                                ELITE
                            </span>
                            <span className="block text-4xl md:text-5xl xl:text-6xl text-white">
                                CAPABILITY<span className="text-blue-600">.</span>
                            </span>
                        </h2>
                    </div>

                    <p className="text-gray-400 text-base md:text-lg font-sans font-light leading-relaxed mb-12 max-w-sm">
                        Six services. One obsession: making your growth measurable, defensible, and impossible to ignore.
                    </p>

                    <div className="flex flex-col gap-6 pl-2 border-l border-white/[0.05] ml-2 mb-auto">
                        {services.map((s, i) => (
                            <NavDot key={s.id} isActive={i === activeIdx} scrollYProgress={scrollYProgress}
                                index={i} total={services.length} label={s.title} />
                        ))}
                    </div>

                    <div className="mt-12">
                        <motion.a href="#contact" whileHover={{ x: 10 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            className="group relative flex items-center justify-between px-8 py-6 rounded-[1.5rem] border border-white/[0.08] bg-white/[0.02] overflow-hidden backdrop-blur-3xl">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            <div className="relative">
                                <div className="font-sans text-sm font-semibold text-white tracking-wide">Book a Free Strategy Session</div>
                                <div className="text-xs text-gray-500 mt-1">No commitment. 30 minutes. Real advice.</div>
                            </div>
                            <div className="relative w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center group-hover:rotate-45 transition-transform duration-1000 shadow-[0_0_40px_rgba(37,99,235,0.3)]">
                                <ArrowUpRight size={24} className="text-white" />
                            </div>
                        </motion.a>
                    </div>
                </aside>

                {/* Right Stack */}
                <div className="lg:col-span-7 pt-[20vh] pb-[60vh]">
                    {services.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} total={services.length}
                            scrollYProgress={scrollYProgress} scrollVelocity={velocity} />
                    ))}
                </div>
            </div>
        </section>
    );
}
