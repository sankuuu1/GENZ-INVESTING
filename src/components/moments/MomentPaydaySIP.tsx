import React, { useState } from 'react';
import { CheckCircle2, Lightbulb, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MicroLessonSheet } from '../mobile/MicroLessonSheet';
import { sound } from '../../utils/audio';

export const MomentPaydaySIP: React.FC = () => {
  const { setCurrentMoment, setActiveGuardrailModal } = useApp();

  return (
    <div className="space-y-3.5 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
            DAY 28 · SALARY PAYDAY
          </span>
          <h2 className="text-xs font-bold text-gray-900">First Real Rupee Moves</h2>
        </div>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          Auto-Executed
        </span>
      </div>

      {/* Execution Card */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-teal-50/40 border border-emerald-200 space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#00D09C] text-white flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-900">Your ₹500 SIP Just Executed!</div>
            <div className="text-[10px] text-gray-500">Debited automatically on Salary Day</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white border border-gray-200/80 space-y-1.5 text-xs">
          <div className="flex justify-between text-gray-600">
            <span>Fund Credited</span>
            <span className="font-bold text-gray-900">Nippon India Nifty 50</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Amount Debited</span>
            <span className="font-mono font-bold text-[#00D09C]">₹500.00</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Units Allotted</span>
            <span className="font-mono font-bold text-gray-800">13.01 Units</span>
          </div>
        </div>

        <p className="text-[11px] text-gray-600 leading-relaxed">
          You are now an equity owner in India’s top 50 companies. You bypassed the procrastination that traps 90% of your peers.
        </p>
      </div>

      {/* In-Flow Lesson Trigger */}
      <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 space-y-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-blue-500" />
          <span className="text-xs font-bold text-gray-900">60-Second In-Flow Lesson</span>
        </div>
        <p className="text-[11px] text-gray-500 leading-relaxed">
          Beginners often ask: <em>&ldquo;Where did my ₹500 actually go? Did I buy a single stock or a certificate?&rdquo;</em>
        </p>
        <button
          onClick={() => {
            sound.playTap();
            setActiveGuardrailModal('micro_lesson');
          }}
          className="w-full py-2.5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 text-gray-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
        >
          <span>Tap to unpack what you own (30s)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Advance to next */}
      <button
        onClick={() => {
          sound.playTap();
          setCurrentMoment('fomo_pause');
        }}
        className="w-full py-3 rounded-xl bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
      >
        <span>Advance to Day 42: The FOMO Trap</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
