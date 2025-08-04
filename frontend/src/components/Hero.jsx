import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaPhone, FaWhatsapp, FaEnvelope, FaPlay, FaArrowRight, FaMapMarkerAlt, FaHome, FaStar, FaCrown, FaAward, FaGem, FaTrophy, FaShieldAlt, FaCheckCircle } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  
  const heroSlides = [
    {
      title: "Luxury Living Redefined",
      subtitle: "South Africa's Most Exclusive Properties",
      description: "Discover the epitome of luxury real estate with our curated collection of exceptional properties. From pristine beaches to prestigious estates, experience the finest addresses in South Africa.",
      bgImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&auto=format&fit=crop&q=80",
      stats: [
        { value: "R5.2B+", label: "Properties Sold", icon: FaGem, color: "from-purple-500 to-pink-500" },
        { value: "25+", label: "Years Experience", icon: FaTrophy, color: "from-amber-500 to-yellow-500" },
        { value: "12", label: "Major Cities", icon: FaMapMarkerAlt, color: "from-blue-500 to-cyan-500" },
        { value: "500+", label: "Luxury Properties", icon: FaCrown, color: "from-amber-600 to-yellow-500" }
      ]
    },
    {
      title: "Exceptional Properties",
      subtitle: "From Cape Town's Atlantic Seaboard to Johannesburg's Sandton",
      description: "Connect with South Africa's most trusted luxury real estate professionals. Our expert team is dedicated to finding your perfect property match in the most prestigious locations.",
      bgImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&auto=format&fit=crop&q=80",
      stats: [
        { value: "99%", label: "Client Satisfaction", icon: FaCheckCircle, color: "from-green-500 to-emerald-500" },
        { value: "24/7", label: "Premium Support", icon: FaShieldAlt, color: "from-blue-600 to-indigo-600" },
        { value: "75+", label: "Expert Agents", icon: FaAward, color: "from-amber-500 to-orange-500" },
        { value: "100%", label: "Verified Listings", icon: FaStar, color: "from-yellow-400 to-amber-500" }
      ]
    },
    {
      title: "Your Perfect Sanctuary",
      subtitle: "Luxury Estates, Beachfront Villas & Prestigious Penthouses",
      description: "Discover South Africa's most prestigious addresses. Our portfolio features the finest properties in the most sought-after locations, offering unparalleled luxury and exclusivity.",
      bgImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1400&auto=format&fit=crop&q=80",
      stats: [
        { value: "12", label: "Major Cities", icon: FaMapMarkerAlt, color: "from-blue-500 to-cyan-500" },
        { value: "Free", label: "Property Valuation", icon: FaGem, color: "from-purple-500 to-pink-500" },
        { value: "Premium", label: "Service Quality", icon: FaCrown, color: "from-amber-600 to-yellow-500" },
        { value: "R2.5B+", label: "Portfolio Value", icon: FaTrophy, color: "from-amber-500 to-yellow-500" }
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
        duration: 1.2,
        staggerChildren: 0.4
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
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
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroSlides[currentSlide].bgImage})` }}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-8xl mx-auto px-8 lg:px-12 text-center text-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* Premium Badge */}
        <motion.div 
          className="inline-flex items-center gap-5 bg-white/20 backdrop-blur-xl px-10 py-5 rounded-full text-base font-black mb-16 border-2 border-white/30 shadow-2xl"
          variants={itemVariants}
        >
          <FaAward className="text-amber-400 animate-pulse text-xl" />
          <span className="text-white/95 tracking-wider">SOUTH AFRICA'S PREMIER LUXURY REAL ESTATE</span>
          <FaCrown className="text-amber-400 text-xl" />
        </motion.div>
        
        {/* Main Heading */}
        <motion.div
          key={currentSlide}
          variants={itemVariants}
          className="mb-16"
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-12 leading-none tracking-tight">
            {heroSlides[currentSlide].title.split(' ').map((word, index) => (
              <motion.span 
                key={index} 
                className={`inline-block mr-8 ${
                  word.toLowerCase().includes('luxury') || word.toLowerCase().includes('exceptional') || word.toLowerCase().includes('perfect') || word.toLowerCase().includes('sanctuary')
                    ? 'text-gradient bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent' 
                    : 'text-white'
                }`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <p className="text-2xl sm:text-3xl lg:text-4xl text-white/95 max-w-6xl mx-auto leading-relaxed mb-10 font-light">
            {heroSlides[currentSlide].subtitle}
          </p>
          <p className="text-xl sm:text-2xl text-white/85 max-w-5xl mx-auto leading-relaxed font-light">
            {heroSlides[currentSlide].description}
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 max-w-7xl mx-auto"
          variants={itemVariants}
        >
          {heroSlides[currentSlide].stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white/15 backdrop-blur-xl p-8 rounded-3xl border-2 border-white/20 shadow-2xl"
              whileHover={{ scale: 1.08, y: -10 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.3 }}
            >
              <div className={`text-4xl mb-4 p-4 bg-gradient-to-r ${stat.color} rounded-2xl inline-flex items-center justify-center shadow-xl`}>
                <stat.icon className="text-white" />
              </div>
              <div className="text-3xl font-black mb-3 text-amber-400">{stat.value}</div>
              <div className="text-base text-white/80 font-bold tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Primary CTA */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-8 items-center justify-center mb-20"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/listing" 
              className="inline-flex items-center gap-5 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 text-white px-12 py-6 rounded-3xl font-black text-2xl hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-700 group shadow-2xl"
            >
              <FaSearch className="w-7 h-7" />
              Explore Luxury Properties
              <FaArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-500" />
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/20 backdrop-blur-xl px-10 py-6 rounded-3xl border-2 border-white/30 shadow-2xl"
          >
            <div className="text-center">
              <h5 className="font-black text-amber-400 mb-3 text-xl tracking-wider">EXCLUSIVE OFFER</h5>
              <p className="text-white/95 font-bold text-lg">Free Luxury Property Valuation</p>
              <p className="text-sm text-white/60 mt-3 font-medium">Limited Time Only</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Contact */}
        <motion.div 
          className="flex flex-wrap gap-6 justify-center mb-16"
          variants={itemVariants}
        >
          {[
            { icon: FaPhone, href: "tel:+27112345678", label: "Call Now", color: "from-green-600 to-green-500 hover:from-green-700 hover:to-green-600" },
            { icon: FaWhatsapp, href: "https://wa.me/27112345678", label: "WhatsApp", color: "from-green-500 to-green-400 hover:from-green-600 hover:to-green-500" },
            { icon: FaEnvelope, href: "mailto:info@realhomes.co.za", label: "Email", color: "from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600" }
          ].map((contact, index) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              className={`inline-flex items-center gap-4 bg-gradient-to-r ${contact.color} text-white px-8 py-5 rounded-2xl hover:shadow-2xl transition-all duration-500 font-black text-lg shadow-xl`}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.2 }}
            >
              <contact.icon className="w-6 h-6" />
              <span>{contact.label}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Video Preview */}
        <motion.div 
          className="mt-16"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => setIsVideoPlaying(true)}
            className="inline-flex items-center gap-4 bg-white/25 backdrop-blur-xl px-8 py-5 rounded-2xl border-2 border-white/30 hover:bg-white/35 transition-all duration-500 text-lg font-bold shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlay className="w-6 h-6" />
            <span>Watch Our Story</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-5">
        {heroSlides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-5 h-5 rounded-full transition-all duration-500 ${
              index === currentSlide ? 'bg-amber-400 scale-150 shadow-2xl' : 'bg-white/50 hover:bg-white/75'
            }`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-40 right-20 hidden xl:block"
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl border-2 border-white/30 shadow-2xl">
          <FaMapMarkerAlt className="w-10 h-10 text-amber-400" />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-60 left-20 hidden xl:block"
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl border-2 border-white/30 shadow-2xl">
          <FaHome className="w-10 h-10 text-amber-400" />
        </div>
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-10 hidden xl:block"
        animate={{ y: [-15, 15, -15] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="bg-white/20 backdrop-blur-xl p-6 rounded-3xl border-2 border-white/30 shadow-2xl">
          <FaCrown className="w-8 h-8 text-amber-400" />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero