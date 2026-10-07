import React, { useState } from 'react';
import { TrendingDown, ShieldCheck, ShoppingBag, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HISTORICAL_CRASH_DATA } from '../../data/mockMarket';
import { sound } from '../../utils/audio';

export const MomentMarketCrash: React.FC = () => {
  const { setCurrentMoment, setActiveGuardrailModal } = useApp();
  const [activeTab, setActiveTab] = useState<'discount' | 'history'>('discount');
  const [streakProtected, setStreakProtected] = useState(false);

  const handleProtectStreak = () => {
    sound.playSuccess();
    setStreakProtected(true);
  };

  const handleOpenCrashSheet = () => {
    sound.playCaution();
    setActiveGuardrailModal('crash');
  };

  return (
    <div className="space-y-3.5 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">
            DAY 78 · MARKET DRAWDOWN
          </span>
          <h2 className="text-xs font-bold text-gray-900">The -8.4% Market Dip</h2>
        </div>
        <span className="text-[10px] font-mono font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full flex items-center gap-1">
          <TrendingDown className="w-3 h-3 text-rose-500" /> -8.4% Today
        </span>
      </div>

      {/* Red Portfolio Card */}
      <div className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Your Current Portfolio</span>
          <span className="font-mono font-bold text-rose-700">NIFTY 50 -8.40%</span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold font-mono text-gray-900">₹1,374.00</span>
          <span className="text-xs font-mono font-bold text-rose-600">-₹126.00 (-8.4%)</span>
        </div>

        <div className="p-3 rounded-xl bg-white border border-rose-200 space-y-1">
          <div className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
            <span>The Natural Beginner Hesitation</span>
          </div>
          <p className="text-[11px] text-gray-600 leading-relaxed">
            Beginners often feel tempted to hit &ldquo;Stop SIP&rdquo; during temporary drawdowns. Groww provides contextual data to show how market dips lower your acquisition costs.
          </p>
        </div>
      </div>

      {/* Rupee-Cost Averaging Math Card */}
      <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
            <ShoppingBag className="w-4 h-4 text-[#00D09C]" />
            <span>Discount SIP Accumulation</span>
          </div>
          <span className="text-[10px] font-mono font-bold text-[#00D09C] bg-white px-2 py-0.5 rounded border border-emerald-200">
            +9% Extra Units
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
          <div className="bg-white p-2.5 rounded-xl border border-gray-200">
            <span className="text-[10px] text-gray-400 block font-sans">Normal NAV</span>
            <span className="font-bold text-gray-800">13.01 Units</span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-emerald-300">
            <span className="text-[10px] text-emerald-700 block font-sans">Dip NAV (Today)</span>
            <span className="font-bold text-[#00D09C]">14.20 Units</span>
          </div>
        </div>

        <p className="text-[11px] text-emerald-900 leading-relaxed">
          Your scheduled ₹500 SIP automatically buys more units at cheaper valuations without timing the market.
        </p>
      </div>

      {streakProtected ? (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#00D09C] shrink-0" />
          <span>Discipline Score 100%! Streak protected throughout the dip.</span>
        </div>
      ) : (
        <div className="space-y-2 pt-1">
          <button
            onClick={handleProtectStreak}
            className="w-full py-3 rounded-xl bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Keep SIP Intact · Protect 100-Day Streak</span>
          </button>

          <button
            onClick={handleOpenCrashSheet}
            className="w-full py-2 text-center text-xs text-gray-500 hover:text-gray-800"
          >
            Open Full Reassurance Bottom Sheet
          </button>
        </div>
      )}

      {/* Advance to Day 100 */}
      <button
        onClick={() => {
          sound.playTap();
          setCurrentMoment('day100_recap');
        }}
        className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
      >
        <span>Advance to Day 100: Survivor Recap</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
