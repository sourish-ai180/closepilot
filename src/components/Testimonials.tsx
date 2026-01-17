import React from "react";
import { Clock, TrendingUp, FileCheck } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Create Proposals in Minutes, Not Hours",
    desc: "Users save a huge amount of time by generating structured, client‑ready proposals instantly. No more struggling with blank pages — AI handles the outline, wording, and formatting.",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: TrendingUp,
    title: "Confident Pricing With Zero Guesswork",
    desc: "The smart pricing engine helps users charge correctly, present clear estimates, and avoid underpricing. This builds trust with clients and increases their chances of closing deals.",
    color: "text-green-400 bg-green-500/10 border-green-500/20",
  },
  {
    icon: FileCheck,
    title: "Professional, Branded PDFs Clients Love",
    desc: "Users can export clean, agency‑level proposal PDFs that instantly boost their credibility. This directly improves how clients perceive their business and increases conversion rates.",
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section id="customers" className="py-24 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent-indigo/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-16 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
          Why Early Users Are Excited
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Real creators, freelancers, and agencies are already experiencing
          meaningful improvements in the way they work.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto relative z-10">
        {benefits.map((item, idx) => (
          <div
            key={idx}
            className="glass p-8 rounded-3xl hover:-translate-y-2 transition-all duration-300 shadow-xl hover:shadow-2xl group relative overflow-hidden"
          >
            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border transition-transform duration-300 group-hover:scale-110 ${item.color}`}
            >
              <item.icon size={28} />
            </div>

            <h3 className="text-xl font-bold text-white mb-4 leading-tight">
              {item.title}
            </h3>
            <p className="text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
