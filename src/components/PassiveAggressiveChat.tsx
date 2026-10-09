import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../state/context';
import { MessageSquare, X, Send, Bike, AlertCircle } from 'lucide-react';
import { sounds } from '../utils/audio';

export function PassiveAggressiveChat() {
  const { state, dispatch } = useApp();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const RAMESH_RESPONSES = [
    "Bhaiya landmark batao na! Peepal ke ped ke paas khada hoon kab se!",
    "Lift band hai bhaiya, mera ghutna dard kar raha hai, please neeche aao na!",
    "Bhaiya ₹500 ka chutta (change) nahi hai, ₹100 tip rakh raha hoon, thank you!",
    "Silk Board junction pe traffic jam hai, parcel kal subah tak pahunchega.",
    "Aapka kutta bohot bhauk raha hai gate pe, main parcel deewar ke upar se phenk raha hoon!",
    "Bhaiya OTP batao jaldi, phone ki battery 2% hai aur dhoop bohot tez hai!",
    "Google Maps aapka ghar naale ke andar dikha raha hai, kahan rehte ho yaar?",
    "Parcel thoda dab gaya hai helmet ke neeche, par andar ka soan papdi theek hoga shayad!",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.chatMessages, isTyping]);

  // Periodic unsolicited WhatsApp style updates from Ramesh
  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() < 0.3 && !state.chatOpen) {
        const unsolicited = [
          "Bhaiya location check karo na, main galat gali me aa gaya hoon!",
          "Hero Splendor ka petrol khatam ho gaya hai, ₹50 bhejo Google Pay pe!",
          "Bhaiya gate kholo na, horn bajate bajate battery down ho gayi!",
        ];
        const randomMsg = unsolicited[Math.floor(Math.random() * unsolicited.length)];
        dispatch({
          type: 'ADD_CHAT_MESSAGE',
          payload: {
            id: `ramesh-unsolicited-${Date.now()}`,
            sender: 'ramesh',
            text: randomMsg,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        });
      }
    }, 22000);

    return () => clearInterval(timer);
  }, [state.chatOpen, dispatch]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sounds.playRickshawHorn();
    const userMsg = inputText.trim();
    setInputText('');

    // Add user message
    dispatch({
      type: 'ADD_CHAT_MESSAGE',
      payload: {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: userMsg,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    });

    // Levy delivery valet interrogation fee!
    dispatch({
      type: 'ADD_PENALTY',
      payload: {
        label: 'Ramesh Valet Splendor Landmark Interrogation Tip',
        amount: 25.00,
        category: 'SUPPORT_CHAT',
      },
    });

    // Ramesh simulates typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply = RAMESH_RESPONSES[Math.floor(Math.random() * RAMESH_RESPONSES.length)];
      sounds.playDing();
      dispatch({
        type: 'ADD_CHAT_MESSAGE',
        payload: {
          id: `ramesh-${Date.now()}`,
          sender: 'ramesh',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      });
    }, 900);
  };

  return (
    <div className="fixed bottom-5 left-5 z-40">
      {!state.chatOpen ? (
        <button
          onClick={() => dispatch({ type: 'SET_CHAT_OPEN', payload: true })}
          className="flex items-center gap-2.5 px-4 py-2.5 bg-stone-900 border-2 border-emerald-500 rounded-full text-stone-100 shadow-2xl hover:bg-stone-800 transition-all hover:scale-105 active:scale-95 group"
        >
          <div className="relative">
            <Bike className="w-5 h-5 text-emerald-400" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-emerald-400 leading-tight">
              Ramesh (Splendor Valet)
            </div>
            <div className="text-[10px] text-stone-400">At Gol Chakkar · Seeking Landmark</div>
          </div>
        </button>
      ) : (
        <div className="w-80 sm:w-96 bg-stone-900 border-2 border-emerald-500 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-stone-100 h-96">
          {/* Chat Header */}
          <div className="bg-stone-950 px-4 py-3 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center">
                <Bike className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-emerald-300">Ramesh Valet (Splendor DL-4S)</h4>
                <div className="text-[9px] text-stone-400 font-mono">
                  ₹25 Chai-Paani Tip Per Prompt
                </div>
              </div>
            </div>
            <button
              onClick={() => dispatch({ type: 'SET_CHAT_OPEN', payload: false })}
              className="text-stone-400 hover:text-stone-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Fee Warning */}
          <div className="bg-amber-950/60 border-b border-amber-900/40 px-3 py-1 text-[10px] text-amber-300 flex items-center gap-1.5 font-mono">
            <AlertCircle className="w-3 h-3 text-amber-400 shrink-0" />
            <span>Har message pe Ramesh bhaiya ke chai ka kharcha judta hai.</span>
          </div>

          {/* Messages scroll area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-stone-900/90 text-xs">
            {state.chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-3 py-2 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-stone-950 font-medium rounded-br-none'
                      : 'bg-emerald-950 border border-emerald-800 text-emerald-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-stone-500 mt-0.5 px-1 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-1 text-stone-400 text-xs italic bg-stone-850 p-2 rounded w-fit">
                <span>Ramesh is honking horn in traffic</span>
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-100">.</span>
                <span className="animate-bounce delay-200">.</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input form */}
          <form
            onSubmit={handleSendMessage}
            className="p-2.5 bg-stone-950 border-t border-stone-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Landmark batao (e.g. Lal Gate ke saamne)..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              className="p-2 bg-emerald-500 hover:bg-emerald-400 text-stone-950 rounded-lg transition-transform active:scale-95"
              title="Send to Ramesh (+₹25 Tip)"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
