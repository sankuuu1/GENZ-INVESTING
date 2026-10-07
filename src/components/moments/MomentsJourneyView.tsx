import React from 'react';
import { useApp } from '../../context/AppContext';
import { MOMENT_DEFINITIONS } from '../../data/mockMarket';
import { MomentDay0Onboarding } from './MomentDay0Onboarding';
import { MomentDay1PracticeSIP } from './MomentDay1PracticeSIP';
import { MomentPaydaySIP } from './MomentPaydaySIP';
import { MomentFOMOPause } from './MomentFOMOPause';
import { MomentFOCooling } from './MomentFOCooling';
import { MomentMarketCrash } from './MomentMarketCrash';
import { MomentDay100Recap } from './MomentDay100Recap';
import { MomentDay101Graduation } from './MomentDay101Graduation';
import { sound } from '../../utils/audio';
import { Check, ShieldCheck, ChevronRight } from 'lucide-react';

export const MomentsJourneyView: React.FC = () => {
  const { currentMoment, setCurrentMoment, completedMoments } = useApp();

  const currentDef = MOMENT_DEFINITIONS.find(m => m.id === currentMoment) || MOMENT_DEFINITIONS[0];

  return (
    <div className="space-y-3 pb-4">
      {/* Moment Selector Strip */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs px-1">
          <span className="font-bold text-gray-900">100-Day Timeline Moments</span>
          <span className="text-[10px] text-gray-500 font-mono">
            {completedMoments.size}/8 Experienced
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {MOMENT_DEFINITIONS.map(m => {
            const isActive = currentMoment === m.id;
            const isCompleted = completedMoments.has(m.id);

            return (
              <button
                key={m.id}
                onClick={() => {
                  sound.playTap();
                  setCurrentMoment(m.id);
                }}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap text-xs transition-all flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'bg-gray-900 text-white font-bold shadow-xs'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <span>{m.label}</span>
                {isCompleted && !isActive && (
                  <Check className="w-3 h-3 text-[#00D09C] stroke-[3]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Moment Context Banner */}
      <div className="p-3 rounded-xl bg-white border border-gray-200/80 shadow-xs text-xs space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider">
            {currentDef.shortTitle}
          </span>
          <span className="text-[10px] text-gray-400">
            Moment {MOMENT_DEFINITIONS.findIndex(m => m.id === currentMoment) + 1} of 8
          </span>
        </div>
        <p className="text-[11px] text-gray-600">
          <strong className="text-gray-900">Educational Objective:</strong> {currentDef.problemSolved}
        </p>
        <p className="text-[10px] text-gray-500">
          <strong>Framework:</strong> {currentDef.tagline}
        </p>
      </div>

      {/* Render the Active Moment Screen */}
      <div>
        {currentMoment === 'day0_onboarding' && <MomentDay0Onboarding />}
        {currentMoment === 'day1_practice' && <MomentDay1PracticeSIP />}
        {currentMoment === 'payday_sip' && <MomentPaydaySIP />}
        {currentMoment === 'fomo_pause' && <MomentFOMOPause />}
        {currentMoment === 'fo_cooling' && <MomentFOCooling />}
        {currentMoment === 'market_crash' && <MomentMarketCrash />}
        {currentMoment === 'day100_recap' && <MomentDay100Recap />}
        {currentMoment === 'day101_graduation' && <MomentDay101Graduation />}
      </div>
    </div>
  );
};
