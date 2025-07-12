/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    // Add any other file paths where you use Tailwind classes
  ],
  theme: {
  	extend: {
  		fontSize: {
  			display: [
  				'3.5rem',
  				{
  					lineHeight: '1.2',
  					letterSpacing: '-0.02em'
  				}
  			],
  			h1: [
  				'2.5rem',
  				{
  					lineHeight: '1.3',
  					letterSpacing: '-0.01em'
  				}
  			],
  			h2: [
  				'2rem',
  				{
  					lineHeight: '1.35'
  				}
  			],
  			h3: [
  				'1.5rem',
  				{
  					lineHeight: '1.4'
  				}
  			],
  			h4: [
  				'1.25rem',
  				{
  					lineHeight: '1.4'
  				}
  			],
  			h5: [
  				'1.125rem',
  				{
  					lineHeight: '1.5'
  				}
  			],
  			body: [
  				'1rem',
  				{
  					lineHeight: '1.6'
  				}
  			],
  			small: [
  				'0.875rem',
  				{
  					lineHeight: '1.5'
  				}
  			],
  			xs: [
  				'0.75rem',
  				{
  					lineHeight: '1.5'
  				}
  			]
  		},
  		fontWeight: {
  			display: '700',
  			heading: '600',
  			body: '400'
  		},
  		colors: {
  			teal: {
  				'50': '#f0f9fa',
  				'100': '#d9f2f4',
  				'200': '#b8e6ea',
  				'300': '#8dd5dc',
  				'400': '#5eadb8',
  				'500': '#3c7f87',
  				'600': '#316b73',
  				'700': '#2a5c62',
  				'800': '#234d52',
  				'900': '#1d4045',
  				'950': '#0f2426'
  			},
  			rose: {
  				'50': '#fef7f7',
  				'100': '#feecec',
  				'200': '#fedddc',
  				'300': '#fcc1bf',
  				'400': '#f89692',
  				'500': '#F7CAC9',
  				'600': '#e5a8a7',
  				'700': '#d18c8a',
  				'800': '#b96663',
  				'900': '#9a4f4d',
  				'950': '#532625'
  			},
  			sage: {
  				'50': '#f6f7f6',
  				'100': '#e3e7e3',
  				'200': '#c7d0c7',
  				'300': '#a3b2a3',
  				'400': '#7a8e7a',
  				'500': '#E1C699',
  				'600': '#c5a975',
  				'700': '#a88f5f',
  				'800': '#8b7650',
  				'900': '#726143',
  				'950': '#3c3222'
  			},
  			cream: {
  				'50': '#fefefe',
  				'100': '#fefcf9',
  				'200': '#FAF8F3',
  				'300': '#f5f2eb',
  				'400': '#ede8dd',
  				'500': '#e3dcc8',
  				'600': '#d4c9a8',
  				'700': '#c2b085',
  				'800': '#a08d6b',
  				'900': '#837456',
  				'950': '#443c2b'
  			},
  			slate: {
  				'50': '#f8fafc',
  				'100': '#f1f5f9',
  				'200': '#e2e8f0',
  				'300': '#cbd5e1',
  				'400': '#94a3b8',
  				'500': '#64748b',
  				'600': '#475569',
  				'700': '#334155',
  				'800': '#2E2E2E',
  				'900': '#1a1a1a',
  				'950': '#0f0f0f'
  			},
  			pink: {
  				DEFAULT: '#F7CAC9',
  				light: '#feecec',
  				dark: '#e5a8a7'
  			},
  			ivory: {
  				DEFAULT: '#FAF8F3',
  				light: '#fefefe',
  				dark: '#f5f2eb'
  			},
  			charcoal: {
  				DEFAULT: '#2E2E2E',
  				light: '#64748b',
  				dark: '#1a1a1a'
  			},
  			gold: {
  				DEFAULT: '#E1C699',
  				light: '#f5f2eb',
  				dark: '#c5a975'
  			},
  			success: {
  				'50': '#f0f9fa',
  				'500': '#3c7f87',
  				'600': '#316b73'
  			},
  			warning: {
  				'50': '#fefcf9',
  				'500': '#E1C699',
  				'600': '#c5a975'
  			},
  			error: {
  				'50': '#fef7f7',
  				'500': '#F7CAC9',
  				'600': '#e5a8a7'
  			},
  			info: {
  				'50': '#f0f9fa',
  				'500': '#5eadb8',
  				'600': '#3c7f87'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			display: [
  				'var(--font-display)',
  				'EB Garamond"',
  				'serif'
  			],
  			body: [
  				'var(--font-body)',
  				'Lato',
  				'sans-serif'
  			],
  			sans: [
  				'var(--font-body)',
  				'Lato',
  				'sans-serif'
  			],
  			serif: [
  				'var(--font-display)',
  				'EB Garamond"',
  				'serif'
  			]
  		},
  		animation: {
  			'lotus-bloom': 'lotus-bloom 3s ease-in-out forwards',
  			'fade-in': 'fade-in 0.5s ease-in-out forwards',
  			'slide-up': 'slide-up 0.5s ease-in-out forwards',
  			'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  		},
  		keyframes: {
  			'lotus-bloom': {
  				'0%': {
  					transform: 'scale(0)',
  					opacity: 0
  				},
  				'50%': {
  					transform: 'scale(0.5) rotate(180deg)',
  					opacity: 0.5
  				},
  				'100%': {
  					transform: 'scale(1) rotate(360deg)',
  					opacity: 1
  				}
  			},
  			'fade-in': {
  				'0%': {
  					opacity: 0
  				},
  				'100%': {
  					opacity: 1
  				}
  			},
  			'slide-up': {
  				'0%': {
  					transform: 'translateY(20px)',
  					opacity: 0
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: 1
  				}
  			},
  			pulse: {
  				'0%, 100%': {
  					opacity: 1
  				},
  				'50%': {
  					opacity: 0.5
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			wave: {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'10%': {
  					transform: 'rotate(14deg)'
  				},
  				'20%': {
  					transform: 'rotate(-8deg)'
  				},
  				'30%': {
  					transform: 'rotate(14deg)'
  				},
  				'40%': {
  					transform: 'rotate(-4deg)'
  				},
  				'50%': {
  					transform: 'rotate(10deg)'
  				},
  				'60%': {
  					transform: 'rotate(0deg)'
  				},
  				'100%': {
  					transform: 'rotate(0deg)'
  				}
  			}
  		},
  		boxShadow: {
  			'brand-sm': '0 1px 2px 0 rgba(60, 127, 135, 0.05)',
  			brand: '0 1px 3px 0 rgba(60, 127, 135, 0.1), 0 1px 2px 0 rgba(60, 127, 135, 0.06)',
  			'brand-md': '0 4px 6px -1px rgba(60, 127, 135, 0.1), 0 2px 4px -1px rgba(60, 127, 135, 0.06)',
  			'brand-lg': '0 10px 15px -3px rgba(60, 127, 135, 0.1), 0 4px 6px -2px rgba(60, 127, 135, 0.05)',
  			'brand-xl': '0 20px 25px -5px rgba(60, 127, 135, 0.1), 0 10px 10px -5px rgba(60, 127, 135, 0.04)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};