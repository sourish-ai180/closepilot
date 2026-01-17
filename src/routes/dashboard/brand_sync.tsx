import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Info, Loader2, Upload, Zap } from "lucide-react";

export const Route = createFileRoute("/dashboard/brand_sync")({
  component: RouteComponent,
});

function RouteComponent() {
  const sync = true;
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
            <h2 className="text-3xl font-bold">Brand Sync</h2>
            <p className="text-gray-500 text-sm mt-1">
              Upload your identity to automatically brand every proposal.
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-mint text-navy-900 font-bold text-sm shadow-xl shadow-accent-mint/20 transition-all duration-300 hover:scale-105 hover:bg-accent-mint/90">
          {sync ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>
              <Zap size={18} /> Sync Brand Assets
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              Primary Logo <Info size={14} className="opacity-50" />
            </h3>
            <div className="h-56 rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-gray-600 hover:border-accent-indigo/40 hover:bg-white/[0.01] hover:text-gray-400 transition-all duration-300 cursor-pointer group bg-[#13161F]">
              <Upload
                size={40}
                className="mb-4 group-hover:scale-110 group-hover:text-accent-indigo transition-all duration-300"
              />
              <span className="text-sm font-bold">
                Drop High-Res Logo (SVG/PNG)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
