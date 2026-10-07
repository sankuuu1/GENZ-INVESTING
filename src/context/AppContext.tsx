import React, { createContext, useContext, useState, useEffect } from 'react';
import { MomentId, UserProfile, Holding, SIPSchedule, MarketAsset } from '../types';
import { MOCK_ASSETS, MOMENT_DEFINITIONS } from '../data/mockMarket';
import { sound } from '../utils/audio';

export type NavTab = 'stocks' | 'mutual_funds' | 'first100' | 'holdings' | 'profile';

interface AppContextType {
  currentMoment: MomentId;
  setCurrentMoment: (m: MomentId) => void;
  activeNavTab: NavTab;
  setActiveNavTab: (tab: NavTab) => void;
  accountMode: 'real' | 'practice';
  setAccountMode: (m: 'real' | 'practice') => void;
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  practiceBalance: number;
  practiceHoldings: Holding[];
  realBalance: number;
  realHoldings: Holding[];
  scheduledSIP: SIPSchedule | null;
  setScheduledSIP: (sip: SIPSchedule | null) => void;
  completedMoments: Set<MomentId>;
  markMomentComplete: (m: MomentId) => void;
  isGraduated: boolean;
  setIsGraduated: (val: boolean) => void;
  isCrashActive: boolean;
  setIsCrashActive: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  viewMode: 'mobile_device' | 'artifacts';
  setViewMode: (m: 'mobile_device' | 'artifacts') => void;
  executePracticeTrade: (asset: MarketAsset, units: number, isBuy: boolean) => boolean;
  resetAll: () => void;
  selectedAssetForTrade: MarketAsset | null;
  setSelectedAssetForTrade: (asset: MarketAsset | null) => void;
  activeGuardrailModal: 'none' | 'fomo' | 'fo' | 'crash' | 'micro_lesson';
  setActiveGuardrailModal: (val: 'none' | 'fomo' | 'fo' | 'crash' | 'micro_lesson') => void;
  completeOnboarding: (
    name: string,
    age: number,
    goal: string,
    budget: number,
    payday: number,
    riskTemperament: 'steady' | 'balanced' | 'adventurous'
  ) => void;
  startOnboarding: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  name: '',
  age: 22,
  salaryPayday: 5,
  monthlyBudget: 500,
  goal: 'First ₹1 Lakh Wealth & Good Habits',
  riskTemperament: 'steady',
  onboardingStep: 1,
  onboardingCompleted: false,
};

const INITIAL_PRACTICE_HOLDINGS: Holding[] = [
  {
    id: 'hold-1',
    symbol: 'NIFTY50',
    name: 'Nippon India Nifty 50 Index Fund',
    type: 'mutual_fund',
    units: 52.01,
    avgPrice: 38.45,
    currentPrice: 38.45,
    changeTodayPercent: 0.62,
    isSimulated: true,
  },
  {
    id: 'hold-2',
    symbol: 'ZOMATO',
    name: 'Zomato Ltd.',
    type: 'stock',
    units: 10,
    avgPrice: 260.00,
    currentPrice: 268.50,
    changeTodayPercent: 1.45,
    isSimulated: true,
  }
];

const INITIAL_REAL_HOLDINGS: Holding[] = [
  {
    id: 'real-1',
    symbol: 'NIFTY50',
    name: 'Nippon India Nifty 50 Index Fund',
    type: 'mutual_fund',
    units: 13.01,
    avgPrice: 38.45,
    currentPrice: 38.45,
    changeTodayPercent: 0.62,
    isSimulated: false,
  }
];

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentMoment, setCurrentMomentState] = useState<MomentId>('day0_onboarding');
  const [activeNavTab, setActiveNavTab] = useState<NavTab>('stocks');
  const [accountMode, setAccountMode] = useState<'real' | 'practice'>('real');
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [practiceBalance, setPracticeBalance] = useState<number>(5315.00);
  const [practiceHoldings, setPracticeHoldings] = useState<Holding[]>(INITIAL_PRACTICE_HOLDINGS);
  const [realBalance, setRealBalance] = useState<number>(500);
  const [realHoldings, setRealHoldings] = useState<Holding[]>(INITIAL_REAL_HOLDINGS);
  const [scheduledSIP, setScheduledSIP] = useState<SIPSchedule | null>({
    id: 'sip-1',
    fundName: 'Nippon India Nifty 50 Index Fund',
    amount: 500,
    frequency: 'Monthly',
    dayOfMonth: 1,
    isActive: true,
    executedCount: 1,
    createdOnDay: 1,
  });
  const [completedMoments, setCompletedMoments] = useState<Set<MomentId>>(
    new Set<MomentId>(['day0_onboarding', 'day1_practice'])
  );
  const [isGraduated, setIsGraduated] = useState<boolean>(false);
  const [isCrashActive, setIsCrashActive] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'mobile_device' | 'artifacts'>('mobile_device');
  const [selectedAssetForTrade, setSelectedAssetForTrade] = useState<MarketAsset | null>(null);
  const [activeGuardrailModal, setActiveGuardrailModal] = useState<'none' | 'fomo' | 'fo' | 'crash' | 'micro_lesson'>('none');

  useEffect(() => {
    sound.enabled = soundEnabled;
  }, [soundEnabled]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const markMomentComplete = (m: MomentId) => {
    setCompletedMoments(prev => new Set(prev).add(m));
  };

  const setCurrentMoment = (m: MomentId) => {
    setCurrentMomentState(m);
    markMomentComplete(m);
    sound.playTap();

    if (m === 'fomo_pause') {
      setActiveGuardrailModal('fomo');
    } else if (m === 'fo_cooling') {
      setActiveGuardrailModal('fo');
    } else if (m === 'market_crash') {
      setIsCrashActive(true);
      setActiveGuardrailModal('crash');
    } else if (m === 'payday_sip') {
      setActiveNavTab('first100');
    } else if (m === 'day100_recap' || m === 'day101_graduation') {
      setActiveNavTab('first100');
    }
  };

  const executePracticeTrade = (asset: MarketAsset, units: number, isBuy: boolean): boolean => {
    const totalCost = units * asset.price;
    if (isBuy) {
      if (practiceBalance < totalCost) return false;
      setPracticeBalance(prev => prev - totalCost);
      setPracticeHoldings(prev => {
        const existing = prev.find(h => h.symbol === asset.symbol);
        if (existing) {
          const newUnits = existing.units + units;
          const newAvg = (existing.units * existing.avgPrice + totalCost) / newUnits;
          return prev.map(h => h.symbol === asset.symbol ? { ...h, units: newUnits, avgPrice: newAvg } : h);
        } else {
          return [
            ...prev,
            {
              id: `sim-${Date.now()}`,
              symbol: asset.symbol,
              name: asset.name,
              type: asset.category === 'Index Fund' ? 'mutual_fund' : 'stock',
              units,
              avgPrice: asset.price,
              currentPrice: asset.price,
              changeTodayPercent: asset.changePercent,
              isSimulated: true
            }
          ];
        }
      });
      sound.playSuccess();
      return true;
    } else {
      const existing = practiceHoldings.find(h => h.symbol === asset.symbol);
      if (!existing || existing.units < units) return false;
      setPracticeBalance(prev => prev + totalCost);
      setPracticeHoldings(prev =>
        prev
          .map(h => h.symbol === asset.symbol ? { ...h, units: h.units - units } : h)
          .filter(h => h.units > 0.001)
      );
      sound.playSuccess();
      return true;
    }
  };

  const completeOnboarding = (
    name: string,
    age: number,
    goal: string,
    budget: number,
    payday: number,
    riskTemperament: 'steady' | 'balanced' | 'adventurous'
  ) => {
    const finalName = name.trim() || 'Sanket';
    setProfile(prev => ({
      ...prev,
      name: finalName,
      age,
      goal,
      monthlyBudget: budget,
      salaryPayday: payday,
      riskTemperament,
      onboardingCompleted: true,
      onboardingStep: 4,
    }));
    setScheduledSIP({
      id: `sip-${Date.now()}`,
      fundName: 'Nippon India Nifty 50 Index Fund',
      amount: budget,
      frequency: 'Monthly',
      dayOfMonth: payday,
      isActive: true,
      executedCount: 0,
      createdOnDay: 0,
    });
    setCompletedMoments(prev => new Set(prev).add('day0_onboarding').add('day1_practice'));
    setCurrentMomentState('day1_practice');
    setActiveNavTab('stocks');
    sound.playSuccess();
  };

  const startOnboarding = () => {
    setProfile(prev => ({ ...prev, onboardingCompleted: false }));
    setCurrentMomentState('day0_onboarding');
    sound.playTap();
  };

  const resetAll = () => {
    setProfile(DEFAULT_PROFILE);
    setPracticeBalance(5315.00);
    setPracticeHoldings(INITIAL_PRACTICE_HOLDINGS);
    setRealBalance(500);
    setRealHoldings(INITIAL_REAL_HOLDINGS);
    setIsCrashActive(false);
    setIsGraduated(false);
    setCurrentMomentState('day0_onboarding');
    setAccountMode('real');
    setActiveNavTab('stocks');
    setActiveGuardrailModal('none');
    setCompletedMoments(new Set([]));
    sound.playTap();
  };

  return (
    <AppContext.Provider
      value={{
        currentMoment,
        setCurrentMoment,
        activeNavTab,
        setActiveNavTab,
        accountMode,
        setAccountMode,
        profile,
        updateProfile,
        practiceBalance,
        practiceHoldings,
        realBalance,
        realHoldings,
        scheduledSIP,
        setScheduledSIP,
        completedMoments,
        markMomentComplete,
        isGraduated,
        setIsGraduated,
        isCrashActive,
        setIsCrashActive,
        soundEnabled,
        setSoundEnabled,
        viewMode,
        setViewMode,
        executePracticeTrade,
        resetAll,
        completeOnboarding,
        startOnboarding,
        selectedAssetForTrade,
        setSelectedAssetForTrade,
        activeGuardrailModal,
        setActiveGuardrailModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
