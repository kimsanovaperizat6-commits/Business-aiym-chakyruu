import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Building, CalendarPlus, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface EventDetailsProps {
  currentLang: Language;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(
      currentLang === 'kg'
        ? 'AIYM BUSINESS–2026 Эл аралык аялдар бизнес-форуму'
        : 'AIYM BUSINESS–2026 Международный женский бизнес-форум'
    );
    const dates = '20261120T033000Z/20261120T080000Z';
    const location = encodeURIComponent('Hyatt Regency Bishkek, Зал «Шайыр», ул. Юсупа Абдрахманова 191, Бишкек');
    const details = encodeURIComponent(
      currentLang === 'kg'
        ? '«Бизнестеги аялдардын лидерлиги: чечимдердин баасы жана экономика менен коомго тийгизген таасири»'
        : '«Женское лидерство в бизнесе: цена решений и влияние на экономику и общество»'
    );
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&location=${location}&details=${details}`;
  };

  const downloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//AIYM BUSINESS//Forum 2026//KY',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:aiym-business-2026-hyatt@bishkek.kg',
      'DTSTAMP:20261105T000000Z',
      'DTSTART:20261120T033000Z',
      'DTEND:20261120T080000Z',
      'SUMMARY:AIYM BUSINESS–2026',
      'DESCRIPTION:Женское лидерство в бизнесе: цена решений и влияние на экономику и общество',
      'LOCATION:Hyatt Regency Bishkek, Зал «Шайыр», ул. Абдрахманова 191, Бишкек',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'AIYM-BUSINESS-2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="event-details" className="relative py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title in Solid Black */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-black font-extrabold mb-2">
            AIYM BUSINESS–2026
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold text-black tracking-wide">
            {t.eventDetailsTitle}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4 text-black/50">
            <div className="h-[1px] w-12 bg-black/30" />
            <div className="w-2 h-2 rotate-45 border border-black" />
            <div className="h-[1px] w-12 bg-black/30" />
          </div>
        </motion.div>

        {/* 2-Column Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Venue Photography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-black/15 min-h-[340px] sm:min-h-[420px] shadow-sm flex flex-col justify-end"
          >
            <img
              src="/assets/aistudio/image_9e5e28b8.png"
              alt="AIYM BUSINESS Forum Atmosphere"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

            <div className="relative p-6 sm:p-8 z-10 text-white">
              <span className="text-xs uppercase tracking-widest text-neutral-200 font-semibold block mb-1">
                {currentLang === 'kg' ? 'Башкы аянтча' : 'Главная площадка'}
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                Hyatt Regency Bishkek
              </h3>
              <p className="text-sm font-serif italic text-neutral-200">
                {currentLang === 'kg' ? '«Шайыр» салтанат залы • Бишкек шаары' : 'Банкетный зал «Шайыр» • г. Бишкек'}
              </p>
            </div>
          </motion.div>

          {/* Right Column: Exact Event Spec Cards with Bold Black Typography */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-6"
          >
            {/* Spec 1: Date */}
            <div className="p-6 rounded-2xl bg-white border border-black/15 hover:border-black/40 transition-all duration-300 flex items-start gap-5 shadow-sm group">
              <div className="w-12 h-12 rounded-xl bg-white border border-black/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Calendar className="w-6 h-6 text-black" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-black/70 font-bold mb-1">
                  {currentLang === 'kg' ? 'Күнү' : 'Дата'}
                </p>
                <p className="text-lg sm:text-2xl font-display font-black tracking-wide text-black">
                  {t.date}
                </p>
              </div>
            </div>

            {/* Spec 2: Time */}
            <div className="p-6 rounded-2xl bg-white border border-black/15 hover:border-black/40 transition-all duration-300 flex items-start gap-5 shadow-sm group">
              <div className="w-12 h-12 rounded-xl bg-white border border-black/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Clock className="w-6 h-6 text-black" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-black/70 font-bold mb-1">
                  {currentLang === 'kg' ? 'Убактысы' : 'Время проведения'}
                </p>
                <p className="text-lg sm:text-2xl font-display font-black tracking-wide text-black">
                  {t.time}
                </p>
              </div>
            </div>

            {/* Spec 3: Venue & Hall */}
            <div className="p-6 rounded-2xl bg-white border border-black/15 hover:border-black/40 transition-all duration-300 flex items-start gap-5 shadow-sm group">
              <div className="w-12 h-12 rounded-xl bg-white border border-black/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Building className="w-6 h-6 text-black" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-black/70 font-bold mb-1">
                  {currentLang === 'kg' ? 'Орду жана Зал' : 'Место и Зал'}
                </p>
                <p className="text-lg sm:text-2xl font-display font-black tracking-wide text-black">
                  {t.venue}
                </p>
                <p className="text-base font-serif italic text-black mt-0.5 font-bold">
                  {t.hall}
                </p>
              </div>
            </div>

            {/* Spec 4: Address */}
            <div className="p-6 rounded-2xl bg-white border border-black/15 hover:border-black/40 transition-all duration-300 flex items-start gap-5 shadow-sm group">
              <div className="w-12 h-12 rounded-xl bg-white border border-black/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <MapPin className="w-6 h-6 text-black" />
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wider text-black/70 font-bold mb-1">
                  {currentLang === 'kg' ? 'Дареги' : 'Адрес'}
                </p>
                <p className="text-sm sm:text-lg font-display font-bold tracking-wide text-black">
                  {t.address}
                </p>
              </div>
            </div>

            {/* Actions: Add to Calendar & Maps in Solid Black */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-black/20 hover:border-black text-xs font-bold uppercase tracking-wider text-black hover:bg-neutral-50 transition-all cursor-pointer whitespace-nowrap shadow-sm"
              >
                <CalendarPlus className="w-4 h-4 text-black" />
                Google Calendar
              </a>

              <button
                onClick={downloadIcs}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-black/20 hover:border-black text-xs font-bold uppercase tracking-wider text-black hover:bg-neutral-50 transition-all cursor-pointer whitespace-nowrap shadow-sm"
              >
                <Calendar className="w-4 h-4 text-black" />
                Apple / Outlook (.ics)
              </button>

              <a
                href="https://maps.google.com/?q=Hyatt+Regency+Bishkek+Abdrakhmanov+191"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-black/20 hover:border-black text-xs font-bold uppercase tracking-wider text-black hover:bg-neutral-50 transition-all cursor-pointer whitespace-nowrap shadow-sm"
              >
                <ExternalLink className="w-4 h-4 text-black" />
                {t.viewOnMap}
              </a>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};
