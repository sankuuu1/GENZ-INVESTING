import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, PieChart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/audio';

export const MicroLessonSheet: React.FC = () => {
  const { activeGuardrailModal, setActiveGuardrailModal } = useApp();
  const [step, setStep] = useState(0);

  if (activeGuardrailModal !== 'micro_lesson') return null;

  const handleClose = () => {
    sound.playTap();
    setActiveGuardrailModal('none');
    setStep(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-[420px] bg-white rounded-t-3xl border-t border-gray-100 p-5 shadow-2xl text-gray-900 space-y-4 animate-slide-up">
        {/* Grab handle */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto -mt-1 mb-2" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>60-Second In-Flow Lesson</span>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 0 ? (
          <div className="space-y-3">
            <h3 className="text-base font-bold text-gray-900">
              Where does your ₹500 SIP actually go?
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              When you invest in the <strong>Nifty 50 Index Fund</strong>, you don&apos;t just buy a ticket. You own a proportionate basket of India&apos;s 50 biggest corporations:
            </p>

            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
              <div className="flex justify-between text-xs font-semibold text-gray-700">
                <span>Top Companies in your basket</span>
                <span className="text-[#00D09C]">Weightage</span>
              </div>
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>HDFC Bank & ICICI Bank (Finance)</span>
                  <span className="font-mono">19.2%</span>
                </div>
                <div className="flex justify-between">
                  <span>Reliance Industries (Energy/Retail)</span>
                  <span className="font-mono">9.8%</span>
                </div>
                <div className="flex justify-between">
                  <span>TCS & Infosys (Global Tech)</span>
                  <span className="font-mono">8.9%</span>
                </div>
                <div className="flex justify-between text-gray-400 text-[11px]">
                  <span>+ 45 other industry leaders</span>
                  <span className="font-mono">62.1%</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playTap();
                setStep(1);
              }}
              className="w-full py-3 rounded-xl bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Next: Why this beats picking random stocks (30s)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-base font-bold text-gray-900">
              The Cushion Effect
            </h3>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#00D09C]" />
                  <span>Diversification Cushion</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  If 1 company has a bad quarter and drops 10%, the other 49 companies absorb the shock. You never wake up to an empty balance.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <PieChart className="w-4 h-4 text-blue-500" />
                  <span>Ride India&apos;s Economic Growth</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  As Indian businesses expand over the next 10 years, your ₹500 compounds automatically without needing to pick winning stocks.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playSuccess();
                handleClose();
              }}
              className="w-full py-3 rounded-xl bg-gray-900 text-white font-bold text-xs transition-colors shadow-xs"
            >
              Understood! Return to Groww
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
