import { createFileRoute } from "@tanstack/react-router";
import { FileText, Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard/saved")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-8 max-w-6xl mx-auto animate-slide-up">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-2">Saved Proposals</h2>
          <p className="text-gray-500 text-sm">
            Manage your archive of sent and draft proposals.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-indigo text-white font-bold text-sm hover:shadow-xl hover:shadow-accent-indigo/10 transition-all duration-300 hover:scale-[1.02]">
          <Plus size={18} /> Launch Action: Create New
        </button>
      </div>

      {/*proposals.length > 0 ? (
        <div className="rounded-3xl border border-white/5 bg-[#13161F] overflow-hidden transition-all duration-300 shadow-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase tracking-widest border-b border-white/5 bg-white/[0.01]">
                <th className="px-8 py-5">Project Name</th>
                <th className="px-8 py-5">Client</th>
                <th className="px-8 py-5">Value</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {proposals.map((p: any) => (
                <ActivityRow
                  key={p.id}
                  title={p.title}
                  client={p.client}
                  value={p.value}
                  status={p.status}
                  time={p.time}
                  onView={() => onView(p)}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
      )*/}
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-gray-600 transition-all duration-300 hover:scale-110 hover:border-accent-indigo/30">
          <FileText size={40} />
        </div>
        <h3 className="text-xl font-bold mb-2">No proposals yet</h3>
        <button className="px-8 py-3 rounded-xl bg-white text-navy-900 font-bold hover:bg-gray-200 transition-all duration-300 shadow-xl hover:scale-105">
          Launch Action: Create First Draft
        </button>
      </div>
    </div>
  );
}
