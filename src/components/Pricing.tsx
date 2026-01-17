import React from "react";
import { Check, Sparkles } from "lucide-react";
import Button from "./Button";
import SectionHeader from "./SectionHeader";

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-32 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl bg-accent-indigo/5 blur-[150px] rounded-full z-0 pointer-events-none" />

      <SectionHeader
        title="Simple, Transparent Pricing"
        subtitle="Start free. Upgrade only when you're closing more clients with AI-powered proposals."
      />

      {/* 👇 items-stretch added */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 items-stretch">
        {/* Starter Plan */}
        <div className="glass p-8 rounded-3xl border border-white/5 hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full relative group">
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

          <h3 className="text-lg font-semibold text-gray-300 mb-2">Starter</h3>
          <div className="flex items-baseline mb-6">
            <span className="text-4xl font-bold text-white">$0</span>
            <span className="text-gray-500 ml-2 font-medium">/ Free Trial</span>
          </div>
          <p className="text-sm text-gray-400 mb-8 min-h-[40px]">
            Perfect for freelancers exploring the platform.
          </p>

          <Button
            variant="secondary"
            className="w-full mb-8 text-sm bg-white/5 hover:bg-white/10 text-white border-none"
          >
            Start Free
          </Button>

          <ul className="space-y-4 text-sm text-gray-400 flex-1 relative z-10">
            {[
              "5 AI-generated proposals",
              "3 base templates",
              "Basic PDF export",
              "Smart pricing preview",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <Check className="w-4 h-4 text-accent-indigo shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Pro Plan */}
        <div className="p-8 rounded-3xl border border-accent-indigo/30 bg-[#161b2c]/90 backdrop-blur-xl relative transform md:scale-105 shadow-[0_0_50px_rgba(93,95,239,0.15)] hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full z-10 group ring-1 ring-accent-indigo/50">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-accent-indigo to-accent-purple text-white px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase shadow-lg border border-white/20 z-20">
            Most Popular
          </div>

          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-accent-indigo/50 to-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

          <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
            Pro{" "}
            <Sparkles className="w-4 h-4 text-accent-indigo animate-pulse" />
          </h3>

          <div className="flex items-baseline mb-6">
            <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-indigo to-accent-purple">
              $29
            </span>
            <span className="text-gray-500 ml-2 font-medium">/mo</span>
          </div>

          <p className="text-sm text-gray-300 mb-8 min-h-[40px]">
            For creators & agencies sending weekly.
          </p>

          <Button
            variant="primary"
            className="w-full mb-8 text-sm shadow-lg shadow-accent-indigo/20"
          >
            Start Free Trial
          </Button>

          <ul className="space-y-4 text-sm text-gray-300 flex-1 relative z-10">
            {[
              "Unlimited AI proposals",
              "Full smart pricing engine",
              "Premium templates",
              "Branded PDF export",
              "Proposal analytics",
              "Priority generation",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <Check className="w-4 h-4 text-accent-mint shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Agency Plan */}
        <div className="glass p-8 rounded-3xl border border-white/5 hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full relative group">
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

          <h3 className="text-lg font-semibold text-gray-300 mb-2">Agency</h3>
          <div className="flex items-baseline mb-6">
            <span className="text-4xl font-bold text-white">$49</span>
            <span className="text-gray-500 ml-2 font-medium">/mo</span>
          </div>

          <p className="text-sm text-gray-400 mb-8 min-h-[40px]">
            Built for agencies managing multiple clients.
          </p>

          <Button
            variant="secondary"
            className="w-full mb-8 text-sm bg-white/5 hover:bg-white/10 text-white border-none"
          >
            Start Free Trial
          </Button>

          <ul className="space-y-4 text-sm text-gray-400 flex-1 relative z-10">
            <li className="flex items-center gap-3 font-semibold text-white">
              <Check className="w-4 h-4 text-accent-indigo shrink-0" />
              Everything in Pro, plus:
            </li>
            {[
              "Team access (3 users)",
              "Shared library",
              "Advanced insights",
              "Client acceptance tracking",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <Check className="w-4 h-4 text-accent-indigo shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="text-center mt-12 animate-slide-up opacity-0"
        style={{ animationDelay: "0.4s" }}
      >
        <p className="text-gray-500 text-sm">
          All plans include a 7-day free trial. Cancel anytime.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
