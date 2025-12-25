import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles, LogOut, User as UserIcon } from "lucide-react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../firebase";
import Button from "./Button";

// Fixed Page type to include all valid navigation routes used across the application
export type Page =
  | "landing"
  | "features"
  | "pricing"
  | "templates"
  | "dashboard"
  | "login"
  | "signup"
  | "integrations"
  | "about"
  | "blog"
  | "careers"
  | "contact"
  | "privacy"
  | "terms"
  | "cookie";

interface NavbarProps {
  onNavigate: (page: Page) => void;
}

interface LocalUser {
  email: string;
  name: string;
  plan: string;
  isDemo?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [localUser, setLocalUser] = useState<LocalUser | null>(null);

  /* Scroll effect */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Auth listener and Local Sync */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });

    // Also check for a demo session in localStorage
    const checkLocalSession = () => {
      const stored = localStorage.getItem('closepilot_user');
      if (stored) {
        try {
          setLocalUser(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse local user", e);
        }
      } else {
        setLocalUser(null);
      }
    };

    checkLocalSession();
    // Listen for changes in other tabs (optional but good for SPA)
    window.addEventListener('storage', checkLocalSession);
    
    return () => {
      unsubscribe();
      window.removeEventListener('storage', checkLocalSession);
    };
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('closepilot_user');
    setLocalUser(null);
    onNavigate("landing");
  };

  const navLinks: { label: string; page: Page }[] = [
    { label: "Features", page: "features" },
    { label: "Pricing", page: "pricing" },
    { label: "Templates", page: "templates" },
  ];

  // Derive active user
  const currentUser = firebaseUser || localUser;
  const userEmail = firebaseUser?.email || localUser?.email;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-900/80 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center">
          
          {/* Logo - Matches Dashboard Sidebar Animation */}
          <div
            className="flex items-center gap-3 cursor-pointer shrink-0 group transition-all duration-500 hover:scale-105"
            onClick={() => onNavigate("landing")}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-indigo to-accent-mint flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white transition-colors duration-300 group-hover:text-accent-mint">
              ClosePilot
            </span>
          </div>

          {/* Center Navigation (Desktop) */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.page)}
                className="relative group text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-indigo to-accent-mint group-hover:w-full transition-all duration-300 ease-out rounded-full opacity-0 group-hover:opacity-100" />
              </button>
            ))}

            {currentUser && (
              <button
                onClick={() => onNavigate("dashboard")}
                className="relative group text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300"
              >
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-indigo to-accent-mint group-hover:w-full transition-all duration-300 ease-out rounded-full opacity-0 group-hover:opacity-100" />
              </button>
            )}
          </div>

          {/* Right Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {!currentUser ? (
              <>
                <button
                  onClick={() => onNavigate("login")}
                  className="relative group text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Log In
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-indigo to-accent-mint group-hover:w-full transition-all duration-300 ease-out rounded-full opacity-0 group-hover:opacity-100" />
                </button>
                <Button
                  variant="primary"
                  className="!py-2 !px-4 !text-sm"
                  onClick={() => onNavigate("signup")}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 mr-2">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                    <UserIcon size={14} className="text-accent-indigo" />
                  </div>
                  <span className="text-xs text-gray-400 max-w-[120px] truncate font-medium">
                    {userEmail} {localUser?.isDemo && <span className="text-[9px] text-accent-mint border border-accent-mint/30 px-1 rounded uppercase">Demo</span>}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="relative group flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition-colors duration-300"
                >
                  <LogOut size={16} />
                  Logout
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300 ease-out rounded-full opacity-0 group-hover:opacity-100" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-navy-900/95 backdrop-blur-lg border-b border-white/10 p-4 flex flex-col gap-4 animate-slide-up shadow-2xl">
          {navLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                onNavigate(item.page);
                setIsOpen(false);
              }}
              className="text-lg font-medium text-gray-300 hover:text-white block py-2 text-left transition-colors"
            >
              {item.label}
            </button>
          ))}

          {currentUser && (
            <button
              onClick={() => {
                onNavigate("dashboard");
                setIsOpen(false);
              }}
              className="text-lg font-medium text-gray-300 hover:text-white block py-2 text-left transition-colors"
            >
              Dashboard
            </button>
          )}

          <hr className="border-white/10" />

          {!currentUser ? (
            <>
              <button
                onClick={() => {
                  onNavigate("login");
                  setIsOpen(false);
                }}
                className="text-lg font-medium text-gray-300 hover:text-white block py-2 text-left transition-colors"
              >
                Log In
              </button>
              <Button
                variant="primary"
                className="w-full justify-center"
                onClick={() => {
                  onNavigate("signup");
                  setIsOpen(false);
                }}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-lg font-medium text-red-400 hover:text-red-300 block py-2 text-left transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;