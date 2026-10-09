import { useState } from 'react';
import { useApp } from '../state/context';
import { X, Award, AlertTriangle, Sparkles, RefreshCw } from 'lucide-react';
import { sounds } from '../utils/audio';

export function WheelOfMisfortune() {
  const { state, dispatch } = useApp();
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<{ title: string; fee: number; desc: string } | null>(null);

  if (!state.wheelOpen) return null;

  const PRIZES = [
    { title: 'Diwali Soan Papdi Re-Gifting Cess', fee: 149.00, desc: 'Your household has been allotted 2 extra boxes of 2018 Soan Papdi.' },
    { title: 'Zabardasti VIP Kavach Protection', fee: 199.00, desc: 'Enrolled in 24-month titanium dabba protection scheme.' },
    { title: 'Splendor Petrol Surge Donation', fee: 80.00, desc: 'Petrol prices in your area just went up by 15%.' },
    { title: 'Street Cow Traffic Blockage Fine', fee: 45.00, desc: 'A holy cow sat in front of delivery bike for 40 minutes.' },
    { title: 'Ramesh Extra Chai-Samosa Upgrade', fee: 60.00, desc: 'Added 2 samosas and mint chutney to courier\'s tab.' },
    { title: 'Audacity to Spin Wheel Fine', fee: 25.00, desc: 'Penalty for believing in quick-commerce lottery discounts.' },
  ];

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    // Wheel spin cost
    dispatch({
      type: 'ADD_PENALTY',
      payload: {
        label: 'Shubh Muhurat Wheel Hope Exploitation Fee',
        amount: 21.00,
        category: 'WHEEL_MISFORTUNE',
      },
    });

    const randomPrizeIndex = Math.floor(Math.random() * PRIZES.length);
    const degreesPerSlice = 360 / PRIZES.length;
    const totalRotation = rotation + 1800 + (360 - randomPrizeIndex * degreesPerSlice);

    let tickCount = 0;
    const ticker = setInterval(() => {
      sounds.playTick();
      tickCount++;
      if (tickCount > 24) clearInterval(ticker);
    }, 120);

    setRotation(totalRotation);

    setTimeout(() => {
      setSpinning(false);
      const chosen = PRIZES[randomPrizeIndex];
      setResult(chosen);
      sounds.playRickshawHorn();

      dispatch({
        type: 'ADD_PENALTY',
        payload: {
          label: `Wheel Prize: ${chosen.title}`,
          amount: chosen.fee,
          category: 'WHEEL_MISFORTUNE',
        },
      });
      dispatch({ type: 'MARK_WHEEL_SPUN' });
    }, 3200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-stone-900 border-2 border-amber-500 rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-center text-stone-100 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => dispatch({ type: 'SET_WHEEL_OPEN', payload: false })}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-200 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="space-y-1 mb-4">
          <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Kismat Ka Khel · Festive Lucky Draw</span>
          </div>
          <h3 className="text-xl font-extrabold text-stone-100">
            Shubh Muhurat Wheel of Misfortune
          </h3>
          <p className="text-xs text-stone-400">
            Spin to "win" a price hike! Every wedge brings extra GST and handling charges.
          </p>
        </div>

        {/* The Spinning Wheel */}
        <div className="relative w-64 h-64 mx-auto my-4 flex items-center justify-center">
          {/* Pointer needle */}
          <div className="absolute -top-3 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-red-500 filter drop-shadow" />

          {/* Wheel Graphic */}
          <div
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 3.2s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
            }}
            className="w-56 h-56 rounded-full border-4 border-amber-400 shadow-2xl overflow-hidden relative flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-[conic-gradient(#b45309_0deg_60deg,#1c1917_60deg_120deg,#d97706_120deg_180deg,#292524_180deg_240deg,#f59e0b_240deg_300deg,#44403c_300deg_360deg)]" />

            <div className="relative z-10 w-14 h-14 rounded-full bg-stone-950 border-2 border-amber-400 flex items-center justify-center shadow-lg font-mono font-bold text-amber-400 text-xs">
              ₹ DHAMAKA
            </div>
          </div>
        </div>

        {/* Result banner */}
        {result && (
          <div className="my-3 p-3 bg-red-950/80 border border-red-700 rounded-xl text-xs space-y-1 animate-bounce-short">
            <div className="font-bold text-amber-300 text-sm flex items-center justify-center gap-1">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Badhaai Ho! You "Won": {result.title}</span>
            </div>
            <p className="text-stone-300 text-[11px]">{result.desc}</p>
            <div className="font-mono font-black text-amber-400 text-sm">
              Fee Incurred: +₹{result.fee.toFixed(2)}
            </div>
          </div>
        )}

        {/* Spin CTA */}
        <div className="pt-2 space-y-2">
          <button
            onClick={handleSpin}
            disabled={spinning}
            className={`w-full py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all ${
              spinning
                ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                : 'bg-amber-400 hover:bg-amber-300 text-stone-950 active:scale-95'
            }`}
          >
            {spinning ? 'Panditji Calculating Your Despair...' : 'Spin the Wheel (₹21 Shagun Fee)'}
          </button>

          <button
            onClick={() => dispatch({ type: 'SET_WHEEL_OPEN', payload: false })}
            className="text-[11px] text-stone-500 hover:text-stone-300 underline"
          >
            Close & Save Remaining Rupees
          </button>
        </div>
      </div>
    </div>
  );
}
