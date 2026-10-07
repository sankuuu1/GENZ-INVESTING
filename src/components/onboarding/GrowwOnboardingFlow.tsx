import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/audio';
import { ArrowRight, ArrowLeft, Check, ShieldCheck, Sparkles, User, Calendar, BookmarkCheck, Bell } from 'lucide-react';

export const GrowwOnboardingFlow: React.FC = () => {
  const { profile, updateProfile, setScheduledSIP, setCurrentMoment, setActiveNavTab } = useApp();

  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState(profile.name === 'Aarav Sharma' ? '' : profile.name);
  const [userAge, setUserAge] = useState(profile.age || 23);
  const [userGoal, setUserGoal] = useState(profile.goal || 'First ₹1 Lakh Wealth & Good Habits');
  const [userBudget, setUserBudget] = useState(profile.monthlyBudget || 500);
  const [userPayday, setUserPayday] = useState(profile.salaryPayday || 1);
  const [userTemperament, setUserTemperament] = useState<'steady' | 'balanced' | 'adventurous'>(profile.riskTemperament || 'steady');
  const [savedNotice, setSavedNotice] = useState(false);

  const goalOptions = [
    {
      id: 'First ₹1 Lakh Wealth & Good Habits',
      title: 'First ₹1 Lakh Wealth',
      desc: 'Build your first real compounding nest egg without pressure.'
    },
    {
      id: 'Emergency Safety Net (3–6 Months)',
      title: 'Emergency Safety Net',
      desc: 'Create financial security for unexpected personal expenses.'
    },
    {
      id: 'Travel & Personal Milestones',
      title: 'Travel & Milestone Goal',
      desc: 'Systematically fund a dream purchase without debt.'
    },
    {
      id: 'Learn by Doing with Small Capital',
      title: 'Learn Hands-On',
      desc: 'Understand market movements using low capital and practice sandboxes.'
    }
  ];

  const budgetOptions = [
    { amount: 500, label: '₹500 / mo', desc: 'Ideal starting habit. Less than 2 coffees.' },
    { amount: 1000, label: '₹1,000 / mo', desc: 'Consistent foundation for new earners.' },
    { amount: 2000, label: '₹2,000 / mo', desc: 'Accelerated compounding plan.' },
    { amount: 5000, label: '₹5,000 / mo', desc: 'High-discipline wealth allocation.' }
  ];

  const handleNext = () => {
    sound.playTap();
    if (step === 1 && !userName.trim()) {
      setUserName('Sanket'); // default friendly fallback
    }
    if (step < 4) {
      setStep(prev => prev + 1);
    } else {
      // Finalize onboarding
      sound.playSuccess();
      const finalName = userName.trim() || 'Sanket';
      updateProfile({
        name: finalName,
        age: userAge,
        goal: userGoal,
        monthlyBudget: userBudget,
        salaryPayday: userPayday,
        riskTemperament: userTemperament,
        onboardingCompleted: true,
      });

      // Synchronize initial scheduled SIP
      setScheduledSIP({
        id: `sip-${Date.now()}`,
        fundName: 'Nippon India Nifty 50 Index Fund',
        amount: userBudget,
        frequency: 'Monthly',
        dayOfMonth: userPayday,
        isActive: true,
        executedCount: 0,
        createdOnDay: 1,
      });

      setCurrentMoment('day1_practice');
      setActiveNavTab('stocks');
    }
  };

  const handleBack = () => {
    sound.playTap();
    if (step > 1) setStep(prev => prev - 1);
  };

  const handleQuickDemo = () => {
    sound.playSuccess();
    updateProfile({
      name: 'Sanket',
      age: 23,
      goal: 'First ₹1 Lakh Wealth & Good Habits',
      monthlyBudget: 500,
      salaryPayday: 1,
      riskTemperament: 'steady',
      onboardingCompleted: true,
    });
    setScheduledSIP({
      id: `sip-${Date.now()}`,
      fundName: 'Nippon India Nifty 50 Index Fund',
      amount: 500,
      frequency: 'Monthly',
      dayOfMonth: 1,
      isActive: true,
      executedCount: 0,
      createdOnDay: 1,
    });
    setCurrentMoment('day1_practice');
    setActiveNavTab('stocks');
  };

  return (
    <div className="flex-1 flex flex-col justify-between py-2 px-1 text-gray-900 animate-fade-in">
      {/* Top Header & Step Indicator */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="p-1 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <div className="w-7 h-7 rounded-lg bg-[#00D09C] flex items-center justify-center font-bold text-white text-xs">
                G
              </div>
            )}
            <div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                Groww First100 · Orientation
              </span>
              <h2 className="text-xs font-bold text-gray-900">
                {step === 1 && 'Welcome & Identity'}
                {step === 2 && 'Primary Goal'}
                {step === 3 && 'Monthly SIP Budget'}
                {step === 4 && 'Your Starting Plan'}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playSuccess();
              setSavedNotice(true);
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-[10px] font-semibold text-gray-600 transition-colors"
          >
            <BookmarkCheck className="w-3 h-3 text-[#00D09C]" />
            <span>Save & Exit</span>
          </button>
        </div>

        {/* Progress Bar (Step 1 to 4) */}
        <div className="flex gap-1.5">
          {[1, 2, 3, 4].map(s => (
            <div
              key={s}
              className={`h-1 rounded-full flex-1 transition-all ${
                s <= step ? 'bg-[#00D09C]' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {savedNotice && (
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-1 animate-slide-up">
            <div className="font-bold flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-[#00D09C]" />
              <span>Progress Saved</span>
            </div>
            <p className="text-[11px] text-emerald-900">
              We saved your draft. You can resume anytime without repeating KYC or setup questions.
            </p>
          </div>
        )}
      </div>

      {/* Main Questionnaire Content */}
      <div className="my-auto py-3 space-y-4">
        {/* STEP 1: Name and Profile */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wider">
                Step 1 of 4 · Introduction
              </span>
              <h3 className="text-base font-extrabold text-gray-900">
                What should we call you?
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Groww First100 tailors all reminders, payday nudges, and milestone cards to your personal investor profile.
              </p>
            </div>

            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">Your Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Sanket"
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-gray-900 placeholder-gray-400 font-semibold focus:outline-none focus:border-[#00D09C] transition-colors"
                  autoFocus
                />
              </div>
            </div>

            {/* Age Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">Your Age</label>
              <div className="flex gap-1.5">
                {[20, 21, 22, 23, 24, 25, 26].map(age => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => {
                      sound.playTap();
                      setUserAge(age);
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${
                      userAge === age
                        ? 'bg-[#00D09C] text-white border-[#00D09C] shadow-xs'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-gray-400 block pt-0.5">
                Targeted for first-time Gen Z earners starting their wealth journey.
              </span>
            </div>
          </div>
        )}

        {/* STEP 2: Goal */}
        {step === 2 && (
          <div className="space-y-3.5 animate-fade-in">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wider">
                Step 2 of 4 · Milestone Goal
              </span>
              <h3 className="text-base font-extrabold text-gray-900">
                What are you investing for, {userName || 'Sanket'}?
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                We calibrate your risk guardrails and practice limits around your true financial objective.
              </p>
            </div>

            <div className="space-y-2">
              {goalOptions.map(g => {
                const isSelected = userGoal === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => {
                      sound.playTap();
                      setUserGoal(g.id);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between ${
                      isSelected
                        ? 'bg-emerald-50/70 border-[#00D09C] text-gray-900 shadow-2xs'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs text-gray-900">{g.title}</div>
                      <div className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{g.desc}</div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#00D09C] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Monthly Budget & Payday */}
        {step === 3 && (
          <div className="space-y-3.5 animate-fade-in">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wider">
                Step 3 of 4 · Monthly Commitment
              </span>
              <h3 className="text-base font-extrabold text-gray-900">
                Set your comfortable monthly SIP
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Consistency matters 10x more than starting large. Only commit funds you won’t need next week.
              </p>
            </div>

            {/* Budget options */}
            <div className="grid grid-cols-2 gap-2">
              {budgetOptions.map(b => {
                const isSelected = userBudget === b.amount;
                return (
                  <button
                    key={b.amount}
                    onClick={() => {
                      sound.playTap();
                      setUserBudget(b.amount);
                    }}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-emerald-50/80 border-[#00D09C] shadow-2xs'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-mono font-bold text-xs text-gray-900">{b.label}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5 leading-tight">{b.desc}</div>
                  </button>
                );
              })}
            </div>

            {/* Payday date selector */}
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200/80 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                <Calendar className="w-3.5 h-3.5 text-[#00D09C]" />
                <span>When does your monthly paycheck or allowance arrive?</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 5, 10].map(day => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => {
                      sound.playTap();
                      setUserPayday(day);
                    }}
                    className={`py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${
                      userPayday === day
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {day}st of month
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-gray-400 block">
                Your SIP will schedule for this date so money invests automatically before impulse spending.
              </span>
            </div>
          </div>
        )}

        {/* STEP 4: Plan Confirmation */}
        {step === 4 && (
          <div className="space-y-3.5 animate-fade-in">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wider">
                Step 4 of 4 · Plan Ready
              </span>
              <h3 className="text-base font-extrabold text-gray-900">
                Your First100 Plan is locked, {userName || 'Sanket'}!
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Review your customized 100-day investing roadmap before entering the Groww application:
              </p>
            </div>

            {/* Personalized Plan Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/40 border-2 border-[#00D09C]/60 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#00D09C] text-white flex items-center justify-center font-bold text-xs">
                    {(userName || 'S').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="font-bold text-xs text-gray-900">{userName || 'Sanket'}</span>
                    <span className="text-[10px] text-gray-500 block">Age {userAge} · First-Time Investor</span>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  100-Day Program
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-gray-200 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-500 text-[11px]">Milestone Goal:</span>
                  <span className="font-bold text-gray-900 text-[11px] text-right">{userGoal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-[11px]">Monthly SIP:</span>
                  <span className="font-mono font-bold text-[#00D09C] text-[11px]">₹{userBudget}/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-[11px]">Scheduled Payday:</span>
                  <span className="font-mono font-bold text-gray-900 text-[11px]">{userPayday}st of month</span>
                </div>
              </div>

              <div className="text-[11px] text-gray-600 space-y-1 pt-0.5">
                <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00D09C]" />
                  <span>What happens on Day 1:</span>
                </div>
                <p className="text-[10px] text-gray-500 leading-tight">
                  You start with <strong>₹10,000 in Virtual Practice Sandbox</strong> on real market data. Zero real money is debited until your scheduled salary payday.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Primary Action Button */}
      <div className="space-y-2 pt-2">
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-xl bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
        >
          <span>{step === 4 ? 'Enter Groww (Day 1)' : 'Continue'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {step === 1 && (
          <button
            onClick={handleQuickDemo}
            className="w-full text-center text-[10px] text-gray-400 hover:text-gray-700 transition-colors"
          >
            Or start immediately with default demo settings (Sanket, ₹500/mo)
          </button>
        )}
      </div>
    </div>
  );
};
