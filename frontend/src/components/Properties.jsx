'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch, FaFilter, FaTimes, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaHeart, FaShare, FaEye, FaStar, FaCrown, FaGem, FaTrophy, FaShieldAlt, FaCheckCircle, FaArrowRight, FaArrowLeft, FaThLarge, FaList } from 'react-icons/fa'
import Item from './Item'
import LoadingSpinner from './LoadingSpinner'

const Properties = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState([0, 50000000])
  const [bedrooms, setBedrooms] = useState('any')
  const [bathrooms, setBathrooms] = useState('any')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const stats = [
    { value: "2,847", label: "Luxury Properties", icon: FaCrown, color: "from-amber-600 to-yellow-500" },
    { value: "R8.2B+", label: "Portfolio Value", icon: FaGem, color: "from-purple-500 to-pink-500" },
    { value: "99.2%", label: "Client Satisfaction", icon: FaCheckCircle, color: "from-green-500 to-emerald-500" },
    { value: "25+", label: "Years Experience", icon: FaTrophy, color: "from-amber-500 to-orange-500" }
  ]

  const categories = [
    { value: 'all', label: 'All Properties', icon: FaGem, count: 2847 },
    { value: 'house', label: 'Luxury Houses', icon: FaCrown, count: 1243 },
    { value: 'apartment', label: 'Premium Apartments', icon: FaStar, count: 892 },
    { value: 'villa', label: 'Exclusive Villas', icon: FaTrophy, count: 456 },
    { value: 'penthouse', label: 'Prestigious Penthouses', icon: FaGem, count: 234 },
    { value: 'estate', label: 'Luxury Estates', icon: FaCrown, count: 123 }
  ]

  const sortOptions = [
    { value: 'featured', label: 'Featured Properties' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSortBy('featured')
    setPriceRange([0, 50000000])
    setBedrooms('any')
    setBathrooms('any')
  }

  const loadMoreProperties = () => {
    setCurrentPage(prev => prev + 1)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50/30"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Page Header */}
      <motion.div 
        className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 text-white py-20"
        variants={itemVariants}
      >
        <div className="max-w-8xl mx-auto px-8 lg:px-12">
          <div className="text-center">
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl font-black mb-8 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Luxury Properties
            </motion.h1>
            <motion.p 
              className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Discover South Africa's most exclusive properties in the most prestigious locations
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        className="py-16 bg-white"
        variants={itemVariants}
      >
        <div className="max-w-8xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl mb-4 shadow-xl`}>
                  <stat.icon className="text-white text-2xl" />
                </div>
                <div className="text-3xl font-black text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 font-bold tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div 
        className="py-12 bg-white border-b border-gray-100"
        variants={itemVariants}
      >
        <div className="max-w-8xl mx-auto px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search luxury properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-16 pr-6 py-5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-500 text-lg font-medium bg-white/90 backdrop-blur-sm shadow-lg"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 text-white rounded-2xl hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 font-bold text-lg shadow-xl"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaFilter className="w-5 h-5" />
              Advanced Filters
            </motion.button>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-2">
              <motion.button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-amber-600 to-yellow-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-amber-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaThLarge className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-gradient-to-r from-amber-600 to-yellow-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-amber-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaList className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="mt-8 bg-white/80 backdrop-blur-xl rounded-3xl border-2 border-gray-100 p-8 shadow-2xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  
                  {/* Category Filter */}
                  <div>
                    <label className="block text-lg font-bold text-gray-700 mb-4 flex items-center gap-3">
                      <FaCrown className="text-amber-500" />
                      Property Type
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 bg-white/90 backdrop-blur-sm text-lg font-medium shadow-lg"
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label} ({category.count})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort Options */}
                  <div>
                    <label className="block text-lg font-bold text-gray-700 mb-4 flex items-center gap-3">
                      <FaTrophy className="text-amber-500" />
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 bg-white/90 backdrop-blur-sm text-lg font-medium shadow-lg"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <label className="block text-lg font-bold text-gray-700 mb-4 flex items-center gap-3">
                      <FaBed className="text-amber-500" />
                      Bedrooms
                    </label>
                    <select
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 bg-white/90 backdrop-blur-sm text-lg font-medium shadow-lg"
                    >
                      <option value="any">Any Bedrooms</option>
                      <option value="1">1+ Bedroom</option>
                      <option value="2">2+ Bedrooms</option>
                      <option value="3">3+ Bedrooms</option>
                      <option value="4">4+ Bedrooms</option>
                      <option value="5">5+ Bedrooms</option>
                    </select>
                  </div>

                  {/* Bathrooms */}
                  <div>
                    <label className="block text-lg font-bold text-gray-700 mb-4 flex items-center gap-3">
                      <FaBath className="text-amber-500" />
                      Bathrooms
                    </label>
                    <select
                      value={bathrooms}
                      onChange={(e) => setBathrooms(e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 bg-white/90 backdrop-blur-sm text-lg font-medium shadow-lg"
                    >
                      <option value="any">Any Bathrooms</option>
                      <option value="1">1+ Bathroom</option>
                      <option value="2">2+ Bathrooms</option>
                      <option value="3">3+ Bathrooms</option>
                      <option value="4">4+ Bathrooms</option>
                    </select>
                  </div>
                </div>

                {/* Price Range */}
                <div className="mt-8">
                  <label className="block text-lg font-bold text-gray-700 mb-4 flex items-center gap-3">
                    <FaRulerCombined className="text-amber-500" />
                    Price Range
                  </label>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <input
                          type="range"
                          min="0"
                          max="50000000"
                          step="1000000"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                      <span className="text-lg font-bold text-amber-600 whitespace-nowrap">
                        Up to {formatPrice(priceRange[1])}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 font-medium">
                      <span>R0</span>
                      <span>R50M+</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                  <motion.button
                    onClick={clearFilters}
                    className="flex items-center gap-3 px-6 py-4 text-gray-600 hover:text-gray-800 transition-all duration-300 font-bold text-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaTimes className="w-5 h-5" />
                    Clear All Filters
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setShowFilters(false)}
                    className="px-8 py-4 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 text-white rounded-2xl hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 font-bold text-lg shadow-xl"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Apply Filters
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Category Pills */}
      <motion.div 
        className="py-8 bg-white"
        variants={itemVariants}
      >
        <div className="max-w-8xl mx-auto px-8 lg:px-12">
          <div className="flex flex-wrap gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-500 shadow-lg ${
                  selectedCategory === category.value
                    ? 'bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 text-white shadow-2xl shadow-amber-500/30'
                    : 'bg-white text-gray-700 hover:text-amber-600 hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 border-2 border-gray-200'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <category.icon className="w-5 h-5" />
                {category.label}
                <span className="text-sm opacity-75">({category.count})</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Results Header */}
      <motion.div 
        className="py-8 bg-gray-50"
        variants={itemVariants}
      >
        <div className="max-w-8xl mx-auto px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-2">Featured Properties</h2>
              <p className="text-lg text-gray-600 font-medium">Showing 24 of 2,847 luxury properties</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 bg-white font-medium"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Properties Grid */}
      <motion.div 
        className="py-12"
        variants={itemVariants}
      >
        <div className="max-w-8xl mx-auto px-8 lg:px-12">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <LoadingSpinner size="large" />
            </div>
          ) : (
            <>
              <div className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {Array.from({ length: 12 }).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <Item viewMode={viewMode} />
                  </motion.div>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <motion.div 
                  className="text-center mt-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                >
                  <motion.button
                    onClick={loadMoreProperties}
                    className="inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 text-white rounded-2xl hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 font-bold text-xl shadow-xl"
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Load More Luxury Properties
                    <FaArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </motion.div>

      {/* No Results */}
      {!loading && properties.length === 0 && (
        <motion.div 
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="max-w-2xl mx-auto">
            <FaSearch className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No luxury properties found</h3>
            <p className="text-lg text-gray-600 mb-8">Try adjusting your search criteria or browse our featured properties</p>
            <motion.button
              onClick={clearFilters}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 text-white rounded-2xl hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 font-bold text-lg shadow-xl"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaTimes className="w-5 h-5" />
              Clear All Filters
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Properties