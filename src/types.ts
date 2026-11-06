export type PersonalityTheme =
  | 'Action without Anxiety (Karma Yoga)'
  | 'Mind Mastery & Focus'
  | 'Emotional Equilibrium & Calmness'
  | 'Inner Strength & Self-Confidence'
  | 'Ego & Relationship Mastery'
  | 'Purpose & Self-Actualization';

export interface MindsetShift {
  limitingBelief: string;
  empoweredMindset: string;
}

export interface WordMeaning {
  word: string;
  meaning: string;
}

export interface PersonalityBreakdown {
  simpleMeaning: string;
  wordByWord: WordMeaning[];
  realLifeStory: string;
  coreInsight: string;
  modernLifeApplication: string;
  mindsetShift: MindsetShift;
  actionableChallenge: string;
  journalPrompt: string;
}

export interface GitaVerse {
  id: string;
  chapter: number;
  verse: number;
  chapterTitle: string;
  sanskrit: string;
  transliteration: string;
  englishTranslation: string;
  personalityTheme: PersonalityTheme;
  personalityBreakdown: PersonalityBreakdown;
  keyQualities: string[];
}

export interface JournalEntry {
  id: string;
  verseId: string;
  date: string; // ISO date string YYYY-MM-DD
  verseRef: string;
  prompt: string;
  reflectionText: string;
  actionCompleted: boolean;
  moodRating: number; // 1 to 5
}

export interface UserStats {
  currentStreak: number;
  lastActiveDate: string;
  totalReflections: number;
  favoriteVerses: string[]; // verse ids
  completedChallenges: string[]; // verse ids
}

export interface AIExplanationResponse {
  customInsight: string;
  personalCoachAdvice: string;
  morningAffirmation: string;
}
