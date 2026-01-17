import React, { useState } from "react";
import { Sparkles, ArrowLeft, Chrome, ShieldAlert, Zap, Loader2, Globe, ExternalLink } from "lucide-react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { auth } from "./firebase";
import Button from "./components/Button";
import { useNavigate, Link } from "@tanstack/react-router";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuthSuccess = (user: any) => {
    const userData = {
      email: user.email,
      name: user.displayName || user.email.split('@')[0],
      plan: 'pro',
      uid: user.uid,
      photoURL: user.photoURL,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('closepilot_user', JSON.stringify(userData));
    window.dispatchEvent(new Event('storage'));
    navigate({ to: '/dashboard' });
  };

  const handleDemoLogin = () => {
    const userData = {
      email: email || "demo@closepilot.io",
      name: (email && email.split('@')[0]) || "Demo User",
      plan: "pro",
      isDemo: true,
      uid: "demo-user-123",
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('closepilot_user', JSON.stringify(userData));
    window.dispatchEvent(new Event('storage'));
    navigate({ to: '/dashboard' });
  };

  const handleSocialError = (err: any, providerName: string) => {
    console.error(`${providerName} Auth Error:`, err);
    if (err.code === 'auth/unauthorized-domain') {
      setError(`Domain "${window.location.hostname}" is not authorized in Firebase. Add it to: Firebase Console > Authentication > Settings > Authorized domains.`);
    } else if (err.code === 'auth/operation-not-allowed') {
      setError(`${providerName} login is not enabled in your Firebase project. Please enable it in the Firebase Console.`);
    } else if (err.code === 'auth/popup-blocked') {
      setError("Pop-up was blocked by your browser. Please allow pop-ups for this site.");
    } else {
      setError(`${providerName} sign-in failed. Please try again or use Demo Mode.`);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setSocialLoading("google");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      handleAuthSuccess(result.user);
    } catch (err: any) {
      handleSocialError(err, "Google");
    } finally {
      setSocialLoading(null);
    }
  };

  const handleMicrosoftLogin = async () => {
    setError("");
    setSocialLoading("microsoft");
    try {
      const provider = new OAuthProvider('microsoft.com');
      const result = await signInWithPopup(auth, provider);
      handleAuthSuccess(result.user);
    } catch (err: any) {
      handleSocialError(err, "Microsoft");
    } finally {
      setSocialLoading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      handleAuthSuccess(userCredential.user);
    } catch (err: any) {
      console.error("Auth Error:", err.code);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError("Invalid credentials. Use Demo Mode to explore the platform without an account.");
      } else if (err.code === 'auth/too-many-requests') {
        setError("Too many failed attempts. Try again later or continue with Demo Mode.");
      } else {
        setError("Authentication failed. Use Demo Mode if the service is restricted in your environment.");
      }
    } finally {
      setLoading(false);
    }
  };

  const isDomainError = error.includes("authorized in Firebase");

  return (
    <div className="min-h-screen bg-navy-900 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent-indigo/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-accent-mint/5 blur-[120px] rounded-full pointer-events-none" />

      <Link
        to="/"
        className="absolute top-8 left-8 text-gray-400 hover:text-white flex items-center gap-2 transition-all group"
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
            Welcome back
          </h1>
          <p className="text-gray-400">Log in to your ClosePilot account</p>
        </div>

        <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl relative">
          {error && (
            <div className={`mb-6 p-4 rounded-xl border text-sm ${isDomainError ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
              <div className="flex items-start gap-3 mb-4">
                {isDomainError ? <Globe className="w-5 h-5 shrink-0 mt-0.5" /> : <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />}
                <div className="space-y-2">
                  <span className="font-bold leading-relaxed">{isDomainError ? "Configuration Required" : "Authentication Error"}</span>
                  <p className="text-xs opacity-80 leading-relaxed">{error}</p>
                </div>
              </div>

              <div className="grid gap-2">
                <button
                  onClick={handleDemoLogin}
                  className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${isDomainError ? 'bg-accent-indigo text-white hover:bg-accent-purple shadow-accent-indigo/20' : 'bg-red-500 text-white hover:bg-red-600 shadow-red-500/20'}`}
                >
                  <Zap className="w-3.5 h-3.5" /> Continue via Demo Mode
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
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@company.com"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-accent-indigo/50 focus:ring-1 focus:ring-accent-indigo/50 transition-all placeholder:text-gray-600"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Password</label>
                <button type="button" className="text-[10px] text-accent-indigo font-bold hover:text-accent-mint transition-colors tracking-widest uppercase">Forgot?</button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-accent-indigo/50 focus:ring-1 focus:ring-accent-indigo/50 transition-all placeholder:text-gray-600"
              />
            </div>

            <Button
              variant="primary"
              type="submit"
              disabled={loading || !!socialLoading}
              className="w-full py-4 mt-2"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
              <span className="bg-navy-900 px-3 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleGoogleLogin}
              disabled={loading || !!socialLoading}
              className="bg-white/5 border border-white/10 hover:bg-white/10 py-3 rounded-xl text-xs font-bold flex justify-center items-center gap-2 transition-all group disabled:opacity-50"
            >
              {socialLoading === 'google' ? <Loader2 className="w-4 h-4 animate-spin text-accent-indigo" /> : <Chrome className="w-4 h-4" />}
              Google
            </button>
            <button
              onClick={handleMicrosoftLogin}
              disabled={loading || !!socialLoading}
              className="bg-white/5 border border-white/10 hover:bg-white/10 py-3 rounded-xl text-xs font-bold flex justify-center items-center gap-2 transition-all group disabled:opacity-50"
            >
              {socialLoading === 'microsoft' ? (
                <Loader2 className="w-4 h-4 animate-spin text-accent-indigo" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
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
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-accent-indigo font-bold hover:text-accent-mint transition-colors underline underline-offset-4"
          >
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;