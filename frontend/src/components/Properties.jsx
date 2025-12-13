import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch, FaFilter, FaTimes, FaThLarge, FaList, FaBed, FaBath, FaRulerCombined, FaHome, FaBuilding, FaCrown, FaStar, FaGem, FaTrophy, FaShieldAlt, FaCheckCircle, FaArrowRight, FaArrowLeft, FaBookmark, FaSave, FaBell, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'
import { useQuery } from 'react-query'
import { getAllProperties } from '../utils/api'
import Item from './Item'
import LoadingSpinner from './LoadingSpinner'
import SavedSearches from './SavedSearches'
import { useSavedSearches } from '../hooks/useSavedSearches'
import { usePropertyAlerts } from '../hooks/usePropertyAlerts'
import PropertyAlerts from './PropertyAlerts'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Properties = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [minBedrooms, setMinBedrooms] = useState('any')
  const [minBathrooms, setMinBathrooms] = useState('any')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(50000000)
  const [minArea, setMinArea] = useState(0)
  const [maxArea, setMaxArea] = useState(10000)
  const [selectedCity, setSelectedCity] = useState('all')
  const [featuredOnly, setFeaturedOnly] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false)
  const [showSaveSearchModal, setShowSaveSearchModal] = useState(false)
  const [showAlertModal, setShowAlertModal] = useState(false)
  const [showCreateAlertModal, setShowCreateAlertModal] = useState(false)
  const [alertName, setAlertName] = useState('')
  const { saveSearch } = useSavedSearches()
  const { createAlert } = usePropertyAlerts()

  // Fetch properties from API with optimized caching
  const { data: propertiesData, isLoading, isError, error } = useQuery(
    'allProperties',
    getAllProperties,
    {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes - keep in cache
      refetchOnMount: false, // Don't refetch if data exists in cache
    }
  )

  // Deduplicate properties by ID - Optimized
  const properties = useMemo(() => {
    if (!propertiesData) return []
    const dataArray = Array.isArray(propertiesData) ? propertiesData : []
    const seen = new Set()
    return dataArray.filter(property => {
      // Use a more efficient ID generation
      const id = property.id || property._id || `${property.title}-${property.address}`
      if (!id || seen.has(id)) return false
      seen.add(id)
      return true
    })
  }, [propertiesData])

  // Mock data for demonstration
  const stats = [
    { value: "2,847", label: "Properties", icon: FaHome, color: "from-blue-500 to-cyan-500" },
    { value: "R5.2B+", label: "Total Value", icon: FaGem, color: "from-purple-500 to-pink-500" },
    { value: "99%", label: "Satisfaction", icon: FaCheckCircle, color: "from-green-500 to-emerald-500" },
    { value: "25+", label: "Years", icon: FaTrophy, color: "from-amber-500 to-yellow-500" }
  ]

  // Calculate category counts from actual data
  const categoryCounts = useMemo(() => {
    const counts = { all: properties.length }
    properties.forEach(prop => {
      const category = prop.category?.toLowerCase() || 'other'
      counts[category] = (counts[category] || 0) + 1
      counts.all = properties.length
    })
    return counts
  }, [properties])

  const categories = [
    { value: 'all', label: 'All Properties', icon: FaHome, count: categoryCounts.all || 0 },
    { value: 'house', label: 'Houses', icon: FaHome, count: categoryCounts.house || 0 },
    { value: 'apartment', label: 'Apartments', icon: FaBuilding, count: categoryCounts.apartment || 0 },
    { value: 'villa', label: 'Villas', icon: FaCrown, count: categoryCounts.villa || 0 },
    { value: 'penthouse', label: 'Penthouses', icon: FaStar, count: categoryCounts.penthouse || 0 },
    { value: 'estate', label: 'Estates', icon: FaGem, count: categoryCounts.estate || 0 }
  ]

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'featured', label: 'Featured' }
  ]

  // Filter and sort properties
  const filteredAndSortedProperties = useMemo(() => {
    let filtered = [...properties]

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(prop =>
        prop.title?.toLowerCase().includes(searchLower) ||
        prop.description?.toLowerCase().includes(searchLower) ||
        prop.address?.toLowerCase().includes(searchLower) ||
        prop.city?.toLowerCase().includes(searchLower)
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(prop =>
        prop.category?.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    }

    // Bedrooms filter
    if (minBedrooms !== 'any') {
      filtered = filtered.filter(prop =>
        (prop.facilities?.bedrooms || prop.bedrooms || 0) >= parseInt(minBedrooms)
      )
    }

    // Price filter
    filtered = filtered.filter(prop => prop.price <= maxPrice)

    // Sort
    switch (sortBy) {
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'featured':
        filtered.sort((a, b) => {
          const aFeatured = a.featured || a.facilities?.featured || false
          const bFeatured = b.featured || b.facilities?.featured || false
          return bFeatured - aFeatured
        })
        break
      case 'popular':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        break
    }

    return filtered
  }, [properties, searchTerm, selectedCategory, minBedrooms, minBathrooms, minPrice, maxPrice, minArea, maxArea, selectedCity, featuredOnly, sortBy])

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
    setSortBy('newest')
    setMinBedrooms('any')
    setMinBathrooms('any')
    setMinPrice(0)
    setMaxPrice(50000000)
    setMinArea(0)
    setMaxArea(10000)
    setSelectedCity('all')
    setFeaturedOnly(false)
  }

  // Get unique cities from properties
  const cities = useMemo(() => {
    const citySet = new Set()
    properties.forEach(prop => {
      if (prop.city) {
        citySet.add(prop.city)
      }
    })
    return Array.from(citySet).sort()
  }, [properties])

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (searchTerm) count++
    if (selectedCategory !== 'all') count++
    if (minBedrooms !== 'any') count++
    if (minBathrooms !== 'any') count++
    if (minPrice > 0) count++
    if (maxPrice < 50000000) count++
    if (minArea > 0) count++
    if (maxArea < 10000) count++
    if (selectedCity !== 'all') count++
    if (featuredOnly) count++
    return count
  }, [searchTerm, selectedCategory, minBedrooms, minBathrooms, minPrice, maxPrice, minArea, maxArea, selectedCity, featuredOnly])

  const handleSaveSearch = () => {
    const searchParams = {
      searchTerm,
      selectedCategory,
      minBedrooms,
      maxPrice,
      sortBy,
      resultCount: filteredAndSortedProperties.length,
    };
    
    const success = saveSearch(searchName, searchParams);
    if (success) {
      setShowSaveSearchModal(false);
      setSearchName('');
    }
  }

  const handleCreateAlert = () => {
    const alertCriteria = {
      searchTerm,
      selectedCategory,
      minBedrooms,
      maxPrice,
      sortBy,
    };
    
    const success = createAlert(alertName, alertCriteria);
    if (success) {
      setShowCreateAlertModal(false);
      setAlertName('');
    }
  }

  // Load search params from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('q')) setSearchTerm(params.get('q'));
    if (params.get('category')) setSelectedCategory(params.get('category'));
    if (params.get('bedrooms')) setMinBedrooms(params.get('bedrooms'));
    if (params.get('maxPrice')) setMaxPrice(parseInt(params.get('maxPrice')));
    if (params.get('city')) setSearchTerm(prev => prev || params.get('city'));
    if (params.get('sort')) setSortBy(params.get('sort'));
  }, [])

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Properties</h2>
          <p className="text-gray-600 mb-6">{error?.message || 'Failed to load properties'}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-500 text-white rounded-xl font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-24 pb-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header - Simplified */}
        <motion.div 
          className="text-center mb-6 sm:mb-8 md:mb-12"
          variants={itemVariants}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight px-2 sm:px-0">
            Discover Your
            <span className="block bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 bg-clip-text text-transparent">
              Perfect Home
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
            Explore our curated collection of luxury properties across South Africa
          </p>
        </motion.div>

        {/* Search and Filter Section - Cleaner */}
        <motion.div 
          className="bg-white rounded-xl sm:rounded-2xl shadow-lg border-2 border-gray-200 p-3 sm:p-4 md:p-6 mb-6 sm:mb-8 hover:shadow-xl transition-all duration-300"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4">
            
            {/* Search Input */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-enhanced pl-10 text-sm sm:text-base py-2 sm:py-2.5"
              />
            </div>

            {/* View Mode Toggle - Hidden on mobile */}
            <div className="hidden sm:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-white text-amber-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-label="Grid view"
              >
                <FaThLarge className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-white text-amber-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-label="List view"
              >
                <FaList className="w-4 h-4" />
              </button>
            </div>

            {/* Action Buttons Row - Mobile optimized */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {/* Save Search Button */}
              <motion.button
                onClick={() => setShowSaveSearchModal(true)}
                className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-300 font-medium text-xs sm:text-sm bg-amber-50 text-amber-700 hover:bg-amber-100 hover:shadow-md active:scale-95"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaBookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Save</span>
              </motion.button>

              {/* Create Alert Button */}
              <motion.button
                onClick={() => setShowCreateAlertModal(true)}
                className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-300 font-medium text-xs sm:text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 hover:shadow-md active:scale-95"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaBell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Alert</span>
              </motion.button>

              {/* View Alerts Button */}
              <motion.button
                onClick={() => setShowAlertModal(true)}
                className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-300 font-medium text-xs sm:text-sm bg-purple-50 text-purple-700 hover:bg-purple-100 hover:shadow-md active:scale-95"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaBell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">View</span>
              </motion.button>

              {/* Filter Toggle */}
              <motion.button
                onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
                className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-300 font-medium text-xs sm:text-sm relative active:scale-95 ${
                  showAdvancedFilter 
                    ? 'bg-gradient-to-r from-amber-600 to-yellow-500 text-white shadow-lg glow-amber-hover' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                }`}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFilter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[16px] h-4 sm:h-5 flex items-center justify-center font-bold px-1 text-[10px] sm:text-xs">
                    {activeFilterCount}
                  </span>
                )}
              </motion.button>
            </div>
          </div>

          {/* Advanced Filter Panel */}
          <AnimatePresence>
            {showAdvancedFilter && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  
                  {/* Category Filter */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1">
                      <FaHome className="w-3 h-3" />
                      Property Type
                    </label>
                    <select 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="input-enhanced text-sm"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label} {cat.count > 0 && `(${cat.count})`}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort Options */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">Sort By</label>
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="input-enhanced text-sm"
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
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1">
                      <FaBed className="w-3 h-3" />
                      Bedrooms
                    </label>
                    <select 
                      value={minBedrooms}
                      onChange={(e) => setMinBedrooms(e.target.value)}
                      className="input-enhanced text-sm"
                    >
                      <option value="any">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                      <option value="5">5+</option>
                      <option value="6">6+</option>
                    </select>
                  </div>

                  {/* Bathrooms */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1">
                      <FaBath className="w-3 h-3" />
                      Bathrooms
                    </label>
                    <select 
                      value={minBathrooms}
                      onChange={(e) => setMinBathrooms(e.target.value)}
                      className="input-enhanced text-sm"
                    >
                      <option value="any">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                      <option value="5">5+</option>
                    </select>
                  </div>

                  {/* City/Location */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1">
                      <FaMapMarkerAlt className="w-3 h-3" />
                      Location
                    </label>
                    <select 
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="input-enhanced text-sm"
                    >
                      <option value="all">All Cities</option>
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price Range Section */}
                <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Price Range
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <label className="block text-xs text-gray-600 mb-1">Min Price</label>
                        <input
                          type="number"
                          min="0"
                          max={maxPrice}
                          step="100000"
                          value={minPrice}
                          onChange={(e) => setMinPrice(Math.max(0, parseInt(e.target.value) || 0))}
                          className="input-enhanced text-sm w-full"
                          placeholder="R0"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs text-gray-600 mb-1">Max Price</label>
                        <input
                          type="number"
                          min={minPrice}
                          max="50000000"
                          step="100000"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(Math.min(50000000, parseInt(e.target.value) || 50000000))}
                          className="input-enhanced text-sm w-full"
                          placeholder="R50M"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="50000000"
                        step="500000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{formatPrice(minPrice)}</span>
                        <span className="text-amber-600 font-semibold">{formatPrice(maxPrice)}</span>
                        <span>R50M+</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Area Range Section */}
                <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <FaRulerCombined className="w-4 h-4" />
                    Area (m²)
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <label className="block text-xs text-gray-600 mb-1">Min Area</label>
                        <input
                          type="number"
                          min="0"
                          max={maxArea}
                          step="10"
                          value={minArea}
                          onChange={(e) => setMinArea(Math.max(0, parseInt(e.target.value) || 0))}
                          className="input-enhanced text-sm w-full"
                          placeholder="0 m²"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs text-gray-600 mb-1">Max Area</label>
                        <input
                          type="number"
                          min={minArea}
                          max="10000"
                          step="10"
                          value={maxArea}
                          onChange={(e) => setMaxArea(Math.min(10000, parseInt(e.target.value) || 10000))}
                          className="input-enhanced text-sm w-full"
                          placeholder="10000 m²"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Options */}
                <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Additional Options</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featuredOnly"
                      checked={featuredOnly}
                      onChange={(e) => setFeaturedOnly(e.target.checked)}
                      className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                    />
                    <label htmlFor="featuredOnly" className="text-sm text-gray-700 flex items-center gap-2 cursor-pointer">
                      <FaStar className="w-4 h-4 text-amber-500" />
                      Featured Properties Only
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end items-center mt-4 sm:mt-6 pt-4 border-t border-gray-200">
                  <motion.button
                    onClick={clearFilters}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-all duration-300 font-medium text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Clear Filters
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Category Pills - Simplified */}
        <motion.div 
          className="flex flex-wrap gap-2 sm:gap-2.5 mb-4 sm:mb-6 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide"
          variants={itemVariants}
        >
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all duration-300 font-medium text-xs sm:text-sm whitespace-nowrap active:scale-95 ${
                selectedCategory === category.value
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 active:bg-gray-100'
              }`}
            >
              <category.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="hidden xs:inline sm:hidden">{category.label.split(' ')[0]}</span>
              <span className="hidden sm:inline">{category.label}</span>
              <span className={`px-1.5 py-0.5 rounded text-xs font-semibold flex-shrink-0 ${
                selectedCategory === category.value ? 'bg-white/20' : 'bg-gray-100'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Results Header - Simplified */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'All Properties' : categories.find(c => c.value === selectedCategory)?.label}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-0.5 sm:mt-1">
              {filteredAndSortedProperties.length} {filteredAndSortedProperties.length === 1 ? 'property' : 'properties'} found
            </p>
          </div>
        </div>

        {/* Properties Grid */}
        {filteredAndSortedProperties.length > 0 ? (
          <motion.div 
            className={`grid gap-4 sm:gap-5 md:gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}
            variants={itemVariants}
          >
            {filteredAndSortedProperties.map((property, index) => (
              <Item 
                key={property.id || property._id || index} 
                property={property}
                viewMode={viewMode}
                onClick={() => navigate(`/listing/${property.id || property._id}`)}
              />
            ))}
          </motion.div>
        ) : (
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

      {/* Save Search Modal */}
      <AnimatePresence>
        {showSaveSearchModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => {
                setShowSaveSearchModal(false);
                setSearchName('');
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Save Search</h3>
                  <button
                    onClick={() => {
                      setShowSaveSearchModal(false);
                      setSearchName('');
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FaTimes className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm">
                  Save your current search filters to quickly access them later.
                </p>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Name
                  </label>
                  <input
                    type="text"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    placeholder="e.g., Luxury Cape Town Homes"
                    className="input-enhanced w-full"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSaveSearch();
                      }
                    }}
                    autoFocus
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm">
                  <p className="text-gray-600 mb-2 font-medium">Search Criteria:</p>
                  <ul className="space-y-1 text-gray-600">
                    {searchTerm && <li>• Search: "{searchTerm}"</li>}
                    {selectedCategory !== 'all' && <li>• Category: {selectedCategory}</li>}
                    {minBedrooms !== 'any' && <li>• Bedrooms: {minBedrooms}+</li>}
                    {maxPrice < 50000000 && <li>• Max Price: {formatPrice(maxPrice)}</li>}
                    {sortBy !== 'newest' && <li>• Sort: {sortOptions.find(o => o.value === sortBy)?.label}</li>}
                    <li>• Results: {filteredAndSortedProperties.length} properties</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowSaveSearchModal(false);
                      setSearchName('');
                    }}
                    className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveSearch}
                    disabled={!searchName.trim()}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    <FaSave className="inline w-4 h-4 mr-2" />
                    Save
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Create Alert Modal */}
      <AnimatePresence>
        {showCreateAlertModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => {
                setShowCreateAlertModal(false);
                setAlertName('');
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FaBell className="text-blue-600 w-5 h-5" />
                    <h3 className="text-xl font-bold text-gray-900">Create Property Alert</h3>
                  </div>
                  <button
                    onClick={() => {
                      setShowCreateAlertModal(false);
                      setAlertName('');
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FaTimes className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm">
                  Get notified when new properties match your search criteria.
                </p>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alert Name
                  </label>
                  <input
                    type="text"
                    value={alertName}
                    onChange={(e) => setAlertName(e.target.value)}
                    placeholder="e.g., Luxury Cape Town Alerts"
                    className="input-enhanced w-full"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleCreateAlert();
                      }
                    }}
                    autoFocus
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-3 mb-4 text-sm">
                  <p className="text-gray-600 mb-2 font-medium">Alert Criteria:</p>
                  <ul className="space-y-1 text-gray-600">
                    {searchTerm && <li>• Search: "{searchTerm}"</li>}
                    {selectedCategory !== 'all' && <li>• Category: {selectedCategory}</li>}
                    {minBedrooms !== 'any' && <li>• Bedrooms: {minBedrooms}+</li>}
                    {maxPrice < 50000000 && <li>• Max Price: {formatPrice(maxPrice)}</li>}
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowCreateAlertModal(false);
                      setAlertName('');
                    }}
                    className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateAlert}
                    disabled={!alertName.trim()}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    <FaBell className="inline w-4 h-4 mr-2" />
                    Create Alert
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Property Alerts Modal */}
      <PropertyAlerts opened={showAlertModal} onClose={() => setShowAlertModal(false)} />
    </motion.div>
  )
}

export default Properties