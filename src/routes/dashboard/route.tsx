import { auth } from "@/firebase";
import {
  createFileRoute,
  Link,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { signOut } from "firebase/auth";
import {
  BarChart,
  Bell,
  ChevronRight,
  FileText,
  Layout,
  LogOut,
  Plus,
  Search,
  Settings,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen w-full flex flex-col">
      <Header />
      <main className="flex w-full overflow-hidden">
        <Nav />
        <div className="w-full overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

const SidebarLink = ({
  icon: Icon,
  label,
  active,
  path,
}: {
  path: string;
  icon: LucideIcon;
  label: string;
  active: boolean;
}) => (
  <Link to={path}>
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-300 group ${
        active
          ? "bg-linear-to-r from-[#5D5FEF] to-[#7C3AED] text-white shadow-lg shadow-accent-indigo/30"
          : "text-gray-500 hover:text-gray-300 hover:bg-white/3"
      }`}
    >
      <Icon
        size={18}
        className={`transition-all duration-300 ${active ? "text-white" : "group-hover:text-accent-indigo"}`}
      />
      <span className={`text-[13px] font-bold`}>{label}</span>
    </button>
  </Link>
);

function isActive(current: string, target: string) {
  if (target === "/dashboard") {
    return current === "/dashboard";
  }
  return current === target || current.startsWith(target + "/");
}

function Nav() {
  const navigate = Route.useNavigate();
  const { location } = useRouterState();
  const path = location.pathname;

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("closepilot_user");
    navigate({ to: "/" });
  };

  return (
    <aside className="w-75">
      <nav className="flex-1 px-6 py-10 space-y-4">
        <SidebarLink
          icon={Layout}
          label="Dashboard"
          active={isActive(path, "/dashboard")}
          path="/dashboard"
        />
        <SidebarLink
          icon={Plus}
          label="New Proposal"
          active={isActive(path, "/dashboard/proposal")}
          path="/dashboard/proposal"
        />
        <SidebarLink
          icon={FileText}
          label="Templates"
          active={isActive(path, "/dashboard/templates")}
          path="/dashboard/templates"
        />
        <SidebarLink
          icon={BarChart}
          label="Saved Proposals"
          active={isActive(path, "/dashboard/saved_proposals")}
          path="/dashboard/saved_proposals"
        />
        <SidebarLink
          icon={Settings}
          label="Settings"
          active={isActive(path, "/dashboard/settings")}
          path="/dashboard/settings"
        />
      </nav>

      <div className="p-8">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all duration-300"
        >
          <LogOut size={18} />
          <span className="text-sm font-bold">Log out</span>
        </button>
      </div>
    </aside>
  );
}

function Breadcrumb() {
  const { location } = useRouterState();
  const parts = location.pathname.split("/").filter(Boolean);

  if (!parts.length) return null;

  const maxVisible = 3;
  const isLong = parts.length > maxVisible;

  let visibleParts = parts;
  if (isLong) {
    visibleParts = [parts[0], "...", parts[parts.length - 1]];
  }

  return (
    <nav className="flex items-center gap-2 text-sm">
      {visibleParts.map((part, i) => {
        if (part === "...") {
          return (
            <span key="dots" className="text-white/40 px-1">
              ...
            </span>
          );
        }

        const realIndex = isLong ? (i === 2 ? parts.length - 1 : 0) : i;

        const href = "/" + parts.slice(0, realIndex + 1).join("/");
        const isActive = realIndex === parts.length - 1;

        return (
          <div key={part} className="flex items-center gap-2">
            {i !== 0 && <span className="text-white/30">/</span>}

            <Link
              to={href}
              className={`capitalize transition-colors ${
                isActive
                  ? "text-[#5D5FEF] font-semibold"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {part.replace("-", " ")}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}

function Header() {
  return (
    <header className="sticky py-3 top-0 border-b border-white/5 flex items-center justify-between px-10 bg-[#080B13] z-30">
      <Link to="/">
        <div className="w-fit flex items-center px-8 border-b border-white/5 gap-3 cursor-pointer group transition-all duration-500 hover:scale-105">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-indigo to-accent-mint flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white transition-colors duration-300 group-hover:text-accent-mint">
            ClosePilot
          </span>
        </div>
      </Link>

      {/* Breadcrumb - Fixed Redirection */}
      <div className="w-32 flex items-center gap-3">
        <Link to="/">
          <button className="text-[14px] font-bold text-gray-600 hover:text-white transition-colors duration-300">
            Home
          </button>
        </Link>
        <ChevronRight size={14} className="text-gray-800" />
        <Breadcrumb />
      </div>

      {/* Search Bar - Recreated */}
      <div className="flex-1 flex justify-center max-w-lg px-8">
        <div className="relative w-full group">
          <Search className="w-4 h-4 text-gray-700 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-accent-indigo transition-colors duration-300" />
          <input
            type="text"
            placeholder="Search proposals"
            className="bg-[#111624] border border-white/5 rounded-full pl-12 pr-4 py-2.5 text-[13px] text-gray-400 focus:outline-none focus:border-accent-indigo/40 focus:ring-1 focus:ring-accent-indigo/10 w-full transition-all duration-300 placeholder:text-gray-700 shadow-inner"
          />
        </div>
      </div>

      {/* Right Section Actions */}
      <div className="flex items-center gap-8">
        <button className="relative text-gray-500 hover:text-white transition-all duration-300 hover:scale-110">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-accent-indigo rounded-full shadow-[0_0_8px_#5D5FEF] border-2 border-[#080B13]"></span>
        </button>

        <div className="flex items-center gap-5 pl-8 border-l border-white/5 group cursor-pointer">
          <div className="flex flex-col items-end">
            <span className="text-[14px] font-black text-white transition-colors duration-300 group-hover:text-accent-indigo tracking-tight">
              {/*{userName}*/} username
            </span>
            <span className="text-[10px] font-black text-[#5D5FEF] uppercase tracking-widest">
              Pro Plan
            </span>
          </div>
          <div className="relative p-0.5 rounded-full bg-linear-to-tr from-[#5D5FEF] to-[#7C3AED] shadow-xl group-hover:scale-110 transition-transform duration-300">
            <div className="w-10.5 h-10.5 rounded-full overflow-hidden border-2 border-[#080B13]">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
