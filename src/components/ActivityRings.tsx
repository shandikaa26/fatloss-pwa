import React from 'react';
import { Dumbbell, Utensils, Footprints, Droplets } from 'lucide-react';

interface Props {
  workoutProgress: number; // 0 to 1
  mealProgress: number;    // 0 to 1
  habitProgress: number;   // 0 to 1
  workoutSetsDone: number;
  workoutTotalSets: number;
  caloriesLogged: number;
  caloriesTarget: number;
  stepsLogged: number;
  stepsTarget: number;
  waterMl: number;
  waterTargetL: number;
}

export const ActivityRings: React.FC<Props> = ({
  workoutProgress,
  mealProgress,
  habitProgress,
  workoutSetsDone,
  workoutTotalSets,
  caloriesLogged,
  caloriesTarget,
  stepsLogged,
  stepsTarget,
  waterMl,
  waterTargetL,
}) => {
  // SVG Ring calculations
  const size = 180;
  const strokeWidth = 14;
  const center = size / 2;

  // Ring 1 (Outer - Workout: Coral/Red)
  const r1 = center - strokeWidth;
  const c1 = 2 * Math.PI * r1;
  const offset1 = c1 - Math.min(workoutProgress, 1) * c1;

  // Ring 2 (Middle - Meal/Calories: Neon Green)
  const r2 = r1 - strokeWidth - 5;
  const c2 = 2 * Math.PI * r2;
  const offset2 = c2 - Math.min(mealProgress, 1) * c2;

  // Ring 3 (Inner - Habits/Steps: Cyan)
  const r3 = r2 - strokeWidth - 5;
  const c3 = 2 * Math.PI * r3;
  const offset3 = c3 - Math.min(habitProgress, 1) * c3;

  return (
    <div className="glass-panel rounded-3xl p-5 relative overflow-hidden border border-white/10 shadow-xl">
      {/* Background glow */}
      <div className="absolute -top-12 -right-12 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
            Aktivitas Harian
          </span>
          <h2 className="text-lg font-bold text-white tracking-tight">Apple Health Rings</h2>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400">Target Harian</span>
          <div className="text-sm font-semibold text-slate-200">
            {Math.round(((workoutProgress + mealProgress + habitProgress) / 3) * 100)}%
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        {/* The 3 Concentric Rings */}
        <div className="relative flex items-center justify-center flex-shrink-0">
          <svg width={size} height={size} className="transform -rotate-90">
            <defs>
              <linearGradient id="gradRed" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ff3b30" />
                <stop offset="100%" stop-color="#ff9500" />
              </linearGradient>
              <linearGradient id="gradGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#34c759" />
                <stop offset="100%" stop-color="#30d158" />
              </linearGradient>
              <linearGradient id="gradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#00c7be" />
                <stop offset="100%" stop-color="#0a84ff" />
              </linearGradient>
            </defs>

            {/* Ring 1 - Background & Progress */}
            <circle
              cx={center}
              cy={center}
              r={r1}
              stroke="rgba(255, 59, 48, 0.18)"
              strokeWidth={strokeWidth}
              fill="none"
            />
            <circle
              cx={center}
              cy={center}
              r={r1}
              stroke="url(#gradRed)"
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={c1}
              strokeDashoffset={offset1}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />

            {/* Ring 2 - Background & Progress */}
            <circle
              cx={center}
              cy={center}
              r={r2}
              stroke="rgba(52, 199, 89, 0.18)"
              strokeWidth={strokeWidth}
              fill="none"
            />
            <circle
              cx={center}
              cy={center}
              r={r2}
              stroke="url(#gradGreen)"
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={c2}
              strokeDashoffset={offset2}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />

            {/* Ring 3 - Background & Progress */}
            <circle
              cx={center}
              cy={center}
              r={r3}
              stroke="rgba(10, 132, 255, 0.18)"
              strokeWidth={strokeWidth}
              fill="none"
            />
            <circle
              cx={center}
              cy={center}
              r={r3}
              stroke="url(#gradCyan)"
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={c3}
              strokeDashoffset={offset3}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          </svg>

          {/* Center Activity Indicator Icon */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-black text-white">
              {Math.round(((workoutProgress + mealProgress + habitProgress) / 3) * 100)}
              <span className="text-xs text-emerald-400 font-bold">%</span>
            </span>
            <span className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold">Tuntas</span>
          </div>
        </div>

        {/* Legend / Metrics summary */}
        <div className="flex-1 space-y-2.5">
          {/* Workout / Move */}
          <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-2.5 flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center flex-shrink-0">
              <Dumbbell className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">Workout</span>
                <span className="text-red-400 font-bold">{Math.round(workoutProgress * 100)}%</span>
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                {workoutSetsDone}/{workoutTotalSets} set latihan
              </div>
            </div>
          </div>

          {/* Meals */}
          <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-2.5 flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Utensils className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">Defisit Menu</span>
                <span className="text-emerald-400 font-bold">{Math.round(mealProgress * 100)}%</span>
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                {caloriesLogged} / {caloriesTarget} kkal
              </div>
            </div>
          </div>

          {/* Habits */}
          <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-2.5 flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
              <Footprints className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">Langkah & Air</span>
                <span className="text-cyan-400 font-bold">{Math.round(habitProgress * 100)}%</span>
              </div>
              <div className="text-[11px] text-slate-400 truncate flex items-center gap-1.5">
                <span>{stepsLogged.toLocaleString()} lkg</span>
                <span>•</span>
                <span className="flex items-center gap-0.5">
                  <Droplets className="w-3 h-3 text-cyan-400" />
                  {(waterMl / 1000).toFixed(1)}/{waterTargetL}L
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
