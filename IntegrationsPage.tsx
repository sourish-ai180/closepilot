import React from 'react';
import Navbar, { Page } from './components/Navbar';
import Footer from './components/Footer';
import SectionHeader from './components/SectionHeader';
import { Layout, MessageSquare, CreditCard, Share2, Zap, Cloud } from 'lucide-react';

const integrations = [
  { name: 'Slack', icon: MessageSquare, desc: 'Get proposal view notifications directly in your team channels.', color: 'text-purple-400' },
  { name: 'Stripe', icon: CreditCard, desc: 'Connect your Stripe account to collect deposits instantly upon signing.', color: 'text-blue-400' },
  { name: 'Zapier', icon: Zap, desc: 'Automate your workflow by connecting to over 5,000+ apps.', color: 'text-orange-400' },
  { name: 'HubSpot', icon: Layout, desc: 'Sync proposal status and client data with your CRM.', color: 'text-orange-500' },
  { name: 'LinkedIn', icon: Share2, desc: 'Easily share your professional proposals with your network.', color: 'text-blue-600' },
  { name: 'Google Drive', icon: Cloud, desc: 'Store, manage, and share proposals securely in one place.', color: 'text-green-500' },
];

const IntegrationsPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-navy-900 min-h-screen">
      <Navbar onNavigate={onNavigate} />
      <div className="pt-32 pb-20">
        <SectionHeader 
          title="Powerful Integrations" 
          subtitle="Connect ClosePilot with the tools you already use to automate your entire sales process." 
        />
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {integrations.map((item, i) => (
            <div key={i} className="glass p-8 rounded-3xl border border-white/5 hover:border-accent-indigo/50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default IntegrationsPage;