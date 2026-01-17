import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Briefcase,
  Code,
  ImageIcon,
  MegaphoneIcon,
  Star,
  Video,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

interface TemplateConfig {
  id: string;
  label: string;
  cat: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  description: string;
  fields: {
    name: string;
    label: string;
    placeholder: string;
    type: "text" | "textarea" | "select";
    options?: string[];
  }[];
}

const TEMPLATE_MAP: Record<string, TemplateConfig> = {
  "social-media": {
    id: "social-media",
    label: "Social Media",
    cat: "Marketing",
    icon: MegaphoneIcon,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    description:
      "Grow your client's online presence with a data-driven content strategy.",
    fields: [
      {
        name: "platform",
        label: "Platforms",
        type: "select",
        options: ["Instagram", "LinkedIn", "TikTok", "Multi-channel"],
        placeholder: "Select",
      },
      {
        name: "goal",
        label: "Campaign Goal",
        type: "text",
        placeholder: "e.g. Brand Awareness, Lead Gen",
      },
      {
        name: "tone",
        label: "Brand Voice",
        type: "text",
        placeholder: "e.g. Professional, Witty, Bold",
      },
      {
        name: "budget",
        label: "Ad Spend Estimate",
        type: "text",
        placeholder: "e.g. $2k - $5k / month",
      },
    ],
  },
  branding: {
    id: "branding",
    label: "Branding",
    cat: "Design",
    icon: ImageIcon,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    description:
      "Establish a unique identity through visual storytelling and logo design.",
    fields: [
      {
        name: "style",
        label: "Visual Style",
        type: "select",
        options: ["Minimalist", "Corporate", "Playful", "Luxury"],
        placeholder: "Select",
      },
      {
        name: "deliverables",
        label: "Main Deliverables",
        type: "textarea",
        placeholder: "Logo, Brand Guidelines, Typography...",
      },
      {
        name: "audience",
        label: "Target Audience",
        type: "text",
        placeholder: "e.g. Tech Founders, Gen Z",
      },
    ],
  },
  "web-dev": {
    id: "web-dev",
    label: "Web Dev",
    cat: "Tech",
    icon: Code,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    description:
      "Build high-performance web applications with modern tech stacks.",
    fields: [
      {
        name: "platform",
        label: "Tech Stack",
        type: "select",
        options: ["React/Next.js", "WordPress", "Shopify", "Webflow"],
        placeholder: "Select",
      },
      {
        name: "pages",
        label: "Number of Pages",
        type: "text",
        placeholder: "e.g. 5-10 pages",
      },
      {
        name: "features",
        label: "Custom Features",
        type: "textarea",
        placeholder: "E-commerce, User Auth, CMS Integration...",
      },
    ],
  },
  video: {
    id: "video",
    label: "Video",
    cat: "Creative",
    icon: Video,
    color: "text-pink-400",
    bg: "bg-pink-400/10",
    description: "Tell compelling stories with high-quality video production.",
    fields: [
      {
        name: "type",
        label: "Video Type",
        type: "select",
        options: ["Explainer", "Short-form Social", "Brand Doc", "Commercial"],
        placeholder: "Select",
      },
      {
        name: "duration",
        label: "Expected Duration",
        type: "text",
        placeholder: "e.g. 60-90 seconds",
      },
      {
        name: "style",
        label: "Video Style",
        type: "text",
        placeholder: "e.g. Animated, Live Action",
      },
    ],
  },
  consulting: {
    id: "consulting",
    label: "Consulting",
    cat: "Ops",
    icon: Briefcase,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    description:
      "Optimize business operations and strategic growth frameworks.",
    fields: [
      {
        name: "focus",
        label: "Focus Area",
        type: "select",
        options: ["Operations", "Sales Funnel", "HR/Hiring", "Scale Strategy"],
        placeholder: "Select",
      },
      {
        name: "duration",
        label: "Engagement length",
        type: "text",
        placeholder: "e.g. 3 Months Retainer",
      },
      {
        name: "outcome",
        label: "Desired Outcome",
        type: "textarea",
        placeholder: "What does success look like?",
      },
    ],
  },
  custom: {
    id: "custom",
    label: "Custom",
    cat: "New",
    icon: Star,
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
    description: "Generate a proposal for any unique service or industry.",
    fields: [
      {
        name: "prompt",
        label: "Detailed Description",
        type: "textarea",
        placeholder:
          "Describe the project scope, client, and deliverables in detail...",
      },
    ],
  },
};

export const Route = createFileRoute("/dashboard/templates/")({
  component: TemplatesLibraryView,
});

function TemplatesLibraryView() {
  const categories = [
    "All",
    "Marketing",
    "Design",
    "Tech",
    "Creative",
    "Ops",
    "New",
  ];
  const [activeCat, setActiveCat] = useState("All");

  return (
    <div className="p-8 max-w-7xl mx-auto animate-slide-up">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-2">Proposal Library</h2>
          <p className="text-gray-500 text-sm">
            Choose from high-converting structures verified by industry experts.
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 border ${activeCat === cat ? "bg-accent-indigo border-accent-indigo text-white shadow-lg shadow-accent-indigo/10" : "bg-white/5 border-white/5 text-gray-500 hover:border-white/10 hover:text-gray-300"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(TEMPLATE_MAP)
          .filter((t) => activeCat === "All" || t.cat === activeCat)
          .map((t) => (
            <Link
              key={t.id}
              to={`/dashboard/templates/$tname`}
              params={{
                tname: t.label,
              }}
            >
              <div className="glass p-8 rounded-3xl border border-white/5 hover:border-accent-indigo/30 hover:bg-white/[0.04] transition-all duration-300 ease-in-out group flex flex-col justify-between">
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl ${t.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${t.color}`}
                  >
                    <t.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors duration-300">
                    {t.label}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-8">
                    {t.description}
                  </p>
                </div>
                <button
                  // onClick={() => onUseTemplate(t.id)}
                  className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-accent-indigo hover:text-white hover:border-accent-indigo transition-all duration-300"
                >
                  Use this template
                </button>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
