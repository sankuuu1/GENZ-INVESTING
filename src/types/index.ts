export type MomentId =
  | 'day0_onboarding'
  | 'day1_practice'
  | 'payday_sip'
  | 'fomo_pause'
  | 'fo_cooling'
  | 'market_crash'
  | 'day100_recap'
  | 'day101_graduation';

export interface MomentInfo {
  id: MomentId;
  dayNumber: number;
  label: string;
  shortTitle: string;
  tagline: string;
  problemSolved: string;
  behaviorTrigger: string;
  guardrailOutcome: string;
}

export interface UserProfile {
  name: string;
  age: number;
  salaryPayday: number; // e.g. 1st or 5th
  monthlyBudget: number; // e.g. 1000
  goal: string; // e.g. 'Build Long-Term Wealth'
  riskTemperament: 'steady' | 'balanced' | 'adventurous';
  onboardingStep: number;
  onboardingCompleted: boolean;
}

export interface Holding {
  id: string;
  symbol: string;
  name: string;
  type: 'stock' | 'mutual_fund';
  units: number;
  avgPrice: number;
  currentPrice: number;
  changeTodayPercent: number;
  isSimulated: boolean;
}

export interface SIPSchedule {
  id: string;
  fundName: string;
  amount: number;
  frequency: 'Monthly';
  dayOfMonth: number;
  isActive: boolean;
  executedCount: number;
  createdOnDay: number;
}

export interface MarketAsset {
  id: string;
  symbol: string;
  name: string;
  category: 'Index Fund' | 'Large Cap' | 'Mid Cap' | 'High Volatility (ASM)' | 'Trending Speculative' | 'F&O';
  price: number;
  changePercent: number;
  weeklyChangePercent: number;
  peRatio?: number;
  sectorPe?: number;
  asmStage?: string;
  circuitLimit?: string;
  volumeMultiplier?: number;
  riskRating: 'Low' | 'Moderate' | 'Very High' | 'Extreme';
  isTrendingHyped?: boolean;
  isFO?: boolean;
  description: string;
  sparkline: number[];
}
