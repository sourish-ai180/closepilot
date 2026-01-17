import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SectionHeader from './components/SectionHeader';
import { Eye, Heart, Share2, Sparkles, ArrowRight } from 'lucide-react';
import Button from './components/Button';
import { useNavigate } from '@tanstack/react-router';

const SHOWCASE_ITEMS = [
  {
    title: "Eco-Tech Brand Refresh",
    author: "Studio Nord",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800",
    views: "1.2k",
    likes: "450"
  },
  {
    title: "SaaS Platform Strategy",
    author: "Alex Rivera",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    views: "3.4k",
    likes: "890"
  },
  {
    title: "Mobile App Development",
    author: "DevLabs Agency",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
    views: "2.1k",
    likes: "620"
  },
  {
    title: "Luxury Real Estate Pitch",
    author: "Prime Estates",
    category: "Sales",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    views: "980",
    likes: "310"
  },
  {
    title: "Content Marketing 2026",
    author: "ViralFlow",
    category: "Creative",
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=800",
    views: "5.6k",
    likes: "1.2k"
  },
  {
    title: "Consultancy Agreement",
    author: "Sarah Chen",
    category: "Legal",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
    views: "1.5k",
    likes: "420"
  }
];

const ShowcasePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-navy-900 min-h-screen text-white">
      <Navbar />

      <div className="pt-32 pb-24 relative overflow-hidden">
        {/* Decorative Ambience */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent-indigo/5 blur-[120px] rounded-full pointer-events-none" />

        <SectionHeader
          title="Community Showcase"
          subtitle="Discover high-converting proposals built by our talented community of freelancers and agencies."
        />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SHOWCASE_ITEMS.map((item, i) => (
              <div
                key={i}
                className="group relative rounded-[2rem] overflow-hidden glass border border-white/5 transition-all duration-700 hover:border-accent-indigo/40 hover:translate-y-[-8px] hover:shadow-[0_20px_50px_rgba(93,95,239,0.15)]"
              >
                {/* Image Wrap */}
                <div className="h-64 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent opacity-60" />

                  {/* Category Tag */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-navy-900/80 backdrop-blur-md text-[10px] font-black uppercase tracking-widest border border-white/10 text-accent-indigo">
                    {item.category}
                  </div>

                  {/* Hover Action */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <button className="px-6 py-2.5 rounded-full bg-white text-navy-900 font-bold text-sm flex items-center gap-2 shadow-2xl hover:scale-105 transition-transform">
                      <Eye size={16} /> View Proposal
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-accent-indigo transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">by <span className="text-gray-400 font-medium">{item.author}</span></p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                      <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                        <Eye size={14} /> {item.views}
                      </span>
                      <span className="flex items-center gap-1.5 hover:text-accent-mint transition-colors cursor-pointer group/heart">
                        <Heart size={14} className="group-hover/heart:fill-accent-mint" /> {item.likes}
                      </span>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-24 p-12 rounded-[3rem] glass border border-white/5 relative overflow-hidden text-center group">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-indigo/5 to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative z-10">
              <Sparkles className="w-12 h-12 text-accent-indigo mx-auto mb-6 animate-pulse" />
              <h2 className="text-3xl font-bold mb-4">Ready to show off your winning deals?</h2>
              <p className="text-gray-400 max-w-xl mx-auto mb-10 text-lg">
                Join thousands of creators using ClosePilot to automate their sales workflow and close high-ticket clients.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button variant="primary" className="h-14 px-10 text-lg" onClick={() => navigate({ to: '/signup' })}>
                  Start Building Now <ArrowRight size={18} className="ml-2" />
                </Button>
                <button
                  onClick={() => navigate({ to: '/pricing' })}
                  className="text-gray-500 font-bold hover:text-white transition-colors flex items-center gap-2 group/btn"
                >
                  View Pricing Plans <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShowcasePage;