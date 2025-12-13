import { useState, useEffect } from 'react';

const STORAGE_KEY = 'recentlyViewedProperties';
const MAX_RECENT_ITEMS = 10;

/**
 * Hook to manage recently viewed properties
 */
export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRecentlyViewed(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load recently viewed:', error);
    }
  }, []);

  /**
   * Add a property to recently viewed
   */
  const addToRecentlyViewed = (property) => {
    if (!property || !property.id) return;

    try {
      setRecentlyViewed((prev) => {
        // Remove if already exists
        const filtered = prev.filter((p) => String(p.id) !== String(property.id));
        
        // Add to beginning and limit to MAX_RECENT_ITEMS
        const updated = [
          {
            id: property.id,
            title: property.title || property.name,
            image: property.image,
            price: property.price,
            address: property.address,
            city: property.city,
            viewedAt: new Date().toISOString(),
          },
          ...filtered,
        ].slice(0, MAX_RECENT_ITEMS);

        // Save to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error('Failed to save recently viewed:', error);
    }
  };

  /**
   * Clear recently viewed
   */
  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  /**
   * Remove a specific property from recently viewed
   */
  const removeFromRecentlyViewed = (propertyId) => {
    setRecentlyViewed((prev) => {
      const updated = prev.filter((p) => String(p.id) !== String(propertyId));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return {
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed,
    removeFromRecentlyViewed,
  };
};

