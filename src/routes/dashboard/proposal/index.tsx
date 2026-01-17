import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, FilePlus, Lightbulb, Wand2, ZapOff } from "lucide-react";

export const Route = createFileRoute("/dashboard/proposal/")({
  component: NewProposalView,
});

const CreationCard = ({
  icon: Icon,
  title,
  desc,
  btnText,
  btnColor,
  onClick,
}: any) => (
  <div
    onClick={onClick}
    className={`p-10 rounded-3xl bg-[#13161F] border border-white/5 hover:border-accent-indigo/30 hover:shadow-[0_0_50px_rgba(93,95,239,0.15)] transition-all duration-700 ease-in-out cursor-pointer group relative overflow-hidden`}
  >
    <div
      className={`absolute top-0 right-0 w-32 h-32 bg-accent-indigo/5 blur-3xl -mr-16 -mt-16 group-hover:bg-accent-indigo/10 transition-all duration-1000`}
    />
    <div
      className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-gray-400 group-hover:scale-110 transition-all duration-500 group-hover:text-white group-hover:border-white/20`}
    >
      <Icon size={28} />
    </div>
    <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors duration-500">
      {title}
    </h3>
    <p className="text-gray-400 text-sm leading-relaxed mb-10">{desc}</p>
    <button
      className={`px-6 py-3 rounded-xl ${btnColor || "bg-accent-indigo"} text-white font-bold text-xs shadow-lg flex items-center gap-2 transition-all duration-500 border border-white/5 hover:border-white/20 group-hover:scale-105 group-hover:shadow-indigo/20`}
    >
      {btnText}{" "}
      <ChevronRight
        size={14}
        className="group-hover:translate-x-1 transition-transform duration-500"
      />
    </button>
  </div>
);

function NewProposalView() {
  const navigate = Route.useNavigate();
  return (
    <div className="p-8 max-w-7xl mx-auto animate-slide-up">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold mb-2">Create New Proposal</h2>
          <p className="text-gray-500 text-sm">
            How would you like to start your next deal?
          </p>
        </div>
        <Link to="/dashboard">
          <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all duration-300 ease-in-out">
            Cancel <ZapOff size={14} />
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CreationCard
          icon={Wand2}
          title="AI Wizard"
          desc="The fastest way to close. Answer a few questions and our AI will generate a tailored, high-converting proposal for you."
          btnText="Launch AI Wizard"
          btnColor="bg-[#3f41a4]"
          color="accent-indigo"
          onClick={() => navigate({ href: "/dashboard/templates" })}
        />
        <CreationCard
          icon={FilePlus}
          title="Start from Scratch"
          desc="Full creative control. Build your proposal block by block using our expert elements and pricing engine."
          btnText="Open Editor"
          btnColor="bg-[#2d7a5f]"
          color="accent-mint"
          path=""
          onClick={() => navigate({ href: "/dashboard/wizard" })}
        />
      </div>

      <div className="p-10 rounded-3xl bg-white/[0.01] border border-white/5 flex flex-col items-center text-center transition-all duration-300 hover:border-white/10 hover:bg-white/[0.02]">
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 text-gray-600">
          <Lightbulb size={24} />
        </div>
        <h4 className="font-bold text-white mb-2">
          Need a different approach?
        </h4>
        <p className="text-sm text-gray-500 max-w-md mb-8">
          You can also import existing PDF proposals to analyze them or convert
          them into reusable blocks.
        </p>
        <button className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 font-bold text-sm hover:bg-white/10 transition-all duration-300 shadow-xl group">
          Launch Action: Import PDF
        </button>
      </div>
    </div>
  );
}
