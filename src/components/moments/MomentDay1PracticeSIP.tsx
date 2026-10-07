import React, { useState } from 'react';
import { Calendar, CheckCircle2, ArrowRight, Play, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_ASSETS } from '../../data/mockMarket';
import { PracticeTradeModal } from '../practice/PracticeTradeModal';
import { MarketAsset } from '../../types';
import { sound } from '../../utils/audio';

export const MomentDay1PracticeSIP: React.FC = () => {
  const {
    practiceBalance,
    scheduledSIP,
    setScheduledSIP,
    profile,
    setCurrentMoment,
  } = useApp();

  const [selectedAsset, setSelectedAsset] = useState<MarketAsset | null>(null);
  const [sipAmount, setSipAmount] = useState<number>(profile.monthlyBudget || 500);
  const [paydayDate, setPaydayDate] = useState<number>(profile.salaryPayday || 1);
  const [isSipScheduled, setIsSipScheduled] = useState<boolean>(!!scheduledSIP?.isActive);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const handleScheduleSip = () => {
    sound.playSuccess();
    setScheduledSIP({
      id: `sip-${Date.now()}`,
      fundName: 'Nippon India Nifty 50 Index Fund',
      amount: sipAmount,
      frequency: 'Monthly',
      dayOfMonth: paydayDate,
      isActive: true,
      executedCount: 0,
      createdOnDay: 1,
    });
    setIsSipScheduled(true);
  };

  const handleCancelSip = () => {
    sound.playTap();
    setScheduledSIP(null);
    setIsSipScheduled(false);
  };

  return (
    <div className="space-y-3.5 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
            DAY 1 · PRACTICE MODE
          </span>
          <h2 className="text-xs font-bold text-gray-900">Virtual Market Sandbox</h2>
        </div>
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="p-1 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 hover:text-gray-900 text-xs flex items-center gap-1"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Why this?</span>
        </button>
      </div>

      {showExplanation && (
        <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 space-y-1 animate-slide-up">
          <p className="font-bold text-emerald-700">First100 Principle:</p>
          <p className="text-[11px] text-gray-600 leading-relaxed">
            Forcing beginners to invest real money on Day 1 causes anxiety. Practice mode lets you test buy/sell orders with simulated cash, while scheduling a Payday SIP turns hesitation into an automated, reversible habit.
          </p>
        </div>
      )}

      {/* Practice Balance Card */}
      <div className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-50/80 to-teal-50/50 border border-emerald-200 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
            VIRTUAL SANDBOX BALANCE
          </span>
          <span className="text-[10px] text-emerald-700 font-semibold">Real Live Market</span>
        </div>
        <div className="text-xl font-bold font-mono text-gray-900">
          ₹{practiceBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[11px] text-gray-600 pt-1">
          Use this virtual ₹10,000 to practice placing simulated orders without putting any real money on the line.
        </p>
      </div>

      {/* Schedule First SIP Card */}
      <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#00D09C]" />
            <div>
              <span className="text-xs font-bold text-gray-900">Schedule First SIP for Payday</span>
              <p className="text-[10px] text-gray-500">No real money debited today. It waits for salary.</p>
            </div>
          </div>
          {isSipScheduled && (
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
              Scheduled
            </span>
          )}
        </div>

        {!isSipScheduled ? (
          <div className="space-y-2.5 pt-1">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-500">Monthly Amount</span>
                <select
                  value={sipAmount}
                  onChange={e => setSipAmount(Number(e.target.value))}
                  className="w-full p-2 rounded-lg bg-white border border-gray-200 text-gray-900 font-mono text-xs"
                >
                  <option value={500}>₹500 / month</option>
                  <option value={1000}>₹1,000 / month</option>
                  <option value={2000}>₹2,000 / month</option>
                </select>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-gray-500">Salary Payday</span>
                <select
                  value={paydayDate}
                  onChange={e => setPaydayDate(Number(e.target.value))}
                  className="w-full p-2 rounded-lg bg-white border border-gray-200 text-gray-900 font-mono text-xs"
                >
                  <option value={1}>1st of month</option>
                  <option value={5}>5th of month</option>
                  <option value={10}>10th of month</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleScheduleSip}
              className="w-full py-2.5 rounded-xl bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              <span>Schedule ₹{sipAmount} SIP for Payday</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="p-3 rounded-lg bg-white border border-emerald-200 text-xs space-y-2">
            <div className="flex justify-between items-center text-emerald-800 font-bold">
              <span>₹{sipAmount} Scheduled for the {paydayDate}st</span>
              <CheckCircle2 className="w-4 h-4 text-[#00D09C]" />
            </div>
            <p className="text-[11px] text-gray-500">
              Anxiety converted into an automated habit. Next step: Jump ahead to simulate Payday execution!
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setCurrentMoment('payday_sip')}
                className="flex-1 py-1.5 rounded-lg bg-[#00D09C] text-white font-bold text-xs flex items-center justify-center gap-1"
              >
                <span>Simulate Payday</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <button
                onClick={handleCancelSip}
                className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:text-gray-900 text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Practice Trade Trigger List */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold text-gray-700">Practice Buying (Live Data):</span>
        <div className="space-y-1.5">
          {MOCK_ASSETS.slice(0, 2).map(asset => (
            <div
              key={asset.id}
              onClick={() => {
                sound.playTap();
                setSelectedAsset(asset);
              }}
              className="p-2.5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 cursor-pointer shadow-xs transition-all flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-gray-900">{asset.name}</div>
                <div className="text-[10px] text-gray-500">{asset.category}</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono font-bold text-gray-900">₹{asset.price.toFixed(2)}</div>
                <span className="text-[10px] font-bold text-[#00D09C]">Tap to Practice</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedAsset && (
        <PracticeTradeModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
        />
      )}
    </div>
  );
};
