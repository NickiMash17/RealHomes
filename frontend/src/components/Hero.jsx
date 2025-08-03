import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaStar, FaMapMarkerAlt, FaPlay, FaPause } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const Hero = () => {
  const stats = [
    { value: "500+", label: "Premium Properties", icon: "🏠" },
    { value: "15+", label: "Years Experience", icon: "⭐" },
    { value: "8", label: "Major Cities", icon: "🌍" },
    { value: "R2.5B+", label: "Properties Sold", icon: "💰" }
  ]

    return (
    <section className='max-padd-container pt-[99px] relative overflow-hidden min-h-screen'>
      {/* Elegant gradient background */}
      <div className='absolute inset-0'>
        {/* Primary gradient background */}
        <div className='absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-blue-50'></div>
        
        {/* Subtle pattern overlay */}
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1)_1px,transparent_1px)] bg-[length:20px_20px]'></div>
        
        {/* Decorative gradient elements */}
        <div className='absolute top-20 left-10 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-r from-amber-200/30 to-yellow-300/30 rounded-full blur-3xl'></div>
        <div className='absolute bottom-20 right-10 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-r from-blue-200/30 to-cyan-300/30 rounded-full blur-3xl'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-r from-amber-100/20 to-blue-100/20 rounded-full blur-3xl'></div>
                    </div>
      
      {/* Main content */}
      <div className='relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8'>
        {/* Premium badge */}
          <motion.div 
          className='inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-secondary font-semibold text-xs sm:text-sm mb-6 sm:mb-8 shadow-lg'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaStar className='text-tertiary' />
            <span>Premium South African Real Estate</span>
          </motion.div>
          
        {/* Main heading */}
        <motion.h1 
          className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-secondary mb-4 sm:mb-6 leading-tight'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover Exceptional{' '}
          <span className='text-amber-500'>Luxury Homes</span>
        </motion.h1>
        
        {/* Description */}
        <motion.p 
          className='text-base sm:text-lg lg:text-xl text-neutral-600 max-w-2xl sm:max-w-3xl mb-8 sm:mb-12 leading-relaxed px-4'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          From the pristine beaches of Camps Bay to the prestigious estates of Stellenbosch, 
          explore the finest properties that define luxury living in South Africa's most coveted locations.
        </motion.p>
        
        {/* Stats */}
          <motion.div 
          className='grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 w-full max-w-4xl'
          initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className='text-center p-3 sm:p-4'
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
              <div className='text-2xl sm:text-3xl mb-1 sm:mb-2'>{stat.icon}</div>
              <div className='text-lg sm:text-xl lg:text-2xl font-bold text-secondary mb-1'>{stat.value}</div>
                <div className='text-xs sm:text-sm text-neutral-600 leading-tight'>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
          
        {/* CTA Buttons */}
          <motion.div 
          className='flex flex-col sm:flex-row gap-4 sm:gap-6 items-center w-full max-w-2xl'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
            >
          <Link to='/listing' className='btn-premium rounded-xl flexCenter !py-3 sm:!py-4 !px-6 sm:!px-8 text-base sm:text-lg w-full sm:w-auto'>
                <FaSearch className='mr-2' />
                Explore Properties
              </Link>
          
          <div className='card-premium p-4 sm:p-6 max-w-sm w-full'>
            <div className='text-center'>
              <h5 className='uppercase font-bold text-amber-600 mb-1 text-sm sm:text-base'>Exclusive Offer</h5>
              <p className='text-neutral-600 text-sm sm:text-base'>Free Property Valuation & Consultation</p>
            </div>
          </div>
        </motion.div>
          
        {/* Location highlights */}
          <motion.div 
          className='flex flex-wrap gap-2 sm:gap-4 mt-8 sm:mt-12 justify-center px-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          >
            {['Cape Town', 'Johannesburg', 'Durban', 'Stellenbosch', 'Plettenberg Bay'].map((city, index) => (
              <motion.div
                key={city}
                className='flex items-center gap-1 sm:gap-2 bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-neutral-200 shadow-lg hover:shadow-xl transition-all duration-300'
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
              >
                <FaMapMarkerAlt className='text-tertiary text-xs sm:text-sm' />
                <span className='text-xs sm:text-sm font-medium text-neutral-700'>{city}</span>
              </motion.div>
            ))}
          </motion.div>
            </div>
        </section>
    )
}

export default Hero