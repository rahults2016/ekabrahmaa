/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'h1': ['2.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }], 
        'h2': ['2rem', { lineHeight: '1.35' }],
        'h3': ['1.5rem', { lineHeight: '1.4' }],
        'h4': ['1.25rem', { lineHeight: '1.4' }],
        'h5': ['1.125rem', { lineHeight: '1.5' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
        'xs': ['0.75rem', { lineHeight: '1.5' }]
      },
      fontWeight: {
        'display': '700',
        'heading': '600',
        'body': '400'
      },
      colors: {
        // Primary brand color - represents trust, healing, and nature
        teal: {
          50: '#f0f9fa',
          100: '#d9f2f4',
          200: '#b8e6ea',
          300: '#8dd5dc',
          400: '#5eadb8',
          500: '#3c7f87', // Primary brand color
          600: '#316b73',
          700: '#2a5c62',
          800: '#234d52',
          900: '#1d4045',
          950: '#0f2426',
        },
        // Secondary/accent color - soft, calming, feminine energy
        rose: {
          50: '#fef7f7',
          100: '#feecec',
          200: '#fedddc',
          300: '#fcc1bf',
          400: '#f89692',
          500: '#F7CAC9', // Brand secondary
          600: '#e5a8a7',
          700: '#d18c8a',
          800: '#b96663',
          900: '#9a4f4d',
          950: '#532625',
        },
        // Warm neutral - represents earth, grounding
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d0c7',
          300: '#a3b2a3',
          400: '#7a8e7a',
          500: '#E1C699', // Warm earth tone
          600: '#c5a975',
          700: '#a88f5f',
          800: '#8b7650',
          900: '#726143',
          950: '#3c3222',
        },
        // Background colors - clean, pure, healing
        cream: {
          50: '#fefefe',
          100: '#fefcf9',
          200: '#FAF8F3', // Primary background
          300: '#f5f2eb',
          400: '#ede8dd',
          500: '#e3dcc8',
          600: '#d4c9a8',
          700: '#c2b085',
          800: '#a08d6b',
          900: '#837456',
          950: '#443c2b',
        },
        // Text colors - professional, readable
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#2E2E2E', // Primary text
          900: '#1a1a1a',
          950: '#0f0f0f',
        },
        // Legacy color mappings for backward compatibility
        pink: {
          DEFAULT: '#F7CAC9',
          light: '#feecec',
          dark: '#e5a8a7',
        },
        ivory: {
          DEFAULT: '#FAF8F3',
          light: '#fefefe',
          dark: '#f5f2eb',
        },
        charcoal: {
          DEFAULT: '#2E2E2E',
          light: '#64748b',
          dark: '#1a1a1a',
        },
        gold: {
          DEFAULT: '#E1C699',
          light: '#f5f2eb',
          dark: '#c5a975',
        },
        // Status colors aligned with brand
        success: {
          50: '#f0f9fa',
          500: '#3c7f87',
          600: '#316b73',
        },
        warning: {
          50: '#fefcf9',
          500: '#E1C699',
          600: '#c5a975',
        },
        error: {
          50: '#fef7f7',
          500: '#F7CAC9',
          600: '#e5a8a7',
        },
        info: {
          50: '#f0f9fa',
          500: '#5eadb8',
          600: '#3c7f87',
        }
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        garamond: ['"EB Garamond"', 'serif'],
        display: ['"EB Garamond"', 'serif'],
        body: ['Lato', 'sans-serif']
      },
      animation: {
        'lotus-bloom': 'lotus-bloom 3s ease-in-out forwards',
        'fade-in': 'fade-in 0.5s ease-in-out forwards',
        'slide-up': 'slide-up 0.5s ease-in-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        'lotus-bloom': {
          '0%': { transform: 'scale(0)', opacity: 0 },
          '50%': { transform: 'scale(0.5) rotate(180deg)', opacity: 0.5 },
          '100%': { transform: 'scale(1) rotate(360deg)', opacity: 1 }
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: .5 }
        },
      },
      // Brand-consistent shadows
      boxShadow: {
        'brand-sm': '0 1px 2px 0 rgba(60, 127, 135, 0.05)',
        'brand': '0 1px 3px 0 rgba(60, 127, 135, 0.1), 0 1px 2px 0 rgba(60, 127, 135, 0.06)',
        'brand-md': '0 4px 6px -1px rgba(60, 127, 135, 0.1), 0 2px 4px -1px rgba(60, 127, 135, 0.06)',
        'brand-lg': '0 10px 15px -3px rgba(60, 127, 135, 0.1), 0 4px 6px -2px rgba(60, 127, 135, 0.05)',
        'brand-xl': '0 20px 25px -5px rgba(60, 127, 135, 0.1), 0 10px 10px -5px rgba(60, 127, 135, 0.04)',
      }
    },
  },
  plugins: [],
};