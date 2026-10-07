import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Check,
  Calendar,
  Wallet,
  Target,
  User,
  Clock,
  BookmarkCheck,
  Bell,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/audio';

interface OnboardingFlowProps {
  onComplete?: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const { profile, completeOnboarding } = useApp();

  const [step, setStep] = useState<number>(1);
  const [userName, setUserName] = useState<string>(profile.name || '');
  const [selectedAge, setSelectedAge] = useState<number>(profile.age || 22);
  const [stage, setStage] = useState<string>('First Job / Early Earner');
  const [selectedGoal, setSelectedGoal] = useState<string>(profile.goal || 'First ₹1 Lakh Wealth & Good Habits');
  const [selectedBudget, setSelectedBudget] = useState<number>(profile.monthlyBudget || 500);
  const [customBudget, setCustomBudget] = useState<string>('');
  const [selectedPayday, setSelectedPayday] = useState<number>(profile.salaryPayday || 5);
  const [selectedRisk, setSelectedRisk] = useState<'steady' | 'balanced' | 'adventurous'>(profile.riskTemperament || 'steady');
  const [savedLaterNotice, setSavedLaterNotice] = useState<boolean>(false);

  const nameSuggestions = ['Sanket', 'Aryan', 'Ananya', 'Rohan', 'Kavya', 'Aditi'];

  const goalsList = [
    {
      id: 'First ₹1 Lakh Wealth & Good Habits',
      title: 'First ₹1 Lakh Wealth',
      desc: 'Build your first real nest egg through steady monthly compounding.',
      badge: 'Most Popular',
    },
    {
      id: 'Emergency Safety Net (3–6 Months)',
      title: 'Emergency Cushion',
      desc: 'Quiet safety buffer before touching equities or volatile assets.',
      badge: 'Safe Start',
    },
    {
      id: 'Disciplined Monthly SIP Habit',
      title: 'Disciplined Habit Building',
      desc: 'Automate investing on payday so you never panic or skip a month.',
      badge: 'Zero Stress',
    },
    {
      id: 'Learn by Doing in Sandbox First',
      title: 'Practice Before Real Money',
      desc: 'Master the market in ₹10,000 Practice Mode before risking your salary.',
      badge: 'Beginner',
    },
  ];

  const budgetOptions = [
    { amount: 500, label: '₹500 / month', sub: 'Cost of 2 coffees. Zero stress start.' },
    { amount: 1000, label: '₹1,000 / month', sub: 'The gold standard beginner habit.' },
    { amount: 2500, label: '₹2,500 / month', sub: 'Accelerated compounding for early earners.' },
    { amount: 5000, label: '₹5,000 / month', sub: 'Serious wealth building foundation.' },
  ];

  const paydayOptions = [
    { day: 1, label: '1st', desc: 'Beginning of month' },
    { day: 5, label: '5th', desc: 'Salary credit week' },
    { day: 10, label: '10th', desc: 'Mid-month' },
    { day: 25, label: '25th', desc: 'Pocket allowance' },
  ];

  const temperamentOptions: Array<{ id: 'steady' | 'balanced' | 'adventurous'; title: string; desc: string }> = [
    {
      id: 'steady',
      title: 'Steady & Predictable',
      desc: 'Focus on Nifty 50 Index. Big red drops make me anxious.',
    },
    {
      id: 'balanced',
      title: 'Moderate Fluctuations',
      desc: 'I care about beating inflation over 3–5 years.',
    },
    {
      id: 'adventurous',
      title: 'Long-Term Compounding',
      desc: 'I know market dips allow buying cheaper units on SIP.',
    },
  ];

  const effectiveBudget = customBudget ? parseInt(customBudget, 10) || selectedBudget : selectedBudget;

  const handleNext = () => {
    sound.playTap();
    if (step < 4) {
      setStep(prev => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    sound.playTap();
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleSaveLater = () => {
    sound.playSuccess();
    setSavedLaterNotice(true);
  };

  const handleFinish = () => {
    const finalName = userName.trim() || 'Sanket';
    completeOnboarding(
      finalName,
      selectedAge,
      selectedGoal,
      effectiveBudget,
      selectedPayday,
      selectedRisk
    );

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#00D09C', '#12171E', '#3B82F6', '#10B981'],
      });
    } catch {
      // safe fallback
    }

    if (onComplete) onComplete();
  };

  const handleQuickDemoEnter = () => {
    sound.playSuccess();
    completeOnboarding(
      'Sanket',
      23,
      'First ₹1 Lakh Wealth & Good Habits',
      500,
      5,
      'steady'
    );
    if (onComplete) onComplete();
  };

  return (
    <div className="flex flex-col min-h-[700px] bg-white text-gray-900">
      {/* Top Header / Progress */}
      <div className="px-5 pt-4 pb-3 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-20">
        <div className="flex items-center gap-2">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              title="Go back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : (
            <div className="w-6 h-6 rounded-lg bg-[#00D09C] flex items-center justify-center text-white font-extrabold text-xs shadow-2xs">
              G
            </div>
          )}
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                Groww First100
              </span>
              <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200">
                Gen Z Onboarding
              </span>
            </div>
            <h1 className="text-xs font-bold text-gray-900">
              {step === 1 && 'Welcome & Identity'}
              {step === 2 && 'Your Investing Goal'}
              {step === 3 && 'Monthly SIP & Payday'}
              {step === 4 && 'Your 100-Day Plan'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveLater}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-[10px] font-semibold text-gray-700 transition-colors"
            title="Save progress for later"
          >
            <BookmarkCheck className="w-3.5 h-3.5 text-[#00D09C]" />
            <span className="hidden sm:inline">Save</span>
          </button>
          <span className="text-[11px] font-mono font-bold text-gray-400">
            {step}/4
          </span>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full bg-gray-100 h-1">
        <div
          className="bg-[#00D09C] h-1 transition-all duration-300"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      {/* Drop-off notice Simulator */}
      {savedLaterNotice && (
        <div className="mx-4 mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs animate-slide-up space-y-1">
          <div className="flex items-center justify-between text-emerald-800 font-bold">
            <span className="flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-[#00D09C]" />
              Progress Saved Safely
            </span>
            <span className="text-[10px] text-emerald-600">Zero Drop-Off Friction</span>
          </div>
          <p className="text-[11px] text-emerald-900 leading-relaxed">
            Your progress is preserved. You can resume anytime without repeating KYC or paperwork.
          </p>
        </div>
      )}

      {/* Main Step Content */}
      <div className="flex-1 px-5 py-4 overflow-y-auto no-scrollbar space-y-4">
        {/* STEP 1: Name & Identity */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-800">
                <Sparkles className="w-3 h-3 text-[#00D09C]" />
                <span>Personalized Setup · 60 Seconds</span>
              </div>
              <h2 className="text-base font-bold text-gray-900">
                What can we call you?
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed">
                Investing should feel personal, not transactional. We will customize your Groww First100 journey around you.
              </p>
            </div>

            {/* Name Input Field */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-700 block">
                Your Preferred Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                  placeholder="e.g. Sanket, Aryan, Ananya..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 focus:border-[#00D09C] focus:ring-2 focus:ring-[#00D09C]/20 rounded-xl text-xs font-semibold text-gray-900 placeholder:text-gray-400 outline-none transition-all"
                  autoFocus
                />
              </div>

              {/* Quick Suggestion Chips */}
              <div className="pt-1">
                <span className="text-[10px] text-gray-400 font-medium block mb-1.5">
                  Quick suggestions (tap to fill):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {nameSuggestions.map(n => (
                    <button
                      key={n}
                      onClick={() => {
                        sound.playTap();
                        setUserName(n);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                        userName === n
                          ? 'bg-[#00D09C] text-white shadow-2xs'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Age & Life Stage */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <label className="text-[11px] font-bold text-gray-700 block">
                What describes your current stage?
              </label>
              <div className="space-y-1.5">
                {[
                  { age: 20, title: 'College / Student (18–21 yrs)', desc: 'Pocket money or internship stipends' },
                  { age: 23, title: 'First Job / Early Earner (22–25 yrs)', desc: 'First regular salary coming in' },
                  { age: 27, title: 'Young Professional (26–29 yrs)', desc: 'Accelerating savings and investments' },
                ].map(item => (
                  <button
                    key={item.age}
                    onClick={() => {
                      sound.playTap();
                      setSelectedAge(item.age);
                      setStage(item.title);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                      selectedAge === item.age
                        ? 'bg-emerald-50/70 border-[#00D09C] text-gray-900 shadow-2xs'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-gray-900">{item.title}</div>
                      <div className="text-[10px] text-gray-500">{item.desc}</div>
                    </div>
                    {selectedAge === item.age && (
                      <div className="w-5 h-5 rounded-full bg-[#00D09C] text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Gen Z Reassurance Note */}
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200/80 text-[11px] text-gray-600 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00D09C] shrink-0 mt-0.5" />
              <span>
                <strong>Day 0 Guarantee:</strong> We won’t ask you to invest real money right away. Day 1 starts with a virtual sandbox to learn safely.
              </span>
            </div>
          </div>
        )}

        {/* STEP 2: The Goal / The Plan */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-800">
                <Target className="w-3 h-3 text-[#00D09C]" />
                <span>The 100-Day Plan</span>
              </div>
              <h2 className="text-base font-bold text-gray-900">
                What is your primary investing goal?
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed">
                Having an anchor goal protects you against FOMO and panic selling when markets fluctuate.
              </p>
            </div>

            <div className="space-y-2">
              {goalsList.map(g => {
                const isSelected = selectedGoal === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => {
                      sound.playTap();
                      setSelectedGoal(g.id);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between ${
                      isSelected
                        ? 'bg-emerald-50/70 border-[#00D09C] text-gray-900 shadow-2xs'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="space-y-1 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-gray-900">{g.title}</span>
                        <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100/70 px-1.5 py-0.2 rounded-full">
                          {g.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 leading-normal">{g.desc}</p>
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

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <div className="font-bold text-[11px] text-emerald-800 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#00D09C]" />
                <span>Why this matters</span>
              </div>
              <p className="text-[11px] text-emerald-900 leading-relaxed">
                SEBI survey shows 63% know products but only 9.5% invest due to lack of a structured start. A clear goal prevents wandering into high-risk trades.
              </p>
            </div>
          </div>
        )}

        {/* STEP 3: Monthly Budget & Payday */}
        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-800">
                <Wallet className="w-3 h-3 text-[#00D09C]" />
                <span>Micro-Investing Calibration</span>
              </div>
              <h2 className="text-base font-bold text-gray-900">
                How much can you comfortably invest each month?
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed">
                Start small. The habit of consistent monthly investing matters 10x more than the amount.
              </p>
            </div>

            {/* Budget options */}
            <div className="space-y-2">
              {budgetOptions.map(b => {
                const isSelected = selectedBudget === b.amount && !customBudget;
                return (
                  <button
                    key={b.amount}
                    onClick={() => {
                      sound.playTap();
                      setSelectedBudget(b.amount);
                      setCustomBudget('');
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-50/70 border-[#00D09C] text-gray-900 shadow-2xs'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs font-mono text-gray-900">{b.label}</div>
                      <div className="text-[10px] text-gray-500">{b.sub}</div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#00D09C] text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Payday Selection */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-gray-700">
                  When does your salary / allowance arrive?
                </label>
                <span className="text-[10px] text-[#00B386] font-semibold">Auto-SIP Timing</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Scheduling your SIP on or right after payday turns anxiety into effortless commitment.
              </p>

              <div className="grid grid-cols-4 gap-2">
                {paydayOptions.map(p => (
                  <button
                    key={p.day}
                    onClick={() => {
                      sound.playTap();
                      setSelectedPayday(p.day);
                    }}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      selectedPayday === p.day
                        ? 'bg-emerald-50 border-[#00D09C] text-emerald-800 font-bold'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-xs font-mono font-bold">{p.label}</div>
                    <div className="text-[9px] text-gray-500 mt-0.5">of month</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Risk Temperament */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <label className="text-[11px] font-bold text-gray-700 block">
                How should we guide you when the market dips?
              </label>
              <div className="space-y-1.5">
                {temperamentOptions.map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      sound.playTap();
                      setSelectedRisk(t.id);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                      selectedRisk === t.id
                        ? 'bg-emerald-50/70 border-[#00D09C] text-gray-900 shadow-2xs'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-gray-900">{t.title}</div>
                      <div className="text-[10px] text-gray-500">{t.desc}</div>
                    </div>
                    {selectedRisk === t.id && (
                      <div className="w-4 h-4 rounded-full bg-[#00D09C] text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Personalized Plan Summary & Confirmation */}
        {step === 4 && (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center space-y-1 py-1">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#00D09C] flex items-center justify-center mx-auto shadow-2xs">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-base font-extrabold text-gray-900">
                Your First100 Plan is Ready, {userName || 'Investor'}!
              </h2>
              <p className="text-xs text-gray-500">
                Here is your personalized roadmap to build a disciplined investing foundation.
              </p>
            </div>

            {/* Personalized Plan Blueprint Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/40 border-2 border-[#00D09C]/40 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                    INVESTOR BLUEPRINT
                  </span>
                  <div className="text-xs font-bold text-gray-900 mt-0.5">
                    {userName || 'Investor'} · Age {selectedAge}
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 border border-emerald-300 px-2 py-0.5 rounded-full">
                  Day 1 Ready
                </span>
              </div>

              {/* Plan Details Grid */}
              <div className="space-y-2 text-xs">
                <div className="flex items-start justify-between p-2 rounded-xl bg-white border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#00D09C] shrink-0" />
                    <div>
                      <span className="text-[10px] text-gray-400 block font-medium">Primary Goal</span>
                      <strong className="text-gray-900 text-xs">{selectedGoal}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-start justify-between p-2 rounded-xl bg-white border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#00D09C] shrink-0" />
                    <div>
                      <span className="text-[10px] text-gray-400 block font-medium">Monthly SIP Plan</span>
                      <strong className="text-gray-900 text-xs font-mono">
                        ₹{effectiveBudget.toLocaleString('en-IN')} / month
                      </strong>
                      <span className="text-[10px] text-gray-500 block">
                        Auto-executes on {selectedPayday}th of every month
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start justify-between p-2 rounded-xl bg-white border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-[#00D09C] shrink-0" />
                    <div>
                      <span className="text-[10px] text-gray-400 block font-medium">Risk-Free Practice Sandbox</span>
                      <strong className="text-emerald-700 text-xs font-mono">
                        ₹10,000 Virtual Cash Pre-loaded
                      </strong>
                      <span className="text-[10px] text-gray-500 block">
                        Test trades on real market prices without losing a single rupee.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Behavioral Guardrails List */}
              <div className="pt-2 border-t border-gray-100 space-y-1.5">
                <div className="text-[10px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00D09C]" />
                  <span>3 Active First100 Guardrails</span>
                </div>
                <div className="grid grid-cols-1 gap-1 text-[10px] text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00D09C]" />
                    <span><strong>FOMO Pause:</strong> Reflect before buying speculative surges</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00D09C]" />
                    <span><strong>F&O 9/10 Cooling:</strong> Practice mode first before risky derivatives</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00D09C]" />
                    <span><strong>Market Dip Reassurance:</strong> Historical context when Nifty falls</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-center text-[11px] text-gray-600">
              You can adjust this plan anytime in your Profile. You graduate into standard Groww on Day 101.
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="px-5 py-3 border-t border-gray-100 bg-white space-y-2 sticky bottom-0 z-20">
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-xl bg-[#00D09C] hover:bg-[#00B386] active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
        >
          <span>
            {step === 1 && 'Next: Set Your Goal'}
            {step === 2 && 'Next: Set Monthly Budget'}
            {step === 3 && 'Generate My 100-Day Plan'}
            {step === 4 && 'Enter Groww & Begin Day 1'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Quick Demo Bypass for Fast Testing */}
        {step < 4 && (
          <div className="flex items-center justify-between pt-0.5">
            <button
              onClick={handleSaveLater}
              className="text-[11px] text-gray-400 hover:text-gray-700 font-medium transition-colors"
            >
              Finish Later
            </button>
            <button
              onClick={handleQuickDemoEnter}
              className="text-[11px] text-emerald-700 hover:text-emerald-900 font-semibold transition-colors"
            >
              Skip setup (Quick demo with Sanket, 23) →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
