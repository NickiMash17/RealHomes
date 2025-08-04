'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch, FaFilter, FaTimes, FaThLarge, FaList, FaBed, FaBath, FaRulerCombined, FaHome, FaBuilding, FaCrown, FaStar, FaGem, FaTrophy, FaShieldAlt, FaCheckCircle, FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import Item from './Item'
import LoadingSpinner from './LoadingSpinner'

const Properties = () => {
  const [loading, setLoading] = useState(true)
  const [properties, setProperties] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [viewMode, setViewMode] = useState('grid')
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false)

  // Mock data for demonstration
  const stats = [
    { value: "2,847", label: "Properties", icon: FaHome, color: "from-blue-500 to-cyan-500" },
    { value: "R5.2B+", label: "Total Value", icon: FaGem, color: "from-purple-500 to-pink-500" },
    { value: "99%", label: "Satisfaction", icon: FaCheckCircle, color: "from-green-500 to-emerald-500" },
    { value: "25+", label: "Years", icon: FaTrophy, color: "from-amber-500 to-yellow-500" }
  ]

  const categories = [
    { value: 'all', label: 'All Properties', icon: FaHome, count: 2847 },
    { value: 'house', label: 'Houses', icon: FaHome, count: 1247 },
    { value: 'apartment', label: 'Apartments', icon: FaBuilding, count: 892 },
    { value: 'villa', label: 'Villas', icon: FaCrown, count: 456 },
    { value: 'penthouse', label: 'Penthouses', icon: FaStar, count: 234 },
    { value: 'estate', label: 'Estates', icon: FaGem, count: 18 }
  ]

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'featured', label: 'Featured' }
  ]

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
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
    setCurrentPage(1)
  }

  const loadMoreProperties = () => {
    setCurrentPage(prev => prev + 1)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        
        {/* Page Header */}
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
            <FaGem className="text-lg" />
            <span className="tracking-wider">PREMIUM PROPERTIES</span>
            <FaCrown className="text-lg" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Discover Your
            <span className="block text-gradient bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 bg-clip-text text-transparent">
              Perfect Home
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our curated collection of luxury properties across South Africa's most prestigious locations
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          variants={itemVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center"
              whileHover={{ scale: 1.02, y: -2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className={`text-2xl mb-3 p-3 bg-gradient-to-r ${stat.color} rounded-xl inline-flex items-center justify-center shadow-md`}>
                <stat.icon className="text-white" />
              </div>
              <div className="text-2xl font-black text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 font-semibold">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8"
          variants={itemVariants}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            
            {/* Search Input */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search properties by location, type, or features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 text-sm font-medium"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-white text-amber-600 shadow-md' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FaThLarge className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-white text-amber-600 shadow-md' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FaList className="w-4 h-4" />
              </button>
            </div>

            {/* Advanced Filter Toggle */}
            <motion.button
              onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 font-semibold text-sm ${
                showAdvancedFilter 
                  ? 'bg-amber-600 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaFilter className="w-4 h-4" />
              Advanced
            </motion.button>

            {/* Clear Filters */}
            <motion.button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-3 text-gray-600 hover:text-gray-800 transition-all duration-300 font-medium text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaTimes className="w-4 h-4" />
              Clear
            </motion.button>
          </div>

          {/* Advanced Filter Panel */}
          <AnimatePresence>
            {showAdvancedFilter && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="mt-6 pt-6 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Property Type</label>
                    <select className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 text-sm">
                      <option value="all">All Types</option>
                      <option value="house">Houses</option>
                      <option value="apartment">Apartments</option>
                      <option value="villa">Villas</option>
                      <option value="penthouse">Penthouses</option>
                    </select>
                  </div>

                  {/* Sort Options */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                    <select className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 text-sm">
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bedrooms</label>
                    <select className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 text-sm">
                      <option value="any">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Max Price</label>
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="50000000"
                        step="1000000"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>R0</span>
                        <span>R50M+</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                  <motion.button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-all duration-300 font-medium text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaTimes className="w-4 h-4" />
                    Clear All
                  </motion.button>
                  
                  <motion.button
                    className="px-6 py-2 bg-gradient-to-r from-amber-600 to-yellow-500 text-white rounded-lg transition-all duration-300 font-semibold text-sm shadow-md"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Apply Filters
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Category Pills */}
        <motion.div 
          className="flex flex-wrap gap-3 mb-8"
          variants={itemVariants}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 font-semibold text-sm shadow-md ${
                selectedCategory === category.value
                  ? 'bg-gradient-to-r from-amber-600 to-yellow-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <category.icon className="w-4 h-4" />
              {category.label}
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-bold">
                {category.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Results Header */}
        <motion.div 
          className="flex justify-between items-center mb-8"
          variants={itemVariants}
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Properties</h2>
            <p className="text-gray-600 text-sm">Showing 12 of 2,847 properties</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaShieldAlt className="w-4 h-4 text-green-500" />
            <span className="font-semibold">Verified Listings</span>
          </div>
        </motion.div>

        {/* Properties Grid */}
        <motion.div 
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}
          variants={itemVariants}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <Item key={index} viewMode={viewMode} />
          ))}
        </motion.div>

        {/* Load More Button */}
        <motion.div 
          className="text-center mt-12"
          variants={itemVariants}
        >
          <motion.button
            onClick={loadMoreProperties}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-yellow-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 group shadow-lg"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            Load More Properties
            <FaArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>

        {/* No Properties Found */}
        {properties.length === 0 && !loading && (
          <motion.div 
            className="text-center py-16"
            variants={itemVariants}
          >
            <div className="text-6xl mb-6">🏠</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Properties Found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Try adjusting your search criteria or browse our featured properties below.
            </p>
            <motion.button
              onClick={clearFilters}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-yellow-500 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaTimes className="w-4 h-4" />
              Clear Filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Properties