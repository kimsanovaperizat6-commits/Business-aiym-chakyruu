import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, MapPin } from 'lucide-react';

export const FloatingContactWidget: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const items = [
    {
      id: 'instagram',
      label: 'Instagram',
      sublabel: 'AIYM BUSINESS',
      href: 'https://www.instagram.com/p/DfXHhaEoANm/?obrf=MTF6bW9ibjdkcnVoYQ==',
      isExternal: true,
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-[#0d382e] group-hover:text-[#b88e38] transition-colors"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
      accentColor: 'from-[#0d382e] to-[#b88e38]'
    },
    {
      id: 'phone',
      label: '+996 504 909 121',
      sublabel: 'Звонок в оргкомитет',
      href: 'tel:+996504909121',
      isExternal: false,
      icon: (
        <Phone className="w-5 h-5 text-[#0d382e] group-hover:text-[#b88e38] transition-colors" />
      ),
      accentColor: 'from-[#0d382e] to-[#0a2e26]'
    },
    {
      id: 'address',
      label: 'Hyatt Regency Bishkek',
      sublabel: 'Зал «Шайыр», Абдрахманова 191',
      href: 'https://www.google.com/maps/search/?api=1&query=Hyatt+Regency+Bishkek,+191+Yusup+Abdrakhmanov+St,+Bishkek',
      isExternal: true,
      icon: (
        <MapPin className="w-5 h-5 text-[#0d382e] group-hover:text-[#b88e38] transition-colors" />
      ),
      accentColor: 'from-[#b88e38] to-[#0d382e]'
    }
  ];

  return (
    <aside
      aria-label="Байланыш жана навигация / Контакты"
      className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3.5 sm:gap-4 select-none"
    >
      {items.map((item, idx) => {
        // Staggered orbital circular path parameters for each icon
        const orbitDelay = idx * 1.6;
        const spinDuration = 14 + idx * 2; // slow, continuous, non-intrusive rotation

        return (
          <div
            key={item.id}
            className="relative flex items-center justify-end"
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* Elegant Tooltip on the left of each icon */}
            <div
              className={`absolute right-full mr-3.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#0d382e]/15 shadow-[0_6px_25px_rgba(13,56,46,0.12)] whitespace-nowrap pointer-events-none transition-all duration-300 transform ${
                hoveredIdx === idx
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-2'
              }`}
            >
              <p className="text-xs font-display font-bold text-black tracking-wide">
                {item.label}
              </p>
              <p className="text-[10px] text-[#0d382e] font-medium font-sans">
                {item.sublabel}
              </p>
            </div>

            {/* Circular Orbiting Floating Container */}
            <motion.div
              animate={{
                x: [0, 2.5, 0, -2.5, 0],
                y: [-2.5, 0, 2.5, 0, -2.5]
              }}
              transition={{
                duration: 6 + idx,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: orbitDelay
              }}
              className="relative"
            >
              {/* Outer Continuously Rotating Ring with Delicate Turquoise & Gold Accents */}
              <div
                style={{ animationDuration: `${spinDuration}s` }}
                className="absolute -inset-1.5 rounded-full border border-dashed border-[#b88e38]/40 animate-[spin_linear_infinite] pointer-events-none"
              />

              {/* Secondary Soft Glow Ring */}
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-[#0d382e]/15 via-transparent to-[#b88e38]/20 blur-[2px] pointer-events-none" />

              {/* Main Interactive Button Link */}
              <a
                href={item.href}
                target={item.isExternal ? '_blank' : undefined}
                rel={item.isExternal ? 'noopener noreferrer' : undefined}
                aria-label={item.label}
                className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-[#0d382e]/20 hover:border-[#b88e38] shadow-[0_4px_18px_rgba(13,56,46,0.1)] hover:shadow-[0_0_22px_rgba(184,142,56,0.35)] transform hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Subtle soft turquoise light ring inside */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-[#0d382e]/[0.04] opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Ambient Icon Rotation along its axis on hover or gentle breath */}
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 28 + idx * 4,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  className="relative z-10 flex items-center justify-center"
                >
                  {item.icon}
                </motion.div>

                {/* Subtle golden corner dot indicator */}
                <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#b88e38]/60 group-hover:bg-[#b88e38] transition-colors" />
              </a>
            </motion.div>
          </div>
        );
      })}
    </aside>
  );
};
