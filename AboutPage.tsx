import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SectionHeader from './components/SectionHeader';
import { Link } from '@tanstack/react-router';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-navy-900 min-h-screen text-white">
      <Navbar />
      <div className="pt-32 pb-20">
        <SectionHeader
          title="The Future of Closing"
          subtitle="ClosePilot was born out of a simple observation: writing proposals is the single biggest bottleneck for creative growth."
        />
        <div className="max-w-4xl mx-auto px-6 space-y-12 text-gray-400 leading-relaxed">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Our Story</h2>
            <p>
              Founded in 2025 by a team of former agency owners and software engineers, ClosePilot began in a small apartment in London. We spent years watching talented designers, developers, and consultants lose sleep over "proposal fatigue"—that soul-crushing moment where you spend 6 hours on a pitch only to have it ignored because of a formatting error.
            </p>
            <p>
              We realized that the tools available were either too simple (basic docs) or too bloated (enterprise CRM tools). There was no "middle ground" that used the power of modern AI to actually understand what a client wants and translate that into a beautiful, high-converting proposal.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white">The Mission</h2>
            <p>
              Our mission is to empower individual creators, freelancers, and small agencies to present themselves as global-tier professionals. We believe that technology should handle the friction of sales—the spreadsheets, the pricing calculations, the follow-ups—so you can focus on the art of your craft.
            </p>
            <p>
              We aren't just building a document editor; we're building a "Closing Engine." One that learns from successful deals and helps you replicate that success every time you hit "Generate."
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-12 mt-12 py-12 border-y border-white/5">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">Our Vision</h3>
              <p>A world where every creative professional has the tools to compete on quality, not just price, by presenting high-converting, intelligent proposals every single time. We want to level the playing field between the "solopreneur" and the "big-four" agencies.</p>
            </div>
            <div>
              <h3 className="text-white text-xl font-bold mb-4">Our Values</h3>
              <p>Design first. Data second. Speed always. We believe that a beautiful proposal is just as important as the data it contains. We value radical simplicity and the relentless pursuit of removing "clicks" from your workflow.</p>
            </div>
          </div>

          <section className="text-center pt-12">
            <h2 className="text-3xl font-bold text-white mb-6">Want to see us in action?</h2>
            <Link
              to="/signup"
              className="px-8 py-4 inline-block
bg-gradient-to-br from-accent-indigo via-accent-purple to-accent-indigo
rounded-2xl 
font-semibold tracking-wide
text-white
shadow-lg shadow-accent-indigo/25
hover:shadow-[0_0_40px_rgba(93,95,239,0.55)]
hover:scale-[1.04]
active:scale-[0.97]
transition-all duration-300 ease-out"
            >
              Start You Free Trial
            </Link>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;