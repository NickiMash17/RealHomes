import React from 'react'
import { motion } from 'framer-motion'
import { FaCrown, FaGem, FaTrophy, FaStar } from 'react-icons/fa'

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const textSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    xl: 'text-xl'
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        className={`${sizeClasses[size]} border-3 border-amber-200 border-t-amber-600 rounded-full animate-spin`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      {text && (
        <motion.p 
          className={`${textSizes[size]} text-gray-600 font-medium`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

const PremiumLoader = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-500 flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          className="mb-8"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl border-2 border-white/30">
            <FaCrown className="text-white text-4xl" />
          </div>
        </motion.div>
        
        <motion.h2 
          className="text-3xl font-black text-white mb-4 tracking-tight"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          RealHomes
        </motion.h2>
        
        <motion.p 
          className="text-white/90 font-medium text-lg"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          Loading Luxury Properties...
        </motion.p>
        
        <motion.div 
          className="flex justify-center gap-2 mt-6"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          <FaGem className="text-white/60 text-xl" />
          <FaTrophy className="text-white/60 text-xl" />
          <FaStar className="text-white/60 text-xl" />
        </motion.div>
      </div>
    </div>
  )
}

const SkeletonLoader = ({ type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden">
        <div className="h-64 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
        <div className="p-6">
          <div className="h-6 bg-gray-200 rounded-xl mb-4 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded-lg mb-2 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded-lg mb-4 animate-pulse w-3/4" />
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 bg-gray-200 rounded-xl mb-2 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
          <div className="h-12 bg-gray-200 rounded-2xl animate-pulse" />
        </div>
      </div>
    )
  }

  if (type === 'text') {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded-xl animate-pulse" />
        <div className="h-6 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-3/4" />
      </div>
    )
  }

  return null
}

const ShimmerLoader = () => {
  return (
    <div className="relative overflow-hidden bg-white rounded-3xl shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse" />
      <div className="h-64 bg-gradient-to-r from-gray-200 to-gray-300" />
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded-xl mb-4" />
        <div className="h-4 bg-gray-200 rounded-lg mb-2" />
        <div className="h-4 bg-gray-200 rounded-lg mb-4 w-3/4" />
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center">
              <div className="w-10 h-10 bg-gray-200 rounded-xl mb-2" />
              <div className="h-4 bg-gray-200 rounded-lg" />
            </div>
          ))}
        </div>
        <div className="h-12 bg-gray-200 rounded-2xl" />
      </div>
    </div>
  )
}

export { LoadingSpinner, PremiumLoader, SkeletonLoader, ShimmerLoader }
export default LoadingSpinner 