import React from 'react';
import { Language } from '../types';

interface TopNavProps {
  currentLang: Language;
  onLanguageChange?: (lang: Language) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentLang
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 border-b border-black/10 shadow-[0_2px_15px_rgba(0,0,0,0.03)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Association Original Logo + Brand Title in Solid Black */}
        <a
          href="#invitation"
          className="flex items-center gap-2.5 sm:gap-3 shrink-0 hover:opacity-85 transition-opacity"
        >
          <img
            src="/assets/aistudio/image_c8f68189.png"
            alt="Кыргызстан Ишкер Айымдар Ассоциациясы"
            className="h-8 sm:h-9 w-auto object-contain"
          />
          <span className="hidden sm:inline-block h-4 w-[1px] bg-black/20" />
          <span className="text-xs sm:text-base font-display font-extrabold tracking-wider text-black whitespace-nowrap">
            AIYM BUSINESS–2026
          </span>
        </a>

        {/* Zone 2: Single-line clean text links in Solid Black */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-black font-bold">
          <a href="#invitation" className="hover:opacity-60 transition-opacity whitespace-nowrap shrink-0">
            {currentLang === 'kg' ? 'Чакыруу' : 'Приглашение'}
          </a>
          <a href="#event-details" className="hover:opacity-60 transition-opacity whitespace-nowrap shrink-0">
            {currentLang === 'kg' ? 'Маалымат' : 'Мероприятие'}
          </a>
          <a href="#countdown" className="hover:opacity-60 transition-opacity whitespace-nowrap shrink-0">
            {currentLang === 'kg' ? 'Таймер' : 'Отсчет'}
          </a>
        </nav>

        {/* Zone 3: Event Date Badge in Solid Black */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full bg-neutral-100 border border-black/15 text-xs font-bold text-black tracking-wider">
            20.11.2026 • БИШКЕК
          </span>
        </div>
      </div>
    </header>
  );
};
