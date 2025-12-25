import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles, LogOut, User as UserIcon } from "lucide-react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../firebase";
import Button from "./Button";

/* ================================
   Page Routes
================================ */
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

/* ================================
   Demo User (Optional)
================================ */
interface LocalUser {
  email: string;
  name: string;
  plan: string;
  isDemo: true;
}

/* ================================
   Navbar Component
================================ */
const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [localUser, setLocalUser] = useState<LocalUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  /* ================================
     Scroll Effect
  ================================ */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================================
     Firebase Auth Listener (CRITICAL)
  ================================ */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setAuthLoading(false); // 🔥 prevents logout flash
    });

    return () => unsubscribe();
  }, []);

  /* ================================
     Demo Session (Optional)
  ================================ */
  useEffect(() => {
    const stored = localStorage.getItem("closepilot_user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.isDemo) {
          setLocalUser(parsed);
        }
      } catch {
        setLocalUser(null);
      }
    }
  }, []);

  /* ================================
     Logout
  ================================ */
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("closepilot_user");
    setLocalUser(null);
    onNavigate("landing");
  };

  /* ================================
     Derived User (SAFE)
  ================================ */
  const currentUser = firebaseUser ?? localUser;
  const userEmail = firebaseUser?.email ?? localUser?.email;

  /* ================================
     Prevent Auth Flicker
  ================================ */
  if (authLoading) return null;

  /* ================================
     Nav Links
  ================================ */
  const navLinks: { label: string; page: Page }[] = [
    { label: "Features", page: "features" },
    { label: "Pricing", page: "pricing" },
    { label: "Templates", page: "templates" },
  ];

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

          {/* LOGO */}
          <div
            onClick={() => onNavigate("landing")}
            className="flex items-center gap-3 cursor-pointer group hover:scale-105 transition"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-indigo to-accent-mint flex items-center justify-center shadow-lg group-hover:scale-110 transition">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-white">
              ClosePilot
            </span>
          </div>

          {/* CENTER NAV (DESKTOP) */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.page)}
                className="text-sm font-medium text-gray-300 hover:text-white transition"
              >
                {item.label}
              </button>
            ))}

            {currentUser && (
              <button
                onClick={() => onNavigate("dashboard")}
                className="text-sm font-medium text-gray-300 hover:text-white transition"
              >
                Dashboard
              </button>
            )}
          </div>

          {/* RIGHT ACTIONS (DESKTOP) */}
          <div className="hidden md:flex items-center gap-4">
            {!currentUser ? (
              <>
                <button
                  onClick={() => onNavigate("login")}
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Log In
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
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                    <UserIcon size={14} className="text-accent-indigo" />
                  </div>
                  <span className="text-xs text-gray-400 max-w-[140px] truncate">
                    {userEmail}
                    {localUser?.isDemo && (
                      <span className="ml-1 text-[9px] text-accent-mint border px-1 rounded">
                        DEMO
                      </span>
                    )}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden text-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden absolute top-full w-full bg-navy-900/95 backdrop-blur-lg p-4 flex flex-col gap-4">
          {navLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                onNavigate(item.page);
                setIsOpen(false);
              }}
              className="text-lg text-gray-300 hover:text-white"
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
              className="text-lg text-gray-300 hover:text-white"
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
                className="text-lg text-gray-300 hover:text-white"
              >
                Log In
              </button>
              <Button
                variant="primary"
                className="w-full"
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
              className="text-lg text-red-400 hover:text-red-300"
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
