import { useState } from 'react';
import { useApp } from '../state/context';
import { Music, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

export function FahhhhhButton() {
  const { dispatch } = useApp();
  const [isBlasting, setIsBlasting] = useState(false);
  const [viralSoundMode, setViralSoundMode] = useState<'moye' | 'dhoom' | 'chhin'>('moye');

  const triggerViralSound = () => {
    setIsBlasting(true);

    if (viralSoundMode === 'moye') {
      sounds.playMoyeMoye();
    } else if (viralSoundMode === 'dhoom') {
      sounds.playDhoomTana();
    } else {
      sounds.playChhinTapak();
    }

    // Trigger dramatic TV soap opera camera shock
    document.body.classList.add('animate-dramatic-soap');
    setTimeout(() => {
      document.body.classList.remove('animate-dramatic-soap');
      setIsBlasting(false);
    }, 900);

    const labels: Record<string, string> = {
      moye: 'Viral "MOYE MOYE... MOYE MOYE" Tragedy Cess',
      dhoom: 'Ekta Kapoor Dramatic DHOOM TANA Lightning Surcharge',
      chhin: 'Viral "Chhin Tapak Dam Dam" Magical Fee',
    };

    dispatch({
      type: 'ADD_PENALTY',
      payload: {
        label: labels[viralSoundMode] || 'Viral Meme Sound Surcharge',
        amount: 5.00,
        category: 'ARBITRARY',
      },
    });

    // Cycle to next viral sound
    const next = viralSoundMode === 'moye' ? 'dhoom' : viralSoundMode === 'dhoom' ? 'chhin' : 'moye';
    setViralSoundMode(next);
  };

  const getButtonLabel = () => {
    if (viralSoundMode === 'moye') return 'MOYE MOYE 😭';
    if (viralSoundMode === 'dhoom') return 'DHOOM TANA ⚡';
    return 'CHHIN TAPAK 🪄';
  };

  return (
    <div className="fixed bottom-20 right-6 z-40">
      <button
        onClick={triggerViralSound}
        className={`px-4 py-2.5 rounded-full font-black text-xs uppercase tracking-wider text-black shadow-2xl flex items-center gap-2 border-2 border-yellow-300 transition-all duration-150 active:scale-90 ${
          isBlasting
            ? 'bg-red-600 text-white scale-110 animate-bounce'
            : 'bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:scale-105 animate-desi-flash'
        }`}
        title="Click to play viral Indian meme sound (Cycles between Moye Moye, Dhoom Tana & Chhin Tapak) - Incurs ₹5.00 Drama Fee"
      >
        <span className="text-base">🎵</span>
        <span className="font-mono font-black drop-shadow text-white tracking-wide">
          {getButtonLabel()}
        </span>
        <span className="text-[9px] bg-black text-yellow-300 px-1.5 py-0.5 rounded font-mono">
          ₹5
        </span>
      </button>
    </div>
  );
}
