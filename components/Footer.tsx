import React from 'react';
import { Sparkles, Twitter, Linkedin, Instagram, Github } from 'lucide-react';
import { Page } from './Navbar';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative bg-[#0B0F19] pt-24 pb-12 border-t border-white/5 overflow-hidden">
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-accent-indigo/50 to-transparent opacity-70" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => onNavigate('landing')}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-indigo to-accent-mint flex items-center justify-center shadow-lg shadow-accent-indigo/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">ClosePilot</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Empowering freelancers and agencies to win more business with intelligence, speed, and beautiful design.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><button onClick={() => onNavigate('features')} className="hover:text-accent-mint transition-colors duration-300 text-left">Features</button></li>
              <li><button onClick={() => onNavigate('pricing')} className="hover:text-accent-mint transition-colors duration-300 text-left">Pricing</button></li>
              <li><button onClick={() => onNavigate('templates')} className="hover:text-accent-mint transition-colors duration-300 text-left">Templates</button></li>
              <li><button onClick={() => onNavigate('showcase')} className="hover:text-accent-mint transition-colors duration-300 text-left">Showcase</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><button onClick={() => onNavigate('about')} className="hover:text-accent-mint transition-colors duration-300 text-left">About</button></li>
              <li><button onClick={() => onNavigate('blog')} className="hover:text-accent-mint transition-colors duration-300 text-left">Blog</button></li>
              <li><button onClick={() => onNavigate('careers')} className="hover:text-accent-mint transition-colors duration-300 text-left">Careers</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-accent-mint transition-colors duration-300 text-left">Contact</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><button onClick={() => onNavigate('privacy')} className="hover:text-accent-mint transition-colors duration-300 text-left">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('terms')} className="hover:text-accent-mint transition-colors duration-300 text-left">Terms of Service</button></li>
              <li><button onClick={() => onNavigate('cookie')} className="hover:text-accent-mint transition-colors duration-300 text-left">Cookie Policy</button></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-600">© 2026 ClosePilot Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] hover:scale-110">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] hover:scale-110">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] hover:scale-110">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] hover:scale-110">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;