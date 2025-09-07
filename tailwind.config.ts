import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
		fontFamily: {
			primary: ['Inter', 'sans-serif'],
			heading: ['Playfair Display', 'serif'],
			accent: ['Space Grotesk', 'sans-serif'],
			inter: ['Inter', 'sans-serif'],
		},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Celestial Harmony Color System
				celestial: {
					'deep-blue': '#0F1419',
					'stellar-purple': '#6366F1',
					'mystic-indigo': '#4338CA',
					'cosmic-gold': '#F59E0B',
					'ethereal-silver': '#E5E7EB',
					'pure-light': '#FFFFFF',
					'charcoal': '#374151',
					'soft-gray': '#9CA3AF'
				},
				cosmic: {
					purple: 'hsl(var(--cosmic-purple))',
					blue: 'hsl(var(--cosmic-blue))',
					gold: 'hsl(var(--cosmic-gold))',
					pink: 'hsl(var(--cosmic-pink))',
					indigo: 'hsl(var(--cosmic-indigo))'
				},
				planet: {
					sun: 'hsl(var(--sun-glow))',
					moon: 'hsl(var(--moon-glow))',
					mars: 'hsl(var(--mars-glow))',
					mercury: 'hsl(var(--mercury-glow))',
					jupiter: 'hsl(var(--jupiter-glow))',
					venus: 'hsl(var(--venus-glow))',
					saturn: 'hsl(var(--saturn-glow))',
					rahu: 'hsl(var(--rahu-glow))',
					ketu: 'hsl(var(--ketu-glow))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				shine: {
					'0%': { transform: 'translate(-100%, -100%) rotate(25deg)' },
					'100%': { transform: 'translate(100%, 100%) rotate(25deg)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 20px currentColor' },
					'50%': { boxShadow: '0 0 40px currentColor, 0 0 60px currentColor' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'shine': 'shine 2s infinite',
				'float': 'float 3s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out'
			},
			backgroundImage: {
				'gradient-cosmic': 'var(--gradient-cosmic)',
				'gradient-mystical': 'var(--gradient-mystical)',
				'gradient-starlight': 'var(--gradient-starlight)',
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-subtle': 'var(--gradient-subtle)',
				'gradient-accent': 'var(--gradient-accent)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
