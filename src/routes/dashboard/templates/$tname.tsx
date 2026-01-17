import { createFileRoute, Link } from "@tanstack/react-router";
import { GoogleGenAI, Type } from "@google/genai";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  DollarSign,
  Loader2,
  Send,
  Sparkles,
  Wand2,
} from "lucide-react";
import { useState } from "react";
import { InputBlock } from "../settings/route";

export const Route = createFileRoute("/dashboard/templates/$tname")({
  component: RouteComponent,
});

const BlockLink = ({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: any;
  label: string;
  active?: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ease-in-out ${active ? "bg-accent-indigo/10 text-white border border-accent-indigo/20" : "text-gray-500 hover:text-white hover:bg-white/5"}`}
  >
    <Icon
      size={16}
      className={`transition-transform duration-300 ${active ? "text-accent-indigo scale-110" : "group-hover:scale-110"}`}
    />
    <span className="text-xs font-medium">{label}</span>
  </button>
);

function RouteComponent() {
  const { tname } = Route.useParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState<"input" | "result">("input");
  const [activeBlock, setActiveBlock] = useState<string>("summary");
  const [formData, setFormData] = useState<Record<string, string>>({
    clientName: "",
  });

  const handleGenerate = async () => {
    if (!formData.clientName) return;
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Generate a professional proposal for "${formData.clientName}" in the category. Details: ${JSON.stringify(formData)}`;
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              strategy: { type: Type.STRING },
              price: { type: Type.STRING },
              insight: { type: Type.STRING },
            },
            required: ["summary", "strategy", "price", "insight"],
          },
        },
      });
      const result = JSON.parse(response.text || "{}");
      setFormData((prev) => ({
        ...prev,
        summary_content: result.summary,
        strategy_content: result.strategy,
        price: result.price,
        ai_insight: result.insight,
      }));
      setStep("result");
    } catch (err) {
      console.error(err);
      setStep("result");
    } finally {
      setIsGenerating(false);
    }
  };

  if (step === "result") {
    return (
      <div className="h-full flex flex-col animate-slide-up bg-[#0B0F19]">
        <div className="px-8 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setStep("input")}
              className="p-2 hover:bg-white/5 rounded-lg text-gray-400 transition-all duration-300 hover:text-white"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="font-bold">label Proposal</h2>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-2 rounded-xl bg-accent-indigo text-white text-sm font-bold shadow-lg shadow-accent-indigo/20 transition-all duration-300 hover:scale-105">
              <Send size={16} /> Send to Client
            </button>
          </div>
        </div>
        <div className="flex-1 flex overflow-hidden">
          <aside className="w-80 border-r border-white/5 bg-[#0B0F19] p-6 space-y-6 overflow-y-auto custom-scrollbar">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Editor Blocks
            </h3>
            <div className="space-y-2">
              <BlockLink
                active={activeBlock === "summary"}
                icon={Wand2}
                label="Executive Summary"
                onClick={() => setActiveBlock("summary")}
              />
              <BlockLink
                active={activeBlock === "strategy"}
                icon={Calendar}
                label="Strategy"
                onClick={() => setActiveBlock("strategy")}
              />
              <BlockLink
                active={activeBlock === "pricing"}
                icon={DollarSign}
                label="Pricing"
                onClick={() => setActiveBlock("pricing")}
              />
            </div>
            <div className="p-4 rounded-xl bg-accent-indigo/5 border border-accent-indigo/10 transition-all duration-300 hover:bg-accent-indigo/10">
              <p className="text-xs text-accent-indigo font-bold mb-2 flex items-center gap-2">
                <Sparkles size={14} className="animate-pulse" /> AI Copilot
              </p>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                {formData.ai_insight ||
                  "I've optimized this section for high conversion."}
              </p>
            </div>
          </aside>
          <div className="flex-1 bg-white/[0.01] p-12 overflow-y-auto flex justify-center">
            <div className="w-full max-w-3xl bg-white p-12 md:p-16 text-navy-900 shadow-2xl min-h-[1000px] rounded-sm transition-all duration-500">
              <h1 className="text-4xl font-display font-extrabold mb-8">
                Proposal for {formData.clientName}
              </h1>
              <div className="space-y-10">
                <section>
                  <h2 className="text-xl font-bold text-accent-indigo border-b mb-4 pb-2">
                    Summary
                  </h2>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {formData.summary_content}
                  </p>
                </section>
                <section>
                  <h2 className="text-xl font-bold text-accent-indigo border-b mb-4 pb-2">
                    Strategy
                  </h2>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {formData.strategy_content}
                  </p>
                </section>
                <section>
                  <div className="p-8 bg-gray-50 rounded-2xl border flex justify-between items-center transition-all duration-300 hover:bg-gray-100 hover:border-gray-300">
                    <span className="font-bold uppercase text-gray-400 tracking-widest text-xs">
                      Total Investment
                    </span>
                    <span className="text-2xl font-black text-navy-900">
                      {formData.price}
                    </span>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto animate-slide-up">
      <div className="flex items-center gap-4 mb-12">
        <Link to="/dashboard/templates">
          <button className="p-2.5 hover:bg-white/5 rounded-xl text-gray-400 transition-all duration-300 hover:text-white hover:scale-110">
            <ArrowLeft />
          </button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold">{tname} Wizard</h2>
          <p className="text-sm text-gray-500 mt-1">description</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <InputBlock
            label="Client Name"
            placeholder="e.g. Acme Corp"
            value={formData.clientName}
            onChange={(v: string) =>
              setFormData({ ...formData, clientName: v })
            }
          />
          {/*{config.fields.map((f) => (
            <div key={f.name} className="space-y-2 group">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1 transition-colors duration-300 group-focus-within:text-accent-indigo">
                {f.label}
              </label>
              {f.type === "textarea" ? (
                <textarea
                  rows={4}
                  className="w-full bg-[#13161F] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-indigo/50 focus:ring-1 focus:ring-accent-indigo/20 transition-all duration-300 placeholder:text-gray-600 hover:border-white/10"
                  placeholder={f.placeholder}
                  onChange={(e) =>
                    setFormData({ ...formData, [f.name]: e.target.value })
                  }
                />
              ) : f.type === "select" ? (
                <select
                  className="w-full bg-[#13161F] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-indigo/50 focus:ring-1 focus:ring-accent-indigo/20 transition-all duration-300 cursor-pointer hover:border-white/10"
                  onChange={(e) =>
                    setFormData({ ...formData, [f.name]: e.target.value })
                  }
                >
                  <option value="">{f.placeholder}</option>
                  {f.options?.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  className="w-full bg-[#13161F] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-indigo/50 focus:ring-1 focus:ring-accent-indigo/20 transition-all duration-300 placeholder:text-gray-600 hover:border-white/10"
                  placeholder={f.placeholder}
                  onChange={(e) =>
                    setFormData({ ...formData, [f.name]: e.target.value })
                  }
                />
              )}
            </div>
          ))}*/}
        </div>
        <div className="p-8 rounded-3xl bg-gradient-to-br from-accent-indigo/10 to-accent-mint/10 border border-accent-indigo/20 flex flex-col justify-between transition-all duration-500 hover:border-accent-indigo/40 hover:bg-opacity-20">
          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Wand2 className="text-accent-indigo animate-pulse" /> AI
              Generation
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Our model will draft an industry-compliant proposal based on your
              inputs. You can refine everything in the next step.
            </p>
          </div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !formData.clientName}
            className="w-full h-14 bg-accent-indigo rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-xl hover:shadow-accent-indigo/40 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isGenerating ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Generate Proposal{" "}
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
