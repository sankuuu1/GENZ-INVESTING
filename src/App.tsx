import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { MobileFrame } from './components/mobile/MobileFrame';
import { ArtifactsView } from './components/artifacts/ArtifactsView';
import { MOMENT_DEFINITIONS } from './data/mockMarket';
import { sound } from './utils/audio';
import {
  Smartphone,
  FileText,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Check,
  ExternalLink,
  User,
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    currentMoment,
    setCurrentMoment,
    completedMoments,
    soundEnabled,
    setSoundEnabled,
    resetAll,
    startOnboarding,
    isGraduated,
  } = useApp();

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-gray-900 flex flex-col font-sans selection:bg-[#00D09C] selection:text-white">
      {/* Top Application Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200/90 shadow-2xs px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Logo & Product Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#00D09C] flex items-center justify-center font-extrabold text-white text-base shadow-xs">
              G
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-gray-900 text-base tracking-tight">Groww First100</span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Integrated Gen Z Section
                </span>
              </div>
              <p className="text-[11px] text-gray-500 hidden sm:block">
                Designing Groww for the Gen Z Investor · First 100 Days Behavioral Guardrails
              </p>
            </div>
          </div>

          {/* Primary View Switcher: Prototype vs Artifacts */}
          <div className="flex items-center gap-2">
            <div className="flex items-center p-1 bg-gray-100 rounded-xl">
              <button
                onClick={() => {
                  sound.playTap();
                  setViewMode('mobile_device');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'mobile_device'
                    ? 'bg-[#00D09C] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Groww Mobile App</span>
              </button>

              <button
                onClick={() => {
                  sound.playTap();
                  setViewMode('artifacts');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'artifacts'
                    ? 'bg-[#00D09C] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>1-Page Case Study & Prompts</span>
              </button>
            </div>

            {/* Quick Action Controls */}
            <div className="flex items-center gap-1.5 border-l border-gray-200 pl-2">
              <button
                onClick={() => {
                  setViewMode('mobile_device');
                  startOnboarding();
                }}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                title="Open Day 0 Onboarding Setup"
              >
                <User className="w-3.5 h-3.5 text-[#00D09C]" />
                <span className="hidden sm:inline">Onboarding Flow</span>
              </button>

              <button
                onClick={() => {
                  setSoundEnabled(!soundEnabled);
                  sound.playTap();
                }}
                className="p-2 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors shadow-2xs"
                title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
              >
                {soundEnabled ? (
                  <Volume2 className="w-3.5 h-3.5 text-[#00D09C]" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-gray-400" />
                )}
              </button>

              <button
                onClick={resetAll}
                className="p-2 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors shadow-2xs"
                title="Reset Prototype to Day 0 Onboarding"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Moment Switcher Strip (Direct Jump for Reviewers) */}
      <div className="border-b border-gray-200 bg-white px-4 py-2 overflow-x-auto no-scrollbar shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <span className="text-[11px] font-bold text-gray-600 shrink-0 mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#00D09C]" />
            <span>8 Critical Moments:</span>
          </span>

          <div className="flex items-center gap-1.5">
            {MOMENT_DEFINITIONS.map(m => {
              const isActive = currentMoment === m.id;
              const isCompleted = completedMoments.has(m.id);

              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setViewMode('mobile_device');
                    if (m.id === 'day0_onboarding') {
                      startOnboarding();
                    } else {
                      setCurrentMoment(m.id);
                    }
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-gray-900 text-white shadow-xs'
                      : isCompleted
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-800 hover:border-emerald-300'
                      : 'bg-gray-50 border border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <span>{m.label}: {m.shortTitle}</span>
                  {isCompleted && !isActive && (
                    <Check className="w-3 h-3 text-[#00D09C] stroke-[3]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col items-center justify-center">
        {viewMode === 'mobile_device' ? (
          <div className="w-full flex flex-col items-center">
            <MobileFrame />
          </div>
        ) : (
          <div className="w-full">
            <ArtifactsView />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-3 px-4 text-center text-xs text-gray-500 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Groww First100 · Designed for Gen Z First-Time Investors</span>
          <div className="flex items-center gap-3">
            <span>SEBI-Safe Education Guardrails</span>
            <span>·</span>
            <span>Integrated Groww Experience</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
