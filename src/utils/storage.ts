import type { JournalEntry, UserStats } from '../types';

const STATS_KEY = 'gitamind_user_stats';
const JOURNAL_KEY = 'gitamind_journal_entries';
const API_KEY_STORAGE = 'gitamind_gemini_api_key';

export function getStoredApiKey(): string {
  try {
    return localStorage.getItem(API_KEY_STORAGE) || '';
  } catch {
    return '';
  }
}

export function saveStoredApiKey(apiKey: string): void {
  try {
    if (apiKey.trim()) {
      localStorage.setItem(API_KEY_STORAGE, apiKey.trim());
    } else {
      localStorage.removeItem(API_KEY_STORAGE);
    }
  } catch (e) {
    console.error('Error saving API key:', e);
  }
}

export function getUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) {
      return {
        currentStreak: 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
        totalReflections: 0,
        favoriteVerses: [],
        completedChallenges: []
      };
    }
    return JSON.parse(raw);
  } catch {
    return {
      currentStreak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      totalReflections: 0,
      favoriteVerses: [],
      completedChallenges: []
    };
  }
}

export function saveUserStats(stats: UserStats): void {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Error saving stats:', e);
  }
}

export function updateDailyStreak(): UserStats {
  const stats = getUserStats();
  const today = new Date().toISOString().split('T')[0];

  if (!stats.lastActiveDate) {
    stats.lastActiveDate = today;
    stats.currentStreak = 1;
    saveUserStats(stats);
    return stats;
  }

  if (stats.lastActiveDate === today) {
    // Already logged today
    return stats;
  }

  const lastDate = new Date(stats.lastActiveDate);
  const currentDate = new Date(today);
  const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    // Consecutive day
    stats.currentStreak += 1;
  } else if (diffDays > 1) {
    // Missed a day
    stats.currentStreak = 1;
  }

  stats.lastActiveDate = today;
  saveUserStats(stats);
  return stats;
}

export function getJournalEntries(): JournalEntry[] {
  try {
    const raw = localStorage.getItem(JOURNAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveJournalEntry(entry: JournalEntry): JournalEntry[] {
  try {
    const entries = getJournalEntries();
    // If entry for today and same verse already exists, update it, else prepend
    const existingIndex = entries.findIndex(e => e.date === entry.date && e.verseId === entry.verseId);
    if (existingIndex >= 0) {
      entries[existingIndex] = entry;
    } else {
      entries.unshift(entry);
    }
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));

    // Update stats reflection count
    const stats = getUserStats();
    stats.totalReflections = entries.length;
    saveUserStats(stats);

    return entries;
  } catch (e) {
    console.error('Error saving journal:', e);
    return getJournalEntries();
  }
}

export function toggleFavoriteVerse(verseId: string): boolean {
  const stats = getUserStats();
  const exists = stats.favoriteVerses.includes(verseId);
  if (exists) {
    stats.favoriteVerses = stats.favoriteVerses.filter(id => id !== verseId);
  } else {
    stats.favoriteVerses.push(verseId);
  }
  saveUserStats(stats);
  return !exists;
}

export function toggleChallengeCompletion(verseId: string): boolean {
  const stats = getUserStats();
  const exists = stats.completedChallenges.includes(verseId);
  if (exists) {
    stats.completedChallenges = stats.completedChallenges.filter(id => id !== verseId);
  } else {
    stats.completedChallenges.push(verseId);
  }
  saveUserStats(stats);
  return !exists;
}
