# 🪷 GitaMind: Daily Bhagavad Gita Wisdom for Personality Mastery

**GitaMind** is a spiritual-psychological web application designed to turn the timeless wisdom of the Bhagavad Gita into actionable daily habits, cognitive reframing, emotional resilience, and character development.

---

## 🌟 Key Features

1. **Daily Shloka of the Day (Automated & Deterministic)**
   - Automatically serves a unique shloka every day based on the calendar date.
   - Sanskrit text in clear Devanagari script.
   - Romanized transliteration for easy chanting and pronunciation.
   - Lucid English translation.
   - Web Speech recitation (listen to the verse anytime).

2. **Personality Development Blueprint**
   - **Core Psychological Principle**: Connects ancient philosophy to modern behavioral science.
   - **Modern Life & Workplace Application**: Concrete advice for professional life, handling stress, exams, and relationships.
   - **Mindset Shift (Rewiring Limiting Beliefs)**: Side-by-side contrast between common mental traps (e.g., performance anxiety, imposter syndrome) and the Gita's empowered mental models.
   - **Today's Action Challenge**: A daily micro-habit to practice mental strength, with celebratory confetti!

3. **Daily Introspection Journal**
   - Verse-specific self-inquiry questions.
   - Mood selector (Calm 😌, Mindful 🧘, Inspired ⚡, Resolute 🦁, Grateful 🙏).
   - Saved locally with date stamps so your personal reflections and streak remain private and persistent.

4. **Curated Personality Dimensions**
   - ⚡ **Action without Anxiety (Karma Yoga)**: Overcoming procrastination, fear of failure, and outcome obsession.
   - 🧠 **Mind Mastery & Focus**: Taming mental distractions, social media dopamine traps, and impulse control.
   - 🧘 **Emotional Equilibrium & Calmness (Sthitaprajna)**: Antifragility amidst criticism, praise, joy, and sorrow.
   - 🦁 **Inner Strength & Self-Confidence**: Building self-validation and enduring constructive discomfort (*Titiksha*).
   - 🤝 **Ego & Relationship Mastery**: Developing humility, compassion, and emotional sovereignty.
   - 🌟 **Purpose & Self-Actualization (Swadharma)**: Curing the comparison trap and honoring your authentic calling.

5. **AI Spiritual Mentor (Optional Google Gemini Integration)**
   - Click **"Ask AI Coach for Advice"** to ask custom personal questions on any verse.
   - Connect your free Google AI Studio API key (stored safely in your local browser).
   - Generates personalized psychological insights, step-by-step coaching, and a custom morning affirmation.

6. **Daily Streaks & Bookmarks**
   - Streak tracking to encourage consistent daily reflection.
   - Bookmark your favorite verses to review whenever you need clarity.

---

## 🚀 Running the Application

### 1. Start the Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 2. Build for Production
```bash
npm run build
```
Creates an optimized static production build in the `dist/` directory, ready to deploy to Vercel, Netlify, or GitHub Pages.

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide Icons
- **Speech**: Native Web Speech API (zero external network latency)
- **Effects**: Canvas Confetti
- **Storage**: Browser LocalStorage (100% private, no backend server needed)
