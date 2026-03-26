import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaWhatsapp, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Luxury Living Redefined",
      subtitle: "South Africa's Most Exclusive Properties",
      description:
        "Discover the epitome of luxury real estate with our curated collection of exceptional properties. From pristine beaches to prestigious estates, experience the finest addresses in South Africa.",
      bgImage:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&auto=format&fit=crop&q=80",
      stats: [
        { value: "500+", label: "Properties" },
        { value: "25+", label: "Years" },
        { value: "12", label: "Cities" },
        { value: "99%", label: "Satisfaction" },
      ],
    },
    {
      title: "Exceptional Properties",
      subtitle: "From Cape Town's Atlantic Seaboard to Johannesburg's Sandton",
      description:
        "Connect with South Africa's most trusted luxury real estate professionals. Our expert team is dedicated to finding your perfect property match in the most prestigious locations.",
      bgImage:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&auto=format&fit=crop&q=80",
      stats: [
        { value: "99%", label: "Satisfaction" },
        { value: "24/7", label: "Support" },
        { value: "75+", label: "Agents" },
        { value: "100%", label: "Verified" },
      ],
    },
    {
      title: "Your Perfect Sanctuary",
      subtitle: "Luxury Estates, Beachfront Villas & Prestigious Penthouses",
      description:
        "Discover South Africa's most prestigious addresses. Our portfolio features the finest properties in the most sought-after locations, offering unparalleled luxury and exclusivity.",
      bgImage:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1400&auto=format&fit=crop&q=80",
      stats: [
        { value: "12", label: "Cities" },
        { value: "Free", label: "Valuation" },
        { value: "R2.5B+", label: "Portfolio" },
        { value: "Top", label: "Quality" },
      ],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  /* ── Variants ─────────────────────────────────────────────────────── */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, staggerChildren: 0.25 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const slideVariants = {
    enter: { opacity: 0, scale: 1.1 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  const highlightWords = ["luxury", "exceptional", "perfect", "sanctuary"];

  /* ── Render ───────────────────────────────────────────────────────── */
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* ── Background Images ─────────────────────────────────────────── */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <img
              src={heroSlides[currentSlide].bgImage}
              alt={heroSlides[currentSlide].title}
              className="w-full h-full object-cover"
              loading="eager"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&auto=format&fit=crop&q=80";
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Left-heavy directional overlay — darkest on left, fades right */}
        <div className="absolute inset-0 bg-hero-overlay" />
        {/* Extra bottom vignette for stat row legibility */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-900/60 to-transparent" />
      </div>

      {/* ── Main Content ──────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-12 pt-24 sm:pt-28 pb-28 sm:pb-20">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* ── Left Column — Content (col-span-7) ───────────────────── */}
          <motion.div
            className="col-span-12 lg:col-span-7"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Gold pill badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center bg-gold-600/20 border border-gold-400/40 text-gold-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
                PREMIER LUXURY REAL ESTATE
              </span>
            </motion.div>

            {/* Headline — per-word animation, highlight words get gold gradient */}
            <motion.h1
              key={`title-${currentSlide}`}
              className="text-4xl sm:text-5xl lg:text-7xl font-display font-black text-white leading-tight"
              variants={itemVariants}
            >
              {heroSlides[currentSlide].title.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  className={`inline-block mr-3 last:mr-0 ${
                    highlightWords.some((w) => word.toLowerCase().includes(w))
                      ? "text-gradient-gold"
                      : "text-white"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.13,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              key={`subtitle-${currentSlide}`}
              className="text-lg text-white/90 font-light mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              {heroSlides[currentSlide].subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              key={`desc-${currentSlide}`}
              className="text-base text-white/75 mt-3 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {heroSlides[currentSlide].description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Link
                to="/listing"
                className="bg-gold-600 hover:bg-gold-700 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-gold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                <FaSearch className="w-4 h-4 flex-shrink-0" />
                <span>Explore Properties</span>
                <FaArrowRight className="w-4 h-4 flex-shrink-0" />
              </Link>

              <a
                href="https://wa.me/27112345678"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white/40 hover:border-white text-white px-6 py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:bg-white/5"
              >
                <FaWhatsapp className="w-5 h-5 flex-shrink-0" />
                <span>WhatsApp Us</span>
              </a>
            </motion.div>

            {/* Bottom stats row — visible on mobile too */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`stats-bar-${currentSlide}`}
                className="mt-10 pt-8 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, delay: 0.2 }}
              >
                {heroSlides[currentSlide].stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-xl sm:text-2xl font-bold text-gold-400 leading-none">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/70 mt-1 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ── Right Column — Floating Glass Stats Panel (desktop only) ── */}
          <motion.div
            className="hidden lg:flex lg:col-span-5 justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`glass-panel-${currentSlide}`}
                className="glass-dark rounded-3xl p-6 w-full max-w-sm"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.55 }}
              >
                {/* Panel header */}
                <p className="text-gold-400 text-xs font-bold tracking-widest uppercase mb-5">
                  Key Highlights
                </p>

                {/* 2 × 2 stat cards */}
                <div className="grid grid-cols-2 gap-3">
                  {heroSlides[currentSlide].stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="rounded-2xl p-5 border border-white/10"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                      initial={{ opacity: 0, scale: 0.88 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.08 + index * 0.09, duration: 0.4 }}
                      whileHover={{ scale: 1.04 }}
                    >
                      <div className="text-3xl font-black text-gold-400 leading-none mb-1.5">
                        {stat.value}
                      </div>
                      <div className="text-sm text-white/65 font-medium leading-snug">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Current slide preview */}
                <div className="mt-5 pt-4 border-t border-white/10">
                  <p className="text-white/40 text-xs mb-1.5 tracking-wide uppercase">
                    Currently Viewing
                  </p>
                  <p className="text-white font-semibold text-sm leading-snug">
                    {heroSlides[currentSlide].subtitle}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* ── Slide Indicators ──────────────────────────────────────────── */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
        {heroSlides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-gold-400 w-7 shadow-gold"
                : "bg-white/40 w-2.5 hover:bg-white/70"
            }`}
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
