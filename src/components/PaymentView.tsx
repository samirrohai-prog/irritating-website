import React, { useState } from 'react';
import { useApp } from '../state/context';
import { QrCode, CreditCard, DollarSign, Lock, ShieldCheck, Sparkles, AlertTriangle, Bike, Smartphone } from 'lucide-react';
import { sounds } from '../utils/audio';
import { StoredOrderReceipt } from '../types';

export function PaymentView() {
  const { state, dispatch, subtotal, totalPenalties, grandTotal } = useApp();
  const [upiId, setUpiId] = useState('user@oksbi');
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'sbi'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);

  // Evasive button physics state
  const [dodgeOffset, setDodgeOffset] = useState({ x: 0, y: 0 });
  const evasionCount = state.checkoutStatus.evasionAttempts;

  const DESI_TAUNTS = [
    'UPI Server Busy! Try faster, bhaiya!',
    'Network chala gaya! Dobara koshish karo!',
    'SBI Lunch Time Chal Raha Hai! Wait karo!',
    'Almost had it! Splendor kick mar rahe hain!',
    'Phew... battery down ho gayi. Click karo jaldi!',
  ];

  const handleButtonMouseEnter = () => {
    if (evasionCount < 4) {
      sounds.playRickshawHorn();
      const randomX = (Math.random() - 0.5) * 260;
      const randomY = (Math.random() - 0.5) * 120;
      setDodgeOffset({ x: randomX, y: randomY });

      const nextCount = evasionCount + 1;
      dispatch({
        type: 'UPDATE_CHECKOUT_STATUS',
        payload: { evasionAttempts: nextCount },
      });

      dispatch({
        type: 'ADD_PENALTY',
        payload: {
          label: `Evasive UPI Button Chase Tariff (Attempt #${nextCount})`,
          amount: 20.00,
          category: 'EVASION',
        },
      });
    } else if (evasionCount === 4) {
      setDodgeOffset({ x: 0, y: 0 });
      dispatch({
        type: 'UPDATE_CHECKOUT_STATUS',
        payload: { evasionAttempts: 5 },
      });
    }
  };

  const handlePay = async () => {
    setIsProcessing(true);
    setProcessingStage(1);
    sounds.playPressureCooker();

    await new Promise((r) => setTimeout(r, 900));
    setProcessingStage(2);
    await new Promise((r) => setTimeout(r, 1100));
    setProcessingStage(3);
    await new Promise((r) => setTimeout(r, 1000));
    setProcessingStage(4);
    await new Promise((r) => setTimeout(r, 800));

    const tipAmount = (subtotal * state.activeTipPercentage) / 100;
    const shippingCosts: Record<string, number> = {
      splendor_neglect: 49.00,
      auto_rickshaw_meter: 89.00,
      delhi_metro_standee: 25.00,
    };
    const shippingCost = shippingCosts[state.formData.shippingTier] || 49.00;

    const receiptPayload: StoredOrderReceipt = {
      orderId: `LELE-BABA-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString(),
      items: state.cart,
      penalties: state.penalties,
      subtotal,
      totalPenalties,
      tipAmount,
      shippingCost,
      grandTotal,
      formData: state.formData,
      metrics: {
        ...state.metrics,
        evasionAttempts: evasionCount,
      },
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(receiptPayload),
      });
      const data = await res.json();
      if (data.orderId) {
        receiptPayload.orderId = data.orderId;
      }
    } catch (e) {
      console.warn('Backend sync offline, using local fallback', e);
    }

    sounds.playChaChing();
    setIsProcessing(false);
    dispatch({ type: 'ORDER_CONFIRMED', payload: receiptPayload });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-800">
        <div>
          <h2 className="text-2xl font-black text-stone-100 flex items-center gap-2">
            <span>Phase 4: UPI / RuPay Evasive Liquidation Terminal</span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Complete your non-refundable digital rupee payment. NPCI servers are sweating.
          </p>
        </div>
        <button
          onClick={() => dispatch({ type: 'SET_VIEW', payload: 'TERMS' })}
          className="text-xs text-stone-400 hover:text-stone-200 underline"
        >
          ← Return to Legal Indenture
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: UPI Mode & Tip */}
        <div className="md:col-span-2 space-y-6">
          {/* Indian Payment Methods Tabs */}
          <div className="p-4 bg-stone-900 border border-stone-800 rounded-2xl space-y-4">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-300 block">
              Choose Hostile Payment Gateway:
            </label>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setSelectedMethod('upi')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1 font-bold ${
                  selectedMethod === 'upi'
                    ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                    : 'bg-stone-950 border-stone-800 text-stone-400'
                }`}
              >
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>UPI (GPay / PhonePe)</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('sbi')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1 font-bold ${
                  selectedMethod === 'sbi'
                    ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                    : 'bg-stone-950 border-stone-800 text-stone-400'
                }`}
              >
                <Lock className="w-4 h-4 text-blue-400" />
                <span>SBI Netbanking</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('card')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1 font-bold ${
                  selectedMethod === 'card'
                    ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                    : 'bg-stone-950 border-stone-800 text-stone-400'
                }`}
              >
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span>RuPay Card</span>
              </button>
            </div>

            {selectedMethod === 'upi' && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="Enter VPA (e.g. mobile@upi)..."
                    className="flex-1 bg-stone-950 border border-stone-700 rounded-xl px-4 py-2 font-mono text-xs text-amber-300 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={() => sounds.playChaChing()}
                    className="px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-stone-950 rounded-xl font-bold text-xs font-mono"
                  >
                    Verify VPA
                  </button>
                </div>
                <div className="p-3 bg-stone-950 border border-stone-800 rounded-xl flex items-center justify-center gap-3">
                  <QrCode className="w-12 h-12 text-amber-400" />
                  <div className="text-left">
                    <div className="text-[11px] font-bold text-stone-200">
                      Scan BHIM UPI QR Code
                    </div>
                    <div className="text-[10px] text-stone-400">
                      Auto-debited under RBI mandate section 420.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedMethod === 'sbi' && (
              <div className="p-3 bg-blue-950/60 border border-blue-800 rounded-xl text-xs text-blue-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>
                  <strong>SBI Server Notice:</strong> Lunch break active from 11:00 AM to 4:45 PM. Please come back after tea break.
                </span>
              </div>
            )}
          </div>

          {/* Delivery Boy Chai-Samosa Tip Selector */}
          <div className="p-5 bg-stone-900 border border-stone-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400 flex items-center gap-1.5">
                <Bike className="w-4 h-4 text-emerald-400" />
                <span>Ramesh Splendor Petrol & Chai-Samosa Contribution</span>
              </span>
              <span className="font-mono text-xs font-bold text-amber-400">
                +₹{((subtotal * state.activeTipPercentage) / 100).toFixed(2)}
              </span>
            </div>

            <p className="text-[11px] text-stone-400">
              Hero Splendor mileage has dropped due to heavy traffic. Select your chai-samosa contribution tier:
            </p>

            <div className="grid grid-cols-4 gap-2 text-xs">
              {[
                { pct: 25, label: '25% (Kanjus)' },
                { pct: 40, label: '40% (Chai + Parle-G)' },
                { pct: 60, label: '60% (Samosa + Chutney)' },
                { pct: 100, label: '100% (New Silencer)' },
              ].map((tier) => (
                <button
                  key={tier.pct}
                  type="button"
                  onClick={() => dispatch({ type: 'SET_TIP', payload: tier.pct })}
                  className={`py-2 px-1 rounded-xl text-center font-bold text-xs transition-all ${
                    state.activeTipPercentage === tier.pct
                      ? 'bg-amber-400 text-stone-950 shadow'
                      : 'bg-stone-950 text-stone-400 border border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div>{tier.pct}%</div>
                  <div className="text-[9px] font-normal truncate mt-0.5">{tier.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Live Fee Ledger & Evasive Button */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-wider text-stone-300 pb-2 border-b border-stone-800">
              Desi Quick-Commerce Bill
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-stone-400">
                <span>Items Subtotal</span>
                <span className="font-mono text-stone-200">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-amber-400">
                <span>Accumulated Penalties ({state.penalties.length})</span>
                <span className="font-mono font-bold">+₹{totalPenalties.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Ramesh Chai Tip ({state.activeTipPercentage}%)</span>
                <span className="font-mono text-stone-200">
                  +₹{((subtotal * state.activeTipPercentage) / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Hero Splendor Delivery</span>
                <span className="font-mono text-stone-200">+₹49.00</span>
              </div>

              <div className="pt-3 border-t border-stone-800 flex justify-between items-baseline">
                <span className="font-bold text-stone-200">Total Payable</span>
                <span className="font-mono text-2xl font-black text-amber-400">
                  ₹{grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Evasive CTA Area */}
          <div className="relative pt-6 pb-8 flex flex-col items-center">
            {/* Taunt text bubble */}
            <div className="text-[11px] font-bold text-amber-400 bg-stone-950 border border-amber-500/40 px-3 py-1 rounded-full mb-3 shadow text-center">
              {evasionCount >= 5 ? 'Stamina khatam! Click karo ab!' : DESI_TAUNTS[evasionCount] || DESI_TAUNTS[0]}
            </div>

            {/* Dodge button */}
            <div
              onMouseEnter={handleButtonMouseEnter}
              style={{
                transform: `translate(${dodgeOffset.x}px, ${dodgeOffset.y}px)`,
                transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)',
              }}
            >
              <button
                onClick={handlePay}
                disabled={isProcessing}
                className={`px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-2xl transition-all ${
                  evasionCount >= 5
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 animate-pulse'
                    : 'bg-amber-400 hover:bg-amber-300 text-stone-950'
                }`}
              >
                {evasionCount >= 5
                  ? `Pay ₹${grandTotal.toFixed(2)} via UPI`
                  : `Pay ₹${grandTotal.toFixed(2)} (Evasive Button)`}
              </button>
            </div>

            <div className="text-[10px] text-stone-400 mt-4 text-center">
              Evasion resistance: {evasionCount}/5 completed (+₹20 chase penalty per dodge)
            </div>
          </div>
        </div>
      </div>

      {/* Agonizing 5-Stage Indian Banking Processing Modal */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border-2 border-emerald-500 rounded-3xl max-w-md w-full p-8 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 mx-auto flex items-center justify-center animate-spin">
              <Sparkles className="w-8 h-8 text-emerald-400" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-stone-100 uppercase tracking-wide">
                NPCI Server Pe Transaction Phas Gaya
              </h3>
              <p className="text-xs text-amber-300 font-mono">
                {processingStage === 1 && 'Stage 1: Connecting with Reserve Bank of India servers...'}
                {processingStage === 2 && 'Stage 2: Deducting ₹49 Cashless India Promotion Cess...'}
                {processingStage === 3 && 'Stage 3: Calling Ramesh on phone: "Bhaiya payment aa gayi!"...'}
                {processingStage === 4 && 'Stage 4: Etching receipt on irreversible digital ledger...'}
              </p>
            </div>

            <div className="w-full bg-stone-950 rounded-full h-2.5 overflow-hidden border border-stone-800">
              <div
                className="bg-emerald-400 h-full transition-all duration-700"
                style={{ width: `${processingStage * 25}%` }}
              />
            </div>

            <p className="text-[11px] text-stone-400">
              Kripya back button ya refresh na dabayein. Refresh karne par ₹50 penalty lagegi!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
