import React from "react";
import { Wand2, Calculator, FileDown, BarChart3 } from "lucide-react";
import SectionHeader from "./SectionHeader";

const features = [
  {
    icon: Wand2,
    title: "AI Proposal Writer",
    desc: "Input a few keywords and let our advanced AI write persuasive, industry-specific copy that sells.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    icon: Calculator,
    title: "Smart Pricing Engine",
    desc: "Automatically calculate profit margins and suggest optimal pricing strategies based on project scope.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: FileDown,
    title: "1-Click PDF Export",
    desc: "Export beautiful, branded PDFs instantly. No watermarks on paid plans. Ready to send.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: BarChart3,
    title: "History & Analytics",
    desc: "Track which proposals were opened, how long they were viewed, and your win rate over time.",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-32 relative">
      <SectionHeader
        title="Built for Modern Agencies"
        subtitle="Replace your messy Google Docs and PDF templates with a streamlined, intelligent workflow."
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="glass p-8 rounded-2xl group hover:-translate-y-2 transition-all duration-500 relative overflow-hidden border border-white/5 hover:border-white/20"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border ${feature.bg} ${feature.border}`}
              >
                <feature.icon size={26} className={feature.color} />
              </div>

              <h3 className="text-xl font-bold mb-3 text-white tracking-tight">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.desc}
              </p>

              {/* Bottom Glow Line */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
