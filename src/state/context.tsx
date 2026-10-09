import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { GlobalState, Action } from '../types';
import { appReducer, INITIAL_STATE } from './reducer';

interface AppContextType {
  state: GlobalState;
  dispatch: React.Dispatch<Action>;
  subtotal: number;
  totalPenalties: number;
  grandTotal: number;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);

  // Calculate pricing in Indian Rupees ₹
  const subtotal = state.cart.reduce((sum, item) => sum + item.basePrice * item.quantity, 0);
  const totalPenalties = state.penalties.reduce((sum, fee) => sum + fee.amount, 0);
  const tipAmount = (subtotal * state.activeTipPercentage) / 100;

  const shippingCosts: Record<string, number> = {
    splendor_neglect: 49.00,
    auto_rickshaw_meter: 89.00,
    delhi_metro_standee: 25.00,
  };
  const shippingCost = shippingCosts[state.formData.shippingTier] || 49.00;
  const grandTotal = Math.max(0, subtotal + totalPenalties + tipAmount + shippingCost);

  // Auto-clear toasts after 4 seconds
  useEffect(() => {
    if (state.recentToast) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_TOAST' });
      }, 3800);
      return () => clearTimeout(timer);
    }
  }, [state.recentToast]);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        subtotal,
        totalPenalties,
        grandTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
