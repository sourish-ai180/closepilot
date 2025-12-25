import React, { useState, useEffect } from 'react';
import { 
  Layout, Plus, FileText, BarChart, PieChart, Settings, Search, Bell, ChevronRight, 
  MoreHorizontal, Megaphone, Image, Code, Video, Sparkles, ArrowRight, Clock, 
  MoreVertical, Edit3, Copy, Download, LogOut, Lock, Wand2, Send, ArrowLeft, Calendar, 
  DollarSign, Gavel, Trash2, GripVertical, PlusCircle, CreditCard, ShieldCheck, History, ExternalLink, Loader2, Palette, CheckCircle2,
  Briefcase, Star, Eye, MousePointer2, Share2, Printer, CheckCircle, AlertCircle, Rocket, Target, Zap, Filter, User, Shield, Calculator, Globe, TrendingUp, Users,
  Layers, Lightbulb, FilePlus, ZapOff, PlayCircle, Upload, Save, Check, Info, Phone, Mail, Link as LinkIcon, Camera, BellRing, Smartphone
} from 'lucide-react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { GoogleGenAI, Type } from "@google/genai";

// --- TYPES & INTERFACES ---

interface DashboardProps {
  onBack: () => void;
}

type DashboardTab = 
  | 'dashboard' 
  | 'new-proposal' 
  | 'templates' 
  | 'saved' 
  | 'analytics' 
  | 'settings' 
  | 'wizard' 
  | 'billing' 
  | 'proposal-view'
  | 'pricing-engine'
  | 'brand-sync';

type ContentBlockId = 'summary' | 'visuals' | 'strategy' | 'pricing' | 'terms';

interface ProposalData {
  id: string;
  title: string;
  client: string;
  value: string;
  status: 'Sent' | 'Draft' | 'Accepted';
  time: string;
  category: string;
}

interface TemplateConfig {
  id: string;
  label: string;
  cat: string;
  icon: any;
  color: string;
  bg: string;
  description: string;
  fields: { name: string; label: string; placeholder: string; type: 'text' | 'textarea' | 'select'; options?: string[] }[];
}

// --- CONSTANTS ---

const TEMPLATE_MAP: Record<string, TemplateConfig> = {
  'social-media': {
    id: 'social-media',
    label: 'Social Media',
    cat: 'Marketing',
    icon: Megaphone,
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    description: 'Grow your client\'s online presence with a data-driven content strategy.',
    fields: [
      { name: 'platform', label: 'Platforms', type: 'select', options: ['Instagram', 'LinkedIn', 'TikTok', 'Multi-channel'], placeholder: 'Select' },
      { name: 'goal', label: 'Campaign Goal', type: 'text', placeholder: 'e.g. Brand Awareness, Lead Gen' },
      { name: 'tone', label: 'Brand Voice', type: 'text', placeholder: 'e.g. Professional, Witty, Bold' },
      { name: 'budget', label: 'Ad Spend Estimate', type: 'text', placeholder: 'e.g. $2k - $5k / month' }
    ]
  },
  'branding': {
    id: 'branding',
    label: 'Branding',
    cat: 'Design',
    icon: Image,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    description: 'Establish a unique identity through visual storytelling and logo design.',
    fields: [
      { name: 'style', label: 'Visual Style', type: 'select', options: ['Minimalist', 'Corporate', 'Playful', 'Luxury'], placeholder: 'Select' },
      { name: 'deliverables', label: 'Main Deliverables', type: 'textarea', placeholder: 'Logo, Brand Guidelines, Typography...' },
      { name: 'audience', label: 'Target Audience', type: 'text', placeholder: 'e.g. Tech Founders, Gen Z' }
    ]
  },
  'web-dev': {
    id: 'web-dev',
    label: 'Web Dev',
    cat: 'Tech',
    icon: Code,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    description: 'Build high-performance web applications with modern tech stacks.',
    fields: [
      { name: 'platform', label: 'Tech Stack', type: 'select', options: ['React/Next.js', 'WordPress', 'Shopify', 'Webflow'], placeholder: 'Select' },
      { name: 'pages', label: 'Number of Pages', type: 'text', placeholder: 'e.g. 5-10 pages' },
      { name: 'features', label: 'Custom Features', type: 'textarea', placeholder: 'E-commerce, User Auth, CMS Integration...' }
    ]
  },
  'video': {
    id: 'video',
    label: 'Video',
    cat: 'Creative',
    icon: Video,
    color: 'text-pink-400',
    bg: 'bg-pink-400/10',
    description: 'Tell compelling stories with high-quality video production.',
    fields: [
      { name: 'type', label: 'Video Type', type: 'select', options: ['Explainer', 'Short-form Social', 'Brand Doc', 'Commercial'], placeholder: 'Select' },
      { name: 'duration', label: 'Expected Duration', type: 'text', placeholder: 'e.g. 60-90 seconds' },
      { name: 'style', label: 'Video Style', type: 'text', placeholder: 'e.g. Animated, Live Action' }
    ]
  },
  'consulting': {
    id: 'consulting',
    label: 'Consulting',
    cat: 'Ops',
    icon: Briefcase,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    description: 'Optimize business operations and strategic growth frameworks.',
    fields: [
      { name: 'focus', label: 'Focus Area', type: 'select', options: ['Operations', 'Sales Funnel', 'HR/Hiring', 'Scale Strategy'], placeholder: 'Select' },
      { name: 'duration', label: 'Engagement length', type: 'text', placeholder: 'e.g. 3 Months Retainer' },
      { name: 'outcome', label: 'Desired Outcome', type: 'textarea', placeholder: 'What does success look like?' }
    ]
  },
  'custom': {
    id: 'custom',
    label: 'Custom',
    cat: 'New',
    icon: Star,
    color: 'text-indigo-400',
    bg: 'bg-indigo-400/10',
    description: 'Generate a proposal for any unique service or industry.',
    fields: [
      { name: 'prompt', label: 'Detailed Description', type: 'textarea', placeholder: 'Describe the project scope, client, and deliverables in detail...' }
    ]
  }
};

// --- UTILITY COMPONENTS ---

const SidebarLink = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 border group ${
      active 
        ? 'bg-accent-indigo text-white border-accent-indigo shadow-lg shadow-accent-indigo/20' 
        : 'border-transparent text-gray-500 hover:text-white hover:bg-white/[0.05] hover:border-white/10'
    }`}
  >
    <Icon size={18} className={`transition-all duration-300 ${active ? 'text-white' : 'group-hover:text-accent-indigo'}`} />
    <span className={`text-[13px] font-medium`}>{label}</span>
  </button>
);

const StatCard = ({ label, value, icon: Icon, color }: any) => (
  <div className="rounded-2xl border border-white/5 bg-[#13161F] p-6 hover:border-white/20 hover:bg-white/[0.03] transition-all duration-300 group cursor-default">
    <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${color}`}>
      <Icon size={20} />
    </div>
    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-2xl font-black">{value}</p>
  </div>
);

const InputBlock = ({ label, defaultValue, placeholder, type = 'text', value, onChange, icon: Icon }: any) => (
  <div className="space-y-2 group">
    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1 transition-colors duration-300 group-focus-within:text-accent-indigo">{label}</label>
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-accent-indigo transition-colors" size={16} />}
      <input 
        type={type}
        defaultValue={defaultValue}
        value={value}
        onChange={(e) => onChange ? onChange(e.target.value) : null}
        placeholder={placeholder}
        className={`w-full bg-[#13161F] border border-white/5 rounded-xl ${Icon ? 'pl-11' : 'px-4'} py-3 text-sm text-white focus:outline-none focus:border-accent-indigo/50 focus:ring-1 focus:ring-accent-indigo/20 transition-all duration-300 placeholder:text-gray-700 hover:border-white/10`}
      />
    </div>
  </div>
);

const ActivityRow = ({ title, client, value, status, time, onView }: any) => (
  <tr 
    onClick={onView}
    className="group hover:bg-white/[0.02] transition-all duration-300 cursor-pointer border-b border-white/5 last:border-0"
  >
    <td className="px-8 py-5">
      <div className="flex flex-col">
        <span className="font-bold text-white group-hover:text-accent-indigo transition-colors duration-300">{title}</span>
        <span className="text-[10px] text-gray-500 mt-0.5">{time}</span>
      </div>
    </td>
    <td className="px-8 py-5 text-gray-400 font-medium">{client}</td>
    <td className="px-8 py-5 font-bold text-white">{value}</td>
    <td className="px-8 py-5">
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
        status === 'Accepted' ? 'text-accent-mint border-accent-mint/30 bg-accent-mint/5' :
        status === 'Sent' ? 'text-blue-400 border-blue-400/30 bg-blue-400/5' :
        'text-gray-500 border-white/10 bg-white/5'
      }`}>
        {status}
      </span>
    </td>
    <td className="px-8 py-5 text-right">
      <div className="flex justify-end gap-2">
        <button className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all duration-300">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </td>
  </tr>
);

const CreationCard = ({ icon: Icon, title, desc, btnText, color, btnColor, onClick }: any) => (
  <div 
    onClick={onClick}
    className={`p-10 rounded-3xl bg-[#13161F] border border-white/5 hover:border-${color}/50 transition-all duration-300 ease-in-out cursor-pointer group relative overflow-hidden`}
  >
    <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}/5 blur-3xl -mr-16 -mt-16 group-hover:bg-${color}/10 transition-all duration-500`} />
    <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-gray-400 group-hover:scale-110 transition-transform duration-300 group-hover:text-white group-hover:border-white/20`}>
      <Icon size={28} />
    </div>
    <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors duration-300">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed mb-10">{desc}</p>
    <button className={`px-6 py-3 rounded-xl ${btnColor || 'bg-accent-indigo'} text-white font-bold text-xs shadow-lg flex items-center gap-2 transition-all duration-300 border border-white/5 hover:border-white/20 group-hover:scale-105 group-hover:shadow-${color}/20`}>
      {btnText} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
    </button>
  </div>
);

const StarterMission = ({ icon: Icon, title, desc, btnText, color, bg, onClick }: any) => (
  <div className={`p-10 ${bg} hover:bg-white/[0.02] transition-all duration-300 ease-in-out group flex flex-col items-center text-center cursor-pointer`}>
    <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 ease-in-out ${color} group-hover:border-white/20`}>
      <Icon size={28} />
    </div>
    <h4 className="font-bold text-lg mb-3 group-hover:text-white transition-colors duration-300">{title}</h4>
    <p className="text-sm text-gray-500 mb-8 max-w-[200px] group-hover:text-gray-400">{desc}</p>
    <button 
      onClick={onClick}
      className={`px-6 py-2.5 rounded-xl bg-white text-navy-900 font-bold text-xs hover:bg-gray-200 transition-all duration-300 shadow-xl`}
    >
      {btnText}
    </button>
  </div>
);

const TemplateItem = ({ icon: Icon, label, cat, color, bg, onClick }: any) => (
  <div 
    onClick={onClick}
    className="group p-4 rounded-xl border border-white/5 bg-[#13161F] hover:bg-white/[0.06] hover:border-accent-indigo/30 transition-all duration-300 ease-in-out cursor-pointer shadow-lg hover:shadow-accent-indigo/5"
  >
    <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-all duration-300 ease-in-out`}>
      <Icon size={16} className={`${color}`} />
    </div>
    <div className={`text-[9px] font-bold uppercase tracking-widest mb-1 ${color}`}>{cat}</div>
    <h4 className="text-[11px] font-bold text-gray-300 group-hover:text-white mb-2">{label}</h4>
  </div>
);

const BlockLink = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ease-in-out ${active ? 'bg-accent-indigo/10 text-white border border-accent-indigo/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
    <Icon size={16} className={`transition-transform duration-300 ${active ? 'text-accent-indigo scale-110' : 'group-hover:scale-110'}`} />
    <span className="text-xs font-medium">{label}</span>
  </button>
);

const SettingsSubLink = ({ active, label, icon: Icon, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ease-in-out ${active ? 'bg-accent-indigo text-white shadow-lg shadow-accent-indigo/10' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
  >
    <Icon size={18} /> {label}
  </button>
);

const EngineRow = ({ label, sub, value, unit }: any) => (
  <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-white/20 transition-all duration-300">
    <div className="max-w-[200px]">
      <p className="text-sm font-bold text-white mb-1 group-hover:text-accent-indigo">{label}</p>
      <p className="text-[10px] text-gray-600">{sub}</p>
    </div>
    <div className="flex items-center gap-2">
       <input type="number" defaultValue={value} className="w-20 bg-transparent border-b border-white/10 py-1 text-right text-sm font-bold focus:outline-none focus:border-accent-indigo transition-all duration-300" />
       <span className="text-gray-500 text-sm">{unit}</span>
    </div>
  </div>
);

// --- VIEW COMPONENTS ---

const PricingEngineView = ({ onBack }: { onBack: () => void }) => {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      onBack();
    }, 800);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto animate-slide-up space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2.5 hover:bg-white/5 rounded-xl text-gray-400 transition-all duration-300 hover:text-white hover:scale-110"><ArrowLeft /></button>
          <div>
            <h2 className="text-3xl font-bold">Smart Pricing Engine</h2>
            <p className="text-gray-500 text-sm mt-1">Define your business fundamentals to automate profitable quotes.</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-indigo text-white font-bold text-sm shadow-xl shadow-accent-indigo/10 transition-all duration-300 hover:scale-105 hover:bg-accent-indigo/90"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <><Save size={18} /> Save Parameters</>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-8 rounded-3xl border border-white/5 space-y-8">
            <h3 className="text-xl font-bold flex items-center gap-2 text-white"><Calculator className="text-accent-indigo" /> Global Labor Rates</h3>
            <div className="space-y-6">
              <EngineRow label="Senior Lead Rate" sub="Standard hourly for high-level strategy." value="250" unit="$" />
              <EngineRow label="Standard Execution" sub="Day-to-day project management & delivery." value="150" unit="$" />
              <EngineRow label="Junior Support" sub="Lower-tier repetitive tasks or assistance." value="85" unit="$" />
            </div>
          </div>

          <div className="glass p-8 rounded-3xl border border-white/5 space-y-8">
            <h3 className="text-xl font-bold flex items-center gap-2 text-white"><Target className="text-accent-purple" /> Margin & Risk</h3>
            <div className="space-y-6">
              <EngineRow label="Net Profit Target" sub="Minimum margin the AI will optimize for." value="35" unit="%" />
              <EngineRow label="Contingency Buffer" sub="Safety margin for scope creep or delays." value="15" unit="%" />
              <EngineRow label="Sales Commission" sub="Internal cost allocated for lead acquisition." value="10" unit="%" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-accent-indigo/10 to-accent-purple/10 border border-accent-indigo/20">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2"><Sparkles size={18} className="text-accent-indigo" /> AI Optimization</h4>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              These values are used to calculate the <span className="text-white font-bold">Smart Quote</span> in the proposal wizard. 
              The AI will automatically suggest the best pricing tier based on your targets.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[11px] text-gray-500 font-bold uppercase"><Check size={14} className="text-accent-mint" /> Automated ROI logic</div>
              <div className="flex items-center gap-2 text-[11px] text-gray-500 font-bold uppercase"><Check size={14} className="text-accent-mint" /> Scalable volume discounts</div>
              <div className="flex items-center gap-2 text-[11px] text-gray-500 font-bold uppercase"><Check size={14} className="text-accent-mint" /> Regional cost adjustment</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BrandSyncView = ({ onBack }: { onBack: () => void }) => {
  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      onBack();
    }, 1000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto animate-slide-up space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2.5 hover:bg-white/5 rounded-xl text-gray-400 transition-all duration-300 hover:text-white hover:scale-110"><ArrowLeft /></button>
          <div>
            <h2 className="text-3xl font-bold">Brand Sync</h2>
            <p className="text-gray-500 text-sm mt-1">Upload your identity to automatically brand every proposal.</p>
          </div>
        </div>
        <button 
          onClick={handleSync}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-mint text-navy-900 font-bold text-sm shadow-xl shadow-accent-mint/20 transition-all duration-300 hover:scale-105 hover:bg-accent-mint/90"
        >
          {syncing ? <Loader2 size={18} className="animate-spin" /> : <><Zap size={18} /> Sync Brand Assets</>}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              Primary Logo <Info size={14} className="opacity-50" />
            </h3>
            <div className="h-56 rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-gray-600 hover:border-accent-indigo/40 hover:bg-white/[0.01] hover:text-gray-400 transition-all duration-300 cursor-pointer group bg-[#13161F]">
              <Upload size={40} className="mb-4 group-hover:scale-110 group-hover:text-accent-indigo transition-all duration-300" />
              <span className="text-sm font-bold">Drop High-Res Logo (SVG/PNG)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BillingView = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="p-8 max-w-5xl mx-auto animate-slide-up space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2.5 hover:bg-white/5 rounded-xl text-gray-400 transition-all duration-300 hover:text-white hover:scale-110">
            <ArrowLeft />
          </button>
          <div>
            <h2 className="text-3xl font-bold">Billing & Subscription</h2>
            <p className="text-gray-500 text-sm mt-1">Manage your plan, payment methods, and billing history.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-8 rounded-3xl border border-white/5 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                <ShieldCheck className="text-accent-mint" /> Current Plan
              </h3>
              <span className="px-3 py-1 rounded-full bg-accent-indigo/10 border border-accent-indigo/20 text-accent-indigo text-[10px] font-bold uppercase tracking-widest">
                Active
              </span>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-2xl font-black text-white">Pro Plan</p>
                <p className="text-sm text-gray-500 mt-1">$29.00 per month</p>
              </div>
              <button className="px-6 py-2.5 rounded-xl bg-white text-navy-900 font-bold text-xs hover:bg-gray-200 transition-all duration-300">
                Upgrade Plan
              </button>
            </div>

            <div className="space-y-4 pt-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Features included in your plan:</p>
              <div className="grid grid-cols-2 gap-3">
                {['Unlimited AI Proposals', 'Smart Pricing Engine', 'Priority Support', 'Custom Branding'].map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-400">
                    <CheckCircle size={14} className="text-accent-mint" /> {f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass p-8 rounded-3xl border border-white/5 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2 text-white">
              <CreditCard className="text-accent-indigo" /> Payment Method
            </h3>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:border-white/10 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-navy-900 rounded border border-white/10 flex items-center justify-center font-bold text-[10px] tracking-tighter">VISA</div>
                <div>
                  <p className="text-sm font-bold text-white">•••• •••• •••• 4242</p>
                  <p className="text-[10px] text-gray-500 uppercase">Expires 12/28</p>
                </div>
              </div>
              <button className="text-xs font-bold text-accent-indigo hover:text-accent-mint transition-colors">Update</button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-8 rounded-3xl border border-white/5">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Billing History</h3>
            <div className="space-y-4">
              {[
                { date: 'Oct 15, 2025', amount: '$29.00' },
                { date: 'Sep 15, 2025', amount: '$29.00' },
                { date: 'Aug 15, 2025', amount: '$29.00' }
              ].map((inv, i) => (
                <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-white/5 last:border-0">
                  <span className="text-gray-400">{inv.date}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-white">{inv.amount}</span>
                    <button className="text-gray-600 hover:text-white transition-colors"><Download size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-400 hover:bg-white/10 hover:text-white transition-all">
              View All Invoices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewProposalView = ({ onNavigate, onUseTemplate }: any) => {
  return (
    <div className="p-8 max-w-6xl mx-auto animate-slide-up space-y-12">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold mb-2">Create New Proposal</h2>
          <p className="text-gray-500 text-sm">How would you like to start your next deal?</p>
        </div>
        <button 
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all duration-300 ease-in-out"
        >
          Cancel <ZapOff size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CreationCard 
          icon={Wand2} 
          title="AI Wizard" 
          desc="The fastest way to close. Answer a few questions and our AI will generate a tailored, high-converting proposal for you."
          btnText="Launch AI Wizard"
          btnColor="bg-[#3f41a4]"
          color="accent-indigo"
          onClick={() => onNavigate('templates')}
        />
        <CreationCard 
          icon={FilePlus} 
          title="Start from Scratch" 
          desc="Full creative control. Build your proposal block by block using our expert elements and pricing engine."
          btnText="Open Editor"
          btnColor="bg-[#2d7a5f]"
          color="accent-mint"
          onClick={() => onUseTemplate('custom')}
        />
      </div>

      <div className="p-10 rounded-3xl bg-white/[0.01] border border-white/5 flex flex-col items-center text-center transition-all duration-300 hover:border-white/10 hover:bg-white/[0.02]">
         <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 text-gray-600">
            <Lightbulb size={24} />
         </div>
         <h4 className="font-bold text-white mb-2">Need a different approach?</h4>
         <p className="text-sm text-gray-500 max-w-md mb-8">You can also import existing PDF proposals to analyze them or convert them into reusable blocks.</p>
         <button className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 font-bold text-sm hover:bg-white/10 transition-all duration-300 shadow-xl group">
            Launch Action: Import PDF
         </button>
      </div>
    </div>
  );
};

const SavedProposalsView = ({ proposals, onView, onNew }: any) => (
  <div className="p-8 max-w-6xl mx-auto animate-slide-up">
    <div className="flex justify-between items-center mb-10">
      <div>
        <h2 className="text-3xl font-bold mb-2">Saved Proposals</h2>
        <p className="text-gray-500 text-sm">Manage your archive of sent and draft proposals.</p>
      </div>
      <button onClick={onNew} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-indigo text-white font-bold text-sm hover:shadow-xl hover:shadow-accent-indigo/10 transition-all duration-300 hover:scale-[1.02]">
        <Plus size={18} /> Launch Action: Create New
      </button>
    </div>

    {proposals.length > 0 ? (
      <div className="rounded-3xl border border-white/5 bg-[#13161F] overflow-hidden transition-all duration-300 shadow-2xl">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] text-gray-500 uppercase tracking-widest border-b border-white/5 bg-white/[0.01]">
              <th className="px-8 py-5">Project Name</th>
              <th className="px-8 py-5">Client</th>
              <th className="px-8 py-5">Value</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {proposals.map((p: any) => (
              <ActivityRow key={p.id} title={p.title} client={p.client} value={p.value} status={p.status} time={p.time} onView={() => onView(p)} />
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-gray-600 transition-all duration-300 hover:scale-110 hover:border-accent-indigo/30">
           <FileText size={40} />
        </div>
        <h3 className="text-xl font-bold mb-2">No proposals yet</h3>
        <button onClick={onNew} className="px-8 py-3 rounded-xl bg-white text-navy-900 font-bold hover:bg-gray-200 transition-all duration-300 shadow-xl hover:scale-105">Launch Action: Create First Draft</button>
      </div>
    )}
  </div>
);

const TemplatesLibraryView = ({ onUseTemplate }: any) => {
  const categories = ["All", "Marketing", "Design", "Tech", "Creative", "Ops", "New"];
  const [activeCat, setActiveCat] = useState("All");

  return (
    <div className="p-8 max-w-7xl mx-auto animate-slide-up">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-2">Proposal Library</h2>
          <p className="text-gray-500 text-sm">Choose from high-converting structures verified by industry experts.</p>
        </div>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 border ${activeCat === cat ? 'bg-accent-indigo border-accent-indigo text-white shadow-lg shadow-accent-indigo/10' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/10 hover:text-gray-300'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(TEMPLATE_MAP)
          .filter(t => activeCat === "All" || t.cat === activeCat)
          .map(t => (
          <div key={t.id} className="glass p-8 rounded-3xl border border-white/5 hover:border-accent-indigo/30 hover:bg-white/[0.04] transition-all duration-300 ease-in-out group flex flex-col justify-between">
            <div>
              <div className={`w-12 h-12 rounded-2xl ${t.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${t.color}`}>
                <t.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors duration-300">{t.label}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-8">{t.description}</p>
            </div>
            <button 
              onClick={() => onUseTemplate(t.id)}
              className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-accent-indigo hover:text-white hover:border-accent-indigo transition-all duration-300"
            >
              Use this template
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const AnalyticsDashboardView = ({ proposals, onNew }: any) => {
  const hasData = proposals.length > 0;

  return (
    <div className="p-8 max-w-6xl mx-auto animate-slide-up space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold mb-2">Performance Analytics</h2>
          <p className="text-gray-500 text-sm">Real-time data on how clients interact with your proposals.</p>
        </div>
        {hasData && (
          <button className="px-5 py-2.5 bg-accent-indigo text-white font-bold text-xs rounded-xl shadow-lg shadow-accent-indigo/10 transition-all duration-300 hover:scale-105 hover:bg-accent-indigo/90">
            Launch Action: Export PDF Report
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Sent Proposals" value={proposals.length} icon={Send} color="text-blue-400" />
        <StatCard label="Total Views" value={hasData ? "48" : "0"} icon={Eye} color="text-purple-400" />
        <StatCard label="Avg. Close Rate" value={hasData ? "33%" : "0%"} icon={TrendingUp} color="text-accent-mint" />
        <StatCard label="Est. Revenue" value={hasData ? "$42,500" : "$0"} icon={DollarSign} color="text-orange-400" />
      </div>

      {!hasData ? (
        <div className="glass p-16 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center space-y-8 min-h-[400px]">
          <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center relative group">
            <BarChart className="w-12 h-12 text-gray-700 transition-all duration-500 group-hover:scale-110 group-hover:text-accent-indigo" />
            <div className="absolute inset-0 bg-accent-indigo/5 rounded-3xl animate-pulse blur-xl" />
          </div>
          <div className="max-w-md">
            <h3 className="text-2xl font-bold mb-3">Your analytics engine is warming up</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              We'll start tracking engagement metrics, view duration, and closing statistics as soon as you launch your first proposal. Ready to start?
            </p>
          </div>
          <button 
            onClick={onNew}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent-indigo text-white font-bold text-sm shadow-xl shadow-accent-indigo/20 transition-all duration-300 hover:scale-105 hover:bg-accent-indigo/90"
          >
            <PlusCircle size={18} /> Launch Action: Create Your First Proposal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="glass p-8 rounded-3xl border border-white/5 h-80 flex flex-col justify-between">
             <h4 className="font-bold text-sm text-gray-400 uppercase tracking-widest">Proposal Views (30 Days)</h4>
             <div className="flex-1 flex items-center justify-center opacity-20">
               <TrendingUp className="w-20 h-20 text-accent-indigo" />
             </div>
           </div>
           <div className="glass p-8 rounded-3xl border border-white/5 h-80 flex flex-col justify-between">
             <h4 className="font-bold text-sm text-gray-400 uppercase tracking-widest">Win Rate Progression</h4>
             <div className="flex-1 flex items-center justify-center opacity-20">
               <PieChart className="w-20 h-20 text-accent-mint" />
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

const SettingsPanel = ({ onManageBilling }: any) => {
  const [activeSubTab, setActiveSubTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1200);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto animate-slide-up pb-20">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-2">Account Settings</h2>
          <p className="text-gray-500 text-sm">Configure your personal and business presence on ClosePilot.</p>
        </div>
        <button 
          onClick={handleSave}
          className="px-6 py-3 rounded-xl bg-accent-indigo text-white font-bold text-sm shadow-xl shadow-accent-indigo/10 transition-all duration-300 hover:scale-105 hover:bg-accent-indigo/90 flex items-center gap-2"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <><Save size={16} /> Save All Changes</>}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="w-full lg:w-72 shrink-0 space-y-1">
          <SettingsSubLink active={activeSubTab === 'profile'} label="Personal Profile" icon={User} onClick={() => setActiveSubTab('profile')} />
          <SettingsSubLink active={activeSubTab === 'brand'} label="Brand & Logos" icon={Palette} onClick={() => setActiveSubTab('brand')} />
          <SettingsSubLink active={activeSubTab === 'engine'} label="Pricing Engine" icon={Calculator} onClick={() => setActiveSubTab('engine')} />
          <SettingsSubLink active={activeSubTab === 'security'} label="Security" icon={Shield} onClick={() => setActiveSubTab('security')} />
          <SettingsSubLink active={activeSubTab === 'notifications'} label="Notifications" icon={BellRing} onClick={() => setActiveSubTab('notifications')} />
          
          <div className="pt-6 mt-6 border-t border-white/5 px-4">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-4">Support</p>
            <button className="flex items-center gap-3 text-sm text-gray-500 hover:text-white transition-colors py-2"><Info size={16} /> Help Center</button>
            <button className="flex items-center gap-3 text-sm text-gray-500 hover:text-white transition-colors py-2"><ExternalLink size={16} /> API Documentation</button>
          </div>
        </aside>

        <div className="flex-1 space-y-8 transition-all duration-300">
          {activeSubTab === 'profile' && (
            <div className="space-y-8 animate-slide-up">
               <div className="glass p-8 rounded-3xl border border-white/5 space-y-8">
                  <div className="flex items-center gap-8">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-accent-indigo/50">
                        <img 
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80" 
                          alt="Avatar" 
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Camera className="text-white" size={24} />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">Public Profile</h3>
                      <p className="text-sm text-gray-500">This information will be displayed on your generated proposals.</p>
                      <button className="text-xs font-bold text-accent-indigo hover:text-accent-mint transition-colors mt-2">Change Avatar Image</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputBlock label="Full Name" defaultValue="Rick Kundu" icon={User} />
                    <InputBlock label="Email Address" defaultValue="rickkundu@example.com" icon={Mail} />
                    <InputBlock label="Job Title" defaultValue="Senior Product Designer" icon={Briefcase} />
                    <InputBlock label="Phone Number" defaultValue="+1 (555) 000-0000" icon={Phone} />
                  </div>
                  
                  <div className="space-y-2 group">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">Short Bio</label>
                    <textarea rows={4} className="w-full bg-[#13161F] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-indigo/50 focus:ring-1 focus:ring-accent-indigo/20 transition-all duration-300 placeholder:text-gray-700" defaultValue="Helping high-growth startups build scalable design systems and closing bigger deals with ClosePilot." />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">Social Presense</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputBlock label="LinkedIn" placeholder="linkedin.com/in/..." icon={LinkIcon} />
                      <InputBlock label="Portfolio / Website" placeholder="https://..." icon={Globe} />
                    </div>
                  </div>
               </div>
            </div>
          )}

          {activeSubTab === 'brand' && (
            <div className="space-y-8 animate-slide-up">
               <div className="glass p-8 rounded-3xl border border-white/5 space-y-10">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Visual Identity</h3>
                    <p className="text-sm text-gray-500">Customize the look of your exported PDFs and shared links.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Logo (Dark Background)</p>
                      <div className="h-40 rounded-2xl border-2 border-dashed border-white/5 bg-white/[0.01] flex flex-col items-center justify-center group hover:border-accent-indigo/40 transition-colors cursor-pointer">
                        <Upload size={24} className="text-gray-600 mb-2 group-hover:scale-110 group-hover:text-accent-indigo transition-all" />
                        <span className="text-[11px] font-bold text-gray-600 uppercase">SVG or PNG (Max 5MB)</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Logo (Light Background)</p>
                      <div className="h-40 rounded-2xl border-2 border-dashed border-white/5 bg-white flex flex-col items-center justify-center group hover:border-accent-indigo/40 transition-colors cursor-pointer shadow-xl">
                        <Upload size={24} className="text-gray-300 mb-2 group-hover:scale-110 group-hover:text-accent-indigo transition-all" />
                        <span className="text-[11px] font-bold text-gray-300 uppercase">SVG or PNG (Max 5MB)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Color Palette</p>
                    <div className="flex flex-wrap gap-6">
                      {['Primary', 'Secondary', 'Accent'].map((colorType) => (
                        <div key={colorType} className="space-y-3">
                          <div className="w-16 h-16 rounded-2xl bg-accent-indigo shadow-lg border border-white/10 cursor-pointer hover:scale-105 transition-transform" />
                          <p className="text-[10px] font-bold text-gray-500 text-center uppercase tracking-tighter">{colorType}</p>
                        </div>
                      ))}
                      <div className="flex flex-col justify-center gap-2">
                        <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2 border border-white/5">
                           <div className="w-4 h-4 rounded-full bg-accent-indigo" />
                           <span className="font-mono text-xs">#5D5FEF</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Typography Preference</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['Inter', 'Manrope', 'Plus Jakarta', 'Geist'].map(font => (
                        <button key={font} className={`py-3 rounded-xl border transition-all text-xs font-bold ${font === 'Inter' ? 'bg-accent-indigo/10 border-accent-indigo text-white' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'}`}>
                          {font}
                        </button>
                      ))}
                    </div>
                  </div>
               </div>
            </div>
          )}

          {activeSubTab === 'engine' && (
             <div className="space-y-8 animate-slide-up">
                <div className="glass p-8 rounded-3xl border border-white/5 space-y-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Global Pricing Parameters</h3>
                      <p className="text-sm text-gray-500">Standardize your profitability across all automated proposals.</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                      <span className="text-[10px] font-bold text-gray-600 uppercase">Currency:</span>
                      <span className="text-sm font-bold">USD ($)</span>
                      <ChevronRight size={14} className="text-gray-700" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Execution Roles (Hourly)</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <EngineRow label="Project Strategy" sub="High-level planning & discovery" value="250" unit="$" />
                      <EngineRow label="Creative Design" sub="Visual assets & branding" value="180" unit="$" />
                      <EngineRow label="Software Dev" sub="Frontend/Backend engineering" value="150" unit="$" />
                      <EngineRow label="Management" sub="Ops & project coordination" value="95" unit="$" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                    <div className="space-y-4">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Margin Config</p>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center bg-[#13161F] p-4 rounded-xl">
                          <span className="text-sm text-gray-400">Target Net Margin</span>
                          <span className="font-bold text-accent-mint">35%</span>
                        </div>
                        <div className="flex justify-between items-center bg-[#13161F] p-4 rounded-xl">
                          <span className="text-sm text-gray-400">Safety Buffer</span>
                          <span className="font-bold text-orange-400">15%</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tax & Legal</p>
                      <InputBlock label="Default VAT / Tax Rate" defaultValue="20" unit="%" />
                      <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-2">
                        <Info size={12} /> Automatically applied to line items.
                      </div>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={onManageBilling}
                  className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard size={18} /> Manage Subscription & Billing Details
                </button>
             </div>
          )}

          {activeSubTab === 'security' && (
            <div className="space-y-8 animate-slide-up">
              <div className="glass p-8 rounded-3xl border border-white/5 space-y-8">
                <h3 className="text-xl font-bold">Authentication & Security</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-6 bg-[#13161F] rounded-2xl border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent-indigo/10 flex items-center justify-center text-accent-indigo">
                        <Smartphone size={20} />
                      </div>
                      <div>
                        <p className="font-bold">Two-Factor Authentication</p>
                        <p className="text-xs text-gray-500">Secure your account with a mobile authenticator.</p>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-white/5 rounded-full relative cursor-pointer">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-gray-600 rounded-full" />
                    </div>
                  </div>

                  <div className="p-6 bg-[#13161F] rounded-2xl border border-white/5 space-y-6">
                    <p className="font-bold">Change Password</p>
                    <div className="space-y-4">
                      <InputBlock label="Current Password" type="password" placeholder="••••••••" />
                      <div className="grid grid-cols-2 gap-4">
                        <InputBlock label="New Password" type="password" placeholder="••••••••" />
                        <InputBlock label="Confirm New Password" type="password" placeholder="••••••••" />
                      </div>
                    </div>
                    <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all">Update Password</button>
                  </div>
                </div>

                <div className="pt-6 border-t border-red-500/10">
                   <h4 className="text-red-500 font-bold text-sm mb-4">Danger Zone</h4>
                   <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold hover:bg-red-500 hover:text-white transition-all">
                     <Trash2 size={16} /> Delete ClosePilot Account
                   </button>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'notifications' && (
            <div className="space-y-8 animate-slide-up">
              <div className="glass p-8 rounded-3xl border border-white/5 space-y-8">
                <h3 className="text-xl font-bold">Preferences</h3>
                <div className="space-y-6">
                   {[
                     { label: "Proposal Viewed", desc: "Get notified when a client opens your link.", icon: Eye },
                     { label: "Proposal Accepted", desc: "Instant alert when a client signs or accepts.", icon: CheckCircle2 },
                     { label: "Marketing Updates", desc: "Stay tuned for new AI features and templates.", icon: Zap }
                   ].map((pref, i) => (
                     <div key={i} className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500">
                           <pref.icon size={20} />
                         </div>
                         <div>
                           <p className="font-bold">{pref.label}</p>
                           <p className="text-xs text-gray-500">{pref.desc}</p>
                         </div>
                       </div>
                       <div className="w-12 h-6 bg-accent-indigo rounded-full relative cursor-pointer">
                         <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                       </div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DashboardHome = ({ proposals, onNavigate, onUseTemplate, onViewProposal }: { proposals: ProposalData[], onNavigate: (tab: DashboardTab) => void, onUseTemplate: (id: string) => void, onViewProposal: (p: ProposalData) => void }) => (
  <div className="p-8 space-y-8 animate-slide-up">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="rounded-2xl p-6 bg-[#13161F] border border-white/5 flex flex-col justify-between min-h-[200px] shadow-xl transition-all duration-300 hover:border-white/10">
        <div>
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">Dashboard Home 🏠</h2>
          <p className="text-[13px] text-gray-400 leading-relaxed max-w-[240px]">
            {proposals.length > 0 
              ? `You have ${proposals.length} active proposals gaining traction.`
              : "Ready to land your next big client?"}
          </p>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            Current Plan: <span className="text-white">PRO</span>
          </div>
          <button onClick={() => onNavigate('analytics')} className="text-[11px] font-bold text-accent-indigo flex items-center gap-1 hover:underline transition-all duration-300">
            View Analytics <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="rounded-2xl p-6 bg-[#13161F] border border-white/5 flex flex-col min-h-[200px] shadow-xl transition-all duration-300 hover:border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
            PERFORMANCE INSIGHTS <span className="w-1.5 h-1.5 rounded-full bg-accent-indigo animate-pulse shadow-[0_0_5px_#5D5FEF]"></span>
          </h3>
          <MoreHorizontal size={16} className="text-gray-600 hover:text-white cursor-pointer" />
        </div>
        <div className="flex flex-col items-center justify-center flex-1 text-center">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 transition-all duration-300 hover:scale-110 border border-transparent hover:border-white/10">
            <BarChart size={18} className="text-gray-600" />
          </div>
          <h4 className="text-[13px] font-bold text-white mb-1">Awaiting Data</h4>
        </div>
      </div>

      <div 
        onClick={() => onNavigate('new-proposal')}
        className="rounded-2xl p-6 bg-[#13161F]/40 border border-white/5 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-accent-indigo/50 hover:scale-[1.03] transition-all duration-300 shadow-xl"
      >
        <div className="w-12 h-12 rounded-full bg-accent-indigo flex items-center justify-center mb-4 shadow-lg shadow-accent-indigo/10 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-accent-indigo/15">
          <Plus size={24} className="text-white" />
        </div>
        <h3 className="text-lg font-bold text-white mb-1">New Proposal</h3>
      </div>
    </div>

    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <h3 className="text-base font-bold text-gray-300">Start from a Template</h3>
        <button onClick={() => onNavigate('templates')} className="text-[11px] font-bold text-gray-500 hover:text-accent-indigo transition-colors duration-300">View all</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.values(TEMPLATE_MAP).map(t => (
          <TemplateItem 
            key={t.id} 
            icon={t.icon} 
            label={t.label} 
            cat={t.cat} 
            color={t.color} 
            bg={t.bg} 
            onClick={() => onUseTemplate(t.id)}
          />
        ))}
      </div>
    </div>

    <div className="rounded-3xl border border-white/5 bg-[#13161F] overflow-hidden shadow-2xl transition-all duration-300 hover:border-white/10">
      <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
        <h3 className="font-bold text-[16px] flex items-center gap-2">
          Your Success Mission
          <span className="text-[10px] bg-accent-indigo/20 text-accent-indigo px-2 py-0.5 rounded-full uppercase tracking-tighter ml-2 animate-pulse font-black">ONBOARDING</span>
        </h3>
      </div>
      
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-x divide-white/5">
          <StarterMission 
            icon={Rocket} 
            title="First Proposal" 
            desc="Generate a professional draft in seconds."
            btnText="Launch Wizard"
            color="text-blue-400"
            bg="bg-blue-400/5"
            onClick={() => onNavigate('new-proposal')}
          />
          <StarterMission 
            icon={Target} 
            title="Smart Rates" 
            desc="Configure your pricing engine."
            btnText="Launch Engine"
            color="text-accent-indigo"
            bg="bg-accent-indigo/5"
            onClick={() => onNavigate('pricing-engine')}
          />
          <StarterMission 
            icon={Zap} 
            title="Brand Sync" 
            desc="Upload your branding assets."
            btnText="Launch Sync"
            color="text-accent-mint"
            bg="bg-accent-mint/5"
            onClick={() => onNavigate('brand-sync')}
          />
        </div>
      </div>
    </div>
  </div>
);

const ProposalDetailView = ({ proposal, onBack }: { proposal: ProposalData, onBack: () => void }) => {
  return (
    <div className="h-full flex flex-col animate-slide-up bg-[#0B0F19]">
      <div className="px-8 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-lg text-gray-400 transition-all duration-300 hover:text-white hover:scale-110">
            <ArrowLeft size={20} />
          </button>
          <h2 className="font-bold">{proposal.title}</h2>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/5 hover:bg-white/5 hover:border-white/20 text-sm font-bold text-gray-300 transition-all duration-300">
            <Download size={16} /> Export PDF
          </button>
          <button className="flex items-center gap-2 px-6 py-2 rounded-xl bg-accent-indigo text-white text-sm font-bold hover:shadow-lg hover:shadow-accent-indigo/10 transition-all duration-300 hover:scale-105">
            <Send size={16} /> Send to Client
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-12 flex justify-center bg-white/[0.01]">
        <div className="w-full max-w-3xl bg-white p-12 md:p-16 text-navy-900 shadow-2xl min-h-[1000px] rounded-sm transition-shadow duration-500 hover:shadow-accent-indigo/5">
          <header className="flex justify-between items-start mb-16">
             <div>
               <div className="w-12 h-12 rounded-lg bg-accent-indigo flex items-center justify-center mb-6 shadow-lg shadow-accent-indigo/20 transition-transform duration-500 hover:rotate-6">
                 <Sparkles size={24} className="text-white" />
               </div>
               <h1 className="text-4xl font-display font-extrabold tracking-tight mb-2">Proposal for {proposal.client}</h1>
               <p className="text-gray-500 text-sm font-medium">{proposal.category} Strategy & Execution • 2026</p>
             </div>
             <div className="text-right">
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Investment</p>
               <p className="text-2xl font-black text-navy-900">{proposal.value}</p>
               <div className="mt-4">
                 <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors duration-300 ${proposal.status === 'Sent' ? "text-blue-500 border-blue-100 bg-blue-50 hover:bg-blue-100" : "text-green-500 border-green-100 bg-green-50 hover:bg-green-100"}`}>
                   {proposal.status}
                 </span>
               </div>
             </div>
          </header>

          <section className="space-y-12">
            <div>
              <h2 className="text-xl font-bold text-accent-indigo border-b border-gray-100 pb-3 mb-6 uppercase tracking-wider">01. Executive Summary</h2>
              <p className="text-gray-700 leading-relaxed text-sm">
                Based on our initial discovery phase for the {proposal.category} needs of {proposal.client}, this proposal outlines a comprehensive strategy designed to maximize ROI through intelligent market positioning.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-accent-indigo border-b border-gray-100 pb-3 mb-6 uppercase tracking-wider">02. Scope of Work</h2>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start gap-3 group"><CheckCircle2 className="w-5 h-5 text-accent-indigo shrink-0 transition-transform duration-300 group-hover:scale-110" /> Full audit of existing digital assets and performance metrics.</li>
                <li className="flex items-start gap-3 group"><CheckCircle2 className="w-5 h-5 text-accent-indigo shrink-0 transition-transform duration-300 group-hover:scale-110" /> Execution of core deliverables as specified in the service agreement.</li>
                <li className="flex items-start gap-3 group"><CheckCircle2 className="w-5 h-5 text-accent-indigo shrink-0 transition-transform duration-300 group-hover:scale-110" /> Monthly reporting and optimization sessions.</li>
              </ul>
            </div>
            <div className="pt-8 border-t border-gray-100 flex justify-between items-center">
               <p className="text-[10px] text-gray-400 italic">Generated by ClosePilot Intelligence • March 2026</p>
               <div className="w-32 h-10 border-b border-gray-200 flex items-end justify-center text-[10px] text-gray-300 transition-colors duration-300 hover:border-accent-indigo/30 hover:text-gray-400 cursor-text">Client Signature</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const TemplateWizard = ({ config, onBack }: { config: TemplateConfig, onBack: () => void }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState<'input' | 'result'>('input');
  const [activeBlock, setActiveBlock] = useState<ContentBlockId>('summary');
  const [formData, setFormData] = useState<Record<string, string>>({ clientName: '' });

  const handleGenerate = async () => {
    if (!formData.clientName) return;
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Generate a professional proposal for "${formData.clientName}" in the category "${config.cat}". Details: ${JSON.stringify(formData)}`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              strategy: { type: Type.STRING },
              price: { type: Type.STRING },
              insight: { type: Type.STRING }
            },
            required: ["summary", "strategy", "price", "insight"]
          }
        }
      });
      const result = JSON.parse(response.text || '{}');
      setFormData(prev => ({
        ...prev,
        summary_content: result.summary,
        strategy_content: result.strategy,
        price: result.price,
        ai_insight: result.insight
      }));
      setStep('result');
    } catch (err) {
      console.error(err);
      setStep('result');
    } finally {
      setIsGenerating(false);
    }
  };

  if (step === 'result') {
    return (
      <div className="h-full flex flex-col animate-slide-up bg-[#0B0F19]">
        <div className="px-8 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
          <div className="flex items-center gap-4">
            <button onClick={() => setStep('input')} className="p-2 hover:bg-white/5 rounded-lg text-gray-400 transition-all duration-300 hover:text-white"><ArrowLeft size={20} /></button>
            <h2 className="font-bold">{formData.clientName} - {config.label} Proposal</h2>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-2 rounded-xl bg-accent-indigo text-white text-sm font-bold shadow-lg shadow-accent-indigo/20 transition-all duration-300 hover:scale-105">
              <Send size={16} /> Send to Client
            </button>
          </div>
        </div>
        <div className="flex-1 flex overflow-hidden">
          <aside className="w-80 border-r border-white/5 bg-[#0B0F19] p-6 space-y-6 overflow-y-auto custom-scrollbar">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Editor Blocks</h3>
            <div className="space-y-2">
              <BlockLink active={activeBlock === 'summary'} icon={Wand2} label="Executive Summary" onClick={() => setActiveBlock('summary')} />
              <BlockLink active={activeBlock === 'strategy'} icon={Calendar} label="Strategy" onClick={() => setActiveBlock('strategy')} />
              <BlockLink active={activeBlock === 'pricing'} icon={DollarSign} label="Pricing" onClick={() => setActiveBlock('pricing')} />
            </div>
            <div className="p-4 rounded-xl bg-accent-indigo/5 border border-accent-indigo/10 transition-all duration-300 hover:bg-accent-indigo/10">
              <p className="text-xs text-accent-indigo font-bold mb-2 flex items-center gap-2"><Sparkles size={14} className="animate-pulse" /> AI Copilot</p>
              <p className="text-[11px] text-gray-400 leading-relaxed">{formData.ai_insight || "I've optimized this section for high conversion."}</p>
            </div>
          </aside>
          <div className="flex-1 bg-white/[0.01] p-12 overflow-y-auto flex justify-center">
            <div className="w-full max-w-3xl bg-white p-12 md:p-16 text-navy-900 shadow-2xl min-h-[1000px] rounded-sm transition-all duration-500">
              <h1 className="text-4xl font-display font-extrabold mb-8">Proposal for {formData.clientName}</h1>
              <div className="space-y-10">
                <section>
                  <h2 className="text-xl font-bold text-accent-indigo border-b mb-4 pb-2">Summary</h2>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{formData.summary_content}</p>
                </section>
                <section>
                  <h2 className="text-xl font-bold text-accent-indigo border-b mb-4 pb-2">Strategy</h2>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{formData.strategy_content}</p>
                </section>
                <section>
                  <div className="p-8 bg-gray-50 rounded-2xl border flex justify-between items-center transition-all duration-300 hover:bg-gray-100 hover:border-gray-300">
                    <span className="font-bold uppercase text-gray-400 tracking-widest text-xs">Total Investment</span>
                    <span className="text-2xl font-black text-navy-900">{formData.price}</span>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto animate-slide-up">
      <div className="flex items-center gap-4 mb-12">
        <button onClick={onBack} className="p-2.5 hover:bg-white/5 rounded-xl text-gray-400 transition-all duration-300 hover:text-white hover:scale-110"><ArrowLeft /></button>
        <div>
          <h2 className="text-2xl font-bold">{config.label} Wizard</h2>
          <p className="text-sm text-gray-500 mt-1">{config.description}</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <InputBlock label="Client Name" placeholder="e.g. Acme Corp" value={formData.clientName} onChange={(v: string) => setFormData({...formData, clientName: v})} />
          {config.fields.map(f => (
            <div key={f.name} className="space-y-2 group">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1 transition-colors duration-300 group-focus-within:text-accent-indigo">{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea rows={4} className="w-full bg-[#13161F] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-indigo/50 focus:ring-1 focus:ring-accent-indigo/20 transition-all duration-300 placeholder:text-gray-600 hover:border-white/10" placeholder={f.placeholder} onChange={(e) => setFormData({...formData, [f.name]: e.target.value})} />
              ) : f.type === 'select' ? (
                <select className="w-full bg-[#13161F] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-indigo/50 focus:ring-1 focus:ring-accent-indigo/20 transition-all duration-300 cursor-pointer hover:border-white/10" onChange={(e) => setFormData({...formData, [f.name]: e.target.value})}>
                  <option value="">{f.placeholder}</option>
                  {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input type="text" className="w-full bg-[#13161F] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-indigo/50 focus:ring-1 focus:ring-accent-indigo/20 transition-all duration-300 placeholder:text-gray-600 hover:border-white/10" placeholder={f.placeholder} onChange={(e) => setFormData({...formData, [f.name]: e.target.value})} />
              )}
            </div>
          ))}
        </div>
        <div className="p-8 rounded-3xl bg-gradient-to-br from-accent-indigo/10 to-accent-mint/10 border border-accent-indigo/20 flex flex-col justify-between transition-all duration-500 hover:border-accent-indigo/40 hover:bg-opacity-20">
           <div>
             <h3 className="text-xl font-bold mb-3 flex items-center gap-2"><Wand2 className="text-accent-indigo animate-pulse" /> AI Generation</h3>
             <p className="text-sm text-gray-400 leading-relaxed">Our model will draft an industry-compliant proposal based on your inputs. You can refine everything in the next step.</p>
           </div>
           <button onClick={handleGenerate} disabled={isGenerating || !formData.clientName} className="w-full h-14 bg-accent-indigo rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-xl hover:shadow-accent-indigo/40 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
             {isGenerating ? <Loader2 className="animate-spin" /> : <>Generate Proposal <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" /></>}
           </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN DASHBOARD COMPONENT ---

const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [viewingProposal, setViewingProposal] = useState<ProposalData | null>(null);
  const [userName, setUserName] = useState('rickkundu22');
  const [proposals] = useState<ProposalData[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('closepilot_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.name) setUserName(user.name);
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('closepilot_user');
    onBack();
  };

  const handleUseTemplate = (id: string) => {
    setSelectedTemplateId(id);
    setActiveTab('wizard');
  };

  const handleViewProposal = (proposal: ProposalData) => {
    setViewingProposal(proposal);
    setActiveTab('proposal-view');
  };

  const renderContent = () => {
    const backToDash = () => setActiveTab('dashboard');
    
    switch (activeTab) {
      case 'dashboard': 
        return <DashboardHome proposals={proposals} onNavigate={setActiveTab} onUseTemplate={handleUseTemplate} onViewProposal={handleViewProposal} />;
      case 'new-proposal': 
        return <NewProposalView onNavigate={setActiveTab} onUseTemplate={handleUseTemplate} />;
      case 'wizard': 
        const config = selectedTemplateId ? TEMPLATE_MAP[selectedTemplateId] : TEMPLATE_MAP['custom'];
        return <TemplateWizard config={config} onBack={backToDash} />;
      case 'proposal-view': 
        return viewingProposal ? <ProposalDetailView proposal={viewingProposal} onBack={backToDash} /> : null;
      case 'templates': 
        return <TemplatesLibraryView onUseTemplate={handleUseTemplate} />;
      case 'saved': 
        return <SavedProposalsView proposals={proposals} onView={handleViewProposal} onNew={() => setActiveTab('new-proposal')} />;
      case 'analytics': 
        return <AnalyticsDashboardView proposals={proposals} onNew={() => setActiveTab('new-proposal')} />;
      case 'settings': 
        return <SettingsPanel onManageBilling={() => setActiveTab('billing')} />;
      case 'billing': 
        return <BillingView onBack={backToDash} />;
      case 'pricing-engine':
        return <PricingEngineView onBack={backToDash} />;
      case 'brand-sync':
        return <BrandSyncView onBack={backToDash} />;
      default: 
        return <DashboardHome proposals={proposals} onNavigate={setActiveTab} onUseTemplate={handleUseTemplate} onViewProposal={handleViewProposal} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans flex overflow-hidden selection:bg-accent-indigo selection:text-white">
      <aside className="w-64 hidden md:flex flex-col border-r border-white/5 bg-[#0B0F19] relative z-20">
        <div 
          className="h-20 flex items-center px-6 border-b border-white/5 gap-3 cursor-pointer group transition-all duration-500 hover:scale-105"
          onClick={onBack}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-indigo to-accent-mint flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white transition-colors duration-300 group-hover:text-accent-mint">
            ClosePilot
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <SidebarLink icon={Layout} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarLink icon={Plus} label="New Proposal" active={activeTab === 'new-proposal'} onClick={() => setActiveTab('new-proposal')} />
          <SidebarLink icon={FileText} label="Templates" active={activeTab === 'templates'} onClick={() => setActiveTab('templates')} />
          <SidebarLink icon={BarChart} label="Saved Proposals" active={activeTab === 'saved'} onClick={() => setActiveTab('saved')} />
          <SidebarLink icon={PieChart} label="Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
          <SidebarLink icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>

        <div className="p-4">
          <div className={`bg-[#13161F] rounded-xl p-4 border transition-all duration-300 ${activeTab === 'billing' ? 'border-accent-indigo bg-accent-indigo/5' : 'border-white/5'} mb-4`}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-white">Pro Plan</span>
              <span className="text-[10px] text-accent-indigo font-bold uppercase">Active</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#5D5FEF] w-full h-full rounded-full transition-all duration-500"></div>
            </div>
            <button 
              onClick={() => setActiveTab('billing')}
              className={`w-full mt-4 text-[11px] font-bold py-2 rounded-lg border transition-all duration-300 ${
                activeTab === 'billing' 
                ? 'bg-accent-indigo text-white border-accent-indigo shadow-[0_0_15px_rgba(93,95,239,0.2)]' 
                : 'text-white bg-white/5 hover:bg-white/10 border-white/5'
              }`}
            >
              Manage Billing
            </button>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all duration-300"
          >
            <LogOut size={16} />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#0B0F19] z-30">
          <div className="flex items-center gap-2 text-[13px] text-gray-500">
            <span className="hover:text-white cursor-pointer transition-colors duration-300" onClick={() => setActiveTab('dashboard')}>Home</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-bold capitalize bg-white/5 px-2 py-0.5 rounded border border-white/10">{activeTab.replace('-', ' ')}</span>
          </div>

          <div className="flex-1 flex justify-center max-w-lg px-8">
            <div className="relative w-full group">
              <Search className="w-4 h-4 text-gray-600 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-accent-indigo transition-colors duration-300" />
              <input 
                type="text" 
                placeholder="Search proposals..." 
                className="bg-[#13161F] border border-white/5 rounded-full pl-10 pr-4 py-2 text-xs text-gray-400 focus:outline-none focus:border-accent-indigo/50 focus:ring-1 focus:ring-accent-indigo/20 w-full transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-accent-indigo rounded-full shadow-[0_0_5px_#5D5FEF]"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10 group cursor-pointer">
              <div className="flex flex-col items-end">
                <span className="text-[13px] font-bold text-white transition-colors duration-300 group-hover:text-accent-indigo">{userName}</span>
                <span className="text-[10px] font-bold text-accent-indigo uppercase">Pro Plan</span>
              </div>
              <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 transition-all duration-300 group-hover:border-accent-indigo/50">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80" 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;