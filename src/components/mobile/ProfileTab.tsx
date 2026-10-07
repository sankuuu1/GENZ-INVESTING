import React, { useState } from 'react';
import { User, Volume2, VolumeX, RotateCcw, FileText, ShieldCheck, Edit3, X, Check, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/audio';

export const ProfileTab: React.FC = () => {
  const {
    profile,
    updateProfile,
    isGraduated,
    soundEnabled,
    setSoundEnabled,
    resetAll,
    startOnboarding,
    setViewMode,
    setCurrentMoment,
    setScheduledSIP,
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [tempGoal, setTempGoal] = useState(profile.goal);
  const [tempBudget, setTempBudget] = useState(profile.monthlyBudget);
  const [tempPayday, setTempPayday] = useState(profile.salaryPayday);

  const goalOptions = [
    'First ₹1 Lakh Wealth & Good Habits',
    'Emergency Safety Net (3–6 Months)',
    'Travel & Personal Milestones',
    'Learn by Doing with Small Capital'
  ];

  const handleSavePlan = () => {
    sound.playSuccess();
    updateProfile({
      goal: tempGoal,
      monthlyBudget: tempBudget,
      salaryPayday: tempPayday,
    });
    setScheduledSIP({
      id: `sip-${Date.now()}`,
      fundName: 'Nippon India Nifty 50 Index Fund',
      amount: tempBudget,
      frequency: 'Monthly',
      dayOfMonth: tempPayday,
      isActive: true,
      executedCount: 1,
      createdOnDay: 1,
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-3.5 pb-4">
      {/* Profile Card */}
      <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-xs flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-[#00D09C] font-bold text-lg flex items-center justify-center shrink-0">
          {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-gray-900">{profile.name || 'First-Time Investor'}</h3>
          <p className="text-[11px] text-gray-500">
            Age {profile.age} · Gen Z First-Time Investor
          </p>
          <div className="flex items-center gap-1.5 pt-0.5">
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#00D09C]" />
              {isGraduated ? 'Graduated from First100' : 'First100 Gen Z Mode Active'}
            </span>
          </div>
        </div>
      </div>

      {/* Goal Summary Card with explicit attribution & Edit capability */}
      <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-xs space-y-2.5 text-xs">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
              Selected in Day 0 Setup
            </div>
            <div className="text-[10px] text-gray-400">Your personalized 100-day parameters</div>
          </div>
          <button
            onClick={() => {
              sound.playTap();
              setIsEditing(true);
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-[11px] font-semibold text-gray-700 transition-colors"
            title="Edit your plan parameters"
          >
            <Edit3 className="w-3 h-3 text-gray-500" />
            <span>Edit Plan</span>
          </button>
        </div>

        <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100 space-y-1">
          <span className="text-[10px] text-gray-400 uppercase font-semibold">Primary Goal</span>
          <div className="text-gray-900 font-bold">{profile.goal}</div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
            <span className="text-[10px] text-gray-400 block font-semibold">Monthly SIP Budget</span>
            <span className="text-[#00D09C] font-mono font-bold text-sm">₹{profile.monthlyBudget}/mo</span>
          </div>
          <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
            <span className="text-[10px] text-gray-400 block font-semibold">Salary Payday</span>
            <span className="text-gray-900 font-mono font-bold text-sm">{profile.salaryPayday}st of month</span>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playTap();
            setCurrentMoment('day0_onboarding');
          }}
          className="w-full text-center text-[10px] text-gray-400 hover:text-emerald-700 transition-colors pt-1"
        >
          Want to re-take the full 3-question orientation? Tap here to restart Day 0.
        </button>
      </div>

      {/* Inline Edit Plan Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-[420px] bg-white rounded-t-3xl border-t border-gray-100 p-5 shadow-2xl text-gray-900 space-y-4 animate-slide-up">
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto -mt-1 mb-2" />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Customize Your First100 Plan</h3>
                <p className="text-[11px] text-gray-500">Update the parameters chosen during onboarding</p>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {/* Select Goal */}
              <div className="space-y-1">
                <label className="text-gray-700 font-semibold block">Investment Goal</label>
                <select
                  value={tempGoal}
                  onChange={e => setTempGoal(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-xs font-medium focus:outline-none focus:border-[#00D09C]"
                >
                  {goalOptions.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              {/* Select Monthly Budget */}
              <div className="space-y-1">
                <label className="text-gray-700 font-semibold block">Monthly SIP Amount</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[500, 1000, 2000, 5000].map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTempBudget(amt)}
                      className={`py-2 rounded-lg font-mono font-bold text-xs border transition-all ${
                        tempBudget === amt
                          ? 'bg-[#00D09C] text-white border-[#00D09C]'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Salary Payday */}
              <div className="space-y-1">
                <label className="text-gray-700 font-semibold block">Salary Payday (Auto-Debit Date)</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[1, 5, 10].map(day => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setTempPayday(day)}
                      className={`py-2 rounded-lg font-mono font-bold text-xs border transition-all ${
                        tempPayday === day
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {day}st of month
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={handleSavePlan}
                className="flex-1 py-2.5 rounded-xl bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs transition-colors shadow-xs"
              >
                Save Updated Plan
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings List */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-gray-900 uppercase tracking-tight px-1">Settings</span>

        {/* Re-run Onboarding Flow */}
        <button
          onClick={() => {
            sound.playTap();
            startOnboarding();
          }}
          className="w-full p-3 rounded-xl bg-white border border-gray-200/80 hover:border-gray-300 text-gray-800 text-xs font-bold flex items-center justify-between transition-colors shadow-xs"
        >
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#00D09C]" />
            <span>Re-run Day 0 Onboarding Flow</span>
          </div>
          <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-bold">
            Personalize
          </span>
        </button>

        {/* View Assignment Artifacts */}
        <button
          onClick={() => {
            sound.playTap();
            setViewMode('artifacts');
          }}
          className="w-full p-3 rounded-xl bg-white border border-gray-200/80 hover:border-gray-300 text-gray-800 text-xs font-bold flex items-center justify-between transition-colors shadow-xs"
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#00D09C]" />
            <span>Read 1-Page Case Study & Prompts</span>
          </div>
          <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-bold">
            Assignment
          </span>
        </button>

        {/* Sound toggle */}
        <div className="p-3 rounded-xl bg-white border border-gray-200/80 shadow-xs flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-gray-700">
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#00D09C]" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
            <span>Micro-Interaction Sounds</span>
          </div>
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              sound.playTap();
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
              soundEnabled ? 'bg-[#00D09C] text-white' : 'bg-gray-100 text-gray-500'
            }`}
          >
            {soundEnabled ? 'On' : 'Muted'}
          </button>
        </div>

        {/* Reset Demo */}
        <button
          onClick={resetAll}
          className="w-full p-3 rounded-xl bg-white border border-gray-200/80 hover:border-gray-300 text-gray-600 hover:text-gray-900 text-xs flex items-center justify-between transition-colors shadow-xs"
        >
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-gray-400" />
            <span>Reset Demo to Day 0</span>
          </div>
          <span className="text-[11px] text-gray-400">Restart</span>
        </button>
      </div>
    </div>
  );
};
