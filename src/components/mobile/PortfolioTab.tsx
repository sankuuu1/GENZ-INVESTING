import React, { useState } from 'react';
import { Calendar, TrendingUp, TrendingDown, ShieldCheck, PlayCircle, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/audio';

export const PortfolioTab: React.FC = () => {
  const {
    realBalance,
    realHoldings,
    practiceBalance,
    practiceHoldings,
    scheduledSIP,
    isCrashActive,
    setIsCrashActive,
    setCurrentMoment
  } = useApp();

  const [mode, setMode] = useState<'real' | 'practice'>('real');

  const holdings = mode === 'real' ? realHoldings : practiceHoldings;
  const investedAmount = mode === 'real'
    ? realHoldings.reduce((acc, h) => acc + h.units * h.avgPrice, 0)
    : practiceHoldings.reduce((acc, h) => acc + h.units * h.avgPrice, 0);

  const currentValuation = isCrashActive && mode === 'real'
    ? investedAmount * 0.916 // -8.4%
    : investedAmount * (mode === 'real' ? 1.098 : 1.045);

  const totalGain = currentValuation - investedAmount;
  const gainPercent = investedAmount > 0 ? (totalGain / investedAmount) * 100 : 0;

  return (
    <div className="space-y-4">
      {/* Real vs Practice Switcher */}
      <div className="grid grid-cols-2 p-1 bg-slate-900 rounded-xl text-xs font-semibold">
        <button
          onClick={() => {
            sound.playTap();
            setMode('real');
          }}
          className={`py-2 rounded-lg transition-all ${
            mode === 'real' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400'
          }`}
        >
          Real Portfolio
        </button>
        <button
          onClick={() => {
            sound.playTap();
            setMode('practice');
          }}
          className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            mode === 'practice' ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm' : 'text-slate-400'
          }`}
        >
          <PlayCircle className="w-3.5 h-3.5" />
          <span>Practice Sandbox</span>
        </button>
      </div>

      {/* Portfolio Summary Card */}
      <div className={`p-4 rounded-2xl border transition-all ${
        isCrashActive && mode === 'real'
          ? 'bg-rose-950/30 border-rose-500/40'
          : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{mode === 'real' ? 'Current Portfolio Value' : 'Simulated Value'}</span>
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">
            {mode === 'real' ? 'First100 Verified' : 'Paper Money'}
          </span>
        </div>

        <div className="text-2xl font-mono font-bold text-white mt-1">
          ₹{currentValuation.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>

        <div className="flex items-center gap-2 mt-1 text-xs font-mono">
          <span className={gainPercent >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
            {gainPercent >= 0 ? '+' : ''}₹{totalGain.toFixed(2)} ({gainPercent.toFixed(2)}%)
          </span>
          <span className="text-slate-500 text-[11px]">Total Returns</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-800/80 text-xs">
          <div>
            <span className="text-[10px] text-slate-500 block">Total Invested</span>
            <span className="font-mono text-white font-medium">₹{investedAmount.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">Available Cash</span>
            <span className="font-mono text-white font-medium">
              ₹{(mode === 'real' ? realBalance : practiceBalance).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Active SIP Card */}
      {scheduledSIP && mode === 'real' && (
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Active Monthly SIP</span>
            </div>
            <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              Automated
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>{scheduledSIP.fundName}</span>
            <span className="font-mono text-white font-bold">₹{scheduledSIP.amount}/mo</span>
          </div>
          <p className="text-[10px] text-slate-400">
            Next auto-debit on the {scheduledSIP.dayOfMonth}st. Keeps compounding uninterrupted.
          </p>
        </div>
      )}

      {/* Holdings Listing */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-white px-1">
          {mode === 'real' ? 'Your Holdings' : 'Simulated Holdings'}
        </div>

        {holdings.length === 0 ? (
          <div className="p-4 rounded-xl bg-slate-900 text-center text-xs text-slate-400">
            No holdings in this view yet.
          </div>
        ) : (
          holdings.map(h => (
            <div
              key={h.id}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-white">{h.name}</div>
                <div className="text-[11px] text-slate-400 font-mono">
                  {h.units.toFixed(2)} units · Avg ₹{h.avgPrice.toFixed(2)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono font-bold text-white">
                  ₹{(h.units * (isCrashActive && mode === 'real' ? h.currentPrice * 0.916 : h.currentPrice)).toFixed(2)}
                </div>
                <div className={`text-[10px] font-mono ${
                  isCrashActive && mode === 'real' ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {isCrashActive && mode === 'real' ? '-8.40%' : `+${h.changeTodayPercent}%`}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Test Trigger for Market Crash */}
      {mode === 'real' && (
        <div className="pt-1">
          <button
            onClick={() => {
              sound.playCaution();
              setCurrentMoment('market_crash');
            }}
            className="w-full py-2.5 rounded-xl bg-slate-900 border border-rose-500/30 hover:border-rose-500/60 text-rose-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Simulate -8.4% Market Dip & Test Reassurance</span>
          </button>
        </div>
      )}
    </div>
  );
};
