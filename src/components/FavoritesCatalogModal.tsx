import { useState } from 'react';
import { X, Search, Bookmark, BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import type { GitaVerse } from '../types';
import { GITA_VERSES } from '../data/verses';

interface FavoritesCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVerse: (verse: GitaVerse) => void;
  currentVerseId: string;
  favoriteIds: string[];
  initialTab?: 'favorites' | 'catalog';
}

export const FavoritesCatalogModal = ({
  isOpen,
  onClose,
  onSelectVerse,
  currentVerseId,
  favoriteIds,
  initialTab = 'catalog'
}: FavoritesCatalogModalProps) => {
  const [activeTab, setActiveTab] = useState<'favorites' | 'catalog'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const favoriteVerses = GITA_VERSES.filter((v) => favoriteIds.includes(v.id));

  const filteredVerses = (activeTab === 'favorites' ? favoriteVerses : GITA_VERSES).filter((v) => {
    const q = searchQuery.toLowerCase();
    return (
      v.englishTranslation.toLowerCase().includes(q) ||
      v.chapterTitle.toLowerCase().includes(q) ||
      v.personalityTheme.toLowerCase().includes(q) ||
      v.transliteration.toLowerCase().includes(q) ||
      v.personalityBreakdown.coreInsight.toLowerCase().includes(q) ||
      `bg ${v.chapter}.${v.verse}`.includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl w-full max-w-3xl max-h-[88vh] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300">
              {activeTab === 'favorites' ? <Bookmark className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-xl font-bold font-cinzel text-stone-900 dark:text-stone-100">
                {activeTab === 'favorites' ? 'Your Saved Verses' : 'Gita Wisdom Treasury'}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {activeTab === 'favorites'
                  ? `${favoriteVerses.length} verses bookmarked for personality refinement`
                  : 'Timeless verses specifically indexed for personality mastery'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher & Search */}
        <div className="px-6 py-3 bg-stone-50 dark:bg-stone-950/50 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'catalog'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              All Verses ({GITA_VERSES.length})
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'favorites'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              Saved ({favoriteVerses.length})
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search by topic, keyword, or BG chapter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Verses List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {filteredVerses.length === 0 ? (
            <div className="text-center py-12">
              <Sparkles className="w-10 h-10 text-stone-300 dark:text-stone-700 mx-auto mb-2" />
              <p className="text-stone-500 dark:text-stone-400 text-sm">
                {activeTab === 'favorites'
                  ? 'No saved verses yet. Click the bookmark icon on any verse to save it here!'
                  : 'No verses match your search query.'}
              </p>
            </div>
          ) : (
            filteredVerses.map((v) => {
              const isCurrent = v.id === currentVerseId;
              return (
                <div
                  key={v.id}
                  onClick={() => {
                    onSelectVerse(v);
                    onClose();
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group ${
                    isCurrent
                      ? 'bg-amber-50/90 dark:bg-amber-950/30 border-amber-400 dark:border-amber-700'
                      : 'bg-white dark:bg-stone-850 hover:bg-amber-50/50 dark:hover:bg-stone-800/80 border-stone-200 dark:border-stone-800 hover:border-amber-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-amber-700 dark:text-amber-400">
                        BG {v.chapter}.{v.verse}
                      </span>
                      <span className="text-[11px] text-stone-400 dark:text-stone-500">•</span>
                      <span className="text-xs font-semibold text-stone-600 dark:text-stone-300">
                        {v.chapterTitle}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                        {v.personalityTheme}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 line-clamp-2 italic font-serif">
                      "{v.englishTranslation}"
                    </p>

                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
                      💡 {v.personalityBreakdown.coreInsight}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {isCurrent ? (
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400 px-3 py-1 bg-amber-100 dark:bg-amber-950/60 rounded-full">
                        Reading Now
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-stone-400 group-hover:text-amber-600 flex items-center gap-1 transition-colors">
                        Study Verse <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
