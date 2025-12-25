import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles, LogOut } from "lucide-react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../firebase";
import Button from "./Button";

/* ROUTES */
export type Page =
  | "landing"
  | "features"
  | "pricing"
  | "templates"
  | "dashboard"
  | "login"
  | "signup"
  | "about"
  | "blog"
  | "contact"
  | "privacy"
  | "terms";

interface NavbarProps {
  onNavigate: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  /* Scroll effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Firebase auth listener */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    onNavigate("landing");
  };

  const navLinks = [
    { label: "Features", page: "features" as Page },
    { label: "Pricing", page: "pricing" as Page },
    { label: "Templates", page: "templates" as Page },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all ${
        scrolled
          ? "bg-navy-900/80 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate("landing")}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-indigo to-accent-mint flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">ClosePilot</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.page)}
                className="text-sm text-gray-300 hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <button
                  onClick={() => onNavigate("login")}
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Log In
                </button>
                <Button
                  variant="primary"
                  onClick={() => onNavigate("signup")}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
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
        <div className="md:hidden bg-navy-900/95 p-4 space-y-4">
          {navLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                onNavigate(item.page);
                setIsOpen(false);
              }}
              className="block text-gray-300"
            >
              {item.label}
            </button>
          ))}

          <hr className="border-white/10" />

          {!user ? (
            <>
              <button
                onClick={() => {
                  onNavigate("login");
                  setIsOpen(false);
                }}
                className="block text-gray-300"
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
              className="flex items-center gap-2 text-red-400"
            >
              <LogOut size={16} />
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
