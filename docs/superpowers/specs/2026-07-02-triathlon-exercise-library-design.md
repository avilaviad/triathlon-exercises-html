# Triathlon Exercise Library Design

Date: 2026-07-02

## Goal

Build a clean, modern, mobile-friendly web app for triathletes. The app is a personal exercise library, routine planner, and progress tracker.

The first version is local-only and installable as a PWA. Data stays on the user's device.

## Platform

- React + Vite
- Installable PWA
- Offline-capable
- Local browser storage
- No backend
- No login

## Language And Direction

The app supports English and Hebrew.

- English uses LTR layout.
- Hebrew uses RTL layout.
- The user can switch language from settings.
- The same feature set is available in both languages.

## Main Screens

1. Library
2. Today
3. Planner
4. Favorites
5. Progress
6. Settings

The app uses bottom navigation on mobile.

## Exercise Categories

The built-in library includes these categories:

- Technique
- Mobility
- Stability
- Stretching
- Prehab
- Breathing
- Recovery
- Strength

Each exercise has one main category.

## Exercise Fields

Each exercise includes:

- Title
- Category
- Thumbnail photo or video image
- Description
- Benefits
- Target sport: swim, bike, run, or general
- Difficulty
- Equipment
- Sets, reps, or time
- Frequency
- Common mistakes
- Execution tips
- YouTube link
- Favorite state
- Progress history

The initial library contains 120 built-in exercises. YouTube links should be real curated links where possible.

## Library Features

The library supports:

- Search
- Category filters
- Sport filters
- Difficulty filters
- Equipment filters
- Favorites filter
- Expandable exercise cards
- Exercise details view
- Add custom exercise
- Edit custom exercise

Built-in exercises can be viewed and favorited. User-created exercises can be edited.

## Weekly Planning

The user can define their training week:

- Swim days
- Bike days
- Run days
- Strength days
- Rest days
- Main focus per day
- Available time
- Injury or recovery focus
- Preferred exercise categories

Planning supports two modes:

- Manual planning: user chooses exercises and places them on days.
- Suggested planning: app suggests routines based on the user's swim, bike, run, strength, and rest schedule.

Manual planning is the default. Suggestions are optional.

## Daily And Weekly Routines

The app shows:

- Today's planned routine
- Weekly routine overview
- Planned exercises by day
- Completion status
- Skipped status
- Notes
- Pain level

Users can mark each exercise as completed or skipped.

## Progress Tracking

Progress tracking stores:

- Exercise id
- Date
- Completed or skipped
- Notes
- Pain level
- Routine or plan source

Progress screens show recent activity and weekly completion.

## UI Direction

The approved UI direction is clean and RTL/LTR-aware:

- English mode uses LTR.
- Hebrew mode uses RTL.
- Compact mobile layout.
- Expandable cards.
- Fast search and filters.
- Clean white and gray base.
- Sport color accents.
- Bottom navigation.
- Weekly planner easy to reach.

## Data Storage

Use local browser storage.

Recommended structure:

- Built-in exercise data ships with the app.
- User data is saved locally.
- User custom exercises are separate from built-in exercises.
- Progress logs are append-only records.
- Weekly plan is stored as structured data by weekday.

## Error Handling

The app should handle:

- Empty search results
- No favorites yet
- No weekly plan yet
- Invalid custom exercise form fields
- Missing optional YouTube link
- Local storage read/write failures

## Testing

Core tests should cover:

- Exercise filtering
- Search
- Favorites
- Add/edit custom exercise
- Weekly manual planning
- Suggested routine generation
- Progress logging
- Language direction switching
- PWA build

## Out Of Scope For First Version

- Real user accounts
- Cloud sync
- Payments
- Coach dashboard
- Social sharing
- Wearable integrations
- AI-generated plans
