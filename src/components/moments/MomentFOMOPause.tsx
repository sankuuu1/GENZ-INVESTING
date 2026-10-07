import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, ShieldCheck, ArrowRight, CheckCircle2, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/audio';

export const MomentFOMOPause: React.FC = () => {
  const { profile, setCurrentMoment, setActiveGuardrailModal } = useApp();
  const [outcomeMessage, setOutcomeMessage] = useState<string | null>(null);

  const handlePlaceOrder = () => {
    sound.playCaution();
    setActiveGuardrailModal('fomo');
  };

  return (
    <div className="space-y-3.5 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
            DAY 42 · MOMENTUM & SURVEILLANCE
          </span>
          <h2 className="text-xs font-bold text-gray-900">Exchange Surveillance Guardrail</h2>
        </div>
        <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
          <AlertTriangle className="w-3 h-3 text-amber-500" /> ASM Stage 1
        </span>
      </div>

      {/* Stock Card */}
      <div className="p-3.5 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-bold text-gray-900">NovaTech Clean Power Ltd.</div>
            <span className="text-[11px] text-gray-500">NOVAGREEN · Micro-Cap Solar Equipment</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold font-mono text-gray-900">₹342.80</div>
            <div className="text-xs font-bold font-mono text-[#00D09C]">+5.0% (Upper Circuit)</div>
          </div>
        </div>

        {/* 5-Day Circuit Chart */}
        <div className="p-2.5 rounded-xl bg-white border border-gray-200 space-y-1">
          <div className="flex justify-between text-[10px] text-gray-500">
            <span>5 Sessions Ago: ₹240.00</span>
            <span className="text-amber-700 font-semibold">+42.8% Cumulative Gain</span>
          </div>
          <div className="h-9 flex items-end gap-1 px-1">
            <div className="flex-1 bg-emerald-100 h-2 rounded-t" />
            <div className="flex-1 bg-emerald-200 h-3.5 rounded-t" />
            <div className="flex-1 bg-emerald-300 h-5 rounded-t" />
            <div className="flex-1 bg-emerald-400 h-7 rounded-t" />
            <div className="flex-1 bg-[#00D09C] h-9 rounded-t animate-pulse" />
          </div>
        </div>

        {/* Objective Exchange Data */}
        <div className="p-2.5 rounded-xl bg-white border border-gray-200 text-[11px] text-gray-600 space-y-1">
          <div className="flex justify-between">
            <span>Exchange Status:</span>
            <span className="font-bold text-amber-800">NSE ASM Stage 1 (Price Band 5%)</span>
          </div>
          <div className="flex justify-between">
            <span>Trailing P/E:</span>
            <span className="font-mono font-bold text-rose-600">142.5x (Sector median 24.1x)</span>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-600 hover:to-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
        >
          <span>Tap to Place Buy Order (₹342.80)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-[11px] text-gray-500 leading-relaxed px-1">
        Tapping Buy launches Groww’s contextual reflection sheet with objective valuation and exchange surveillance data.
      </p>

      {/* Advance to Day 65 */}
      <button
        onClick={() => {
          sound.playTap();
          setCurrentMoment('fo_cooling');
        }}
        className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
      >
        <span>Advance to Day 65: F&O Cooling Guardrail</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
