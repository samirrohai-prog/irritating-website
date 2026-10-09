import { GlobalState, Action, PenaltyFee } from '../types';
import { CATALOG_PRODUCTS, INITIAL_SNEAKY_FEES } from '../data/products';
import { sounds } from '../utils/audio';

export const INITIAL_STATE: GlobalState = {
  view: 'BROWSE',
  cart: [
    {
      ...CATALOG_PRODUCTS[0],
      quantity: 1,
    },
  ],
  penalties: INITIAL_SNEAKY_FEES.map((fee, idx) => ({
    id: `penalty-init-${idx}`,
    label: fee.label,
    amount: fee.amount,
    category: fee.category,
    timestamp: Date.now() - (4 - idx) * 1000,
  })),
  metrics: {
    totalPixelsScrolled: 0,
    cursorVelocityPeaks: 0,
    hoverHesitationCount: 0,
    rageClicks: 0,
    timeOnSiteSeconds: 0,
  },
  formData: {
    fullName: '',
    phone: 9876543210, // 10-digit Indian mobile number
    birthDate: '1998-08-15',
    zipCode: '110001', // Connaught Place, New Delhi PIN Code
    shippingTier: 'splendor_neglect',
    aadhaarNumber: 'XXXX-XXXX-XXXX',
    otpCode: '',
  },
  checkoutStatus: {
    evasionAttempts: 0,
    termsScrolledRatio: 0,
    solvedCaptcha: false,
    otpVerified: false,
    bargainAttempts: 0,
  },
  cookieConsentAccepted: false,
  activeTipPercentage: 40, // 40% Delivery Partner Chai-Samosa Tip
  recentToast: undefined,
  lastOrderReceipt: undefined,

  // Annoying Indian quick-commerce state
  themeMode: 'CORPORATE_HELL',
  soundMuted: false,
  chatOpen: false,
  chatMessages: [
    {
      id: 'ramesh-1',
      sender: 'ramesh',
      text: "Bhaiya location kahan hai? Main gol chakkar pe Hero Splendor khadi karke wait kar raha hoon!",
      timestamp: '12:00 PM',
    },
    {
      id: 'ramesh-2',
      sender: 'ramesh',
      text: "Bhaiya lift band hai toh 5th floor pe aake le lo na, dhoop bohot tez hai!",
      timestamp: '12:01 PM',
    },
  ],
  wheelOpen: false,
  wheelHasSpun: false,
  selectedProductId: null,
  exitIntentTriggered: false,
  flyBuzzActive: true,
  bargainModalOpen: false,
};

export function appReducer(state: GlobalState, action: Action): GlobalState {
  switch (action.type) {
    case 'SET_VIEW': {
      sounds.playDing();
      return {
        ...state,
        view: action.payload,
      };
    }

    case 'ADD_TO_CART': {
      sounds.playChaChing();
      const existingIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      let updatedCart;
      if (existingIndex >= 0) {
        updatedCart = state.cart.map((item, index) =>
          index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }

      const feeId = `penalty-cart-${Date.now()}`;
      const newPenalty: PenaltyFee = {
        id: feeId,
        label: 'Impulse Quick-Commerce Cart Insertion Tax',
        amount: 15.00,
        category: 'ARBITRARY',
        timestamp: Date.now(),
      };

      return {
        ...state,
        cart: updatedCart,
        penalties: [...state.penalties, newPenalty],
        recentToast: { id: feeId, text: 'Quick-Commerce Cart Insertion Tax (+₹15.00)', amount: 15.00 },
      };
    }

    case 'REMOVE_FROM_CART': {
      sounds.playRickshawHorn();
      const updatedCart = state.cart.filter((item) => item.id !== action.payload);
      const feeId = `penalty-del-${Date.now()}`;
      const remorsePenalty: PenaltyFee = {
        id: feeId,
        label: 'Desh Ka Nuksaan Item Cancellation Penalty',
        amount: 45.00,
        category: 'ARBITRARY',
        timestamp: Date.now(),
      };

      return {
        ...state,
        cart: updatedCart,
        penalties: [...state.penalties, remorsePenalty],
        recentToast: { id: feeId, text: 'Item Cancellation Penalty (+₹45.00)', amount: 45.00 },
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return appReducer(state, { type: 'REMOVE_FROM_CART', payload: id });
      }

      const updatedCart = state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );

      const isIncreasing =
        quantity > (state.cart.find((i) => i.id === id)?.quantity || 1);

      if (isIncreasing) {
        sounds.playChaChing();
        const feeId = `penalty-bulk-${Date.now()}`;
        const bulkFee: PenaltyFee = {
          id: feeId,
          label: 'Maha-Greedy Bulk Hoarding Cess',
          amount: 35.00,
          category: 'ARBITRARY',
          timestamp: Date.now(),
        };
        return {
          ...state,
          cart: updatedCart,
          penalties: [...state.penalties, bulkFee],
          recentToast: { id: feeId, text: 'Maha-Greedy Hoarding Cess (+₹35.00)', amount: 35.00 },
        };
      }

      return {
        ...state,
        cart: updatedCart,
      };
    }

    case 'ADD_PENALTY': {
      // Play the viral Moye Moye meme sound or Cha-ching
      if (Math.random() < 0.6) {
        sounds.playMoyeMoye();
      } else {
        sounds.playChaChing();
      }
      const feeId = `penalty-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const newPenalty: PenaltyFee = {
        id: feeId,
        label: action.payload.label,
        amount: action.payload.amount,
        category: action.payload.category,
        transient: action.payload.transient,
        timestamp: Date.now(),
      };

      return {
        ...state,
        penalties: [...state.penalties, newPenalty],
        recentToast: {
          id: feeId,
          text: `${newPenalty.label} (+₹${newPenalty.amount.toFixed(2)})`,
          amount: newPenalty.amount,
        },
      };
    }

    case 'REMOVE_PENALTY': {
      sounds.playPressureCooker();
      const target = state.penalties.find((p) => p.id === action.payload);
      const filtered = state.penalties.filter((p) => p.id !== action.payload);
      const disputeFeeId = `penalty-dispute-${Date.now()}`;
      const disputeFee: PenaltyFee = {
        id: disputeFeeId,
        label: `Administrative Fee for Disputing "${target?.label || 'Fee'}"`,
        amount: 49.00,
        category: 'ARBITRARY',
        timestamp: Date.now(),
      };

      return {
        ...state,
        penalties: [...filtered, disputeFee],
        recentToast: {
          id: disputeFeeId,
          text: `Fee Dispute Processing Surcharge (+₹49.00)`,
          amount: 49.00,
        },
      };
    }

    case 'UPDATE_METRICS': {
      return {
        ...state,
        metrics: {
          ...state.metrics,
          ...action.payload,
        },
      };
    }

    case 'UPDATE_FORM': {
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload,
        },
      };
    }

    case 'UPDATE_CHECKOUT_STATUS': {
      return {
        ...state,
        checkoutStatus: {
          ...state.checkoutStatus,
          ...action.payload,
        },
      };
    }

    case 'SET_TIP': {
      sounds.playChaChing();
      return {
        ...state,
        activeTipPercentage: action.payload,
      };
    }

    case 'ACCEPT_COOKIES': {
      sounds.playDing();
      return {
        ...state,
        cookieConsentAccepted: true,
      };
    }

    case 'CLEAR_TOAST': {
      return {
        ...state,
        recentToast: undefined,
      };
    }

    case 'ORDER_CONFIRMED': {
      sounds.playChaChing();
      return {
        ...state,
        view: 'CONFIRMED',
        lastOrderReceipt: action.payload,
      };
    }

    case 'RESET_STATE': {
      sounds.playDing();
      return {
        ...INITIAL_STATE,
        cookieConsentAccepted: true,
      };
    }

    case 'TOGGLE_THEME': {
      const nextTheme = state.themeMode === 'CORPORATE_HELL' ? 'GEOCITIES_1999' : 'CORPORATE_HELL';
      sounds.playRickshawHorn();
      const feeId = `penalty-theme-${Date.now()}`;
      return {
        ...state,
        themeMode: nextTheme,
        penalties: [
          ...state.penalties,
          {
            id: feeId,
            label: nextTheme === 'GEOCITIES_1999' ? 'Y2K Cyber Cafe Broadband Surcharge' : 'Corporate Quick-Commerce Swag Fee',
            amount: 25.00,
            category: 'ARBITRARY',
            timestamp: Date.now(),
          },
        ],
        recentToast: { id: feeId, text: 'Theme Switching Aesthetic Fee (+₹25.00)', amount: 25.00 },
      };
    }

    case 'TOGGLE_SOUND': {
      const newMuted = !state.soundMuted;
      sounds.setMuted(newMuted);
      if (newMuted) {
        const feeId = `penalty-mute-${Date.now()}`;
        return {
          ...state,
          soundMuted: true,
          penalties: [
            ...state.penalties,
            {
              id: feeId,
              label: 'Silence Royalty & Horn Mute Fee',
              amount: 29.00,
              category: 'ARBITRARY',
              timestamp: Date.now(),
            },
          ],
          recentToast: { id: feeId, text: 'Silence Royalty Surcharge (+₹29.00)', amount: 29.00 },
        };
      }
      sounds.playDing();
      return {
        ...state,
        soundMuted: false,
      };
    }

    case 'SET_CHAT_OPEN': {
      if (action.payload) sounds.playRickshawHorn();
      return {
        ...state,
        chatOpen: action.payload,
      };
    }

    case 'ADD_CHAT_MESSAGE': {
      sounds.playDing();
      return {
        ...state,
        chatMessages: [...state.chatMessages, action.payload],
      };
    }

    case 'SET_WHEEL_OPEN': {
      if (action.payload) sounds.playDing();
      return {
        ...state,
        wheelOpen: action.payload,
      };
    }

    case 'MARK_WHEEL_SPUN': {
      return {
        ...state,
        wheelHasSpun: true,
      };
    }

    case 'SET_PRODUCT_INSPECT': {
      if (action.payload) sounds.playDing();
      return {
        ...state,
        selectedProductId: action.payload,
      };
    }

    case 'SET_EXIT_INTENT': {
      if (action.payload) sounds.playPressureCooker();
      return {
        ...state,
        exitIntentTriggered: action.payload,
      };
    }

    case 'TOGGLE_FLY': {
      const active = action.payload !== undefined ? action.payload : !state.flyBuzzActive;
      return {
        ...state,
        flyBuzzActive: active,
      };
    }

    case 'SET_BARGAIN_OPEN': {
      if (action.payload) sounds.playRickshawHorn();
      return {
        ...state,
        bargainModalOpen: action.payload,
      };
    }

    default:
      return state;
  }
}
