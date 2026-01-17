import { createFileRoute } from "@tanstack/react-router";
import {
  Briefcase,
  Camera,
  Globe,
  LinkIcon,
  Mail,
  Phone,
  User,
} from "lucide-react";

export const Route = createFileRoute("/dashboard/settings/profile")({
  component: RouteComponent,
});

const InputBlock = ({
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

function RouteComponent() {
  return (
    <div>
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
              <p className="text-sm text-gray-500">
                This information will be displayed on your generated proposals.
              </p>
              <button className="text-xs font-bold text-accent-indigo hover:text-accent-mint transition-colors mt-2">
                Change Avatar Image
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputBlock
              label="Full Name"
              defaultValue="Rick Kundu"
              icon={User}
            />
            <InputBlock
              label="Email Address"
              defaultValue="rickkundu@example.com"
              icon={Mail}
            />
            <InputBlock
              label="Job Title"
              defaultValue="Senior Product Designer"
              icon={Briefcase}
            />
            <InputBlock
              label="Phone Number"
              defaultValue="+1 (555) 000-0000"
              icon={Phone}
            />
          </div>

          <div className="space-y-2 group">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">
              Short Bio
            </label>
            <textarea
              rows={4}
              className="w-full bg-[#13161F] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-indigo/50 focus:ring-1 focus:ring-accent-indigo/20 transition-all duration-300 placeholder:text-gray-700"
              defaultValue="Helping high-growth startups build scalable design systems and closing bigger deals with ClosePilot."
            />
          </div>

          <div className="space-y-4">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">
              Social Presense
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputBlock
                label="LinkedIn"
                placeholder="linkedin.com/in/..."
                icon={LinkIcon}
              />
              <InputBlock
                label="Portfolio / Website"
                placeholder="https://..."
                icon={Globe}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
