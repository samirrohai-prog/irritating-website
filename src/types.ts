export type ViewState = 'BROWSE' | 'CART' | 'CHECKOUT' | 'TERMS' | 'PAYMENT' | 'CONFIRMED';
export type ThemeMode = 'CORPORATE_HELL' | 'GEOCITIES_1999';

export interface CartItem {
  id: string;
  name: string;
  basePrice: number;
  quantity: number;
  image: string;
  description: string;
  hazardBadge?: string;
  category: string;
  unitWeight?: string;
  mrp?: number;
  discountTag?: string;
}

export type PenaltyCategory =
  | 'SCROLL'
  | 'VELOCITY'
  | 'HESITATION'
  | 'RAGE'
  | 'TYPING'
  | 'SNEAKY_OPT_IN'
  | 'EVASION'
  | 'CAPTCHA'
  | 'ARBITRARY'
  | 'SUPPORT_CHAT'
  | 'WHEEL_MISFORTUNE'
  | 'BARGAIN_AUDACITY'
  | 'AADHAAR_SURCHARGE';

export interface PenaltyFee {
  id: string;
  label: string;
  amount: number;
  transient?: boolean;
  category: PenaltyCategory;
  timestamp: number;
}

export interface GlobalMetrics {
  totalPixelsScrolled: number;
  cursorVelocityPeaks: number;
  hoverHesitationCount: number;
  rageClicks: number;
  timeOnSiteSeconds: number;
}

export interface FormDataState {
  fullName: string;
  phone: number;
  birthDate: string;
  zipCode: string; // PIN code
  shippingTier: string;
  aadhaarNumber: string;
  otpCode: string;
}

export interface CheckoutStatus {
  evasionAttempts: number;
  termsScrolledRatio: number;
  solvedCaptcha: boolean;
  otpVerified: boolean;
  bargainAttempts: number;
}

export interface ChatMessage {
  id: string;
  sender: 'ramesh' | 'user';
  text: string;
  timestamp: string;
}

export interface StoredOrderReceipt {
  orderId: string;
  timestamp: string;
  items: CartItem[];
  penalties: PenaltyFee[];
  subtotal: number;
  totalPenalties: number;
  tipAmount: number;
  shippingCost: number;
  grandTotal: number;
  formData: FormDataState;
  metrics: GlobalMetrics & { evasionAttempts: number };
}

export interface GlobalState {
  view: ViewState;
  cart: CartItem[];
  penalties: PenaltyFee[];
  metrics: GlobalMetrics;
  formData: FormDataState;
  checkoutStatus: CheckoutStatus;
  cookieConsentAccepted: boolean;
  activeTipPercentage: number;
  recentToast?: { id: string; text: string; amount: number };
  lastOrderReceipt?: StoredOrderReceipt;
  // Annoying additions
  themeMode: ThemeMode;
  soundMuted: boolean;
  chatOpen: boolean;
  chatMessages: ChatMessage[];
  wheelOpen: boolean;
  wheelHasSpun: boolean;
  selectedProductId: string | null;
  exitIntentTriggered: boolean;
  flyBuzzActive: boolean;
  bargainModalOpen: boolean;
}

export type Action =
  | { type: 'SET_VIEW'; payload: ViewState }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'ADD_PENALTY'; payload: Omit<PenaltyFee, 'id' | 'timestamp'> }
  | { type: 'REMOVE_PENALTY'; payload: string }
  | { type: 'UPDATE_METRICS'; payload: Partial<GlobalMetrics> }
  | { type: 'UPDATE_FORM'; payload: Partial<FormDataState> }
  | { type: 'UPDATE_CHECKOUT_STATUS'; payload: Partial<CheckoutStatus> }
  | { type: 'SET_TIP'; payload: number }
  | { type: 'ACCEPT_COOKIES' }
  | { type: 'CLEAR_TOAST' }
  | { type: 'ORDER_CONFIRMED'; payload: StoredOrderReceipt }
  | { type: 'RESET_STATE' }
  // Annoying Indian quick-commerce actions
  | { type: 'TOGGLE_THEME' }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'SET_CHAT_OPEN'; payload: boolean }
  | { type: 'ADD_CHAT_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_WHEEL_OPEN'; payload: boolean }
  | { type: 'MARK_WHEEL_SPUN' }
  | { type: 'SET_PRODUCT_INSPECT'; payload: string | null }
  | { type: 'SET_EXIT_INTENT'; payload: boolean }
  | { type: 'TOGGLE_FLY'; payload?: boolean }
  | { type: 'SET_BARGAIN_OPEN'; payload: boolean };
