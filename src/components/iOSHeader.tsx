import React from 'react';
import { Flame, User } from 'lucide-react';
import { sounds } from '../utils/audio';

interface Props {
  selectedDay: number;
  onSelectDay: (day: number) => void;
  onOpenProfile: () => void;
  completedDaysCount: number;
}

export const IOSHeader: React.FC<Props> = ({
  selectedDay,
  onSelectDay,
  onOpenProfile,
  completedDaysCount,
}) => {
  const days = [1, 2, 3, 4, 5, 6, 7];

  return (
    <header className="sticky top-0 z-40 bg-[#0b0f17]/95 backdrop-blur-xl border-b border-white/5 pt-[max(env(safe-area-inset-top),10px)]">
      {/* Main Bar - Clean native iOS style without fake status bar */}
      <div className="px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-bold text-sm">
            <Flame className="w-5 h-5 text-amber-300 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="text-base font-bold text-white tracking-tight">Fat Loss Pro</h1>
              <span className="px-1.5 py-0.5 text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-md font-semibold">
                iOS
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Bodyweight + Indonesian Diet
            </p>
          </div>
        </div>

        {/* Right Badges */}
        <div className="flex items-center space-x-2">
          {/* Day Streak */}
          <div className="flex items-center space-x-1 px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{completedDaysCount}/7 Hari</span>
          </div>

          {/* Profile Button */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenProfile();
            }}
            aria-label="Profil Pengguna"
            className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 active:scale-95 transition-transform hover:bg-slate-700"
          >
            <User className="w-4 h-4 text-emerald-400" />
          </button>
        </div>
      </div>

      {/* 7-Day Horizontal Selector */}
      <div className="px-4 pb-2.5 pt-1 overflow-x-auto no-scrollbar flex items-center space-x-2">
        {days.map((d) => {
          const isActive = d === selectedDay;
          return (
            <button
              key={d}
              onClick={() => {
                sounds.playClick();
                onSelectDay(d);
              }}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 flex flex-col items-center min-w-[56px] ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-md shadow-emerald-500/25 scale-105'
                  : 'bg-slate-900/80 border border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span className={`text-[9px] uppercase tracking-wider ${isActive ? 'text-slate-900 font-extrabold' : 'text-slate-500'}`}>
                HARI
              </span>
              <span className="text-sm font-black">{d}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
