import React, { useState, useEffect } from 'react';
import { 
  UserProfile, 
  DailyLog, 
  WeightRecord 
} from './types';
import { 
  WORKOUT_PLANS, 
  MEAL_PLANS, 
  INITIAL_PROFILE 
} from './data/planData';
import { 
  getStoredProfile, 
  saveProfile, 
  getStoredLogs, 
  saveLogs, 
  getStoredWeightHistory, 
  saveWeightHistory, 
  getStoredSelectedDay, 
  saveSelectedDay, 
  resetAllData 
} from './utils/storage';
import { IOSHeader } from './components/iOSHeader';
import { ActivityRings } from './components/ActivityRings';
import { TabBar, TabType } from './components/TabBar';
import { WorkoutTab } from './components/WorkoutTab';
import { MealTab } from './components/MealTab';
import { HabitsTab } from './components/HabitsTab';
import { ProgressTab } from './components/ProgressTab';
import { ProfileModal } from './components/ProfileModal';
import { IOSInstallGuide } from './components/IOSInstallGuide';

export function App() {
  const [selectedDay, setSelectedDay] = useState<number>(() => getStoredSelectedDay());
  const [profile, setProfile] = useState<UserProfile>(() => getStoredProfile());
  const [logs, setLogs] = useState<Record<number, DailyLog>>(() => getStoredLogs());
  const [weightHistory, setWeightHistory] = useState<WeightRecord[]>(() => getStoredWeightHistory());
  const [activeTab, setActiveTab] = useState<TabType>('workout');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  useEffect(() => {
    saveLogs(logs);
  }, [logs]);

  useEffect(() => {
    saveWeightHistory(weightHistory);
  }, [weightHistory]);

  useEffect(() => {
    saveSelectedDay(selectedDay);
  }, [selectedDay]);

  const currentWorkout = WORKOUT_PLANS.find((w) => w.day === selectedDay) || WORKOUT_PLANS[0];
  const currentMealPlan = MEAL_PLANS.find((m) => m.day === selectedDay) || MEAL_PLANS[0];
  const currentLog = logs[selectedDay] || {
    date: new Date().toISOString().split('T')[0],
    dayNumber: selectedDay,
    waterMl: 0,
    steps: 0,
    sleepHours: 7.5,
    fatigueRating: 2,
    sorenessRating: 2,
    completedMeals: { breakfast: false, lunch: false, snack: false, dinner: false },
    completedExercises: {},
    workoutCompleted: false,
  };

  const handleUpdateCurrentLog = (newLog: DailyLog) => {
    setLogs((prev) => ({
      ...prev,
      [selectedDay]: newLog,
    }));
  };

  const handleAddWeightRecord = (record: WeightRecord) => {
    setWeightHistory((prev) => [...prev, record]);
  };

  const handleReset = () => {
    resetAllData();
    setProfile(INITIAL_PROFILE);
    const newLogs = getStoredLogs();
    setLogs(newLogs);
    setWeightHistory(getStoredWeightHistory());
    setSelectedDay(1);
  };

  // Ring calculations
  const totalSets = currentWorkout.exercises.reduce((acc, ex) => acc + ex.sets, 0);
  const doneSets = currentWorkout.exercises.reduce((acc, ex) => {
    const arr = currentLog.completedExercises[ex.id] || [];
    return acc + arr.filter(Boolean).length;
  }, 0);
  const workoutProgress = totalSets > 0 ? doneSets / totalSets : 0;

  const mealsCheckedCount = [
    currentLog.completedMeals.breakfast,
    currentLog.completedMeals.lunch,
    currentLog.completedMeals.snack,
    currentLog.completedMeals.dinner,
  ].filter(Boolean).length;
  const mealProgress = mealsCheckedCount / 4;

  const waterProgress = Math.min(currentLog.waterMl / (profile.targetWater * 1000), 1);
  const stepsProgress = Math.min(currentLog.steps / profile.targetSteps, 1);
  const habitProgress = (waterProgress + stepsProgress) / 2;

  // Count days with completed workouts
  const completedDaysCount = Object.values(logs).filter((l) => l.workoutCompleted).length;

  // Calorie calculations
  const mealsList = [
    { key: 'breakfast', item: currentMealPlan.breakfast },
    { key: 'lunch', item: currentMealPlan.lunch },
    { key: 'snack', item: currentMealPlan.snack },
    { key: 'dinner', item: currentMealPlan.dinner },
  ] as const;

  const caloriesLogged = mealsList.reduce((acc, m) => {
    if (currentLog.completedMeals[m.key]) {
      return acc + m.item.calories;
    }
    return acc;
  }, 0);

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans antialiased">
      {/* iOS Header */}
      <IOSHeader
        selectedDay={selectedDay}
        onSelectDay={(d) => setSelectedDay(d)}
        onOpenProfile={() => setIsProfileOpen(true)}
        completedDaysCount={completedDaysCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-md mx-auto w-full px-4 pt-4 space-y-4">
        {/* Activity Rings Overview (Always visible on dashboard) */}
        <ActivityRings
          workoutProgress={workoutProgress}
          mealProgress={mealProgress}
          habitProgress={habitProgress}
          workoutSetsDone={doneSets}
          workoutTotalSets={totalSets}
          caloriesLogged={caloriesLogged}
          caloriesTarget={profile.targetCalories}
          stepsLogged={currentLog.steps}
          stepsTarget={profile.targetSteps}
          waterMl={currentLog.waterMl}
          waterTargetL={profile.targetWater}
        />

        {/* Tab Views */}
        {activeTab === 'workout' && (
          <WorkoutTab
            workout={currentWorkout}
            dailyLog={currentLog}
            onUpdateDailyLog={handleUpdateCurrentLog}
          />
        )}

        {activeTab === 'meals' && (
          <MealTab
            mealPlan={currentMealPlan}
            dailyLog={currentLog}
            profile={profile}
            onUpdateDailyLog={handleUpdateCurrentLog}
          />
        )}

        {activeTab === 'habits' && (
          <HabitsTab
            dailyLog={currentLog}
            profile={profile}
            onUpdateDailyLog={handleUpdateCurrentLog}
            onRecordWeight={(w, wst) => handleAddWeightRecord({ date: `Hari ${selectedDay}`, weight: w, waist: wst })}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressTab
            profile={profile}
            weightHistory={weightHistory}
            onAddWeightRecord={handleAddWeightRecord}
          />
        )}
      </main>

      {/* iOS Install Prompt Banner & Guide */}
      <IOSInstallGuide />

      {/* Profile Settings Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        onUpdateProfile={(p) => setProfile(p)}
        onResetAllData={handleReset}
      />

      {/* Frosted Glass Bottom Navigation */}
      <TabBar
        activeTab={activeTab}
        onChangeTab={(t) => setActiveTab(t)}
        workoutBadge={!currentLog.workoutCompleted}
      />
    </div>
  );
}

export default App;
