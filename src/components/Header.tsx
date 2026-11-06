import { Flame, Sparkles, Sun, Moon, Bookmark, Key, BookOpen } from 'lucide-react';
import type { UserStats } from '../types';

interface HeaderProps {
  stats: UserStats;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenAiSettings: () => void;
  onOpenFavorites: () => void;
  onOpenCatalog: () => void;
  hasApiKey: boolean;
}

export const Header = ({
  stats,
  isDark,
  onToggleTheme,
  onOpenAiSettings,
  onOpenFavorites,
  onOpenCatalog,
  hasApiKey
}: HeaderProps) => {
  return (
    <header className="border-b border-amber-200/60 dark:border-stone-800 bg-amber-50/70 dark:bg-stone-900/80 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-5xl mx-auto px-4 py-3 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white shadow-md shadow-amber-500/20 text-xl font-bold">
            🕉️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel font-bold text-xl sm:text-2xl tracking-wide bg-gradient-to-r from-amber-700 via-amber-600 to-amber-900 dark:from-amber-300 dark:to-amber-500 bg-clip-text text-transparent">
                GitaMind
              </span>
              <span className="hidden sm:inline-block text-[11px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/50">
                Daily Self-Mastery
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 hidden sm:block">
              Ancient Psychological Wisdom for Modern Personality Growth
            </p>
          </div>
        </div>

        {/* Actions & Stats */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Daily Streak */}
          <div 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100/90 text-orange-900 dark:bg-orange-950/50 dark:text-orange-300 border border-orange-300/60 dark:border-orange-800/60 text-xs font-semibold shadow-sm"
            title={`${stats.currentStreak} day streak of self-improvement`}
          >
            <Flame className="w-4 h-4 text-orange-600 dark:text-orange-400 animate-pulse fill-orange-500" />
            <span>{stats.currentStreak}d Streak</span>
          </div>

          {/* Catalog Button */}
          <button
            onClick={onOpenCatalog}
            className="p-2 rounded-lg text-stone-600 hover:text-amber-700 hover:bg-amber-100/60 dark:text-stone-300 dark:hover:text-amber-400 dark:hover:bg-stone-800 transition-colors"
            title="Browse all wisdom verses"
            aria-label="All verses"
          >
            <BookOpen className="w-5 h-5" />
          </button>

          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2 rounded-lg text-stone-600 hover:text-amber-700 hover:bg-amber-100/60 dark:text-stone-300 dark:hover:text-amber-400 dark:hover:bg-stone-800 transition-colors"
            title="Saved Verses"
            aria-label="Saved verses"
          >
            <Bookmark className="w-5 h-5" />
            {stats.favoriteVerses.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-600 text-[10px] text-white font-bold flex items-center justify-center">
                {stats.favoriteVerses.length}
              </span>
            )}
          </button>

          {/* AI Settings Button */}
          <button
            onClick={onOpenAiSettings}
            className={`p-2 rounded-lg flex items-center gap-1 transition-colors ${
              hasApiKey 
                ? 'text-amber-600 bg-amber-100/60 dark:bg-amber-950/40 dark:text-amber-400' 
                : 'text-stone-600 hover:text-amber-700 hover:bg-amber-100/60 dark:text-stone-300 dark:hover:text-amber-400 dark:hover:bg-stone-800'
            }`}
            title={hasApiKey ? 'Gemini AI Coach Active' : 'Configure AI Spiritual Mentor'}
          >
            <Sparkles className="w-5 h-5" />
            <Key className="w-3 h-3 -ml-1 text-stone-400 dark:text-stone-500" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-stone-600 hover:text-amber-700 hover:bg-amber-100/60 dark:text-stone-300 dark:hover:text-amber-400 dark:hover:bg-stone-800 transition-colors"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
