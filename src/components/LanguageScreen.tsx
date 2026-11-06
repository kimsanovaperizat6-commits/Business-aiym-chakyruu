import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface LanguageScreenProps {
  onSelectLanguage: (lang: Language) => void;
}

export const LanguageScreen: React.FC<LanguageScreenProps> = ({ onSelectLanguage }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl relative bg-white rounded-2xl border border-black/15 p-8 sm:p-12 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)] text-center overflow-hidden"
      >
        {/* Subtle decorative inner border */}
        <div className="absolute inset-2 sm:inset-3 border border-black/10 rounded-xl pointer-events-none" />

        {/* Association Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mb-6 flex flex-col items-center justify-center"
        >
          <div className="p-3 sm:p-4 rounded-2xl bg-white border border-black/10 shadow-sm">
            <img
              src="/assets/aistudio/image_c8f68189.png"
              alt="Кыргызстан Ишкер Айымдар Ассоциациясы"
              className="h-14 sm:h-18 w-auto object-contain"
            />
          </div>
        </motion.div>

        {/* Forum Title in Crisp Solid Black */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mb-3"
        >
          <h1 className="text-2xl sm:text-4xl font-display font-extrabold tracking-wider text-black">
            AIYM BUSINESS–2026
          </h1>
        </motion.div>

        {/* Divider with diamond */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center gap-3 my-6 text-black/40"
        >
          <div className="h-[1px] w-12 sm:w-20 bg-black/25" />
          <span className="text-[10px] transform rotate-45 border border-black w-2 h-2" />
          <div className="h-[1px] w-12 sm:w-20 bg-black/25" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-black text-sm sm:text-base font-serif italic mb-8 font-medium"
        >
          Тилди тандаңыз / Выберите язык приглашения
        </motion.p>

        {/* Language Selection Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Kyrgyz */}
          <button
            onClick={() => onSelectLanguage('kg')}
            className="group relative flex items-center justify-between p-4 rounded-xl bg-white border border-black/20 hover:border-black hover:bg-neutral-50 hover:shadow-md transition-all duration-300 cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl filter drop-shadow">🇰🇬</span>
              <div>
                <p className="font-display font-bold text-base sm:text-lg text-black tracking-wide">
                  Кыргызча
                </p>
                <p className="text-xs text-neutral-600 font-medium">Чакырууну ачуу</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-black transform group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Russian */}
          <button
            onClick={() => onSelectLanguage('ru')}
            className="group relative flex items-center justify-between p-4 rounded-xl bg-white border border-black/20 hover:border-black hover:bg-neutral-50 hover:shadow-md transition-all duration-300 cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl filter drop-shadow">🇷🇺</span>
              <div>
                <p className="font-display font-bold text-base sm:text-lg text-black tracking-wide">
                  Русский
                </p>
                <p className="text-xs text-neutral-600 font-medium">Открыть приглашение</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-black transform group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Quiet footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 text-[11px] uppercase tracking-widest text-black/75 font-semibold"
        >
          Hyatt Regency Bishkek • 20 Ноябрь / Ноября 2026
        </motion.p>
      </motion.div>
    </div>
  );
};
