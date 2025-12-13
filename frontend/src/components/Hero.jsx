import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaWhatsapp, FaArrowRight, FaMapMarkerAlt, FaHome, FaCrown } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const heroSlides = [
    {
      title: "Luxury Living Redefined",
      subtitle: "South Africa's Most Exclusive Properties",
      description: "Discover the epitome of luxury real estate with our curated collection of exceptional properties. From pristine beaches to prestigious estates, experience the finest addresses in South Africa.",
      bgImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&auto=format&fit=crop&q=80",
      stats: [
        { value: "500+", label: "Properties" },
        { value: "25+", label: "Years" },
        { value: "12", label: "Cities" },
        { value: "99%", label: "Satisfaction" }
      ]
    },
    {
      title: "Exceptional Properties",
      subtitle: "From Cape Town's Atlantic Seaboard to Johannesburg's Sandton",
      description: "Connect with South Africa's most trusted luxury real estate professionals. Our expert team is dedicated to finding your perfect property match in the most prestigious locations.",
      bgImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&auto=format&fit=crop&q=80",
      stats: [
        { value: "99%", label: "Satisfaction" },
        { value: "24/7", label: "Support" },
        { value: "75+", label: "Agents" },
        { value: "100%", label: "Verified" }
      ]
    },
    {
      title: "Your Perfect Sanctuary",
      subtitle: "Luxury Estates, Beachfront Villas & Prestigious Penthouses",
      description: "Discover South Africa's most prestigious addresses. Our portfolio features the finest properties in the most sought-after locations, offering unparalleled luxury and exclusivity.",
      bgImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1400&auto=format&fit=crop&q=80",
      stats: [
        { value: "12", label: "Cities" },
        { value: "Free", label: "Valuation" },
        { value: "Premium", label: "Quality" },
        { value: "R2.5B+", label: "Portfolio" }
      ]
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const slideVariants = {
    enter: { opacity: 0, scale: 1.1 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
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
                e.target.src = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&auto=format&fit=crop&q=80"
              }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center text-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* Premium Badge - Simplified */}
        <motion.div 
          className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold mb-6 border border-white/20"
          variants={itemVariants}
        >
          <FaCrown className="text-amber-400 text-sm" />
          <span className="text-white/90 tracking-wide">PREMIER LUXURY REAL ESTATE</span>
        </motion.div>
        
        {/* Main Heading */}
        <motion.div
          key={currentSlide}
          variants={itemVariants}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-none tracking-tight">
            {heroSlides[currentSlide].title.split(' ').map((word, index) => (
              <motion.span 
                key={index} 
                className={`inline-block mr-4 ${
                  word.toLowerCase().includes('luxury') || word.toLowerCase().includes('exceptional') || word.toLowerCase().includes('perfect') || word.toLowerCase().includes('sanctuary')
                    ? 'text-gradient bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent' 
                    : 'text-white'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed mb-6 font-light">
            {heroSlides[currentSlide].subtitle}
          </p>
          <p className="text-base sm:text-lg text-white/85 max-w-3xl mx-auto leading-relaxed font-light">
            {heroSlides[currentSlide].description}
          </p>
        </motion.div>

        {/* Stats Section - Simplified */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          {heroSlides[currentSlide].stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-white/20"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <div className="text-lg sm:text-xl font-bold mb-1 text-amber-400">{stat.value}</div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Primary CTA - Simplified */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/listing" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-xl hover:shadow-2xl glow-amber-hover"
            >
              <FaSearch className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Explore Properties</span>
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          
          <motion.a
            href="https://wa.me/27112345678"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-6 py-3 rounded-xl border-2 border-white/30 transition-all duration-300 font-medium text-sm sm:text-base hover:shadow-xl"
          >
            <FaWhatsapp className="w-4 h-4" />
            <span>Contact Us</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
        {heroSlides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-amber-400 scale-125 shadow-lg' : 'bg-white/50 hover:bg-white/75'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-12 hidden lg:block"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="bg-white/20 backdrop-blur-xl p-4 rounded-2xl border-2 border-white/30 shadow-xl">
          <FaMapMarkerAlt className="w-6 h-6 text-amber-400" />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-12 hidden lg:block"
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="bg-white/20 backdrop-blur-xl p-4 rounded-2xl border-2 border-white/30 shadow-xl">
          <FaHome className="w-6 h-6 text-amber-400" />
        </div>
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-8 hidden lg:block"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="bg-white/20 backdrop-blur-xl p-3 rounded-2xl border-2 border-white/30 shadow-xl">
          <FaCrown className="w-5 h-5 text-amber-400" />
        </div>
      </motion.div>

    </section>
  )
}

export default Hero