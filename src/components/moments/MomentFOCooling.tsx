import React, { useState } from 'react';
import { AlertOctagon, HelpCircle, ArrowRight, Play, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/audio';

export const MomentFOCooling: React.FC = () => {
  const { setCurrentMoment, setAccountMode, setActiveGuardrailModal } = useApp();
  const [outcomeMessage, setOutcomeMessage] = useState<string | null>(null);

  const handleOpenFOSheet = () => {
    sound.playCaution();
    setActiveGuardrailModal('fo');
  };

  return (
    <div className="space-y-3.5 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">
            DAY 65 · DERIVATIVES GUARDRAIL
          </span>
          <h2 className="text-xs font-bold text-gray-900">Futures & Options Risk Cooling</h2>
        </div>
        <span className="text-[10px] font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full flex items-center gap-1">
          <AlertOctagon className="w-3 h-3 text-rose-500" /> SEBI Risk Advisory
        </span>
      </div>

      {/* Main card */}
      <div className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
            <AlertOctagon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-900">Official SEBI Retail Study</h3>
            <span className="text-[10px] text-gray-500">Market Surveillance FY22 - FY24</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white border border-rose-200 space-y-1.5">
          <div className="text-sm font-extrabold text-rose-700 leading-snug">
            9 out of 10 individual retail traders lose money in F&O.
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            The average net loss per individual was <strong className="font-mono font-bold text-gray-900">₹1.25 Lakh</strong>, excluding additional brokerage and statutory exchange taxes.
          </p>
        </div>

        <p className="text-[11px] text-gray-600 leading-relaxed">
          High financial leverage amplifies both gains and losses. For beginners in their first 100 days, Groww encourages testing derivative contracts in the Practice Sandbox before risking cash savings.
        </p>

        <button
          onClick={handleOpenFOSheet}
          className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
        >
          <span>View F&O Guardrail & Practice Options</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Advance to Day 78 */}
      <button
        onClick={() => {
          sound.playTap();
          setCurrentMoment('market_crash');
        }}
        className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
      >
        <span>Advance to Day 78: First Market Crash (-8.4%)</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
