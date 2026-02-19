import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function InkTransition() {
  const { scrollYProgress } = useScroll();
  
  // We want the transition to trigger as it comes into view
  // This is a simplified version, ideally we'd use a specific ref
  const opacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.15, 0.25], [0.8, 1.2]);

  return (
    <div className="relative h-[40vh] w-full overflow-hidden bg-brand-dark z-10">
      <motion.div 
        style={{ opacity, scale }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover mix-blend-screen opacity-60"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-ink-bleeding-into-water-4444-large.mp4" type="video/mp4" />
        </video>
      </motion.div>
      
      {/* Gradient to smooth the transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-transparent to-brand-light" />
    </div>
  );
}
