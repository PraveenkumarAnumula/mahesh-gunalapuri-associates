/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0A1529',
          900: '#0F1F3C',
          800: '#172B50',
          700: '#22406F',
          600: '#365687',
          100: '#E5EAF2',
          50: '#F2F5F9',
        },
        gold: {
          300: '#D9C49C',
          400: '#C8AD7C',
          500: '#B0915E',
          700: '#7D6236',
        },
        ink: '#162033',
        slate: { DEFAULT: '#4A5568', soft: '#6B7588' },
        mist: '#F5F6F8',
        line: '#E2E6EC',
      },
      fontFamily: {
        display: ['"Source Serif 4"', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      maxWidth: { prose: '65ch' },
      boxShadow: {
        panel: '0 1px 2px rgba(15,31,60,0.06), 0 12px 32px -12px rgba(15,31,60,0.18)',
      },
    },
  },
  plugins: [],
};
