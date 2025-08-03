import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaMapMarkerAlt, FaStar, FaCrown, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Item = ({ property }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }

  const handleLike = (e) => {
    e.preventDefault()
    setIsLiked(!isLiked)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const imageVariants = {
    hidden: { scale: 1 },
    hover: { scale: 1.05 }
  }

  const likeButtonVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
    liked: { scale: [1, 1.2, 1] }
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className='card-luxury group cursor-pointer overflow-hidden'
    >
      {/* Premium Badge */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.2 }}
        className='absolute top-4 left-4 z-10'
      >
        <div className='flex items-center gap-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-secondary px-3 py-1 rounded-full text-xs font-bold shadow-lg'>
          <FaCrown className='text-xs' />
          <span>Premium</span>
        </div>
      </motion.div>

      {/* Like Button */}
      <motion.button
        variants={likeButtonVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        whileHover="liked"
        onClick={handleLike}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-300 ${
          isLiked 
            ? 'bg-red-500 text-white shadow-lg' 
            : 'bg-white/90 text-neutral-600 hover:bg-white shadow-md'
        }`}
      >
        <FaHeart className={`text-sm transition-all duration-300 ${isLiked ? 'fill-current' : ''}`} />
      </motion.button>

      {/* Image Container */}
      <motion.div
        variants={imageVariants}
        className='relative overflow-hidden rounded-t-3xl'
      >
        <img
          src={property.image}
          alt={property.title}
          className='w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110'
        />
        
        {/* Image Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'
            />
          )}
        </AnimatePresence>

        {/* Property Type Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className='absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-neutral-700'
        >
          {property.category}
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className='p-6'>
        {/* Title and Rating */}
        <div className='flex justify-between items-start mb-3'>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className='text-lg font-bold text-secondary line-clamp-2 group-hover:text-tertiary transition-colors duration-300'
          >
            {property.title}
          </motion.h3>
          
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5 }}
            className='flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full'
          >
            <FaStar className='text-amber-500 text-xs' />
            <span className='text-xs font-medium text-amber-700'>{property.rating || 4.8}</span>
          </motion.div>
        </div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className='flex items-center gap-2 text-neutral-600 mb-4'
        >
          <FaMapMarkerAlt className='text-tertiary text-sm' />
          <span className='text-sm'>{property.address}</span>
        </motion.div>

        {/* Facilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className='flex items-center gap-4 mb-4 text-sm text-neutral-600'
        >
          <div className='flex items-center gap-1'>
            <FaBed className='text-tertiary' />
            <span>{property.bedrooms || 4} beds</span>
          </div>
          <div className='flex items-center gap-1'>
            <FaBath className='text-tertiary' />
            <span>{property.bathrooms || 3} baths</span>
          </div>
          <div className='flex items-center gap-1'>
            <FaRulerCombined className='text-tertiary' />
            <span>{property.area || 450}m²</span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className='text-neutral-600 text-sm mb-4 line-clamp-2'
        >
          {property.description}
        </motion.p>

        {/* Price and CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className='flex justify-between items-center'
        >
          <div>
            <div className='text-xl font-bold text-secondary mb-1'>
              {formatPrice(property.price)}
            </div>
            <div className='text-xs text-neutral-500'>
              {property.paymentType || 'For Sale'}
            </div>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={`/property/${property.id}`}
              className='btn-secondary rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:shadow-lg'
            >
              View details
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Hover Effect Overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent pointer-events-none'
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Item
