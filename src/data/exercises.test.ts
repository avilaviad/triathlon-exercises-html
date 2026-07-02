import { describe, expect, it } from 'vitest';
import type { Exercise, ExerciseCategory } from '../types';
import { exercises } from './exercises';

const requiredCategories: ExerciseCategory[] = [
  'Technique',
  'Mobility',
  'Stability',
  'Stretching',
  'Prehab',
  'Breathing',
  'Recovery',
  'Strength'
];

const hasText = (value: string) => value.trim().length > 0;
const hasTextArray = (value: string[]) => value.length > 0 && value.every(hasText);

describe('built-in exercise library', () => {
  it('contains exactly 120 exercises', () => {
    expect(exercises).toHaveLength(120);
  });

  it('represents every required category', () => {
    const categories = new Set(exercises.map((exercise) => exercise.category));

    for (const category of requiredCategories) {
      expect(categories.has(category)).toBe(true);
    }
  });

  it('provides complete data for every exercise', () => {
    for (const exercise of exercises) {
      expect(hasText(exercise.title)).toBe(true);
      expect(requiredCategories).toContain(exercise.category);
      expect(hasText(exercise.description)).toBe(true);
      expect(hasTextArray(exercise.benefits)).toBe(true);
      expect(['swim', 'bike', 'run', 'general']).toContain(exercise.targetSport);
      expect(['beginner', 'intermediate', 'advanced']).toContain(exercise.difficulty);
      expect(hasTextArray(exercise.equipment)).toBe(true);
      expect(hasText(exercise.prescription)).toBe(true);
      expect(hasText(exercise.frequency)).toBe(true);
      expect(hasTextArray(exercise.commonMistakes)).toBe(true);
      expect(hasTextArray(exercise.executionTips)).toBe(true);
      expect(hasText(exercise.youtubeUrl ?? '')).toBe(true);
    }
  });

  it('uses unique exercise ids', () => {
    const ids = exercises.map((exercise: Exercise) => exercise.id);

    expect(new Set(ids).size).toBe(ids.length);
  });
});
