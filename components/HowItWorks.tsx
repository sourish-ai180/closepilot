import React from 'react';
import SectionHeader from './SectionHeader';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Enter Project Details",
      desc: "Tell Propel about the client, the scope, and your goals. Our AI analyzes the inputs."
    },
    {
      num: "02",
      title: "AI Generates Proposal",
      desc: "Within seconds, get a structured proposal with copy, pricing strategy, and timeline."
    },
    {
      num: "03",
      title: "Edit, Export & Close",
      desc: "Tweak the details in our block editor, then send a trackable link to your client."
    }
  ];

  return (
    <section className="py-24 bg-navy-800/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(93,95,239,0.05),transparent_70%)]" />
      <SectionHeader title="From Blank Page to Signed Deal" subtitle="Three simple steps to professional proposals." />

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {steps.map((step, i) => (
          <div key={i} className="relative group">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full border border-accent-indigo/30 bg-navy-900 flex items-center justify-center text-2xl font-bold font-display text-accent-indigo mb-6 shadow-[0_0_20px_rgba(93,95,239,0.2)] group-hover:scale-110 transition-transform duration-500 relative z-10">
                {step.num}
              </div>
              {i !== steps.length - 1 && (
                <div className="hidden md:block absolute top-14 left-1/2 w-full h-[2px] bg-gradient-to-r from-accent-indigo/50 to-transparent -z-0" />
              )}
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-400">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;