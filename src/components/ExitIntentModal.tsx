import { useEffect, useState } from 'react';
import { useApp } from '../state/context';
import { HeartCrack, X, AlertTriangle, ShieldAlert } from 'lucide-react';
import { sounds } from '../utils/audio';

export function ExitIntentModal() {
  const { state, dispatch } = useApp();
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 12 && !hasShown && !state.exitIntentTriggered && state.view !== 'CONFIRMED') {
        setHasShown(true);
        dispatch({ type: 'SET_EXIT_INTENT', payload: true });
        sounds.playPressureCooker();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown, state.exitIntentTriggered, state.view, dispatch]);

  if (!state.exitIntentTriggered) return null;

  const handleStay = () => {
    dispatch({ type: 'SET_EXIT_INTENT', payload: false });
    sounds.playDing();
  };

  const handleLeaveAnyway = () => {
    sounds.playRickshawHorn();
    dispatch({
      type: 'ADD_PENALTY',
      payload: {
        label: 'Achanak Chale Jane Ka Dhoka (Desertion) Penalty',
        amount: 50.00,
        category: 'ARBITRARY',
      },
    });
    dispatch({ type: 'SET_EXIT_INTENT', payload: false });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-stone-900 border-4 border-red-600 rounded-3xl max-w-lg w-full p-8 shadow-2xl relative text-center text-stone-100 space-y-5 animate-bounce-short">
        <button
          onClick={handleLeaveAnyway}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-200 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-20 h-20 rounded-full bg-red-600/20 border-2 border-red-500 mx-auto flex items-center justify-center text-red-500 animate-pulse">
          <HeartCrack className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <div className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest">
            Critical Desi Desertion Alert
          </div>
          <h3 className="text-2xl font-black text-white">
            RUKO BHAIYA! TAB CLOSE MAT KARO!
          </h3>
          <p className="text-xs text-stone-300 leading-relaxed max-w-md mx-auto">
            Ramesh bhaiya has already filled ₹50 petrol in his Hero Splendor and reached the gol chakkar. If you close this tab now, his mother will be very sad!
          </p>
        </div>

        <div className="p-3 bg-stone-950 border border-stone-800 rounded-xl text-xs text-amber-300 font-mono">
          Special Retentive Bribe: Stay now to avoid the ₹50.00 Achanak Chale Jane Ka Penalty!
        </div>

        <div className="space-y-2 pt-2">
          <button
            onClick={handleStay}
            className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform active:scale-95"
          >
            I Repent: Tab Khula Rakhunga & Order Karunga
          </button>

          <button
            onClick={handleLeaveAnyway}
            className="w-full py-2 text-[11px] text-stone-500 hover:text-red-400 underline"
          >
            Leave anyway (Incurs ₹50 Dhoka Penalty)
          </button>
        </div>
      </div>
    </div>
  );
}
