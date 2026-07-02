import { describe, expect, it } from 'vitest';
import type { Exercise, ExerciseCategory } from '../types';
import { exercises, youtubeVideoId } from './exercises';

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
const youtubeIdPattern = /^[A-Za-z0-9_-]{11}$/;
const directYoutubeVideoId = (value: string) => {
  const url = new URL(value);
  const hostname = url.hostname.replace(/^www\./, '');

  if (hostname === 'youtube.com' && url.pathname === '/watch') {
    const id = url.searchParams.get('v');
    return id && youtubeIdPattern.test(id) ? id : null;
  }

  if (hostname === 'youtube.com' && url.pathname.startsWith('/shorts/')) {
    const id = url.pathname.split('/')[2];
    return id && youtubeIdPattern.test(id) ? id : null;
  }

  if (hostname === 'youtu.be') {
    const id = url.pathname.slice(1);
    return youtubeIdPattern.test(id) ? id : null;
  }

  return null;
};
const isDirectYoutubeUrl = (value: string) => directYoutubeVideoId(value) !== null;
const isYoutubeSearchFallbackUrl = (value: string) => {
  const url = new URL(value);
  const hostname = url.hostname.replace(/^www\./, '');

  return (
    hostname === 'youtube.com' &&
    url.pathname === '/results' &&
    hasText(url.searchParams.get('search_query') ?? '')
  );
};
const isAllowedYoutubeUrl = (value: string) =>
  isDirectYoutubeUrl(value) || isYoutubeSearchFallbackUrl(value);
const firstThreeWords = (value: string) => value.toLowerCase().split(/\s+/).slice(0, 3).join(' ');

const genericGuidance: Record<
  ExerciseCategory,
  {
    benefits: string[];
    commonMistakes: string[];
    executionTips: string[];
  }
> = {
  Technique: {
    benefits: ['Improves movement economy', 'Builds repeatable race mechanics'],
    commonMistakes: ['Rushing the drill', 'Letting fatigue change the movement pattern'],
    executionTips: ['Keep the effort relaxed', 'Stop the set if form breaks down']
  },
  Mobility: {
    benefits: ['Restores usable range of motion', 'Supports smoother swim, bike, and run positions'],
    commonMistakes: ['Forcing end range', 'Moving through pain instead of mild tension'],
    executionTips: ['Use slow controlled breathing', 'Work within a comfortable range']
  },
  Stability: {
    benefits: ['Improves joint control', 'Reduces wasted motion under fatigue'],
    commonMistakes: ['Holding the breath', 'Letting the hips rotate or drop'],
    executionTips: ['Move slowly before adding load', 'Keep ribs stacked over pelvis']
  },
  Stretching: {
    benefits: ['Reduces post-session stiffness', 'Helps maintain consistent training positions'],
    commonMistakes: ['Bouncing in the stretch', 'Chasing intensity instead of position'],
    executionTips: ['Ease into the stretch gradually', 'Keep breathing steady throughout']
  },
  Prehab: {
    benefits: ['Builds tissue capacity', 'Addresses common triathlon overuse areas'],
    commonMistakes: ['Using momentum', 'Skipping the weaker side'],
    executionTips: ['Use light resistance first', 'Keep reps precise and pain-free']
  },
  Breathing: {
    benefits: ['Improves recovery control', 'Helps regulate effort during training'],
    commonMistakes: ['Breathing only into the chest', 'Forcing long holds too early'],
    executionTips: ['Keep the face and jaw relaxed', 'Return to normal breathing if dizzy']
  },
  Recovery: {
    benefits: ['Promotes downregulation', 'Supports readiness for the next session'],
    commonMistakes: ['Pressing too aggressively', 'Turning recovery work into another workout'],
    executionTips: ['Keep intensity easy', 'Focus on areas that feel restricted after training']
  },
  Strength: {
    benefits: ['Improves force production', 'Supports durability across swim, bike, and run'],
    commonMistakes: ['Adding load before controlling position', 'Cutting the range of motion short'],
    executionTips: ['Use crisp reps with full control', 'Leave one or two reps in reserve']
  }
};

const hasExerciseSpecificGuidance = (
  exercise: Exercise,
  field: 'benefits' | 'commonMistakes' | 'executionTips'
) => {
  const genericItems = new Set(genericGuidance[exercise.category][field]);

  return exercise[field].some((item) => !genericItems.has(item));
};

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

  it('contains exactly 15 exercises per required category', () => {
    for (const category of requiredCategories) {
      const categoryExercises = exercises.filter((exercise) => exercise.category === category);

      expect(categoryExercises).toHaveLength(15);
    }
  });

  it('provides complete data for every exercise', () => {
    for (const exercise of exercises) {
      expect(hasText(exercise.title)).toBe(true);
      expect(exercise.source).toBe('built-in');
      expect(requiredCategories).toContain(exercise.category);
      expect(hasText(exercise.thumbnailUrl)).toBe(true);
      expect(hasText(exercise.thumbnailAlt)).toBe(true);
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
      expect(() => new URL(exercise.youtubeUrl ?? '')).not.toThrow();
      expect(isAllowedYoutubeUrl(exercise.youtubeUrl ?? '')).toBe(true);
    }
  });

  it('uses unique exercise ids', () => {
    const ids = exercises.map((exercise: Exercise) => exercise.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('uses unique exercise titles', () => {
    const titles = exercises.map((exercise) => exercise.title);

    expect(new Set(titles).size).toBe(titles.length);
  });

  it('includes exercise-specific coaching guidance', () => {
    for (const exercise of exercises) {
      expect(hasExerciseSpecificGuidance(exercise, 'benefits')).toBe(true);
      expect(hasExerciseSpecificGuidance(exercise, 'commonMistakes')).toBe(true);
      expect(hasExerciseSpecificGuidance(exercise, 'executionTips')).toBe(true);
    }
  });

  it('does not use generated title or description boilerplate as coaching guidance', () => {
    const bannedPatterns = [
      /^Improves .* carryover/,
      /^Rushing .* until/,
      /^Keep .* relaxed enough/,
      /^Supports .* for /,
      /^Avoid turning .* into/,
      /^Use .* to reinforce/
    ];

    for (const exercise of exercises) {
      for (const guidance of [
        ...exercise.benefits,
        ...exercise.commonMistakes,
        ...exercise.executionTips
      ]) {
        expect(bannedPatterns.some((pattern) => pattern.test(guidance))).toBe(false);
      }

      expect(exercise.benefits.some((benefit) => benefit.startsWith('Reinforces '))).toBe(false);
      expect(
        exercise.commonMistakes.some((mistake) => mistake.startsWith('Missing the main goal of '))
      ).toBe(false);
      expect(exercise.executionTips.some((tip) => tip.startsWith('Use the first rep of '))).toBe(
        false
      );
      expect(exercise.executionTips.some((tip) => tip.includes('before adding speed'))).toBe(false);
    }
  });

  it('uses unique seed-level coaching guidance for each exercise', () => {
    const firstBenefits = exercises.map((exercise) => exercise.benefits[0]);
    const firstMistakes = exercises.map((exercise) => exercise.commonMistakes[0]);
    const firstTips = exercises.map((exercise) => exercise.executionTips[0]);

    expect(new Set(firstBenefits).size).toBe(exercises.length);
    expect(new Set(firstMistakes).size).toBe(exercises.length);
    expect(new Set(firstTips).size).toBe(exercises.length);
  });

  it('keeps first guidance phrasing diverse across the library', () => {
    const fields = ['benefits', 'commonMistakes', 'executionTips'] as const;

    for (const field of fields) {
      const phraseCounts = new Map<string, number>();

      for (const exercise of exercises) {
        const phrase = firstThreeWords(exercise[field][0]);
        phraseCounts.set(phrase, (phraseCounts.get(phrase) ?? 0) + 1);
      }

      expect(Math.max(...phraseCounts.values())).toBeLessThanOrEqual(5);
    }
  });

  it('does not share mutable array references between exercises', () => {
    const fields = ['benefits', 'commonMistakes', 'executionTips', 'equipment'] as const;

    for (const field of fields) {
      const arrays = exercises.map((exercise) => exercise[field]);

      expect(new Set(arrays).size).toBe(arrays.length);
    }
  });

  it('has at least 24 direct YouTube video links', () => {
    const directUrls = exercises.filter((exercise) => isDirectYoutubeUrl(exercise.youtubeUrl ?? ''));

    expect(directUrls.length).toBeGreaterThanOrEqual(24);
  });

  it('extracts direct YouTube video ids for thumbnail generation', () => {
    expect(youtubeVideoId('https://www.youtube.com/watch?v=UPOZidhYrlw')).toBe('UPOZidhYrlw');
    expect(youtubeVideoId('https://www.youtube.com/shorts/ABCDEFGHI_1')).toBe('ABCDEFGHI_1');
    expect(youtubeVideoId('https://youtu.be/ZYXWVUTSR_1')).toBe('ZYXWVUTSR_1');
    expect(youtubeVideoId('https://www.youtube.com/results?search_query=dead+bug')).toBeNull();
    expect(youtubeVideoId('https://www.youtube.com/watch?v=short')).toBeNull();
  });
});
