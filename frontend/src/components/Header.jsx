import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useMockAuth } from '../context/MockAuthContext.jsx'
import ProfileMenu from './ProfileMenu'
import { FaHeart, FaUser, FaBars, FaTimes, FaPhone, FaWhatsapp, FaEnvelope, FaHome, FaBuilding, FaUser as FaContact, FaFileAlt, FaSearch, FaCrown, FaStar, FaAward, FaMapMarkerAlt } from 'react-icons/fa'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isAuthenticated, user, loginWithRedirect, isLoading } = useMockAuth()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleFavoritesClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect()
    } else {
      window.location.href = '/favourites'
    }
  }

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect()
    }
  }

  const isActiveLink = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  const navItems = [
    { path: '/', label: 'Home', icon: FaHome },
    { path: '/listing', label: 'Properties', icon: FaBuilding },
    { path: '/contact', label: 'Contact', icon: FaContact },
    { path: '/add-property', label: 'List Property', icon: FaFileAlt }
  ]

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/99 backdrop-blur-xl shadow-lg border-b border-gray-100/50' 
          : 'bg-white/98 backdrop-blur-lg'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-shrink-0"
          >
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <FaCrown className="text-white text-lg" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full flex items-center justify-center shadow-md">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <div className="absolute -bottom-0.5 -left-0.5 w-2.5 h-2.5 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full flex items-center justify-center">
                  <FaStar className="text-white text-xs" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-gray-900 group-hover:text-amber-600 transition-colors duration-300 tracking-tight">
                  RealHomes
                </span>
                <span className="text-xs text-gray-500 font-semibold tracking-wider uppercase">Luxury Properties</span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <Link 
                  to={item.path} 
                  className={`relative px-4 py-2 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap flex items-center gap-2 text-sm ${
                    isActiveLink(item.path) 
                      ? 'text-white bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 shadow-md' 
                      : 'text-gray-700 hover:text-amber-600 hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-6">
            <div className="relative w-full">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search luxury properties..."
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 text-sm font-medium bg-white/90 backdrop-blur-sm shadow-md"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Contact Buttons */}
            <div className="hidden sm:flex items-center gap-1">
              <motion.a
                href="tel:+27112345678"
                className="p-2.5 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPhone className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="https://wa.me/27112345678"
                className="p-2.5 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp className="w-4 h-4" />
              </motion.a>
            </div>

            {/* Premium Badge */}
            <motion.div
              className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 text-white px-3 py-1.5 rounded-lg shadow-md"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <FaAward className="w-3.5 h-3.5" />
              <span className="text-xs font-bold tracking-wider">PREMIUM</span>
            </motion.div>

            {/* Favorites Button */}
            <motion.button
              onClick={handleFavoritesClick}
              disabled={isLoading}
              className="p-2.5 text-gray-600 hover:text-red-500 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 rounded-lg transition-all duration-300 relative group shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaHeart className="w-4 h-4 group-hover:animate-pulse" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-md">
                5
              </span>
            </motion.button>

            {/* Profile/Login Button */}
            {isAuthenticated ? (
              <ProfileMenu user={user} />
            ) : (
              <motion.button
                onClick={handleProfileClick}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold text-sm shadow-md"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <FaUser className="w-4 h-4" />
                    <span className="hidden sm:inline">Login</span>
                  </>
                )}
              </motion.button>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 text-gray-600 hover:text-amber-600 hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 rounded-lg transition-all duration-300 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="lg:hidden bg-white/99 backdrop-blur-xl border-t border-gray-100/50 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
              <div className="max-h-[70vh] overflow-y-auto">
                
                {/* Mobile Search */}
                <div className="mb-6">
                  <div className="relative w-full">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search luxury properties..."
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 text-sm font-medium bg-white/90 backdrop-blur-sm shadow-md"
                    />
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col gap-2 mb-6">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link 
                        to={item.path} 
                        className={`block transition-all duration-300 font-semibold py-3 px-4 rounded-lg flex items-center gap-3 text-sm ${
                          isActiveLink(item.path) 
                            ? 'text-white bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 shadow-md' 
                            : 'text-gray-700 hover:text-amber-600 hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Contact Buttons */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <motion.a
                    href="tel:+27112345678"
                    className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-lg transition-all duration-300 shadow-md"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaPhone className="w-4 h-4" />
                    <span className="text-sm font-semibold">Call Now</span>
                  </motion.a>
                  <motion.a
                    href="https://wa.me/27112345678"
                    className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white rounded-lg transition-all duration-300 shadow-md"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaWhatsapp className="w-4 h-4" />
                    <span className="text-sm font-semibold">WhatsApp</span>
                  </motion.a>
                </div>

                {/* Mobile Action Buttons */}
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                  <motion.button
                    onClick={() => {
                      handleFavoritesClick()
                      setIsMenuOpen(false)
                    }}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-3 px-4 py-3 text-gray-700 hover:text-red-500 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 rounded-lg transition-all duration-300 font-semibold shadow-md"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaHeart className="w-4 h-4" />
                    Favorites (5)
                  </motion.button>

                  {isAuthenticated ? (
                    <motion.div 
                      className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-200 shadow-md"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <img 
                        src={user?.picture || '/user.svg'} 
                        alt="Profile" 
                        className="w-10 h-10 rounded-lg border-2 border-white shadow-md"
                      />
                      <div>
                        <span className="text-sm font-bold text-gray-700">{user?.name}</span>
                        <p className="text-xs text-amber-600 font-semibold">Premium Member</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.button
                      onClick={() => {
                        handleProfileClick()
                        setIsMenuOpen(false)
                      }}
                      disabled={isLoading}
                      className="flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold shadow-md"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <FaUser className="w-4 h-4" />
                          Login / Register
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header