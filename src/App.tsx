import React, { useState } from 'react';
import { Language } from './types';
import { BackgroundAmbient } from './components/BackgroundAmbient';
import { TopNav } from './components/TopNav';
import { HeroInvitation } from './components/HeroInvitation';
import { EventDetails } from './components/EventDetails';
import { CountdownTimer } from './components/CountdownTimer';
import { FinalScreen } from './components/FinalScreen';
import { AudioPlayerButton } from './components/AudioPlayerButton';
import { FloatingContactWidget } from './components/FloatingContactWidget';
import { audioEngine } from './utils/audioEngine';

export default function App() {
  const [selectedLang] = useState<Language>('kg');

  // Start audio on first user gesture anywhere on the page if allowed
  React.useEffect(() => {
    const handleFirstInteraction = () => {
      try {
        if (!audioEngine.getIsPlaying()) {
          audioEngine.start();
        }
      } catch (e) {
        console.warn('Audio autoplay interaction:', e);
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-black selection:bg-neutral-200 selection:text-black overflow-x-hidden font-sans">
      {/* Ambient Minimalist Background */}
      <BackgroundAmbient />

      {/* Interactive VIP Invitation Site */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Bar Navigation */}
        <TopNav currentLang={selectedLang} />

          {/* Main Content Sections */}
          <main className="flex-1">
            <HeroInvitation currentLang={selectedLang} />

            <EventDetails currentLang={selectedLang} />

            <CountdownTimer currentLang={selectedLang} />
          </main>

          {/* Final Screen & Farewell */}
          <FinalScreen currentLang={selectedLang} />

          {/* Floating Right-Side Interactive Contact Widget (Instagram, Phone, Address) */}
          <FloatingContactWidget />

          {/* Floating Audio Controller */}
          <AudioPlayerButton currentLang={selectedLang} />
        </div>
    </div>
  );
}
