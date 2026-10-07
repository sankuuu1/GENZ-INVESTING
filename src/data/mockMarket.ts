import { MarketAsset, MomentInfo } from '../types';

export const MOMENT_DEFINITIONS: MomentInfo[] = [
  {
    id: 'day0_onboarding',
    dayNumber: 0,
    label: 'Day 0',
    shortTitle: 'Low-Friction Onboarding',
    tagline: 'Structured setup with progress preservation',
    problemSolved: 'High drop-off rates during initial account onboarding and risk profiling.',
    behaviorTrigger: 'New user initiates account creation and requires structured orientation.',
    guardrailOutcome: 'Three-step objective preference mapping, auto-saved progress, and asynchronous resumption options.'
  },
  {
    id: 'day1_practice',
    dayNumber: 1,
    label: 'Day 1',
    shortTitle: 'Simulated Sandbox & SIP Setup',
    tagline: 'Risk-free market orientation and scheduled investing',
    problemSolved: 'Capital hesitation on initial day leads to decision paralysis and user drop-off.',
    behaviorTrigger: 'User explores order placement mechanics without committing active capital.',
    guardrailOutcome: '₹10,000 simulated order execution environment with an optional recurring SIP scheduled for salary credit date.'
  },
  {
    id: 'payday_sip',
    dayNumber: 28,
    label: 'Payday',
    shortTitle: 'First Capital Allocation',
    tagline: 'Automated SIP execution with contextual portfolio education',
    problemSolved: 'First-time investors frequently lack clarity regarding underlying asset allocation in pooled investment schemes.',
    behaviorTrigger: 'Recurring monthly SIP order executes successfully upon scheduled salary credit.',
    guardrailOutcome: 'Contextual in-flow allocation breakdown explaining index fund composition and bluechip diversification.'
  },
  {
    id: 'fomo_pause',
    dayNumber: 42,
    label: 'Day 42',
    shortTitle: 'Exchange Surveillance & Volatility',
    tagline: 'Objective regulatory data disclosure during rapid price movements',
    problemSolved: 'Retail investors risk entering securities experiencing extreme price volatility without evaluating valuation multiples or circuit liquidity constraints.',
    behaviorTrigger: 'User submits an order for a security under exchange surveillance (NSE ASM Stage 1) with high price-volume variance.',
    guardrailOutcome: 'Surveillance advisory disclosure: P/E valuation relative to sector median, price band constraints, and a mandatory cooling reflection.'
  },
  {
    id: 'fo_cooling',
    dayNumber: 65,
    label: 'Day 65',
    shortTitle: 'Derivatives Risk Advisory',
    tagline: 'Regulatory disclosure of derivatives retail loss data',
    problemSolved: 'Retail participation in high-leverage derivative instruments without adequate understanding of contract expiration and premium decay.',
    behaviorTrigger: 'First-time investor attempts to navigate or trade index options and futures.',
    guardrailOutcome: 'Mandatory SEBI retail study disclosure (93% retail loss rate), paper-trading alternative, and an optional 24-hour cooling-off period.'
  },
  {
    id: 'market_crash',
    dayNumber: 78,
    label: 'Day 78',
    shortTitle: 'Market Drawdown Analysis',
    tagline: 'Rupee-cost averaging education during market corrections',
    problemSolved: 'Impulsive redemption or SIP cancellation during short-term cyclical market downturns.',
    behaviorTrigger: 'Portfolio records an unrealized drawdown following a broad benchmark index decline.',
    guardrailOutcome: 'Objective historical benchmark drawdown recovery data and mathematical demonstration of unit accumulation at lower NAVs.'
  },
  {
    id: 'day100_recap',
    dayNumber: 100,
    label: 'Day 100',
    shortTitle: '100-Day Performance Review',
    tagline: 'Discipline metrics and behavioral habit assessment',
    problemSolved: 'Long-term investing habits weaken without tangible feedback on systematic consistency and risk mitigation.',
    behaviorTrigger: 'User successfully completes 100 consecutive days of systematic investing without unhedged capital depletion.',
    guardrailOutcome: 'Comprehensive portfolio audit: SIP completion rate, volatility navigation metrics, and habit retention milestones.'
  },
  {
    id: 'day101_graduation',
    dayNumber: 101,
    label: 'Day 101',
    shortTitle: 'Full Platform Transition',
    tagline: 'Transition to standard Groww trading & investing suite',
    problemSolved: 'Protective onboarding guardrails risk limiting experienced users if not transitioned systematically.',
    behaviorTrigger: '100-day systematic investing milestone successfully achieved.',
    guardrailOutcome: 'Formal milestone certification and seamless unlocking of the complete multi-asset Groww platform with optional persistent guardrails.'
  }
];

export const MOCK_ASSETS: MarketAsset[] = [
  {
    id: 'nifty-50-index',
    symbol: 'NIFTY50',
    name: 'Nippon India Nifty 50 Index Fund',
    category: 'Index Fund',
    price: 38.45,
    changePercent: 0.62,
    weeklyChangePercent: 1.15,
    peRatio: 22.4,
    sectorPe: 22.4,
    riskRating: 'Low',
    description: 'Invests in top 50 bluechip companies in India. Lowest expense ratio, steady long-term compounding.',
    sparkline: [36.2, 36.8, 37.1, 37.0, 37.5, 38.1, 38.45]
  },
  {
    id: 'parag-parikh-flexi',
    symbol: 'PPFAS',
    name: 'Parag Parikh Flexi Cap Fund',
    category: 'Large Cap',
    price: 76.20,
    changePercent: 0.85,
    weeklyChangePercent: 2.10,
    peRatio: 24.1,
    sectorPe: 24.1,
    riskRating: 'Moderate',
    description: 'Disciplined value fund with exposure to Indian bluechips and global leaders.',
    sparkline: [72.0, 72.8, 73.5, 74.2, 75.0, 75.8, 76.2]
  },
  {
    id: 'zomato',
    symbol: 'ZOMATO',
    name: 'Zomato Ltd.',
    category: 'Mid Cap',
    price: 268.50,
    changePercent: 1.45,
    weeklyChangePercent: 4.80,
    peRatio: 98.2,
    sectorPe: 52.0,
    riskRating: 'Moderate',
    description: 'Leading food delivery & quick commerce platform (Blinkit) in India.',
    sparkline: [250, 255, 252, 260, 264, 266, 268.5]
  },
  {
    id: 'tata-motors',
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Ltd.',
    category: 'Large Cap',
    price: 945.30,
    changePercent: -0.40,
    weeklyChangePercent: 1.20,
    peRatio: 16.8,
    sectorPe: 18.5,
    riskRating: 'Moderate',
    description: 'Automotive pioneer leading commercial vehicles, passenger EVs, and JLR.',
    sparkline: [930, 935, 942, 948, 946, 944, 945.3]
  },
  {
    id: 'novatech-green',
    symbol: 'NOVAGREEN',
    name: 'NovaTech Clean Power Ltd.',
    category: 'High Volatility (ASM)',
    price: 342.80,
    changePercent: 5.0,
    weeklyChangePercent: 42.8,
    peRatio: 142.5,
    sectorPe: 24.1,
    asmStage: 'NSE ASM Stage 1',
    circuitLimit: 'Upper Circuit (+5.0%)',
    volumeMultiplier: 6.8,
    riskRating: 'Extreme',
    isTrendingHyped: true,
    description: 'Renewable EPC firm placed under NSE Additional Surveillance Measure (ASM Stage 1) due to sustained price and volume variance.',
    sparkline: [240, 252, 265, 291, 326, 342.8]
  },
  {
    id: 'nifty-call-option',
    symbol: 'NIFTY 25000 CE',
    name: 'NIFTY 24th Oct 25000 Call Option',
    category: 'F&O',
    price: 114.50,
    changePercent: 68.2,
    weeklyChangePercent: -82.0,
    riskRating: 'Extreme',
    isFO: true,
    description: 'Weekly index derivative contract. High leverage, subject to time decay and expires to zero if out-of-the-money.',
    sparkline: [310, 240, 180, 90, 68, 114.5]
  }
];

export const HISTORICAL_CRASH_DATA = [
  {
    event: '2008 Global Financial Crisis',
    drop: '-52%',
    recoveryMonths: '18 months',
    postRecoveryGain: '+164% in 3 yrs',
    lesson: 'Disciplined SIP investors accumulated units at multi-year valuation discounts.'
  },
  {
    event: '2020 COVID Market Drawdown',
    drop: '-38%',
    recoveryMonths: '5 months',
    postRecoveryGain: '+142% in 2 yrs',
    lesson: 'Steep short-term correction followed by rapid macroeconomic expansion.'
  },
  {
    event: '2022 Global Rate Hike Correction',
    drop: '-16%',
    recoveryMonths: '8 months',
    postRecoveryGain: '+48% subsequent high',
    lesson: 'Patience rewarded investors who avoided panic-stopping scheduled SIPs.'
  }
];
