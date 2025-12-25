import React from 'react';
import Navbar, { Page } from './components/Navbar';
import Footer from './components/Footer';
import SectionHeader from './components/SectionHeader';
import Button from './components/Button';
import { Mail, MessageCircle, MapPin, Twitter, Linkedin, Github } from 'lucide-react';

const ContactPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-navy-900 min-h-screen text-white">
      <Navbar onNavigate={onNavigate} />
      <div className="pt-32 pb-20">
        <SectionHeader 
          title="Get in Touch" 
          subtitle="Have a question or need a custom plan for your agency? We're here to help you close more deals." 
        />
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
          {/* Left Side: Contact Info */}
          <div className="lg:col-span-1 space-y-10">
            <div>
              <h3 className="text-2xl font-bold font-display mb-6">Contact Information</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                We're a remote-first team but always happy to connect. Whether you're experiencing a technical issue or just want to chat about sales strategy, our team is standing by.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent-indigo/10 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-accent-indigo" />
                </div>
                <div>
                  <h4 className="font-bold">Email us</h4>
                  <p className="text-gray-400 text-sm">support@closepilot.com</p>
                  <p className="text-gray-400 text-sm">sales@closepilot.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent-mint/10 rounded-lg flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-accent-mint" />
                </div>
                <div>
                  <h4 className="font-bold">Live Chat</h4>
                  <p className="text-gray-400 text-sm">Available Mon-Fri, 9am - 6pm EST.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent-purple/10 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-accent-purple" />
                </div>
                <div>
                  <h4 className="font-bold">HQ Office</h4>
                  <p className="text-gray-400 text-sm">Remote First • London / New York</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5">
              <h4 className="font-bold mb-4">Follow us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-2">
            <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-indigo/5 blur-3xl -mr-32 -mt-32 pointer-events-none" />
              
              <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">First Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent-indigo transition-all placeholder:text-gray-600" 
                      placeholder="Jane" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent-indigo transition-all placeholder:text-gray-600" 
                      placeholder="Doe" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent-indigo transition-all placeholder:text-gray-600" 
                    placeholder="jane@example.com" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Company Website (Optional)</label>
                  <input 
                    type="url" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent-indigo transition-all placeholder:text-gray-600" 
                    placeholder="https://youragency.com" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">How can we help?</label>
                  <textarea 
                    rows={5} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent-indigo transition-all placeholder:text-gray-600" 
                    placeholder="Tell us about your project or inquiry..." 
                  />
                </div>

                <Button variant="primary" className="w-full py-5 text-lg shadow-xl shadow-accent-indigo/20">
                  Send Message
                </Button>
                
                <p className="text-center text-xs text-gray-500">
                  By submitting this form, you agree to our <button onClick={() => onNavigate('privacy')} className="underline">Privacy Policy</button>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default ContactPage;