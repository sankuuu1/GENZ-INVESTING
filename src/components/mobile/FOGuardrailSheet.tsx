import React, { useState } from 'react';
import { X, AlertOctagon, Play, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/audio';

export const FOGuardrailSheet: React.FC = () => {
  const { activeGuardrailModal, setActiveGuardrailModal, setAccountMode, setActiveNavTab } = useApp();
  const [confirmedMessage, setConfirmedMessage] = useState<string | null>(null);

  if (activeGuardrailModal !== 'fo') return null;

  const handleClose = () => {
    sound.playTap();
    setActiveGuardrailModal('none');
    setConfirmedMessage(null);
  };

  const handleTryPractice = () => {
    sound.playSuccess();
    setAccountMode('practice');
    setConfirmedMessage('Switched to Practice Sandbox: You can explore simulated F&O without risking your real salary.');
    setTimeout(() => {
      handleClose();
      setActiveNavTab('stocks');
    }, 1400);
  };

  const handleCoolingPeriod = () => {
    sound.playSuccess();
    setConfirmedMessage('Activated 24-hour cooling pause. Real F&O locked until tomorrow so emotions settle.');
    setTimeout(() => {
      handleClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-[420px] bg-white rounded-t-3xl border-t border-gray-100 p-5 shadow-2xl text-gray-900 space-y-4 animate-slide-up">
        {/* Grab handle */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto -mt-1 mb-2" />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-rose-600 font-bold text-xs uppercase tracking-wider">
            <AlertOctagon className="w-4 h-4 text-rose-500" />
            <span>Groww Risk Advisory · SEBI Insight</span>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!confirmedMessage ? (
          <div className="space-y-3">
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Before you explore Futures & Options...
              </h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Here is official research from the Securities and Exchange Board of India:
              </p>
            </div>

            {/* SEBI 9/10 stat card */}
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
              <div className="text-sm font-extrabold text-rose-800 leading-snug">
                9 out of 10 individual retail traders lose money in F&O.
              </div>
              <p className="text-xs text-rose-700 leading-relaxed">
                The average net loss per trader was <strong className="font-mono font-bold">₹1.25 Lakh</strong> (plus an additional 28% in transaction and brokerage charges).
              </p>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Options trading requires institutional-grade risk hedging. For first-time investors, testing in practice mode first avoids catastrophic capital wipeouts.
            </p>

            <div className="space-y-2 pt-1">
              <button
                onClick={handleTryPractice}
                className="w-full py-3 rounded-xl bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Try F&O in Practice Mode First (Virtual ₹10,000)</span>
              </button>

              <button
                onClick={handleCoolingPeriod}
                className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                <span>Take a 24-Hour Cooling Pause</span>
              </button>

              <button
                onClick={handleClose}
                className="w-full py-1.5 text-center text-[11px] text-gray-400 hover:text-gray-600 transition-colors"
              >
                I understand derivative risks · Continue to terminal
              </button>
            </div>
          </div>
        ) : (
          <div className="py-4 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">Guardrail Triggered</h4>
            <p className="text-xs text-gray-600 max-w-xs mx-auto">
              {confirmedMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
