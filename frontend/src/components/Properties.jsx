'use client'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { VscSettings } from 'react-icons/vsc'
import { FaCrown, FaFilter, FaSort, FaMapMarkerAlt, FaStar } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Item from './Item'
import { PROPERTIES } from '../constant/data'
import { PuffLoader } from 'react-spinners'

const Properties = () => {
  const [properties, setProperties] = useState(PROPERTIES)
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const categories = ['all', 'house', 'apartment', 'villa', 'commercial']
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'newest', label: 'Newest' },
    { value: 'popular', label: 'Most Popular' }
  ]

  const filterProperties = (category) => {
    setLoading(true)
    setTimeout(() => {
      if (category === 'all') {
        setProperties(PROPERTIES)
      } else {
        setProperties(PROPERTIES.filter(property => property.category === category))
      }
      setFilter(category)
      setLoading(false)
    }, 500)
  }

  const sortProperties = (sortType) => {
    setLoading(true)
    setTimeout(() => {
      let sorted = [...properties]
      switch (sortType) {
        case 'price-high':
          sorted.sort((a, b) => parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, '')))
          break
        case 'price-low':
          sorted.sort((a, b) => parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, '')))
          break
        case 'newest':
          sorted.sort((a, b) => new Date(b.date) - new Date(a.date))
          break
        case 'popular':
          sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
          break
        default:
          // Featured - keep original order
          break
      }
      setProperties(sorted)
      setSortBy(sortType)
      setLoading(false)
    }, 500)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
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

  return (
    <section className='max-padd-container py-16'>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className='text-center mb-12'
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-2 rounded-full text-secondary font-semibold text-sm mb-6 shadow-lg'
        >
          <FaCrown className='text-tertiary' />
          <span>Premium Properties</span>
        </motion.div>
        
        <h2 className='h2 text-premium mb-4'>
          Premium South African Properties
        </h2>
        <p className='regular-16 text-neutral-600 max-w-2xl mx-auto'>
          Discover Exceptional Homes Across South Africa
        </p>
      </motion.div>

      {/* Advanced Filter and Sort Controls */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className='bg-gradient-to-r from-white to-neutral-50 rounded-2xl border border-amber-200/20 shadow-lg p-6 mb-8'
      >
        <div className='flex flex-col lg:flex-row justify-between items-center gap-6'>
          {/* Category Filters */}
          <div className='flex flex-wrap gap-3'>
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => filterProperties(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === category
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-secondary shadow-lg'
                    : 'bg-white/80 text-neutral-600 hover:bg-amber-50 border border-neutral-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>

          {/* Sort and Filter Controls */}
          <div className='flex items-center gap-4'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className='flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full text-neutral-600 hover:bg-amber-50 border border-neutral-200 transition-all duration-300'
            >
              <FaFilter className='text-sm' />
              <span className='text-sm font-medium'>Filters</span>
            </motion.button>

            <div className='relative'>
              <select
                value={sortBy}
                onChange={(e) => sortProperties(e.target.value)}
                className='px-4 py-2 bg-white/80 rounded-full text-neutral-600 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300 appearance-none pr-8'
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <FaSort className='absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none' />
            </div>
          </div>
        </div>

        {/* Advanced Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className='mt-6 pt-6 border-t border-neutral-200'
            >
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-neutral-700 mb-2'>Price Range</label>
                  <div className='flex gap-2'>
                    <input
                      type='number'
                      placeholder='Min'
                      className='flex-1 px-3 py-2 bg-white/80 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-amber-500'
                    />
                    <input
                      type='number'
                      placeholder='Max'
                      className='flex-1 px-3 py-2 bg-white/80 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-amber-500'
                    />
                  </div>
                </div>
                <div>
                  <label className='block text-sm font-medium text-neutral-700 mb-2'>Location</label>
                  <select className='w-full px-3 py-2 bg-white/80 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-amber-500'>
                    <option>All Cities</option>
                    <option>Cape Town</option>
                    <option>Johannesburg</option>
                    <option>Durban</option>
                    <option>Stellenbosch</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-neutral-700 mb-2'>Property Type</label>
                  <select className='w-full px-3 py-2 bg-white/80 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-amber-500'>
                    <option>All Types</option>
                    <option>Luxury Villa</option>
                    <option>Modern Apartment</option>
                    <option>Premium House</option>
                    <option>Commercial</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Properties Grid */}
      <div className='relative'>
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='flex justify-center items-center py-20'
          >
            <PuffLoader color='#1a365d' size={60} />
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          >
              {properties.slice(0, 6).map((property, index) => (
                <motion.div
                key={property.id || `property-${index}`}
                  variants={itemVariants}
                  layout
                  className='relative'
                >
              <Item property={property} />
                  {property.featured && (
                    <motion.div
                    key={`featured-${property.id || index}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className='absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-secondary px-3 py-1 rounded-full text-xs font-bold shadow-lg'
                    >
                      Featured
                    </motion.div>
                  )}
                </motion.div>
              ))}
          </motion.div>
        )}
      </div>

      {/* Enhanced View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        className='text-center mt-12'
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to='/listing' className='btn-premium rounded-xl flexCenter !py-4 !px-8 mx-auto'>
            <VscSettings className='mr-2' />
            View All Properties
          </Link>
        </motion.div>
        
        <p className='text-neutral-600 mt-4'>
          Showing 1-6 of premium properties
        </p>
      </motion.div>
    </section>
  )
}

export default Properties