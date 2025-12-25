import React from 'react';

const SectionHeader: React.FC<{ title: string; subtitle: string; centered?: boolean }> = ({ title, subtitle, centered = true }) => (
  <div className={`mb-16 ${centered ? 'text-center' : 'text-left'} max-w-3xl mx-auto px-4`}>
    <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight mb-6">
      {title}
    </h2>
    <p className="text-lg text-gray-400 leading-relaxed">
      {subtitle}
    </p>
  </div>
);

export default SectionHeader;