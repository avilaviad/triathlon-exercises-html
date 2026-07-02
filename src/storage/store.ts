import type { AppState, WeeklyPlan, WeeklyPlanDay } from '../types';

export const STORAGE_KEY = 'triathlon-library:v1';

const emptyPlanDay: WeeklyPlanDay = {
  dayType: 'rest',
  focus: '',
  availableMinutes: 0,
  injuryFocus: '',
  preferredCategories: [],
  exerciseIds: []
};

export function createDefaultWeeklyPlan(): WeeklyPlan {
  return {
    monday: { ...emptyPlanDay },
    tuesday: { ...emptyPlanDay },
    wednesday: { ...emptyPlanDay },
    thursday: { ...emptyPlanDay },
    friday: { ...emptyPlanDay },
    saturday: { ...emptyPlanDay },
    sunday: { ...emptyPlanDay }
  };
}

export function createDefaultAppState(): AppState {
  return {
    favorites: [],
    customExercises: [],
    weeklyPlan: createDefaultWeeklyPlan(),
    progressLogs: [],
    language: 'en'
  };
}

export function loadAppState(): AppState {
  const savedState = localStorage.getItem(STORAGE_KEY);

  if (!savedState) {
    return createDefaultAppState();
  }

  return {
    ...createDefaultAppState(),
    ...JSON.parse(savedState)
  };
}

export function saveAppState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
