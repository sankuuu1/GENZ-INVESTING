import React from 'react';
import { Lightbulb, ChevronRight, Sparkles, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/audio';

export const MutualFundsScreen: React.FC = () => {
  const { scheduledSIP, setActiveGuardrailModal, setCurrentMoment } = useApp();

  const collections = [
    { title: 'High Return', sub: '3-yr annualized > 22%', icon: '🚀' },
    { title: 'SIP with ₹500', sub: 'Low starting barrier', icon: '🌱', active: true },
    { title: 'Tax Saver (ELSS)', sub: 'Save under 80C', icon: '🛡️' },
    { title: 'Large Cap', sub: 'Top 100 bluechips', icon: '🏛️' },
  ];

  return (
    <div className="space-y-4 pb-4">
      {/* 60-Second In-Flow Micro-Lesson Callout (First100 Feature) */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-900">What does an Index Fund actually own?</div>
            <span className="text-[11px] text-gray-600">60-second in-flow explanation</span>
          </div>
        </div>
        <button
          onClick={() => {
            sound.playTap();
            setActiveGuardrailModal('micro_lesson');
          }}
          className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white font-bold text-xs shadow-xs hover:bg-emerald-600 transition-colors"
        >
          View
        </button>
      </div>

      {/* Active SIP Card */}
      {scheduledSIP && (
        <div className="p-3.5 rounded-2xl bg-white border border-gray-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#00D09C]" />
              <span className="text-xs font-bold text-gray-900">Your Active Payday SIP</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Active
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-700 font-medium">{scheduledSIP.fundName}</span>
            <span className="font-mono font-bold text-gray-900">₹{scheduledSIP.amount}/mo</span>
          </div>
          <p className="text-[11px] text-gray-500">
            Debits automatically on the {scheduledSIP.dayOfMonth}st of each month. 100% reversible anytime.
          </p>
        </div>
      )}

      {/* Collections Row */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight px-1">
          Popular Collections
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {collections.map((c, i) => (
            <div
              key={i}
              onClick={() => sound.playTap()}
              className={`p-3 rounded-xl border shadow-xs cursor-pointer transition-all ${
                c.active ? 'bg-emerald-50/40 border-emerald-200' : 'bg-white border-gray-200/80 hover:border-gray-300'
              }`}
            >
              <div className="text-lg mb-1">{c.icon}</div>
              <div className="text-xs font-bold text-gray-900">{c.title}</div>
              <div className="text-[10px] text-gray-500">{c.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Direct Mutual Funds */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight px-1">
          Top Rated Index & Flexi Funds
        </h3>

        <div className="space-y-2">
          <div className="p-3 rounded-xl bg-white border border-gray-200/80 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-gray-900">Nippon India Nifty 50 Index Fund</div>
              <div className="text-[11px] text-gray-500">Very Low Cost · Top 50 Companies</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono font-bold text-gray-900">₹38.45</div>
              <div className="text-[10px] font-mono text-[#00D09C] font-semibold">+14.2% (1Y)</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-gray-200/80 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-gray-900">Parag Parikh Flexi Cap Fund</div>
              <div className="text-[11px] text-gray-500">Diversified Equity · Indian & US Tech</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono font-bold text-gray-900">₹76.20</div>
              <div className="text-[10px] font-mono text-[#00D09C] font-semibold">+18.5% (1Y)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
