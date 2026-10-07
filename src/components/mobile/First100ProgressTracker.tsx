import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOMENT_DEFINITIONS } from '../../data/mockMarket';
import { sound } from '../../utils/audio';
import { ShieldCheck, ChevronDown, ChevronUp, Check, Award, Compass } from 'lucide-react';

export const First100ProgressTracker: React.FC = () => {
  const { currentMoment, setCurrentMoment, completedMoments, isGraduated } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  const currentDef = MOMENT_DEFINITIONS.find(m => m.id === currentMoment) || MOMENT_DEFINITIONS[0];
  const currentDay = currentDef.dayNumber;
  const progressPercent = Math.min(100, Math.round((currentDay / 100) * 100));

  const getPhaseName = (day: number) => {
    if (day <= 1) return 'Phase 1: Orientation & Sandbox';
    if (day <= 30) return 'Phase 2: Systematic Allocation';
    if (day <= 70) return 'Phase 3: Risk & Surveillance Awareness';
    if (day <= 100) return 'Phase 4: Volatility Resilience & Review';
    return 'Phase 5: Standard Platform Transition';
  };

  return (
    <div className="bg-white border-b border-gray-200/90 px-3.5 py-2 transition-all">
      {/* Top Summary Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#00D09C]">
            <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-[11px] font-bold text-gray-900 font-mono">
                {currentDay > 100 ? 'Day 101+' : `Day ${currentDay} of 100`}
              </span>
              <span className="text-[9px] text-gray-400 font-medium">·</span>
              <span className="text-[10px] text-emerald-700 font-bold font-mono">
                {progressPercent}% Complete
              </span>
            </div>
            <span className="text-[9px] text-gray-500 font-medium block mt-0.5">
              {getPhaseName(currentDay)}
            </span>
          </div>
        </div>

        {/* Toggle Roadmap expansion */}
        <button
          onClick={() => {
            sound.playTap();
            setIsExpanded(!isExpanded);
          }}
          className="flex items-center gap-0.5 px-2 py-0.5 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-[10px] font-semibold text-gray-600 transition-colors"
          title="Toggle 100-Day Milestone Tracker"
        >
          <span>{isExpanded ? 'Hide Track' : 'Milestones'}</span>
          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* Primary Linear Progress Bar with Phase Segment Ticks */}
      <div className="mt-2 relative">
        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden flex">
          <div
            className="bg-[#00D09C] h-full transition-all duration-300 ease-out rounded-full"
            style={{ width: `${Math.max(5, progressPercent)}%` }}
          />
        </div>

        {/* Subtle Milestone Tick Marks on Track (Days 1, 28, 42, 65, 78, 100) */}
        <div className="absolute top-0 left-0 right-0 h-1.5 pointer-events-none flex justify-between px-0.5">
          {[0, 28, 42, 65, 78, 100].map(d => (
            <div
              key={d}
              className={`w-0.5 h-1.5 ${
                currentDay >= d ? 'bg-emerald-700/60' : 'bg-gray-300'
              }`}
              style={{ marginLeft: d === 0 ? '0' : undefined }}
            />
          ))}
        </div>
      </div>

      {/* Expanded Interactive Milestone Roadmap */}
      {isExpanded && (
        <div className="mt-3 pt-2.5 border-t border-gray-100 space-y-2.5 animate-fade-in">
          <div className="flex items-center justify-between text-[10px] text-gray-500 px-0.5">
            <span className="font-semibold text-gray-700">100-Day Milestone Sequence</span>
            <span>Tap node to inspect</span>
          </div>

          {/* Horizontal Stepper with Connected Line */}
          <div className="relative flex items-center justify-between px-1">
            {/* Connecting baseline line */}
            <div className="absolute left-3 right-3 top-3 h-0.5 bg-gray-200 -z-0" />
            <div
              className="absolute left-3 top-3 h-0.5 bg-[#00D09C] -z-0 transition-all duration-300"
              style={{
                width: `${Math.max(0, Math.min(100, (currentDay / 100) * 100))}%`,
              }}
            />

            {MOMENT_DEFINITIONS.map((m, idx) => {
              const isPassed = currentDay > m.dayNumber;
              const isCurrent = currentMoment === m.id;
              const isCompleted = completedMoments.has(m.id);

              return (
                <button
                  key={m.id}
                  onClick={() => {
                    sound.playTap();
                    setCurrentMoment(m.id);
                  }}
                  className="group relative z-10 flex flex-col items-center focus:outline-none"
                  title={`${m.label}: ${m.shortTitle}`}
                >
                  {/* Step Node Dot */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold font-mono transition-all ${
                      isCurrent
                        ? 'bg-[#00D09C] text-white ring-3 ring-emerald-100 shadow-xs scale-110'
                        : isPassed || isCompleted
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white border-2 border-gray-300 text-gray-400 group-hover:border-gray-400'
                    }`}
                  >
                    {isPassed || (isCompleted && !isCurrent) ? (
                      <Check className="w-3 h-3 stroke-[3]" />
                    ) : (
                      <span>D{m.dayNumber === 0 ? '0' : m.dayNumber === 28 ? '28' : m.dayNumber === 101 ? '★' : m.dayNumber}</span>
                    )}
                  </div>

                  {/* Micro Step Caption */}
                  <span
                    className={`text-[8px] mt-1 font-medium whitespace-nowrap transition-colors max-w-[38px] truncate ${
                      isCurrent
                        ? 'text-emerald-800 font-bold'
                        : isPassed
                        ? 'text-gray-600'
                        : 'text-gray-400'
                    }`}
                  >
                    {m.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Current Active Step Callout */}
          <div className="p-2 rounded-xl bg-gray-50 border border-gray-200/80 flex items-start justify-between text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-emerald-800 block">
                Current Milestone: {currentDef.shortTitle}
              </span>
              <p className="text-[10px] text-gray-500 leading-tight">
                {currentDef.problemSolved}
              </p>
            </div>
            <span className="text-[9px] font-mono font-bold text-gray-400 shrink-0 ml-2">
              {currentDef.label}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
