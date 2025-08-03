/** @type {import('tailwindcss').Config} */
export default {
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
        },
        // South African landscape colors
        landscape: {
          ocean: "#1e3a8a",
          mountain: "#374151",
          vineyard: "#7c2d12",
          savanna: "#92400e",
          sunset: "#f97316",
        }
      },
      screens: {
        xs: "400px",
        "3xl": "1680px",
        "4xl": "2200px",
      },
      backgroundImage: {
        hero: "url(/src/assets/bg.png)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "premium-gradient": "linear-gradient(135deg, #1a365d 0%, #dc2626 50%, #fbbf24 100%)",
        "luxury-gradient": "linear-gradient(135deg, #d4af37 0%, #e5e4e2 50%, #b9f2ff 100%)",
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
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
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'premium': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'luxury': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'glow': '0 0 20px rgba(212, 175, 55, 0.3)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
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
      }
      addUtilities(newUtilities)
    }
  ],
};
