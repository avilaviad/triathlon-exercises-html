export type ExerciseCategory =
  | 'Technique'
  | 'Mobility'
  | 'Stability'
  | 'Stretching'
  | 'Prehab'
  | 'Breathing'
  | 'Recovery'
  | 'Strength';

export type TargetSport = 'swim' | 'bike' | 'run' | 'general';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type Language = 'en' | 'he';

export type ExerciseSource = 'built-in' | 'custom';

export type ProgressStatus = 'completed' | 'skipped';

export type PlanSource = 'manual' | 'suggested' | 'routine';

export type Weekday =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type TrainingDayType = TargetSport | 'strength' | 'rest';

export interface Exercise {
  id: string;
  source: ExerciseSource;
  title: string;
  category: ExerciseCategory;
  thumbnailUrl: string;
  thumbnailAlt: string;
  description: string;
  benefits: string[];
  targetSport: TargetSport;
  difficulty: Difficulty;
  equipment: string[];
  prescription: string;
  frequency: string;
  commonMistakes: string[];
  executionTips: string[];
  youtubeUrl?: string;
}

export interface WeeklyPlanDay {
  dayType: TrainingDayType;
  focus: string;
  availableMinutes: number;
  injuryFocus: string;
  preferredCategories: ExerciseCategory[];
  exerciseIds: string[];
}

export type WeeklyPlan = Record<Weekday, WeeklyPlanDay>;

export interface ProgressLog {
  id: string;
  exerciseId: string;
  exerciseSource: ExerciseSource;
  date: string;
  status: ProgressStatus;
  notes: string;
  painLevel: number;
  planSource: PlanSource;
}

export interface AppState {
  favorites: string[];
  customExercises: Exercise[];
  weeklyPlan: WeeklyPlan;
  progressLogs: ProgressLog[];
  language: Language;
}
