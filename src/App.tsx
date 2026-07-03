import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Reasons from './components/Reasons';
import BuildingSection from './components/BuildingSection';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import Process from './components/Process';
import Marquee from './components/Marquee';
import GlobalMap from './components/GlobalMap';
import FAQ from './components/FAQ';
import Engagement from './components/Engagement';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ShowcaseVideo from './components/ShowcaseVideo';
import ExpertiseSection from './components/ExpertiseSection';
import { motion, useScroll, useSpring, MotionConfig } from 'motion/react';
import LawFirmsPage from './components/LawFirmsPage';
import ScanPage from './components/ScanPage';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Lightweight routing for standalone pages. Static hosts need a rewrite
  // of these paths -> /index.html in production.
  const path = window.location.pathname.replace(/\/$/, '');
  if (path === '/law-firms') {
    return (
      <MotionConfig reducedMotion="user">
        <LawFirmsPage />
      </MotionConfig>
    );
  }
  if (path === '/scan') {
    return (
      <MotionConfig reducedMotion="user">
        <ScanPage />
      </MotionConfig>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
    <div className="relative min-h-screen">
      <CustomCursor />

      {/* Noise Overlay */}
      <div className="noise-bg" />

      <Navbar />

      <main>
        <Hero />
        <Stats />
        <ShowcaseVideo />
        <ExpertiseSection />
        <BuildingSection />
        <About />
        <Reasons />
        <HowItWorks />
        <GlobalMap />
        <Process />
        <Marquee />
        <FAQ />
        <Engagement />
        <Testimonials />
        <ContactForm />
      </main>

      <Footer />
    </div>
    </MotionConfig>
  );
}
