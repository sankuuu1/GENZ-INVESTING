import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Play, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/audio';

export const HoldingsScreen: React.FC = () => {
  const {
    accountMode,
    setAccountMode,
    realHoldings,
    practiceHoldings,
    practiceBalance,
    realBalance,
    isCrashActive,
    setActiveGuardrailModal,
  } = useApp();

  const holdings = accountMode === 'real' ? realHoldings : practiceHoldings;
  const invested = holdings.reduce((acc, h) => acc + h.units * h.avgPrice, 0);
  const currentVal = isCrashActive && accountMode === 'real'
    ? invested * 0.916
    : invested * (accountMode === 'real' ? 1.098 : 1.045);

  const returns = currentVal - invested;
  const returnPercent = invested > 0 ? (returns / invested) * 100 : 0;

  return (
    <div className="space-y-4 pb-4">
      {/* Account Switcher */}
      <div className="bg-gray-100 p-1 rounded-xl grid grid-cols-2 text-xs font-semibold">
        <button
          onClick={() => {
            sound.playTap();
            setAccountMode('real');
          }}
          className={`py-1.5 rounded-lg transition-all ${
            accountMode === 'real' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'
          }`}
        >
          Real Holdings
        </button>
        <button
          onClick={() => {
            sound.playTap();
            setAccountMode('practice');
          }}
          className={`py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${
            accountMode === 'practice' ? 'bg-[#00D09C] text-white shadow-xs' : 'text-gray-500'
          }`}
        >
          <Play className="w-3 h-3 fill-current" />
          <span>Practice Sandbox</span>
        </button>
      </div>

      {/* Portfolio Value Summary Card */}
      <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Current Value</span>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            {accountMode === 'real' ? 'Verified Demat' : 'Simulated Virtual'}
          </span>
        </div>

        <div className="text-2xl font-bold font-mono text-gray-900">
          ₹{currentVal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className={`font-bold ${returns >= 0 ? 'text-[#00D09C]' : 'text-[#EB5757]'}`}>
            {returns >= 0 ? '+' : ''}₹{returns.toFixed(2)} ({returnPercent.toFixed(2)}%)
          </span>
          <span className="text-gray-400">Total Returns</span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 text-xs">
          <div>
            <span className="text-[10px] text-gray-400 block">Total Invested</span>
            <span className="font-mono font-bold text-gray-800">₹{invested.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 block">Available Balance</span>
            <span className="font-mono font-bold text-gray-800">
              ₹{(accountMode === 'real' ? realBalance : practiceBalance).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Holdings List */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight px-1">
          {accountMode === 'real' ? 'Your Assets' : 'Practice Virtual Assets'}
        </h3>

        {holdings.map(h => (
          <div
            key={h.id}
            className="p-3 rounded-xl bg-white border border-gray-200/80 shadow-xs flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-bold text-gray-900">{h.name}</div>
              <div className="text-[11px] text-gray-500 font-mono">
                {h.units.toFixed(2)} units · Avg ₹{h.avgPrice.toFixed(2)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono font-bold text-gray-900">
                ₹{(h.units * (isCrashActive && accountMode === 'real' ? h.currentPrice * 0.916 : h.currentPrice)).toFixed(2)}
              </div>
              <div className={`text-[10px] font-mono font-semibold ${
                isCrashActive && accountMode === 'real' ? 'text-[#EB5757]' : 'text-[#00D09C]'
              }`}>
                {isCrashActive && accountMode === 'real' ? '-8.40% (Dip)' : `+${h.changeTodayPercent}%`}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Crash Reassurance Test Button */}
      {accountMode === 'real' && (
        <button
          onClick={() => {
            sound.playCaution();
            setActiveGuardrailModal('crash');
          }}
          className="w-full py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-rose-100 transition-colors shadow-xs"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          <span>Simulate -8.4% Market Dip & Test Reassurance Screen</span>
        </button>
      )}
    </div>
  );
};
