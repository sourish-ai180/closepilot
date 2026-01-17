import { Link, useRouterState } from "@tanstack/react-router";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  BellRing,
  Calculator,
  ExternalLink,
  Info,
  Loader2,
  Palette,
  Save,
  Shield,
  User,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/settings")({
  component: RouteComponent,
});

export const InputBlock = ({
  label,
  defaultValue,
  placeholder,
  type = "text",
  value,
  onChange,
  icon: Icon,
}: any) => (
  <div className="space-y-2 group">
    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1 transition-colors duration-300 group-focus-within:text-accent-indigo">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-accent-indigo transition-colors"
          size={16}
        />
      )}
      <input
        type={type}
        defaultValue={defaultValue}
        value={value}
        onChange={(e) => (onChange ? onChange(e.target.value) : null)}
        placeholder={placeholder}
        className={`w-full bg-[#13161F] border border-white/5 rounded-xl ${Icon ? "pl-11" : "px-4"} py-3 text-sm text-white focus:outline-none focus:border-accent-indigo/50 focus:ring-1 focus:ring-accent-indigo/20 transition-all duration-300 placeholder:text-gray-700 hover:border-white/10`}
      />
    </div>
  </div>
);

const SettingsSubLink = ({
  label,
  icon: Icon,
  path,
  currPath,
}: {
  currPath: string;
  path: string;
  label: string;
  icon: LucideIcon;
}) => (
  <Link to={path}>
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ease-in-out ${path === currPath ? "bg-accent-indigo text-white shadow-lg shadow-accent-indigo/10" : "text-gray-500 hover:text-white hover:bg-white/5"}`}
    >
      <Icon size={18} /> {label}
    </button>
  </Link>
);

function RouteComponent() {
  const { location } = useRouterState();
  const [isSaving, setIsSaving] = useState(false);
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1200);
  };
  return (
    <div className="p-8 max-w-7xl mx-auto animate-slide-up">
      <div className="w-full flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-2">Account Settings</h2>
          <p className="text-gray-500 text-sm">
            Configure your personal and business presence on ClosePilot.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-6 py-3 rounded-xl bg-accent-indigo text-white font-bold text-sm shadow-xl shadow-accent-indigo/10 transition-all duration-300 hover:scale-105 hover:bg-accent-indigo/90 flex items-center gap-2"
        >
          {isSaving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              <Save size={16} /> Save All Changes
            </>
          )}
        </button>
      </div>
      <div className="flex w-full space-y-8 transition-all duration-300">
        <aside className="w-full lg:w-72 shrink-0 space-y-1">
          <SettingsSubLink
            currPath={location.pathname}
            label="Personal Profile"
            icon={User}
            path="/dashboard/settings/profile"
          />
          <SettingsSubLink
            currPath={location.pathname}
            label="Brand & Logos"
            icon={Palette}
            path="/dashboard/settings/brand-logos"
          />
          <SettingsSubLink
            currPath={location.pathname}
            label="Pricing Engine"
            icon={Calculator}
            path="/dashboard/settings/pricing_engine"
          />
          <SettingsSubLink
            currPath={location.pathname}
            label="Security"
            icon={Shield}
            path="/dashboard/settings/security"
          />
          <SettingsSubLink
            currPath={location.pathname}
            label="Notifications"
            icon={BellRing}
            path="/dashboard/settings/notifications"
          />

          <div className="pt-6 mt-6 border-t border-white/5 px-4">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-4">
              Support
            </p>
            <button className="flex items-center gap-3 text-sm text-gray-500 hover:text-white transition-colors py-2">
              <Info size={16} /> Help Center
            </button>
            <button className="flex items-center gap-3 text-sm text-gray-500 hover:text-white transition-colors py-2">
              <ExternalLink size={16} /> API Documentation
            </button>
          </div>
        </aside>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
