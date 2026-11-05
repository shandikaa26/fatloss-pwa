import React, { useState } from 'react';
import { DayMealPlan, DailyLog, MealItem, UserProfile } from '../types';
import { 
  Utensils, 
  Check, 
  Flame, 
  ChefHat, 
  Lightbulb, 
  Sparkles, 
  Info, 
  PieChart, 
  Wheat, 
  Fish, 
  Salad 
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface Props {
  mealPlan: DayMealPlan;
  dailyLog: DailyLog;
  profile: UserProfile;
  onUpdateDailyLog: (log: DailyLog) => void;
}

export const MealTab: React.FC<Props> = ({
  mealPlan,
  dailyLog,
  profile,
  onUpdateDailyLog,
}) => {
  const [selectedMealForDetail, setSelectedMealForDetail] = useState<MealItem | null>(null);

  const toggleMealCheck = (mealType: 'breakfast' | 'lunch' | 'snack' | 'dinner') => {
    sounds.playClick();
    const newStatus = !dailyLog.completedMeals[mealType];
    const updated: DailyLog = {
      ...dailyLog,
      completedMeals: {
        ...dailyLog.completedMeals,
        [mealType]: newStatus,
      },
    };
    onUpdateDailyLog(updated);
  };

  const mealsList: { key: 'breakfast' | 'lunch' | 'snack' | 'dinner'; title: string; time: string; item: MealItem }[] = [
    { key: 'breakfast', title: 'Sarapan Sehat', time: '07:00 - 09:00', item: mealPlan.breakfast },
    { key: 'lunch', title: 'Makan Siang', time: '12:00 - 13:30', item: mealPlan.lunch },
    { key: 'snack', title: 'Camilan Pemulihan', time: '16:00 - 17:00', item: mealPlan.snack },
    { key: 'dinner', title: 'Makan Malam Ringan', time: '19:00 - 20:30', item: mealPlan.dinner },
  ];

  // Calculate consumed calories & macros based on checked meals
  const consumed = mealsList.reduce(
    (acc, m) => {
      if (dailyLog.completedMeals[m.key]) {
        acc.calories += m.item.calories;
        acc.protein += m.item.protein;
        acc.carbs += m.item.carbs;
        acc.fat += m.item.fat;
        acc.fiber += m.item.fiber;
      }
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );

  const totalDayCalories = mealsList.reduce((acc, m) => acc + m.item.calories, 0);

  return (
    <div className="space-y-4 pb-20">
      {/* Target & Macro Overview Card */}
      <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
              Nutrisi Harian Indonesia
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">Defisit Kalori Terencana</h2>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400">Target Defisit</span>
            <div className="text-base font-black text-emerald-400">
              ~{profile.targetCalories} <span className="text-xs font-normal text-slate-300">kkal/hari</span>
            </div>
          </div>
        </div>

        {/* Calorie bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-medium">
              Tercatat Dimakan: <strong className="text-white">{consumed.calories}</strong> kkal
            </span>
            <span className="text-slate-400">
              Rencana Menu: {totalDayCalories} kkal
            </span>
          </div>
          <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((consumed.calories / profile.targetCalories) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* 4 Macro Targets Chips */}
        <div className="grid grid-cols-4 gap-2 pt-1 text-center">
          {/* Protein */}
          <div className="bg-slate-900/70 border border-white/5 rounded-2xl p-2.5">
            <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">Protein</span>
            <div className="text-sm font-black text-white mt-0.5">{consumed.protein}g</div>
            <span className="text-[9px] text-slate-400">tgt 130–150g</span>
          </div>

          {/* Carbs */}
          <div className="bg-slate-900/70 border border-white/5 rounded-2xl p-2.5">
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Karbo</span>
            <div className="text-sm font-black text-white mt-0.5">{consumed.carbs}g</div>
            <span className="text-[9px] text-slate-400">tgt 240–270g</span>
          </div>

          {/* Fat */}
          <div className="bg-slate-900/70 border border-white/5 rounded-2xl p-2.5">
            <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider">Lemak</span>
            <div className="text-sm font-black text-white mt-0.5">{consumed.fat}g</div>
            <span className="text-[9px] text-slate-400">tgt 60–75g</span>
          </div>

          {/* Fiber */}
          <div className="bg-slate-900/70 border border-white/5 rounded-2xl p-2.5">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Serat</span>
            <div className="text-sm font-black text-white mt-0.5">{consumed.fiber}g</div>
            <span className="text-[9px] text-slate-400">tgt 25–35g</span>
          </div>
        </div>
      </div>

      {/* Indonesian Dietary Principles Notice */}
      <div className="glass-panel rounded-2xl p-3.5 border border-emerald-500/20 bg-emerald-950/20 flex items-start space-x-3">
        <ChefHat className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed text-slate-300">
          <strong className="text-white">Panduan Memasak Lokal:</strong> Utamakan teknik rebus, kukus, panggang teflon, atau tumis minim minyak (1 sdt). Tetap sertakan nasi atau kentang; jangan pantang total karbohidrat!
        </div>
      </div>

      {/* 4 Meals Card List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Menu {mealPlan.title}
          </h3>
          <span className="text-[11px] text-slate-400">Centang saat selesai makan</span>
        </div>

        {mealsList.map((m) => {
          const isDone = dailyLog.completedMeals[m.key];
          return (
            <div
              key={m.key}
              className={`glass-panel rounded-2xl p-4 transition-all duration-200 border ${
                isDone ? 'border-emerald-500/30 bg-emerald-950/15' : 'border-white/5'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <button
                  onClick={() => toggleMealCheck(m.key)}
                  className={`w-6 h-6 mt-0.5 rounded-lg flex items-center justify-center transition-all flex-shrink-0 active:scale-90 ${
                    isDone
                      ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/30'
                      : 'border border-slate-600 bg-slate-800/80 hover:border-emerald-400'
                  }`}
                  aria-label="Tandai selesai makan"
                >
                  {isDone && <Check className="w-4 h-4 stroke-[3]" />}
                </button>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      {m.title} • {m.time}
                    </span>
                    <span className="text-xs font-bold text-amber-400">~{m.item.calories} kkal</span>
                  </div>

                  <h4 className={`text-base font-bold leading-snug ${isDone ? 'text-slate-300 line-through opacity-80' : 'text-white'}`}>
                    {m.item.name}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed pt-0.5">
                    {m.item.description}
                  </p>

                  {/* Micro tips */}
                  {m.item.cookingTip && (
                    <div className="pt-2 flex items-center space-x-1.5 text-[11px] text-emerald-400/90 font-medium">
                      <Lightbulb className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{m.item.cookingTip}</span>
                    </div>
                  )}

                  {/* Macro chips */}
                  <div className="flex items-center space-x-2 pt-2 text-[10px] text-slate-300">
                    <span className="px-2 py-0.5 bg-slate-800 rounded-md font-semibold text-red-300">
                      P: {m.item.protein}g
                    </span>
                    <span className="px-2 py-0.5 bg-slate-800 rounded-md font-semibold text-amber-300">
                      C: {m.item.carbs}g
                    </span>
                    <span className="px-2 py-0.5 bg-slate-800 rounded-md font-semibold text-sky-300">
                      F: {m.item.fat}g
                    </span>
                    <span className="px-2 py-0.5 bg-slate-800 rounded-md font-semibold text-emerald-300">
                      Fiber: {m.item.fiber}g
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
