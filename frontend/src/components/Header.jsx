import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaCrown, FaBars, FaTimes, FaSearch, FaUser, FaHeart } from 'react-icons/fa'
import { useAuth0 } from '@auth0/auth0-react'
import Navbar from './Navbar'
import ProfileMenu from './ProfileMenu'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleFavoritesClick = () => {
    if (isAuthenticated) {
      navigate('/favourites')
    } else {
      loginWithRedirect()
    }
  }

  const handleProfileClick = () => {
    if (isAuthenticated) {
      // Profile menu will be handled by ProfileMenu component
    } else {
      loginWithRedirect()
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-neutral-200/50' 
        : 'bg-white/90 backdrop-blur-md shadow-lg'
    }`}>
      <div className='max-padd-container'>
        <div className='flexBetween py-4'>
          {/* Logo */}
          <div className='flex items-center gap-2 sm:gap-3'>
            <div className='w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg'>
              <FaCrown className='text-white text-lg sm:text-xl' />
            </div>
            <div className='flex flex-col'>
              <span className='text-xl sm:text-2xl font-bold text-secondary'>RealHomes</span>
              <span className='text-xs sm:text-sm text-amber-600 font-medium -mt-1'>South Africa</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center gap-6 xl:gap-8'>
            <Navbar containerStyles="flex items-center gap-6" />
            
            {/* Search Bar */}
            <div className='relative'>
              <input
                type='text'
                placeholder='Search properties...'
                className='w-56 xl:w-64 px-4 py-2 pl-10 bg-white/95 backdrop-blur-sm rounded-full border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300'
              />
              <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500' />
            </div>

            {/* Action Buttons */}
            <div className='flex items-center gap-3 xl:gap-4'>
              <button 
                onClick={handleFavoritesClick}
                className='p-2 rounded-full bg-white/95 backdrop-blur-sm hover:bg-amber-50 border border-neutral-200 transition-all duration-300'
                title='Favourites'
              >
                <FaHeart className='text-neutral-700 hover:text-red-500 transition-colors' />
              </button>
              
              {isAuthenticated ? (
                <ProfileMenu user={user} logout={logout} />
              ) : (
                <button 
                  onClick={handleProfileClick}
                  className='p-2 rounded-full bg-white/95 backdrop-blur-sm hover:bg-amber-50 border border-neutral-200 transition-all duration-300'
                  title='Login'
                >
                  <FaUser className='text-neutral-700' />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='lg:hidden p-3 rounded-full bg-white/95 backdrop-blur-sm border border-neutral-200 hover:bg-amber-50 transition-all duration-300'
            aria-label='Toggle menu'
          >
            {isMenuOpen ? (
              <FaTimes className='text-neutral-700 text-lg' />
            ) : (
              <FaBars className='text-neutral-700 text-lg' />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className='lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-xl'>
            <div className='p-6 space-y-6 max-h-[80vh] overflow-y-auto'>
              {/* Mobile Search */}
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search properties...'
                  className='w-full px-4 py-3 pl-12 bg-white/80 backdrop-blur-sm rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-base'
                />
                <FaSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400' />
              </div>

              {/* Mobile Navigation */}
              <nav className='space-y-3'>
                <Link 
                  to='/' 
                  className='block text-lg font-medium text-neutral-700 hover:text-amber-600 transition-colors py-2 px-3 rounded-lg hover:bg-amber-50'
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to='/listing' 
                  className='block text-lg font-medium text-neutral-700 hover:text-amber-600 transition-colors py-2 px-3 rounded-lg hover:bg-amber-50'
                  onClick={() => setIsMenuOpen(false)}
                >
                  Properties
                </Link>
                <Link 
                  to='/favourites' 
                  className='block text-lg font-medium text-neutral-700 hover:text-amber-600 transition-colors py-2 px-3 rounded-lg hover:bg-amber-50'
                  onClick={() => setIsMenuOpen(false)}
                >
                  Favourites
                </Link>
                <Link 
                  to='/bookings' 
                  className='block text-lg font-medium text-neutral-700 hover:text-amber-600 transition-colors py-2 px-3 rounded-lg hover:bg-amber-50'
                  onClick={() => setIsMenuOpen(false)}
                >
                  Bookings
                </Link>
              </nav>

              {/* Mobile Action Buttons */}
              <div className='flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-200'>
                {isAuthenticated ? (
                  <>
                    <button 
                      onClick={() => {
                        navigate('/favourites')
                        setIsMenuOpen(false)
                      }}
                      className='flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-xl font-medium text-base'
                    >
                      <FaHeart className='text-sm' />
                      Favourites
                    </button>
                    
                    <div className='flex items-center justify-center gap-3 p-3 bg-gray-50 rounded-xl'>
                      <img src={user?.picture} alt="Profile" className='w-8 h-8 rounded-full' />
                      <div className='flex flex-col'>
                        <span className='text-sm font-medium text-neutral-700'>{user?.name}</span>
                        <span className='text-xs text-neutral-500'>{user?.email}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <button 
                    onClick={() => {
                      handleProfileClick()
                      setIsMenuOpen(false)
                    }}
                    className='flex items-center justify-center gap-2 px-6 py-3 bg-white border border-neutral-200 text-neutral-700 rounded-xl font-medium text-base hover:bg-amber-50 transition-colors'
                  >
                    <FaUser className='text-sm' />
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header