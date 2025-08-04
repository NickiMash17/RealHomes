import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useMockAuth } from '../context/MockAuthContext'
import ProfileMenu from './ProfileMenu'
import Searchbar from './Searchbar'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isAuthenticated, user, loginWithRedirect, isLoading } = useMockAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleFavoritesClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect()
    } else {
      // Navigate to favorites page
      window.location.href = '/favourites'
    }
  }

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect()
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
    }`}>
      <div className="max-padd-container">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl sm:text-2xl">R</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900">RealHomes</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/listing" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Properties
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <Searchbar />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Favorites Button */}
            <button
              onClick={handleFavoritesClick}
              disabled={isLoading}
              className="p-2 sm:p-3 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* Profile/Login Button */}
            {isAuthenticated ? (
              <ProfileMenu user={user} />
            ) : (
              <button
                onClick={handleProfileClick}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="hidden sm:inline">Login</span>
                  </>
                )}
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <Searchbar />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-xl">
          <div className="max-padd-container py-4">
            <div className="max-h-[80vh] overflow-y-auto">
              {/* Mobile Navigation */}
              <nav className="flex flex-col gap-4 mb-6">
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/listing" 
                  className="text-gray-700 hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Properties
                </Link>
                <Link 
                  to="/contact" 
                  className="text-gray-700 hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>

              {/* Mobile Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    handleFavoritesClick()
                    setIsMenuOpen(false)
                  }}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Favorites
                </button>

                {isAuthenticated ? (
                  <div className="flex items-center gap-3 px-4 py-3">
                    <img 
                      src={user?.picture || '/user.svg'} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      handleProfileClick()
                      setIsMenuOpen(false)
                    }}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Login
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header