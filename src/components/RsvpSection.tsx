import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, MessageSquare, User, Phone, Building2, AlertCircle } from 'lucide-react';
import { Language, RSVPFormData, RSVPResponse } from '../types';
import { translations } from '../utils/translations';

interface RsvpSectionProps {
  currentLang: Language;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [formData, setFormData] = useState<RSVPFormData>({
    fullName: '',
    phone: '',
    company: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [responseState, setResponseState] = useState<RSVPResponse | null>(null);
  const [isDirectConfirmed, setIsDirectConfirmed] = useState<boolean>(false);

  const TARGET_PHONE = '+996 551 376 755';
  const TARGET_PHONE_DIGITS = '996551376755';

  const triggerGoldConfetti = () => {
    confetti({
      particleCount: 85,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#000000', '#333333', '#e63946', '#dfb76c', '#104b32']
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg(
        currentLang === 'kg'
          ? 'Сураныч, аты-жөнүңүздү толук жазыңыз'
          : 'Пожалуйста, укажите ваше имя и фамилию'
      );
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          company: formData.company,
          language: currentLang
        })
      });

      const data: RSVPResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Ошибка отправки');
      }

      setResponseState(data);

      if (data.gatewaySent) {
        triggerGoldConfetti();
      }
    } catch (err: any) {
      console.error('RSVP submit error:', err);
      const fallbackMsg = currentLang === 'kg'
        ? `AIYM BUSINESS-2026: Форумга катышууну ырастайм! Катышуучу: ${formData.fullName.trim()}${formData.company ? ` (${formData.company.trim()})` : ''}`
        : `AIYM BUSINESS-2026: Подтверждаю участие в форуме! Участник: ${formData.fullName.trim()}${formData.company ? ` (${formData.company.trim()})` : ''}`;

      setResponseState({
        success: true,
        fullName: formData.fullName.trim(),
        gatewayConfigured: false,
        gatewaySent: false,
        targetPhone: TARGET_PHONE,
        targetPhoneClean: TARGET_PHONE_DIGITS,
        smsMessage: fallbackMsg,
        rsvpId: `VIP-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date().toISOString()
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSmsHref = () => {
    if (!responseState?.smsMessage) return `sms:${TARGET_PHONE_DIGITS}`;
    const body = encodeURIComponent(responseState.smsMessage);
    return navigator.userAgent.match(/iPhone|iPad|iPod/i)
      ? `sms:${TARGET_PHONE_DIGITS}&body=${body}`
      : `sms:${TARGET_PHONE_DIGITS}?body=${body}`;
  };

  const getWhatsAppHref = () => {
    if (!responseState?.smsMessage) return `https://wa.me/${TARGET_PHONE_DIGITS}`;
    return `https://wa.me/${TARGET_PHONE_DIGITS}?text=${encodeURIComponent(responseState.smsMessage)}`;
  };

  const handleConfirmDirectSent = () => {
    setIsDirectConfirmed(true);
    triggerGoldConfetti();
  };

  const isFullyConfirmed = responseState?.gatewaySent || isDirectConfirmed;

  return (
    <section id="rsvp" className="relative py-16 md:py-24 overflow-hidden bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl bg-white border-2 border-black/15 p-6 sm:p-10 md:p-12 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)]"
        >
          {/* Subtle inner border */}
          <div className="absolute inset-3 border border-black/10 rounded-2xl pointer-events-none" />

          {/* Header in Solid Black */}
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-black font-extrabold block mb-2">
              RSVP • VIP Invitation
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-black mb-3">
              {t.rsvpTitle}
            </h2>
            <p className="text-base sm:text-lg font-serif italic text-black font-medium max-w-xl mx-auto">
              «{t.rsvpPrompt}»
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!responseState ? (
              /* RSVP Input Form */
              <motion.form
                key="rsvp-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Full Name Field (Mandatory) */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-black font-extrabold mb-2 flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-black" />
                    <span>{t.fullNameLabel} <span className="text-red-600">*</span></span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errorMsg) setErrorMsg(null);
                    }}
                    placeholder={t.fullNamePlaceholder}
                    className="w-full px-4 py-3.5 rounded-xl bg-white border-2 border-neutral-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black text-black placeholder-neutral-400 text-sm sm:text-base font-semibold transition-colors"
                  />
                </div>

                {/* Optional Phone Field */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-black font-extrabold mb-2 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-black" />
                    <span>{t.phoneLabel}</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t.phonePlaceholder}
                    className="w-full px-4 py-3.5 rounded-xl bg-white border-2 border-neutral-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black text-black placeholder-neutral-400 text-sm sm:text-base font-semibold transition-colors"
                  />
                </div>

                {/* Optional Company / Title Field */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-black font-extrabold mb-2 flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-black" />
                    <span>{t.companyLabel}</span>
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder={t.companyPlaceholder}
                    className="w-full px-4 py-3.5 rounded-xl bg-white border-2 border-neutral-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black text-black placeholder-neutral-400 text-sm sm:text-base font-semibold transition-colors"
                  />
                </div>

                {/* Target phone transparency notice */}
                <div className="flex items-center justify-between text-xs text-black font-bold py-1 px-1">
                  <span>{t.targetPhoneLabel}</span>
                  <span className="font-mono text-black">{TARGET_PHONE}</span>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-300 text-red-800 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl font-display font-extrabold text-sm sm:text-base tracking-wider uppercase text-white bg-black hover:bg-neutral-800 hover:shadow-lg disabled:opacity-70 transition-all duration-300 cursor-pointer flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <span>{t.submitting}</span>
                  ) : (
                    <>
                      <span>{t.confirmButton}</span>
                      <Send className="w-4 h-4 text-white" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : isFullyConfirmed ? (
              /* Success / VIP Pass State */
              <motion.div
                key="confirmed-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-white border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-display font-black text-black">
                    {t.rsvpSuccessTitle}
                  </h3>
                  <p className="text-sm sm:text-base font-serif italic text-black font-medium max-w-md mx-auto">
                    {t.rsvpSuccessDesc}
                  </p>
                </div>

                {/* Digital VIP Guest Pass in Pure White */}
                <div className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-black/20 text-left relative overflow-hidden shadow-md">
                  <div className="absolute top-0 right-0 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                    VIP GUEST PASS
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-black/15">
                      <img
                        src="/assets/aistudio/image_c8f68189.png"
                        alt="Кыргызстан Ишкер Айымдар Ассоциациясы"
                        className="h-8 sm:h-9 w-auto object-contain bg-white rounded p-0.5"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-black font-extrabold block">
                        Участник форума / Форумдун катышуучусу
                      </span>
                      <h4 className="text-xl sm:text-2xl font-display font-black text-black">
                        {responseState.fullName}
                      </h4>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-black/15 text-xs">
                      <div>
                        <span className="text-black/70 block mb-0.5 font-medium">Дата / Убактысы:</span>
                        <span className="text-black font-black">20.11.2026 • 09:30</span>
                      </div>
                      <div>
                        <span className="text-black/70 block mb-0.5 font-medium">Локация:</span>
                        <span className="text-black font-black">Hyatt Regency Bishkek</span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[11px] text-black/75 border-t border-black/15 font-medium">
                      <span>Номер оргкомитета: {TARGET_PHONE}</span>
                      <span className="font-mono text-black font-black">ID: {responseState.rsvpId || 'AIYM-2026'}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-black/75 italic font-medium">
                  {currentLang === 'kg'
                    ? 'Бул санариптик чакырууну сактап же сүрөткө тартып алсаңыз болот.'
                    : 'Вы можете сохранить или сделать скриншот этой цифровой карточки участника.'}
                </p>
              </motion.div>
            ) : (
              /* Fallback Direct Send via SMS or WhatsApp */
              <motion.div
                key="direct-send"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="p-4 rounded-xl bg-white border-2 border-black/20 text-black text-xs sm:text-sm leading-relaxed">
                  <p className="font-extrabold text-black mb-1">
                    {currentLang === 'kg'
                      ? 'Катышууну түз ырастоо:'
                      : 'Завершите подтверждение отправкой сообщения:'}
                  </p>
                  <p className="font-medium text-black">
                    {currentLang === 'kg'
                      ? `Аты-жөнүңүздү уюштуруучулардын номерине (${TARGET_PHONE}) SMS же WhatsApp аркылуу жөнөтүңүз:`
                      : `Отправьте ваше имя и фамилию на номер оргкомитета (${TARGET_PHONE}) удобным для вас способом:`}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border-2 border-black/15 text-xs">
                  <span className="text-black font-bold block mb-1">
                    {currentLang === 'kg' ? 'Даяр билдирүү:' : 'Текст сообщения:'}
                  </span>
                  <p className="font-mono text-black font-semibold bg-white p-3 rounded-lg border border-black/20">
                    {responseState.smsMessage}
                  </p>
                </div>

                {/* Direct Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={getSmsHref()}
                    onClick={handleConfirmDirectSent}
                    className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-white border-2 border-black hover:bg-black hover:text-white text-black text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{t.directSmsButton}</span>
                  </a>

                  <a
                    href={getWhatsAppHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleConfirmDirectSent}
                    className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
                  >
                    <Send className="w-4 h-4 text-white" />
                    <span>{t.directWhatsAppButton}</span>
                  </a>
                </div>

                {/* Manual confirmation button once user tapped */}
                <div className="pt-2 text-center">
                  <button
                    onClick={handleConfirmDirectSent}
                    className="text-xs text-black hover:underline underline-offset-4 cursor-pointer font-bold transition-all"
                  >
                    {currentLang === 'kg'
                      ? '✓ Билдирүүнү жөнөттүм, катышуу картасын көрсөтүү'
                      : '✓ Я отправил(а) сообщение, показать карту участника'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>

      </div>
    </section>
  );
};
