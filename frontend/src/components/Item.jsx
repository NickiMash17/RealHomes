import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHeart, FaShare, FaEye, FaStar, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaCrown, FaGem, FaTrophy, FaShieldAlt, FaCheckCircle } from 'react-icons/fa'

const Item = ({ viewMode = 'grid' }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Mock luxury property data
  const property = {
    id: 1,
    title: "Luxury Beachfront Villa",
    location: "Camps Bay, Cape Town",
    price: 25000000,
    bedrooms: 5,
    bathrooms: 6,
    area: 850,
    rating: 4.9,
    reviews: 24,
    type: "Luxury Villa",
    status: "Premium",
    features: ["Ocean View", "Private Pool", "Wine Cellar", "Gym"],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80"
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const containerVariants = {
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

  if (viewMode === 'list') {
    return (
      <motion.div
        className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden hover:shadow-3xl transition-all duration-500"
        variants={containerVariants}
        whileHover={{ y: -8 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="flex flex-col lg:flex-row">
          {/* Image */}
          <div className="lg:w-1/3 relative overflow-hidden">
            <motion.img
              src={property.image}
              alt={property.title}
              className="w-full h-64 lg:h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute top-4 left-4">
              <div className="bg-gradient-to-r from-amber-600 to-yellow-500 text-white px-4 py-2 rounded-2xl font-bold text-sm shadow-xl">
                {property.status}
              </div>
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <motion.button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-2xl backdrop-blur-xl transition-all duration-300 ${
                  isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaHeart className="w-5 h-5" />
              </motion.button>
              <motion.button
                className="p-3 rounded-2xl bg-white/20 backdrop-blur-xl text-white hover:bg-white/30 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaShare className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-2/3 p-8">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-r from-amber-600 to-yellow-500 text-white px-3 py-1 rounded-xl text-sm font-bold">
                    {property.type}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaStar className="text-amber-400 w-4 h-4" />
                    <span className="font-bold text-gray-900">{property.rating}</span>
                    <span className="text-gray-500">({property.reviews} reviews)</span>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">{property.title}</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <FaMapMarkerAlt className="w-4 h-4 text-amber-500" />
                  <span className="font-medium">{property.location}</span>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {property.features.map((feature, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 px-3 py-1 rounded-xl text-sm font-bold border border-amber-200"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-2">
                    <FaBed className="text-white w-5 h-5" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600 font-medium">Bedrooms</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mb-2">
                    <FaBath className="text-white w-5 h-5" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600 font-medium">Bathrooms</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-2">
                    <FaRulerCombined className="text-white w-5 h-5" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">{property.area}m²</div>
                  <div className="text-sm text-gray-600 font-medium">Area</div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between">
                <div>
                  <div className="text-3xl font-black text-gray-900 mb-1">{formatPrice(property.price)}</div>
                  <div className="text-sm text-gray-500 font-medium">Luxury Property</div>
                </div>
                <motion.button
                  className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-600 to-yellow-500 text-white rounded-2xl hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 font-bold text-lg"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaEye className="w-5 h-5" />
                  View Details
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden hover:shadow-3xl transition-all duration-500 group"
      variants={containerVariants}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <motion.img
          src={property.image}
          alt={property.title}
          className="w-full h-64 object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-gradient-to-r from-amber-600 to-yellow-500 text-white px-4 py-2 rounded-2xl font-bold text-sm shadow-xl">
            {property.status}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <motion.button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-3 rounded-2xl backdrop-blur-xl transition-all duration-300 ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaHeart className="w-5 h-5" />
          </motion.button>
          <motion.button
            className="p-3 rounded-2xl bg-white/20 backdrop-blur-xl text-white hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaShare className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Price Overlay */}
        <motion.div
          className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-2xl font-black text-gray-900">{formatPrice(property.price)}</div>
          <div className="text-sm text-gray-600 font-medium">Luxury Property</div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-gradient-to-r from-amber-600 to-yellow-500 text-white px-3 py-1 rounded-xl text-sm font-bold">
              {property.type}
            </div>
            <div className="flex items-center gap-2">
              <FaStar className="text-amber-400 w-4 h-4" />
              <span className="font-bold text-gray-900">{property.rating}</span>
              <span className="text-gray-500 text-sm">({property.reviews})</span>
            </div>
          </div>
          <h3 className="text-xl font-black text-gray-900 mb-2 line-clamp-2">{property.title}</h3>
          <div className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt className="w-4 h-4 text-amber-500" />
            <span className="font-medium text-sm">{property.location}</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          {property.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 px-2 py-1 rounded-lg text-xs font-bold border border-amber-200"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mb-2">
              <FaBed className="text-white w-4 h-4" />
            </div>
            <div className="text-lg font-bold text-gray-900">{property.bedrooms}</div>
            <div className="text-xs text-gray-600 font-medium">Beds</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mb-2">
              <FaBath className="text-white w-4 h-4" />
            </div>
            <div className="text-lg font-bold text-gray-900">{property.bathrooms}</div>
            <div className="text-xs text-gray-600 font-medium">Baths</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mb-2">
              <FaRulerCombined className="text-white w-4 h-4" />
            </div>
            <div className="text-lg font-bold text-gray-900">{property.area}m²</div>
            <div className="text-xs text-gray-600 font-medium">Area</div>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-600 to-yellow-500 text-white rounded-2xl hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 font-bold text-lg"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaEye className="w-5 h-5" />
          View Details
        </motion.button>
      </div>
    </motion.div>
  )
}

export default Item
