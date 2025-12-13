import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch, FaFilter, FaTimes, FaThLarge, FaList, FaBed, FaBath, FaRulerCombined, FaHome, FaBuilding, FaCrown, FaStar, FaGem, FaTrophy, FaShieldAlt, FaCheckCircle, FaArrowRight, FaArrowLeft, FaBookmark, FaSave } from 'react-icons/fa'
import { useQuery } from 'react-query'
import { getAllProperties } from '../utils/api'
import Item from './Item'
import LoadingSpinner from './LoadingSpinner'
import SavedSearches from './SavedSearches'
import { useSavedSearches } from '../hooks/useSavedSearches'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Properties = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [minBedrooms, setMinBedrooms] = useState('any')
  const [maxPrice, setMaxPrice] = useState(50000000)
  const [viewMode, setViewMode] = useState('grid')
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false)
  const [showSaveSearchModal, setShowSaveSearchModal] = useState(false)
  const [searchName, setSearchName] = useState('')
  const { saveSearch } = useSavedSearches()

  // Fetch properties from API
  const { data: propertiesData, isLoading, isError, error } = useQuery(
    'allProperties',
    getAllProperties,
    {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
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
  }, [properties, searchTerm, selectedCategory, minBedrooms, maxPrice, sortBy])

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
    setMaxPrice(50000000)
  }

  const handleSaveSearch = () => {
    const searchParams = {
      searchTerm,
      category: selectedCategory,
      minBedrooms,
      maxPrice,
      sortBy,
      resultCount: filteredAndSortedProperties.length,
    };
    
    const success = saveSearch(searchParams, searchName);
    if (success) {
      setShowSaveSearchModal(false);
      setSearchName('');
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
          className="text-center mb-8 sm:mb-12"
          variants={itemVariants}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Discover Your
            <span className="block bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 bg-clip-text text-transparent">
              Perfect Home
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of luxury properties across South Africa
          </p>
        </motion.div>

        {/* Search and Filter Section - Cleaner */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-4 sm:p-6 mb-8 hover:shadow-xl transition-all duration-300"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            
            {/* Search Input */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-enhanced pl-10 text-sm"
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

            {/* Save Search Button */}
            <motion.button
              onClick={() => setShowSaveSearchModal(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 font-medium text-sm bg-amber-50 text-amber-700 hover:bg-amber-100 hover:shadow-md"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaBookmark className="w-4 h-4" />
              <span className="hidden sm:inline">Save Search</span>
            </motion.button>

            {/* Filter Toggle */}
            <motion.button
              onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 font-medium text-sm ${
                showAdvancedFilter 
                  ? 'bg-gradient-to-r from-amber-600 to-yellow-500 text-white shadow-lg glow-amber-hover' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
              }`}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaFilter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </motion.button>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  
                  {/* Category Filter */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">Property Type</label>
                    <select className="input-enhanced text-sm">
                      <option value="all">All Types</option>
                      <option value="house">Houses</option>
                      <option value="apartment">Apartments</option>
                      <option value="villa">Villas</option>
                      <option value="penthouse">Penthouses</option>
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
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">Bedrooms</label>
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
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                      Max Price: <span className="text-amber-600 font-semibold">{formatPrice(maxPrice)}</span>
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="50000000"
                        step="1000000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>R0</span>
                        <span>R50M+</span>
                      </div>
                    </div>
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
          className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2 -mx-2 px-2"
          variants={itemVariants}
        >
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-300 font-medium text-xs sm:text-sm whitespace-nowrap ${
                selectedCategory === category.value
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <category.icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{category.label}</span>
              <span className={`px-1.5 py-0.5 rounded text-xs font-semibold ${
                selectedCategory === category.value ? 'bg-white/20' : 'bg-gray-100'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Results Header - Simplified */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'All Properties' : categories.find(c => c.value === selectedCategory)?.label}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {filteredAndSortedProperties.length} {filteredAndSortedProperties.length === 1 ? 'property' : 'properties'} found
            </p>
          </div>
        </div>

        {/* Properties Grid */}
        {filteredAndSortedProperties.length > 0 ? (
          <motion.div 
            className={`grid gap-4 sm:gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
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
    </motion.div>
  )
}

export default Properties