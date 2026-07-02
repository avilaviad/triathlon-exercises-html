import type { AppState, WeeklyPlan, WeeklyPlanDay } from '../types';

export const STORAGE_KEY = 'triathlon-library:v1';

function createEmptyPlanDay(): WeeklyPlanDay {
  return {
    dayType: 'rest',
    focus: '',
    availableMinutes: 0,
    injuryFocus: '',
    preferredCategories: [],
    exerciseIds: []
  };
}

export function createDefaultWeeklyPlan(): WeeklyPlan {
  return {
    monday: createEmptyPlanDay(),
    tuesday: createEmptyPlanDay(),
    wednesday: createEmptyPlanDay(),
    thursday: createEmptyPlanDay(),
    friday: createEmptyPlanDay(),
    saturday: createEmptyPlanDay(),
    sunday: createEmptyPlanDay()
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
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);

    if (!savedState) {
      return createDefaultAppState();
    }

    return {
      ...createDefaultAppState(),
      ...JSON.parse(savedState)
    };
  } catch {
    return createDefaultAppState();
  }
}

export function saveAppState(state: AppState): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}
