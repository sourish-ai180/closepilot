import { createFileRoute } from "@tanstack/react-router";
import { FileText, MoreHorizontal, Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard/saved_proposals")({
  component: SavedProposalsView,
});

const ActivityRow = ({ title, client, value, status, time, onView }: any) => (
  <tr
    onClick={onView}
    className="group hover:bg-white/2 transition-all duration-300 cursor-pointer border-b border-white/5 last:border-0"
  >
    <td className="px-8 py-5">
      <div className="flex flex-col">
        <span className="font-bold text-white group-hover:text-accent-indigo transition-colors duration-300">
          {title}
        </span>
        <span className="text-[10px] text-gray-500 mt-0.5">{time}</span>
      </div>
    </td>
    <td className="px-8 py-5 text-gray-400 font-medium">{client}</td>
    <td className="px-8 py-5 font-bold text-white">{value}</td>
    <td className="px-8 py-5">
      <span
        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
          status === "Accepted"
            ? "text-accent-mint border-accent-mint/30 bg-accent-mint/5"
            : status === "Sent"
              ? "text-blue-400 border-blue-400/30 bg-blue-400/5"
              : "text-gray-500 border-white/10 bg-white/5"
        }`}
      >
        {status}
      </span>
    </td>
    <td className="px-8 py-5 text-right">
      <div className="flex justify-end gap-2">
        <button className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all duration-300">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </td>
  </tr>
);

function SavedProposalsView() {
  return (
    <div className="p-8 max-w-6xl mx-auto animate-slide-up">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-2">Saved Proposals</h2>
          <p className="text-gray-500 text-sm">
            Manage your archive of sent and draft proposals.
          </p>
        </div>
        <button
          // onClick={onNew}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-indigo text-white font-bold text-sm hover:shadow-xl hover:shadow-accent-indigo/10 transition-all duration-300 hover:scale-[1.02]"
        >
          <Plus size={18} /> Launch Action: Create New
        </button>
      </div>

      {/*{proposals.length > 0 ? (
        <div classname="rounded-3xl border border-white/5 bg-[#13161f] overflow-hidden transition-all duration-300 shadow-2xl">
          <table classname="w-full text-left">
            <thead>
              <tr classname="text-[10px] text-gray-500 uppercase tracking-widest border-b border-white/5 bg-white/[0.01]">
                <th classname="px-8 py-5">project name</th>
                <th classname="px-8 py-5">client</th>
                <th classname="px-8 py-5">value</th>
                <th classname="px-8 py-5">status</th>
                <th classname="px-8 py-5 text-right">actions</th>
              </tr>
            </thead>
            <tbody classname="divide-y divide-white/5 text-sm">
              {proposals.map((p: any) => (
                <activityrow
                  key={p.id}
                  title={p.title}
                  client={p.client}
                  value={p.value}
                  status={p.status}
                  time={p.time}
                  onview={() => onview(p)}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
      )}*/}
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-gray-600 transition-all duration-300 hover:scale-110 hover:border-accent-indigo/30">
          <FileText size={40} />
        </div>
        <h3 className="text-xl font-bold mb-2">No proposals yet</h3>
        <button
          // onClick={onNew}
          className="px-8 py-3 rounded-xl bg-white text-navy-900 font-bold hover:bg-gray-200 transition-all duration-300 shadow-xl hover:scale-105"
        >
          Launch Action: Create First Draft
        </button>
      </div>
    </div>
  );
}
