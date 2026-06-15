/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Core palette — warm obsidian + cream + ember gold
        obsidian: {
          DEFAULT: '#0F0D0A',
          50: '#1A1612',
          100: '#251F18',
          200: '#2E261D',
        },
        cream: {
          DEFAULT: '#F2EAD8',
          warm: '#EDE3CC',
          pale: '#FAF7F0',
        },
        ember: {
          DEFAULT: '#C8873A',
          light: '#E09B4A',
          dark: '#9E6528',
        },
        espresso: {
          DEFAULT: '#3C2210',
          mid: '#5C3520',
          light: '#7A4830',
        },
        mist: '#B8A898',
        fog: '#8C7C6C',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
        hero: ['clamp(3.5rem, 9vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        display: ['clamp(2.5rem, 6vw, 6.5rem)', { lineHeight: '1.0', letterSpacing: '-0.025em' }],
        editorial: ['clamp(1.75rem, 4vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        section: ['clamp(1.2rem, 2.5vw, 2rem)', { lineHeight: '1.3' }],
      },
      spacing: {
        section: 'clamp(5rem, 12vh, 10rem)',
        gutter: 'clamp(1.5rem, 5vw, 4rem)',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in': 'cubic-bezier(0.7, 0, 0.84, 0)',
        'circ-out': 'cubic-bezier(0, 0.55, 0.45, 1)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-mid': 'float 6s ease-in-out infinite 1s',
        'steam-rise': 'steamRise 3s ease-out infinite',
        'grain': 'grain 0.4s steps(1) infinite',
        'ember-pulse': 'emberPulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-18px) rotate(2deg)' },
          '66%': { transform: 'translateY(-8px) rotate(-1deg)' },
        },
        steamRise: {
          '0%': { opacity: 0, transform: 'translateY(0) scaleX(1)' },
          '20%': { opacity: 0.6 },
          '100%': { opacity: 0, transform: 'translateY(-80px) scaleX(2)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -3%)' },
          '20%': { transform: 'translate(3%, 2%)' },
          '30%': { transform: 'translate(-1%, 4%)' },
          '40%': { transform: 'translate(4%, -1%)' },
          '50%': { transform: 'translate(-3%, 3%)' },
          '60%': { transform: 'translate(2%, -4%)' },
          '70%': { transform: 'translate(-4%, 1%)' },
          '80%': { transform: 'translate(1%, -2%)' },
          '90%': { transform: 'translate(3%, 3%)' },
        },
        emberPulse: {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        },
      },
      backgroundImage: {
        'radial-warm': 'radial-gradient(ellipse at 50% 60%, #2E1A0E 0%, #0F0D0A 70%)',
        'radial-ember': 'radial-gradient(ellipse at 30% 50%, rgba(200,135,58,0.15) 0%, transparent 60%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'warm-glow': '0 0 60px rgba(200, 135, 58, 0.15), 0 0 120px rgba(200, 135, 58, 0.05)',
        'card-dark': '0 32px 80px rgba(0,0,0,0.6), 0 8px 20px rgba(0,0,0,0.4)',
        'ember-inner': 'inset 0 1px 0 rgba(200,135,58,0.2)',
      },
    },
  },
  plugins: [],
};
