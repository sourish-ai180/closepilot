import React from 'react';
import Navbar, { Page } from './components/Navbar';
import Footer from './components/Footer';
import SectionHeader from './components/SectionHeader';
import { Coffee, Globe, Heart, Rocket, Zap, ShieldCheck } from 'lucide-react';

const jobs = [
  { title: "Senior Frontend Engineer", location: "Remote / Europe", type: "Full-time" },
  { title: "Product Designer (UI/UX)", location: "Remote", type: "Full-time" },
  { title: "Growth Marketing Manager", location: "New York, NY", type: "Full-time" },
  { title: "AI/ML Specialist", location: "Remote", type: "Full-time" },
];

const benefits = [
  { icon: Globe, title: "100% Remote", desc: "Work from anywhere in the world. We value output over office hours." },
  { icon: Heart, title: "Healthcare", desc: "Comprehensive health, dental, and vision coverage for you and your family." },
  { icon: Rocket, title: "Equity", desc: "Generous stock option plans. We want every team member to be an owner." },
  { icon: Coffee, title: "Stipends", desc: "Monthly stipends for co-working spaces, home office gear, and learning." },
];

const CareersPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-navy-900 min-h-screen text-white">
      <Navbar onNavigate={onNavigate} />
      <div className="pt-32 pb-20">
        <SectionHeader 
          title="Join the Pilot Program" 
          subtitle="We are a small, elite team building the future of B2B sales. We're looking for builders, dreamers, and doers." 
        />
        
        {/* Culture Section */}
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 mb-24 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-display">Our Culture</h2>
            <p className="text-gray-400 leading-relaxed">
              At ClosePilot, we don't believe in hierarchy for hierarchy's sake. We are a product-led company that moves fast and breaks things—but only if we can fix them even faster. We value radical transparency, deep focus, and the ability to take extreme ownership of your work.
            </p>
            <p className="text-gray-400 leading-relaxed">
              You won't find endless meetings here. Instead, you'll find a culture of deep work, asynchronous communication, and a shared obsession with building the best proposal software on the planet.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass p-6 rounded-2xl border border-white/5 aspect-square flex flex-col items-center justify-center text-center">
              <Zap className="w-8 h-8 text-accent-indigo mb-4" />
              <h4 className="font-bold">High Velocity</h4>
            </div>
            <div className="glass p-6 rounded-2xl border border-white/5 aspect-square flex flex-col items-center justify-center text-center mt-8">
              <ShieldCheck className="w-8 h-8 text-accent-mint mb-4" />
              <h4 className="font-bold">Trust First</h4>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-navy-800/50 py-20 mb-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold font-display text-center mb-16">Why Work With Us?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((b, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <b.icon className="w-6 h-6 text-accent-indigo" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">{b.title}</h4>
                  <p className="text-gray-400 text-sm">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Open Roles */}
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold font-display mb-8">Open Roles</h2>
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <div key={i} className="flex flex-col md:flex-row justify-between items-center glass p-8 rounded-2xl border border-white/5 hover:bg-white/[0.05] transition-all group border-l-4 border-l-transparent hover:border-l-accent-indigo">
                <div>
                  <h3 className="text-xl font-bold group-hover:text-accent-indigo transition-colors">{job.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{job.location} • {job.type}</p>
                </div>
                <button className="mt-4 md:mt-0 px-6 py-3 bg-white text-navy-900 hover:bg-gray-100 rounded-xl font-bold transition-all shadow-lg">Apply Now</button>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-gray-500">
            Don't see a role that fits? Send us your resume anyway at <span className="text-accent-indigo">careers@closepilot.com</span>
          </p>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default CareersPage;