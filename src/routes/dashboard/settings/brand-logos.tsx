import { createFileRoute } from "@tanstack/react-router";
import { Upload } from "lucide-react";

export const Route = createFileRoute("/dashboard/settings/brand-logos")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-8 animate-slide-up">
      <div className="glass p-8 rounded-3xl border border-white/5 space-y-10">
        <div>
          <h3 className="text-xl font-bold mb-2">Visual Identity</h3>
          <p className="text-sm text-gray-500">
            Customize the look of your exported PDFs and shared links.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Logo (Dark Background)
            </p>
            <div className="h-40 rounded-2xl border-2 border-dashed border-white/5 bg-white/[0.01] flex flex-col items-center justify-center group hover:border-accent-indigo/40 transition-colors cursor-pointer">
              <Upload
                size={24}
                className="text-gray-600 mb-2 group-hover:scale-110 group-hover:text-accent-indigo transition-all"
              />
              <span className="text-[11px] font-bold text-gray-600 uppercase">
                SVG or PNG (Max 5MB)
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Logo (Light Background)
            </p>
            <div className="h-40 rounded-2xl border-2 border-dashed border-white/5 bg-white flex flex-col items-center justify-center group hover:border-accent-indigo/40 transition-colors cursor-pointer shadow-xl">
              <Upload
                size={24}
                className="text-gray-300 mb-2 group-hover:scale-110 group-hover:text-accent-indigo transition-all"
              />
              <span className="text-[11px] font-bold text-gray-300 uppercase">
                SVG or PNG (Max 5MB)
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Color Palette
          </p>
          <div className="flex flex-wrap gap-6">
            {["Primary", "Secondary", "Accent"].map((colorType) => (
              <div key={colorType} className="space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-accent-indigo shadow-lg border border-white/10 cursor-pointer hover:scale-105 transition-transform" />
                <p className="text-[10px] font-bold text-gray-500 text-center uppercase tracking-tighter">
                  {colorType}
                </p>
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
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Typography Preference
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Inter", "Manrope", "Plus Jakarta", "Geist"].map((font) => (
              <button
                key={font}
                className={`py-3 rounded-xl border transition-all text-xs font-bold ${font === "Inter" ? "bg-accent-indigo/10 border-accent-indigo text-white" : "bg-white/5 border-white/5 text-gray-500 hover:border-white/20"}`}
              >
                {font}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
