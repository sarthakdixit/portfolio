/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'SF Pro Text',
          'Segoe UI',
          'Roboto',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'SF Mono',
          'ui-monospace',
          'Menlo',
          'Monaco',
          'JetBrains Mono',
          'monospace',
        ],
      },
      animation: {
        'caret-blink': 'caret-blink 1s step-end infinite',
        'fade-in': 'fade-in 0.4s ease-out',
      },
      keyframes: {
        'caret-blink': {
          '50%': { opacity: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
