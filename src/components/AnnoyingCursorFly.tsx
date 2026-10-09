import { useEffect, useState } from 'react';
import { useApp } from '../state/context';
import { sounds } from '../utils/audio';

export function AnnoyingCursorFly() {
  const { state, dispatch } = useApp();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [swatCount, setSwatCount] = useState(0);

  useEffect(() => {
    if (!state.flyBuzzActive) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX + 16;
      targetY = e.clientY + 16;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Smooth trailing physics with jitter
    const interval = setInterval(() => {
      const jitterX = (Math.random() - 0.5) * 14;
      const jitterY = (Math.random() - 0.5) * 14;
      currentX += (targetX - currentX) * 0.12 + jitterX;
      currentY += (targetY - currentY) * 0.12 + jitterY;
      setPos({ x: currentX, y: currentY });

      // Occasionally buzz
      if (Math.random() < 0.03) {
        sounds.playBuzz();
      }
    }, 45);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, [state.flyBuzzActive]);

  if (!state.flyBuzzActive) return null;

  const handleSwat = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playBuzzer();
    const next = swatCount + 1;
    setSwatCount(next);

    dispatch({
      type: 'ADD_PENALTY',
      payload: {
        label: `Cruelty to Persistent Digital Fly Tariff (#${next})`,
        amount: 0.85,
        category: 'ARBITRARY',
      },
    });

    // Fly teleports away
    setPos({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    });
  };

  return (
    <div
      onClick={handleSwat}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
      className="fixed top-0 left-0 z-50 pointer-events-auto cursor-crosshair select-none transition-transform duration-75"
      title="Click to swat fly (Incurs $0.85 Cruelty Tariff)"
    >
      <div className="relative group">
        {/* Cartoon Annoying Fly */}
        <div className="text-sm transform rotate-12 filter drop-shadow-md animate-pulse">
          🪰
        </div>
        <div className="absolute -top-3 -right-6 text-[8px] font-mono text-amber-400 bg-black/80 px-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
          BZZZ!
        </div>
      </div>
    </div>
  );
}
