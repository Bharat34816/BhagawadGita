import { useState } from 'react';
import { X, Sparkles, Send, Key, ExternalLink, Loader2, Quote, SunMedium } from 'lucide-react';
import type { GitaVerse, AIExplanationResponse } from '../types';
import { askGeminiMentor } from '../utils/ai';
import { saveStoredApiKey } from '../utils/storage';

interface AIMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  verse: GitaVerse;
  apiKey: string;
  onSaveApiKey: (key: string) => void;
}

export const AIMentorModal = ({
  isOpen,
  onClose,
  verse,
  apiKey,
  onSaveApiKey
}: AIMentorModalProps) => {
  const [currentKey, setCurrentKey] = useState(apiKey);
  const [showKeyInput, setShowKeyInput] = useState(!apiKey);
  const [userQuestion, setUserQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<AIExplanationResponse | null>(null);

  if (!isOpen) return null;

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredApiKey(currentKey);
    onSaveApiKey(currentKey);
    setShowKeyInput(false);
  };

  const handleAskMentor = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentKey.trim()) {
      setShowKeyInput(true);
      setError('Please add your Gemini API Key first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await askGeminiMentor(currentKey, verse, userQuestion.trim() || undefined);
      setAiResponse(response);
    } catch (err: any) {
      setError(err.message || 'Failed to generate guidance. Please verify your API key.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 text-white shadow-md shadow-amber-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-stone-900 dark:text-stone-100">
              AI Spiritual Coach & Mentor
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              Personalized guidance on Chapter {verse.chapter}, Verse {verse.verse} powered by Google Gemini
            </p>
          </div>
        </div>

        {/* API Key management section */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-50/70 dark:bg-stone-950/70 border border-amber-200/80 dark:border-stone-800 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="font-semibold text-stone-800 dark:text-stone-200">
                {currentKey ? 'Gemini API Key Connected' : 'Google Gemini API Key Needed for Live AI'}
              </span>
            </div>
            <button
              onClick={() => setShowKeyInput(!showKeyInput)}
              className="text-amber-700 dark:text-amber-400 font-semibold hover:underline"
            >
              {showKeyInput ? 'Hide' : currentKey ? 'Change Key' : 'Add Key'}
            </button>
          </div>

          {showKeyInput && (
            <form onSubmit={handleSaveKey} className="mt-3 space-y-2">
              <input
                type="password"
                placeholder="Enter AI Studio API Key (AIzaSy...)"
                value={currentKey}
                onChange={(e) => setCurrentKey(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <div className="flex items-center justify-between pt-1">
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-500 hover:text-amber-600 flex items-center gap-1 text-[11px]"
                >
                  Get a free Gemini API key <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs"
                >
                  Save Key
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Question Form */}
        <form onSubmit={handleAskMentor} className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
              Ask your personal question or challenge (optional):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                placeholder="E.g., How do I apply this to overcome anxiety before tomorrow's presentation?"
                className="flex-1 px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-amber-600/20"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Ask</span>
              </button>
            </div>
          </div>
        </form>

        {/* Error message */}
        {error && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs mb-4">
            {error}
          </div>
        )}

        {/* AI Output Card */}
        {aiResponse && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            {/* Custom Insight */}
            <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-stone-950 border border-amber-200 dark:border-stone-800 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                <Quote className="w-3.5 h-3.5" />
                <span>Deep Psychological Insight</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                {aiResponse.customInsight}
              </p>
            </div>

            {/* Coach Advice */}
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-950/80 border border-stone-200 dark:border-stone-800 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mentor's Actionable Guidance</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed whitespace-pre-wrap">
                {aiResponse.personalCoachAdvice}
              </p>
            </div>

            {/* Morning Affirmation */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-200 dark:border-orange-900/40 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-orange-800 dark:text-orange-400 uppercase tracking-wider">
                <SunMedium className="w-3.5 h-3.5" />
                <span>Today's Anchor Affirmation</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100 italic">
                "{aiResponse.morningAffirmation}"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
