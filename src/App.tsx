import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Reasons from './components/Reasons';
import BuildingSection from './components/BuildingSection';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import Process from './components/Process';
import Marquee from './components/Marquee';
import FAQ from './components/FAQ';
import Engagement from './components/Engagement';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ShowcaseVideo from './components/ShowcaseVideo';
import ExpertiseSection from './components/ExpertiseSection';
import { motion, useScroll, useSpring, MotionConfig } from 'motion/react';
import ScanCTA from './components/ScanCTA';
import { getPractice } from './practices';

/* Code-split the heavy leaves: the D3 world map and the standalone pages
   load their own chunks instead of shipping in the main bundle. */
const GlobalMap = lazy(() => import('./components/GlobalMap'));
const LawFirmsPage = lazy(() => import('./components/LawFirmsPage'));
const ScanPage = lazy(() => import('./components/ScanPage'));
const RoiPage = lazy(() => import('./components/RoiPage'));
const ChecklistPage = lazy(() => import('./components/ChecklistPage'));
const ReportPage = lazy(() => import('./components/ReportPage'));
const LoginPage = lazy(() => import('./components/LoginPage'));
const HubPage = lazy(() => import('./components/HubPage'));

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Lightweight routing for standalone pages. Static hosts need a rewrite
  // of these paths -> /index.html in production (vercel.json).
  const path = window.location.pathname.replace(/\/$/, '');
  if (path === '/law-firms' || path.startsWith('/law-firms/')) {
    // Unknown practice slugs fall back to the generic law-firms page.
    const practice = getPractice(path.slice('/law-firms/'.length));
    return (
      <MotionConfig reducedMotion="user">
        <Suspense fallback={<div className="min-h-screen bg-brand-dark" />}>
          <LawFirmsPage practice={practice} />
        </Suspense>
      </MotionConfig>
    );
  }
  if (path === '/scan') {
    return (
      <MotionConfig reducedMotion="user">
        <Suspense fallback={<div className="min-h-screen bg-brand-dark" />}>
          <ScanPage />
        </Suspense>
      </MotionConfig>
    );
  }
  if (path === '/roi') {
    return (
      <MotionConfig reducedMotion="user">
        <Suspense fallback={<div className="min-h-screen bg-brand-dark" />}>
          <RoiPage />
        </Suspense>
      </MotionConfig>
    );
  }
  if (path.startsWith('/r/')) {
    // Per-prospect outreach reports; data ships as /r-data/<slug>.json.
    return (
      <MotionConfig reducedMotion="user">
        <Suspense fallback={<div className="min-h-screen bg-brand-dark" />}>
          <ReportPage slug={path.slice('/r/'.length)} />
        </Suspense>
      </MotionConfig>
    );
  }
  if (path === '/funnel-check') {
    return (
      <MotionConfig reducedMotion="user">
        <Suspense fallback={<div className="min-h-screen bg-brand-dark" />}>
          <ChecklistPage />
        </Suspense>
      </MotionConfig>
    );
  }
  if (path === '/login') {
    return (
      <MotionConfig reducedMotion="user">
        <Suspense fallback={<div className="min-h-screen bg-brand-dark" />}>
          <LoginPage />
        </Suspense>
      </MotionConfig>
    );
  }
  if (path === '/hub') {
    return (
      <MotionConfig reducedMotion="user">
        <Suspense fallback={<div className="min-h-screen bg-brand-dark" />}>
          <HubPage />
        </Suspense>
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
        <ScanCTA />
        <HowItWorks />
        <Suspense fallback={<div className="min-h-[60vh] bg-brand-dark" />}>
          <GlobalMap />
        </Suspense>
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
