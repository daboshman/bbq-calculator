import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#1a1a1a',
        ember: '#FF6B2B',
        cream: '#F5F0E8',
        'card-bg': '#242424',
        'card-border': '#383838',
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
      animation: {
        flicker: 'flicker 2s infinite alternate ease-in-out',
        'fade-in': 'fadeIn 0.35s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        flicker: {
          '0%': { transform: 'scale(1) rotate(-3deg)', filter: 'brightness(1)' },
          '33%': { transform: 'scale(1.08) rotate(2deg)', filter: 'brightness(1.2)' },
          '66%': { transform: 'scale(0.96) rotate(-1deg)', filter: 'brightness(0.95)' },
          '100%': { transform: 'scale(1.04) rotate(3deg)', filter: 'brightness(1.1)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { transform: 'translateY(12px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
