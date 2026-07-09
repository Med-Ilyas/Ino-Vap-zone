import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        // INO-VAP ZONE Brand Colors - Navy Blue
        navy: {
          50: 'hsl(210 100% 95%)',
          100: 'hsl(210 100% 90%)',
          200: 'hsl(210 90% 75%)',
          300: 'hsl(210 80% 60%)',
          400: 'hsl(210 70% 45%)',
          500: 'hsl(210 60% 35%)',
          600: 'hsl(210 50% 28%)',
          700: 'hsl(210 70% 25%)',
          800: 'hsl(210 80% 20%)',
          900: 'hsl(210 100% 15%)',
          950: 'hsl(210 100% 10%)',
        },
        // Stainless Steel Silver
        steel: {
          50: 'hsl(0 0% 98%)',
          100: 'hsl(0 0% 96%)',
          200: 'hsl(0 0% 90%)',
          300: 'hsl(0 0% 82%)',
          400: 'hsl(0 0% 70%)',
          500: 'hsl(0 0% 55%)',
          600: 'hsl(0 0% 45%)',
          700: 'hsl(0 0% 35%)',
          800: 'hsl(0 0% 25%)',
          900: 'hsl(0 0% 15%)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['var(--font-montserrat)', 'Montserrat', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-sm': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'industrial': '0 4px 20px -2px rgba(15, 23, 42, 0.12)',
        'premium': '0 8px 40px -12px rgba(15, 23, 42, 0.25)',
        'navy-glow': '0 0 40px rgba(15, 23, 42, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'navy-gradient': 'linear-gradient(180deg, hsl(210 100% 15%) 0%, hsl(210 80% 20%) 100%)',
        'steel-gradient': 'linear-gradient(135deg, hsl(0 0% 96%) 0%, hsl(0 0% 98%) 50%, hsl(0 0% 94%) 100%)',
        'hero-gradient': 'linear-gradient(135deg, hsl(210 100% 15%) 0%, hsl(210 80% 22%) 50%, hsl(210 70% 25%) 100%)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        'scale-in': 'scale-in 0.3s ease-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
