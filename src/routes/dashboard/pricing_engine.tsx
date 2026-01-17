import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calculator,
  Check,
  Loader2,
  Save,
  Sparkles,
  Target,
} from "lucide-react";

export const Route = createFileRoute("/dashboard/pricing_engine")({
  component: RouteComponent,
});

const EngineRow = ({ label, sub, value, unit }: any) => (
  <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-white/20 transition-all duration-300">
    <div className="max-w-[200px]">
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
  const save = true;
  return (
    <div className="p-8 max-w-5xl mx-auto animate-slide-up space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <button className="p-2.5 hover:bg-white/5 rounded-xl text-gray-400 transition-all duration-300 hover:text-white hover:scale-110">
              <ArrowLeft />
            </button>
          </Link>
          <div>
            <h2 className="text-3xl font-bold">Smart Pricing Engine</h2>
            <p className="text-gray-500 text-sm mt-1">
              Define your business fundamentals to automate profitable quotes.
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-indigo text-white font-bold text-sm shadow-xl shadow-accent-indigo/10 transition-all duration-300 hover:scale-105 hover:bg-accent-indigo/90">
          {save ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>
              <Save size={18} /> Save Parameters
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-8 rounded-3xl border border-white/5 space-y-8">
            <h3 className="text-xl font-bold flex items-center gap-2 text-white">
              <Calculator className="text-accent-indigo" /> Global Labor Rates
            </h3>
            <div className="space-y-6">
              <EngineRow
                label="Senior Lead Rate"
                sub="Standard hourly for high-level strategy."
                value="250"
                unit="$"
              />
              <EngineRow
                label="Standard Execution"
                sub="Day-to-day project management & delivery."
                value="150"
                unit="$"
              />
              <EngineRow
                label="Junior Support"
                sub="Lower-tier repetitive tasks or assistance."
                value="85"
                unit="$"
              />
            </div>
          </div>

          <div className="glass p-8 rounded-3xl border border-white/5 space-y-8">
            <h3 className="text-xl font-bold flex items-center gap-2 text-white">
              <Target className="text-accent-purple" /> Margin & Risk
            </h3>
            <div className="space-y-6">
              <EngineRow
                label="Net Profit Target"
                sub="Minimum margin the AI will optimize for."
                value="35"
                unit="%"
              />
              <EngineRow
                label="Contingency Buffer"
                sub="Safety margin for scope creep or delays."
                value="15"
                unit="%"
              />
              <EngineRow
                label="Sales Commission"
                sub="Internal cost allocated for lead acquisition."
                value="10"
                unit="%"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-accent-indigo/10 to-accent-purple/10 border border-accent-indigo/20">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles size={18} className="text-accent-indigo" /> AI
              Optimization
            </h4>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              These values are used to calculate the{" "}
              <span className="text-white font-bold">Smart Quote</span> in the
              proposal wizard. The AI will automatically suggest the best
              pricing tier based on your targets.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[11px] text-gray-500 font-bold uppercase">
                <Check size={14} className="text-accent-mint" /> Automated ROI
                logic
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-500 font-bold uppercase">
                <Check size={14} className="text-accent-mint" /> Scalable volume
                discounts
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-500 font-bold uppercase">
                <Check size={14} className="text-accent-mint" /> Regional cost
                adjustment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
