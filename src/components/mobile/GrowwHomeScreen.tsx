import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Flame,
  AlertOctagon,
  Calendar,
  Layers,
  ChevronRight,
  Play,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOMENT_DEFINITIONS } from '../../data/mockMarket';
import { sound } from '../../utils/audio';

export const GrowwHomeScreen: React.FC = () => {
  const {
    accountMode,
    setAccountMode,
    currentMoment,
    setCurrentMoment,
    completedMoments,
    setActiveGuardrailModal,
    setActiveNavTab,
    isCrashActive,
    scheduledSIP,
    practiceBalance,
    realBalance,
  } = useApp();

  return (
    <div className="space-y-4 pb-4">
      {/* 1. Indices Bar (Authentic Groww App) */}
      <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar pt-1">
        {/* NIFTY 50 */}
        <div className="min-w-[130px] p-2.5 rounded-xl bg-white border border-gray-200/80 shadow-xs shrink-0">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-tight">NIFTY 50</div>
          <div className="text-sm font-bold text-gray-900 font-mono mt-0.5">
            {isCrashActive ? '22,780.40' : '24,852.15'}
          </div>
          <div className={`text-[10px] font-semibold font-mono flex items-center gap-0.5 ${
            isCrashActive ? 'text-[#EB5757]' : 'text-[#00D09C]'
          }`}>
            {isCrashActive ? '-1,980.20 (-8.40%)' : '+132.40 (+0.54%)'}
          </div>
        </div>

        {/* SENSEX */}
        <div className="min-w-[130px] p-2.5 rounded-xl bg-white border border-gray-200/80 shadow-xs shrink-0">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-tight">SENSEX</div>
          <div className="text-sm font-bold text-gray-900 font-mono mt-0.5">
            {isCrashActive ? '74,620.15' : '81,422.30'}
          </div>
          <div className={`text-[10px] font-semibold font-mono flex items-center gap-0.5 ${
            isCrashActive ? 'text-[#EB5757]' : 'text-[#00D09C]'
          }`}>
            {isCrashActive ? '-6,580.10 (-8.12%)' : '+388.90 (+0.48%)'}
          </div>
        </div>

        {/* BANK NIFTY */}
        <div className="min-w-[130px] p-2.5 rounded-xl bg-white border border-gray-200/80 shadow-xs shrink-0">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-tight">BANK NIFTY</div>
          <div className="text-sm font-bold text-gray-900 font-mono mt-0.5">51,320.40</div>
          <div className="text-[10px] font-semibold font-mono text-[#EB5757]">
            -42.10 (-0.08%)
          </div>
        </div>
      </div>

      {/* 2. THE INTEGRATED GEN Z "GROWW FIRST100" SECTION */}
      <section className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/30 border-2 border-[#00D09C]/40 shadow-xs space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#00D09C] flex items-center justify-center text-white">
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-xs font-bold text-gray-900">First100 · Gen Z Investor Mode</h2>
                <span className="text-[9px] font-bold bg-[#00D09C] text-white px-1.5 py-0.2 rounded-full">
                  ACTIVE
                </span>
              </div>
              <p className="text-[11px] text-gray-500">
                Guiding your first 100 days · Survivor streak: Safe
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playTap();
              setActiveNavTab('first100');
            }}
            className="text-xs font-bold text-[#00B386] hover:text-emerald-800 flex items-center gap-0.5"
          >
            <span>Timeline</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Real vs Practice Switcher (Crucial for Gen Z) */}
        <div className="bg-gray-100/90 p-1 rounded-xl grid grid-cols-2 text-xs font-semibold">
          <button
            onClick={() => {
              sound.playTap();
              setAccountMode('real');
            }}
            className={`py-1.5 rounded-lg transition-all ${
              accountMode === 'real'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Real Demat (₹{realBalance})
          </button>

          <button
            onClick={() => {
              sound.playTap();
              setAccountMode('practice');
            }}
            className={`py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${
              accountMode === 'practice'
                ? 'bg-[#00D09C] text-white shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Practice Sandbox (₹{practiceBalance.toFixed(0)})</span>
          </button>
        </div>

        {/* Scheduled SIP Habit Status */}
        {scheduledSIP && (
          <div className="p-2.5 rounded-xl bg-white border border-gray-200/70 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#00D09C]" />
              <div>
                <span className="font-semibold text-gray-900">₹{scheduledSIP.amount}/mo SIP Scheduled</span>
                <span className="text-[10px] text-gray-500 block">Nippon Nifty 50 · Salary Payday</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Automated
            </span>
          </div>
        )}

        {/* Quick Test Moments Carousel */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px] text-gray-500">
            <span className="font-semibold text-gray-700">Experience the 8 Moments:</span>
            <span>{completedMoments.size}/8 tested</span>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {MOMENT_DEFINITIONS.map(m => {
              const isActive = currentMoment === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    sound.playTap();
                    setCurrentMoment(m.id);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap border shrink-0 transition-all ${
                    isActive
                      ? 'bg-gray-900 text-white border-gray-900 shadow-xs'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {m.label}: {m.shortTitle}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Most Bought on Groww (Authentic Groww Section) */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            Most Bought on Groww
          </h3>
          <span className="text-[11px] text-[#00B386] font-semibold cursor-pointer">
            View all
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Tata Motors */}
          <div
            onClick={() => sound.playTap()}
            className="p-3 rounded-xl bg-white border border-gray-200/80 shadow-xs cursor-pointer hover:border-gray-300 transition-all"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center mb-2">
              TM
            </div>
            <div className="text-xs font-bold text-gray-900 truncate">Tata Motors</div>
            <div className="text-xs font-bold font-mono text-gray-900 mt-1">₹945.30</div>
            <div className="text-[10px] font-mono text-[#EB5757] font-semibold">-0.40% (1D)</div>
          </div>

          {/* Zomato */}
          <div
            onClick={() => sound.playTap()}
            className="p-3 rounded-xl bg-white border border-gray-200/80 shadow-xs cursor-pointer hover:border-gray-300 transition-all"
          >
            <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 font-bold text-xs flex items-center justify-center mb-2">
              Z
            </div>
            <div className="text-xs font-bold text-gray-900 truncate">Zomato Ltd.</div>
            <div className="text-xs font-bold font-mono text-gray-900 mt-1">₹268.50</div>
            <div className="text-[10px] font-mono text-[#00D09C] font-semibold">+1.45% (1D)</div>
          </div>
        </div>
      </section>

      {/* 4. Products & Tools (Authentic Groww 4-Icon Grid) */}
      <section className="space-y-2">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight px-1">
          Products & Tools
        </h3>

        <div className="grid grid-cols-4 gap-2">
          {/* F&O - Guardrail Trigger */}
          <button
            onClick={() => {
              sound.playCaution();
              setActiveGuardrailModal('fo');
            }}
            className="p-2.5 rounded-xl bg-white border border-rose-200/80 hover:border-rose-400 flex flex-col items-center justify-center text-center shadow-xs transition-all relative"
          >
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mb-1">
              <AlertOctagon className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-gray-800 leading-tight">F&O</span>
            <span className="text-[8px] font-bold text-rose-600 bg-rose-50 px-1 rounded mt-0.5">
              SEBI Nudge
            </span>
          </button>

          {/* IPO */}
          <button
            onClick={() => sound.playTap()}
            className="p-2.5 rounded-xl bg-white border border-gray-200/80 hover:border-gray-300 flex flex-col items-center justify-center text-center shadow-xs transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1">
              <Layers className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-gray-800 leading-tight">IPO</span>
            <span className="text-[9px] text-gray-400">Open (3)</span>
          </button>

          {/* Intraday */}
          <button
            onClick={() => sound.playTap()}
            className="p-2.5 rounded-xl bg-white border border-gray-200/80 hover:border-gray-300 flex flex-col items-center justify-center text-center shadow-xs transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-gray-800 leading-tight">Intraday</span>
            <span className="text-[9px] text-gray-400">Screener</span>
          </button>

          {/* All Stocks */}
          <button
            onClick={() => sound.playTap()}
            className="p-2.5 rounded-xl bg-white border border-gray-200/80 hover:border-gray-300 flex flex-col items-center justify-center text-center shadow-xs transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-1">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-gray-800 leading-tight">All Stocks</span>
            <span className="text-[9px] text-gray-400">5,000+</span>
          </button>
        </div>
      </section>

      {/* 5. Top Circuit Movers with Surveillance Nudge */}
      <section className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
              Top Circuit Movers (Surveillance Watch)
            </h3>
          </div>
          <span className="text-[10px] text-gray-400 font-medium">Tap to test ASM nudge</span>
        </div>

        {/* NovaTech Clean Power (Surging +42.8% in ASM) */}
        <div
          onClick={() => {
            sound.playCaution();
            setActiveGuardrailModal('fomo');
          }}
          className="p-3 rounded-xl bg-amber-50/50 border border-amber-200 hover:border-amber-300 cursor-pointer shadow-xs transition-all flex items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-gray-900">NovaTech Clean Power</span>
              <span className="text-[9px] font-bold bg-amber-100 text-amber-800 border border-amber-200 px-1.5 py-0.2 rounded-full">
                ASM Stage 1
              </span>
            </div>
            <span className="text-[11px] text-gray-500">
              Micro-Cap Energy · Upper Circuit (+42.8% 5D)
            </span>
          </div>

          <div className="text-right">
            <div className="text-xs font-bold font-mono text-gray-900">₹342.80</div>
            <div className="text-xs font-bold font-mono text-[#00D09C]">+5.0% (Upper Circuit)</div>
          </div>
        </div>
      </section>

      {/* 6. Beginners First SIP Collections */}
      <section className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            Beginner SIP with ₹500
          </h3>
          <span className="text-[11px] text-[#00B386] font-semibold cursor-pointer">
            Explore
          </span>
        </div>

        <div className="p-3 rounded-xl bg-white border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-900">Nippon India Nifty 50 Index Fund</div>
            <span className="text-[11px] text-gray-500">Direct-Growth · Lowest 0.10% Expense</span>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold font-mono text-gray-900">₹38.45</div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              Ideal Start
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
