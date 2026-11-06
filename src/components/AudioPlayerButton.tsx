import React, { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { translations } from '../utils/translations';
import { Language } from '../types';

interface AudioPlayerButtonProps {
  currentLang: Language;
}

export const AudioPlayerButton: React.FC<AudioPlayerButtonProps> = ({ currentLang }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [visualData, setVisualData] = useState<number[]>([15, 25, 35, 20]);
  const t = translations[currentLang];
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const dataArray = new Uint8Array(16);

    const updateBars = () => {
      if (audioEngine.getIsPlaying()) {
        audioEngine.getVisualizerData(dataArray as any);
        const b1 = Math.max(15, Math.floor((dataArray[1] / 255) * 100));
        const b2 = Math.max(25, Math.floor((dataArray[3] / 255) * 100));
        const b3 = Math.max(20, Math.floor((dataArray[5] / 255) * 100));
        const b4 = Math.max(15, Math.floor((dataArray[7] / 255) * 100));
        setVisualData([b1, b2, b3, b4]);
      } else {
        setVisualData([15, 20, 15, 12]);
      }
      animFrameRef.current = requestAnimationFrame(updateBars);
    };

    animFrameRef.current = requestAnimationFrame(updateBars);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const handleToggle = () => {
    const newState = audioEngine.toggle();
    setIsPlaying(newState);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      <button
        onClick={handleToggle}
        aria-label={isPlaying ? t.musicOff : t.musicOn}
        className="group relative flex items-center gap-3 px-3.5 py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-[#b88e38]/35 hover:border-[#9a7428] shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_20px_rgba(184,142,56,0.2)] transition-all duration-300 cursor-pointer"
      >
        <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#faf8f4] text-[#9a7428] transition-transform duration-300 group-hover:scale-105 border border-[#b88e38]/20">
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-[#9a7428]" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-400" />
          )}
        </span>

        {/* Real-time audio spectrum bars */}
        <div className="flex items-end gap-1 h-4 w-5 px-0.5">
          {visualData.map((val, idx) => (
            <span
              key={idx}
              style={{ height: isPlaying ? `${val}%` : '20%' }}
              className={`w-1 rounded-full transition-all duration-100 ${
                isPlaying
                  ? 'bg-gradient-to-t from-[#b88e38] to-[#dfb76c]'
                  : 'bg-slate-300'
              }`}
            />
          ))}
        </div>

        <span className="hidden sm:inline-block text-xs font-bold tracking-wider uppercase text-black">
          {isPlaying ? t.musicOff : t.musicOn}
        </span>

        <span className="sr-only">{isPlaying ? t.musicOff : t.musicOn}</span>
      </button>
    </div>
  );
};
