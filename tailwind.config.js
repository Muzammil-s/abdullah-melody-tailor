/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#0a0b0d',
          900: '#0e1013',
          850: '#111419',
          800: '#14171d',
          750: '#181d24',
          700: '#1c212a',
          600: '#262d3a',
          500: '#343c4d'
        },
        ivory: {
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#ebe3d5',
          300: '#ded2be'
        },
        champagne: {
          300: '#ebd8a7',
          400: '#dfc68b',
          500: '#c8a96a',
          600: '#b08f4c',
          700: '#8f7236'
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      }
    },
  },
  plugins: [],
}
