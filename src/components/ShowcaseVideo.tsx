import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function ShowcaseVideo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <section
            ref={containerRef}
            className="py-24 px-6 md:px-12 bg-brand-dark relative overflow-hidden"
        >
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full opacity-50" />
            </div>

            <div className="max-w-[1200px] mx-auto relative z-10">
                <div className="flex flex-col items-center mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <div className="w-12 h-px bg-brand-accent/40" />
                        <span className="font-mono text-xs uppercase tracking-[0.5em] text-brand-accent">Beyond the Surface</span>
                        <div className="w-12 h-px bg-brand-accent/40" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-6xl md:text-8xl font-display text-brand-light tracking-tighter leading-none"
                    >
                        PRECISION IN <span className="text-brand-accent">MOTION.</span>
                    </motion.h2>
                </div>

                <motion.div
                    style={{ scale, opacity }}
                    className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 group shadow-2xl"
                >
                    {/* Video Element */}
                    <video
                        ref={videoRef}
                        src="/stenth-explainer.mp4"
                        poster="/stenth-explainer-poster.jpg"
                        className="w-full h-full object-cover"
                        preload="metadata"
                        loop
                        muted={isMuted}
                        playsInline
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                    />

                    {/* Overlay Controls */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                    {/* Center Play Button (Visible when paused) */}
                    {!isPlaying && (
                        <motion.button
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            whileHover={{ scale: 1.1 }}
                            onClick={togglePlay}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-brand-accent/90 flex items-center justify-center text-brand-dark backdrop-blur-sm shadow-xl z-20"
                        >
                            <Play fill="currentColor" size={32} className="ml-1" />
                        </motion.button>
                    )}

                    {/* Bottom Bar Controls */}
                    <div className="absolute bottom-0 inset-x-0 p-6 flex items-center justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="flex items-center gap-6">
                            <button
                                onClick={togglePlay}
                                className="text-white hover:text-brand-accent transition-colors"
                                aria-label={isPlaying ? "Pause" : "Play"}
                            >
                                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                            </button>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={toggleMute}
                                    className="text-white hover:text-brand-accent transition-colors"
                                    aria-label={isMuted ? "Unmute" : "Mute"}
                                >
                                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-white/50 uppercase tracking-widest">Stenth Explainer</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                        </div>
                    </div>

                    {/* Holographic Border Effect */}
                    <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-[2rem] z-30" />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </motion.div>
            </div>
        </section>
    );
}
