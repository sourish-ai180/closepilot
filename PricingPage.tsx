
import React from 'react';
import Navbar, { Page } from './components/Navbar';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  onNavigate: (page: Page) => void;
}

const PricingPage: React.FC<PageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full relative min-h-screen flex flex-col bg-navy-900">
      <Navbar onNavigate={onNavigate} />
      <div className="pt-32 flex-1">
        <div className="max-w-7xl mx-auto px-6 mb-4">
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group mb-8"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
        </div>
        <Pricing />
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
export default PricingPage;
