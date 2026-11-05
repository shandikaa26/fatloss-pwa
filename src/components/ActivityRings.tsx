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
  waterMl,
  waterTargetL,
}) => {
  // Proportional SVG Ring calculations (optimized for iPhone screen width)
  const size = 138;
  const strokeWidth = 10;
  const center = size / 2;

  // Ring 1 (Outer - Workout: Coral/Red)
  const r1 = 58;
  const c1 = 2 * Math.PI * r1;
  const clampedProg1 = Math.max(0, Math.min(workoutProgress, 1));
  const offset1 = c1 - clampedProg1 * c1;

  // Ring 2 (Middle - Meal/Calories: Neon Green)
  const r2 = 45;
  const c2 = 2 * Math.PI * r2;
  const clampedProg2 = Math.max(0, Math.min(mealProgress, 1));
  const offset2 = c2 - clampedProg2 * c2;

  // Ring 3 (Inner - Habits/Steps: Cyan)
  const r3 = 32;
  const c3 = 2 * Math.PI * r3;
  const clampedProg3 = Math.max(0, Math.min(habitProgress, 1));
  const offset3 = c3 - clampedProg3 * c3;

  const totalAvgPercent = Math.round(((clampedProg1 + clampedProg2 + clampedProg3) / 3) * 100);

  return (
    <div className="glass-panel rounded-3xl p-4 sm:p-5 relative overflow-hidden border border-white/10 shadow-xl">
      {/* Background ambient glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Card Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
            Aktivitas Harian
          </span>
          <h2 className="text-base font-bold text-white tracking-tight">Apple Health Rings</h2>
        </div>
        <div className="text-right">
          <span className="text-[11px] text-slate-400">Target Hari Ini</span>
          <div className="text-xs font-bold text-slate-200">
            {totalAvgPercent}%
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3.5">
        {/* The 3 Concentric Rings */}
        <div className="relative flex-shrink-0 flex items-center justify-center">
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

            {/* Ring 1 - Workout (Red) */}
            <circle
              cx={center}
              cy={center}
              r={r1}
              stroke="rgba(255, 59, 48, 0.16)"
              strokeWidth={strokeWidth}
              fill="none"
            />
            {clampedProg1 > 0 && (
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
            )}

            {/* Ring 2 - Nutrition (Green) */}
            <circle
              cx={center}
              cy={center}
              r={r2}
              stroke="rgba(52, 199, 89, 0.16)"
              strokeWidth={strokeWidth}
              fill="none"
            />
            {clampedProg2 > 0 && (
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
            )}

            {/* Ring 3 - Habits (Cyan) */}
            <circle
              cx={center}
              cy={center}
              r={r3}
              stroke="rgba(10, 132, 255, 0.16)"
              strokeWidth={strokeWidth}
              fill="none"
            />
            {clampedProg3 > 0 && (
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
            )}
          </svg>

          {/* Center Activity Indicator */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-base font-black text-white leading-tight">
              {totalAvgPercent}
              <span className="text-[10px] text-emerald-400 font-bold">%</span>
            </span>
            <span className="text-[8px] text-slate-400 uppercase tracking-widest font-semibold mt-0.5">
              Tuntas
            </span>
          </div>
        </div>

        {/* Legend / Metrics List (No wrap or overlap) */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Workout / Move */}
          <div className="bg-slate-900/60 border border-white/5 rounded-xl px-2.5 py-1.5 flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center flex-shrink-0">
              <Dumbbell className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-200">Workout</span>
                <span className="text-[11px] text-red-400 font-bold flex-shrink-0 ml-1">
                  {Math.round(clampedProg1 * 100)}%
                </span>
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {workoutSetsDone}/{workoutTotalSets} set latihan
              </div>
            </div>
          </div>

          {/* Nutrisi */}
          <div className="bg-slate-900/60 border border-white/5 rounded-xl px-2.5 py-1.5 flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Utensils className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-200">Nutrisi</span>
                <span className="text-[11px] text-emerald-400 font-bold flex-shrink-0 ml-1">
                  {Math.round(clampedProg2 * 100)}%
                </span>
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {caloriesLogged} / {caloriesTarget} kkal
              </div>
            </div>
          </div>

          {/* Aktivitas (Langkah & Air) */}
          <div className="bg-slate-900/60 border border-white/5 rounded-xl px-2.5 py-1.5 flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
              <Footprints className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-200">Aktivitas</span>
                <span className="text-[11px] text-cyan-400 font-bold flex-shrink-0 ml-1">
                  {Math.round(clampedProg3 * 100)}%
                </span>
              </div>
              <div className="text-[10px] text-slate-400 truncate flex items-center gap-1">
                <span>{stepsLogged.toLocaleString()} lkg</span>
                <span>•</span>
                <span className="flex items-center gap-0.5">
                  <Droplets className="w-2.5 h-2.5 text-cyan-400" />
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
