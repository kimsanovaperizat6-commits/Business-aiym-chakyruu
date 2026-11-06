import React from 'react';

export const BackgroundAmbient: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white">
      {/* Pure White Background */}
      <div className="absolute inset-0 bg-white" />

      {/* Subtle modern minimalist geometric framing */}
      <div className="absolute inset-4 md:inset-8 border border-black/[0.06] pointer-events-none" />
      <div className="absolute inset-6 md:inset-10 border border-black/[0.03] pointer-events-none" />

      {/* Subtle corner framing accents */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 w-4 h-4 border-t-2 border-l-2 border-black/20" />
      <div className="absolute top-4 right-4 md:top-8 md:right-8 w-4 h-4 border-t-2 border-r-2 border-black/20" />
      <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-4 h-4 border-b-2 border-l-2 border-black/20" />
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-4 h-4 border-b-2 border-r-2 border-black/20" />
    </div>
  );
};
