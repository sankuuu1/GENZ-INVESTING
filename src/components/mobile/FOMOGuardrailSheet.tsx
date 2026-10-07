import React, { useState } from 'react';
import { X, AlertTriangle, ShieldCheck, ArrowRight, Eye, CheckCircle2, TrendingUp, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/audio';

export const FOMOGuardrailSheet: React.FC = () => {
  const { activeGuardrailModal, setActiveGuardrailModal, profile } = useApp();
  const [viewState, setViewState] = useState<'notice' | 'fundamentals' | 'confirmed'>('notice');

  if (activeGuardrailModal !== 'fomo') return null;

  const handleClose = () => {
    sound.playTap();
    setActiveGuardrailModal('none');
    setViewState('notice');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-[420px] bg-white rounded-t-3xl border-t border-gray-100 p-5 shadow-2xl text-gray-900 space-y-3.5 animate-slide-up">
        {/* Grab handle */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto -mt-1 mb-2" />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-amber-700 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>NSE Surveillance Advisory · ASM Stage 1</span>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {viewState === 'notice' && (
          <div className="space-y-3">
            <div>
              <h3 className="text-base font-bold text-gray-900">
                NovaTech Clean Power is at Upper Circuit
              </h3>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                This security has gained <strong>+42.8% over the last 5 sessions</strong> and is currently under exchange watch.
              </p>
            </div>

            {/* Exchange Surveillance Card */}
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-xs space-y-2">
              <div className="font-semibold text-gray-900 flex items-center justify-between">
                <span>Exchange & Valuation Indicators</span>
                <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100/80 px-1.5 py-0.5 rounded">
                  ASM Stage 1
                </span>
              </div>
              <ul className="text-[11px] text-gray-700 space-y-1.5 list-disc list-inside">
                <li>
                  <strong>Valuation:</strong> Trading at <span className="font-mono font-bold text-amber-900">142.5x P/E</span> (Sector median is 24.1x).
                </li>
                <li>
                  <strong>Volume Spurt:</strong> Daily turnover is <span className="font-mono font-bold">6.8x</span> above its 30-day average.
                </li>
                <li>
                  <strong>Circuit Lock Risk:</strong> If circuit momentum reverses, exit liquidity can become constrained.
                </li>
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600 leading-relaxed">
              <strong className="text-gray-900 block mb-0.5">First100 Reflection Check:</strong>
              Does adding a high-beta surveillance stock align with your Day 1 plan of <em>&ldquo;{profile.goal}&rdquo;</em>? The market will still be open in 10 minutes.
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  sound.playSuccess();
                  setViewState('confirmed');
                }}
                className="w-full py-3 rounded-xl bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs transition-colors shadow-xs"
              >
                Stick to My Diversified Plan (Skip Order)
              </button>

              <button
                onClick={() => {
                  sound.playTap();
                  setViewState('fundamentals');
                }}
                className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition-colors"
              >
                View Exchange Financials & Ratios
              </button>

              <button
                onClick={handleClose}
                className="w-full py-1 text-center text-[11px] text-gray-400 hover:text-gray-600 transition-colors"
              >
                I understand circuit volatility · Proceed to buy
              </button>
            </div>
          </div>
        )}

        {viewState === 'fundamentals' && (
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900">NSE Company Financials & Ratios</h4>
            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500 font-sans">Current Market Price:</span>
                <span className="font-bold text-gray-900">₹342.80 (+5.0% Upper Circuit)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-sans">Price-to-Earnings (P/E):</span>
                <span className="text-rose-600 font-bold">142.5x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-sans">Nifty Smallcap Energy Median P/E:</span>
                <span className="text-gray-800">24.1x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-sans">Exchange Surveillance:</span>
                <span className="text-amber-800 font-bold">NSE ASM Stage 1 (100% Margin)</span>
              </div>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Securities under ASM require 100% upfront margins and are subject to 5% price bands. High valuation multiples require careful risk evaluation.
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  sound.playSuccess();
                  setViewState('confirmed');
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#00D09C] text-white font-bold text-xs"
              >
                Stick to Index Strategy
              </button>
              <button
                onClick={() => setViewState('notice')}
                className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-semibold"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {viewState === 'confirmed' && (
          <div className="py-4 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">Order Paused</h4>
            <p className="text-xs text-gray-600 max-w-xs mx-auto">
              You avoided chasing an upper-circuit surveillance stock and preserved capital for scheduled, diversified SIP compounding.
            </p>
            <button
              onClick={handleClose}
              className="mt-2 px-6 py-2 rounded-xl bg-gray-900 text-white font-bold text-xs"
            >
              Return to Groww
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
