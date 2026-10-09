import { useApp } from '../state/context';
import { IndianRupee, X } from 'lucide-react';

export function PenaltyToasts() {
  const { state, dispatch } = useApp();

  if (!state.recentToast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-bounce-short">
      <div className="bg-stone-900 border-2 border-amber-500 text-stone-100 rounded-2xl p-3.5 shadow-2xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
            <IndianRupee className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider font-bold text-amber-400">
              Desi Cess Deducted
            </div>
            <div className="text-xs font-medium text-stone-200">
              {state.recentToast.text}
            </div>
          </div>
        </div>
        <button
          onClick={() => dispatch({ type: 'CLEAR_TOAST' })}
          className="text-stone-400 hover:text-stone-200 p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
