import type { Config } from 'tailwindcss';

// HCP design tokens — taken from the official logo SVG
// (navy #023F85 "Haryana", blue→cyan #0474C2→#0492DB "Chemical", green #32B15B "& Pharmaceuticals").
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Logo navy and its darker shades for dark bands
        navy: {
          DEFAULT: '#023F85',
          950: '#011733',
          900: '#012754',
          800: '#02336D',
          700: '#023F85',
        },
        // Logo blue → cyan; #0474C2 passes AA with white text
        brand: {
          DEFAULT: '#0474C2',
          dark: '#03609F',
          light: '#0492DB',
          50: '#EDF6FD',
          100: '#D7ECFA',
          200: '#AFD8F4',
        },
        // Logo green; dark shade for text on white
        leaf: {
          DEFAULT: '#32B15B',
          dark: '#23874A',
          50: '#ECF8F0',
          100: '#D4F0DE',
        },
        ink: '#0F1E33',
        body: '#4A5B70',
        muted: '#6B7A8C',
        line: '#E3EAF2',
        mist: '#F5F9FC',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(2, 39, 84, 0.04), 0 2px 8px rgba(2, 39, 84, 0.04)',
        card: '0 2px 4px rgba(2, 39, 84, 0.04), 0 8px 24px rgba(2, 39, 84, 0.06)',
        lift: '0 4px 8px rgba(2, 39, 84, 0.05), 0 18px 40px rgba(2, 39, 84, 0.12)',
        brand: '0 6px 18px rgba(4, 116, 194, 0.28)',
        modal: '0 24px 60px rgba(1, 23, 51, 0.28)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(120deg, #023F85 0%, #0474C2 45%, #0492DB 72%, #32B15B 100%)',
        'brand-soft': 'linear-gradient(135deg, #EDF6FD 0%, #F5F9FC 50%, #ECF8F0 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
