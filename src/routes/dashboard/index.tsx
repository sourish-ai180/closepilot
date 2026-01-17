import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import {
  Plus,
  FileText,
  MoreHorizontal,
  ArrowRight,
  Rocket,
  Target,
  Zap,
  Calculator,
  LayoutGrid,
} from "lucide-react";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Dashboard />;
}

// --- TYPES & INTERFACES ---

type DashboardTab =
  | "dashboard"
  | "new-proposal"
  | "templates"
  | "saved"
  | "settings"
  | "wizard"
  | "billing"
  | "proposal-view"
  | "pricing-engine"
  | "brand-sync";

interface ProposalData {
  id: string;
  title: string;
  client: string;
  value: string;
  status: "Sent" | "Draft" | "Accepted";
  time: string;
  category: string;
}

const ActivityRow = ({ title, client, value, status, time, onView }: any) => (
  <tr
    onClick={onView}
    className="group hover:bg-white/2 transition-all duration-300 cursor-pointer border-b border-white/5 last:border-0"
  >
    <td className="px-8 py-5">
      <div className="flex flex-col">
        <span className="font-bold text-white group-hover:text-accent-indigo transition-colors duration-300">
          {title}
        </span>
        <span className="text-[10px] text-gray-500 mt-0.5">{time}</span>
      </div>
    </td>
    <td className="px-8 py-5 text-gray-400 font-medium">{client}</td>
    <td className="px-8 py-5 font-bold text-white">{value}</td>
    <td className="px-8 py-5">
      <span
        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
          status === "Accepted"
            ? "text-accent-mint border-accent-mint/30 bg-accent-mint/5"
            : status === "Sent"
              ? "text-blue-400 border-blue-400/30 bg-blue-400/5"
              : "text-gray-500 border-white/10 bg-white/5"
        }`}
      >
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

const StarterMission = ({
  icon: Icon,
  title,
  desc,
  btnText,
  color,
  bg,
  path,
}: any) => (
  <Link to={path}>
    <div
      className={`p-10 ${bg} hover:bg-white/5 transition-all duration-700 ease-in-out group flex flex-col items-center text-center cursor-pointer relative overflow-hidden border-r border-white/5 last:border-r-0`}
    >
      {/* Smooth Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

      <div
        className={`w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-white/20 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-700 ease-in-out ${color}`}
      >
        <Icon size={36} strokeWidth={2.5} />
      </div>
      <h4 className="font-bold text-xl mb-3 text-gray-200 group-hover:text-white transition-colors duration-500 tracking-tight">
        {title}
      </h4>
      <p className="text-sm text-gray-600 mb-10 max-w-[240px] group-hover:text-gray-400 transition-colors duration-500 leading-relaxed font-medium">
        {desc}
      </p>
      <button
        className={`px-10 py-3 rounded-xl bg-foreground text-background font-black text-[11px] uppercase tracking-[0.2em] shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-500 hover:bg-gray-100 hover:scale-[1.05] hover:shadow-white/5 active:scale-95`}
      >
        {btnText}
      </button>
    </div>
  </Link>
);

const SavedProposalsView = ({ proposals, onView, onNew }: any) => (
  <div className="p-8 max-w-6xl mx-auto animate-slide-up">
    <div className="flex justify-between items-center mb-10">
      <div>
        <h2 className="text-3xl font-bold mb-2">Saved Proposals</h2>
        <p className="text-gray-500 text-sm">
          Manage your archive of sent and draft proposals.
        </p>
      </div>
      <button
        onClick={onNew}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-indigo text-white font-bold text-sm hover:shadow-xl hover:shadow-accent-indigo/10 transition-all duration-300 hover:scale-[1.02]"
      >
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
              <ActivityRow
                key={p.id}
                title={p.title}
                client={p.client}
                value={p.value}
                status={p.status}
                time={p.time}
                onView={() => onView(p)}
              />
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
        <button
          onClick={onNew}
          className="px-8 py-3 rounded-xl bg-white text-navy-900 font-bold hover:bg-gray-200 transition-all duration-300 shadow-xl hover:scale-105"
        >
          Launch Action: Create First Draft
        </button>
      </div>
    )}
  </div>
);

const DashboardHome = ({
  proposals,
  onNavigate,
  onViewProposal,
}: {
  proposals: ProposalData[];
  onNavigate: (tab: DashboardTab) => void;
  onUseTemplate: (id: string) => void;
  onViewProposal: (p: ProposalData) => void;
}) => (
  <div className="p-8 space-y-14 animate-slide-up">
    {/* === HERO DASHBOARD CARDS (LANDING STYLE) === */}
    <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8">
      {/* === PRIMARY CARD : NEW PROPOSAL === */}
      <Link to="/dashboard/proposal">
        <div
          className="group cursor-pointer h-[435px] rounded-3xl glass border border-white/10
    flex flex-col items-center justify-center text-center p-10
    transition-all duration-500 ease-out
    hover:translate-y-[-4px]
    hover:border-accent-indigo/40
    hover:shadow-[0_0_60px_-10px_rgba(93,95,239,0.35)]"
        >
          <div
            className="w-20 h-20 rounded-full bg-gradient-to-tr from-accent-indigo to-accent-purple
      flex items-center justify-center mb-8 shadow-2xl
      transition-all duration-500 ease-out
      group-hover:scale-110
      group-hover:shadow-[0_0_40px_rgba(93,95,239,0.6)]"
          >
            <Plus size={40} className="text-white stroke-[3]" />
          </div>

          <h3 className="text-3xl font-display font-bold text-white mb-3">
            New Proposal
          </h3>

          <p className="text-gray-400 text-[15px] leading-relaxed max-w-[260px] mb-10">
            Generate a client-ready proposal
            <br />
            in under 2 minutes
          </p>

          <div
            className="inline-flex items-center gap-3 px-12 py-4 rounded-full
      border border-white/10 bg-white/5 text-accent-indigo
      font-bold text-[13px] uppercase tracking-[0.25em]
      transition-all duration-300 ease-out
      group-hover:bg-white/10 group-hover:text-white group-hover:translate-y-[-2px]"
          >
            Launch Wizard <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
      {/* === RIGHT STACKED CARDS === */}
      <div className="flex flex-col gap-8">
        {/* PRICING ENGINE */}
        <Link to="/dashboard/pricing_engine">
          <div
            className="group cursor-pointer glass border border-white/5 rounded-3xl p-8
      transition-all duration-500 ease-out
      hover:translate-y-[-3px]
      hover:border-accent-mint/40
      hover:shadow-[0_0_40px_rgba(110,231,183,0.15)]"
          >
            <div
              className="w-12 h-12 rounded-2xl bg-accent-mint/10
        flex items-center justify-center mb-6
        transition-transform duration-300 ease-out
        group-hover:scale-110"
            >
              <Calculator size={24} className="text-accent-mint" />
            </div>

            <h4 className="text-[19px] font-bold text-white mb-2">
              Smart Pricing Engine
            </h4>
            <p className="text-[15px] text-gray-500">
              Automatically calculates pricing based on scope and location.
            </p>
          </div>
        </Link>

        {/* PRO TEMPLATES */}
        <Link to="/dashboard/templates">
          <div
            onClick={() => onNavigate("templates")}
            className="group cursor-pointer glass border border-white/5 rounded-3xl p-8
      transition-all duration-500 ease-out
      hover:translate-y-[-3px]
      hover:border-accent-purple/40
      hover:shadow-[0_0_40px_rgba(167,139,250,0.15)]"
          >
            <div
              className="w-12 h-12 rounded-2xl bg-accent-purple/10
        flex items-center justify-center mb-6
        transition-transform duration-300 ease-out
        group-hover:scale-110"
            >
              <LayoutGrid size={24} className="text-accent-purple" />
            </div>

            <h4 className="text-[19px] font-bold text-white mb-2">
              Expert Templates
            </h4>

            <p className="text-[15px] text-gray-500 mb-4">
              Marketing • Design • Tech • Creative
            </p>

            <span className="text-[10px] uppercase font-bold text-accent-purple">
              50+ templates available
            </span>
          </div>
        </Link>
      </div>
    </div>

    {/* === ONBOARDING: YOUR SUCCESS MISSION === */}
    <div className="rounded-[3rem] border border-white/5 bg-[#12161F]/50 overflow-hidden shadow-2xl transition-all duration-700 hover:border-white/10">
      <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <h3 className="font-black text-xl flex items-center gap-2 text-white">
          Your Success Mission
          <span className="text-[11px] bg-accent-indigo/20 text-accent-indigo px-3 py-1 rounded-full uppercase tracking-widest ml-4 animate-pulse font-black border border-accent-indigo/30">
            ONBOARDING
          </span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-white/5">
        <StarterMission
          path="/dashboard/proposal"
          icon={Rocket}
          title="First Proposal"
          desc="Generate a professional draft in seconds."
          btnText="Launch Wizard"
          color="text-blue-400"
          bg="bg-transparent"
        />
        <StarterMission
          path="/dashboard/pricing_engine"
          icon={Target}
          title="Smart Rates"
          desc="Configure your pricing engine fundamentals."
          btnText="Launch Engine"
          color="text-accent-indigo"
          bg="bg-transparent"
        />
        <StarterMission
          path="/dashboard/brand_sync"
          icon={Zap}
          title="Brand Sync"
          desc="Upload your branding assets for auto-sync."
          btnText="Launch Sync"
          color="text-accent-mint"
          bg="bg-transparent"
        />
      </div>
    </div>

    {/* === RECENT ACTIVITY === */}
    <div className="space-y-6">
      <div className="flex items-end justify-between px-2">
        <h3 className="text-lg font-bold text-gray-300">Recent Activity</h3>
        <button
          onClick={() => onNavigate("saved")}
          className="text-xs font-bold text-gray-500 hover:text-accent-indigo transition-colors flex items-center gap-1"
        >
          View all <ArrowRight size={14} />
        </button>
      </div>

      <div className="rounded-[2rem] border border-white/5 bg-[#13161F] overflow-hidden shadow-2xl">
        {proposals.length > 0 ? (
          <table className="w-full">
            <tbody className="divide-y divide-white/5">
              {proposals.slice(0, 3).map((p) => (
                <ActivityRow
                  key={p.id}
                  title={p.title}
                  client={p.client}
                  value={p.value}
                  status={p.status}
                  time={p.time}
                  onView={() => onViewProposal(p)}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-12 flex flex-col items-center text-center opacity-40">
            <FileText size={32} className="mb-3 text-gray-600" />
            <p className="text-sm font-medium text-gray-500">
              No active proposals found.
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
);

// --- MAIN DASHBOARD COMPONENT ---

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<DashboardTab>("dashboard");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null,
  );
  const [viewingProposal, setViewingProposal] = useState<ProposalData | null>(
    null,
  );
  const [userName, setUserName] = useState("sourishkundu1122");
  const [proposals] = useState<ProposalData[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("closepilot_user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.name) setUserName(user.name);
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("closepilot_user");
    navigate({ to: "/" });
  };

  const handleUseTemplate = (id: string) => {
    setSelectedTemplateId(id);
    setActiveTab("wizard");
  };

  const handleViewProposal = (proposal: ProposalData) => {
    setViewingProposal(proposal);
    setActiveTab("proposal-view");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "saved":
        return (
          <SavedProposalsView
            proposals={proposals}
            onView={handleViewProposal}
            onNew={() => setActiveTab("new-proposal")}
          />
        );
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#080B13] text-white font-sans flex overflow-hidden selection:bg-accent-indigo selection:text-white">
      {/* SIDEBAR - Styled to match screenshot */}

      <div className="flex-1 w-full overflow-y-auto custom-scrollbar bg-[#0A0D16]">
        <DashboardHome
          proposals={proposals}
          onNavigate={setActiveTab}
          onUseTemplate={handleUseTemplate}
          onViewProposal={handleViewProposal}
        />
      </div>
    </div>
  );
};

export default Dashboard;
