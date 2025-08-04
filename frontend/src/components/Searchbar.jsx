import React, { useState, useEffect, useRef } from 'react'
import { FaSearch, FaMapMarkerAlt, FaFilter, FaTimes, FaBed, FaBath, FaRulerCombined, FaHome, FaBuilding, FaCrown, FaStar, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState('')
  const [propertyType, setPropertyType] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 200000000])
  const [bedrooms, setBedrooms] = useState('any')
  const [bathrooms, setBathrooms] = useState('any')
  const [isFocused, setIsFocused] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const searchRef = useRef(null)
  const navigate = useNavigate()

  const popularLocations = [
    'Cape Town', 'Johannesburg', 'Durban', 'Stellenbosch', 
    'Pretoria', 'Plettenberg Bay', 'Franschhoek', 'Umhlanga',
    'Camps Bay', 'Clifton', 'Sandton', 'Rosebank', 'Bryanston',
    'Ballito', 'Hermanus', 'Knysna', 'Plettenberg Bay'
  ]

  const propertyTypes = [
    { value: 'all', label: 'All Types', icon: FaHome },
    { value: 'house', label: 'House', icon: FaHome },
    { value: 'apartment', label: 'Apartment', icon: FaBuilding },
    { value: 'villa', label: 'Villa', icon: FaCrown },
    { value: 'penthouse', label: 'Penthouse', icon: FaStar },
    { value: 'estate', label: 'Estate', icon: FaCrown },
    { value: 'beach house', label: 'Beach House', icon: FaHome },
    { value: 'townhouse', label: 'Townhouse', icon: FaBuilding }
  ]

  const bedroomOptions = [
    { value: 'any', label: 'Any Beds' },
    { value: '1', label: '1+ Bed' },
    { value: '2', label: '2+ Beds' },
    { value: '3', label: '3+ Beds' },
    { value: '4', label: '4+ Beds' },
    { value: '5', label: '5+ Beds' }
  ]

  const bathroomOptions = [
    { value: 'any', label: 'Any Baths' },
    { value: '1', label: '1+ Bath' },
    { value: '2', label: '2+ Baths' },
    { value: '3', label: '3+ Baths' },
    { value: '4', label: '4+ Baths' }
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false)
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchTerm) params.append('search', searchTerm)
    if (selectedLocation) params.append('location', selectedLocation)
    if (propertyType !== 'all') params.append('type', propertyType)
    if (bedrooms !== 'any') params.append('bedrooms', bedrooms)
    if (bathrooms !== 'any') params.append('bathrooms', bathrooms)
    if (priceRange[1] < 200000000) params.append('maxPrice', priceRange[1])

    navigate(`/listing?${params.toString()}`)
  }

  const clearSearch = () => {
    setSearchTerm('')
    setSelectedLocation('')
    setPropertyType('all')
    setPriceRange([0, 200000000])
    setBedrooms('any')
    setBathrooms('any')
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <motion.div 
      className="relative w-full max-w-4xl mx-auto" 
      ref={searchRef}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main Search Bar */}
      <div className="relative">
        <div className="flex items-center bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300">
          {/* Location Input */}
          <div className="flex-1 relative">
            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500/70" />
            <input
              type="text"
              placeholder="Where are you looking?"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              onFocus={() => {
                setIsFocused(true)
                setIsExpanded(true)
              }}
              className="w-full pl-10 pr-4 py-3 border-0 focus:outline-none focus:ring-0 bg-transparent text-gray-700 placeholder-gray-500 font-medium text-sm"
            />
          </div>

          {/* Property Type */}
          <div className="border-l border-gray-200/50 relative">
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="px-4 py-3 border-0 focus:outline-none focus:ring-0 bg-transparent text-gray-700 font-medium appearance-none cursor-pointer text-sm"
            >
              {propertyTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Search Button */}
          <motion.button
            onClick={handleSearch}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 font-semibold relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <FaSearch className="w-4 h-4 relative z-10" />
          </motion.button>

          {/* Advanced Filter Toggle */}
          <motion.button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`px-4 py-3 border-l border-gray-200/50 transition-all duration-300 relative overflow-hidden ${
              showAdvanced ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-gray-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaFilter className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Location Suggestions */}
      <AnimatePresence>
        {isFocused && selectedLocation && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border border-white/20 rounded-lg shadow-xl z-50 mt-2 overflow-hidden"
          >
            <div className="max-h-64 overflow-y-auto">
              {popularLocations
                .filter(location => 
                  location.toLowerCase().includes(selectedLocation.toLowerCase())
                )
                .map((location, index) => (
                  <motion.button
                    key={location}
                    onClick={() => {
                      setSelectedLocation(location)
                      setIsFocused(false)
                      setIsExpanded(false)
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-all duration-200 flex items-center gap-3"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <FaMapMarkerAlt className="text-blue-500/70 flex-shrink-0" />
                    <span className="font-medium text-gray-700 text-sm">{location}</span>
                  </motion.button>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Advanced Search Panel */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border border-white/20 rounded-lg shadow-xl z-50 mt-2 p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Bedrooms */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaBed className="text-blue-500" />
                  Bedrooms
                </label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-sm"
                >
                  {bedroomOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Bathrooms */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaBath className="text-blue-500" />
                  Bathrooms
                </label>
                <select
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-sm"
                >
                  {bathroomOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Price Range */}
              <motion.div 
                className="lg:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaRulerCombined className="text-blue-500" />
                  Price Range
                </label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <input
                        type="range"
                        min="0"
                        max="200000000"
                        step="1000000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                    <span className="text-sm font-semibold text-blue-600 whitespace-nowrap">
                      Up to {formatPrice(priceRange[1])}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>R0</span>
                    <span>R200M+</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div 
              className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                onClick={clearSearch}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-all duration-300 font-medium text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTimes className="w-4 h-4" />
                Clear All
              </motion.button>
              
              <motion.button
                onClick={handleSearch}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 font-semibold text-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Search Properties
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Searchbar