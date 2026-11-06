import { useState } from 'react';
import { Volume2, VolumeX, Copy, Check, Bookmark, Shuffle, Calendar, Share2 } from 'lucide-react';
import type { GitaVerse } from '../types';
import { speakText, stopSpeaking } from '../utils/speech';

interface VerseCardProps {
  verse: GitaVerse;
  isDaily: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onNextVerse: () => void;
  onResetToDaily: () => void;
}

export const VerseCard = ({
  verse,
  isDaily,
  isFavorite,
  onToggleFavorite,
  onNextVerse,
  onResetToDaily
}: VerseCardProps) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(true);

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      // Speak the transliteration first, then the translation
      const textToSpeak = `${verse.transliteration}. Meaning: ${verse.englishTranslation}`;
      speakText(textToSpeak, 'en-US', () => {
        setIsPlayingAudio(false);
      });
    }
  };

  const handleCopy = () => {
    const text = `📖 Bhagavad Gita Chapter ${verse.chapter}, Verse ${verse.verse}\n\n${verse.sanskrit}\n\n"${verse.englishTranslation}"\n\n🎯 Personality Lesson: ${verse.personalityBreakdown.coreInsight}\n\n✨ Shared via GitaMind`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Bhagavad Gita ${verse.chapter}.${verse.verse}`,
        text: `"${verse.englishTranslation}" - Ancient wisdom for modern personality growth.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-amber-50/90 to-amber-100/40 dark:from-stone-900/90 dark:to-stone-950/80 border border-amber-200/80 dark:border-amber-900/40 shadow-xl shadow-amber-900/5 backdrop-blur-sm p-6 sm:p-8 transition-all">
      {/* Decorative aura watermark */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-400/10 dark:bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-4 right-6 text-6xl opacity-5 select-none font-sanskrit text-amber-900 dark:text-amber-100 pointer-events-none">
        ॐ
      </div>

      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          {isDaily ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-600 text-white shadow-sm">
              <Calendar className="w-3.5 h-3.5" /> Shloka of the Day
            </span>
          ) : (
            <button
              onClick={onResetToDaily}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-200/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-amber-100 dark:hover:bg-amber-950/60 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" /> Back to Today's Shloka
            </button>
          )}

          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100/80 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50">
            BG {verse.chapter}.{verse.verse}
          </span>
        </div>

        {/* Personality Theme Tag */}
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
          🌱 {verse.personalityTheme}
        </span>
      </div>

      {/* Chapter Title */}
      <p className="text-xs uppercase tracking-widest font-semibold text-amber-700 dark:text-amber-400 mb-3">
        {verse.chapterTitle}
      </p>

      {/* Sanskrit Shloka */}
      <div className="my-6 text-center">
        <div className="font-sanskrit text-xl sm:text-2xl md:text-3xl leading-relaxed sm:leading-loose text-stone-900 dark:text-amber-100 font-semibold tracking-wide whitespace-pre-line drop-shadow-sm select-all">
          {verse.sanskrit}
        </div>
      </div>

      {/* Transliteration */}
      <div className="text-center mb-6">
        <button
          onClick={() => setShowTransliteration(!showTransliteration)}
          className="text-xs font-medium text-stone-400 hover:text-amber-600 dark:hover:text-amber-300 mb-1 inline-block transition-colors"
        >
          {showTransliteration ? 'Hide Transliteration' : 'Show Transliteration (Pronunciation)'}
        </button>

        {showTransliteration && (
          <p className="text-sm sm:text-base font-serif italic text-amber-800/90 dark:text-amber-200/80 whitespace-pre-line tracking-wide mt-1">
            {verse.transliteration}
          </p>
        )}
      </div>

      {/* English Translation */}
      <div className="relative p-5 rounded-2xl bg-white/70 dark:bg-stone-900/70 border border-amber-100 dark:border-stone-800 text-stone-800 dark:text-stone-200 text-base sm:text-lg leading-relaxed shadow-sm text-center font-normal">
        <span className="text-amber-500 font-serif text-2xl mr-1">“</span>
        {verse.englishTranslation}
        <span className="text-amber-500 font-serif text-2xl ml-1">”</span>
      </div>

      {/* Card Action Controls */}
      <div className="mt-6 pt-5 border-t border-amber-200/50 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Audio Speak */}
          <button
            onClick={handleToggleAudio}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm ${
              isPlayingAudio
                ? 'bg-amber-600 text-white animate-pulse'
                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-stone-750 border border-stone-200 dark:border-stone-700'
            }`}
            title="Listen to recitation and translation"
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-4 h-4" /> Stop Audio
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Listen
              </>
            )}
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-stone-750 border border-stone-200 dark:border-stone-700 transition-colors shadow-sm"
            title="Copy verse"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-stone-500" />
                <span>Copy</span>
              </>
            )}
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-stone-750 border border-stone-200 dark:border-stone-700 transition-colors shadow-sm"
            title="Share verse"
          >
            <Share2 className="w-4 h-4 text-stone-500" />
          </button>

          {/* Bookmark Button */}
          <button
            onClick={onToggleFavorite}
            className={`p-2 rounded-xl border transition-all shadow-sm ${
              isFavorite
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-amber-400'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Bookmark this verse'}
          >
            <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Explore another verse */}
        <button
          onClick={onNextVerse}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-md shadow-amber-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Shuffle className="w-4 h-4" /> Another Verse
        </button>
      </div>
    </div>
  );
};
