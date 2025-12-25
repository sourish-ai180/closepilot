
import React from 'react';
import Navbar, { Page } from './components/Navbar';
import Hero from './components/Hero';
import TrustBadges from './components/TrustBadges';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Templates from './components/Templates';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full relative">
      <Navbar onNavigate={onNavigate} />
      <Hero onNavigate={onNavigate} />
      <TrustBadges />
      <Features />
      <HowItWorks />
      <Templates />
      <Pricing />
      <Testimonials />
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default LandingPage;
