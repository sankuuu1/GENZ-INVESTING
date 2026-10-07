import React from 'react';
import { Search, QrCode, Bell, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/audio';

export const GrowwHeader: React.FC = () => {
  const { profile, activeNavTab, setActiveNavTab, isGraduated, currentMoment } = useApp();

  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
      {/* Top Search & Profile Bar (Authentic Groww App) */}
      <div className="px-4 py-2.5 flex items-center justify-between gap-3">
        {/* User Avatar with initials */}
        <button
          onClick={() => {
            sound.playTap();
            setActiveNavTab('profile');
          }}
          className="relative w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-sm flex items-center justify-center shrink-0 hover:bg-emerald-100 transition-colors"
          title="Account Profile"
        >
          {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
        </button>

        {/* Authentic Groww Search Bar */}
        <div className="flex-1 relative flex items-center">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            readOnly
            value=""
            placeholder="Search Groww (Stocks, Mutual Funds)"
            className="w-full bg-gray-50 hover:bg-gray-100/80 border border-gray-200 rounded-full pl-9 pr-9 py-2 text-xs text-gray-700 placeholder-gray-400 focus:outline-none transition-colors cursor-pointer"
          />
          <QrCode className="w-4 h-4 text-gray-400 absolute right-3 pointer-events-none" />
        </div>

        {/* Notification Bell */}
        <button
          onClick={() => {
            sound.playTap();
            setActiveNavTab('first100');
          }}
          className="p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors relative"
          title="First100 Nudges"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00D09C]" />
        </button>
      </div>

      {/* Authentic Groww Primary Sub-Tabs */}
      <div className="flex items-center px-4 gap-6 text-sm font-semibold border-t border-gray-100 text-gray-500">
        <button
          onClick={() => {
            sound.playTap();
            setActiveNavTab('stocks');
          }}
          className={`py-2.5 relative transition-colors ${
            activeNavTab === 'stocks' ? 'text-[#00D09C]' : 'hover:text-gray-900'
          }`}
        >
          Stocks
          {activeNavTab === 'stocks' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00D09C] rounded-full" />
          )}
        </button>

        <button
          onClick={() => {
            sound.playTap();
            setActiveNavTab('mutual_funds');
          }}
          className={`py-2.5 relative transition-colors ${
            activeNavTab === 'mutual_funds' ? 'text-[#00D09C]' : 'hover:text-gray-900'
          }`}
        >
          Mutual Funds
          {activeNavTab === 'mutual_funds' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00D09C] rounded-full" />
          )}
        </button>

        <button
          onClick={() => {
            sound.playTap();
            setActiveNavTab('first100');
          }}
          className={`py-2.5 relative flex items-center gap-1.5 transition-colors ${
            activeNavTab === 'first100' ? 'text-[#00D09C]' : 'hover:text-gray-900'
          }`}
        >
          <span>First100</span>
          <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded-full font-bold">
            Gen Z
          </span>
          {activeNavTab === 'first100' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00D09C] rounded-full" />
          )}
        </button>

        <button
          onClick={() => {
            sound.playTap();
            setActiveNavTab('holdings');
          }}
          className={`py-2.5 relative transition-colors ml-auto text-xs ${
            activeNavTab === 'holdings' ? 'text-[#00D09C]' : 'hover:text-gray-900'
          }`}
        >
          Holdings
          {activeNavTab === 'holdings' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00D09C] rounded-full" />
          )}
        </button>
      </div>
    </div>
  );
};
