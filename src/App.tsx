/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppProvider, useApp } from './state/context';
import { Header } from './components/Header';
import { BrowseView } from './components/BrowseView';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutView } from './components/CheckoutView';
import { TermsTortureView } from './components/TermsTortureView';
import { PaymentView } from './components/PaymentView';
import { ConfirmationView } from './components/ConfirmationView';
import { CookieBanner } from './components/CookieBanner';
import { PenaltyToasts } from './components/PenaltyToasts';
import { TelemetryEngine } from './components/TelemetryEngine';
import { AnnoyingCursorFly } from './components/AnnoyingCursorFly';
import { PassiveAggressiveChat } from './components/PassiveAggressiveChat';
import { WheelOfMisfortune } from './components/WheelOfMisfortune';
import { ExitIntentModal } from './components/ExitIntentModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { BargainingModal } from './components/BargainingModal';
import { FahhhhhButton } from './components/FahhhhhButton';
import { Check, ShieldAlert, Sparkles, Flame, Construction, Bike } from 'lucide-react';

function AppContent() {
  const { state, dispatch } = useApp();

  const STEPS = [
    { key: 'CART', label: '1. Holding Cart' },
    { key: 'CHECKOUT', label: '2. Aadhaar / KYC' },
    { key: 'TERMS', label: '3. Legal Waiver' },
    { key: 'PAYMENT', label: '4. UPI / RuPay' },
    { key: 'CONFIRMED', label: '5. Splendor Out' },
  ];

  const getStepIndex = (view: string) => {
    switch (view) {
      case 'CART':
        return 0;
      case 'CHECKOUT':
        return 1;
      case 'TERMS':
        return 2;
      case 'PAYMENT':
        return 3;
      case 'CONFIRMED':
        return 4;
      default:
        return -1;
    }
  };

  const currentStepIdx = getStepIndex(state.view);
  const isGeocities = state.themeMode === 'GEOCITIES_1999';

  return (
    <div
      className={`min-h-screen flex flex-col selection:bg-amber-400 selection:text-stone-950 transition-colors duration-300 ${
        isGeocities
          ? 'bg-blue-950 text-yellow-300 font-sans'
          : 'bg-stone-950 text-stone-100 font-sans'
      }`}
    >
      <TelemetryEngine />
      <AnnoyingCursorFly />

      {/* Irritating Desi Marquee Top Ticker (Bollywood / Local Bazaar Megasale) */}
      <div className="bg-gradient-to-r from-red-600 via-amber-500 to-red-600 text-black py-1 px-2 text-xs font-black uppercase tracking-wider overflow-hidden border-b-2 border-yellow-300 shadow-md">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          <span>🔥💥 LELE RE BABA! MAHA DHAMAKA SALE! 💥🔥</span>
          <span>🛵 10-MIN JALDI DELIVERY (WILL REACH IN 45 BUSINESS DAYS) 🛵</span>
          <span>🍬 RECYCLED 2018 SOAN PAPDI GUARANTEED IMMORTAL 🍬</span>
          <span>⚡ NO REFUND, NO RETURN, NO ARGUING WITH RAMESH BHAIYA ⚡</span>
          <span>🇮🇳 HAR CLICK PE EXTRA GST AND CHAI-SAMOSA CHARGES 🇮🇳</span>
          <span>🔥💥 LELE RE BABA! MAHA DHAMAKA SALE! 💥🔥</span>
          <span>🛵 10-MIN JALDI DELIVERY (WILL REACH IN 45 BUSINESS DAYS) 🛵</span>
          <span>🍬 RECYCLED 2018 SOAN PAPDI GUARANTEED IMMORTAL 🍬</span>
          <span>⚡ NO REFUND, NO RETURN, NO ARGUING WITH RAMESH BHAIYA ⚡</span>
          <span>🇮🇳 HAR CLICK PE EXTRA GST AND CHAI-SAMOSA CHARGES 🇮🇳</span>
        </div>
      </div>

      {/* Y2K Indian Cyber Cafe Mode Ticker Banner */}
      {isGeocities && (
        <div className="bg-yellow-400 text-black px-4 py-1.5 text-xs font-black tracking-widest uppercase overflow-hidden border-b-4 border-red-600 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2 animate-pulse">
            <Construction className="w-4 h-4 text-red-600" />
            <span>⚠️ APNA CYBER CAFE 2004 ⚠️ SPEED 56 KBPS ⚠️ CHAI-SAMOSA CORNER ⚠️ ORKUT SCRAPBOOK ⚠️</span>
          </div>
          <div className="font-mono bg-black text-lime-400 px-2 py-0.5 rounded text-[10px]">
            HIT COUNTER: 000,042,918
          </div>
        </div>
      )}

      <Header />

      {/* Progress Stepper Bar during Checkout Lifecycle */}
      {currentStepIdx >= 0 && (
        <div className={`py-3 px-4 border-b ${
          isGeocities ? 'bg-purple-950 border-yellow-400' : 'bg-stone-900 border-stone-800'
        }`}>
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            {STEPS.map((step, idx) => {
              const isActive = idx === currentStepIdx;
              const isDone = idx < currentStepIdx;
              return (
                <div key={step.key} className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-colors ${
                      isActive
                        ? 'bg-amber-400 text-stone-950 shadow'
                        : isDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-800 text-stone-500'
                    }`}
                  >
                    {isDone ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                  </div>
                  <span
                    className={`hidden sm:inline text-xs font-medium whitespace-nowrap ${
                      isActive
                        ? 'text-amber-300 font-bold'
                        : isDone
                        ? 'text-stone-300'
                        : 'text-stone-600'
                    }`}
                  >
                    {step.label}
                  </span>
                  {idx < STEPS.length - 1 && (
                    <div className="w-4 sm:w-8 h-px bg-stone-800 mx-1" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Viewport Area */}
      <main className="flex-1 pb-16">
        {state.view === 'BROWSE' && <BrowseView />}
        {state.view === 'CART' && <CartDrawer />}
        {state.view === 'CHECKOUT' && <CheckoutView />}
        {state.view === 'TERMS' && <TermsTortureView />}
        {state.view === 'PAYMENT' && <PaymentView />}
        {state.view === 'CONFIRMED' && <ConfirmationView />}
      </main>

      {/* Annoying Indian Quick-Commerce Interactive Components */}
      <PassiveAggressiveChat />
      <BargainingModal />
      <WheelOfMisfortune />
      <ExitIntentModal />
      <ProductDetailModal />
      <CookieBanner />
      <PenaltyToasts />
      <FahhhhhButton />

      {/* Footer */}
      <footer className="bg-stone-950 border-t border-stone-900 text-stone-500 py-8 px-4 sm:px-6 lg:px-8 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-stone-400">
            <Bike className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-stone-300">Lele Re Baba (LeleReBaba.in)</span>
            <span>·</span>
            <span>Desh ka sabse bekaar quick-commerce platform. Sabhi surcharges anivarya hain.</span>
          </div>

          <div className="flex items-center gap-4 text-stone-500">
            <span>© 2026 Lele Re Baba India Pvt Ltd</span>
            <span>·</span>
            <button
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'TERMS' })}
              className="hover:text-stone-300 underline"
            >
              Mars Arbitration Rules
            </button>
            <span>·</span>
            <button
              onClick={() => dispatch({ type: 'SET_BARGAIN_OPEN', payload: true })}
              className="hover:text-emerald-400 text-emerald-500 font-bold"
            >
              Bhav-Taal Counter
            </button>
            <span>·</span>
            <span>All Fines in INR (₹)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
