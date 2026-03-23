import React, { useState, useEffect } from 'react'
import { useMockAuth } from '../context/MockAuthContext.jsx'
import { useQueryClient } from 'react-query'
import { toFav } from '../utils/api'
import { toast } from 'react-toastify'

const HeartBtn = ({ id }) => {
  const [isLiked, setIsLiked] = useState(false)
  const { isAuthenticated, user, getAccessTokenSilently } = useMockAuth()
  const queryClient = useQueryClient()

  useEffect(() => {
    // Check if the property is in favorites
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setIsLiked(favorites.includes(id))
  }, [id])

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add favorites', { position: 'bottom-right' })
      return
    }

    try {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
      
      // Optimistic UI update
      if (isLiked) {
        // Remove from favorites
        const newFavorites = favorites.filter(favId => favId !== id)
        localStorage.setItem('favorites', JSON.stringify(newFavorites))
        setIsLiked(false)
        toast.success('Removed from favorites')
      } else {
        // Add to favorites
        const newFavorites = [...favorites, id]
        localStorage.setItem('favorites', JSON.stringify(newFavorites))
        setIsLiked(true)
        toast.success('Added to favorites')
      }

      // API call
      const token = await getAccessTokenSilently()
      await toFav(id, user.email, token)
      
      // Refetch favorites to update the header count
      queryClient.invalidateQueries(["favorites", user?.email])
    } catch (error) {
      console.error('Error toggling favorite:', error)
      // Don't show error toast here as api.js might handle it or we want to degrade gracefully
    }
  }

  return (
    <button
      onClick={handleToggleFavorite}
      className={`p-2 rounded-full transition-all duration-200 ${
        isLiked 
          ? 'bg-red-500 text-white hover:bg-red-600' 
          : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
      }`}
    >
      <svg 
        className="w-5 h-5" 
        fill={isLiked ? "currentColor" : "none"} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
    </button>
  )
}

export default HeartBtn
