import React from 'react';
import { Box, Train, Zap, Shield, Sparkles, AlertTriangle, Coffee } from 'lucide-react';

interface ProductArtworkProps {
  type: string;
  className?: string;
}

export function ProductArtwork({ type, className = '' }: ProductArtworkProps) {
  switch (type) {
    case 'soan_papdi':
      return (
        <div className={`relative flex items-center justify-center bg-radial from-amber-900 to-stone-950 p-6 overflow-hidden ${className}`}>
          {/* Ornate Golden Festive Soan Papdi Box */}
          <div className="relative w-32 h-28 bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 rounded-lg shadow-2xl border-2 border-yellow-300 transform -rotate-3 hover:rotate-0 transition-transform p-2 flex flex-col justify-between">
            {/* Red Festive Ribbon Cross */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 bg-red-600 border-y border-red-800 flex items-center justify-center text-[7px] font-black text-yellow-200 tracking-wider">
              DIWALI 2018
            </div>
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-3 bg-red-600 border-x border-red-800" />

            <div className="relative z-10 flex justify-between items-start text-[7px] font-bold text-stone-900 uppercase">
              <span>ROYAL MITHAI</span>
              <span className="bg-red-700 text-white px-1 rounded text-[6px]">IMMORTAL</span>
            </div>

            <div className="relative z-10 text-center">
              <span className="font-serif font-black text-xs text-amber-950 tracking-wider drop-shadow-sm">
                SOAN PAPDI
              </span>
            </div>

            <div className="relative z-10 text-[6px] font-mono text-stone-800 text-right">
              RE-GIFT COUNT: 18x
            </div>
          </div>
        </div>
      );

    case 'kurkure':
      return (
        <div className={`relative flex items-center justify-center bg-radial from-orange-900 to-stone-950 p-6 overflow-hidden ${className}`}>
          {/* Inflated Kurkure Foil Packet */}
          <div className="relative w-28 h-32 bg-gradient-to-tr from-orange-600 via-red-500 to-yellow-500 rounded-2xl shadow-2xl border-2 border-orange-400 p-2 flex flex-col justify-between items-center transform rotate-3 hover:scale-105 transition-all">
            <div className="w-full text-center">
              <span className="text-[9px] font-black tracking-widest text-white uppercase drop-shadow">
                KURKURE
              </span>
            </div>

            {/* Twisted Masala Stick illustration */}
            <div className="relative flex items-center justify-center my-1">
              <div className="w-4 h-14 bg-gradient-to-b from-orange-400 via-red-600 to-orange-500 rounded-full transform rotate-12 shadow" />
              <div className="text-[8px] font-mono font-bold text-yellow-200 bg-black/60 px-1 rounded absolute -bottom-2 whitespace-nowrap">
                85% NITROGEN
              </div>
            </div>

            <div className="w-full flex justify-between text-[6px] font-mono text-white">
              <span>MASALA MUNCH</span>
              <span className="font-bold">4 PCS ONLY</span>
            </div>
          </div>
        </div>
      );

    case 'parleg':
      return (
        <div className={`relative flex items-center justify-center bg-radial from-amber-900 to-stone-950 p-6 overflow-hidden ${className}`}>
          {/* Parle-G Biscuit Packet */}
          <div className="relative w-32 h-24 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-400 rounded-md shadow-2xl border-2 border-amber-500 p-2 flex flex-col justify-between transform -rotate-2 hover:rotate-0 transition-transform">
            <div className="flex justify-between items-center border-b border-amber-400 pb-0.5">
              <span className="text-[10px] font-black text-red-600 font-serif tracking-wider">
                Parle-G
              </span>
              <span className="text-[6px] font-mono text-stone-800 bg-white/80 px-1 rounded">
                G FOR GENIUS
              </span>
            </div>

            <div className="flex items-center justify-between text-amber-900">
              <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-400 flex items-center justify-center text-[10px]">
                👶
              </div>
              <div className="text-[7px] font-mono text-red-700 font-bold text-right leading-tight">
                MELT TIME:
                <br />
                0.35 SECS
              </div>
            </div>

            <div className="text-[6px] font-mono text-stone-700 text-center">
              ORIGINAL GLUCOSE BISCUITS (800g)
            </div>
          </div>
        </div>
      );

    case 'tatkal':
      return (
        <div className={`relative flex items-center justify-center bg-radial from-blue-950 to-stone-950 p-6 overflow-hidden ${className}`}>
          {/* IRCTC Tatkal Ticket / Train Engine */}
          <div className="relative w-36 h-28 bg-stone-900 border-2 border-blue-500 rounded-xl p-2.5 shadow-2xl flex flex-col justify-between">
            <div className="flex justify-between items-center text-[8px] font-mono font-bold text-blue-400">
              <div className="flex items-center gap-1">
                <Train className="w-3.5 h-3.5 text-blue-400" />
                <span>IRCTC TATKAL</span>
              </div>
              <span className="text-red-400 font-black animate-pulse">10:00:01 AM</span>
            </div>

            <div className="bg-stone-950 border border-stone-800 p-1.5 rounded text-center space-y-0.5">
              <div className="text-[7px] text-stone-400 font-mono">12952 RAJDHANI EXP · AC 3 TIER</div>
              <div className="text-xs font-black text-red-500 font-mono tracking-widest bg-red-950/80 py-0.5 rounded border border-red-800">
                STATUS: WL 482
              </div>
            </div>

            <div className="flex justify-between items-center text-[7px] font-mono text-stone-400">
              <span>BERTH: NONE</span>
              <span className="text-amber-400">CHANCE: 0.00%</span>
            </div>
          </div>
        </div>
      );

    case 'dabba':
      return (
        <div className={`relative flex items-center justify-center bg-radial from-slate-800 to-stone-950 p-6 overflow-hidden ${className}`}>
          {/* Stainless Steel Tiffin Dabba with vacuum seal */}
          <div className="relative w-24 h-32 flex flex-col items-center justify-center">
            <div className="w-12 h-6 border-4 border-stone-300 rounded-t-full -mb-1 shadow" />
            <div className="w-20 h-8 bg-gradient-to-r from-stone-400 via-stone-200 to-stone-400 rounded-t-lg border-2 border-stone-300 shadow relative">
              <div className="absolute inset-0 flex items-center justify-center text-[7px] font-black text-red-700 tracking-widest">
                VACUUM JAMMED
              </div>
            </div>
            <div className="w-20 h-7 bg-gradient-to-r from-stone-400 via-stone-100 to-stone-400 border-x-2 border-b border-stone-300 shadow" />
            <div className="w-20 h-8 bg-gradient-to-r from-stone-400 via-stone-200 to-stone-400 rounded-b-lg border-2 border-stone-300 shadow" />
            <div className="text-[8px] font-mono text-amber-400 mt-2 font-bold">
              DAL MAKHANI (2021)
            </div>
          </div>
        </div>
      );

    case 'elaichi':
      return (
        <div className={`relative flex items-center justify-center bg-radial from-emerald-950 to-stone-950 p-6 overflow-hidden ${className}`}>
          {/* Giant parcel with 1 tiny cardamom pod inside */}
          <div className="relative w-32 h-28 bg-amber-950 border-2 border-amber-700 rounded-lg p-2 flex flex-col items-center justify-center shadow-2xl">
            <div className="w-full text-center border-b border-amber-800 pb-1 text-[7px] font-mono text-amber-400">
              QUICK-COMMERCE PARCEL
            </div>
            <div className="w-6 h-9 rounded-full bg-emerald-600 border-2 border-emerald-400 shadow-lg my-1 flex items-center justify-center transform rotate-12">
              <div className="w-1 h-6 bg-emerald-700 rounded-full" />
            </div>
            <div className="text-[7px] font-mono font-bold text-red-400 bg-black/60 px-1 rounded">
              QTY: EXACTLY 1 POD
            </div>
            <div className="text-[6px] font-mono text-stone-400 mt-0.5">
              PLASTIC WRAP: 400 GRAMS
            </div>
          </div>
        </div>
      );

    case 'ghee':
      return (
        <div className={`relative flex items-center justify-center bg-radial from-amber-900 to-stone-950 p-6 overflow-hidden ${className}`}>
          {/* Gold tin of Desi Ghee */}
          <div className="relative w-24 h-32 bg-gradient-to-b from-yellow-300 via-amber-500 to-yellow-600 rounded-t-xl rounded-b-lg border-2 border-yellow-200 shadow-2xl p-2 flex flex-col justify-between items-center text-center">
            <div className="w-16 h-3 bg-yellow-100 rounded-full border border-yellow-400" />
            <div className="space-y-0.5">
              <div className="text-[8px] font-bold text-amber-950 font-serif">
                SHUDDH DESI GHEE
              </div>
              <div className="text-[6px] font-mono font-bold text-red-900 bg-yellow-200 px-1 rounded">
                94% VANASPATI
              </div>
            </div>
            <div className="text-[7px] font-mono text-amber-950 font-bold">
              1L TIN (900ML OIL)
            </div>
          </div>
        </div>
      );

    case 'adapter':
      return (
        <div className={`relative flex items-center justify-center bg-radial from-stone-900 to-stone-950 p-6 overflow-hidden ${className}`}>
          {/* Universal Jugaad Plug with Sparks */}
          <div className="relative w-24 h-28 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-stone-100 rounded-xl border-2 border-stone-300 shadow-2xl flex flex-col items-center justify-center p-2 relative">
              <div className="flex gap-4 mb-2">
                <div className="w-3 h-3 rounded-full bg-stone-900 border border-stone-600" />
                <div className="w-3 h-3 rounded-full bg-stone-900 border border-stone-600" />
              </div>
              <div className="w-4 h-4 rounded-full bg-stone-900 border border-stone-600" />
              <div className="absolute -top-3 -right-2 text-blue-400 animate-ping">
                <Zap className="w-6 h-6 fill-blue-400" />
              </div>
            </div>
            <div className="text-[8px] font-mono text-amber-400 mt-2 font-bold flex items-center gap-1">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span>SPARK RATED 240V</span>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className={`flex items-center justify-center bg-stone-800 ${className}`}>
          <Box className="w-10 h-10 text-stone-500" />
        </div>
      );
  }
}
