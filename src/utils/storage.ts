import { UserProfile, DailyLog, WeightRecord } from '../types';
import { INITIAL_PROFILE } from '../data/planData';

const PROFILE_KEY = 'fatloss_user_profile_v1';
const LOGS_KEY = 'fatloss_daily_logs_v1';
const WEIGHT_HISTORY_KEY = 'fatloss_weight_history_v1';
const SELECTED_DAY_KEY = 'fatloss_selected_day_v1';

export function getStoredProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load profile', e);
  }
  return INITIAL_PROFILE;
}

export function saveProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile', e);
  }
}

export function createEmptyDayLog(dayNumber: number): DailyLog {
  const todayStr = new Date().toISOString().split('T')[0];
  return {
    date: todayStr,
    dayNumber,
    waterMl: 0,
    steps: 0,
    sleepHours: 7.5,
    fatigueRating: 2,
    sorenessRating: 2,
    completedMeals: {
      breakfast: false,
      lunch: false,
      snack: false,
      dinner: false,
    },
    completedExercises: {},
    workoutCompleted: false,
    notes: '',
  };
}

export function getStoredLogs(): Record<number, DailyLog> {
  try {
    const raw = localStorage.getItem(LOGS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load logs', e);
  }

  // initialize default 7 days
  const defaultLogs: Record<number, DailyLog> = {};
  for (let i = 1; i <= 7; i++) {
    defaultLogs[i] = createEmptyDayLog(i);
  }
  return defaultLogs;
}

export function saveLogs(logs: Record<number, DailyLog>): void {
  try {
    localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
  } catch (e) {
    console.error('Failed to save logs', e);
  }
}

export function getStoredWeightHistory(): WeightRecord[] {
  try {
    const raw = localStorage.getItem(WEIGHT_HISTORY_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load weight history', e);
  }
  // Default starting record
  return [
    { date: 'Hari 1', weight: 70.0, waist: 78.0 }
  ];
}

export function saveWeightHistory(history: WeightRecord[]): void {
  try {
    localStorage.setItem(WEIGHT_HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.error('Failed to save weight history', e);
  }
}

export function getStoredSelectedDay(): number {
  try {
    const val = localStorage.getItem(SELECTED_DAY_KEY);
    if (val) {
      const num = parseInt(val, 10);
      if (num >= 1 && num <= 7) return num;
    }
  } catch {}
  return 1;
}

export function saveSelectedDay(day: number): void {
  try {
    localStorage.setItem(SELECTED_DAY_KEY, day.toString());
  } catch {}
}

export function resetAllData(): void {
  localStorage.removeItem(PROFILE_KEY);
  localStorage.removeItem(LOGS_KEY);
  localStorage.removeItem(WEIGHT_HISTORY_KEY);
  localStorage.removeItem(SELECTED_DAY_KEY);
}
