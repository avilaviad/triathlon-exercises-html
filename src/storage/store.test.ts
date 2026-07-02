import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { AppState, Exercise, ProgressLog, WeeklyPlan } from '../types';
import {
  STORAGE_KEY,
  createDefaultAppState,
  createDefaultWeeklyPlan,
  loadAppState,
  saveAppState
} from './store';

const customExercise: Exercise = {
  id: 'custom-hip-airplane',
  source: 'custom',
  title: 'Hip Airplane',
  category: 'Stability',
  thumbnailUrl: '/images/hip-airplane.jpg',
  thumbnailAlt: 'Athlete balancing during a hip airplane drill',
  description: 'Single-leg hip control drill.',
  benefits: ['Improves run stability'],
  targetSport: 'run',
  difficulty: 'intermediate',
  equipment: ['none'],
  prescription: '2 sets of 6 reps per side',
  frequency: '2 times weekly',
  commonMistakes: ['Opening the hips too fast'],
  executionTips: ['Move slowly and keep the standing knee soft'],
  youtubeUrl: 'https://www.youtube.com/watch?v=example'
};

const plannedWeek: WeeklyPlan = {
  ...createDefaultWeeklyPlan(),
  monday: {
    dayType: 'run',
    focus: 'Run form',
    availableMinutes: 25,
    injuryFocus: 'Calf tightness',
    preferredCategories: ['Mobility', 'Stability'],
    exerciseIds: ['built-in-calf-mobility', customExercise.id]
  },
  sunday: {
    dayType: 'rest',
    focus: 'Recovery',
    availableMinutes: 10,
    injuryFocus: '',
    preferredCategories: ['Breathing', 'Recovery'],
    exerciseIds: ['built-in-breathing']
  }
};

const progressLog: ProgressLog = {
  id: 'log-2026-07-02-custom-hip-airplane',
  exerciseId: customExercise.id,
  exerciseSource: 'custom',
  date: '2026-07-02',
  status: 'completed',
  notes: 'No pain today.',
  painLevel: 1,
  planSource: 'manual'
};

describe('local app store', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns the default app state when storage is empty', () => {
    expect(loadAppState()).toEqual(createDefaultAppState());
  });

  it('creates independent arrays for each weekly plan day', () => {
    const plan = createDefaultWeeklyPlan();

    plan.monday.exerciseIds.push('built-in-run-drill');
    plan.monday.preferredCategories.push('Mobility');

    expect(plan.tuesday.exerciseIds).toEqual([]);
    expect(plan.tuesday.preferredCategories).toEqual([]);
  });

  it('returns the default app state when saved storage is invalid JSON', () => {
    localStorage.setItem(STORAGE_KEY, '{invalid-json');

    expect(loadAppState()).toEqual(createDefaultAppState());
  });

  it('returns the default app state when local storage cannot be read', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage blocked');
    });

    expect(loadAppState()).toEqual(createDefaultAppState());
  });

  it('saves and loads favorite exercise ids', () => {
    const state: AppState = {
      ...createDefaultAppState(),
      favorites: ['built-in-swim-catch', customExercise.id]
    };

    saveAppState(state);

    expect(loadAppState().favorites).toEqual(['built-in-swim-catch', customExercise.id]);
  });

  it('saves custom exercises separately from built-in exercise data', () => {
    saveAppState({
      ...createDefaultAppState(),
      customExercises: [customExercise]
    });

    expect(loadAppState().customExercises).toEqual([customExercise]);
  });

  it('saves a structured weekly plan by weekday', () => {
    saveAppState({
      ...createDefaultAppState(),
      weeklyPlan: plannedWeek
    });

    expect(loadAppState().weeklyPlan).toEqual(plannedWeek);
  });

  it('saves append-only progress logs in insertion order', () => {
    const skippedLog: ProgressLog = {
      ...progressLog,
      id: 'log-2026-07-03-custom-hip-airplane',
      date: '2026-07-03',
      status: 'skipped',
      notes: 'Skipped after hard run.',
      painLevel: 3
    };

    saveAppState({
      ...createDefaultAppState(),
      progressLogs: [progressLog, skippedLog]
    });

    expect(loadAppState().progressLogs).toEqual([progressLog, skippedLog]);
  });

  it('saves the selected language', () => {
    saveAppState({
      ...createDefaultAppState(),
      language: 'he'
    });

    expect(loadAppState().language).toBe('he');
  });

  it('uses one versioned local storage key', () => {
    expect(saveAppState(createDefaultAppState())).toBe(true);

    expect(STORAGE_KEY).toBe('triathlon-library:v1');
    expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull();
    expect(localStorage.length).toBe(1);
  });

  it('returns false when local storage cannot be written', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Quota exceeded');
    });

    expect(saveAppState(createDefaultAppState())).toBe(false);
  });
});
