import React from "react";
import { Palette, Laptop, Sparkles, Building2, Megaphone } from "lucide-react";

const TrustBadges: React.FC = () => {
  const categories = [
    { name: "Designers", icon: <Palette className="w-4 h-4" /> },
    { name: "Freelancers", icon: <Laptop className="w-4 h-4" /> },
    { name: "Creators", icon: <Sparkles className="w-4 h-4" /> },
    { name: "Agencies", icon: <Building2 className="w-4 h-4" /> },
    { name: "Marketers", icon: <Megaphone className="w-4 h-4" /> },
    { name: "Consultants", icon: <Laptop className="w-4 h-4" /> },
    { name: "Startups", icon: <Building2 className="w-4 h-4" /> },
  ];

  // Helper component to render a single set of badges
  // pr-6 ensures the gap between the end of this group and the start of the next group matches the gap-6
  const MarqueeGroup = ({ ariaHidden }: { ariaHidden?: boolean }) => (
    <div
      className="flex shrink-0 animate-marquee items-center gap-6 pr-6"
      aria-hidden={ariaHidden}
    >
      {categories.map((cat, i) => (
        <div
          key={i}
          className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white/[0.02] border border-white/5 text-gray-300 font-medium transition-all duration-300 hover:bg-white/[0.05] hover:border-accent-indigo/30 hover:text-white cursor-default backdrop-blur-sm whitespace-nowrap"
        >
          <span className="text-accent-indigo group-hover:scale-110 transition-transform duration-300">
            {cat.icon}
          </span>
          <span className="tracking-wide">{cat.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-20 relative overflow-hidden border-t border-white/5 bg-navy-900/50">
      <div className="max-w-7xl mx-auto px-4 text-center z-10 relative mb-12">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 tracking-tight">
          Loved by Early Creators & Agencies
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          A growing community of freelancers, creators & small teams are already
          improving their workflow with AI‑powered proposals.
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative flex overflow-hidden w-full">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0B0F19] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0B0F19] to-transparent z-10 pointer-events-none" />

        {/* Double render for seamless loop */}
        <MarqueeGroup />
        <MarqueeGroup ariaHidden={true} />
      </div>
    </section>
  );
};

export default TrustBadges;
