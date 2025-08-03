import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaCrown, FaBars, FaTimes, FaSearch, FaUser, FaHeart } from 'react-icons/fa'
import { useAuth0 } from '@auth0/auth0-react'
import { Avatar, Menu } from '@mantine/core'
import Navbar from './Navbar'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogin = () => {
    loginWithRedirect()
  }

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  const handleFavourites = () => {
    if (isAuthenticated) {
      navigate('/favourites')
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
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg'>
              <FaCrown className='text-white text-xl' />
            </div>
            <div className='flex flex-col'>
              <span className='text-2xl font-bold text-secondary'>RealHomes</span>
              <span className='text-sm text-amber-600 font-medium -mt-1'>South Africa</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center gap-8'>
            <Navbar containerStyles="flex items-center gap-6" />
            
            {/* Search Bar */}
            <div className='relative'>
              <input
                type='text'
                placeholder='Search properties...'
                className='w-64 px-4 py-2 pl-10 bg-white/95 backdrop-blur-sm rounded-full border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300'
              />
              <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500' />
            </div>

            {/* Action Buttons */}
            <div className='flex items-center gap-4'>
              <button 
                onClick={handleFavourites}
                className='p-2 rounded-full bg-white/95 backdrop-blur-sm hover:bg-amber-50 border border-neutral-200 transition-all duration-300'
                title={isAuthenticated ? 'View Favourites' : 'Login to view favourites'}
              >
                <FaHeart className='text-neutral-700 hover:text-red-500 transition-colors' />
              </button>
              
              {isAuthenticated ? (
                <Menu>
                  <Menu.Target>
                    <Avatar 
                      src={user?.picture} 
                      alt={user?.name || 'User'} 
                      radius="xl" 
                      className='cursor-pointer'
                    />
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Welcome, {user?.name}</Menu.Label>
                    <Menu.Item onClick={() => navigate('/favourites')}>
                      Favourites
                    </Menu.Item>
                    <Menu.Item onClick={() => navigate('/bookings')}>
                      Bookings
                    </Menu.Item>
                    <Menu.Label>Account</Menu.Label>
                    <Menu.Item onClick={handleLogout} color="red">
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : (
                <button 
                  onClick={handleLogin}
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
            className='lg:hidden p-2 rounded-full bg-white/95 backdrop-blur-sm border border-neutral-200'
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
          <div className='lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-lg'>
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
                <Link to='/' className='block text-lg font-medium text-neutral-700 hover:text-amber-600 transition-colors'>
                  Home
                </Link>
                <Link to='/listing' className='block text-lg font-medium text-neutral-700 hover:text-amber-600 transition-colors'>
                  Properties
                </Link>
                <Link to='/favourites' className='block text-lg font-medium text-neutral-700 hover:text-amber-600 transition-colors'>
                  Favourites
                </Link>
                <Link to='/bookings' className='block text-lg font-medium text-neutral-700 hover:text-amber-600 transition-colors'>
                  Bookings
                </Link>
              </nav>

              {/* Mobile Action Buttons */}
              <div className='flex items-center gap-4 pt-4 border-t border-neutral-200'>
                {isAuthenticated ? (
                  <>
                    <button 
                      onClick={() => navigate('/favourites')}
                      className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-lg font-medium'
                    >
                      <FaHeart className='text-sm' />
                      Favourites
                    </button>
                    
                    <div className='flex items-center gap-2'>
                      <Avatar 
                        src={user?.picture} 
                        alt={user?.name || 'User'} 
                        radius="xl" 
                        size="sm"
                      />
                      <button 
                        onClick={handleLogout}
                        className='px-4 py-2 bg-white border border-neutral-200 text-neutral-700 rounded-lg font-medium'
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <button 
                    onClick={handleLogin}
                    className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-lg font-medium'
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