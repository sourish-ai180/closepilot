import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, CreditCard, Info } from "lucide-react";
import { InputBlock } from "./route";

export const Route = createFileRoute("/dashboard/settings/pricing_engine")({
  component: RouteComponent,
});

const EngineRow = ({ label, sub, value, unit }: any) => (
  <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-white/20 transition-all duration-300">
    <div className="max-w-50">
      <p className="text-sm font-bold text-white mb-1 group-hover:text-accent-indigo">
        {label}
      </p>
      <p className="text-[10px] text-gray-600">{sub}</p>
    </div>
    <div className="flex items-center gap-2">
      <input
        type="number"
        defaultValue={value}
        className="w-20 bg-transparent border-b border-white/10 py-1 text-right text-sm font-bold focus:outline-none focus:border-accent-indigo transition-all duration-300"
      />
      <span className="text-gray-500 text-sm">{unit}</span>
    </div>
  </div>
);

function RouteComponent() {
  return (
    <div className="space-y-8 animate-slide-up">
      <div className="glass p-8 rounded-3xl border border-white/5 space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold mb-2">
              Global Pricing Parameters
            </h3>
            <p className="text-sm text-gray-500">
              Standardize your profitability across all automated proposals.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
            <span className="text-[10px] font-bold text-gray-600 uppercase">
              Currency:
            </span>
            <span className="text-sm font-bold">USD ($)</span>
            <ChevronRight size={14} className="text-gray-700" />
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Execution Roles (Hourly)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EngineRow
              label="Project Strategy"
              sub="High-level planning & discovery"
              value="250"
              unit="$"
            />
            <EngineRow
              label="Creative Design"
              sub="Visual assets & branding"
              value="180"
              unit="$"
            />
            <EngineRow
              label="Software Dev"
              sub="Frontend/Backend engineering"
              value="150"
              unit="$"
            />
            <EngineRow
              label="Management"
              sub="Ops & project coordination"
              value="95"
              unit="$"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
          <div className="space-y-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Margin Config
            </p>
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
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Tax & Legal
            </p>
            <InputBlock
              label="Default VAT / Tax Rate"
              defaultValue="20"
              unit="%"
            />
            <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-2">
              <Info size={12} /> Automatically applied to line items.
            </div>
          </div>
        </div>
      </div>
      <button
        // onClick={onManageBilling}
        className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
      >
        <CreditCard size={18} /> Manage Subscription & Billing Details
      </button>
    </div>
  );
}
