import { useState } from 'react';
import { useApp } from '../state/context';
import { CATALOG_PRODUCTS } from '../data/products';
import { ProductArtwork } from './ProductArtwork';
import { X, Star, AlertTriangle, RotateCw, Plus, ShieldCheck, MessageCircle } from 'lucide-react';
import { sounds } from '../utils/audio';

export function ProductDetailModal() {
  const { state, dispatch } = useApp();
  const [spinSpeed, setSpinSpeed] = useState(1);

  if (!state.selectedProductId) return null;

  const product = CATALOG_PRODUCTS.find((p) => p.id === state.selectedProductId);
  if (!product) return null;

  const handleAccelerateSpin = () => {
    sounds.playPressureCooker();
    setSpinSpeed((prev) => prev + 1);
    dispatch({
      type: 'ADD_PENALTY',
      payload: {
        label: `Centrifugal Inspection Acceleration Fee (RPM x${spinSpeed + 1})`,
        amount: 15.00,
        category: 'ARBITRARY',
      },
    });
  };

  const handleAddToCart = () => {
    sounds.playChaChing();
    dispatch({ type: 'ADD_TO_CART', payload: product });
    dispatch({ type: 'SET_PRODUCT_INSPECT', payload: null });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-stone-900 border-2 border-amber-500 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative text-stone-100 space-y-6">
        <button
          onClick={() => dispatch({ type: 'SET_PRODUCT_INSPECT', payload: null })}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-200 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Visual & 360 Spin */}
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="relative w-48 h-48 rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 flex items-center justify-center shrink-0">
            <div
              style={{
                animation: `spin ${Math.max(0.4, 4 / spinSpeed)}s linear infinite`,
              }}
              className="w-full h-full flex items-center justify-center"
            >
              <ProductArtwork type={product.image} className="w-full h-full" />
            </div>

            <button
              onClick={handleAccelerateSpin}
              className="absolute bottom-2 right-2 text-[9px] bg-amber-400 text-stone-950 font-bold px-2 py-1 rounded shadow flex items-center gap-1 active:scale-95"
              title="Click to slow down (Actually speeds up!)"
            >
              <RotateCw className="w-3 h-3" />
              <span>RPM x{spinSpeed}</span>
            </button>
          </div>

          <div className="flex-1 space-y-2">
            <div className="text-[10px] text-amber-400 font-mono uppercase tracking-widest">
              {product.category} · {product.unitWeight}
            </div>
            <h3 className="text-xl font-extrabold text-stone-100">{product.name}</h3>
            <p className="text-xs text-stone-300 leading-relaxed">{product.description}</p>
            <div className="text-xl font-mono font-bold text-amber-400 pt-1">
              ₹{product.basePrice.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Warning Badge */}
        <div className="p-3 bg-red-950/50 border border-red-800 rounded-xl text-xs text-red-200 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div>
            <strong>Hostile Notice:</strong> {product.warningLabel}
          </div>
        </div>

        {/* Satirical Customer Reviews */}
        <div className="space-y-3 pt-2 border-t border-stone-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center justify-between">
            <span>Verified Desi Customer Reviews</span>
            <div className="flex text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
              <div className="flex justify-between items-center text-[10px] text-stone-400">
                <span className="font-bold text-stone-300">Sharma Ji (Sector 4)</span>
                <span>Kal sham</span>
              </div>
              <p className="text-stone-300 italic">
                "Buaji ko yeh soan papdi box gift kiya. Unhone bina khole Gupta ji ke ghar pass kar diya. Perfect tradition maintained. 5/5 stars."
              </p>
            </div>

            <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
              <div className="flex justify-between items-center text-[10px] text-stone-400">
                <span className="font-bold text-stone-300">Pooja M. (Indiranagar)</span>
                <span>3 din pehle</span>
              </div>
              <p className="text-stone-300 italic">
                "Tiffin dabba ka dhakkan jam ho gaya hai. Ab meri poori family JCB bula rahi hai kholne ke liye. Great craftsmanship!"
              </p>
            </div>
          </div>
        </div>

        {/* Modal CTA */}
        <div className="pt-2 flex items-center justify-between gap-4 border-t border-stone-800">
          <button
            onClick={() => dispatch({ type: 'SET_PRODUCT_INSPECT', payload: null })}
            className="text-xs text-stone-400 hover:text-stone-200 underline"
          >
            Band Karo (Close)
          </button>

          <button
            onClick={handleAddToCart}
            className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-2 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add to Cart & Incur Desi Fines</span>
          </button>
        </div>
      </div>
    </div>
  );
}
