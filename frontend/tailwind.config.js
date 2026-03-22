/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // ─── Core Brand ─────────────────────────────────────────────
        primary: "#F8F5EF", // Warm ivory – page backgrounds
        secondary: "#1B3A5C", // Deep navy  – brand primary
        tertiary: "#C9962C", // Antique gold – accent / CTA
        accent: "#C9962C", // Alias for tertiary

        // ─── Extended Navy Scale ─────────────────────────────────────
        navy: {
          50: "#EEF4FB",
          100: "#D6E5F5",
          200: "#ADCBEB",
          300: "#85B1E0",
          400: "#5C96D6",
          500: "#347CCB",
          600: "#23649E",
          700: "#1B3A5C", // DEFAULT
          800: "#122740",
          900: "#091524",
          950: "#040B14",
          DEFAULT: "#1B3A5C",
        },

        // ─── Extended Gold Scale ─────────────────────────────────────
        gold: {
          50: "#FEF9EF",
          100: "#FBF0D9",
          200: "#F6E0B2",
          300: "#F0CE8A",
          400: "#E8BC64",
          500: "#D4A840",
          600: "#C9962C", // DEFAULT
          700: "#A07820",
          800: "#785A18",
          900: "#503C10",
          950: "#281E08",
          DEFAULT: "#C9962C",
        },

        // ─── Ivory / Warm-neutral Scale ──────────────────────────────
        ivory: {
          50: "#FFFDF9",
          100: "#FAF7F2",
          200: "#F8F5EF", // page bg DEFAULT
          300: "#EDE9E0",
          400: "#E0DAD0",
          500: "#CEC6B9",
          600: "#B5ADA0",
          DEFAULT: "#F8F5EF",
        },

        // ─── Charcoal / Text Scale ───────────────────────────────────
        charcoal: {
          50: "#F5F5F7",
          100: "#E8E8EC",
          200: "#CDCDD8",
          300: "#ADADBF",
          400: "#8C8CA6",
          500: "#6B6B8C",
          600: "#525272",
          700: "#3A3A57",
          800: "#28283E",
          900: "#1A1A2E", // DEFAULT – headings
          950: "#0D0D18",
          DEFAULT: "#1A1A2E",
        },

        // ─── Neutral / Gray ──────────────────────────────────────────
        neutral: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },

        // ─── Semantic / Status ───────────────────────────────────────
        success: "#15803D",
        warning: "#D97706",
        error: "#DC2626",
        info: "#0369A1",

        // ─── Surface Layers ──────────────────────────────────────────
        surface: {
          DEFAULT: "#FFFFFF",
          raised: "#FFFFFF",
          overlay: "#F8F5EF",
          sunken: "#EDE9E0",
        },
      },

      // ─── Screens ────────────────────────────────────────────────────
      screens: {
        xs: "400px",
        "3xl": "1680px",
        "4xl": "2200px",
        "5xl": "2560px",
      },

      // ─── Background Images ──────────────────────────────────────────
      backgroundImage: {
        hero: "url(/src/assets/bg.png)",

        // Gradients
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

        "navy-gradient":
          "linear-gradient(135deg, #091524 0%, #1B3A5C 50%, #23649E 100%)",
        "gold-gradient":
          "linear-gradient(135deg, #503C10 0%, #C9962C 50%, #E8BC64 100%)",
        "prestige-gradient":
          "linear-gradient(135deg, #1B3A5C 0%, #C9962C 100%)",

        "hero-overlay":
          "linear-gradient(to right, rgba(9,21,36,0.88) 0%, rgba(9,21,36,0.65) 50%, rgba(9,21,36,0.30) 100%)",
        "card-surface": "linear-gradient(145deg, #FFFFFF 0%, #FAF7F2 100%)",
        "section-alt": "linear-gradient(180deg, #F8F5EF 0%, #FAF7F2 100%)",
        "footer-bg":
          "linear-gradient(160deg, #091524 0%, #0F2339 40%, #1B3A5C 100%)",

        "glass-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
      },

      // ─── Font Families ──────────────────────────────────────────────
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"],
        serif: ["Playfair Display", "serif"],
        "dm-sans": ["DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },

      // ─── Box Shadows ────────────────────────────────────────────────
      boxShadow: {
        // Elevation system
        xs: "0 1px 2px rgba(0,0,0,0.05)",
        sm: "0 2px 4px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        md: "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
        lg: "0 8px 24px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.05)",
        xl: "0 16px 40px rgba(0,0,0,0.12), 0 6px 12px rgba(0,0,0,0.06)",
        "2xl": "0 24px 56px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.06)",
        "3xl": "0 32px 72px rgba(0,0,0,0.18), 0 12px 24px rgba(0,0,0,0.08)",

        // Brand shadows
        navy: "0 8px 24px rgba(27, 58, 92, 0.25)",
        "navy-lg": "0 16px 48px rgba(27, 58, 92, 0.35)",
        gold: "0 8px 24px rgba(201, 150, 44, 0.30)",
        "gold-lg": "0 16px 48px rgba(201, 150, 44, 0.40)",
        "gold-glow":
          "0 0 20px rgba(201, 150, 44, 0.45), 0 0 40px rgba(201, 150, 44, 0.20)",

        // Special
        inner: "inset 0 2px 8px rgba(0,0,0,0.06)",
        glass:
          "0 8px 32px rgba(27, 58, 92, 0.15), 0 2px 8px rgba(27, 58, 92, 0.08)",
        card: "0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover":
          "0 12px 32px rgba(27, 58, 92, 0.14), 0 4px 8px rgba(0,0,0,0.06)",
        input: "0 1px 3px rgba(0,0,0,0.06), inset 0 1px 2px rgba(0,0,0,0.04)",
        "input-focus":
          "0 0 0 3px rgba(201, 150, 44, 0.20), 0 1px 3px rgba(0,0,0,0.06)",
      },

      // ─── Border Radius ──────────────────────────────────────────────
      borderRadius: {
        none: "0",
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        "5xl": "2.5rem",
        full: "9999px",
      },

      // ─── Spacing Extras ─────────────────────────────────────────────
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        88: "22rem",
        100: "25rem",
        112: "28rem",
        128: "32rem",
        144: "36rem",
      },

      // ─── Z-Index ────────────────────────────────────────────────────
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },

      // ─── Animations ─────────────────────────────────────────────────
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "fade-in-down": "fadeInDown 0.6s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
        float: "float 4s ease-in-out infinite",
        "pulse-soft": "pulseSoft 2.5s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "spin-slow": "spin 3s linear infinite",
        "bounce-soft": "bounceSoft 2s ease-in-out infinite",
      },

      // ─── Keyframes ──────────────────────────────────────────────────
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(60px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-60px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.88)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.65" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },

      // ─── Transition ─────────────────────────────────────────────────
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        "ease-out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
        "ease-in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
      },
      transitionDuration: {
        250: "250ms",
        400: "400ms",
        600: "600ms",
        800: "800ms",
        1000: "1000ms",
      },

      // ─── Backdrop Blur ──────────────────────────────────────────────
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [
    function ({ addUtilities, addComponents }) {
      // ── Utility classes ─────────────────────────────────────────────
      addUtilities({
        // Layout helpers
        ".max-container": {
          "@apply mx-auto max-w-[1440px]": {},
        },
        ".padding-container": {
          "@apply px-4 sm:px-6 lg:px-14 3xl:px-0": {},
        },
        ".max-padd-container": {
          "@apply mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12": {},
        },
        ".flexCenter": {
          "@apply flex items-center justify-center": {},
        },
        ".flexBetween": {
          "@apply flex items-center justify-between": {},
        },
        ".flexStart": {
          "@apply flex items-center justify-start": {},
        },
        ".flexEnd": {
          "@apply flex items-center justify-end": {},
        },

        // Text gradient utilities
        ".text-gradient-navy": {
          background: "linear-gradient(135deg, #1B3A5C 0%, #23649E 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        },
        ".text-gradient-gold": {
          background:
            "linear-gradient(135deg, #A07820 0%, #C9962C 50%, #E8BC64 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        },
        ".text-gradient-prestige": {
          background: "linear-gradient(135deg, #1B3A5C 0%, #C9962C 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        },

        // Glass effects
        ".glass": {
          background: "rgba(255, 255, 255, 0.12)",
          "backdrop-filter": "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.20)",
        },
        ".glass-dark": {
          background: "rgba(9, 21, 36, 0.60)",
          "backdrop-filter": "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.10)",
        },
        ".glass-ivory": {
          background: "rgba(248, 245, 239, 0.85)",
          "backdrop-filter": "blur(16px)",
          border: "1px solid rgba(201, 150, 44, 0.15)",
        },

        // Loading shimmer
        ".loading-shimmer": {
          background:
            "linear-gradient(90deg, #f0ede6 25%, #e8e4da 50%, #f0ede6 75%)",
          "background-size": "200% 100%",
          animation: "shimmer 1.5s infinite",
        },

        // Hover helpers
        ".hover-lift": {
          "@apply transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover":
            {},
        },
        ".hover-gold": {
          "@apply transition-all duration-300 hover:text-gold-600 hover:border-gold-400":
            {},
        },

        // Font size utilities (kept for legacy)
        ".regular-64": { "@apply text-[64px] font-[400] leading-[120%]": {} },
        ".regular-48": { "@apply text-[48px] font-[400] leading-[120%]": {} },
        ".regular-40": { "@apply text-[40px] font-[400] leading-[120%]": {} },
        ".regular-32": { "@apply text-[32px] font-[400]": {} },
        ".regular-28": { "@apply text-[28px] font-[400]": {} },
        ".regular-24": { "@apply text-[24px] font-[400]": {} },
        ".regular-22": { "@apply text-[22px] font-[400]": {} },
        ".regular-20": { "@apply text-[20px] font-[400]": {} },
        ".regular-18": { "@apply text-[18px] font-[400]": {} },
        ".regular-16": { "@apply text-[16px] font-[400]": {} },
        ".regular-15": { "@apply text-[15px] font-[400]": {} },
        ".regular-14": { "@apply text-[14px] font-[400]": {} },
        ".medium-64": { "@apply text-[64px] font-[500] leading-[120%]": {} },
        ".medium-48": { "@apply text-[48px] font-[500] leading-[120%]": {} },
        ".medium-40": { "@apply text-[40px] font-[500] leading-[120%]": {} },
        ".medium-36": { "@apply text-[36px] font-[500]": {} },
        ".medium-32": { "@apply text-[32px] font-[500]": {} },
        ".medium-28": { "@apply text-[28px] font-[500]": {} },
        ".medium-24": { "@apply text-[24px] font-[600]": {} },
        ".medium-22": { "@apply text-[22px] font-[600]": {} },
        ".medium-20": { "@apply text-[20px] font-[600]": {} },
        ".medium-18": { "@apply text-[18px] font-[600]": {} },
        ".medium-16": { "@apply text-[16px] font-[500]": {} },
        ".medium-15": { "@apply text-[15px] font-[500]": {} },
        ".medium-14": { "@apply text-[14px] font-[500]": {} },
        ".bold-88": { "@apply text-[88px] font-[700] leading-[120%]": {} },
        ".bold-64": { "@apply text-[64px] font-[700] leading-[120%]": {} },
        ".bold-52": { "@apply text-[52px] font-[700] leading-[120%]": {} },
        ".bold-48": { "@apply text-[48px] font-[700] leading-[120%]": {} },
        ".bold-44": { "@apply text-[44px] font-[700] leading-[120%]": {} },
        ".bold-40": { "@apply text-[40px] font-[700] leading-[120%]": {} },
        ".bold-36": { "@apply text-[36px] font-[700] leading-[120%]": {} },
        ".bold-32": { "@apply text-[32px] font-[700] leading-[120%]": {} },
        ".bold-28": { "@apply text-[28px] font-[700] leading-[120%]": {} },
        ".bold-24": { "@apply text-[24px] font-[700] leading-[120%]": {} },
        ".bold-20": { "@apply text-[20px] font-[700]": {} },
        ".bold-18": { "@apply text-[18px] font-[700]": {} },
        ".bold-16": { "@apply text-[16px] font-[700]": {} },
        ".bold-15": { "@apply text-[15px] font-[700]": {} },
      });

      // ── Component classes ────────────────────────────────────────────
      addComponents({
        // ── Buttons ──────────────────────────────────────────────────
        ".btn": {
          "@apply inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 select-none":
            {},
        },
        ".btn-primary": {
          "@apply btn px-6 py-3 rounded-xl bg-navy-700 hover:bg-navy-800 text-white shadow-navy hover:shadow-navy-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-navy focus:outline-none focus:ring-2 focus:ring-navy-700 focus:ring-offset-2":
            {},
        },
        ".btn-gold": {
          "@apply btn px-6 py-3 rounded-xl bg-gold-600 hover:bg-gold-700 text-white shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-gold focus:outline-none focus:ring-2 focus:ring-gold-600 focus:ring-offset-2":
            {},
        },
        ".btn-outline-navy": {
          "@apply btn px-6 py-3 rounded-xl border-2 border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-white hover:shadow-navy hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-navy-700 focus:ring-offset-2":
            {},
        },
        ".btn-outline-gold": {
          "@apply btn px-6 py-3 rounded-xl border-2 border-gold-600 text-gold-600 hover:bg-gold-600 hover:text-white hover:shadow-gold hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-gold-600 focus:ring-offset-2":
            {},
        },
        ".btn-ghost": {
          "@apply btn px-4 py-2 rounded-lg text-charcoal-700 hover:text-navy-700 hover:bg-navy-50 focus:outline-none focus:ring-2 focus:ring-navy-300 focus:ring-offset-2":
            {},
        },
        ".btn-white": {
          "@apply btn px-6 py-3 rounded-xl bg-white text-navy-700 border border-ivory-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2":
            {},
        },

        // Legacy button aliases (keep existing code working)
        ".btn-secondary": {
          "@apply btn-primary": {},
        },
        ".btn-light": {
          "@apply btn-gold": {},
        },
        ".btn-secondary-outline": {
          "@apply btn-outline-navy": {},
        },
        ".btn-premium": {
          "@apply btn-gold": {},
        },
        ".btn-luxury": {
          "@apply btn-outline-gold": {},
        },

        // ── Inputs ────────────────────────────────────────────────────
        ".input-base": {
          "@apply w-full px-4 py-3 rounded-xl border-2 border-ivory-300 bg-white text-charcoal-900 placeholder:text-neutral-400 shadow-input transition-all duration-300":
            {},
          "@apply hover:border-gold-400": {},
          "@apply focus:outline-none focus:border-gold-600 focus:shadow-input-focus":
            {},
        },
        ".input-enhanced": {
          "@apply input-base": {},
        },

        // ── Cards ─────────────────────────────────────────────────────
        ".card": {
          "@apply bg-white rounded-2xl shadow-card border border-ivory-300 overflow-hidden transition-all duration-300":
            {},
        },
        ".card-hover": {
          "@apply card hover:shadow-card-hover hover:-translate-y-1.5 hover:border-gold-300":
            {},
        },
        ".card-navy": {
          "@apply rounded-2xl bg-navy-700 text-white shadow-navy overflow-hidden transition-all duration-300":
            {},
        },
        ".card-gold": {
          "@apply rounded-2xl bg-gradient-to-br from-gold-50 to-ivory-200 border border-gold-200 shadow-card overflow-hidden transition-all duration-300":
            {},
        },
        ".card-glass": {
          "@apply glass rounded-2xl shadow-glass overflow-hidden transition-all duration-300":
            {},
        },

        // Legacy card aliases
        ".card-premium": {
          "@apply card-hover": {},
        },
        ".card-luxury": {
          "@apply card-gold hover:shadow-gold hover:-translate-y-1": {},
        },
        ".card-enhanced": {
          "@apply card-hover": {},
        },

        // ── Badges ────────────────────────────────────────────────────
        ".badge": {
          "@apply inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide":
            {},
        },
        ".badge-navy": {
          "@apply badge bg-navy-700 text-white": {},
        },
        ".badge-gold": {
          "@apply badge bg-gold-600 text-white": {},
        },
        ".badge-gold-soft": {
          "@apply badge bg-gold-100 text-gold-700 border border-gold-200": {},
        },
        ".badge-navy-soft": {
          "@apply badge bg-navy-50 text-navy-700 border border-navy-200": {},
        },
        ".badge-success": {
          "@apply badge bg-green-100 text-green-700 border border-green-200":
            {},
        },
        ".badge-ivory": {
          "@apply badge bg-ivory-200 text-charcoal-700 border border-ivory-400":
            {},
        },

        // ── Section helpers ───────────────────────────────────────────
        ".section-heading": {
          "@apply font-display font-bold text-charcoal-900 leading-tight": {},
        },
        ".section-label": {
          "@apply inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border":
            {},
        },
        ".section-label-navy": {
          "@apply section-label bg-navy-50 text-navy-700 border-navy-200": {},
        },
        ".section-label-gold": {
          "@apply section-label bg-gold-50 text-gold-700 border-gold-200": {},
        },

        // ── Active nav link ───────────────────────────────────────────
        ".active-link": {
          "@apply bg-navy-700 text-white shadow-navy": {},
        },

        // ── Text helpers ──────────────────────────────────────────────
        ".text-premium": {
          "@apply text-gradient-prestige font-bold": {},
        },
        ".text-luxury": {
          "@apply text-gradient-gold font-bold": {},
        },

        // ── Heading scale ─────────────────────────────────────────────
        ".h1": {
          "@apply font-display text-[38px] sm:text-[46px] md:text-[54px] font-bold leading-[1.15] tracking-tight text-charcoal-900":
            {},
        },
        ".h2": {
          "@apply font-display text-[28px] sm:text-[34px] md:text-[42px] font-bold leading-[1.25] tracking-tight text-charcoal-900":
            {},
        },
        ".h3": {
          "@apply font-display text-[22px] sm:text-[26px] md:text-[32px] font-semibold leading-[1.3] text-charcoal-900":
            {},
        },

        // ── Shadow utilities (standalone use) ─────────────────────────
        ".shadow-premium": {
          "box-shadow":
            "0 16px 40px rgba(27, 58, 92, 0.14), 0 4px 8px rgba(0,0,0,0.06)",
        },
        ".shadow-luxury": {
          "box-shadow":
            "0 24px 56px rgba(201, 150, 44, 0.20), 0 8px 16px rgba(0,0,0,0.06)",
        },
        ".shadow-glow": {
          "box-shadow":
            "0 0 20px rgba(201, 150, 44, 0.35), 0 0 40px rgba(201, 150, 44, 0.15)",
        },
        ".shadow-glow-blue": {
          "box-shadow": "0 0 20px rgba(27, 58, 92, 0.30)",
        },
        ".glow-amber": {
          "box-shadow":
            "0 0 20px rgba(201, 150, 44, 0.30), 0 0 40px rgba(201, 150, 44, 0.10)",
        },
        ".glow-amber-hover:hover": {
          "box-shadow":
            "0 0 30px rgba(201, 150, 44, 0.45), 0 0 60px rgba(201, 150, 44, 0.20)",
        },

        // ── Gradient backgrounds ──────────────────────────────────────
        ".gradient-primary": {
          "@apply bg-navy-gradient": {},
        },
        ".gradient-luxury": {
          "@apply bg-gold-gradient": {},
        },
        ".gradient-premium": {
          "@apply bg-prestige-gradient": {},
        },
      });
    },
  ],
};
