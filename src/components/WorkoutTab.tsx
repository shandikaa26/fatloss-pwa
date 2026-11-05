import React, { useState, useEffect } from 'react';
import { DayWorkout, DailyLog } from '../types';
import { 
  Play, 
  Check, 
  RotateCcw, 
  Clock, 
  Info, 
  Flame, 
  Sparkles, 
  ChevronRight, 
  Plus, 
  Minus, 
  Volume2, 
  X,
  Award
} from 'lucide-react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

interface Props {
  workout: DayWorkout;
  dailyLog: DailyLog;
  onUpdateDailyLog: (log: DailyLog) => void;
}

export const WorkoutTab: React.FC<Props> = ({
  workout,
  dailyLog,
  onUpdateDailyLog,
}) => {
  // Rest Timer State
  const [restSecondsLeft, setRestSecondsLeft] = useState<number>(0);
  const [restTotalSeconds, setRestTotalSeconds] = useState<number>(60);
  const [isRestActive, setIsRestActive] = useState<boolean>(false);
  const [activeExerciseName, setActiveExerciseName] = useState<string>('');

  // Active Stopwatch for Timed Exercises (e.g., Plank)
  const [stopwatchTime, setStopwatchTime] = useState<number>(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState<boolean>(false);
  const [activeTimedExerciseId, setActiveTimedExerciseId] = useState<string | null>(null);

  // Warmup Modal
  const [showWarmup, setShowWarmup] = useState<boolean>(false);
  const [warmupTimer, setWarmupTimer] = useState<number>(360); // 6 mins
  const [isWarmupRunning, setIsWarmupRunning] = useState<boolean>(false);

  // Rest Timer interval
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRestActive && restSecondsLeft > 0) {
      interval = setInterval(() => {
        setRestSecondsLeft((prev) => {
          if (prev <= 4 && prev > 1) {
            sounds.playTick();
          }
          if (prev <= 1) {
            sounds.playRestComplete();
            setIsRestActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (restSecondsLeft === 0) {
      setIsRestActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRestActive, restSecondsLeft]);

  // Stopwatch interval
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isStopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStopwatchRunning]);

  // Warmup timer interval
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isWarmupRunning && warmupTimer > 0) {
      interval = setInterval(() => {
        setWarmupTimer((prev) => {
          if (prev <= 1) {
            sounds.playRestComplete();
            setIsWarmupRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isWarmupRunning, warmupTimer]);

  const toggleSetCompletion = (exerciseId: string, setIndex: number, restSecs: number, exName: string) => {
    sounds.playClick();
    const currentSets = dailyLog.completedExercises[exerciseId] || [];
    const exercise = workout.exercises.find((e) => e.id === exerciseId);
    const totalSets = exercise?.sets || 3;

    const newSets = Array.from({ length: totalSets }, (_, idx) => {
      if (idx === setIndex) {
        return !currentSets[idx];
      }
      return !!currentSets[idx];
    });

    const isNowDone = newSets[setIndex];

    const updatedLog: DailyLog = {
      ...dailyLog,
      completedExercises: {
        ...dailyLog.completedExercises,
        [exerciseId]: newSets,
      },
    };

    // Check if entire workout is complete
    let totalCompleted = 0;
    let grandTotal = 0;
    workout.exercises.forEach((ex) => {
      grandTotal += ex.sets;
      const doneArr = (ex.id === exerciseId ? newSets : (dailyLog.completedExercises[ex.id] || []));
      totalCompleted += doneArr.filter(Boolean).length;
    });

    const isAllDone = totalCompleted === grandTotal && grandTotal > 0;
    updatedLog.workoutCompleted = isAllDone;

    onUpdateDailyLog(updatedLog);

    // If marked done, trigger rest timer and haptic
    if (isNowDone && restSecs > 0) {
      setActiveExerciseName(exName);
      setRestTotalSeconds(restSecs);
      setRestSecondsLeft(restSecs);
      setIsRestActive(true);
    }

    if (isAllDone && !dailyLog.workoutCompleted) {
      sounds.playFanfare();
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  // Format MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const completedSetsCount = workout.exercises.reduce((acc, ex) => {
    const done = (dailyLog.completedExercises[ex.id] || []).filter(Boolean).length;
    return acc + done;
  }, 0);

  const totalPossibleSets = workout.exercises.reduce((acc, ex) => acc + ex.sets, 0);
  const progressPercent = totalPossibleSets > 0 ? Math.round((completedSetsCount / totalPossibleSets) * 100) : 0;

  return (
    <div className="space-y-4 pb-20">
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-5 border border-white/10 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-semibold">
              <Flame className="w-3.5 h-3.5" />
              <span>{workout.title}</span>
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">{workout.focus}</h2>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              {workout.description}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3 text-slate-300">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              ~{workout.estimatedMinutes} menit
            </span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">Bodyweight No Equipment</span>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setShowWarmup(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-800 border border-white/10 text-slate-200 text-xs font-semibold flex items-center space-x-1 hover:bg-slate-700 active:scale-95 transition-transform"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Pemanasan {workout.warmupMinutes}m</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex justify-between text-[11px] font-medium text-slate-400 mb-1">
            <span>Progress Sesi</span>
            <span className="text-red-400 font-bold">{progressPercent}% ({completedSetsCount}/{totalPossibleSets} set)</span>
          </div>
          <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-500 to-amber-500 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Floating Active Rest Timer Card */}
      {isRestActive && (
        <div className="glass-panel sticky top-36 z-30 rounded-2xl p-4 border border-red-500/40 bg-[#161226]/95 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="#ff3b30"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={125.6}
                    strokeDashoffset={125.6 - (restSecondsLeft / restTotalSeconds) * 125.6}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-linear"
                  />
                </svg>
                <span className="absolute text-sm font-black text-white">{restSecondsLeft}s</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">
                  Istirahat Pemulihan Otot
                </span>
                <h4 className="text-sm font-bold text-white truncate max-w-[170px]">
                  {activeExerciseName || 'Set Berikutnya'}
                </h4>
              </div>
            </div>

            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => {
                  sounds.playClick();
                  setRestSecondsLeft((prev) => prev + 15);
                }}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg font-medium text-slate-300 active:scale-95"
              >
                +15s
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  setIsRestActive(false);
                  setRestSecondsLeft(0);
                }}
                className="px-2.5 py-1 bg-red-600/80 hover:bg-red-600 text-xs rounded-lg font-bold text-white active:scale-95"
              >
                Lewati
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exercises List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Daftar Gerakan ({workout.exercises.length})
          </h3>
          <span className="text-[11px] text-slate-400">RIR: 1–3 reps cadangan</span>
        </div>

        {workout.exercises.map((ex, exIdx) => {
          const completedSetArr = dailyLog.completedExercises[ex.id] || [];
          const isAllSetsDone = completedSetArr.length === ex.sets && completedSetArr.every(Boolean);

          return (
            <div
              key={ex.id}
              className={`glass-panel rounded-2xl p-4 transition-all duration-200 border ${
                isAllSetsDone ? 'border-emerald-500/30 bg-emerald-950/10' : 'border-white/5'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-bold text-slate-300 flex items-center justify-center">
                      {exIdx + 1}
                    </span>
                    <h4 className="text-base font-bold text-white">{ex.name}</h4>
                    {isAllSetsDone && (
                      <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 text-[10px] rounded-md font-semibold flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> Beres
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-amber-400/90 font-medium pl-7">
                    Target: {ex.sets} Set × {ex.repsTarget} • Rest {ex.restSeconds}s
                  </p>
                </div>

                {/* Timed exercise stopwatch button */}
                {ex.isTimed && (
                  <button
                    onClick={() => {
                      sounds.playClick();
                      if (activeTimedExerciseId === ex.id) {
                        setIsStopwatchRunning(!isStopwatchRunning);
                      } else {
                        setActiveTimedExerciseId(ex.id);
                        setStopwatchTime(0);
                        setIsStopwatchRunning(true);
                      }
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center space-x-1 transition-colors ${
                      activeTimedExerciseId === ex.id && isStopwatchRunning
                        ? 'bg-amber-500 text-slate-950 animate-pulse'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>
                      {activeTimedExerciseId === ex.id ? formatTime(stopwatchTime) : 'Stopwatch'}
                    </span>
                  </button>
                )}
              </div>

              {/* Form Guide / Safety note */}
              <div className="mt-2 text-xs text-slate-400 bg-slate-900/40 rounded-xl p-2.5 border border-white/5 flex items-start space-x-2">
                <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{ex.notes}</span>
              </div>

              {/* Set Checkboxes */}
              <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2">
                {Array.from({ length: ex.sets }).map((_, sIdx) => {
                  const isChecked = !!completedSetArr[sIdx];
                  return (
                    <button
                      key={sIdx}
                      onClick={() => toggleSetCompletion(ex.id, sIdx, ex.restSeconds, `${ex.name} (Set ${sIdx + 1})`)}
                      className={`py-2 px-3 rounded-xl border flex items-center justify-between transition-all duration-150 active:scale-95 ${
                        isChecked
                          ? 'bg-gradient-to-br from-emerald-500/25 to-teal-500/20 border-emerald-500/50 text-white shadow-sm shadow-emerald-500/20'
                          : 'bg-slate-900/60 border-white/5 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <span className="text-xs font-semibold">Set {sIdx + 1}</span>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                          isChecked ? 'bg-emerald-500 text-slate-950 font-bold' : 'border border-slate-600 bg-slate-800/80'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Trophy Card */}
      {dailyLog.workoutCompleted && (
        <div className="glass-panel rounded-3xl p-5 border border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 to-teal-950/30 text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Award className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-black text-white">Sesi Hari Ini Selesai! 🎉</h3>
          <p className="text-xs text-slate-300 max-w-sm mx-auto">
            Kerja bagus! Otot telah distimulasi secara optimal untuk membakar lemak & mempertahankan massa otot. Jangan lupa catat hidrasi dan nutrisi berikutnya.
          </p>
        </div>
      )}

      {/* Warmup Modal */}
      {showWarmup && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-sm rounded-3xl p-5 border border-white/10 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Pemanasan 5–8 Menit</h3>
              </div>
              <button
                onClick={() => setShowWarmup(false)}
                className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center py-2">
              <span className="text-4xl font-black text-amber-400 font-mono tracking-tight">
                {formatTime(warmupTimer)}
              </span>
              <p className="text-xs text-slate-400 mt-1">Timer Pemanasan Aktif</p>
            </div>

            <div className="space-y-2 text-xs text-slate-300 bg-slate-900/60 p-3 rounded-2xl border border-white/5">
              <p className="font-semibold text-slate-200">Lakukan berurutan @ 1 menit:</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                <li>Jalan di tempat (March in place)</li>
                <li>Putaran lengan lebar ke depan & belakang</li>
                <li>Hip hinges (buka panggul dan hamstring)</li>
                <li>Easy shallow squats perlahan</li>
                <li>Rotasi pinggang & pergelangan kaki</li>
              </ul>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => {
                  sounds.playClick();
                  setIsWarmupRunning(!isWarmupRunning);
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 active:scale-95"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isWarmupRunning ? 'Jeda Pemanasan' : 'Mulai Pemanasan'}</span>
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  setWarmupTimer(360);
                  setIsWarmupRunning(false);
                }}
                className="px-3 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
