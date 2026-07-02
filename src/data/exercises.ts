import type { Difficulty, Exercise, ExerciseCategory, TargetSport } from '../types';

type ExerciseSeed = {
  title: string;
  category: ExerciseCategory;
  description: string;
  targetSport: TargetSport;
  difficulty: Difficulty;
  equipment: string[];
  prescription: string;
  frequency: string;
};

const categoryDetails: Record<
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

const sportBenefits: Record<TargetSport, string> = {
  swim: 'Carries over to more efficient swimming',
  bike: 'Supports stronger and steadier cycling',
  run: 'Supports durable running mechanics',
  general: 'Fits easily around mixed triathlon training'
};

const toId = (title: string) =>
  `built-in-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}`;

const youtubeSearchUrl = (title: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${title} triathlon exercise`
  )}`;

const createExercise = (seed: ExerciseSeed): Exercise => {
  const details = categoryDetails[seed.category];

  return {
    id: toId(seed.title),
    source: 'built-in',
    title: seed.title,
    category: seed.category,
    thumbnailUrl: '/pwa-192x192.png',
    thumbnailAlt: `${seed.title} exercise thumbnail`,
    description: seed.description,
    benefits: [...details.benefits, sportBenefits[seed.targetSport]],
    targetSport: seed.targetSport,
    difficulty: seed.difficulty,
    equipment: seed.equipment,
    prescription: seed.prescription,
    frequency: seed.frequency,
    commonMistakes: details.commonMistakes,
    executionTips: details.executionTips,
    youtubeUrl: youtubeSearchUrl(seed.title)
  };
};

const exerciseSeeds: ExerciseSeed[] = [
  {
    title: 'Freestyle Catch-Up Drill',
    category: 'Technique',
    description: 'Swim one arm at a time, meeting hands in front before the next pull.',
    targetSport: 'swim',
    difficulty: 'beginner',
    equipment: ['pool'],
    prescription: '6 x 25m easy with full recovery',
    frequency: '1-2 times weekly'
  },
  {
    title: 'Single-Arm Freestyle Drill',
    category: 'Technique',
    description: 'Isolate one arm to refine catch timing and body rotation.',
    targetSport: 'swim',
    difficulty: 'intermediate',
    equipment: ['pool'],
    prescription: '4 x 25m each side',
    frequency: '1-2 times weekly'
  },
  {
    title: 'Fingertip Drag Drill',
    category: 'Technique',
    description: 'Drag fingertips lightly over the water during recovery.',
    targetSport: 'swim',
    difficulty: 'beginner',
    equipment: ['pool'],
    prescription: '6 x 25m relaxed',
    frequency: '1-2 times weekly'
  },
  {
    title: 'Front Sculling Drill',
    category: 'Technique',
    description: 'Use small hand sweeps in front to feel pressure on the water.',
    targetSport: 'swim',
    difficulty: 'intermediate',
    equipment: ['pool', 'pull buoy'],
    prescription: '8 x 15m scull then swim easy',
    frequency: '1 time weekly'
  },
  {
    title: 'Bilateral Breathing Drill',
    category: 'Technique',
    description: 'Alternate breathing sides to balance rotation and sighting options.',
    targetSport: 'swim',
    difficulty: 'intermediate',
    equipment: ['pool'],
    prescription: '6 x 50m breathing every 3 strokes',
    frequency: '1-2 times weekly'
  },
  {
    title: 'High Cadence Spin-Ups',
    category: 'Technique',
    description: 'Gradually increase cadence while keeping the upper body quiet.',
    targetSport: 'bike',
    difficulty: 'beginner',
    equipment: ['bike', 'trainer'],
    prescription: '6 x 30 seconds fast cadence, 90 seconds easy',
    frequency: '1 time weekly'
  },
  {
    title: 'Single-Leg Pedal Drill',
    category: 'Technique',
    description: 'Pedal with one leg clipped in to smooth the pedal stroke.',
    targetSport: 'bike',
    difficulty: 'intermediate',
    equipment: ['bike', 'trainer'],
    prescription: '4 x 30 seconds per leg',
    frequency: '1 time weekly'
  },
  {
    title: 'Seated Climb Cadence Control',
    category: 'Technique',
    description: 'Hold steady cadence and posture during moderate seated climbing.',
    targetSport: 'bike',
    difficulty: 'intermediate',
    equipment: ['bike'],
    prescription: '5 x 2 minutes at controlled tempo',
    frequency: '1 time weekly'
  },
  {
    title: 'Cornering Line Practice',
    category: 'Technique',
    description: 'Practice wide-entry and smooth-exit cornering at low speed.',
    targetSport: 'bike',
    difficulty: 'advanced',
    equipment: ['bike', 'cones'],
    prescription: '10 minutes of low-speed corner repeats',
    frequency: '1 time weekly'
  },
  {
    title: 'A-Skip Drill',
    category: 'Technique',
    description: 'Use rhythmic skips to reinforce knee drive and posture.',
    targetSport: 'run',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '2 x 20m before easy runs',
    frequency: '2 times weekly'
  },
  {
    title: 'B-Skip Drill',
    category: 'Technique',
    description: 'Extend then sweep the leg down to practice active foot strike.',
    targetSport: 'run',
    difficulty: 'intermediate',
    equipment: ['none'],
    prescription: '2 x 20m after A-skips',
    frequency: '1-2 times weekly'
  },
  {
    title: 'High Knees Rhythm Drill',
    category: 'Technique',
    description: 'Run in place or forward with quick feet and tall posture.',
    targetSport: 'run',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '3 x 20 seconds',
    frequency: '2 times weekly'
  },
  {
    title: 'Butt Kick Form Drill',
    category: 'Technique',
    description: 'Use compact heel recovery without leaning backward.',
    targetSport: 'run',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '3 x 20m relaxed',
    frequency: '2 times weekly'
  },
  {
    title: 'Stride Build-Ups',
    category: 'Technique',
    description: 'Build from easy to fast running while staying relaxed.',
    targetSport: 'run',
    difficulty: 'intermediate',
    equipment: ['none'],
    prescription: '4-6 x 20 seconds with walk-back recovery',
    frequency: '1-2 times weekly'
  },
  {
    title: 'Hill Cadence Drill',
    category: 'Technique',
    description: 'Run short hills with quick steps and upright posture.',
    targetSport: 'run',
    difficulty: 'advanced',
    equipment: ['hill'],
    prescription: '6 x 10 seconds uphill',
    frequency: '1 time weekly'
  },
  {
    title: 'Ankle Knee-to-Wall Mobilization',
    category: 'Mobility',
    description: 'Drive the knee toward a wall to improve ankle dorsiflexion.',
    targetSport: 'run',
    difficulty: 'beginner',
    equipment: ['wall'],
    prescription: '2 sets of 10 reps per side',
    frequency: '3 times weekly'
  },
  {
    title: 'Hip 90/90 Switches',
    category: 'Mobility',
    description: 'Rotate between seated 90/90 hip positions with control.',
    targetSport: 'general',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '2 sets of 8 switches',
    frequency: '3 times weekly'
  },
  {
    title: 'Thoracic Open Book Rotation',
    category: 'Mobility',
    description: 'Rotate the upper back from a side-lying position.',
    targetSport: 'swim',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '2 sets of 8 reps per side',
    frequency: '3 times weekly'
  },
  {
    title: 'Dynamic Couch Stretch Pulses',
    category: 'Mobility',
    description: 'Pulse gently in a couch stretch to open the front of the hip.',
    targetSport: 'bike',
    difficulty: 'intermediate',
    equipment: ['wall', 'pad'],
    prescription: '2 sets of 8 pulses per side',
    frequency: '2-3 times weekly'
  },
  {
    title: 'Worlds Greatest Stretch Flow',
    category: 'Mobility',
    description: 'Move through a lunge, hamstring, and rotation sequence.',
    targetSport: 'general',
    difficulty: 'intermediate',
    equipment: ['none'],
    prescription: '2 rounds of 5 reps per side',
    frequency: '2 times weekly'
  },
  {
    title: 'Shoulder CARs',
    category: 'Mobility',
    description: 'Circle the shoulder through its controlled range of motion.',
    targetSport: 'swim',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '2 sets of 3 slow circles each direction',
    frequency: '3 times weekly'
  },
  {
    title: 'Hip CARs',
    category: 'Mobility',
    description: 'Move the hip through a slow controlled articular rotation.',
    targetSport: 'run',
    difficulty: 'intermediate',
    equipment: ['wall'],
    prescription: '2 sets of 3 circles per side',
    frequency: '2-3 times weekly'
  },
  {
    title: 'Cat-Cow Spinal Wave',
    category: 'Mobility',
    description: 'Move segment by segment between spinal flexion and extension.',
    targetSport: 'general',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '2 sets of 8 slow reps',
    frequency: '3 times weekly'
  },
  {
    title: 'Deep Squat Pry',
    category: 'Mobility',
    description: 'Sit into a supported squat and shift gently side to side.',
    targetSport: 'bike',
    difficulty: 'intermediate',
    equipment: ['none'],
    prescription: '2 x 45 seconds',
    frequency: '2 times weekly'
  },
  {
    title: 'Banded Lat Mobilization',
    category: 'Mobility',
    description: 'Use a band to open the lats and overhead shoulder position.',
    targetSport: 'swim',
    difficulty: 'intermediate',
    equipment: ['resistance band'],
    prescription: '2 x 45 seconds per side',
    frequency: '2 times weekly'
  },
  {
    title: 'Banded Ankle Distraction',
    category: 'Mobility',
    description: 'Use a banded pull while moving the ankle into dorsiflexion.',
    targetSport: 'run',
    difficulty: 'advanced',
    equipment: ['resistance band'],
    prescription: '2 sets of 10 reps per side',
    frequency: '2 times weekly'
  },
  {
    title: 'Wrist Rockbacks',
    category: 'Mobility',
    description: 'Rock gently over the wrists to prepare for floor strength work.',
    targetSport: 'general',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '2 sets of 10 reps',
    frequency: '2 times weekly'
  },
  {
    title: 'Adductor Rockbacks',
    category: 'Mobility',
    description: 'Shift the hips back from a kneeling adductor position.',
    targetSport: 'run',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '2 sets of 10 reps per side',
    frequency: '2-3 times weekly'
  },
  {
    title: 'Lunge With T-Spine Rotation',
    category: 'Mobility',
    description: 'Rotate from a low lunge to open hips and upper back together.',
    targetSport: 'general',
    difficulty: 'intermediate',
    equipment: ['none'],
    prescription: '2 sets of 6 reps per side',
    frequency: '2 times weekly'
  },
  {
    title: 'Foam Roller Thoracic Extension',
    category: 'Mobility',
    description: 'Extend the upper back over a foam roller in small segments.',
    targetSport: 'swim',
    difficulty: 'beginner',
    equipment: ['foam roller'],
    prescription: '6-8 slow extensions',
    frequency: '2-3 times weekly'
  },
  {
    title: 'Single-Leg Balance Reach',
    category: 'Stability',
    description: 'Reach forward while balancing on one leg.',
    targetSport: 'run',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '2 sets of 6 reaches per side',
    frequency: '2 times weekly'
  },
  {
    title: 'Hip Airplane',
    category: 'Stability',
    description: 'Rotate the pelvis over a stable standing leg.',
    targetSport: 'run',
    difficulty: 'advanced',
    equipment: ['wall'],
    prescription: '2 sets of 5 reps per side',
    frequency: '1-2 times weekly'
  },
  {
    title: 'Side Plank With Leg Lift',
    category: 'Stability',
    description: 'Hold a side plank while lifting the top leg.',
    targetSport: 'general',
    difficulty: 'advanced',
    equipment: ['none'],
    prescription: '2 sets of 20 seconds per side',
    frequency: '2 times weekly'
  },
  {
    title: 'Dead Bug',
    category: 'Stability',
    description: 'Move opposite arm and leg while keeping the trunk still.',
    targetSport: 'general',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '2 sets of 8 reps per side',
    frequency: '2-3 times weekly'
  },
  {
    title: 'Bird Dog',
    category: 'Stability',
    description: 'Reach opposite arm and leg from all fours with a level pelvis.',
    targetSport: 'general',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '2 sets of 8 reps per side',
    frequency: '2-3 times weekly'
  },
  {
    title: 'Pallof Press Hold',
    category: 'Stability',
    description: 'Hold a band pressout against rotational pull.',
    targetSport: 'general',
    difficulty: 'intermediate',
    equipment: ['resistance band'],
    prescription: '3 x 20 seconds per side',
    frequency: '2 times weekly'
  },
  {
    title: 'Single-Leg Glute Bridge',
    category: 'Stability',
    description: 'Bridge on one leg while keeping hips level.',
    targetSport: 'run',
    difficulty: 'intermediate',
    equipment: ['none'],
    prescription: '2 sets of 8 reps per side',
    frequency: '2 times weekly'
  },
  {
    title: 'Runners Step-Down',
    category: 'Stability',
    description: 'Lower one heel from a step with knee and hip control.',
    targetSport: 'run',
    difficulty: 'intermediate',
    equipment: ['step'],
    prescription: '2 sets of 8 reps per side',
    frequency: '2 times weekly'
  },
  {
    title: 'Copenhagen Side Plank Short Lever',
    category: 'Stability',
    description: 'Support the top knee on a bench while holding a side plank.',
    targetSport: 'run',
    difficulty: 'advanced',
    equipment: ['bench'],
    prescription: '2 x 15 seconds per side',
    frequency: '1-2 times weekly'
  },
  {
    title: 'Swim Streamline Hollow Hold',
    category: 'Stability',
    description: 'Hold a hollow body shape with arms overhead in streamline.',
    targetSport: 'swim',
    difficulty: 'intermediate',
    equipment: ['none'],
    prescription: '3 x 20 seconds',
    frequency: '2 times weekly'
  },
  {
    title: 'Plank Shoulder Taps',
    category: 'Stability',
    description: 'Tap opposite shoulder from a plank without rocking.',
    targetSport: 'swim',
    difficulty: 'intermediate',
    equipment: ['none'],
    prescription: '2 sets of 10 taps per side',
    frequency: '2 times weekly'
  },
  {
    title: 'Split Squat Iso Hold',
    category: 'Stability',
    description: 'Hold the bottom of a split squat with quiet hips and knee tracking.',
    targetSport: 'bike',
    difficulty: 'intermediate',
    equipment: ['none'],
    prescription: '2 x 30 seconds per side',
    frequency: '2 times weekly'
  },
  {
    title: 'Single-Leg Romanian Deadlift Reach',
    category: 'Stability',
    description: 'Hinge on one leg while reaching forward with both hands.',
    targetSport: 'run',
    difficulty: 'intermediate',
    equipment: ['none'],
    prescription: '2 sets of 6 reps per side',
    frequency: '2 times weekly'
  },
  {
    title: 'Band Lateral Walk',
    category: 'Stability',
    description: 'Step sideways against band tension while keeping the pelvis level.',
    targetSport: 'run',
    difficulty: 'beginner',
    equipment: ['mini band'],
    prescription: '2 x 10 steps each direction',
    frequency: '2-3 times weekly'
  },
  {
    title: 'Stability Ball Stir-the-Pot',
    category: 'Stability',
    description: 'Circle the forearms on a ball from a braced plank.',
    targetSport: 'general',
    difficulty: 'advanced',
    equipment: ['stability ball'],
    prescription: '2 sets of 8 circles each direction',
    frequency: '1-2 times weekly'
  },
  {
    title: 'Standing Calf Stretch',
    category: 'Stretching',
    description: 'Stretch the straight-leg calf against a wall.',
    targetSport: 'run',
    difficulty: 'beginner',
    equipment: ['wall'],
    prescription: '2 x 30 seconds per side',
    frequency: 'After runs'
  },
  {
    title: 'Soleus Wall Stretch',
    category: 'Stretching',
    description: 'Bend the back knee to stretch the deeper calf muscle.',
    targetSport: 'run',
    difficulty: 'beginner',
    equipment: ['wall'],
    prescription: '2 x 30 seconds per side',
    frequency: 'After runs'
  },
  {
    title: 'Figure Four Glute Stretch',
    category: 'Stretching',
    description: 'Cross one ankle over the opposite knee to stretch the hip.',
    targetSport: 'run',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '2 x 40 seconds per side',
    frequency: '2-3 times weekly'
  },
  {
    title: 'Kneeling Hip Flexor Stretch',
    category: 'Stretching',
    description: 'Use a half-kneeling position to stretch the front of the hip.',
    targetSport: 'bike',
    difficulty: 'beginner',
    equipment: ['pad'],
    prescription: '2 x 30 seconds per side',
    frequency: 'After rides'
  },
  {
    title: 'Hamstring Strap Stretch',
    category: 'Stretching',
    description: 'Use a strap to stretch the hamstring while lying on your back.',
    targetSport: 'run',
    difficulty: 'beginner',
    equipment: ['strap'],
    prescription: '2 x 30 seconds per side',
    frequency: '2-3 times weekly'
  },
  {
    title: 'Quad Couch Stretch',
    category: 'Stretching',
    description: 'Place the back foot on a wall or bench to stretch the quad.',
    targetSport: 'bike',
    difficulty: 'intermediate',
    equipment: ['wall', 'pad'],
    prescription: '2 x 30 seconds per side',
    frequency: 'After rides'
  },
  {
    title: 'Lat Doorway Stretch',
    category: 'Stretching',
    description: 'Hold a doorway and sit the hips back to stretch the lats.',
    targetSport: 'swim',
    difficulty: 'beginner',
    equipment: ['doorway'],
    prescription: '2 x 30 seconds per side',
    frequency: 'After swims'
  },
  {
    title: 'Pec Doorway Stretch',
    category: 'Stretching',
    description: 'Open the chest with the forearm supported on a doorway.',
    targetSport: 'swim',
    difficulty: 'beginner',
    equipment: ['doorway'],
    prescription: '2 x 30 seconds per side',
    frequency: 'After swims'
  },
  {
    title: 'Childs Pose Lat Reach',
    category: 'Stretching',
    description: 'Reach one hand across the floor from childs pose.',
    targetSport: 'swim',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '2 x 30 seconds per side',
    frequency: '2-3 times weekly'
  },
  {
    title: 'Seated Adductor Stretch',
    category: 'Stretching',
    description: 'Sit tall with feet wide to stretch the inner thighs.',
    targetSport: 'run',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '2 x 40 seconds',
    frequency: '2 times weekly'
  },
  {
    title: 'Supine Spinal Twist',
    category: 'Stretching',
    description: 'Rotate the lower body across while lying on your back.',
    targetSport: 'general',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '2 x 30 seconds per side',
    frequency: '2-3 times weekly'
  },
  {
    title: 'Downward Dog Pedal',
    category: 'Stretching',
    description: 'Alternate heel drops from downward dog to open calves and hamstrings.',
    targetSport: 'run',
    difficulty: 'intermediate',
    equipment: ['none'],
    prescription: '2 x 45 seconds',
    frequency: 'After runs'
  },
  {
    title: 'Wrist Flexor Stretch',
    category: 'Stretching',
    description: 'Extend the wrist gently to stretch the forearm.',
    targetSport: 'swim',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '2 x 20 seconds per side',
    frequency: '2 times weekly'
  },
  {
    title: 'Upper Trap Neck Stretch',
    category: 'Stretching',
    description: 'Gently side-bend the neck to reduce shoulder tension.',
    targetSport: 'bike',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '2 x 20 seconds per side',
    frequency: 'After long rides'
  },
  {
    title: 'Triceps Overhead Stretch',
    category: 'Stretching',
    description: 'Reach one elbow overhead to stretch the triceps and shoulder.',
    targetSport: 'swim',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '2 x 30 seconds per side',
    frequency: 'After swims'
  },
  {
    title: 'Rotator Cuff External Rotation',
    category: 'Prehab',
    description: 'Rotate the arm outward against light band tension.',
    targetSport: 'swim',
    difficulty: 'beginner',
    equipment: ['resistance band'],
    prescription: '2 sets of 12 reps per side',
    frequency: '2-3 times weekly'
  },
  {
    title: 'Band Pull-Aparts',
    category: 'Prehab',
    description: 'Pull a light band apart to train upper-back control.',
    targetSport: 'swim',
    difficulty: 'beginner',
    equipment: ['resistance band'],
    prescription: '2 sets of 15 reps',
    frequency: '2-3 times weekly'
  },
  {
    title: 'Serratus Wall Slides',
    category: 'Prehab',
    description: 'Slide forearms up a wall while keeping shoulder blades controlled.',
    targetSport: 'swim',
    difficulty: 'intermediate',
    equipment: ['wall', 'mini band'],
    prescription: '2 sets of 10 reps',
    frequency: '2 times weekly'
  },
  {
    title: 'Tibialis Raises',
    category: 'Prehab',
    description: 'Lift toes toward shins while leaning against a wall.',
    targetSport: 'run',
    difficulty: 'beginner',
    equipment: ['wall'],
    prescription: '2 sets of 15 reps',
    frequency: '2-3 times weekly'
  },
  {
    title: 'Eccentric Calf Raises',
    category: 'Prehab',
    description: 'Rise on both feet and lower slowly on one leg.',
    targetSport: 'run',
    difficulty: 'intermediate',
    equipment: ['step'],
    prescription: '2 sets of 8 reps per side',
    frequency: '2 times weekly'
  },
  {
    title: 'Monster Walks',
    category: 'Prehab',
    description: 'Walk forward and backward with a band around the legs.',
    targetSport: 'run',
    difficulty: 'beginner',
    equipment: ['mini band'],
    prescription: '2 x 10 steps each direction',
    frequency: '2 times weekly'
  },
  {
    title: 'Clamshells',
    category: 'Prehab',
    description: 'Open the top knee from a side-lying position.',
    targetSport: 'run',
    difficulty: 'beginner',
    equipment: ['mini band'],
    prescription: '2 sets of 12 reps per side',
    frequency: '2-3 times weekly'
  },
  {
    title: 'Spanish Squat Isometric',
    category: 'Prehab',
    description: 'Hold a squat while a band supports the knees from behind.',
    targetSport: 'bike',
    difficulty: 'intermediate',
    equipment: ['resistance band'],
    prescription: '3 x 30 seconds',
    frequency: '1-2 times weekly'
  },
  {
    title: 'Nordic Hamstring Eccentric',
    category: 'Prehab',
    description: 'Lower the torso slowly from a kneeling anchored position.',
    targetSport: 'run',
    difficulty: 'advanced',
    equipment: ['anchor', 'pad'],
    prescription: '2 sets of 4 slow reps',
    frequency: '1 time weekly'
  },
  {
    title: 'Toe Yoga',
    category: 'Prehab',
    description: 'Lift the big toe and lesser toes independently.',
    targetSport: 'run',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '2 sets of 8 reps each pattern',
    frequency: '3 times weekly'
  },
  {
    title: 'Foot Short-Doming Drill',
    category: 'Prehab',
    description: 'Shorten the foot arch without curling the toes.',
    targetSport: 'run',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '2 x 20 seconds per foot',
    frequency: '3 times weekly'
  },
  {
    title: 'Scapular Push-Ups',
    category: 'Prehab',
    description: 'Move only the shoulder blades from a plank position.',
    targetSport: 'swim',
    difficulty: 'intermediate',
    equipment: ['none'],
    prescription: '2 sets of 10 reps',
    frequency: '2 times weekly'
  },
  {
    title: 'Prone Y-T-W Raises',
    category: 'Prehab',
    description: 'Raise the arms into Y, T, and W shapes while lying face down.',
    targetSport: 'swim',
    difficulty: 'intermediate',
    equipment: ['none'],
    prescription: '2 rounds of 6 reps each shape',
    frequency: '2 times weekly'
  },
  {
    title: 'Copenhagen Adductor Raises',
    category: 'Prehab',
    description: 'Lift and lower the lower leg from a supported side plank.',
    targetSport: 'run',
    difficulty: 'advanced',
    equipment: ['bench'],
    prescription: '2 sets of 6 reps per side',
    frequency: '1-2 times weekly'
  },
  {
    title: 'Terminal Knee Extensions',
    category: 'Prehab',
    description: 'Straighten the knee against a band behind the joint.',
    targetSport: 'bike',
    difficulty: 'beginner',
    equipment: ['resistance band'],
    prescription: '2 sets of 12 reps per side',
    frequency: '2 times weekly'
  },
  {
    title: 'Diaphragmatic 90/90 Breathing',
    category: 'Breathing',
    description: 'Lie with hips and knees at 90 degrees and breathe into the lower ribs.',
    targetSport: 'general',
    difficulty: 'beginner',
    equipment: ['wall'],
    prescription: '5 minutes easy breathing',
    frequency: 'Daily or after hard sessions'
  },
  {
    title: 'Box Breathing',
    category: 'Breathing',
    description: 'Use equal inhale, hold, exhale, and hold counts.',
    targetSport: 'general',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '4 rounds of 4-4-4-4 counts',
    frequency: 'As needed before training'
  },
  {
    title: 'Crocodile Breathing',
    category: 'Breathing',
    description: 'Lie face down and feel the belly expand into the floor.',
    targetSport: 'general',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '3-5 minutes',
    frequency: 'Daily'
  },
  {
    title: 'Cadence Breathing Walk',
    category: 'Breathing',
    description: 'Match nasal breathing to relaxed walking steps.',
    targetSport: 'general',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '5-10 minutes easy walk',
    frequency: 'Recovery days'
  },
  {
    title: 'Nasal Breathing Easy Spin',
    category: 'Breathing',
    description: 'Ride very easy while keeping breathing through the nose.',
    targetSport: 'bike',
    difficulty: 'intermediate',
    equipment: ['bike'],
    prescription: '10 minutes in zone 1',
    frequency: '1 time weekly'
  },
  {
    title: 'Extended Exhale Breathing',
    category: 'Breathing',
    description: 'Use a longer exhale than inhale to downshift after training.',
    targetSport: 'general',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '5 minutes with 3-count inhale and 6-count exhale',
    frequency: 'After hard sessions'
  },
  {
    title: 'Recovery Position Breathing',
    category: 'Breathing',
    description: 'Rest hands on knees and slow the breath after intervals.',
    targetSport: 'run',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '5 slow breaths between repeats',
    frequency: 'During interval sessions'
  },
  {
    title: 'Swim Bilateral Exhale Drill',
    category: 'Breathing',
    description: 'Practice steady underwater exhale while alternating breath sides.',
    targetSport: 'swim',
    difficulty: 'intermediate',
    equipment: ['pool'],
    prescription: '6 x 25m easy',
    frequency: '1-2 times weekly'
  },
  {
    title: 'Pre-Race Downshift Breathing',
    category: 'Breathing',
    description: 'Use slow exhales to settle nerves before the start.',
    targetSport: 'general',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '2-3 minutes before warmup',
    frequency: 'Race days or key sessions'
  },
  {
    title: 'CO2 Tolerance Humming Exhale',
    category: 'Breathing',
    description: 'Hum softly through long exhales to practice calm air hunger.',
    targetSport: 'general',
    difficulty: 'advanced',
    equipment: ['none'],
    prescription: '6 rounds of comfortable long exhales',
    frequency: '1-2 times weekly'
  },
  {
    title: 'Rib Expansion Breathing',
    category: 'Breathing',
    description: 'Place hands around the ribs and breathe outward into the hands.',
    targetSport: 'swim',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '3 minutes',
    frequency: 'Before swims'
  },
  {
    title: '4-7-8 Breathing',
    category: 'Breathing',
    description: 'Use a short inhale, hold, and longer exhale pattern.',
    targetSport: 'general',
    difficulty: 'intermediate',
    equipment: ['none'],
    prescription: '4 rounds',
    frequency: 'Evenings or rest days'
  },
  {
    title: 'Pursed-Lip Breathing',
    category: 'Breathing',
    description: 'Exhale through lightly pursed lips to slow breathing rate.',
    targetSport: 'general',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '3-5 minutes',
    frequency: 'After training'
  },
  {
    title: 'Tempo Run Breathing Practice',
    category: 'Breathing',
    description: 'Match breaths to steps during controlled tempo running.',
    targetSport: 'run',
    difficulty: 'advanced',
    equipment: ['none'],
    prescription: '4 x 2 minutes at steady tempo',
    frequency: '1 time weekly'
  },
  {
    title: 'Post-Interval Reset Breaths',
    category: 'Breathing',
    description: 'Use three deliberate breaths immediately after each hard interval.',
    targetSport: 'general',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '3 slow breaths after each interval',
    frequency: 'During hard sessions'
  },
  {
    title: 'Foam Roll Calves',
    category: 'Recovery',
    description: 'Roll the calf muscles slowly after run or bike sessions.',
    targetSport: 'run',
    difficulty: 'beginner',
    equipment: ['foam roller'],
    prescription: '60 seconds per side',
    frequency: 'After hard runs'
  },
  {
    title: 'Foam Roll Quads',
    category: 'Recovery',
    description: 'Roll the front thigh with slow passes and pauses.',
    targetSport: 'bike',
    difficulty: 'beginner',
    equipment: ['foam roller'],
    prescription: '60 seconds per side',
    frequency: 'After rides'
  },
  {
    title: 'Foam Roll Hip and IT Band Area',
    category: 'Recovery',
    description: 'Roll the outer hip and thigh muscles around the IT band.',
    targetSport: 'run',
    difficulty: 'intermediate',
    equipment: ['foam roller'],
    prescription: '60 seconds per side',
    frequency: 'After long runs'
  },
  {
    title: 'Foam Roll Glutes',
    category: 'Recovery',
    description: 'Roll the glutes with one ankle crossed over the knee.',
    targetSport: 'run',
    difficulty: 'beginner',
    equipment: ['foam roller'],
    prescription: '60 seconds per side',
    frequency: '2 times weekly'
  },
  {
    title: 'Foam Roll Lats',
    category: 'Recovery',
    description: 'Roll along the side of the upper back to ease swim tightness.',
    targetSport: 'swim',
    difficulty: 'beginner',
    equipment: ['foam roller'],
    prescription: '45 seconds per side',
    frequency: 'After swims'
  },
  {
    title: 'Lacrosse Ball Plantar Release',
    category: 'Recovery',
    description: 'Roll the sole of the foot over a ball with gentle pressure.',
    targetSport: 'run',
    difficulty: 'beginner',
    equipment: ['lacrosse ball'],
    prescription: '60 seconds per foot',
    frequency: 'After runs'
  },
  {
    title: 'Lacrosse Ball Pec Release',
    category: 'Recovery',
    description: 'Use a ball against the wall to release the chest muscles.',
    targetSport: 'swim',
    difficulty: 'intermediate',
    equipment: ['lacrosse ball', 'wall'],
    prescription: '45 seconds per side',
    frequency: 'After swims'
  },
  {
    title: 'Legs-Up-the-Wall',
    category: 'Recovery',
    description: 'Rest with legs elevated on a wall to settle after training.',
    targetSport: 'general',
    difficulty: 'beginner',
    equipment: ['wall'],
    prescription: '5-10 minutes',
    frequency: 'After long sessions'
  },
  {
    title: 'Easy Walk Cooldown',
    category: 'Recovery',
    description: 'Walk gently to bring heart rate down after training.',
    targetSport: 'general',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '5-10 minutes',
    frequency: 'After workouts'
  },
  {
    title: 'Gentle Pool Walking',
    category: 'Recovery',
    description: 'Walk in shallow water to unload legs while moving easily.',
    targetSport: 'general',
    difficulty: 'beginner',
    equipment: ['pool'],
    prescription: '10 minutes easy',
    frequency: 'Recovery days'
  },
  {
    title: 'Compression Breathing Reset',
    category: 'Recovery',
    description: 'Lie down with light compression and slow nasal breathing.',
    targetSport: 'general',
    difficulty: 'beginner',
    equipment: ['compression boots'],
    prescription: '10-15 minutes',
    frequency: 'After long sessions'
  },
  {
    title: 'Sleep Wind-Down Mobility',
    category: 'Recovery',
    description: 'Use easy floor mobility before bed without raising effort.',
    targetSport: 'general',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '5 minutes',
    frequency: 'Evenings'
  },
  {
    title: 'Recovery Spin',
    category: 'Recovery',
    description: 'Ride very easy with light pressure on the pedals.',
    targetSport: 'bike',
    difficulty: 'beginner',
    equipment: ['bike'],
    prescription: '20-30 minutes zone 1',
    frequency: 'Recovery days'
  },
  {
    title: 'Recovery Swim Drill Set',
    category: 'Recovery',
    description: 'Swim easy drills with long rest and relaxed breathing.',
    targetSport: 'swim',
    difficulty: 'beginner',
    equipment: ['pool'],
    prescription: '8 x 50m easy drill choice',
    frequency: 'After hard run or bike days'
  },
  {
    title: 'Guided Body Scan Relaxation',
    category: 'Recovery',
    description: 'Scan from feet to head while releasing unnecessary tension.',
    targetSport: 'general',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '5-10 minutes',
    frequency: 'Rest days'
  },
  {
    title: 'Goblet Squat',
    category: 'Strength',
    description: 'Squat while holding a weight at chest height.',
    targetSport: 'bike',
    difficulty: 'beginner',
    equipment: ['kettlebell'],
    prescription: '3 sets of 8 reps',
    frequency: '1-2 times weekly'
  },
  {
    title: 'Romanian Deadlift',
    category: 'Strength',
    description: 'Hinge at the hips to train posterior-chain strength.',
    targetSport: 'run',
    difficulty: 'intermediate',
    equipment: ['barbell'],
    prescription: '3 sets of 6-8 reps',
    frequency: '1-2 times weekly'
  },
  {
    title: 'Rear-Foot Elevated Split Squat',
    category: 'Strength',
    description: 'Squat with the rear foot elevated to build single-leg strength.',
    targetSport: 'run',
    difficulty: 'advanced',
    equipment: ['bench', 'dumbbells'],
    prescription: '3 sets of 6 reps per side',
    frequency: '1 time weekly'
  },
  {
    title: 'Step-Ups',
    category: 'Strength',
    description: 'Step onto a box while keeping the knee tracking forward.',
    targetSport: 'bike',
    difficulty: 'beginner',
    equipment: ['box'],
    prescription: '3 sets of 8 reps per side',
    frequency: '1-2 times weekly'
  },
  {
    title: 'Push-Ups',
    category: 'Strength',
    description: 'Press from the floor with a rigid trunk.',
    targetSport: 'swim',
    difficulty: 'beginner',
    equipment: ['none'],
    prescription: '3 sets of 6-12 reps',
    frequency: '1-2 times weekly'
  },
  {
    title: 'Assisted Pull-Ups',
    category: 'Strength',
    description: 'Pull the body upward with band or machine assistance.',
    targetSport: 'swim',
    difficulty: 'intermediate',
    equipment: ['pull-up bar', 'resistance band'],
    prescription: '3 sets of 4-6 reps',
    frequency: '1-2 times weekly'
  },
  {
    title: 'Bent-Over Row',
    category: 'Strength',
    description: 'Row weights toward the ribs from a hinged position.',
    targetSport: 'swim',
    difficulty: 'intermediate',
    equipment: ['dumbbells'],
    prescription: '3 sets of 8 reps',
    frequency: '1-2 times weekly'
  },
  {
    title: 'Kettlebell Deadlift',
    category: 'Strength',
    description: 'Lift a kettlebell from the floor with a strong hip hinge.',
    targetSport: 'general',
    difficulty: 'beginner',
    equipment: ['kettlebell'],
    prescription: '3 sets of 8 reps',
    frequency: '1-2 times weekly'
  },
  {
    title: 'Lateral Lunge',
    category: 'Strength',
    description: 'Step sideways and sit into one hip while the other leg stays long.',
    targetSport: 'run',
    difficulty: 'intermediate',
    equipment: ['none'],
    prescription: '3 sets of 6 reps per side',
    frequency: '1 time weekly'
  },
  {
    title: 'Standing Calf Raise',
    category: 'Strength',
    description: 'Raise and lower the heels through full ankle range.',
    targetSport: 'run',
    difficulty: 'beginner',
    equipment: ['step'],
    prescription: '3 sets of 12 reps',
    frequency: '2 times weekly'
  },
  {
    title: 'Farmer Carry',
    category: 'Strength',
    description: 'Walk while carrying heavy weights with tall posture.',
    targetSport: 'general',
    difficulty: 'intermediate',
    equipment: ['dumbbells'],
    prescription: '4 x 30 meters',
    frequency: '1 time weekly'
  },
  {
    title: 'Renegade Row',
    category: 'Strength',
    description: 'Row one dumbbell at a time from a plank position.',
    targetSport: 'swim',
    difficulty: 'advanced',
    equipment: ['dumbbells'],
    prescription: '3 sets of 6 reps per side',
    frequency: '1 time weekly'
  },
  {
    title: 'Dumbbell Overhead Press',
    category: 'Strength',
    description: 'Press dumbbells overhead while keeping ribs down.',
    targetSport: 'swim',
    difficulty: 'intermediate',
    equipment: ['dumbbells'],
    prescription: '3 sets of 6-8 reps',
    frequency: '1 time weekly'
  },
  {
    title: 'Hamstring Slider Curl',
    category: 'Strength',
    description: 'Bridge hips up and slide heels away and back.',
    targetSport: 'run',
    difficulty: 'intermediate',
    equipment: ['sliders'],
    prescription: '3 sets of 8 reps',
    frequency: '1-2 times weekly'
  },
  {
    title: 'Single-Arm Cable Row',
    category: 'Strength',
    description: 'Row one handle at a time with trunk control.',
    targetSport: 'swim',
    difficulty: 'intermediate',
    equipment: ['cable machine'],
    prescription: '3 sets of 8 reps per side',
    frequency: '1-2 times weekly'
  }
];

export const exercises: Exercise[] = exerciseSeeds.map(createExercise);
