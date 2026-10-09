import React, { useState, useEffect } from 'react';
import { useApp } from '../state/context';
import { AlertCircle, ShieldCheck, Check, Sparkles, RefreshCw, Phone, User, Calendar, MapPin, Bike, Train, KeyRound } from 'lucide-react';
import { sounds } from '../utils/audio';

export function CheckoutView() {
  const { state, dispatch } = useApp();
  const [captchaSelected, setCaptchaSelected] = useState<number[]>([]);
  const [captchaError, setCaptchaError] = useState(false);
  const [typingBackspaces, setTypingBackspaces] = useState(0);

  // OTP Ordeal State
  const [otpValue, setOtpValue] = useState('');
  const [otpTimer, setOtpTimer] = useState(6);
  const [generatedOtp, setGeneratedOtp] = useState('784912');
  const [otpError, setOtpError] = useState(false);

  // Fast countdown for OTP
  useEffect(() => {
    if (state.checkoutStatus.otpVerified) return;
    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          // Timer expired, generate new OTP
          const newCode = Math.floor(100000 + Math.random() * 900000).toString();
          setGeneratedOtp(newCode);
          return 6;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.checkoutStatus.otpVerified]);

  const handleResendOtp = () => {
    sounds.playPressureCooker();
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newCode);
    setOtpTimer(6);
    dispatch({
      type: 'ADD_PENALTY',
      payload: {
        label: 'Impulsive OTP Resend & Telecom SMS Cess',
        amount: 15.00,
        category: 'ARBITRARY',
      },
    });
  };

  const handleVerifyOtp = () => {
    if (otpValue === generatedOtp) {
      sounds.playChaChing();
      dispatch({
        type: 'UPDATE_CHECKOUT_STATUS',
        payload: { otpVerified: true },
      });
      setOtpError(false);
    } else {
      sounds.playBuzzer();
      setOtpError(true);
      dispatch({
        type: 'ADD_PENALTY',
        payload: {
          label: 'Failed WhatsApp OTP Authentication Surcharge',
          amount: 25.00,
          category: 'ARBITRARY',
        },
      });
    }
  };

  // Indian Railway & Traffic Captcha Tiles
  const CAPTCHA_TILES = [
    { id: 0, text: 'Tatkal Waiting List 492', isDread: true },
    { id: 1, text: 'Warm Gulab Jamun', isDread: false },
    { id: 2, text: 'Silk Board Traffic Jam', isDread: true },
    { id: 3, text: 'Crispy Butter Dosa', isDread: false },
    { id: 4, text: 'Expired PAN-Aadhaar Link Fine', isDread: true },
    { id: 5, text: 'Mango Lassi in Earthen Pot', isDread: false },
    { id: 6, text: 'Auto Driver saying "Nahi Jaunga"', isDread: true },
    { id: 7, text: 'Free Dhaniya Pudina from Sabziwala', isDread: false },
    { id: 8, text: 'General Coach Without Seat', isDread: true },
  ];

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      const count = typingBackspaces + 1;
      setTypingBackspaces(count);
      if (count % 3 === 0) {
        sounds.playBuzzer();
        dispatch({
          type: 'ADD_PENALTY',
          payload: {
            label: 'Typing Indecision & Backspace Penalty',
            amount: 15.00,
            category: 'TYPING',
          },
        });
      }
    }
  };

  const handlePhoneSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    dispatch({
      type: 'UPDATE_FORM',
      payload: { phone: val },
    });
  };

  const formatIndianPhone = (val: number) => {
    const str = val.toString().padStart(10, '0');
    return `+91 ${str.slice(0, 5)} ${str.slice(5)}`;
  };

  const handleToggleCaptcha = (id: number) => {
    setCaptchaSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleVerifyCaptcha = () => {
    const dreadIds = [0, 2, 4, 6, 8];
    const pickedDread = captchaSelected.filter((id) => dreadIds.includes(id));
    const pickedNonDread = captchaSelected.filter((id) => !dreadIds.includes(id));

    if (pickedDread.length >= 3 && pickedNonDread.length === 0) {
      sounds.playChaChing();
      dispatch({
        type: 'UPDATE_CHECKOUT_STATUS',
        payload: { solvedCaptcha: true },
      });
      setCaptchaError(false);
    } else {
      sounds.playRickshawHorn();
      setCaptchaError(true);
      dispatch({
        type: 'ADD_PENALTY',
        payload: {
          label: 'Failed IRCTC Tatkal Captcha Calibration Fee',
          amount: 35.00,
          category: 'CAPTCHA',
        },
      });
    }
  };

  const handleProceedToTerms = () => {
    if (!state.checkoutStatus.solvedCaptcha || !state.checkoutStatus.otpVerified) {
      sounds.playBuzzer();
      return;
    }
    dispatch({ type: 'SET_VIEW', payload: 'TERMS' });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-800">
        <div>
          <h2 className="text-2xl font-black text-stone-100 flex items-center gap-2">
            <span>Phase 2: Aadhaar & KYC Biometric Intake</span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Required by Ministry of Overcomplicated Bureaucracy for ordering 1 cardamom pod.
          </p>
        </div>
        <button
          onClick={() => dispatch({ type: 'SET_VIEW', payload: 'CART' })}
          className="text-xs text-stone-400 hover:text-stone-200 underline"
        >
          ← Return to Holding Cart
        </button>
      </div>

      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Full Name (As printed on 10th Board Exam Marksheet)</span>
            </span>
            <span className="text-[10px] text-red-400 font-mono">
              Backspace Fine: ₹15 per 3 backspaces
            </span>
          </label>
          <input
            type="text"
            placeholder="Type carefully without spellings errors..."
            value={state.formData.fullName}
            onKeyDown={handleNameKeyDown}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FORM',
                payload: { fullName: e.target.value },
              })
            }
            className="w-full px-4 py-2.5 bg-stone-950 border border-stone-700 rounded-lg text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* 10-Digit Mobile Range Slider */}
        <div className="space-y-3 p-4 bg-stone-950 border border-stone-800 rounded-xl">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Mobile Number (Precision Slider)</span>
            </label>
            <span className="text-sm font-mono font-bold text-amber-400 bg-stone-900 px-3 py-1 rounded border border-stone-700">
              {formatIndianPhone(state.formData.phone)}
            </span>
          </div>

          <p className="text-[11px] text-stone-400">
            For anti-bot fraud prevention, phone numbers must be dialed by continuously sliding this analog bar to align all 10 digits.
          </p>

          <input
            type="range"
            min={6000000000}
            max={9999999999}
            step={1}
            value={state.formData.phone}
            onChange={handlePhoneSliderChange}
            className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-ew-resize accent-amber-500"
          />

          <div className="flex justify-between items-center text-[10px] text-stone-400">
            <span>+91 60000 00000</span>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  dispatch({
                    type: 'UPDATE_FORM',
                    payload: { phone: Math.max(6000000000, state.formData.phone - 1) },
                  })
                }
                className="px-2 py-0.5 bg-stone-800 hover:bg-stone-700 rounded text-stone-300"
              >
                -1
              </button>
              <button
                onClick={() =>
                  dispatch({
                    type: 'UPDATE_FORM',
                    payload: { phone: Math.min(9999999999, state.formData.phone + 1) },
                  })
                }
                className="px-2 py-0.5 bg-stone-800 hover:bg-stone-700 rounded text-stone-300"
              >
                +1
              </button>
            </div>
            <span>+91 99999 99999</span>
          </div>
        </div>

        {/* WhatsApp OTP Verification Ordeal */}
        <div className="space-y-3 p-4 bg-stone-950 border border-stone-800 rounded-xl">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp 6-Digit OTP Verification</span>
            </label>
            {state.checkoutStatus.otpVerified ? (
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                OTP VERIFIED
              </span>
            ) : (
              <span className="text-xs font-mono font-bold text-red-400">
                Expires in {otpTimer}s!
              </span>
            )}
          </div>

          {!state.checkoutStatus.otpVerified && (
            <div className="space-y-2">
              <div className="p-2.5 bg-stone-900 border border-stone-800 rounded-lg text-xs flex justify-between items-center">
                <span className="text-stone-300">
                  Current WhatsApp Code: <strong className="text-emerald-400 font-mono font-bold text-sm">{generatedOtp}</strong>
                </span>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-[10px] text-amber-400 hover:text-amber-300 underline"
                >
                  Resend OTP (+₹15 Fee)
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP quickly..."
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                  className="flex-1 px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg font-mono text-center tracking-widest text-sm text-stone-100 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-lg"
                >
                  Verify
                </button>
              </div>

              {otpError && (
                <div className="text-[11px] text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Invalid or expired OTP. ₹25 Authentication penalty billed.</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Indian Delivery Mode Selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
            <Bike className="w-3.5 h-3.5 text-amber-400" />
            <span>Delivery Vehicle Neglect Tier</span>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {[
              {
                id: 'splendor_neglect',
                name: 'Hero Splendor (Loose Silencer)',
                price: 49.00,
                desc: 'Ramesh bhaiya honking continuously at gate.',
              },
              {
                id: 'auto_rickshaw_meter',
                name: 'Rigged Auto Rickshaw Meter',
                price: 89.00,
                desc: 'Meter starts at ₹50 and spins 3x faster.',
              },
              {
                id: 'delhi_metro_standee',
                name: 'Delhi Metro Interchange',
                price: 25.00,
                desc: 'Courier squished inside Rajiv Chowk crowd.',
              },
            ].map((tier) => (
              <label
                key={tier.id}
                onClick={() =>
                  dispatch({
                    type: 'UPDATE_FORM',
                    payload: { shippingTier: tier.id },
                  })
                }
                className={`p-3 rounded-xl border cursor-pointer block transition-all ${
                  state.formData.shippingTier === tier.id
                    ? 'bg-amber-950/40 border-amber-500 text-stone-100 shadow'
                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                }`}
              >
                <div className="flex justify-between items-center font-bold">
                  <span>{tier.name}</span>
                  <span className="font-mono text-amber-400">₹{tier.price.toFixed(2)}</span>
                </div>
                <p className="text-[11px] text-stone-400 mt-1">{tier.desc}</p>
              </label>
            ))}
          </div>
        </div>

        {/* IRCTC Tatkal Captcha */}
        <div className="space-y-3 pt-4 border-t border-stone-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Train className="w-4 h-4 text-amber-500" />
              <span>IRCTC Style Proof of Indian Patience CAPTCHA</span>
            </div>
            {state.checkoutStatus.solvedCaptcha && (
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 font-mono">
                <Check className="w-3.5 h-3.5" />
                TATKAL QUALIFIED
              </span>
            )}
          </div>

          <p className="text-xs text-stone-400">
            Select <strong>all tiles depicting Indian Bureaucratic & Transit Agony</strong> to verify your identity.
          </p>

          <div className={`grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-stone-950 border ${
            captchaError ? 'border-red-600 animate-shake' : 'border-stone-800'
          }`}>
            {CAPTCHA_TILES.map((tile) => {
              const selected = captchaSelected.includes(tile.id);
              return (
                <button
                  key={tile.id}
                  type="button"
                  onClick={() => handleToggleCaptcha(tile.id)}
                  className={`h-20 p-2 rounded-lg text-center flex flex-col items-center justify-center text-xs font-medium transition-all ${
                    selected
                      ? 'bg-amber-500 text-stone-950 font-bold border-2 border-amber-300'
                      : 'bg-stone-900 text-stone-300 border border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <span className="leading-snug">{tile.text}</span>
                </button>
              );
            })}
          </div>

          {captchaError && (
            <div className="text-xs text-red-400 font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Wrong tiles! ₹35 Tatkal Captcha Recalibration fine billed.</span>
            </div>
          )}

          {!state.checkoutStatus.solvedCaptcha && (
            <button
              type="button"
              onClick={handleVerifyCaptcha}
              className="w-full py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
            >
              Verify My Tatkal Identity
            </button>
          )}
        </div>

        {/* Proceed to Terms */}
        <div className="pt-4 border-t border-stone-800 flex justify-end">
          <button
            onClick={handleProceedToTerms}
            className={`px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg transition-all ${
              state.checkoutStatus.solvedCaptcha && state.checkoutStatus.otpVerified
                ? 'bg-amber-400 hover:bg-amber-300 text-stone-950 cursor-pointer active:scale-95'
                : 'bg-stone-800 text-stone-500 cursor-not-allowed'
            }`}
          >
            {state.checkoutStatus.solvedCaptcha && state.checkoutStatus.otpVerified
              ? 'Proceed to Legal Waiver & Terms →'
              : 'Complete OTP & Captcha First'}
          </button>
        </div>
      </div>
    </div>
  );
}
