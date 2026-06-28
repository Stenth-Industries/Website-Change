import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Reasons from './components/Reasons';
import BuildingSection from './components/BuildingSection';
import HowItWorks from './components/HowItWorks';
import Process from './components/Process';
import Marquee from './components/Marquee';
import GlobalMap from './components/GlobalMap';
import InkTransition from './components/InkTransition';
import FAQ from './components/FAQ';
import Engagement from './components/Engagement';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { OrbitingCirclesDemo } from './components/OrbitingCirclesDemo';
import ShowcaseVideo from './components/ShowcaseVideo';
import ExpertiseSection from './components/ExpertiseSection';
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

      <Navbar />

      <main>
        <Hero />
        <Stats />
        <ShowcaseVideo />
        <ExpertiseSection />
        <BuildingSection />
        <Reasons />
        <HowItWorks />
        <GlobalMap />
        <InkTransition />
        <Process />
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
