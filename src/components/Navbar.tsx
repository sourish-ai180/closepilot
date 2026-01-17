import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles, LogOut } from "lucide-react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "@/firebase";
import Button from "./Button";
import { Link, useNavigate } from "@tanstack/react-router";

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
  | "careers"
  | "contact"
  | "privacy"
  | "terms"
  | "cookie"
  | "showcase";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

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
    navigate({ to: "/" });
  };

  const navLinks: { label: string; to: string }[] = [
    { label: "Features", to: "/features" },
    { label: "Pricing", to: "/pricing" },
    { label: "Templates", to: "/templates" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-900/80 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 cursor-pointer group transition-transform duration-300 hover:scale-105"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-indigo to-accent-mint flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-white group-hover:text-accent-mint transition-colors">
              ClosePilot
            </span>
          </Link>

          {/* Center Navigation (Desktop) */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="relative group text-sm font-medium text-gray-300 hover:text-white transition-colors"
                activeProps={{ className: "text-white" }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-indigo to-accent-mint group-hover:w-full transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100" />
              </Link>
            ))}

            {user && (
              <Link
                to="/dashboard"
                className="relative group text-sm font-medium text-gray-300 hover:text-white transition-colors"
                activeProps={{ className: "text-white" }}
              >
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-indigo to-accent-mint group-hover:w-full transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100" />
              </Link>
            )}
          </div>

          {/* Right Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="relative group text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  Log In
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-indigo to-accent-mint group-hover:w-full transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100" />
                </Link>

                <Link to="/signup">
                  <Button
                    variant="primary"
                    className="!py-2 !px-4 !text-sm hover:scale-105 transition-transform"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="relative group flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                <LogOut size={16} />
                Logout
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100" />
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
        <div className="md:hidden absolute top-full left-0 w-full bg-navy-900/95 backdrop-blur-lg border-b border-white/10 p-4 space-y-4 animate-slide-up shadow-2xl">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className="block text-lg text-gray-300 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}

          {user && (
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="block text-lg text-gray-300 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
          )}

          <hr className="border-white/10" />

          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block text-lg text-gray-300 hover:text-white transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="block w-full"
                onClick={() => setIsOpen(false)}
              >
                <Button variant="primary" className="w-full justify-center">
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-lg text-red-400 hover:text-red-300 transition-colors"
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
