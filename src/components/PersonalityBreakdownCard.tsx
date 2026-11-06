import { Target, Zap, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, BookA, HeartHandshake, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { GitaVerse } from '../types';

interface PersonalityBreakdownCardProps {
  verse: GitaVerse;
  isChallengeCompleted: boolean;
  onToggleChallenge: () => void;
  onOpenAiMentor: () => void;
}

export const PersonalityBreakdownCard = ({
  verse,
  isChallengeCompleted,
  onToggleChallenge,
  onOpenAiMentor
}: PersonalityBreakdownCardProps) => {
  const { personalityBreakdown, keyQualities } = verse;

  const handleChallengeClick = () => {
    if (!isChallengeCompleted) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#f59e0b', '#d97706', '#10b981', '#6366f1']
      });
    }
    onToggleChallenge();
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>Simple Explanation & Personality Blueprint</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            No heavy words — just practical wisdom you can immediately use today
          </p>
        </div>

        {/* AI Mentor CTA */}
        <button
          onClick={onOpenAiMentor}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 hover:bg-amber-500/20 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Ask AI Coach a Question</span>
        </button>
      </div>

      {/* 1. Core Simple Meaning (The Big Picture in Plain English) */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-amber-500/5 dark:from-amber-950/40 dark:via-stone-900 dark:to-stone-950 border border-amber-300/80 dark:border-amber-700/60 shadow-md">
        <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-sm uppercase tracking-wider mb-2">
          <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <span>In Plain & Simple Words</span>
        </div>
        <p className="text-stone-800 dark:text-stone-100 text-base sm:text-lg leading-relaxed font-medium">
          "{personalityBreakdown.simpleMeaning}"
        </p>

        {/* Virtues tags */}
        <div className="mt-4 pt-3 border-t border-amber-200/60 dark:border-amber-900/50 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">Personality strengths you build:</span>
          {keyQualities.map((trait) => (
            <span
              key={trait}
              className="text-xs px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-stone-800 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-stone-700 shadow-sm font-medium"
            >
              ✓ {trait}
            </span>
          ))}
        </div>
      </div>

      {/* 2. Word-by-Word Sanskrit Breakdown */}
      {personalityBreakdown.wordByWord && personalityBreakdown.wordByWord.length > 0 && (
        <div className="p-6 rounded-3xl bg-white/90 dark:bg-stone-900/90 border border-stone-200/90 dark:border-stone-800 shadow-sm">
          <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200 font-bold text-sm uppercase tracking-wider mb-4">
            <BookA className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Word-by-Word Meaning (Easy Translation)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {personalityBreakdown.wordByWord.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-amber-50/50 dark:bg-stone-950/60 border border-amber-200/60 dark:border-stone-800 flex items-start gap-2.5"
              >
                <span className="w-6 h-6 rounded-full bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div>
                  <div className="text-xs font-bold text-amber-900 dark:text-amber-300 font-sanskrit">
                    {item.word}
                  </div>
                  <div className="text-xs text-stone-700 dark:text-stone-300 font-medium">
                    = {item.meaning}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Everyday Real-Life Story / Example */}
      {personalityBreakdown.realLifeStory && (
        <div className="p-6 rounded-3xl bg-white/90 dark:bg-stone-900/90 border border-stone-200/90 dark:border-stone-800 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-sm uppercase tracking-wider mb-3">
            <HeartHandshake className="w-4 h-4" />
            <span>Real-Life Relatable Example</span>
          </div>
          <p className="text-stone-700 dark:text-stone-200 text-sm sm:text-base leading-relaxed">
            {personalityBreakdown.realLifeStory}
          </p>
        </div>
      )}

      {/* 4. Why it Matters & How to Apply it */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Core Lesson */}
        <div className="p-5 rounded-2xl bg-white/90 dark:bg-stone-900/90 border border-stone-200/90 dark:border-stone-800 shadow-sm">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-semibold text-sm mb-2">
            <Target className="w-4 h-4" />
            <span>Why This Matters For Your Mind</span>
          </div>
          <p className="text-stone-700 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
            {personalityBreakdown.coreInsight}
          </p>
        </div>

        {/* Practical Application */}
        <div className="p-5 rounded-2xl bg-white/90 dark:bg-stone-900/90 border border-stone-200/90 dark:border-stone-800 shadow-sm">
          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-semibold text-sm mb-2">
            <Sparkles className="w-4 h-4" />
            <span>How to Practice This in Daily Life</span>
          </div>
          <p className="text-stone-700 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
            {personalityBreakdown.modernLifeApplication}
          </p>
        </div>
      </div>

      {/* 5. Mindset Shift: Stop Thinking vs Start Thinking */}
      <div className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 p-6 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-4 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>Mindset Shift: Change Your Self-Talk</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Old Thought */}
          <div className="p-4 rounded-2xl bg-red-50/70 dark:bg-red-950/20 border border-red-200/70 dark:border-red-900/40">
            <span className="text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-wide block mb-1">
              ❌ The Weak / Stressful Way of Thinking
            </span>
            <p className="text-xs sm:text-sm text-red-900/90 dark:text-red-200/90 leading-relaxed font-normal">
              "{personalityBreakdown.mindsetShift.limitingBelief}"
            </p>
          </div>

          {/* New Thought */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide flex items-center gap-1 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              ✅ The Strong / Gita Way of Thinking
            </span>
            <p className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 leading-relaxed font-medium">
              "{personalityBreakdown.mindsetShift.empoweredMindset}"
            </p>
          </div>
        </div>
      </div>

      {/* 6. Today's Action Challenge */}
      <div className={`rounded-3xl border transition-all p-6 shadow-sm ${
        isChallengeCompleted
          ? 'bg-emerald-50/90 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
          : 'bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/5 border-amber-300 dark:border-amber-800/60'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={`p-2.5 rounded-2xl ${
              isChallengeCompleted 
                ? 'bg-emerald-600 text-white' 
                : 'bg-amber-600 text-white'
            }`}>
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  Today's Practice Challenge
                </span>
                {isChallengeCompleted && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                    Done Today! 🎉
                  </span>
                )}
              </div>
              <p className="text-sm sm:text-base font-semibold text-stone-800 dark:text-stone-100 mt-1">
                {personalityBreakdown.actionableChallenge}
              </p>
            </div>
          </div>

          <button
            onClick={handleChallengeClick}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm shrink-0 ${
              isChallengeCompleted
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                : 'bg-stone-900 hover:bg-black dark:bg-amber-600 dark:hover:bg-amber-500 text-white shadow-md'
            }`}
          >
            {isChallengeCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Done for Today
              </>
            ) : (
              <>
                Mark as Completed
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
