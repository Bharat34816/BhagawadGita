import { useState, useEffect } from 'react';
import { PenLine, Save, Check, Calendar, History, ChevronDown, ChevronUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { GitaVerse, JournalEntry } from '../types';
import { getJournalEntries, saveJournalEntry } from '../utils/storage';

interface ReflectionJournalProps {
  verse: GitaVerse;
  onEntrySaved: () => void;
}

const MOODS = [
  { value: 1, label: 'Calm', emoji: '😌' },
  { value: 2, label: 'Mindful', emoji: '🧘' },
  { value: 3, label: 'Inspired', emoji: '⚡' },
  { value: 4, label: 'Resolute', emoji: '🦁' },
  { value: 5, label: 'Grateful', emoji: '🙏' },
];

export const ReflectionJournal = ({
  verse,
  onEntrySaved
}: ReflectionJournalProps) => {
  const [reflectionText, setReflectionText] = useState('');
  const [selectedMood, setSelectedMood] = useState(2);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  const today = new Date().toISOString().split('T')[0];

  // Load existing reflection for this verse/today if present
  useEffect(() => {
    const all = getJournalEntries();
    setEntries(all);
    const existing = all.find(e => e.date === today && e.verseId === verse.id);
    if (existing) {
      setReflectionText(existing.reflectionText);
      setSelectedMood(existing.moodRating);
    } else {
      setReflectionText('');
    }
  }, [verse.id, today]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionText.trim()) return;

    const newEntry: JournalEntry = {
      id: `${verse.id}-${today}`,
      verseId: verse.id,
      date: today,
      verseRef: `BG ${verse.chapter}.${verse.verse}`,
      prompt: verse.personalityBreakdown.journalPrompt,
      reflectionText: reflectionText.trim(),
      actionCompleted: true,
      moodRating: selectedMood,
    };

    const updated = saveJournalEntry(newEntry);
    setEntries(updated);
    setSavedSuccess(true);
    onEntrySaved();

    confetti({
      particleCount: 50,
      spread: 45,
      origin: { y: 0.8 },
      colors: ['#f59e0b', '#10b981']
    });

    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="rounded-3xl bg-white/90 dark:bg-stone-900/90 border border-stone-200/90 dark:border-stone-800 shadow-xl shadow-stone-900/5 p-6 sm:p-8 backdrop-blur-sm transition-all">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300">
            <PenLine className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold font-cinzel text-stone-900 dark:text-stone-100">
              Daily Introspection Journal
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Transform philosophical wisdom into permanent neural habits
            </p>
          </div>
        </div>

        {/* History toggle */}
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors border border-stone-200 dark:border-stone-700"
        >
          <History className="w-3.5 h-3.5" />
          <span>Past Entries ({entries.length})</span>
          {showHistory ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Verse Reflection Prompt */}
      <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 mb-5">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 block mb-1">
          Today's Self-Inquiry Question
        </span>
        <p className="text-sm sm:text-base font-medium text-stone-800 dark:text-stone-200 leading-relaxed italic">
          "{verse.personalityBreakdown.journalPrompt}"
        </p>
      </div>

      {/* Journal Entry Form */}
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-2">
            Your Inner Reflection & Application Today:
          </label>
          <textarea
            rows={4}
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            placeholder="Write your raw thoughts here... E.g., 'Today I noticed myself feeling anxious before the team review. Instead of obsessing over praise, I reminded myself of BG 2.47 and focused entirely on providing clear value...'"
            className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-950/70 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all resize-y"
          />
        </div>

        {/* Mood Selector & Submit */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
              State of Mind:
            </span>
            <div className="flex items-center gap-1">
              {MOODS.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setSelectedMood(m.value)}
                  className={`px-2.5 py-1 rounded-xl text-xs flex items-center gap-1 transition-all ${
                    selectedMood === m.value
                      ? 'bg-amber-500 text-white font-bold shadow-sm scale-105'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                  }`}
                  title={m.label}
                >
                  <span>{m.emoji}</span>
                  <span className="hidden sm:inline">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!reflectionText.trim()}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md ${
              savedSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white shadow-amber-600/20'
            }`}
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                Reflection Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Reflection
              </>
            )}
          </button>
        </div>
      </form>

      {/* Past Entries Drawer */}
      {showHistory && (
        <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Journal History ({entries.length} reflections)
          </h4>

          {entries.length === 0 ? (
            <p className="text-xs text-stone-400 italic py-2">
              No journal reflections yet. Write your first reflection above to start your journey!
            </p>
          ) : (
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {entries.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200/70 dark:border-stone-800 text-left text-xs sm:text-sm space-y-1.5"
                >
                  <div className="flex items-center justify-between text-stone-400 text-xs">
                    <span className="flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date} • {item.verseRef}
                    </span>
                    <span>
                      {MOODS.find(m => m.value === item.moodRating)?.emoji}{' '}
                      {MOODS.find(m => m.value === item.moodRating)?.label}
                    </span>
                  </div>
                  <p className="text-stone-800 dark:text-stone-200 whitespace-pre-wrap leading-relaxed">
                    {item.reflectionText}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
