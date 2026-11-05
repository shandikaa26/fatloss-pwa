export interface UserProfile {
  name: string;
  gender: 'Pria' | 'Wanita';
  age: number;
  height: number; // cm
  weight: number; // kg
  waist?: number; // cm
  bmi: number;
  bmr: number;
  maintenanceCalories: number;
  targetCalories: number;
  targetProtein: number; // g
  targetCarbs: number; // g
  targetFat: number; // g
  targetFiber: number; // g
  targetWater: number; // L
  targetSteps: number;
  targetSleep: number; // hours
  activityLevel: string;
  equipment: string;
}

export interface MealItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  description?: string;
  cookingTip?: string;
}

export interface DayMealPlan {
  day: number;
  title: string;
  breakfast: MealItem;
  lunch: MealItem;
  snack: MealItem;
  dinner: MealItem;
}

export interface Exercise {
  id: string;
  name: string;
  category: 'Full Body' | 'Cardio' | 'Lower' | 'Upper' | 'Core' | 'Recovery';
  sets: number;
  repsTarget: string; // e.g. "6-12" or "20-45s"
  isTimed?: boolean;
  durationSeconds?: number;
  restSeconds: number;
  notes: string;
  alternatives?: string;
}

export interface DayWorkout {
  day: number;
  title: string;
  focus: string;
  type: 'workout' | 'cardio' | 'recovery' | 'rest';
  warmupMinutes: number;
  estimatedMinutes: number;
  description: string;
  exercises: Exercise[];
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  dayNumber: number; // 1-7
  weight?: number;
  waist?: number;
  waterMl: number;
  steps: number;
  sleepHours: number;
  fatigueRating: 1 | 2 | 3 | 4 | 5; // 1=Fresh, 5=Exhausted
  sorenessRating: 1 | 2 | 3 | 4 | 5;
  completedMeals: {
    breakfast: boolean;
    lunch: boolean;
    snack: boolean;
    dinner: boolean;
  };
  completedExercises: {
    [exerciseId: string]: boolean[]; // array of set completion booleans
  };
  workoutCompleted: boolean;
  notes?: string;
}

export interface WeightRecord {
  date: string;
  weight: number;
  waist?: number;
}
