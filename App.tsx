import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage';
import Dashboard from './components/Dashboard';
import FeaturesPage from './FeaturesPage';
import PricingPage from './PricingPage';
import TemplatesPage from './TemplatesPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import IntegrationsPage from './IntegrationsPage';
import AboutPage from './AboutPage';
import BlogPage from './BlogPage';
import CareersPage from './CareersPage';
import ContactPage from './ContactPage';
import PrivacyPage from './PrivacyPage';
import TermsPage from './TermsPage';
import CookiePage from './CookiePage';
import { Page } from './components/Navbar';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('landing');

  // Automatically scroll to the top of the window when the page state changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // 'instant' is preferred for SPA navigation to prevent jarring scrolling animations
    });
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard onBack={() => setPage('landing')} />;
      case 'features': return <FeaturesPage onNavigate={setPage} />;
      case 'pricing': return <PricingPage onNavigate={setPage} />;
      case 'templates': return <TemplatesPage onNavigate={setPage} />;
      case 'login': return <LoginPage onNavigate={setPage} />;
      case 'signup': return <SignupPage onNavigate={setPage} />;
      case 'integrations': return <IntegrationsPage onNavigate={setPage} />;
      case 'about': return <AboutPage onNavigate={setPage} />;
      case 'blog': return <BlogPage onNavigate={setPage} />;
      case 'careers': return <CareersPage onNavigate={setPage} />;
      case 'contact': return <ContactPage onNavigate={setPage} />;
      case 'privacy': return <PrivacyPage onNavigate={setPage} />;
      case 'terms': return <TermsPage onNavigate={setPage} />;
      case 'cookie': return <CookiePage onNavigate={setPage} />;
      default: return <LandingPage onNavigate={setPage} />;
    }
  };

  return (
    <div className="min-h-screen font-sans text-white bg-navy-900 selection:bg-accent-indigo selection:text-white">
      {renderPage()}
    </div>
  );
};

export default App;