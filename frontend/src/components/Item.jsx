import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { FaHeart, FaShare, FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaStar, FaCrown, FaGem, FaEye, FaArrowRight, FaBalanceScale } from 'react-icons/fa'
import OptimizedImage from './OptimizedImage'
import { useMockAuth } from '../context/MockAuthContext'
import { toFav } from '../utils/api'
import { usePropertyComparison } from '../hooks/usePropertyComparison'

const Item = ({ property: prop, viewMode = 'grid', onClick }) => {
  const navigate = useNavigate()
  const { isAuthenticated, user, getAccessTokenSilently } = useMockAuth()
  const { addToComparison, isInComparison, canAddMore } = usePropertyComparison()
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  // Use provided property or fallback to mock data
  const property = prop || {
    id: 1,
    title: "Luxury Beachfront Villa",
    location: "Camps Bay, Cape Town",
    price: 25000000,
    type: "Villa",
    status: "For Sale",
    rating: 4.9,
    beds: 5,
    baths: 4,
    area: 450,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format&fit=crop&q=80",
    features: ["Ocean View", "Private Pool", "Garden", "Security"]
  }

  // Get property ID
  const propertyId = property?.id || property?._id
  
  // Check if property is in favorites on mount and when propertyId changes
  useEffect(() => {
    if (propertyId) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
      const idString = String(propertyId)
      setIsLiked(favorites.includes(idString))
    }
  }, [propertyId])
  
  // Handle favorite toggle
  const handleToggleFavorite = async (e) => {
    e.stopPropagation()
    
    if (!isAuthenticated) {
      toast.error('Please login to add favorites')
      return
    }
    
    if (!propertyId) {
      toast.error('Invalid property')
      return
    }
    
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
      const idString = String(propertyId)
      
      // Update localStorage first (optimistic update)
      let newFavorites
      if (isLiked) {
        // Remove from favorites
        newFavorites = favorites.filter(favId => String(favId) !== idString)
        localStorage.setItem('favorites', JSON.stringify(newFavorites))
        setIsLiked(false)
        toast.success('Removed from favorites')
      } else {
        // Add to favorites
        newFavorites = [...favorites, idString]
        localStorage.setItem('favorites', JSON.stringify(newFavorites))
        setIsLiked(true)
        toast.success('Added to favorites')
      }
      
      // Call API to sync with backend (non-blocking)
      if (user?.email) {
        // Don't await - let it run in background
        (async () => {
          try {
            const token = getAccessTokenSilently ? await getAccessTokenSilently() : 'mock-token'
            await toFav(propertyId, user.email, token)
          } catch (apiError) {
            // Silently fail - favorites are already saved in localStorage
            // Only log in development
            if (import.meta.env.DEV) {
              console.warn('Failed to sync favorites with backend (favorites still saved locally):', apiError?.response?.data || apiError?.message)
            }
          }
        })()
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
      // Only show error if localStorage operation failed
      toast.error('Failed to save favorite. Please try again.')
    }
  }

  // Handle click - use provided onClick or default navigation
  const handleClick = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    try {
      if (onClick) {
        onClick()
      } else if (propertyId) {
        // Ensure ID is a string and valid
        const validId = String(propertyId).trim()
        if (validId && validId !== 'undefined' && validId !== 'null') {
          navigate(`/listing/${validId}`)
        } else {
          if (import.meta.env.DEV) {
            console.warn('Invalid property ID:', propertyId)
          }
          toast.error('Invalid property. Please try another property.')
        }
      } else {
        if (import.meta.env.DEV) {
          console.warn('No property ID or onClick handler provided', property)
        }
        toast.error('Property information is missing. Please try another property.')
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Navigation error:', error)
      }
      toast.error('Unable to load property. Please try again.')
    }
  }
  
  // Handle card click
  const handleCardClick = (e) => {
    // Don't navigate if clicking on buttons
    if (e.target.closest('button') || e.target.closest('a')) {
      return
    }
    handleClick()
  }

  // Extract data from property object
  const title = property.title || 'Property'
  const location = property.address ? `${property.address}, ${property.city || ''}` : property.location || 'Location TBD'
  const price = property.price || 0
  const type = property.category || property.type || 'Property'
  const rating = property.rating || property.facilities?.rating || 4.5
  const facilities = property.facilities || {}
  const beds = facilities.bedrooms || facilities.bed || property.beds || 0
  const baths = facilities.bathrooms || facilities.bath || property.baths || 0
  const area = facilities.area || property.area || 0
  const image = property.image || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format&fit=crop&q=80"
  const features = property.features || []

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const containerVariants = {
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

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.article
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group cursor-pointer"
        variants={containerVariants}
        whileHover={{ y: -2 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="article"
        aria-label={`${title} - ${type} in ${location} - ${formatPrice(price)}`}
      >
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-1/3 relative overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="w-full h-64 lg:h-full"
            >
              <OptimizedImage
                src={image}
                alt={title}
                className="w-full h-full"
                width={600}
                height={400}
                loading="lazy"
                objectFit="cover"
              />
            </motion.div>
            
            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                {property.status || 'For Sale'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFavorite(e);
                }}
                type="button"
                className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                  isLiked 
                    ? 'bg-red-500 text-white shadow-lg' 
                    : 'bg-white/80 text-gray-600 hover:text-red-500'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isLiked ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
                aria-pressed={isLiked}
              >
                <FaHeart className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  if (canAddMore) {
                    addToComparison(property);
                  }
                }}
                disabled={!canAddMore || isInComparison(propertyId)}
                type="button"
                className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                  isInComparison(propertyId)
                    ? 'bg-amber-500 text-white shadow-lg'
                    : canAddMore
                    ? 'bg-white/80 text-gray-600 hover:text-amber-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                whileHover={canAddMore && !isInComparison(propertyId) ? { scale: 1.1 } : {}}
                whileTap={canAddMore && !isInComparison(propertyId) ? { scale: 0.9 } : {}}
                aria-label={isInComparison(propertyId) ? `${title} is in comparison list` : canAddMore ? `Add ${title} to comparison` : 'Comparison list is full (maximum 4 properties)'}
                aria-disabled={!canAddMore || isInComparison(propertyId)}
              >
                <FaBalanceScale className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Price Overlay */}
            <motion.div
              className="absolute bottom-4 left-4 bg-gradient-to-r from-amber-600 to-yellow-500 text-white px-4 py-2 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-lg font-bold">{formatPrice(price)}</div>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="lg:w-2/3 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-gradient-to-r from-amber-600 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {type}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <FaStar className="w-4 h-4" />
                    <span className="text-sm font-semibold">{rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                  {title}
                </h3>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <FaMapMarkerAlt className="w-4 h-4 text-amber-500" />
                  <span>{location}</span>
                </div>
              </div>
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {features.map((feature, index) => (
                <span
                  key={index}
                  className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold"
                >
                  {feature}
                </span>
              ))}
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                  <FaBed className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{beds}</div>
                  <div className="text-xs text-gray-600">Beds</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <FaBath className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{baths}</div>
                  <div className="text-xs text-gray-600">Baths</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                  <FaRulerCombined className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{area}m²</div>
                  <div className="text-xs text-gray-600">Area</div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-2xl font-bold text-amber-600">
                {formatPrice(price)}
              </div>
              <motion.button
                onClick={handleClick}
                type="button"
                className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-yellow-500 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-lg hover:shadow-2xl transition-all duration-300 group glow-amber-hover focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`View details for ${title}`}
              >
                <FaEye className="w-4 h-4" />
                View Details
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.article>
    )
  }

  // Grid View
  return (
    <motion.article
      className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-amber-300 hover:ring-2 hover:ring-amber-200/50 focus-within:ring-2 focus-within:ring-amber-500 focus-within:ring-offset-2"
      variants={containerVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="article"
      aria-label={`${title} - ${type} in ${location} - ${formatPrice(price)}`}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden bg-gray-100">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="w-full h-48 sm:h-56"
        >
          <OptimizedImage
            src={image}
            alt={title}
            className="w-full h-full"
            width={600}
            height={400}
            loading="lazy"
            objectFit="cover"
          />
        </motion.div>
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
            {property.status || 'For Sale'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFavorite(e);
            }}
            type="button"
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
              isLiked 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-white/80 text-gray-600 hover:text-red-500'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isLiked ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
            aria-pressed={isLiked}
          >
            <FaHeart className="w-4 h-4" />
          </motion.button>
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              if (canAddMore) {
                addToComparison(property);
              }
            }}
            disabled={!canAddMore || isInComparison(propertyId)}
            type="button"
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
              isInComparison(propertyId)
                ? 'bg-amber-500 text-white shadow-lg'
                : canAddMore
                ? 'bg-white/80 text-gray-600 hover:text-amber-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            whileHover={canAddMore && !isInComparison(propertyId) ? { scale: 1.1 } : {}}
            whileTap={canAddMore && !isInComparison(propertyId) ? { scale: 0.9 } : {}}
            title={isInComparison(propertyId) ? 'In comparison' : canAddMore ? 'Add to comparison' : 'Comparison full (max 4)'}
          >
            <FaBalanceScale className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Price Overlay */}
        <motion.div
          className="absolute bottom-3 left-3 bg-gradient-to-r from-amber-600 to-yellow-500 text-white px-3 py-1 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-sm font-bold">{formatPrice(price)}</div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 md:p-6">
        <div className="mb-3 sm:mb-4">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 flex-wrap">
            <span className="bg-gradient-to-r from-amber-600 to-yellow-500 text-white px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-xs font-semibold">
              {type}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <FaStar className="w-3 h-3" />
              <span className="text-xs font-semibold">{rating.toFixed(1)}</span>
            </div>
          </div>
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-1.5 group-hover:text-amber-600 transition-colors duration-300 line-clamp-2 leading-tight">
            {title}
          </h3>
          <div className="flex items-center gap-1 text-gray-600 text-xs sm:text-sm">
            <FaMapMarkerAlt className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        {/* Features */}
        {features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {features.slice(0, 2).map((feature, index) => (
            <span
              key={index}
              className="bg-amber-50 text-amber-700 px-2 py-1 rounded-full text-xs font-semibold"
            >
              {feature}
            </span>
          ))}
          </div>
        )}

        {/* Stats - Simplified */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-100">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <FaBed className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
            <span className="text-xs sm:text-sm font-semibold text-gray-700">{beds}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <FaBath className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
            <span className="text-xs sm:text-sm font-semibold text-gray-700">{baths}</span>
          </div>
          {area > 0 && (
            <div className="flex items-center gap-1 sm:gap-1.5">
              <FaRulerCombined className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
              <span className="text-xs sm:text-sm font-semibold text-gray-700">{area}m²</span>
            </div>
          )}
        </div>
        
        {/* Price */}
        <div className="mb-3 sm:mb-4">
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-amber-600">
            {formatPrice(price)}
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          onClick={handleClick}
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-yellow-500 text-white py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm hover:shadow-md transition-all duration-300 group active:scale-95"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          aria-label={`View details for ${title}`}
        >
          <span>View Details</span>
          <FaArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
          </motion.button>
        </div>
      </motion.article>
    )
  }

export default Item
