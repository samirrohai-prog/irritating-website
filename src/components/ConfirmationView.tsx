import { useState } from 'react';
import { useApp } from '../state/context';
import { CheckCircle2, Download, Printer, RotateCcw, ShieldCheck, Clock, MousePointer, Flame, Zap, DollarSign, Bike } from 'lucide-react';

export function ConfirmationView() {
  const { state, dispatch, subtotal, totalPenalties, grandTotal } = useApp();
  const receipt = state.lastOrderReceipt;
  const [copied, setCopied] = useState(false);

  const orderId = receipt?.orderId || 'LELE-BABA-492104';
  const orderTime = receipt?.timestamp
    ? new Date(receipt.timestamp).toLocaleString('en-IN')
    : new Date().toLocaleString('en-IN');

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(receipt || state, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRestart = () => {
    dispatch({ type: 'RESET_STATE' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Success / Hostile Confirmation Banner */}
      <div className="bg-stone-900 border-2 border-emerald-500 rounded-3xl p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 mx-auto flex items-center justify-center text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
            Payment Deducted Successfully · Non-Refundable
          </div>
          <h2 className="text-3xl font-black text-stone-100 tracking-tight">
            Badhaai Ho! Order Confirmed on Lele Re Baba
          </h2>
          <p className="text-xs text-stone-300 max-w-lg mx-auto">
            Your money has been deducted from your bank. Ramesh bhaiya has placed your soan papdi inside his helmet and is warming up his Hero Splendor.
          </p>
        </div>

        {/* Order ID & Server Confirmation Badge */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <span className="font-mono text-xs px-3 py-1.5 rounded-xl bg-stone-950 border border-stone-800 text-amber-300 font-bold">
            Order ID: {orderId}
          </span>
          <span className="text-xs text-stone-400">·</span>
          <span className="text-xs font-mono text-stone-400">{orderTime}</span>
          <span className="text-xs text-stone-400">·</span>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-1 rounded-lg flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Persisted to Express DB</span>
          </span>
        </div>
      </div>

      {/* Telemetry Suffering Scoreboard */}
      <div className="bg-stone-950 border border-stone-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-500" />
          <span>Customer Agony & Surcharge Audit</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-xs font-mono">
          <div className="p-3 bg-stone-900 border border-stone-800 rounded-xl">
            <div className="text-stone-400 text-[10px]">Pixels Scrolled</div>
            <div className="text-base font-bold text-stone-100 mt-1">
              {Math.round(state.metrics.totalPixelsScrolled)}px
            </div>
          </div>

          <div className="p-3 bg-stone-900 border border-stone-800 rounded-xl">
            <div className="text-stone-400 text-[10px]">Rage Clicks</div>
            <div className="text-base font-bold text-red-400 mt-1">
              {state.metrics.rageClicks}
            </div>
          </div>

          <div className="p-3 bg-stone-900 border border-stone-800 rounded-xl">
            <div className="text-stone-400 text-[10px]">Velocity Peaks</div>
            <div className="text-base font-bold text-amber-400 mt-1">
              {state.metrics.cursorVelocityPeaks}
            </div>
          </div>

          <div className="p-3 bg-stone-900 border border-stone-800 rounded-xl">
            <div className="text-stone-400 text-[10px]">Time Wasted</div>
            <div className="text-base font-bold text-stone-100 mt-1">
              {state.metrics.timeOnSiteSeconds}s
            </div>
          </div>

          <div className="p-3 bg-stone-900 border border-stone-800 rounded-xl col-span-2 sm:col-span-1">
            <div className="text-stone-400 text-[10px]">Total Extracted</div>
            <div className="text-base font-bold text-emerald-400 mt-1">
              ₹{grandTotal.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Satirical Delivery Status Tracker */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-2">
          <Bike className="w-4 h-4 text-emerald-400" />
          <span>Ramesh Valet Live Splendor Telemetry</span>
        </h3>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400 flex items-center justify-center shrink-0 text-[10px] font-bold">
              ✓
            </div>
            <div>
              <div className="text-xs font-bold text-stone-200">
                Phase 1: Kacha Bill Printed on Thermal Receipt (Completed)
              </div>
              <div className="text-[11px] text-stone-400">
                Packed in 4 non-biodegradable polythene bags.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-400 flex items-center justify-center shrink-0 text-[10px] font-bold animate-pulse">
              ●
            </div>
            <div>
              <div className="text-xs font-bold text-amber-300">
                Phase 2: Ramesh Drinking Cutting Chai at Roadside Tapri (In Progress)
              </div>
              <div className="text-[11px] text-stone-400">
                Hero Splendor parked near gol chakkar. Ramesh has called you 3 times for landmark.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 opacity-60">
            <div className="w-5 h-5 rounded-full bg-stone-800 text-stone-500 border border-stone-700 flex items-center justify-center shrink-0 text-[10px] font-bold">
              3
            </div>
            <div>
              <div className="text-xs font-bold text-stone-300">
                Phase 3: Package Thrown Over Boundary Wall (Pending)
              </div>
              <div className="text-[11px] text-stone-400">
                Scheduled delivery: between next Tuesday and the next ICC World Cup.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Itemized Desi Quick-Commerce Invoice */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300 pb-2 border-b border-stone-800">
          GST-Compliant Itemized Surcharge Receipt
        </h3>

        {/* Products */}
        <div className="space-y-2 text-xs">
          <div className="text-[11px] font-bold uppercase text-stone-400">Products Ordered:</div>
          {state.cart.map((item) => (
            <div key={item.id} className="flex justify-between py-1 text-stone-300">
              <span>
                {item.quantity}x {item.name}
              </span>
              <span className="font-mono text-stone-100">
                ₹{(item.basePrice * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Penalties */}
        <div className="space-y-2 text-xs pt-3 border-t border-stone-800">
          <div className="text-[11px] font-bold uppercase text-amber-400">
            Algorithmic Micro-Charges & Desi Cess ({state.penalties.length}):
          </div>
          <div className="max-h-48 overflow-y-auto divide-y divide-stone-800/50 pr-2">
            {state.penalties.map((fee) => (
              <div key={fee.id} className="flex justify-between py-1.5 text-stone-400 text-[11px]">
                <span>{fee.label}</span>
                <span className="font-mono text-amber-400">+₹{fee.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Grand Total */}
        <div className="pt-4 border-t border-stone-800 flex justify-between items-baseline">
          <div className="text-sm font-bold text-stone-100">Final Deducted Liquidity:</div>
          <div className="text-2xl font-mono font-black text-emerald-400">
            ₹{grandTotal.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyJSON}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-bold rounded-xl flex items-center gap-2 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied JSON!' : 'Export GST Bill JSON'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-bold rounded-xl flex items-center gap-2 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Kacha Parcha</span>
          </button>
        </div>

        <button
          onClick={handleRestart}
          className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-lg transition-transform active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>New Order (Order More Soan Papdi)</span>
        </button>
      </div>
    </div>
  );
}
