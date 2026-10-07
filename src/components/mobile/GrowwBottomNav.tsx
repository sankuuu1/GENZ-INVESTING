import React from 'react';
import { TrendingUp, PieChart, ShieldCheck, Briefcase, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/audio';

export const GrowwBottomNav: React.FC = () => {
  const { activeNavTab, setActiveNavTab, isGraduated } = useApp();

  const tabs = [
    {
      id: 'stocks' as const,
      label: 'Stocks',
      icon: TrendingUp,
    },
    {
      id: 'mutual_funds' as const,
      label: 'Mutual Funds',
      icon: PieChart,
    },
    {
      id: 'first100' as const,
      label: 'First100',
      icon: ShieldCheck,
      badge: !isGraduated ? 'Gen Z' : undefined,
    },
    {
      id: 'holdings' as const,
      label: 'Holdings',
      icon: Briefcase,
    },
  ];

  return (
    <nav className="bg-white border-t border-gray-100 px-3 py-1.5 flex items-center justify-around sticky bottom-0 z-30">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeNavTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => {
              sound.playTap();
              setActiveNavTab(tab.id);
            }}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
              isActive ? 'text-[#00D09C] font-semibold' : 'text-gray-400 hover:text-gray-600 font-normal'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
              {tab.badge && (
                <span className="absolute -top-1 -right-3 text-[8px] font-bold bg-[#00D09C] text-white px-1 rounded-full">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-1 tracking-tight">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
