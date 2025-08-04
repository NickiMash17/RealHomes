import { useQuery } from 'react-query'
import { getProperties } from '../utils/api'
import { useMockAuth } from '../context/MockAuthContext'

const useFavourites = () => {
  const { isAuthenticated } = useMockAuth()

  return useQuery({
    queryKey: ['favourites'],
    queryFn: async () => {
      if (!isAuthenticated) {
        return []
      }

      // Get all properties
      const allProperties = await getProperties()
      
      // Get user's favorites from localStorage
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
      
      // Filter properties to only include favorites
      return allProperties.filter(property => favorites.includes(property.id))
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  })
}

export default useFavourites