import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaStar, FaMapMarkerAlt, FaPlay, FaPause } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const heroSlides = [
    {
      title: "Discover Exceptional",
      subtitle: "Luxury Homes",
      description: "From the pristine beaches of Camps Bay to the prestigious estates of Stellenbosch, explore the finest properties that define luxury living in South Africa's most coveted locations.",
      bgGradient: "from-blue-600/20 via-purple-600/20 to-pink-600/20"
    },
    {
      title: "Premium Investment",
      subtitle: "Opportunities",
      description: "Strategic real estate investments across South Africa's most promising markets. Expert guidance for high-net-worth individuals and institutional investors.",
      bgGradient: "from-emerald-600/20 via-teal-600/20 to-cyan-600/20"
    },
    {
      title: "Exclusive Lifestyle",
      subtitle: "Destinations",
      description: "Curated properties in the most prestigious neighborhoods. From urban sophistication to coastal tranquility, find your perfect South African sanctuary.",
      bgGradient: "from-amber-600/20 via-orange-600/20 to-red-600/20"
    }
  ]

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isPlaying, heroSlides.length])

  const stats = [
    { value: "500+", label: "Premium Properties", icon: "🏠" },
    { value: "15+", label: "Years Experience", icon: "⭐" },
    { value: "8", label: "Major Cities", icon: "🌍" },
    { value: "R2.5B+", label: "Properties Sold", icon: "💰" }
  ]

  return (
    <section className='max-padd-container pt-[99px] relative overflow-hidden min-h-screen'>
      {/* Advanced Dynamic Background */}
      <div className='absolute inset-0'>
        {/* Animated gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].bgGradient} transition-all duration-1000`}></div>
        
        {/* Floating geometric shapes with physics */}
        <motion.div 
          className='absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-amber-400/30 to-yellow-500/30 rounded-full blur-xl'
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className='absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-tertiary/30 to-accent/30 rounded-full blur-lg'
          animate={{ 
            y: [0, 15, 0],
            x: [0, 10, 0],
            rotate: [0, -180, -360]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className='absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-secondary/20 to-tertiary/20 rounded-full blur-xl'
          animate={{ 
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Particle system */}
        <div className='absolute inset-0'>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute w-1 h-1 bg-white/20 rounded-full'
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
            />
          ))}
        </div>
        
        {/* Subtle pattern overlay */}
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]'></div>
      </div>
      
      {/* Main content with advanced animations */}
      <div className='relative z-10 max-padd-container bg-gradient-to-br from-white/95 to-neutral-50/95 backdrop-blur-sm h-[655px] w-full rounded-3xl border border-amber-200/20 shadow-xl'>
        <div className='relative top-32 xs:top-52 px-8'>
          {/* Premium badge with animation */}
          <motion.div 
            className='inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-2 rounded-full text-secondary font-semibold text-sm mb-6 shadow-lg'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(251, 191, 36, 0.3)" }}
          >
            <FaStar className='text-tertiary' />
            <span>Premium South African Real Estate</span>
          </motion.div>
          
          {/* Animated slide content */}
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className='mb-6'
            >
              <h1 className='h1 text-premium mb-6'>
                {heroSlides[currentSlide].title}{' '}
                <span className='text-luxury'>{heroSlides[currentSlide].subtitle}</span>{' '}
                Across South Africa
              </h1>
              
              <p className='my-8 max-w-[40rem] text-neutral-600 text-lg leading-relaxed'>
                {heroSlides[currentSlide].description}
              </p>
            </motion.div>
          </AnimatePresence>
          
          {/* Interactive stats with counters */}
          <motion.div 
            className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-12'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className='text-center'
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <div className='text-2xl mb-2'>{stat.icon}</div>
                <div className='bold-24 text-secondary mb-1'>{stat.value}</div>
                <div className='text-sm text-neutral-600'>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Enhanced CTA Section */}
          <motion.div 
            className='flex flex-col sm:flex-row gap-8 items-start sm:items-center mb-16'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div 
              className='card-premium p-6 max-w-sm'
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className='text-center regular-14 leading-tight'>
                <h5 className='uppercase font-bold text-luxury mb-1'>Exclusive Offer</h5>
                <p className='regular-14 text-neutral-600'>Free Property Valuation & Consultation</p>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={'/listing'} className={"btn-premium rounded-xl flexCenter !py-5 animate-fade-in"}>
                <FaSearch className='mr-2' />
                Explore Properties
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Slide controls */}
          <div className='flex items-center justify-center gap-4 mb-6'>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className='p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors'
            >
              {isPlaying ? <FaPause className='text-secondary' /> : <FaPlay className='text-secondary' />}
            </button>
            <div className='flex gap-2'>
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide 
                      ? 'bg-amber-500 scale-125' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Enhanced location highlights */}
          <motion.div 
            className='flex flex-wrap gap-4 pb-8 justify-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {['Cape Town', 'Johannesburg', 'Durban', 'Stellenbosch', 'Plettenberg Bay'].map((city, index) => (
              <motion.div
                key={city}
                className='flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-full border border-neutral-200 shadow-lg hover:shadow-xl transition-all duration-300'
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              >
                <FaMapMarkerAlt className='text-tertiary text-sm' />
                <span className='text-sm font-medium text-neutral-700'>{city}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero