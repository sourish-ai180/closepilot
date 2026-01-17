import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import {
  Coffee,
  Globe,
  Heart,
  Rocket,
  Zap,
  ShieldCheck,
  Mail,
} from "lucide-react";

export const Route = createFileRoute("/careers")({
  component: CareersPage,
});

const benefits = [
  {
    icon: Globe,
    title: "100% Remote",
    desc: "Work from anywhere in the world. We value output over office hours.",
  },
  {
    icon: Heart,
    title: "Healthcare",
    desc: "Comprehensive health, dental, and vision coverage for you and your family.",
  },
  {
    icon: Rocket,
    title: "Equity",
    desc: "Generous stock option plans. We want every team member to be an owner.",
  },
  {
    icon: Coffee,
    title: "Stipends",
    desc: "Monthly stipends for co-working spaces, home office gear, and learning.",
  },
];

function CareersPage() {
  return (
    <div className="bg-navy-900 min-h-screen text-white">
      <Navbar />
      <div className="pt-32 pb-20">
        <SectionHeader
          title="Join the Pilot Program"
          subtitle="We are a small, elite team building the future of B2B sales. We're looking for builders, dreamers, and doers."
        />

        {/* Culture Section */}
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 mb-24 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-display">Our Culture</h2>
            <p className="text-gray-400 leading-relaxed">
              At ClosePilot, we don't believe in hierarchy for hierarchy's sake.
              We are a product-led company that moves fast and breaks things—but
              only if we can fix them even faster. We value radical
              transparency, deep focus, and the ability to take extreme
              ownership of your work.
            </p>
            <p className="text-gray-400 leading-relaxed">
              You won't find endless meetings here. Instead, you'll find a
              culture of deep work, asynchronous communication, and a shared
              obsession with building the best proposal software on the planet.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass p-6 rounded-2xl border border-white/5 aspect-square flex flex-col items-center justify-center text-center">
              <Zap className="w-8 h-8 text-accent-indigo mb-4" />
              <h4 className="font-bold">High Velocity</h4>
            </div>
            <div className="glass p-6 rounded-2xl border border-white/5 aspect-square flex flex-col items-center justify-center text-center mt-8">
              <ShieldCheck className="w-8 h-8 text-accent-mint mb-4" />
              <h4 className="font-bold">Trust First</h4>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-navy-800/50 py-20 mb-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold font-display text-center mb-16">
              Why Work With Us?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((b, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <b.icon className="w-6 h-6 text-accent-indigo" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">{b.title}</h4>
                  <p className="text-gray-400 text-sm">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* General Application CTA */}
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass p-12 rounded-[3rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 from-accent-indigo/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative z-10">
              <Mail className="w-12 h-12 text-accent-indigo mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">No Open Positions?</h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                We are always looking for exceptional talent to join our
                mission. If you're a high-performer who wants to build something
                meaningful, we'd love to hear from you.
              </p>
              <a
                href="mailto:careers@closepilot.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-navy-900 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:scale-105"
              >
                Send General Application
              </a>
              <p className="mt-6 text-sm text-gray-500 font-medium">
                Reach us at careers@closepilot.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CareersPage;
