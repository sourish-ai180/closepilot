import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Eye, Zap } from "lucide-react";

export const Route = createFileRoute("/dashboard/settings/notifications")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-8 animate-slide-up">
      <div className="glass p-8 rounded-3xl border border-white/5 space-y-8">
        <h3 className="text-xl font-bold">Preferences</h3>
        <div className="space-y-6">
          {[
            {
              label: "Proposal Viewed",
              desc: "Get notified when a client opens your link.",
              icon: Eye,
            },
            {
              label: "Proposal Accepted",
              desc: "Instant alert when a client signs or accepts.",
              icon: CheckCircle2,
            },
            {
              label: "Marketing Updates",
              desc: "Stay tuned for new AI features and templates.",
              icon: Zap,
            },
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
  );
}
