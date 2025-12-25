
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Play, LayoutDashboard, FilePlus, Files, PieChart, Settings, Search, Bell, User, MoreVertical, TrendingUp, CheckCircle2,
  Layout, Plus, FileText, BarChart, ChevronRight, MoreHorizontal, Megaphone, Image, Code, Video, Zap, Sparkles
} from 'lucide-react';
import Button from './Button';
import { Page } from './Navbar';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden flex flex-col items-center min-h-screen">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Decorative blurred orb layers - Adjusted for focus */}
        <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-accent-indigo/10 rounded-full blur-[160px] animate-pulse-glow" />
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-accent-purple/10 rounded-full blur-[100px] animate-float opacity-50" />
        <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] bg-accent-mint/5 rounded-full blur-[130px] animate-float-delayed opacity-40" />
        
        {/* Floating animated gradient blobs */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-accent-indigo/20 rounded-full blur-2xl animate-float opacity-40" />
        <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-accent-purple/20 rounded-full blur-2xl animate-float-delayed opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* NEW: CENTRAL HOTSPOT GLOW - Tight, bright center behind text */}
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(circle_at_center,rgba(93,95,239,0.35)_0%,rgba(167,139,250,0.15)_30%,transparent_70%)] -z-10 blur-[60px] opacity-90 mix-blend-screen" />
        
        {/* MAIN RADIAL GLOW: Wider mid-spread behind the text stack */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(93,95,239,0.2)_0%,rgba(167,139,250,0.1)_50%,transparent_80%)] -z-20 blur-[100px] opacity-70" />
        
        {/* SECONDARY GLOW: Ambient background bleed */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(93,95,239,0.05),transparent_70%)] -z-30 blur-[150px]" />

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-slide-up opacity-0" style={{ animationDelay: '0.1s' }}>
          <span className="w-2 h-2 rounded-full bg-accent-mint animate-pulse" />
          <span className="text-sm font-medium text-accent-mint">Introducing Smart Pricing Intelligence</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-8 animate-slide-up opacity-0 drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)] relative z-10" style={{ animationDelay: '0.2s' }}>
          Create <span className="text-gradient-accent">Stunning</span> Client<br />
          Proposals <span className="text-gradient-accent">10x Faster</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto animate-slide-up opacity-0 relative z-10" style={{ animationDelay: '0.3s' }}>
          Generate high-converting proposals instantly with AI-powered structure, smart pricing, and analytics.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up opacity-0 mb-20 relative z-10" style={{ animationDelay: '0.4s' }}>
          <div onClick={() => onNavigate('signup')} className="w-full sm:w-auto">
            <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />} className="w-full sm:w-auto h-14 text-lg">
              Start Free Trial
            </Button>
          </div>
          <div onClick={() => onNavigate('features')} className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto h-14 text-lg">
              <Play className="w-4 h-4" /> Watch Demo
            </Button>
          </div>
        </div>


        {/* --------------------------------------------------------------------------- */}
        {/* DASHBOARD MOCKUP START */}
        {/* --------------------------------------------------------------------------- */}
        
        <div className={`w-full max-w-6xl mx-auto rounded-xl border border-white/10 shadow-2xl bg-[#0B0F19] overflow-hidden flex flex-col text-left transition-all duration-1000 delay-500 relative z-20 ${isVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-24 rotate-x-12'}`} style={{ perspective: '1000px' }}>
          
          {/* BROWSER WINDOW CONTROLS HEADER */}
          <div className="h-9 bg-[#0B0F19] border-b border-white/5 flex items-center px-4 justify-between select-none">
             {/* Traffic Lights */}
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]/20 hover:opacity-80 transition-opacity"></div>
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D89E24]/20 hover:opacity-80 transition-opacity"></div>
                <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1AAB29]/20 hover:opacity-80 transition-opacity"></div>
             </div>
             {/* Address Bar */}
             <div className="flex-1 flex justify-center px-4">
                <div className="bg-[#13161F] px-3 py-1 rounded text-[10px] text-gray-500 font-mono border border-white/5 flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-accent-indigo animate-pulse"></div>
                   app.closepilot.com/dashboard
                </div>
             </div>
             {/* Spacer for centering */}
             <div className="w-14"></div> 
          </div>

          <div className="flex flex-1 h-[600px] overflow-hidden relative">
            
            {/* 1. Left Sidebar Navigation */}
            <aside className="w-64 border-r border-white/5 bg-[#0B0F19]/95 backdrop-blur-xl flex-col justify-between p-4 hidden md:flex sticky top-0 h-full z-10">
              <div>
                <div className="flex items-center gap-3 px-4 mb-8 mt-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-indigo to-accent-mint flex items-center justify-center shadow-lg shadow-accent-indigo/20">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-display font-bold text-lg tracking-tight text-white">ClosePilot</span>
                </div>
                
                <nav className="space-y-1">
                  <NavItem icon={Layout} label="Dashboard" active />
                  <NavItem icon={Plus} label="New Proposal" />
                  <NavItem icon={FileText} label="Templates" />
                  <NavItem icon={BarChart} label="Saved Proposals" />
                  <NavItem icon={PieChart} label="Analytics" />
                  <NavItem icon={Settings} label="Settings" />
                </nav>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-white">Free Plan</span>
                  <span className="text-xs text-gray-400">0/5 Used</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-accent-indigo w-0 h-full rounded-full"></div>
                </div>
                <button className="w-full mt-4 text-xs font-medium text-white bg-white/10 hover:bg-white/20 py-2 rounded-lg transition-colors">
                  Upgrade Plan
                </button>
              </div>
            </aside>

            {/* Main Dashboard Content */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#0B0F19] relative z-0">
              
              {/* 2. Top Navigation Bar */}
              <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#0B0F19]/90 backdrop-blur-md sticky top-0 z-20">
                {/* Left: Breadcrumbs - Width fixed to ensure center alignment works */}
                <div className="flex items-center gap-2 text-sm text-gray-400 min-w-max">
                  <span className="hover:text-white cursor-pointer transition-colors">Home</span>
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                  <span className="text-white font-medium">Dashboard</span>
                </div>

                {/* Center: Search - Shifted left */}
                <div className="flex-1 flex justify-start px-8">
                  <div className="relative hidden sm:block group w-full max-sm">
                    <Search className="w-4 h-4 text-gray-600 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-accent-indigo transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Search proposals..." 
                      className="bg-[#13161F] border border-white/5 rounded-full pl-10 pr-4 py-2 text-sm text-gray-400 focus:outline-none focus:border-accent-indigo/50 focus:ring-1 focus:ring-accent-indigo/20 w-full transition-all placeholder:text-gray-600 shadow-inner"
                    />
                  </div>
                </div>

                {/* Right: Actions - Width matched to left side */}
                <div className="flex items-center justify-end gap-5 min-w-max">
                  <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0B0F19]"></span>
                  </button>
                  
                  <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-white/10">
                     <div className="flex flex-col items-end mr-1">
                        <span className="text-sm font-bold text-white leading-none">Alex Johnson</span>
                        <span className="text-[10px] font-semibold text-accent-indigo mt-1">Pro Plan</span>
                     </div>
                     <div className="w-9 h-9 rounded-full p-0.5 bg-gradient-to-tr from-accent-indigo to-accent-purple">
                        <img 
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                          alt="User" 
                          className="w-full h-full rounded-full object-cover border-2 border-[#0B0F19]"
                        />
                     </div>
                  </div>
                </div>
              </header>

              <main className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar">
                
                {/* 3. Hero Stats Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  
                  {/* Card 1: Welcome */}
                  <div className="rounded-2xl p-6 glass border border-white/5 relative overflow-hidden group flex flex-col justify-between">
                    {/* Bg glow */}
                    <div className="absolute right-0 top-0 w-32 h-32 bg-accent-indigo/10 blur-3xl rounded-full -mr-10 -mt-10" />
                    
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">Welcome back! <span className="text-2xl animate-pulse">👋</span></h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-6">
                        You haven’t created any proposals yet. Start your first proposal to unlock insights and analytics.
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 font-medium">
                        Current Plan: <span className="text-white font-bold">Free</span>
                      </div>
                      <button className="text-sm font-semibold text-accent-indigo hover:text-accent-mint transition-colors flex items-center gap-1 group/btn">
                        Upgrade <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Card 2: Performance (Empty State) */}
                  <div className="rounded-2xl p-6 glass border border-white/5 flex flex-col relative overflow-hidden min-h-[220px] group">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4 z-10">
                      <h3 className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                        Performance Insights
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span>
                      </h3>
                      <button className="text-gray-500 hover:text-white transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Chart Background (Faded) */}
                    <div className="absolute inset-x-6 bottom-0 h-32 flex items-end justify-between gap-1 pointer-events-none opacity-30">
                      {[45, 60, 75, 50, 80, 65, 55, 70, 45, 60, 85, 50].map((height, i) => (
                        <div 
                          key={i}
                          className="w-full bg-gradient-to-t from-accent-indigo/40 to-accent-indigo/5 rounded-t-[2px]"
                          style={{ height: `${height}%` }}
                        ></div>
                      ))}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div
                        className="
                          bg-[#0B0F19]/80 
                          backdrop-blur-md 
                          border border-white/5 
                          rounded-2xl 
                          p-4 
                          flex 
                          flex-col 
                          items-center 
                          text-center 
                          shadow-2xl 
                          transition-transform 
                          duration-300 
                          group-hover:scale-105
                          translate-y-4
                        "
                      >
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3">
                          <BarChart className="w-5 h-5 text-gray-400" />
                        </div>

                        <p className="text-sm font-medium text-white mb-1">
                          No activity yet
                        </p>

                        <p className="text-[11px] text-gray-400 max-w-[160px] leading-relaxed">
                          Metrics will appear after your first proposal is viewed.
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Card 3: New Proposal CTA */}
                  <div onClick={() => onNavigate('dashboard')} className="rounded-2xl p-6 bg-gradient-to-br from-accent-indigo/10 to-accent-mint/5 border border-accent-indigo/20 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-[0_0_20px_-5px_rgba(93,95,239,0.3)] hover:border-accent-indigo/40 transition-all duration-300 group">
                     <div className="w-12 h-12 rounded-full bg-accent-indigo flex items-center justify-center mb-4 shadow-lg shadow-accent-indigo/20 group-hover:scale-110 transition-transform">
                        <Plus className="w-6 h-6 text-white" />
                     </div>
                     <h3 className="text-lg font-bold text-white mb-1">New Proposal</h3>
                     <p className="text-xs text-accent-indigo/80">AI-assisted • Ready in 2 minutes</p>
                  </div>

                </div>


                {/* 4. Start from Template */}
                <div className="mb-8">
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="text-lg font-bold text-white">Start from a Template</h3>
                    <button className="text-xs text-accent-indigo hover:text-white transition-colors">View all</button>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <TemplateTile icon={Megaphone} category="Marketing" title="Social Media Strategy" color="text-orange-400" bg="bg-orange-400/10" />
                    <TemplateTile icon={Image} category="Design" title="Branding Proposal" color="text-purple-400" bg="bg-purple-400/10" />
                    <TemplateTile icon={Code} category="Tech" title="Web Development" color="text-blue-400" bg="bg-blue-400/10" />
                    <TemplateTile icon={Video} category="Creative" title="Video Production" color="text-pink-400" bg="bg-pink-400/10" />
                  </div>
                </div>

                {/* 5. Recent Proposals Table (Empty State) */}
                <div className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
                  <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                    <h3 className="font-semibold text-white text-sm">Recent Proposals</h3>
                    <button className="text-xs text-gray-500 hover:text-white">Filter</button>
                  </div>
                  
                  <div className="w-full">
                    <div className="grid grid-cols-12 px-6 py-3 border-b border-white/5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="col-span-5">Project Name</div>
                      <div className="col-span-3">Client</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-2 text-right">Value</div>
                    </div>
                    
                    {/* Empty State Row */}
                    <div className="py-12 flex flex-col items-center justify-center text-center">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                        <FileText className="w-5 h-5 text-gray-600" />
                      </div>
                      <p className="text-sm text-gray-300 font-medium">No proposals yet</p>
                      <p className="text-xs text-gray-500 mt-1">Create a proposal to see it listed here.</p>
                    </div>
                  </div>
                </div>

              </main>
            </div>
          </div>
        </div>
        {/* DASHBOARD MOCKUP END */}

      </div>
    </section>
  );
};

// Helper Components for Dashboard Mockup
const NavItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all group ${active ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
    <Icon className={`w-4 h-4 ${active ? 'text-accent-indigo' : 'group-hover:text-accent-indigo transition-colors'}`} />
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const TemplateTile = ({ icon: Icon, category, title, color, bg }: { icon: any, category: string, title: string, color: string, bg: string }) => (
  <div className="group p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-accent-indigo/30 cursor-pointer transition-all duration-300 hover:-translate-y-1">
    <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
      <Icon className={`w-4 h-4 ${color}`} />
    </div>
    <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${color}`}>{category}</div>
    <h4 className="text-sm font-bold text-gray-200 group-hover:text-white mb-2 leading-tight">{title}</h4>
    <div className="flex items-center gap-1 text-[10px] text-gray-500 group-hover:text-accent-indigo transition-colors">
      <span>Use Template</span>
      <ArrowRight className="w-3 h-3" />
    </div>
  </div>
);

export default Hero;
