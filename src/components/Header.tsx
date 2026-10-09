import { useState } from 'react';
import { useApp } from '../state/context';
import { ShoppingBag, AlertTriangle, X, ShieldAlert, Zap, Volume2, VolumeX, Sparkles, Flame, HandCoins, Bike } from 'lucide-react';
import { sounds } from '../utils/audio';

export function Header() {
  const { state, dispatch, grandTotal, totalPenalties } = useApp();
  const [showPenaltiesModal, setShowPenaltiesModal] = useState(false);
  const totalCartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-stone-900 border-b border-stone-800 text-stone-100 shadow-sm backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'BROWSE' })}
              className="flex items-center gap-2 text-xl font-black tracking-tight text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
            >
              <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span>Lele Re Baba</span>
            </button>

            {/* Quick theme indicator button */}
            <button
              onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
              className="text-[10px] font-mono px-2 py-0.5 rounded-lg border border-stone-700 bg-stone-950 text-stone-300 hover:border-amber-400 flex items-center gap-1 shrink-0"
              title="Switch between Corporate Quick-Commerce & 1999 Cyber Cafe Mode"
            >
              <Flame className="w-3 h-3 text-orange-400" />
              <span>{state.themeMode === 'GEOCITIES_1999' ? 'Cyber Cafe' : 'Desi Mode'}</span>
            </button>
          </div>

          {/* Zone 2: 4-5 single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-medium text-stone-400">
            <button
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'BROWSE' })}
              className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 ${
                state.view === 'BROWSE' ? 'text-amber-400 font-semibold' : ''
              }`}
            >
              Maha-Catalog
            </button>
            <button
              onClick={() => dispatch({ type: 'SET_BARGAIN_OPEN', payload: true })}
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 text-emerald-400 flex items-center gap-1 font-bold"
            >
              <HandCoins className="w-3 h-3" />
              <span>Bargain (Bhav-Taal)</span>
            </button>
            <button
              onClick={() => dispatch({ type: 'SET_WHEEL_OPEN', payload: true })}
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 text-amber-400 flex items-center gap-1 font-bold"
            >
              <Sparkles className="w-3 h-3" />
              <span>Muhurat Wheel</span>
            </button>
            <button
              onClick={() => setShowPenaltiesModal(true)}
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 text-stone-400"
            >
              Desi Cess Ledger
            </button>
            <button
              onClick={() => {
                sounds.playRickshawHorn();
                dispatch({
                  type: 'ADD_PENALTY',
                  payload: {
                    label: 'Ramesh Valet Interrogation Fee',
                    amount: 25.00,
                    category: 'ARBITRARY',
                  },
                });
                dispatch({ type: 'SET_CHAT_OPEN', payload: true });
              }}
              className="hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
            >
              <Bike className="w-3 h-3 text-emerald-400" />
              <span>Ramesh Valet</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action & sound toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Audio Sfx Toggle */}
            <button
              onClick={() => dispatch({ type: 'TOGGLE_SOUND' })}
              className="p-2 text-stone-400 hover:text-amber-400 transition-colors rounded-lg hover:bg-stone-800"
              title={
                state.soundMuted
                  ? 'Horn Muted (Click to Unmute)'
                  : 'Mute Horn & Cooker (Incurs ₹29 Silence Royalty Surcharge)'
              }
            >
              {state.soundMuted ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-amber-400" />
              )}
            </button>

            <button
              onClick={() =>
                dispatch({
                  type: 'SET_VIEW',
                  payload: state.view === 'CART' ? 'BROWSE' : 'CART',
                })
              }
              className="relative flex items-center gap-2.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-amber-400 hover:bg-amber-300 active:scale-95 transition-all rounded-xl shadow"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart ({totalCartCount})</span>
              <span className="font-mono font-bold ml-1 text-stone-950">
                ₹{grandTotal.toFixed(2)}
              </span>
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-sm">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hostile Live Penalty Marquee Bar */}
      <div className="bg-amber-950/80 border-b border-amber-800/60 px-4 py-1.5 text-xs text-amber-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
          <span className="font-semibold text-amber-300">Live Desi Surcharge Engine:</span>
          <span className="truncate">
            {state.penalties.length} extra charges billed (₹{totalPenalties.toFixed(2)}) · {state.metrics.rageClicks} rage clicks · Splendor running on reserve
          </span>
        </div>
        <button
          onClick={() => setShowPenaltiesModal(true)}
          className="text-[11px] underline text-amber-300 hover:text-amber-100 font-medium shrink-0 ml-auto"
        >
          View Bill Breakdown
        </button>
      </div>

      {/* Penalty Audit Modal */}
      {showPenaltiesModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-700 text-stone-100 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm tracking-wide uppercase">
                <ShieldAlert className="w-5 h-5 text-amber-500" />
                <span>Active Surcharge & Desi Cess Ledger ({state.penalties.length})</span>
              </div>
              <button
                onClick={() => setShowPenaltiesModal(false)}
                className="text-stone-400 hover:text-stone-200 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-400 mt-2">
              All fees are algorithmically calculated based on quick-commerce desperation. Disputing fees incurs an automatic ₹49.00 Administrative Dispute Surcharge.
            </p>

            <div className="mt-4 max-h-64 overflow-y-auto divide-y divide-stone-800 pr-1">
              {state.penalties.map((fee) => (
                <div key={fee.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span className="text-stone-300">{fee.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-amber-400">
                      +₹{fee.amount.toFixed(2)}
                    </span>
                    <button
                      onClick={() => {
                        sounds.playPressureCooker();
                        dispatch({ type: 'REMOVE_PENALTY', payload: fee.id });
                      }}
                      title="Dispute Fee"
                      className="text-stone-500 hover:text-red-400 transition-colors text-[10px] px-1 py-0.5 rounded border border-stone-800 hover:border-red-800"
                    >
                      Dispute
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-stone-800 flex justify-between items-center text-xs">
              <span className="text-stone-400 font-medium">Accumulated Surcharges:</span>
              <span className="font-mono text-base font-bold text-amber-400">
                ₹{totalPenalties.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => setShowPenaltiesModal(false)}
              className="mt-4 w-full py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl font-medium text-xs transition-colors"
            >
              Acknowledge & Accept Desi Fines
            </button>
          </div>
        </div>
      )}
    </>
  );
}
