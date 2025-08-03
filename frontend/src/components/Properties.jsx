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
    <section className='max-padd-container py-8 sm:py-12 lg:py-16'>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className='text-center mb-8 sm:mb-12'
      >
        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-4'>
          Discover Your Perfect Home
        </h2>
        <p className='text-neutral-600 max-w-2xl mx-auto text-sm sm:text-base'>
          Explore our curated collection of premium properties across South Africa's most desirable locations
        </p>
      </motion.div>

      {/* Filters and Sort */}
      <div className='mb-8 sm:mb-12'>
        <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-between'>
          {/* Category Filters */}
          <div className='flex flex-wrap gap-2 sm:gap-3'>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => filterProperties(category)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  filter === category
                    ? 'bg-amber-500 text-white shadow-lg'
                    : 'bg-white text-neutral-600 hover:bg-amber-50 border border-neutral-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Sort and Filter Controls */}
          <div className='flex gap-2 sm:gap-3'>
            {/* Sort Dropdown */}
            <div className='relative'>
              <select
                value={sortBy}
                onChange={(e) => sortProperties(e.target.value)}
                className='px-3 sm:px-4 py-2 rounded-lg border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500'
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className='lg:hidden p-2 rounded-lg bg-white border border-neutral-200 hover:bg-amber-50 transition-colors'
            >
              <FaFilter className='text-neutral-600' />
            </button>
          </div>
        </div>

        {/* Mobile Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className='lg:hidden mt-4 p-4 bg-white rounded-lg border border-neutral-200'
            >
              <div className='space-y-3'>
                <h4 className='font-medium text-neutral-700'>Advanced Filters</h4>
                <div className='grid grid-cols-2 gap-3'>
                  <select className='px-3 py-2 rounded-lg border border-neutral-200 text-sm'>
                    <option>Price Range</option>
                    <option>R0 - R1M</option>
                    <option>R1M - R5M</option>
                    <option>R5M+</option>
                  </select>
                  <select className='px-3 py-2 rounded-lg border border-neutral-200 text-sm'>
                    <option>Bedrooms</option>
                    <option>1+</option>
                    <option>2+</option>
                    <option>3+</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Properties Grid */}
      {loading ? (
        <div className='flex justify-center items-center py-12'>
          <PuffLoader color="#fbbf24" size={60} />
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'
        >
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              variants={itemVariants}
              className='h-full'
            >
              <Item property={property} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Load More Button */}
      {properties.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className='text-center mt-8 sm:mt-12'
        >
          <button className='btn-premium rounded-xl px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg'>
            Load More Properties
          </button>
        </motion.div>
      )}
    </section>
  )
}

export default Properties