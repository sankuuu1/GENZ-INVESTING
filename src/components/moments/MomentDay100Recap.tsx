import React, { useState } from 'react';
import { Award, ShieldCheck, ArrowRight, Share2, CheckCircle2, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/audio';

export const MomentDay100Recap: React.FC = () => {
  const { setCurrentMoment } = useApp();
  const [activeSlide, setActiveSlide] = useState(0);
  const [copied, setCopied] = useState(false);

  const slides = [
    {
      badge: 'SURVIVOR IDENTITY',
      title: 'You Survived 100 Days.',
      sub: 'Most beginners quit by Day 20. You built an unshakable compounding habit.',
    },
    {
      badge: 'DISCIPLINE SCORE: 100%',
      title: 'Your Battle-Tested Stats',
      sub: '3 SIPs executed · 0 panic sells · 1 crash navigated · ₹1,500 safely compounded.',
    },
    {
      badge: 'HABIT LOCKED',
      title: 'From Spectator to Owner',
      sub: 'Portfolio: ₹1,648 (+9.8% returns). You are an investor, not a gambler.',
    }
  ];

  const handleShare = () => {
    sound.playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3.5 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
            DAY 100 · MILESTONE
          </span>
          <h2 className="text-xs font-bold text-gray-900">Your First100 Recap</h2>
        </div>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
          <Award className="w-3 h-3" /> Survivor
        </span>
      </div>

      {/* Recap Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white border border-emerald-200 space-y-3">
        {/* Slide progress bars */}
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => {
                sound.playTap();
                setActiveSlide(i);
              }}
              className={`h-1 rounded-full flex-1 cursor-pointer transition-all ${
                i === activeSlide ? 'bg-[#00D09C]' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <div>
          <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
            {slides[activeSlide].badge}
          </span>
          <h3 className="text-base font-extrabold text-gray-900 mt-2">
            {slides[activeSlide].title}
          </h3>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            {slides[activeSlide].sub}
          </p>
        </div>

        {activeSlide === 0 && (
          <div className="p-3 rounded-xl bg-white border border-gray-200 text-xs space-y-1">
            <span className="text-emerald-700 font-bold block">Why this matters:</span>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              &ldquo;Beginners don’t fail because investing is complicated. They fail because they panic at the first bump. You kept your cool.&rdquo;
            </p>
          </div>
        )}

        {activeSlide === 1 && (
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="bg-white p-2.5 rounded-xl border border-gray-200">
              <span className="text-[10px] text-gray-400 block font-sans">Automated SIPs</span>
              <span className="font-bold text-[#00D09C] text-sm">3 / 3 Executed</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-gray-200">
              <span className="text-[10px] text-gray-400 block font-sans">Panic Sells</span>
              <span className="font-bold text-gray-900 text-sm">0 (Disciplined)</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-gray-200">
              <span className="text-[10px] text-gray-400 block font-sans">FOMO Pauses</span>
              <span className="font-bold text-amber-600 text-sm">1 Bubble Skipped</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-gray-200">
              <span className="text-[10px] text-gray-400 block font-sans">Capital Saved</span>
              <span className="font-bold text-[#00D09C] text-sm">100% Intact</span>
            </div>
          </div>
        )}

        {activeSlide === 2 && (
          <div className="p-3 rounded-xl bg-white border border-gray-200 text-xs space-y-1.5 font-mono">
            <div className="flex justify-between text-gray-600">
              <span>Total Invested:</span>
              <span className="font-bold text-gray-900">₹1,500.00</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Current Valuation:</span>
              <span className="font-bold text-[#00D09C]">₹1,648.50</span>
            </div>
            <div className="flex justify-between text-gray-600 border-t border-gray-100 pt-1">
              <span>Compounded Gain:</span>
              <span className="font-bold text-[#00D09C]">+₹148.50 (+9.8%)</span>
            </div>
          </div>
        )}

        {/* Carousel footer */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={handleShare}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-xs text-gray-700 hover:text-gray-900"
          >
            <Share2 className="w-3.5 h-3.5 text-[#00D09C]" />
            <span>{copied ? 'Copied Link!' : 'Share'}</span>
          </button>

          {activeSlide < 2 ? (
            <button
              onClick={() => {
                sound.playTap();
                setActiveSlide(prev => prev + 1);
              }}
              className="flex items-center gap-1 px-4 py-1.5 rounded-xl bg-[#00D09C] text-white font-bold text-xs"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => {
                sound.playSuccess();
                setCurrentMoment('day101_graduation');
              }}
              className="flex items-center gap-1 px-4 py-1.5 rounded-xl bg-gray-900 text-white font-bold text-xs"
            >
              <span>Graduate to Day 101</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
