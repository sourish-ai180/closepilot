import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import {
  Sparkles,
  ArrowLeft,
  Chrome,
  AlertCircle,
  LogIn,
  Zap,
  Loader2,
  Globe,
  ExternalLink,
} from "lucide-react";
import Button from "@/components/Button";

// Firebase imports
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { useNavigate, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/signup/")({
  component: SignupPage,
});

function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [emailInUse, setEmailInUse] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAuthSuccess = async (user: any) => {
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          name:
            user.displayName || `${formData.firstName} ${formData.lastName}`,
          email: user.email,
          plan: "free",
          createdAt: serverTimestamp(),
        },
        { merge: true },
      );

      localStorage.setItem(
        "closepilot_user",
        JSON.stringify({
          email: user.email,
          name:
            user.displayName ||
            `${formData.firstName} ${formData.lastName}` ||
            user.email.split("@")[0],
          plan: "free",
        }),
      );
      window.dispatchEvent(new Event("storage"));
      navigate({ to: "/dashboard" });
    } catch (err) {
      console.error(
        "Firestore sync failed, but proceeding with local storage",
        err,
      );
      localStorage.setItem(
        "closepilot_user",
        JSON.stringify({
          email: user.email,
          name: user.displayName,
          plan: "free",
        }),
      );
      window.dispatchEvent(new Event("storage"));
      navigate({ to: "/dashboard" });
    }
  };

  const handleDemoMode = () => {
    const userData = {
      email: formData.email || "guest@closepilot.io",
      name: formData.firstName
        ? `${formData.firstName} ${formData.lastName}`
        : "Guest Pilot",
      plan: "pro",
      isDemo: true,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("closepilot_user", JSON.stringify(userData));
    window.dispatchEvent(new Event("storage"));
    navigate({ to: "/dashboard" });
  };

  const handleSocialError = (err: any, providerName: string) => {
    console.error(`${providerName} Signup Error:`, err);
    if (err.code === "auth/unauthorized-domain") {
      setError(
        `Domain "${window.location.hostname}" is not authorized in Firebase. Add it to: Firebase Console > Authentication > Settings > Authorized domains.`,
      );
    } else if (err.code === "auth/operation-not-allowed") {
      setError(
        `${providerName} signup is not enabled in your Firebase project. Please enable it in the Firebase Console.`,
      );
    } else if (err.code === "auth/popup-blocked") {
      setError(
        "Pop-up was blocked. Please enable pop-ups for this domain to sign up.",
      );
    } else {
      setError(
        `${providerName} signup failed. Please try another method or use Demo Mode.`,
      );
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setSocialLoading("google");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await handleAuthSuccess(result.user);
    } catch (err: any) {
      handleSocialError(err, "Google");
    } finally {
      setSocialLoading(null);
    }
  };

  const handleMicrosoftSignup = async () => {
    setError("");
    setSocialLoading("microsoft");
    try {
      const provider = new OAuthProvider("microsoft.com");
      const result = await signInWithPopup(auth, provider);
      await handleAuthSuccess(result.user);
    } catch (err: any) {
      handleSocialError(err, "Microsoft");
    } finally {
      setSocialLoading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmailInUse(false);
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      await handleAuthSuccess(userCredential.user);
    } catch (err: any) {
      console.error(err);
      if (
        err.message.includes("email-already-in-use") ||
        err.code === "auth/email-already-in-use"
      ) {
        setError("This email is already registered. Want to log in instead?");
        setEmailInUse(true);
      } else {
        setError(
          "Account creation failed. Use Demo Mode to explore the platform features.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const isDomainError = error.includes("authorized in Firebase");

  return (
    <div className="min-h-screen bg-navy-900 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-accent-purple/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent-indigo/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Back to Home */}
      <Link
        to="/"
        className="absolute top-8 left-8 text-gray-400 hover:text-white flex items-center gap-2 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      <div className="w-full max-w-md animate-slide-up relative z-10">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-accent-indigo to-accent-mint flex items-center justify-center mb-4 shadow-lg shadow-accent-indigo/20">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2 leading-tight">
            Create your account
          </h1>
          <p className="text-gray-400">
            Start building smarter proposals today
          </p>
        </div>

        <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl">
          {error && (
            <div
              className={`mb-6 p-4 rounded-xl border text-sm flex flex-col gap-3 ${emailInUse ? "bg-accent-indigo/10 border-accent-indigo/20 text-accent-indigo" : isDomainError ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}
            >
              <div className="flex items-start gap-3">
                {isDomainError ? (
                  <Globe className="w-5 h-5 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <span className="font-bold leading-relaxed">
                    {isDomainError ? "Setup Required" : "Something went wrong"}
                  </span>
                  <p className="text-xs opacity-80">{error}</p>
                </div>
              </div>

              <div className="grid gap-2">
                {emailInUse ? (
                  <Link
                    to="/login"
                    className="w-full py-2.5 bg-accent-indigo text-white rounded-lg text-xs font-bold hover:bg-accent-purple transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent-indigo/20"
                  >
                    <LogIn className="w-4 h-4" /> Go to Login
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={handleDemoMode}
                      className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${isDomainError ? "bg-accent-indigo text-white hover:bg-accent-purple shadow-accent-indigo/20" : "bg-white/10 hover:bg-white/20 border border-white/10"}`}
                    >
                      <Zap className="w-3.5 h-3.5 text-accent-mint" /> Explore
                      as Guest (Demo)
                    </button>
                    {isDomainError && (
                      <a
                        href="https://console.firebase.google.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                      >
                        Firebase Console <ExternalLink size={10} />
                      </a>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                  First Name
                </label>
                <input
                  name="firstName"
                  placeholder="Jane"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent-indigo/50 transition-all placeholder:text-gray-600"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                  Last Name
                </label>
                <input
                  name="lastName"
                  placeholder="Doe"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent-indigo/50 transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                Work Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="jane@company.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent-indigo/50 transition-all placeholder:text-gray-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent-indigo/50 transition-all placeholder:text-gray-600"
              />
            </div>

            <Button
              variant="primary"
              type="submit"
              disabled={loading || !!socialLoading}
              className="w-full py-4 mt-2"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
              <span className="bg-[#0B0F19] px-3 text-gray-500">
                Or join with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleGoogleSignup}
              disabled={loading || !!socialLoading}
              className="bg-white/5 border border-white/10 hover:bg-white/10 py-3 rounded-xl text-xs font-bold flex justify-center items-center gap-2 transition-all disabled:opacity-50"
            >
              {socialLoading === "google" ? (
                <Loader2 className="w-4 h-4 animate-spin text-accent-indigo" />
              ) : (
                <Chrome className="w-4 h-4" />
              )}
              Google
            </button>
            <button
              onClick={handleMicrosoftSignup}
              disabled={loading || !!socialLoading}
              className="bg-white/5 border border-white/10 hover:bg-white/10 py-3 rounded-xl text-xs font-bold flex justify-center items-center gap-2 transition-all disabled:opacity-50"
            >
              {socialLoading === "microsoft" ? (
                <Loader2 className="w-4 h-4 animate-spin text-accent-indigo" />
              ) : (
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 23 23"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="#f3f3f3" d="M0 0h11v11H0z" />
                  <path fill="#f3f3f3" d="M12 0h11v11H12z" />
                  <path fill="#f3f3f3" d="M0 12h11v11H0z" />
                  <path fill="#f3f3f3" d="M12 12h11v11H12z" />
                </svg>
              )}
              Microsoft
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-accent-indigo font-bold hover:text-accent-mint transition-colors underline underline-offset-4"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
