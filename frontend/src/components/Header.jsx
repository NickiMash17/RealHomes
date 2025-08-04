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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled 
          ? 'bg-white/99 backdrop-blur-2xl shadow-2xl border-b border-gray-100/50' 
          : 'bg-white/98 backdrop-blur-xl'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-8xl mx-auto px-8 lg:px-12">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-shrink-0"
          >
            <Link to="/" className="flex items-center gap-5 group">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-400 rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-amber-500/30 transition-all duration-500">
                  <FaCrown className="text-white text-2xl" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full flex items-center justify-center">
                  <FaStar className="text-white text-xs" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-gray-900 group-hover:text-amber-600 transition-colors duration-500 tracking-tight">
                  RealHomes
                </span>
                <span className="text-sm text-gray-500 font-semibold tracking-wider uppercase">Luxury Properties</span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <Link 
                  to={item.path} 
                  className={`relative px-8 py-4 rounded-2xl font-bold transition-all duration-500 whitespace-nowrap flex items-center gap-3 text-lg ${
                    isActiveLink(item.path) 
                      ? 'text-white bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 shadow-2xl shadow-amber-500/30' 
                      : 'text-gray-700 hover:text-amber-600 hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-12">
            <div className="relative w-full">
              <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search luxury properties..."
                className="w-full pl-16 pr-6 py-5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-500 text-lg font-medium bg-white/90 backdrop-blur-sm shadow-lg"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Contact Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <motion.a
                href="tel:+27112345678"
                className="p-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-2xl transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-green-500/30"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPhone className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://wa.me/27112345678"
                className="p-4 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white rounded-2xl transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-green-500/30"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp className="w-5 h-5" />
              </motion.a>
            </div>

            {/* Premium Badge */}
            <motion.div
              className="hidden lg:flex items-center gap-3 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 text-white px-6 py-3 rounded-2xl shadow-2xl shadow-amber-500/30"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <FaAward className="w-5 h-5" />
              <span className="text-sm font-black tracking-wider">PREMIUM</span>
            </motion.div>

            {/* Favorites Button */}
            <motion.button
              onClick={handleFavoritesClick}
              disabled={isLoading}
              className="p-4 text-gray-600 hover:text-red-500 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 rounded-2xl transition-all duration-500 relative group shadow-xl hover:shadow-2xl"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaHeart className="w-6 h-6 group-hover:animate-pulse" />
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-black shadow-lg">
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
                className="flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 text-white rounded-2xl hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 font-black text-lg shadow-xl"
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <FaUser className="w-5 h-5" />
                    <span className="hidden sm:inline">Login</span>
                  </>
                )}
              </motion.button>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="xl:hidden p-4 text-gray-600 hover:text-amber-600 hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 rounded-2xl transition-all duration-500 shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <FaTimes className="w-7 h-7" />
              ) : (
                <FaBars className="w-7 h-7" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="xl:hidden bg-white/99 backdrop-blur-2xl border-t border-gray-100/50 shadow-2xl"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-8xl mx-auto px-8 lg:px-12 py-10">
              <div className="max-h-[80vh] overflow-y-auto">
                
                {/* Mobile Search */}
                <div className="mb-10">
                  <div className="relative w-full">
                    <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search luxury properties..."
                      className="w-full pl-16 pr-6 py-5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-500 text-lg font-medium bg-white/90 backdrop-blur-sm shadow-lg"
                    />
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col gap-4 mb-10">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 }}
                    >
                      <Link 
                        to={item.path} 
                        className={`block transition-all duration-500 font-bold py-5 px-8 rounded-2xl flex items-center gap-4 text-lg ${
                          isActiveLink(item.path) 
                            ? 'text-white bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 shadow-2xl shadow-amber-500/30' 
                            : 'text-gray-700 hover:text-amber-600 hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="w-6 h-6" />
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Contact Buttons */}
                <div className="flex flex-wrap gap-4 mb-10">
                  <motion.a
                    href="tel:+27112345678"
                    className="flex items-center gap-4 px-8 py-5 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-2xl transition-all duration-500 shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaPhone className="w-6 h-6" />
                    <span className="text-lg font-bold">Call Now</span>
                  </motion.a>
                  <motion.a
                    href="https://wa.me/27112345678"
                    className="flex items-center gap-4 px-8 py-5 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white rounded-2xl transition-all duration-500 shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaWhatsapp className="w-6 h-6" />
                    <span className="text-lg font-bold">WhatsApp</span>
                  </motion.a>
                </div>

                {/* Mobile Action Buttons */}
                <div className="flex flex-col gap-5 pt-8 border-t border-gray-200">
                  <motion.button
                    onClick={() => {
                      handleFavoritesClick()
                      setIsMenuOpen(false)
                    }}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-4 px-8 py-5 text-gray-700 hover:text-red-500 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 rounded-2xl transition-all duration-500 font-bold text-lg shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaHeart className="w-6 h-6" />
                    Favorites (5)
                  </motion.button>

                  {isAuthenticated ? (
                    <motion.div 
                      className="flex items-center gap-5 px-8 py-5 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border-2 border-amber-200 shadow-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <img 
                        src={user?.picture || '/user.svg'} 
                        alt="Profile" 
                        className="w-16 h-16 rounded-2xl border-3 border-white shadow-2xl"
                      />
                      <div>
                        <span className="text-lg font-black text-gray-700">{user?.name}</span>
                        <p className="text-sm text-amber-600 font-bold">Premium Member</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.button
                      onClick={() => {
                        handleProfileClick()
                        setIsMenuOpen(false)
                      }}
                      disabled={isLoading}
                      className="flex items-center justify-center gap-4 px-8 py-5 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 text-white rounded-2xl hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 font-black text-lg shadow-xl"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isLoading ? (
                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <FaUser className="w-6 h-6" />
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