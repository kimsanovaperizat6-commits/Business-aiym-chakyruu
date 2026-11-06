import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface HeroInvitationProps {
  currentLang: Language;
}

export const HeroInvitation: React.FC<HeroInvitationProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <section id="invitation" className="relative pt-12 pb-20 md:py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Invitation Card Container: Pure White Card with Black Typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-white border border-black/15 p-6 sm:p-10 md:p-16 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1),0_10px_25px_rgba(0,0,0,0.04)] overflow-hidden"
        >
          {/* Subtle inner border */}
          <div className="absolute inset-2 sm:inset-4 border border-black/10 rounded-2xl pointer-events-none" />

          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-black/30" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-black/30" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-black/30" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-black/30" />

          {/* Header Metadata in Solid Black */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-black mb-6 font-bold text-center"
          >
            <span>{t.badge}</span>
            <span aria-hidden="true" className="text-black/40">·</span>
            <span>Hyatt Regency Bishkek</span>
            <span aria-hidden="true" className="text-black/40">·</span>
            <span>20.11.2026</span>
          </motion.div>

          {/* Official Association Original Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex flex-col items-center justify-center mb-6"
          >
            <div className="px-5 py-3 rounded-2xl bg-white border border-black/10 shadow-sm">
              <img
                src="/assets/aistudio/image_c8f68189.png"
                alt="Кыргызстан Ишкер Айымдар Ассоциациясы"
                className="h-14 sm:h-18 w-auto object-contain"
              />
            </div>
          </motion.div>

          {/* Forum Title in Bold Solid Black */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-[0.05em] text-black text-balance">
              {t.title}
            </h1>
          </motion.div>

          {/* Elegant Divider with center diamond */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex items-center justify-center gap-3 my-8 text-black/40"
          >
            <div className="h-[1px] w-16 sm:w-28 bg-black/20" />
            <div className="w-2.5 h-2.5 rotate-45 border border-black bg-black/5" />
            <div className="h-[1px] w-16 sm:w-28 bg-black/20" />
          </motion.div>

          {/* Invitation Text Body in Crisp Solid Black */}
          <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 text-center text-black">
            {/* Greeting */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="text-2xl sm:text-3xl md:text-4xl font-serif italic font-normal text-black tracking-wide"
            >
              {t.welcomeGreeting}
            </motion.h2>

            {/* Paragraph 1 */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="text-base sm:text-lg md:text-xl font-sans font-normal leading-[1.8] text-black/90"
            >
              {t.invitationP1}
            </motion.p>

            {/* Forum Theme Card in Solid Black on White */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.9 }}
              className="relative p-6 sm:p-9 rounded-2xl bg-white border border-black/15 shadow-[0_4px_25px_rgba(0,0,0,0.04)]"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-black/60 font-semibold mb-3">
                {t.themeLabel}
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl font-serif italic font-medium text-black leading-snug">
                {t.themeTitle}
              </p>
            </motion.div>

            {/* Paragraph 2 */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.05 }}
              className="text-base sm:text-lg md:text-xl font-sans font-normal leading-[1.8] text-black/90"
            >
              {t.invitationP2}
            </motion.p>
          </div>

          {/* Venue Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2 }}
            className="mt-12 rounded-2xl overflow-hidden border border-black/15 relative group shadow-md"
          >
            <div className="aspect-[16/8] sm:aspect-[16/7] w-full overflow-hidden">
              <img
                src="/assets/aistudio/image_3d85de8b.png"
                alt="AIYM BUSINESS Forum Participants"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-6 sm:p-8">
              <div className="text-left text-white">
                <p className="text-xs uppercase tracking-widest text-white/90 font-semibold mb-1">
                  Hyatt Regency Bishkek • Shayir Ballroom
                </p>
                <p className="text-lg sm:text-xl font-display font-bold text-white">
                  {currentLang === 'kg' ? 'Лидерлик, тажрыйба жана жаңы мүмкүнчүлүктөр мейкиндиги' : 'Пространство лидерства, опыта и новых возможностей'}
                </p>
              </div>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};
