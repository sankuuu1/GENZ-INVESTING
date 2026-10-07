import React, { useState } from 'react';
import { X, TrendingDown, ShieldCheck, History, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HISTORICAL_CRASH_DATA } from '../../data/mockMarket';
import { sound } from '../../utils/audio';

export const CrashGuardrailSheet: React.FC = () => {
  const { activeGuardrailModal, setActiveGuardrailModal, isCrashActive } = useApp();
  const [activeTab, setActiveTab] = useState<'math' | 'history'>('math');
  const [acknowledged, setAcknowledged] = useState(false);

  if (activeGuardrailModal !== 'crash') return null;

  const handleClose = () => {
    sound.playTap();
    setActiveGuardrailModal('none');
    setAcknowledged(false);
  };

  const handleProtect = () => {
    sound.playSuccess();
    setAcknowledged(true);
    setTimeout(() => {
      handleClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-[420px] bg-white rounded-t-3xl border-t border-gray-100 p-5 shadow-2xl text-gray-900 space-y-4 animate-slide-up">
        {/* Grab handle */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto -mt-1 mb-2" />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-rose-600 font-bold text-xs uppercase tracking-wider">
            <TrendingDown className="w-4 h-4 text-rose-500" />
            <span>Market Dip · Reassurance Guide</span>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!acknowledged ? (
          <div className="space-y-3">
            <div>
              <h3 className="text-base font-bold text-gray-900">
                NIFTY 50 is down -8.4% today.
              </h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Seeing red is uncomfortable, but a temporary market dip does not mean your plan is broken.
              </p>
            </div>

            {/* Sub-tabs */}
            <div className="bg-gray-100 p-1 rounded-xl grid grid-cols-2 text-xs font-semibold">
              <button
                onClick={() => {
                  sound.playTap();
                  setActiveTab('math');
                }}
                className={`py-1.5 rounded-lg transition-all ${
                  activeTab === 'math' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'
                }`}
              >
                The Discount SIP Math
              </button>
              <button
                onClick={() => {
                  sound.playTap();
                  setActiveTab('history');
                }}
                className={`py-1.5 rounded-lg transition-all ${
                  activeTab === 'history' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'
                }`}
              >
                Crash History
              </button>
            </div>

            {activeTab === 'math' ? (
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <ShoppingBag className="w-4 h-4 text-[#00D09C]" />
                  <span>Your SIP Just Bought Cheaper Units</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                  <div className="bg-white p-2 rounded-lg border border-gray-100">
                    <span className="text-[10px] text-gray-400 block font-sans">Normal NAV</span>
                    <span className="text-gray-800 font-bold">13.01 Units</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-emerald-300">
                    <span className="text-[10px] text-emerald-600 block font-sans">Dip NAV (Today)</span>
                    <span className="text-[#00D09C] font-bold">14.20 Units (+9%)</span>
                  </div>
                </div>
                <p className="text-[11px] text-emerald-900 leading-relaxed pt-1">
                  When markets eventually rebound, those extra discounted units drive your biggest compounding returns.
                </p>
              </div>
            ) : (
              <div className="space-y-1.5">
                {HISTORICAL_CRASH_DATA.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-gray-50 border border-gray-200/80 text-xs space-y-0.5">
                    <div className="flex justify-between font-bold text-gray-800">
                      <span>{item.event}</span>
                      <span className="text-rose-600 font-mono">{item.drop}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-gray-500">
                      <span>Recovery: {item.recoveryMonths}</span>
                      <span className="text-emerald-600 font-semibold">{item.postRecoveryGain}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-1 space-y-2">
              <button
                onClick={handleProtect}
                className="w-full py-3 rounded-xl bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Keep My SIP Intact · Protect Streak</span>
              </button>

              <button
                onClick={handleClose}
                className="w-full py-1 text-center text-xs text-gray-400 hover:text-gray-600"
              >
                Close Reassurance View
              </button>
            </div>
          </div>
        ) : (
          <div className="py-4 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">Discipline Score 100%</h4>
            <p className="text-xs text-gray-600 max-w-xs mx-auto">
              You stayed calm during an -8.4% drawdown. Your SIP will continue buying units on autopilot.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
