import React from 'react';
import Navbar, { Page } from './components/Navbar';
import Footer from './components/Footer';
import SectionHeader from './components/SectionHeader';

const posts = [
  { 
    title: "10 Tips for Closing Your First $10k Deal", 
    date: "Nov 12, 2025", 
    cat: "Sales Strategy",
    summary: "Closing high-ticket deals requires a shift in mindset from 'vendor' to 'partner'. Learn how to structure your discovery calls and follow-up emails to demonstrate high value from minute one."
  },
  { 
    title: "Why Pricing Anchoring is Your Secret Weapon", 
    date: "Nov 5, 2025", 
    cat: "Psychology",
    summary: "The first price a client sees sets the bar for everything that follows. We break down the psychology of pricing tiers and how to use 'The Decoy Effect' to make your preferred package look like a steal."
  },
  { 
    title: "How AI is Changing the Freelance Economy", 
    date: "Nov 28, 2025", 
    cat: "Tech Trends",
    summary: "AI isn't coming for your job—it's coming for your admin. Discover how freelancers are using LLMs to handle project management, initial scoping, and legal drafting, allowing them to take on 2x the client load."
  },
  {
    title: "The Art of the 'No-Ask' Proposal",
    date: "Nov 20, 2025",
    cat: "Copywriting",
    summary: "Stop asking for permission to start. Learn how to draft proposals that assume the sale by focusing on the 'Future State' of the client's business rather than the technical features of your service."
  }
];

const BlogPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-navy-900 min-h-screen text-white">
      <Navbar onNavigate={onNavigate} />
      <div className="pt-32 pb-20">
        <SectionHeader 
          title="Insights & Advice" 
          subtitle="Everything you need to know about scaling your service business and closing more deals in a digital-first world." 
        />
        
        <div className="max-w-5xl mx-auto px-6 mb-16 text-gray-400 text-center">
          <p className="max-w-2xl mx-auto">
            Our blog is dedicated to the craft of the close. Whether you're a first-time freelancer or a seasoned agency veteran, we provide the data-driven insights you need to stay ahead of the curve.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-6 grid gap-8">
          {posts.map((post, i) => (
            <div key={i} className="glass p-8 rounded-3xl border border-white/5 hover:border-accent-indigo/50 transition-all group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-indigo/5 blur-3xl -mr-16 -mt-16 group-hover:bg-accent-indigo/10 transition-colors" />
              
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 rounded-full bg-accent-indigo/10 text-accent-indigo text-[10px] font-bold uppercase tracking-widest border border-accent-indigo/20">
                  {post.cat}
                </span>
                <span className="text-xs text-gray-500 font-medium">{post.date}</span>
              </div>
              <h3 className="text-2xl font-bold group-hover:text-accent-mint transition-colors mb-4">{post.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {post.summary}
              </p>
              <div className="mt-6 flex items-center gap-2 text-accent-indigo font-bold text-sm">
                Read full article <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-6 mt-20 p-12 glass rounded-3xl border border-white/5 text-center">
          <h3 className="text-2xl font-bold mb-4">Join 5,000+ subscribers</h3>
          <p className="text-gray-400 mb-8">Get the latest sales strategies and product updates delivered to your inbox every Tuesday.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-indigo transition-all"
            />
            <button className="bg-white text-navy-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">Subscribe</button>
          </form>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default BlogPage;