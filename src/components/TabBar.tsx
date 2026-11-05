import React from 'react';
import { Dumbbell, Utensils, HeartPulse, TrendingDown } from 'lucide-react';
import { sounds } from '../utils/audio';

export type TabType = 'workout' | 'meals' | 'habits' | 'progress';

interface Props {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  workoutBadge?: boolean;
}

export const TabBar: React.FC<Props> = ({
  activeTab,
  onChangeTab,
  workoutBadge,
}) => {
  const tabs: { key: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { key: 'workout', label: 'Latihan', icon: Dumbbell },
    { key: 'meals', label: 'Nutrisi', icon: Utensils },
    { key: 'habits', label: 'Kebiasaan', icon: HeartPulse },
    { key: 'progress', label: 'Progress', icon: TrendingDown },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-nav pb-safe-bottom">
      <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-around">
        {tabs.map((t) => {
          const isActive = activeTab === t.key;
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              onClick={() => {
                sounds.playClick();
                onChangeTab(t.key);
              }}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 active:scale-90 relative ${
                isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-6 h-6 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
                {t.key === 'workout' && workoutBadge && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0b0f17]" />
                )}
              </div>
              <span className={`text-[11px] mt-1 tracking-tight ${isActive ? 'text-emerald-400' : 'text-slate-400'}`}>
                {t.label}
              </span>

              {/* Active iOS dot indicator */}
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-emerald-400 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
