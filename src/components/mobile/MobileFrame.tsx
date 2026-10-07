import React from 'react';
import { GrowwHeader } from './GrowwHeader';
import { GrowwBottomNav } from './GrowwBottomNav';
import { GrowwHomeScreen } from './GrowwHomeScreen';
import { MutualFundsScreen } from './MutualFundsScreen';
import { HoldingsScreen } from './HoldingsScreen';
import { MomentsJourneyView } from '../moments/MomentsJourneyView';
import { ProfileTab } from './ProfileTab';
import { First100ProgressTracker } from './First100ProgressTracker';
import { OnboardingFlow } from '../onboarding/OnboardingFlow';
import { FOMOGuardrailSheet } from './FOMOGuardrailSheet';
import { FOGuardrailSheet } from './FOGuardrailSheet';
import { CrashGuardrailSheet } from './CrashGuardrailSheet';
import { MicroLessonSheet } from './MicroLessonSheet';
import { useApp } from '../../context/AppContext';
import { Wifi, Battery, Signal } from 'lucide-react';

export const MobileFrame: React.FC = () => {
  const { activeNavTab, profile } = useApp();

  return (
    <div className="relative mx-auto w-full max-w-[400px] min-h-[780px] bg-white rounded-[44px] border-[8px] border-gray-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col font-sans text-gray-900 select-none">
      {/* Top Phone Speaker / Dynamic Island */}
      <div className="pt-2 px-6 flex items-center justify-between text-[11px] text-gray-700 font-mono z-40 bg-white">
        <span className="font-semibold">09:41</span>
        {/* Dynamic Island pill */}
        <div className="w-24 h-4 bg-gray-900 rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00D09C] mr-1.5" />
          <span className="text-[9px] text-gray-300 font-sans font-medium">Groww</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-700">
          <Signal className="w-3 h-3" />
          <Wifi className="w-3 h-3" />
          <Battery className="w-3.5 h-3.5" />
        </div>
      </div>

      {!profile.onboardingCompleted ? (
        <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar bg-white">
          <OnboardingFlow />
        </div>
      ) : (
        <>
          {/* App Header (Search & Sub-Tabs) */}
          <GrowwHeader />

          {/* 100-Day Milestone Step-Tracker Visualization */}
          <First100ProgressTracker />

          {/* Main Scrollable Viewport */}
          <main className="flex-1 overflow-y-auto px-4 py-2.5 space-y-3 bg-[#F8F9FA] no-scrollbar">
            {activeNavTab === 'stocks' && <GrowwHomeScreen />}
            {activeNavTab === 'mutual_funds' && <MutualFundsScreen />}
            {activeNavTab === 'first100' && <MomentsJourneyView />}
            {activeNavTab === 'holdings' && <HoldingsScreen />}
            {activeNavTab === 'profile' && <ProfileTab />}
          </main>

          {/* Bottom Navigation */}
          <GrowwBottomNav />
        </>
      )}

      {/* Home Indicator Bar */}
      <div className="py-1 bg-white flex justify-center">
        <div className="w-32 h-1 bg-gray-300 rounded-full" />
      </div>

      {/* Native Groww Guardrail Bottom Sheets */}
      <FOMOGuardrailSheet />
      <FOGuardrailSheet />
      <CrashGuardrailSheet />
      <MicroLessonSheet />
    </div>
  );
};
