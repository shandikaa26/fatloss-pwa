import React from 'react';
import { DailyLog, UserProfile } from '../types';
import { 
  Droplets, 
  Footprints, 
  Moon, 
  Plus, 
  Minus, 
  AlertTriangle, 
  Heart, 
  Sparkles, 
  ShieldAlert, 
  Scale, 
  Ruler 
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface Props {
  dailyLog: DailyLog;
  profile: UserProfile;
  onUpdateDailyLog: (log: DailyLog) => void;
  onRecordWeight: (weight: number, waist?: number) => void;
}

export const HabitsTab: React.FC<Props> = ({
  dailyLog,
  profile,
  onUpdateDailyLog,
  onRecordWeight,
}) => {
  const addWater = (amountMl: number) => {
    sounds.playClick();
    const newAmount = Math.max(0, dailyLog.waterMl + amountMl);
    onUpdateDailyLog({
      ...dailyLog,
      waterMl: newAmount,
    });
  };

  const updateSteps = (delta: number) => {
    sounds.playClick();
    const newSteps = Math.max(0, dailyLog.steps + delta);
    onUpdateDailyLog({
      ...dailyLog,
      steps: newSteps,
    });
  };

  const updateSleep = (hours: number) => {
    sounds.playClick();
    onUpdateDailyLog({
      ...dailyLog,
      sleepHours: hours,
    });
  };

  const updateFatigue = (rating: 1 | 2 | 3 | 4 | 5) => {
    sounds.playClick();
    onUpdateDailyLog({
      ...dailyLog,
      fatigueRating: rating,
    });
  };

  const updateSoreness = (rating: 1 | 2 | 3 | 4 | 5) => {
    sounds.playClick();
    onUpdateDailyLog({
      ...dailyLog,
      sorenessRating: rating,
    });
  };

  const waterTargetMl = profile.targetWater * 1000;
  const waterProgress = Math.min((dailyLog.waterMl / waterTargetMl) * 100, 100);
  const stepsProgress = Math.min((dailyLog.steps / profile.targetSteps) * 100, 100);

  return (
    <div className="space-y-4 pb-20">
      {/* Header Info */}
      <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-1">
        <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
          Kebiasaan & Recovery
        </span>
        <h2 className="text-xl font-bold text-white tracking-tight">Kunci Konsistensi Fat Loss</h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Defisit kalori hanya bekerja optimal jika tidur, hidrasi, dan tingkat stres tubuh terkontrol baik.
        </p>
      </div>

      {/* Water Tracker Card */}
      <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Hidrasi Harian</h3>
              <p className="text-xs text-slate-400">Target 2.0 – 3.0 L/hari</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-black text-cyan-400">
              {(dailyLog.waterMl / 1000).toFixed(2)}
            </span>
            <span className="text-xs text-slate-400"> / {profile.targetWater} L</span>
          </div>
        </div>

        {/* Visual Water Fill */}
        <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${waterProgress}%` }}
          />
        </div>

        {/* Quick Add Buttons */}
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => addWater(250)}
            className="py-2.5 rounded-xl bg-slate-800 border border-white/5 text-xs font-semibold text-cyan-300 hover:bg-slate-700 active:scale-95 transition-transform flex flex-col items-center"
          >
            <span>+250 ml</span>
            <span className="text-[10px] text-slate-400">1 Gelas</span>
          </button>
          <button
            onClick={() => addWater(500)}
            className="py-2.5 rounded-xl bg-slate-800 border border-white/5 text-xs font-semibold text-cyan-300 hover:bg-slate-700 active:scale-95 transition-transform flex flex-col items-center"
          >
            <span>+500 ml</span>
            <span className="text-[10px] text-slate-400">1 Botol</span>
          </button>
          <button
            onClick={() => addWater(750)}
            className="py-2.5 rounded-xl bg-slate-800 border border-white/5 text-xs font-semibold text-cyan-300 hover:bg-slate-700 active:scale-95 transition-transform flex flex-col items-center"
          >
            <span>+750 ml</span>
            <span className="text-[10px] text-slate-400">Tumbler</span>
          </button>
          <button
            onClick={() => addWater(-250)}
            className="py-2.5 rounded-xl bg-slate-800 border border-white/5 text-xs font-semibold text-rose-300 hover:bg-slate-700 active:scale-95 transition-transform flex flex-col items-center"
          >
            <span>-250 ml</span>
            <span className="text-[10px] text-slate-400">Koreksi</span>
          </button>
        </div>
      </div>

      {/* Steps Tracker Card */}
      <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Footprints className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Langkah Kaki (NEAT)</h3>
              <p className="text-xs text-slate-400">Aktivitas non-olahraga harian</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-black text-emerald-400">
              {dailyLog.steps.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400"> / {profile.targetSteps.toLocaleString()}</span>
          </div>
        </div>

        {/* Steps Progress */}
        <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
            style={{ width: `${stepsProgress}%` }}
          />
        </div>

        {/* Steps Quick Control */}
        <div className="flex items-center justify-between space-x-2">
          <button
            onClick={() => updateSteps(-1000)}
            className="px-3 py-2 rounded-xl bg-slate-800 border border-white/5 text-xs text-slate-300 active:scale-95 hover:bg-slate-700"
          >
            -1,000
          </button>
          <div className="flex space-x-2">
            <button
              onClick={() => updateSteps(1000)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold active:scale-95 hover:bg-emerald-600/40"
            >
              +1,000
            </button>
            <button
              onClick={() => updateSteps(3000)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600/40 border border-emerald-500/50 text-emerald-200 text-xs font-bold active:scale-95 hover:bg-emerald-600/50"
            >
              +3,000
            </button>
            <button
              onClick={() => updateSteps(5000)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-xs font-black active:scale-95"
            >
              +5,000
            </button>
          </div>
        </div>
      </div>

      {/* Sleep Tracker Card */}
      <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Durasi Tidur Malam</h3>
              <p className="text-xs text-slate-400">Target 7 – 9 Jam berkualitas</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-black text-indigo-400">
              {dailyLog.sleepHours} Jam
            </span>
          </div>
        </div>

        {/* Sleep Hours Selector */}
        <div className="flex justify-between items-center bg-slate-900/60 p-1.5 rounded-2xl border border-white/5">
          {[5, 6, 7, 7.5, 8, 8.5, 9, 10].map((h) => {
            const isSelected = dailyLog.sleepHours === h;
            return (
              <button
                key={h}
                onClick={() => updateSleep(h)}
                className={`py-1.5 px-2.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {h}h
              </button>
            );
          })}
        </div>
      </div>

      {/* Daily Readiness & Fatigue Check-In (Safety Note Integration) */}
      <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-4">
        <div className="flex items-center space-x-2">
          <Heart className="w-5 h-5 text-rose-400" />
          <h3 className="text-base font-bold text-white">Evaluasi Kelelahan & Nyeri Otot</h3>
        </div>
        <p className="text-xs text-slate-300">
          Dari catatan keamanan: Jika merasa pusing, sangat lelah, atau performa anjlok, kurangi beban latihan dan tingkatkan istirahat.
        </p>

        {/* Fatigue scale */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-medium">Tingkat Kelelahan Fisik</span>
            <span className="text-amber-400 font-semibold">
              {dailyLog.fatigueRating === 1 && 'Sangat Segar'}
              {dailyLog.fatigueRating === 2 && 'Bugar Ringan'}
              {dailyLog.fatigueRating === 3 && 'Lelah Sedang'}
              {dailyLog.fatigueRating === 4 && 'Cukup Berat'}
              {dailyLog.fatigueRating === 5 && 'Sangat Lelah (Perlu Istirahat!)'}
            </span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((lvl) => (
              <button
                key={lvl}
                onClick={() => updateFatigue(lvl as 1 | 2 | 3 | 4 | 5)}
                className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                  dailyLog.fatigueRating === lvl
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                    : 'bg-slate-900 border-white/5 text-slate-400 hover:text-slate-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Soreness scale */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-medium">Pegal / DOMS Otot</span>
            <span className="text-cyan-400 font-semibold">
              {dailyLog.sorenessRating === 1 && 'Tidak Pegal'}
              {dailyLog.sorenessRating === 2 && 'Pegal Ringan Nyaman'}
              {dailyLog.sorenessRating === 3 && 'Pegal Terasa'}
              {dailyLog.sorenessRating === 4 && 'Cukup Kaku'}
              {dailyLog.sorenessRating === 5 && 'Sakit / Perlu Recovery'}
            </span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((lvl) => (
              <button
                key={lvl}
                onClick={() => updateSoreness(lvl as 1 | 2 | 3 | 4 | 5)}
                className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                  dailyLog.sorenessRating === lvl
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                    : 'bg-slate-900 border-white/5 text-slate-400 hover:text-slate-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Safety alert if fatigue or soreness is high */}
        {(dailyLog.fatigueRating >= 4 || dailyLog.sorenessRating >= 4) && (
          <div className="bg-rose-950/30 border border-rose-500/30 rounded-2xl p-3 flex items-start space-x-2.5 text-xs text-rose-200 mt-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-rose-100">Saran Pemulihan:</strong> Tubuhmu memberikan sinyal kelelahan. Utamakan peregangan santai, minum cukup air, tidur lebih awal, dan kurangi intensitas set workout hari ini.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
