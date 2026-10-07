import React, { useEffect, useState } from 'react';
import { Award, CheckCircle2, ArrowRight, Sparkles, Unlock, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/audio';

export const MomentDay101Graduation: React.FC = () => {
  const { profile, setIsGraduated, setActiveNavTab, resetAll } = useApp();
  const [keepGuardrails, setKeepGuardrails] = useState(true);
  const [graduatedState, setGraduatedState] = useState(false);

  useEffect(() => {
    sound.playSuccess();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#00D09C', '#3B82F6', '#F59E0B']
      });
    } catch {
      // Fallback
    }
  }, []);

  const handleCompleteGraduation = () => {
    sound.playSuccess();
    setIsGraduated(true);
    setGraduatedState(true);
  };

  return (
    <div className="space-y-3.5 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
            DAY 101 · GRADUATION
          </span>
          <h2 className="text-xs font-bold text-gray-900">Handing Over To Full Groww</h2>
        </div>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Graduation
        </span>
      </div>

      {!graduatedState ? (
        <div className="space-y-3">
          {/* Certificate Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border-2 border-[#00D09C] text-center space-y-2 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#00D09C] flex items-center justify-center mx-auto">
              <Award className="w-5 h-5" />
            </div>

            <div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-800">
                GROWW FIRST100 GRADUATION
              </span>
              <h3 className="text-base font-extrabold text-gray-900 mt-0.5">
                {profile.name}
              </h3>
              <p className="text-[11px] text-gray-600 mt-1 max-w-xs mx-auto">
                Successfully mastered the critical first 100 days of personal investing with disciplined habits and emotional resilience.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-gray-200 grid grid-cols-2 gap-2 text-xs text-left">
              <div>
                <span className="text-[10px] text-gray-400 block">Core Habit:</span>
                <span className="font-bold text-gray-800">Monthly SIP Active</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block">Verified Mindset:</span>
                <span className="font-bold text-[#00D09C]">Disciplined Owner</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-1">
            <span className="font-bold text-gray-800 flex items-center gap-1.5">
              <Unlock className="w-3.5 h-3.5 text-[#00D09C]" />
              <span>Why First100 Ends Here</span>
            </span>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              First100 was built to create an independent, confident investor, not to keep you in training wheels forever. You are now ready for the full Groww ecosystem.
            </p>
          </div>

          {/* Background guardrail checkbox */}
          <div className="p-3 rounded-xl bg-white border border-gray-200 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-gray-900">Keep Guardrails in Background</div>
              <p className="text-[10px] text-gray-500">
                Gentle reflection pauses on meme stocks and F&O remain active
              </p>
            </div>
            <input
              type="checkbox"
              checked={keepGuardrails}
              onChange={e => setKeepGuardrails(e.target.checked)}
              className="w-4 h-4 accent-[#00D09C] rounded cursor-pointer"
            />
          </div>

          <button
            onClick={handleCompleteGraduation}
            className="w-full py-3 rounded-xl bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <span>Enter Full Groww Experience</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-white border border-gray-200 text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-gray-900">Graduation Complete!</h3>
          <p className="text-xs text-gray-600">
            You now have access to the full Groww catalog with verified habits.
          </p>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setActiveNavTab('stocks')}
              className="flex-1 py-2 rounded-xl bg-[#00D09C] text-white font-bold text-xs"
            >
              Explore Stocks
            </button>
            <button
              onClick={resetAll}
              className="px-3 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
