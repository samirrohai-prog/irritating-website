import { useState } from 'react';
import { useApp } from '../state/context';
import { X, MessageSquare, AlertCircle, TrendingUp, HandCoins } from 'lucide-react';
import { sounds } from '../utils/audio';

export function BargainingModal() {
  const { state, dispatch } = useApp();
  const [bargainPercent, setBargainPercent] = useState(15);

  if (!state.bargainModalOpen) return null;

  const getShopkeeperReaction = (pct: number) => {
    if (pct <= 5) return 'Bhaiya margin hi 2% hai, kya kam karein?';
    if (pct <= 15) return 'Arre madam, itne me toh wholesale mandi me bhi maal nahi milta!';
    if (pct <= 30) return 'Ghar se paise laga ke bechein kya? Bacche kya khayenge hamare?!';
    if (pct <= 45) return 'Aap seedha dukan hi apne naam pe likhwa lijiye, sirji!';
    return 'POLICE BULAO! Loot macha rakhi hai customer ne!';
  };

  const handleApplyBargain = () => {
    sounds.playMoyeMoye();
    document.body.classList.add('animate-dramatic-soap');
    setTimeout(() => {
      document.body.classList.remove('animate-dramatic-soap');
    }, 850);
    // Shopkeeper is furious, charges a penalty!
    dispatch({
      type: 'ADD_PENALTY',
      payload: {
        label: `Bhav-Taal (Bargaining) Arrogance Penalty (${bargainPercent}% Attempt)`,
        amount: 65.00,
        category: 'BARGAIN_AUDACITY',
      },
    });
    dispatch({ type: 'SET_BARGAIN_OPEN', payload: false });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-stone-900 border-4 border-amber-500 rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-center text-stone-100 space-y-5 animate-bounce-short">
        <button
          onClick={() => dispatch({ type: 'SET_BARGAIN_OPEN', payload: false })}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-200 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 mx-auto flex items-center justify-center text-amber-400">
          <HandCoins className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            Desi Jugaad Street Bargaining Mode
          </div>
          <h3 className="text-xl font-black text-white">
            "Bhaiya Thoda Kam Karo Na!"
          </h3>
          <p className="text-xs text-stone-300">
            Drag the slider to demand a local bazaar discount from our algorithms.
          </p>
        </div>

        {/* Shopkeeper Reaction Box */}
        <div className="p-4 bg-stone-950 border-2 border-dashed border-amber-600 rounded-2xl space-y-2">
          <div className="text-[10px] uppercase font-mono text-stone-400 font-bold">
            Shopkeeper Shambhu Bhaiya's Blood Pressure:
          </div>
          <div className="text-sm font-bold text-amber-300 italic min-h-[40px] flex items-center justify-center">
            "{getShopkeeperReaction(bargainPercent)}"
          </div>
        </div>

        {/* Bargain Slider */}
        <div className="space-y-2 text-left">
          <div className="flex justify-between items-center text-xs">
            <span className="text-stone-400">Demanded Discount:</span>
            <span className="font-mono font-black text-base text-amber-400">
              {bargainPercent}% OFF
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={50}
            step={5}
            value={bargainPercent}
            onChange={(e) => {
              setBargainPercent(parseInt(e.target.value, 10));
              sounds.playTick();
            }}
            className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />

          <div className="flex justify-between text-[10px] text-stone-500 font-mono">
            <span>0% (Sanskaari Customer)</span>
            <span>50% (Extreme Audacity)</span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <button
            onClick={handleApplyBargain}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Lock In Bargain (Guaranteed Price Increase)</span>
          </button>

          <button
            onClick={() => dispatch({ type: 'SET_BARGAIN_OPEN', payload: false })}
            className="w-full py-1 text-[11px] text-stone-500 hover:text-stone-300 underline"
          >
            Leave quietly before Bhaiya calls colony uncle
          </button>
        </div>
      </div>
    </div>
  );
}
