import { useState } from 'react';
import { useApp } from '../state/context';
import { Cookie, ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';
import { sounds } from '../utils/audio';

export function CookieBanner() {
  const { state, dispatch } = useApp();
  const [expanded, setExpanded] = useState(false);
  const [rejectWarning, setRejectWarning] = useState(false);
  const [rejectCountdown, setRejectCountdown] = useState(4);

  if (state.cookieConsentAccepted) return null;

  const handleAcceptAll = () => {
    sounds.playDing();
    dispatch({ type: 'ACCEPT_COOKIES' });
  };

  const handleStartReject = () => {
    sounds.playPressureCooker();
    setRejectWarning(true);
    let count = 4;
    const interval = setInterval(() => {
      count -= 1;
      setRejectCountdown(count);
      if (count <= 0) {
        clearInterval(interval);
        dispatch({
          type: 'ADD_PENALTY',
          payload: {
            label: 'TRAI Anti-Compliance Defiance Cess',
            amount: 35.00,
            category: 'ARBITRARY',
          },
        });
        dispatch({ type: 'ACCEPT_COOKIES' });
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 bg-stone-950/95 border-t border-stone-800 text-stone-100 shadow-2xl backdrop-blur-md">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                Mandatory WhatsApp Telemetry & Aadhaar Data Consent
              </h4>
              <p className="text-xs text-stone-400 mt-1 max-w-3xl leading-relaxed">
                Under the Information Technology (Dark Patterns) Act 2026, we track your bargaining hesitation, cursor speed, and battery percentage to ensure Ramesh bhaiya calls you from the wrong address. By continuing, you agree to receive 47 promotional SMS daily.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0 w-full md:w-auto">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-stone-400 hover:text-stone-200 underline px-2 py-1.5 flex items-center gap-1"
            >
              <span>{expanded ? 'Chhupao' : 'Custom Preferences'}</span>
              {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleStartReject}
              className="text-[11px] text-stone-500 hover:text-stone-300 px-3 py-1.5 border border-stone-800 rounded-xl hover:border-stone-700"
            >
              Reject All (Penalized ₹35)
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl shadow-md transition-transform active:scale-95"
            >
              Accept All & Surrender Data
            </button>
          </div>
        </div>

        {/* Granular Preferences Accordion */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-stone-800 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-stone-200">WhatsApp Spam Cookies</span>
                <span className="text-[10px] bg-red-950 text-red-300 border border-red-800 px-1.5 rounded">
                  Mandatory
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                Shares your phone number with local property dealers and matrimonial agents.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-stone-200">Bargaining Hesitation Tracker</span>
                <span className="text-[10px] bg-red-950 text-red-300 border border-red-800 px-1.5 rounded">
                  Mandatory
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                Detects if you hesitate on checkout to dynamically inflate delivery charges.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-stone-200">Hero Splendor GPS Ping</span>
                <span className="text-[10px] bg-red-950 text-red-300 border border-red-800 px-1.5 rounded">
                  Mandatory
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                Tracks how many times Ramesh honks his horn near the colony gate.
              </p>
            </div>
          </div>
        )}

        {/* Reject Penalty Warning Modal */}
        {rejectWarning && (
          <div className="mt-3 p-3 bg-red-950/80 border border-red-700 rounded-xl text-red-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400 animate-spin" />
              <span>
                Rejecting data consent: Incurring ₹35 TRAI Defiance fine in{' '}
                <strong className="font-mono text-white text-sm">{rejectCountdown}s</strong>...
              </span>
            </div>
            <button
              onClick={handleAcceptAll}
              className="text-[11px] underline font-bold text-amber-300 hover:text-white"
            >
              Cancel & Accept All Instead
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
