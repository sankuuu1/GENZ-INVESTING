import React from 'react';
import { OnboardingFlow } from '../onboarding/OnboardingFlow';
import { useApp } from '../../context/AppContext';

export const MomentDay0Onboarding: React.FC = () => {
  const { setCurrentMoment, setActiveNavTab } = useApp();

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200/90 shadow-xs bg-white">
      <OnboardingFlow
        onComplete={() => {
          setCurrentMoment('day1_practice');
          setActiveNavTab('stocks');
        }}
      />
    </div>
  );
};

