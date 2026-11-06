import { PERSONALITY_THEMES } from '../data/verses';

interface ThemeFilterProps {
  selectedTheme: string;
  onSelectTheme: (theme: string) => void;
}

export const ThemeFilter = ({
  selectedTheme,
  onSelectTheme
}: ThemeFilterProps) => {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none py-1">
      <div className="flex items-center gap-2 min-w-max px-1">
        <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mr-1">
          Personality Goal:
        </span>
        {PERSONALITY_THEMES.map((theme) => {
          const isSelected = selectedTheme === theme;
          return (
            <button
              key={theme}
              onClick={() => onSelectTheme(theme)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                isSelected
                  ? 'bg-amber-600 text-white border-amber-600 shadow-sm shadow-amber-600/30'
                  : 'bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-600 hover:text-amber-700 dark:hover:text-amber-300'
              }`}
            >
              {theme}
            </button>
          );
        })}
      </div>
    </div>
  );
};
