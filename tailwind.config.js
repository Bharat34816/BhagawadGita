/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff9ed',
          100: '#ffefd4',
          200: '#fedba9',
          300: '#fdc073',
          400: '#fb9c3b',
          500: '#f97e12',
          600: '#ea6108',
          700: '#c24609',
          800: '#9a360f',
          900: '#7c2e10',
          950: '#431405',
        },
        sacred: {
          dark: '#0f172a',
          card: '#1e293b',
          accent: '#eab308'
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sanskrit: ['"Martel"', '"Noto Serif Devanagari"', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
