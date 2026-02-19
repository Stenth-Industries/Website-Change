import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Reasons from './components/Reasons';
import Services from './components/Services';
import Cases from './components/Cases';
import Process from './components/Process';
import Marquee from './components/Marquee';
import Vision from './components/Vision';
import GlobalMap from './components/GlobalMap';
import InkTransition from './components/InkTransition';
import FAQ from './components/FAQ';
import Engagement from './components/Engagement';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen">
      <CustomCursor />
      
      {/* Noise Overlay */}
      <div className="noise-bg" />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-accent z-50 origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        <Hero />
        <Stats />
        <Reasons />
        <GlobalMap />
        <InkTransition />
        <Services />
        <Cases />
        <Process />
        <Vision />
        <Marquee />
        <FAQ />
        <Engagement />
        <Testimonials />
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}
