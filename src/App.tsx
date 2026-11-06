import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ThemeFilter } from './components/ThemeFilter';
import { VerseCard } from './components/VerseCard';
import { PersonalityBreakdownCard } from './components/PersonalityBreakdownCard';
import { ReflectionJournal } from './components/ReflectionJournal';
import { AIMentorModal } from './components/AIMentorModal';
import { FavoritesCatalogModal } from './components/FavoritesCatalogModal';
import { GITA_VERSES, getDailyVerse } from './data/verses';
import type { GitaVerse, UserStats } from './types';
import {
  getUserStats,
  updateDailyStreak,
  toggleFavoriteVerse,
  toggleChallengeCompletion,
  getStoredApiKey
} from './utils/storage';

export function App() {
  const dailyVerse = getDailyVerse();
  const [currentVerse, setCurrentVerse] = useState<GitaVerse>(dailyVerse);
  const [selectedTheme, setSelectedTheme] = useState<string>('All Themes');
  const [stats, setStats] = useState<UserStats>(getUserStats());
  const [apiKey, setApiKey] = useState<string>(getStoredApiKey());
  
  // Theme state (dark / light)
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('gitamind_dark_mode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Modals state
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [catalogInitialTab, setCatalogInitialTab] = useState<'favorites' | 'catalog'>('catalog');

  // Sync dark mode class with HTML tag
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('gitamind_dark_mode', String(isDark));
  }, [isDark]);

  // Update daily streak on initial load
  useEffect(() => {
    const updated = updateDailyStreak();
    setStats(updated);
  }, []);

  const handleToggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleToggleFavorite = () => {
    toggleFavoriteVerse(currentVerse.id);
    setStats(getUserStats());
  };

  const handleToggleChallenge = () => {
    toggleChallengeCompletion(currentVerse.id);
    setStats(getUserStats());
  };

  const handleNextVerse = () => {
    const pool = selectedTheme === 'All Themes'
      ? GITA_VERSES
      : GITA_VERSES.filter(v => v.personalityTheme === selectedTheme);
    
    // Choose random verse different from current, or first if pool has 1
    const available = pool.filter(v => v.id !== currentVerse.id);
    if (available.length > 0) {
      const randomIndex = Math.floor(Math.random() * available.length);
      setCurrentVerse(available[randomIndex]);
    } else if (pool.length > 0) {
      setCurrentVerse(pool[0]);
    }
  };

  const handleSelectTheme = (theme: string) => {
    setSelectedTheme(theme);
    if (theme !== 'All Themes') {
      const match = GITA_VERSES.find(v => v.personalityTheme === theme);
      if (match) {
        setCurrentVerse(match);
      }
    }
  };

  const handleResetToDaily = () => {
    setCurrentVerse(dailyVerse);
    setSelectedTheme('All Themes');
  };

  const isFavorite = stats.favoriteVerses.includes(currentVerse.id);
  const isChallengeCompleted = stats.completedChallenges.includes(currentVerse.id);
  const isDaily = currentVerse.id === dailyVerse.id;

  return (
    <div className="min-h-screen spiritual-radial-glow flex flex-col transition-colors duration-300">
      {/* Navigation Bar */}
      <Header
        stats={stats}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onOpenAiSettings={() => setIsAiModalOpen(true)}
        onOpenFavorites={() => {
          setCatalogInitialTab('favorites');
          setIsCatalogOpen(true);
        }}
        onOpenCatalog={() => {
          setCatalogInitialTab('catalog');
          setIsCatalogOpen(true);
        }}
        hasApiKey={Boolean(apiKey)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 sm:px-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Personality Goal Filter */}
        <section aria-label="Personality Goal Categories">
          <ThemeFilter
            selectedTheme={selectedTheme}
            onSelectTheme={handleSelectTheme}
          />
        </section>

        {/* Shloka Presentation Card */}
        <section aria-label="Bhagavad Gita Shloka of the Day">
          <VerseCard
            verse={currentVerse}
            isDaily={isDaily}
            isFavorite={isFavorite}
            onToggleFavorite={handleToggleFavorite}
            onNextVerse={handleNextVerse}
            onResetToDaily={handleResetToDaily}
          />
        </section>

        {/* Personality Development & Psychological Blueprint */}
        <section aria-label="Personality Development Breakdown">
          <PersonalityBreakdownCard
            verse={currentVerse}
            isChallengeCompleted={isChallengeCompleted}
            onToggleChallenge={handleToggleChallenge}
            onOpenAiMentor={() => setIsAiModalOpen(true)}
          />
        </section>

        {/* Daily Introspection & Reflection Journal */}
        <section aria-label="Introspection Journal">
          <ReflectionJournal
            verse={currentVerse}
            onEntrySaved={() => setStats(getUserStats())}
          />
        </section>
      </main>

      {/* Soulful Footer */}
      <footer className="border-t border-amber-200/50 dark:border-stone-800 bg-white/40 dark:bg-stone-900/40 backdrop-blur-sm py-8 px-4 text-center text-xs text-stone-500 dark:text-stone-400 mt-12 transition-colors">
        <div className="max-w-2xl mx-auto space-y-2">
          <p className="font-sanskrit text-sm text-amber-800 dark:text-amber-300 font-semibold tracking-wide">
            योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।
          </p>
          <p className="italic text-[11px] text-stone-400">
            "Be steadfast in yoga, O Arjuna. Perform your duties without selfish attachment."
          </p>
          <div className="pt-2 text-[11px] text-stone-400 dark:text-stone-500">
            GitaMind • Built for everyday personal mastery, mental resilience, and conscious living.
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AIMentorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        verse={currentVerse}
        apiKey={apiKey}
        onSaveApiKey={(key) => setApiKey(key)}
      />

      <FavoritesCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        onSelectVerse={(v) => setCurrentVerse(v)}
        currentVerseId={currentVerse.id}
        favoriteIds={stats.favoriteVerses}
        initialTab={catalogInitialTab}
      />
    </div>
  );
}

export default App;
