import React, { useRef, useState } from 'react';
import { useApp } from '../state/context';
import { Scroll, AlertTriangle, ShieldCheck, CheckSquare, Square, Train } from 'lucide-react';
import { sounds } from '../utils/audio';

export function TermsTortureView() {
  const { state, dispatch } = useApp();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [speedWarning, setSpeedWarning] = useState<string | null>(null);
  const lastScrollTop = useRef(0);
  const lastScrollTime = useRef(Date.now());

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const now = Date.now();
    const dt = Math.max(1, now - lastScrollTime.current);
    const dy = Math.abs(target.scrollTop - lastScrollTop.current);
    const scrollSpeed = (dy / dt) * 1000; // px/sec

    lastScrollTop.current = target.scrollTop;
    lastScrollTime.current = now;

    // Speed reading violation trap
    if (scrollSpeed > 1100 && target.scrollTop > 100) {
      target.scrollTop = 0;
      sounds.playMoyeMoye();
      document.body.classList.add('animate-dramatic-soap');
      setTimeout(() => {
        document.body.classList.remove('animate-dramatic-soap');
      }, 850);
      setSpeedWarning('Speed Reading Violation! MOYE MOYE... Aapne Section 4.2 nahi padha jisme Buaji ko WhatsApp forward bhejna anivarya hai. Wapas shuruat me jao!');
      dispatch({
        type: 'ADD_PENALTY',
        payload: {
          label: 'Hawa Me Padhne Ka (Speed Reading) Penalty',
          amount: 35.00,
          category: 'SCROLL',
        },
      });
      setTimeout(() => setSpeedWarning(null), 4500);
      return;
    }

    const maxScroll = target.scrollHeight - target.clientHeight;
    const ratio = maxScroll > 0 ? target.scrollTop / maxScroll : 0;
    setScrollProgress(ratio);
    dispatch({
      type: 'UPDATE_CHECKOUT_STATUS',
      payload: { termsScrolledRatio: ratio },
    });

    if (ratio >= 0.96) {
      setHasScrolledToEnd(true);
    }
  };

  const handleProceed = () => {
    if (!agreed) return;
    sounds.playChaChing();
    dispatch({ type: 'SET_VIEW', payload: 'PAYMENT' });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-800">
        <div>
          <h2 className="text-2xl font-black text-stone-100 flex items-center gap-2">
            <span>Phase 3: Bharatiya Quick-Commerce Legal Waiver</span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Indian Contract Act 1872 & Consumer Disdain Guidelines. Tez scroll karne par ₹35 fine lagega!
          </p>
        </div>
        <button
          onClick={() => dispatch({ type: 'SET_VIEW', payload: 'CHECKOUT' })}
          className="text-xs text-stone-400 hover:text-stone-200 underline"
        >
          ← Return to Aadhaar Intake
        </button>
      </div>

      {/* Speed warning toast */}
      {speedWarning && (
        <div className="p-3 bg-red-950 border border-red-700 rounded-xl text-red-200 text-xs flex items-center gap-2 animate-shake">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{speedWarning}</span>
        </div>
      )}

      {/* Progress meter */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 space-y-2">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-stone-400">Legal Padhai (Comprehension) Progress:</span>
          <span className={`font-bold ${hasScrolledToEnd ? 'text-emerald-400' : 'text-amber-400'}`}>
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
        <div className="w-full h-2 bg-stone-950 rounded-full overflow-hidden border border-stone-800">
          <div
            className="h-full bg-amber-400 transition-all duration-150"
            style={{ width: `${Math.min(100, Math.round(scrollProgress * 100))}%` }}
          />
        </div>
      </div>

      {/* Scrollable Terms Trap */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="h-72 overflow-y-scroll bg-stone-950 border border-stone-800 rounded-2xl p-5 text-xs text-stone-400 space-y-4 leading-relaxed font-serif select-none"
      >
        <h4 className="font-sans font-bold text-sm text-stone-200 uppercase tracking-wider">
          BHARATIYA QUICK-COMMERCE & SAMOSA ARBITRATION ACT (AMENDMENT 2026)
        </h4>

        <p>
          <strong>SECTION 1: IRREVOCABLE SURRENDER OF RETURN RIGHTS.</strong> By loading electrons related to Lele Re Baba (LeleReBaba.in) on your mobile screen or broadband connection, you ("The Hungry Citizen") acknowledge that no item can ever be returned. If Soan Papdi is damaged, you are contractually obligated to re-gift it to Sharma Ji or your buaji within 48 hours.
        </p>

        <p>
          <strong>SECTION 2: MANDATORY RAILWAY ARBITRATION.</strong> All customer complaints, melted Parle-G grievances, and missing elaichi disputes shall be arbitrated exclusively before a retired Station Master at Mughalsarai Junction on Platform 4. The complainant must travel via Unreserved General Coach and bring their own bedding.
        </p>

        <p>
          <strong>SECTION 3: RAMESH BHAIYA DIGNITY CLAUSE.</strong> The Customer acknowledges that delivery valet Ramesh on his Hero Splendor is doing you a massive favor. If Ramesh calls 8 times asking for your landmark near the peepal tree, you must answer respectfully and offer him cold water.
        </p>

        <p>
          <strong>SECTION 4: SPEED READING PENALTY.</strong> The Consumer agrees not to skim this legal text at more than 150 words per minute. Fast-scrolling constitutes bad faith and contempt of quick-commerce panchayat.
        </p>

        <p>
          <strong>SECTION 5: CASH ON DELIVERY EXCLUSION.</strong> Cash on Delivery (COD) is permanently disabled for your PIN code because the local colony vibes are deemed suspicious by our AI algorithms.
        </p>

        <p>
          <strong>SECTION 6: GST & HIDDEN DESI CESS.</strong> You agree to pay the Polythene Bag Ban Fee (₹18), Rain Surcharge (₹35), Small Cart Cess (₹49), and Splendor Petrol Tip (₹45) without questioning Sharma Ji's business ethics.
        </p>

        <p className="font-bold text-stone-300">
          <strong>SECTION 7: FINAL ATTESTATION.</strong> Having thoroughly read every clause without skimming, you may now activate the double-negative sanskaari checkbox below.
        </p>
      </div>

      {/* Hostile Checkbox Trap */}
      <div className="p-4 bg-stone-900 border border-stone-800 rounded-2xl space-y-3">
        <label
          onClick={() => {
            if (!hasScrolledToEnd) {
              sounds.playPressureCooker();
              dispatch({
                type: 'ADD_PENALTY',
                payload: {
                  label: 'Bina Pura Padhe Checkbox Dabane Ka Fine',
                  amount: 25.00,
                  category: 'ARBITRARY',
                },
              });
              return;
            }
            sounds.playDing();
            setAgreed(!agreed);
          }}
          className={`flex items-start gap-3 select-none ${
            hasScrolledToEnd ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
          }`}
        >
          <div className="mt-0.5 shrink-0">
            {agreed ? (
              <CheckSquare className="w-5 h-5 text-amber-400" />
            ) : (
              <Square className="w-5 h-5 text-stone-600" />
            )}
          </div>
          <div className="text-xs text-stone-300 leading-snug">
            <span className="font-semibold text-stone-100">
              Double-Negative Sanskaari Consent:
            </span>{' '}
            I hereby do <strong>NOT</strong> deny my refusal to avoid non-compliance with the Bharatiya Quick-Commerce & Samosa Arbitration Mandate.
          </div>
        </label>

        {!hasScrolledToEnd && (
          <p className="text-[11px] text-amber-400 font-mono">
            * Checkbox disabled until 100% of the Railway arbitration indenture has been scrolled through.
          </p>
        )}
      </div>

      {/* Continue */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleProceed}
          disabled={!agreed}
          className={`px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg transition-all ${
            agreed
              ? 'bg-amber-400 hover:bg-amber-300 text-stone-950 cursor-pointer active:scale-95'
              : 'bg-stone-800 text-stone-600 cursor-not-allowed'
          }`}
        >
          {agreed
            ? 'Proceed to UPI / RuPay Payment Terminal →'
            : 'Accept Terms to Unlock Payment'}
        </button>
      </div>
    </div>
  );
}
