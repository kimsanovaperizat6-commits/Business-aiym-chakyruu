import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface FinalScreenProps {
  currentLang: Language;
}

export const FinalScreen: React.FC<FinalScreenProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <footer className="relative pt-16 pb-24 overflow-hidden border-t border-black/10 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Animated Association Original Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="relative inline-block mb-8"
        >
          {/* Subtle spinning outer ring */}
          <div className="absolute -inset-4 rounded-3xl border border-dashed border-black/20 animate-[spin_40s_linear_infinite]" />
          <div className="p-5 sm:p-7 rounded-2xl bg-white border border-black/15 shadow-sm">
            <img
              src="/assets/aistudio/image_c8f68189.png"
              alt="Кыргызстан Ишкер Айымдар Ассоциациясы"
              className="h-16 sm:h-22 w-auto object-contain"
            />
          </div>
        </motion.div>

        {/* Final Farewell Heading in Solid Black */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4 max-w-2xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-black tracking-wide leading-tight">
            {t.seeYouSoon}
          </h2>

          <p className="text-sm sm:text-base font-serif italic text-black font-semibold">
            {currentLang === 'kg'
              ? 'Кыргызстандын ишкер айымдарынын жана бизнес лидерлеринин жолугушуусу'
              : 'Встреча деловых лидеров и женщин-предпринимателей Кыргызстана'}
          </p>
        </motion.div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-3 my-10 text-black/40">
          <div className="h-[1px] w-20 bg-black/20" />
          <div className="w-2 h-2 rotate-45 border border-black" />
          <div className="h-[1px] w-20 bg-black/20" />
        </div>

        {/* Quiet Editorial Footer */}
        <div className="text-xs text-black space-y-1 font-medium">
          <p className="tracking-widest uppercase font-extrabold text-black">
            AIYM BUSINESS–2026
          </p>
          <p className="text-black/80 font-semibold">
            Кыргызстан Ишкер Айымдар Ассоциациясы • Hyatt Regency Bishkek
          </p>
        </div>

      </div>
    </footer>
  );
};
