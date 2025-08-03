import React, { useState, useEffect } from 'react'
import { FaCrown, FaBars, FaTimes, FaSearch, FaUser, FaHeart, FaMapMarkerAlt } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import ProfileMenu from './ProfileMenu'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const menuVariants = {
    closed: { 
      opacity: 0,
      x: '100%',
      transition: { duration: 0.3 }
    },
    open: { 
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }

  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate="animate"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-neutral-200/50' 
          : 'bg-transparent'
      }`}
    >
      <div className='max-padd-container'>
        <div className='flexBetween py-4'>
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className='flex items-center gap-2'
          >
            <div className='w-10 h-10 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg'>
              <FaCrown className='text-white text-lg' />
            </div>
            <div className='flex flex-col'>
              <span className='text-xl font-bold text-secondary'>RealHomes</span>
              <span className='text-xs text-amber-600 font-medium'>SA</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center gap-8'>
            <Navbar />
            
            {/* Search Bar */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className='relative'
            >
              <input
                type='text'
                placeholder='Search properties...'
                className='w-64 px-4 py-2 pl-10 bg-white/80 backdrop-blur-sm rounded-full border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300'
              />
              <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400' />
            </motion.div>

            {/* Action Buttons */}
            <div className='flex items-center gap-4'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-amber-50 border border-neutral-200 transition-all duration-300'
              >
                <FaHeart className='text-neutral-600 hover:text-red-500 transition-colors' />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className='p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-amber-50 border border-neutral-200 transition-all duration-300 relative'
              >
                <FaUser className='text-neutral-600' />
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className='absolute top-full right-0 mt-2'
                  >
                    <ProfileMenu />
                  </motion.div>
                )}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='lg:hidden p-2 rounded-full bg-white/80 backdrop-blur-sm border border-neutral-200'
          >
            <AnimatePresence mode='wait'>
              {isMenuOpen ? (
                <motion.div
                  key='close'
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaTimes className='text-neutral-600 text-lg' />
                </motion.div>
              ) : (
                <motion.div
                  key='menu'
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaBars className='text-neutral-600 text-lg' />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className='lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-lg'
            >
              <div className='p-6 space-y-6'>
                {/* Mobile Search */}
                <div className='relative'>
                  <input
                    type='text'
                    placeholder='Search properties...'
                    className='w-full px-4 py-3 pl-10 bg-white/80 backdrop-blur-sm rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-amber-500'
                  />
                  <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400' />
                </div>

                {/* Mobile Navigation */}
                <nav className='space-y-4'>
                  <motion.a
                    whileHover={{ x: 10 }}
                    href='/' 
                    className='block text-lg font-medium text-neutral-700 hover:text-amber-600 transition-colors'
                  >
                    Home
                  </motion.a>
                  <motion.a
                    whileHover={{ x: 10 }}
                    href='/listing' 
                    className='block text-lg font-medium text-neutral-700 hover:text-amber-600 transition-colors'
                  >
                    Properties
                  </motion.a>
                  <motion.a
                    whileHover={{ x: 10 }}
                    href='/about' 
                    className='block text-lg font-medium text-neutral-700 hover:text-amber-600 transition-colors'
                  >
                    About
                  </motion.a>
                  <motion.a
                    whileHover={{ x: 10 }}
                    href='/contact' 
                    className='block text-lg font-medium text-neutral-700 hover:text-amber-600 transition-colors'
                  >
                    Contact
                  </motion.a>
                </nav>

                {/* Mobile Action Buttons */}
                <div className='flex items-center gap-4 pt-4 border-t border-neutral-200'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-lg font-medium'
                  >
                    <FaHeart className='text-sm' />
                    Favorites
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 text-neutral-700 rounded-lg font-medium'
                  >
                    <FaUser className='text-sm' />
                    Profile
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header