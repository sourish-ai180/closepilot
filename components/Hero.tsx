import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Play,
  Plus,
  Calculator,
  Layers,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import Button from './Button';
import { useNavigate } from '@tanstack/react-router';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 min-h-screen overflow-hidden flex flex-col items-center">
      {/* BACKGROUND GLOWS - AMBIENT ATMOSPHERE */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-accent-indigo/10 rounded-full blur-[160px]" />
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-accent-purple/10 rounded-full blur-[100px] opacity-50" />
        <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] bg-accent-mint/5 rounded-full blur-[130px] opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        {/* TOP BADGE - SMOOTH PULSE */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-slide-up opacity-0" style={{ animationDelay: '0.1s' }}>
          <span className="w-2 h-2 rounded-full bg-accent-mint animate-pulse" />
          <span className="text-sm font-medium text-accent-mint">
            Introducing Smart Pricing Intelligence
          </span>
        </div>

        {/* HERO TITLE */}
        <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8 animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
          Create <span className="text-gradient-accent">Stunning</span> Client<br />
          Proposals <span className="text-gradient-accent">10x Faster</span>
        </h1>

        {/* SUBTITLE */}
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto animate-slide-up opacity-0" style={{ animationDelay: '0.3s' }}>
          Generate high-converting proposals instantly with AI-powered structure,
          smart pricing, and analytics.
        </p>

        {/* CTA BUTTONS - SMOOTH HOVER SCALE */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
          <div className="transition-transform duration-500 hover:scale-[1.05] active:scale-95">
            <Button
              variant="primary"
              icon={<ArrowRight className="w-4 h-4" />}
              className="h-14 text-lg"
              onClick={() => navigate({ to: '/signup' })}
            >
              Start Free Trial
            </Button>
          </div>

          <div className="transition-transform duration-500 hover:scale-[1.05] active:scale-95">
            <Button
              variant="outline"
              className="h-14 text-lg"
              onClick={() => navigate({ to: '/features' })}
            >
              <Play className="w-4 h-4" /> Watch Demo
            </Button>
          </div>
        </div>

        {/* DASHBOARD MOCKUP - ENHANCED ULTRA-SMOOTH HOVER */}
        <div
          className={`group/mockup w-full max-w-5xl mx-auto rounded-[2.5rem]
          border border-white/10 bg-[#0B0F19]
          shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]
          overflow-hidden transition-all duration-1000 ease-out
          hover:border-accent-indigo/40
          hover:shadow-[0_0_100px_-20px_rgba(93,95,239,0.4)]
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`}
        >
          {/* BROWSER BAR */}
          <div className="h-14 flex items-center px-8 border-b border-white/5 bg-[#0D111C]">
            <div className="flex gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-lg shadow-red-500/20 hover:scale-125 transition-transform cursor-pointer" />
              <span className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-lg shadow-amber-500/20 hover:scale-125 transition-transform cursor-pointer" />
              <span className="w-3 h-3 rounded-full bg-[#28C840] shadow-lg shadow-emerald-500/20 hover:scale-125 transition-transform cursor-pointer" />
            </div>
            <div className="flex-1 text-center text-[12px] text-gray-600 font-mono tracking-wider flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-indigo/40 animate-pulse" />
              app.closepilot.com/dashboard/preview
            </div>
          </div>

          {/* DASHBOARD HEADER MOCKUP */}
          <div className="h-24 px-10 border-b border-white/5 flex items-center justify-between bg-[#0B0F19]">
            <div className="flex items-center gap-4">
              <span className="text-gray-500 font-medium text-lg hover:text-accent-indigo transition-colors duration-500 cursor-pointer">Home</span>
              <ChevronRight className="w-5 h-5 text-gray-700" />
              <span className="text-white font-extrabold text-lg tracking-tight hover:text-accent-mint transition-colors duration-500 cursor-default">Example Proposal</span>
            </div>

            <div className="flex items-center gap-6">
              {/* PREVIEW DATA BADGE */}
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-accent-mint/20 bg-accent-mint/[0.03] shadow-[0_0_20px_rgba(110,231,183,0.05)] transition-all duration-700 hover:bg-accent-mint/10 hover:border-accent-mint/40 cursor-default">
                <span className="w-2 h-2 rounded-full bg-accent-mint shadow-[0_0_8px_rgba(110,231,183,0.5)] animate-pulse" />
                <span className="text-[12px] font-black text-accent-mint uppercase tracking-[0.15em]">
                  Preview Data
                </span>
              </div>

              {/* USER AVATAR */}
              <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-accent-indigo to-accent-purple shadow-xl group/avatar cursor-pointer transition-transform duration-700 hover:scale-115">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#0B0F19]">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80"
                    alt="User"
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover/avatar:grayscale-0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* DASHBOARD CONTENT */}
          <div className="p-10 md:p-12 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8">

            {/* LEFT PRIMARY CARD */}
            <div
              onClick={() => navigate({ to: '/signup' })}
              className="group h-[445px] rounded-3xl glass border border-white/10
              flex flex-col items-center justify-center text-center p-8
              transition-all duration-500 ease-out
              hover:translate-y-[-4px]
              hover:border-accent-indigo/40
              hover:shadow-[0_0_60px_-10px_rgba(93,95,239,0.35)]"
            >
              {/* 🔹 CIRCLE WITH CURSOR POINTER */}
              <div
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-accent-indigo to-accent-purple
                flex items-center justify-center mb-8 shadow-2xl
                cursor-pointer
                transition-all duration-500 ease-out
                group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(93,95,239,0.6)]"
              >
                <Plus className="w-10 h-10 text-white" />
              </div>

              <h3 className="text-3xl font-display font-bold text-white mb-3">
                New Proposal
              </h3>

              <p className="text-gray-400 text-[15px] leading-relaxed max-w-[260px] mb-10">
                Generate a client-ready proposal<br /> in under 2 minutes
              </p>

              <button className="inline-flex items-center gap-3 px-12 py-4 rounded-full
                border border-white/10 bg-white/5 text-accent-indigo
                font-bold text-[13px] uppercase tracking-[0.25em]
                transition-all duration-300 ease-out
                hover:bg-white/10 hover:text-white hover:translate-y-[-2px]">
                Launch Wizard <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* RIGHT SIDE CARDS */}
            <div className="flex flex-col gap-8">

              {/* PRICING */}
              <div className="glass border border-white/5 rounded-3xl p-8
                transition-all duration-500 ease-out
                hover:translate-y-[-3px]
                hover:border-accent-mint/40
                hover:shadow-[0_0_40px_rgba(110,231,183,0.15)]">
                <div className="w-12 h-12 rounded-2xl bg-accent-mint/10 flex items-center justify-center mb-6
                  transition-transform duration-300 ease-out hover:scale-110">
                  <Calculator className="w-6 h-6 text-accent-mint" />
                </div>
                <h4 className="text-[19px] font-bold text-white mb-2">
                  Smart Pricing Engine
                </h4>
                <p className="text-[15px] text-gray-500">
                  Automatically calculates pricing based on scope and location.
                </p>
              </div>

              {/* TEMPLATES */}
              <div className="glass border border-white/5 rounded-3xl p-8
                transition-all duration-500 ease-out
                hover:translate-y-[-3px]
                hover:border-accent-purple/40
                hover:shadow-[0_0_40px_rgba(167,139,250,0.15)]">
                <div className="w-12 h-12 rounded-2xl bg-accent-purple/10 flex items-center justify-center mb-6
                  transition-transform duration-300 ease-out hover:scale-110">
                  <Layers className="w-6 h-6 text-accent-purple" />
                </div>
                <h4 className="text-[19px] font-bold text-white mb-2">
                  Expert Templates
                </h4>
                <p className="text-[15px] text-gray-500 mb-4">
                  Marketing • Design • Tech • Creative
                </p>
                <span className="text-[10px] uppercase font-bold text-accent-purple">
                  50+ templates unlock after signup
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* TRUST + REASSURANCE */}
        <div className="mt-14 flex flex-col items-center gap-3">
          <p className="text-sm md:text-lg text-gray-500 flex items-center gap-2">
            <ShieldCheck
              size={16}
              className="text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.6)]"
            />
            Everything unlocks after signup — no setup required
          </p>

          {/* REASSURANCE LINK */}
          <button
            onClick={() => navigate({ to: '/features' })}
            className="
              text-sm md:text-lg
              text-gray-400/60
              transition-all duration-300 ease-out
              hover:text-gray-400
              hover:translate-x-1
            "
          >
            Explore a sample proposal →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;