import { useState } from 'react';
import { useApp } from '../state/context';
import { ProductArtwork } from './ProductArtwork';
import { Trash2, AlertTriangle, ArrowRight, ShieldAlert, HeartCrack, Plus, Minus } from 'lucide-react';
import { sounds } from '../utils/audio';

export function CartDrawer() {
  const { state, dispatch, subtotal, totalPenalties, grandTotal } = useApp();
  const [guiltTripTarget, setGuiltTripTarget] = useState<string | null>(null);
  const [slipperyRemoveId, setSlipperyRemoveId] = useState<string | null>(null);

  const handleRemoveItem = (id: string) => {
    sounds.playRickshawHorn();
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const handleSlipperyHover = (id: string) => {
    if (!slipperyRemoveId) {
      sounds.playDing();
      setSlipperyRemoveId(id);
      setTimeout(() => setSlipperyRemoveId(null), 1200);
    }
  };

  const handleProceed = () => {
    if (state.cart.length === 0) {
      sounds.playBuzzer();
      dispatch({
        type: 'ADD_PENALTY',
        payload: {
          label: 'Khaali Dabba Empty Cart Inspection Fee',
          amount: 50.00,
          category: 'ARBITRARY',
        },
      });
      return;
    }
    dispatch({ type: 'SET_VIEW', payload: 'CHECKOUT' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Step Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-800">
        <div>
          <h2 className="text-2xl font-black text-stone-100 flex items-center gap-2">
            <span>Involuntary Desi Holding Cart</span>
            <span className="text-xs bg-red-950 text-red-300 border border-red-800 px-2 py-0.5 rounded font-mono">
              NO CASH ON DELIVERY (COD BLOCKED)
            </span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Items placed in cart are legally pledged under the Indian Contract Act 1872.
          </p>
        </div>

        <button
          onClick={() => dispatch({ type: 'SET_VIEW', payload: 'BROWSE' })}
          className="text-xs text-amber-400 hover:text-amber-300 underline"
        >
          ← Return to Quick-Commerce Catalog
        </button>
      </div>

      {state.cart.length === 0 ? (
        <div className="p-12 text-center bg-stone-900 border border-stone-800 rounded-2xl space-y-4">
          <HeartCrack className="w-12 h-12 text-stone-600 mx-auto" />
          <h3 className="text-base font-bold text-stone-200">Aapka Cart Bilkul Khaali Hai!</h3>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            You are attempting to browse without spending. A Khaali Cart Inspection penalty of ₹50.00 will be added if you remain idle.
          </p>
          <button
            onClick={() => dispatch({ type: 'SET_VIEW', payload: 'BROWSE' })}
            className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl"
          >
            Browse Products & Incur Fees
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Item List (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            {state.cart.map((item) => {
              const isDodging = slipperyRemoveId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-stone-900 border border-stone-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 relative overflow-hidden"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-stone-800 bg-stone-950">
                    <ProductArtwork type={item.image} className="w-full h-full" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[10px] text-stone-400">
                      <span>{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-400 font-bold">{item.hazardBadge}</span>
                    </div>
                    <h4 className="text-sm font-bold text-stone-100 truncate mt-0.5">
                      {item.name}
                    </h4>
                    <div className="text-xs font-mono text-amber-400 mt-1 font-bold">
                      ₹{item.basePrice.toFixed(2)} each
                    </div>
                  </div>

                  {/* Quantity and Controls */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-stone-950 border border-stone-800 rounded-xl p-1">
                      <button
                        onClick={() =>
                          dispatch({
                            type: 'UPDATE_QUANTITY',
                            payload: { id: item.id, quantity: item.quantity - 1 },
                          })
                        }
                        className="p-1 text-stone-400 hover:text-stone-200"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-mono font-bold text-stone-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch({
                            type: 'UPDATE_QUANTITY',
                            payload: { id: item.id, quantity: item.quantity + 1 },
                          })
                        }
                        className="p-1 text-stone-400 hover:text-stone-200"
                        title="Increase quantity (incurs Maha-Greedy Cess)"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Slippery Remove Button */}
                    <div
                      onMouseEnter={() => handleSlipperyHover(item.id)}
                      className={`transition-transform duration-200 ${
                        isDodging ? 'translate-x-8 -translate-y-2' : ''
                      }`}
                    >
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-stone-500 hover:text-red-400 transition-colors rounded-lg hover:bg-stone-800"
                        title="Remove Item (Incurs Cancellation Fine)"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Sneaky Auto-Enrolled Indian Quick-Commerce Surcharges */}
            <div className="bg-stone-950 border border-stone-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-500" />
                  <span>Mandatory Desi Platform Surcharges (Non-Negotiable)</span>
                </span>
                <span className="text-[10px] text-stone-400 font-mono">OPT-OUT PROHIBITED</span>
              </div>

              <div className="space-y-2 text-xs">
                {state.penalties
                  .filter((p) => p.category === 'SNEAKY_OPT_IN')
                  .map((fee) => (
                    <div
                      key={fee.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900 border border-stone-800"
                    >
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={true}
                          onChange={() => setGuiltTripTarget(fee.label)}
                          className="w-4 h-4 accent-amber-500 rounded"
                        />
                        <span className="text-stone-300 font-medium">{fee.label}</span>
                      </label>
                      <span className="font-mono text-amber-400 font-bold">
                        +₹{fee.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Quick-Commerce Checkout Summary (1 col) */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-5 h-fit sticky top-24 shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-100 pb-3 border-b border-stone-800">
              Desi Extortion Ledger
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-stone-400">
                <span>Items Subtotal</span>
                <span className="font-mono text-stone-200">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-amber-400">
                <span className="flex items-center gap-1">
                  <span>Algorithmic Penalties</span>
                  <AlertTriangle className="w-3 h-3" />
                </span>
                <span className="font-mono font-bold">+₹{totalPenalties.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Ramesh Chai-Samosa Tip ({state.activeTipPercentage}%)</span>
                <span className="font-mono text-stone-200">
                  +₹{((subtotal * state.activeTipPercentage) / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Hero Splendor Neglect Charge</span>
                <span className="font-mono text-stone-200">+₹49.00</span>
              </div>

              <div className="pt-3 border-t border-stone-800 flex justify-between items-baseline">
                <div>
                  <div className="text-xs uppercase font-bold text-stone-300">Final Deducted Total</div>
                  <div className="text-[10px] text-stone-400">Billed in Indian Rupees (₹)</div>
                </div>
                <div className="text-2xl font-mono font-black text-amber-400">
                  ₹{grandTotal.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Dark Pattern Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => dispatch({ type: 'SET_VIEW', payload: 'BROWSE' })}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg animate-pulse"
              >
                Continue Shopping & Add More Soan Papdi
              </button>

              <button
                onClick={handleProceed}
                className="w-full py-2 text-stone-400 hover:text-stone-200 text-xs underline text-center block transition-colors font-medium"
              >
                Proceed to Aadhaar KYC Intake →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Indian Mom Guilt-Trip Modal */}
      {guiltTripTarget && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-stone-900 border-2 border-red-600 text-stone-100 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <HeartCrack className="w-8 h-8" />
              <h4 className="text-base font-bold">Sanskaari Sanskaar Violation Detected!</h4>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              Beta, you are attempting to uncheck <strong className="text-white">"{guiltTripTarget}"</strong>. Sharma ji ke ladke ne toh poora delivery charge diya tha! Buaji will find out you refused to tip Ramesh bhaiya for his Splendor petrol.
            </p>

            <div className="p-3 bg-stone-950 border border-stone-800 rounded text-[11px] text-amber-300 font-mono">
              Administrative Disrespect Fee of ₹49.00 will be added if you proceed with unchecking.
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => setGuiltTripTarget(null)}
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl"
              >
                I Repent: Sharma Ji Ka Beta Banoonga (Keep Fee)
              </button>

              <button
                onClick={() => {
                  dispatch({
                    type: 'ADD_PENALTY',
                    payload: {
                      label: `Shameless Opt-Out Penalty for "${guiltTripTarget}"`,
                      amount: 49.00,
                      category: 'ARBITRARY',
                    },
                  });
                  setGuiltTripTarget(null);
                }}
                className="w-full py-2 text-[11px] text-stone-500 hover:text-red-400 underline"
              >
                Confirm Shameless Removal (Add ₹49 fine)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
