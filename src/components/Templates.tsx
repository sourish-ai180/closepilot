import React from "react";
import { ChevronRight } from "lucide-react";
import SectionHeader from "./SectionHeader";

const Templates: React.FC = () => {
  const templates = [
    {
      name: "Social Media Strategy",
      cat: "Marketing",
      color: "from-blue-500 to-cyan-400",
      image:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Brand Identity Design",
      cat: "Design",
      color: "from-purple-500 to-pink-500",
      image:
        "https://images.unsplash.com/photo-1633533446213-a438ff5f0629?q=80&w=714&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Custom Web Development",
      cat: "Development",
      color: "from-emerald-500 to-teal-400",
      image:
        "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Real Estate Photography",
      cat: "Creative",
      color: "from-orange-500 to-amber-400",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Video Editing Services",
      cat: "Production",
      color: "from-red-500 to-rose-400",
      image:
        "https://images.unsplash.com/photo-1502209877429-d7c6df9eb3f9?q=80&w=1466&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "UGC Creator Creation",
      cat: "Content",
      color: "from-pink-500 to-fuchsia-400",
      image:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section id="templates" className="py-24 overflow-hidden">
      <SectionHeader
        title="Start with a Pro Template"
        subtitle="Don't reinvent the wheel. Choose from our library of high-converting structures."
      />

      <div className="flex overflow-x-auto pb-12 gap-6 px-4 md:px-8 max-w-[100vw] scrollbar-hide snap-x">
        {templates.map((t, i) => (
          <div
            key={i}
            className="snap-center shrink-0 w-[300px] md:w-[350px] aspect-[4/5] glass rounded-2xl relative group overflow-hidden cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-500 shadow-xl"
          >
            {/* Image Background */}
            <div className="absolute inset-0">
              <img
                src={t.image}
                alt={t.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-50"
              />
              <div className="absolute inset-0 bg-navy-900/40 group-hover:bg-navy-900/20 transition-colors duration-500" />
            </div>

            {/* Color Overlay Effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${t.color} opacity-20 group-hover:opacity-30 mix-blend-overlay transition-opacity duration-500`}
            />

            {/* Category Badge */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-navy-900/60 backdrop-blur-md text-xs font-medium border border-white/10 text-white z-10 shadow-lg">
              {t.cat}
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-navy-900 via-navy-900/90 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-10">
              <h3 className="text-xl font-bold mb-2 text-white drop-shadow-md">
                {t.name}
              </h3>
              <div className="flex items-center text-accent-indigo font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 delay-75">
                Preview Template <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Templates;
