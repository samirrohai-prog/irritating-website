import { useState, useRef } from 'react';
import { useApp } from '../state/context';
import { CATALOG_PRODUCTS, CatalogProduct } from '../data/products';
import { ProductArtwork } from './ProductArtwork';
import { AlertCircle, Plus, Info, RefreshCw, Zap, Sparkles, Eye, Flame, HandCoins, Clock, ShieldCheck } from 'lucide-react';
import { sounds } from '../utils/audio';

export function BrowseView() {
  const { state, dispatch } = useApp();
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);
  const [swappedButtons, setSwappedButtons] = useState<Record<string, boolean>>({});
  const [sortBy, setSortBy] = useState<'regret' | 'negative_stock'>('regret');

  // Handle hover hesitation detection
  const handleMouseEnterCard = (product: CatalogProduct) => {
    setHoveredCardId(product.id);
    hoverTimer.current = setTimeout(() => {
      dispatch({
        type: 'UPDATE_METRICS',
        payload: { hoverHesitationCount: state.metrics.hoverHesitationCount + 1 },
      });
      dispatch({
        type: 'ADD_PENALTY',
        payload: {
          label: `Bina Kharide Window Shopping Penalty (${product.name.slice(0, 16)}...)`,
          amount: 15.00,
          category: 'HESITATION',
        },
      });
    }, 3200);
  };

  const handleMouseLeaveCard = () => {
    setHoveredCardId(null);
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  // Slippery swap on hover for Add button
  const handleButtonMouseEnter = (productId: string) => {
    if (!swappedButtons[productId]) {
      sounds.playRickshawHorn();
      setSwappedButtons((prev) => ({ ...prev, [productId]: true }));
      setTimeout(() => {
        setSwappedButtons((prev) => ({ ...prev, [productId]: false }));
      }, 1400);
    }
  };

  const handleAddToCart = (product: CatalogProduct) => {
    sounds.playChaChing();
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleAddWarranty = (product: CatalogProduct) => {
    sounds.playChaChing();
    dispatch({
      type: 'ADD_PENALTY',
      payload: {
        label: `Zabardasti VIP Kavach Protection for ${product.name.slice(0, 16)}`,
        amount: 199.00,
        category: 'SNEAKY_OPT_IN',
      },
    });
  };

  const sortedProducts = [...CATALOG_PRODUCTS].sort((a, b) => {
    if (sortBy === 'negative_stock') return a.stockCount - b.stockCount;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Indian Festive Maha-Sale Quick-Commerce Hero Banner */}
      <section className="bg-gradient-to-r from-stone-900 via-amber-950/40 to-stone-900 border-2 border-amber-500/80 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4 relative z-10">
          {/* Top Indian Quick-Commerce Ticker */}
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest font-mono text-amber-400 font-bold">
            <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[10px] animate-pulse">
              10-MIN JALDI-DELIVERY
            </span>
            <span>·</span>
            <span className="text-emerald-400">MAHA BACHAT DIWALI DHAMAKA</span>
            <span>·</span>
            <span className="text-yellow-300">GST INCLUDED (EXTRA FEES APPLIED)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-stone-100 tracking-tight leading-tight">
            Desh Ka Sabse Bekaar Quick-Commerce App: Har Click Pe Extra Charges!
          </h1>

          <p className="text-sm text-stone-300 leading-relaxed max-w-2xl">
            Welcome to <strong className="text-amber-400 font-bold">Lele Re Baba (LeleReBaba.in)</strong>! Order in 10 minutes, receive in 47 business days. Guaranteed waiting list, immortal soan papdi, and Ramesh bhaiya calling from the roundabout.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => dispatch({ type: 'SET_BARGAIN_OPEN', payload: true })}
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-stone-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-2 active:scale-95 animate-bounce-short"
            >
              <HandCoins className="w-4 h-4" />
              <span>Bhaiya Thoda Kam Karo (Bargain)</span>
            </button>

            <button
              onClick={() => dispatch({ type: 'SET_WHEEL_OPEN', payload: true })}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-2 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Spin Shubh Muhurat Wheel</span>
            </button>

            <button
              onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
              className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs rounded-xl flex items-center gap-2 border border-stone-700 transition-colors"
            >
              <Flame className="w-4 h-4 text-orange-400" />
              <span>{state.themeMode === 'GEOCITIES_1999' ? 'Corporate View' : 'Y2K Cyber Cafe Mode'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Auspicious Muhurat Warning Ticker */}
      <div className="p-3 bg-amber-950/70 border border-amber-800 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs text-amber-200">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Shubh Rahu-Kaal Warning:</strong> Checkout window open! ₹35 Rain Surcharge active even though outside temperature is 44°C.
          </span>
        </div>
        <span className="font-mono text-emerald-400 font-bold bg-black/60 px-2 py-0.5 rounded">
          SPLENDOR READY AT GOL CHAKKAR
        </span>
      </div>

      {/* Catalog Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <h2 className="text-lg font-bold text-stone-100 flex items-center gap-2">
            <span>Cursed Desi Offerings</span>
            <span className="text-xs font-mono font-normal text-amber-400">
              (MRP slashed to fool you before handling fees)
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-400">Sort Matrix:</span>
          <div className="flex items-center bg-stone-900 border border-stone-800 p-0.5 rounded-lg">
            <button
              onClick={() => setSortBy('regret')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                sortBy === 'regret'
                  ? 'bg-amber-400 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Maximum Regret
            </button>
            <button
              onClick={() => setSortBy('negative_stock')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                sortBy === 'negative_stock'
                  ? 'bg-amber-400 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Deficit Stock
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => {
          const isSwapped = swappedButtons[product.id];
          const inCart = state.cart.find((item) => item.id === product.id);

          return (
            <div
              key={product.id}
              onMouseEnter={() => handleMouseEnterCard(product)}
              onMouseLeave={handleMouseLeaveCard}
              className={`group bg-stone-900 border rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                hoveredCardId === product.id
                  ? 'border-amber-500 shadow-xl shadow-amber-500/10'
                  : 'border-stone-800 hover:border-stone-700'
              }`}
            >
              {/* Product Visual Container */}
              <div className="relative">
                <ProductArtwork type={product.image} className="h-48 w-full" />

                {/* Slashed Discount Tag */}
                {product.discountTag && (
                  <div className="absolute top-3 left-3 text-[10px] font-mono font-black px-2 py-0.5 rounded bg-red-600 text-white shadow-md">
                    {product.discountTag}
                  </div>
                )}

                {/* Hostile Inventory Indicator */}
                <div className="absolute top-3 right-3 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/80 border border-stone-700 text-amber-300 backdrop-blur-sm">
                  {product.stockCount < 0
                    ? `Deficit: ${product.stockCount} in stock`
                    : `Only ${product.stockCount} left`}
                </div>

                {/* Cursed Hazard Tag */}
                {product.hazardBadge && (
                  <div className="absolute bottom-3 left-3 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/90 text-stone-950 shadow">
                    {product.hazardBadge}
                  </div>
                )}

                {/* 360 Spin Inspection trigger */}
                <button
                  onClick={() => dispatch({ type: 'SET_PRODUCT_INSPECT', payload: product.id })}
                  className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-black/70 hover:bg-black text-stone-300 hover:text-white border border-stone-700 shadow"
                  title="360° Detailed Inspection"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-400 mb-1.5">
                    <span>{product.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.unitWeight}</span>
                  </div>

                  <h3
                    onClick={() => dispatch({ type: 'SET_PRODUCT_INSPECT', payload: product.id })}
                    className="text-base font-bold text-stone-100 group-hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Product Features Checklist */}
                <div className="space-y-1.5 pt-2 border-t border-stone-800 text-[11px] text-stone-300">
                  {product.features.slice(0, 2).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Hostile Warning Notice */}
                <div className="p-2 rounded bg-stone-950/60 border border-stone-800/80 text-[10px] text-amber-300/80 flex items-start gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-400 mt-0.5" />
                  <span>{product.warningLabel}</span>
                </div>

                {/* Pricing with Slashed MRP */}
                <div className="pt-3 border-t border-stone-800 flex items-center justify-between gap-3">
                  <div>
                    {product.mrp && (
                      <div className="text-[10px] text-stone-500 line-through font-mono">
                        MRP ₹{product.mrp.toFixed(2)}
                      </div>
                    )}
                    <div className="text-xl font-mono font-black text-amber-400">
                      ₹{product.basePrice.toFixed(2)}
                    </div>
                  </div>

                  {/* Deceptive Swapping Button */}
                  <div className="relative">
                    {isSwapped ? (
                      <button
                        onClick={() => handleAddWarranty(product)}
                        className="px-3 py-2 text-xs font-bold uppercase tracking-wide bg-red-600 hover:bg-red-500 text-white rounded shadow animate-pulse flex items-center gap-1"
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Add VIP Kavach (+₹199)</span>
                      </button>
                    ) : (
                      <button
                        onMouseEnter={() => handleButtonMouseEnter(product.id)}
                        onClick={() => handleAddToCart(product)}
                        className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-stone-100 hover:bg-amber-400 text-stone-900 rounded-lg shadow transition-all active:scale-95 flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{inCart ? `Add More (${inCart.quantity})` : 'Order Now'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Satirical Footnote */}
      <div className="text-center py-6 text-xs text-stone-400 border-t border-stone-800">
        All prices in INR (₹). Platform charges, Polythene Bag Ban fines, and delivery boy samosa contributions are non-negotiable under IT Rules 2026.
      </div>
    </div>
  );
}
