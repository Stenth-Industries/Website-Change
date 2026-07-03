import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useReducedMotion } from 'motion/react';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const reduceMotion = useReducedMotion();

  // Only enable the custom cursor on devices with a fine pointer (mouse/trackpad)
  const [hasFinePointer, setHasFinePointer] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    setHasFinePointer(window.matchMedia('(pointer: fine)').matches);
  }, []);

  const enabled = hasFinePointer && !reduceMotion;

  useEffect(() => {
    if (!enabled) return;
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, enabled]);

  if (!enabled) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border border-brand-accent rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        left: -16,
        top: -16,
      }}
      animate={{
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? 'rgba(111, 156, 235, 0.2)' : 'rgba(111, 156, 235, 0)',
      }}
    >
      <div className="w-1 h-1 bg-brand-accent rounded-full" />
    </motion.div>
  );
}
