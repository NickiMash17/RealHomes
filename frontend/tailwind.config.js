/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Premium South African inspired color palette
        primary: "#f8f9fa",
        secondary: "#1a365d", // Deep blue (SA flag)
        tertiary: "#dc2626", // Red (SA flag)
        accent: "#fbbf24", // Gold accent
        success: "#059669", // Green
        warning: "#d97706", // Orange
        error: "#dc2626", // Red
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        // Premium property colors
        luxury: {
          gold: "#d4af37",
          platinum: "#e5e4e2",
          diamond: "#b9f2ff",
          emerald: "#50c878",
          sapphire: "#0f52ba",
          onyx: "#0a0a0a",
          pearl: "#f8f8f8",
        },
        // South African landscape colors
        landscape: {
          ocean: "#1e3a8a",
          mountain: "#374151",
          vineyard: "#7c2d12",
          savanna: "#92400e",
          sunset: "#f97316",
          beach: "#fef3c7",
          forest: "#064e3b",
        },
        // Professional real estate colors
        realestate: {
          primary: "#1e40af",
          secondary: "#dc2626",
          accent: "#f59e0b",
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
          info: "#3b82f6",
        }
      },
      screens: {
        xs: "400px",
        "3xl": "1680px",
        "4xl": "2200px",
        "5xl": "2560px",
      },
      backgroundImage: {
        hero: "url(/src/assets/bg.png)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "premium-gradient": "linear-gradient(135deg, #1a365d 0%, #dc2626 50%, #fbbf24 100%)",
        "luxury-gradient": "linear-gradient(135deg, #d4af37 0%, #e5e4e2 50%, #b9f2ff 100%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        "premium-card": "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        "luxury-card": "linear-gradient(135deg, #ffffff 0%, #fef7e0 50%, #ffffff 100%)",
        "hero-overlay": "linear-gradient(135deg, rgba(26,54,93,0.8) 0%, rgba(220,38,38,0.6) 50%, rgba(251,191,36,0.4) 100%)",
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'typewriter': 'typewriter 3s steps(40) 1s 1 normal both',
        'blink': 'blink 1s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(1deg)' },
        },
        pulseGlow: {
          '0%, 100%': { 
            transform: 'scale(1)',
            boxShadow: '0 0 20px rgba(26, 54, 93, 0.3)'
          },
          '50%': { 
            transform: 'scale(1.05)',
            boxShadow: '0 0 40px rgba(26, 54, 93, 0.6)'
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
      },
      boxShadow: {
        'premium': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'luxury': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'glow': '0 0 20px rgba(212, 175, 55, 0.3)',
        'glow-blue': '0 0 20px rgba(26, 54, 93, 0.3)',
        'glow-red': '0 0 20px rgba(220, 38, 38, 0.3)',
        'inner-glow': 'inset 0 0 20px rgba(212, 175, 55, 0.2)',
        'glass': '0 8px 32px rgba(31, 38, 135, 0.37)',
        'neon': '0 0 5px rgba(212, 175, 55, 0.5), 0 0 10px rgba(212, 175, 55, 0.3), 0 0 15px rgba(212, 175, 55, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
      },
    },
  },
  plugins: [
    function({ addUtilities, addComponents, theme }) {
      // Premium utility classes
      const newUtilities = {
        '.shadow-premium': {
          'box-shadow': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
        '.shadow-luxury': {
          'box-shadow': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        },
        '.shadow-glow': {
          'box-shadow': '0 0 20px rgba(212, 175, 55, 0.3)',
        },
        '.shadow-glow-blue': {
          'box-shadow': '0 0 20px rgba(26, 54, 93, 0.3)',
        },
        '.text-gradient': {
          'background': 'linear-gradient(135deg, #1a365d 0%, #dc2626 50%, #fbbf24 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.glass': {
          'background': 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-dark': {
          'background': 'rgba(0, 0, 0, 0.2)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.loading-shimmer': {
          'background': 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          'background-size': '200% 100%',
          'animation': 'shimmer 1.5s infinite',
        },
      }
      addUtilities(newUtilities)

      // Premium component classes
      const newComponents = {
        '.btn-premium': {
          'background': 'linear-gradient(135deg, #1a365d 0%, #dc2626 50%, #fbbf24 100%)',
          'color': 'white',
          'padding': '1rem 2rem',
          'border-radius': '0.5rem',
          'font-weight': '600',
          'box-shadow': '0 10px 25px rgba(0, 0, 0, 0.15)',
          'transition': 'all 0.3s ease',
          '&:hover': {
            'transform': 'translateY(-2px)',
            'box-shadow': '0 15px 35px rgba(0, 0, 0, 0.2)',
          },
        },
        '.card-premium': {
          'background': 'white',
          'border-radius': '1rem',
          'box-shadow': '0 10px 25px rgba(0, 0, 0, 0.1)',
          'transition': 'all 0.3s ease',
          'border': '1px solid rgba(0, 0, 0, 0.05)',
          '&:hover': {
            'transform': 'translateY(-5px)',
            'box-shadow': '0 20px 40px rgba(0, 0, 0, 0.15)',
          },
        },
        '.card-luxury': {
          'background': 'linear-gradient(135deg, #ffffff 0%, #fef7e0 50%, #ffffff 100%)',
          'border-radius': '1.5rem',
          'box-shadow': '0 15px 35px rgba(0, 0, 0, 0.1)',
          'transition': 'all 0.5s ease',
          'border': '1px solid rgba(251, 191, 36, 0.2)',
          '&:hover': {
            'transform': 'translateY(-8px) scale(1.02)',
            'box-shadow': '0 25px 50px rgba(0, 0, 0, 0.15)',
          },
        },
        '.input-premium': {
          'background': 'white',
          'border': '2px solid #e5e7eb',
          'border-radius': '0.5rem',
          'padding': '0.75rem 1rem',
          'transition': 'all 0.3s ease',
          '&:focus': {
            'border-color': '#1a365d',
            'box-shadow': '0 0 0 3px rgba(26, 54, 93, 0.1)',
            'outline': 'none',
          },
        },
      }
      addComponents(newComponents)
    }
  ],
};
