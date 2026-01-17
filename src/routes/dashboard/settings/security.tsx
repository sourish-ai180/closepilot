import { createFileRoute } from "@tanstack/react-router";
import { Smartphone, Trash2 } from "lucide-react";
import { InputBlock } from "./route";

export const Route = createFileRoute("/dashboard/settings/security")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
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
                <p className="text-xs text-gray-500">
                  Secure your account with a mobile authenticator.
                </p>
              </div>
            </div>
            <div className="w-12 h-6 bg-white/5 rounded-full relative cursor-pointer">
              <div className="absolute left-1 top-1 w-4 h-4 bg-gray-600 rounded-full" />
            </div>
          </div>

          <div className="p-6 bg-[#13161F] rounded-2xl border border-white/5 space-y-6">
            <p className="font-bold">Change Password</p>
            <div className="space-y-4">
              <InputBlock
                label="Current Password"
                type="password"
                placeholder="••••••••"
              />
              <div className="grid grid-cols-2 gap-4">
                <InputBlock
                  label="New Password"
                  type="password"
                  placeholder="••••••••"
                />
                <InputBlock
                  label="Confirm New Password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all">
              Update Password
            </button>
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
  );
}
