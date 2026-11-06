import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface CountdownTimerProps {
  currentLang: Language;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  // Target: November 20, 2026, 09:30 AM Bishkek time (UTC+6)
  const targetDate = new Date('2026-11-20T09:30:00+06:00').getTime();

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isFinished: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isFinished: false
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isFinished: true
        });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isFinished: false
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const timeUnits = [
    { label: t.days, value: timeLeft.days },
    { label: t.hours, value: timeLeft.hours },
    { label: t.minutes, value: timeLeft.minutes },
    { label: t.seconds, value: timeLeft.seconds }
  ];

  return (
    <section id="countdown" className="relative py-16 md:py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Header in Solid Black */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-black tracking-wide">
            {t.countdownTitle}
          </h2>
          <p className="text-xs font-serif italic text-black/75 mt-2 font-medium">
            {t.bishkekTimeNote}
          </p>
        </motion.div>

        {/* Live Countdown Display or Today Celebration */}
        {timeLeft.isFinished ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 sm:p-12 rounded-2xl bg-white border border-black/20 shadow-md text-center max-w-2xl mx-auto"
          >
            <Sparkles className="w-10 h-10 text-black mx-auto mb-4" />
            <h3 className="text-2xl sm:text-4xl font-display font-black text-black mb-3">
              {t.eventHappeningToday}
            </h3>
            <p className="text-black font-serif italic font-medium">
              Hyatt Regency Bishkek • 09:30–14:00
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative p-6 sm:p-8 rounded-2xl bg-white border border-black/15 hover:border-black/40 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                {/* Tabular numeric value in Bold Solid Black */}
                <div className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-black font-mono tabular-nums tracking-tight">
                  {String(unit.value).padStart(2, '0')}
                </div>

                {/* Label in Solid Black */}
                <div className="mt-3 text-xs sm:text-sm uppercase tracking-widest text-black font-extrabold">
                  {unit.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
