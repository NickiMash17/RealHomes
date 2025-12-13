import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const STORAGE_KEY = 'savedSearches';
const MAX_SAVED_SEARCHES = 10;

/**
 * Hook to manage saved property searches
 */
export const useSavedSearches = () => {
  const [savedSearches, setSavedSearches] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedSearches(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load saved searches:', error);
    }
  }, []);

  /**
   * Save a search with current filters
   */
  const saveSearch = (searchParams, name) => {
    if (!name || name.trim() === '') {
      toast.error('Please provide a name for your search');
      return false;
    }

    try {
      const newSearch = {
        id: Date.now().toString(),
        name: name.trim(),
        params: {
          searchTerm: searchParams.searchTerm || '',
          category: searchParams.category || 'all',
          minBedrooms: searchParams.minBedrooms || 'any',
          maxPrice: searchParams.maxPrice || 50000000,
          city: searchParams.city || '',
          sortBy: searchParams.sortBy || 'newest',
        },
        createdAt: new Date().toISOString(),
        lastUsed: new Date().toISOString(),
        resultCount: searchParams.resultCount || 0,
      };

      setSavedSearches((prev) => {
        // Check if name already exists
        const nameExists = prev.some(search => 
          search.name.toLowerCase() === newSearch.name.toLowerCase()
        );
        
        if (nameExists) {
          toast.error('A search with this name already exists');
          return prev;
        }

        // Add to beginning and limit to MAX_SAVED_SEARCHES
        const updated = [newSearch, ...prev].slice(0, MAX_SAVED_SEARCHES);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        toast.success('Search saved successfully!');
        return updated;
      });

      return true;
    } catch (error) {
      console.error('Failed to save search:', error);
      toast.error('Failed to save search');
      return false;
    }
  };

  /**
   * Delete a saved search
   */
  const deleteSearch = (searchId) => {
    setSavedSearches((prev) => {
      const updated = prev.filter(search => search.id !== searchId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      toast.success('Search deleted');
      return updated;
    });
  };

  /**
   * Update last used timestamp
   */
  const updateLastUsed = (searchId) => {
    setSavedSearches((prev) => {
      const updated = prev.map(search => 
        search.id === searchId 
          ? { ...search, lastUsed: new Date().toISOString() }
          : search
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  /**
   * Clear all saved searches
   */
  const clearAllSearches = () => {
    setSavedSearches([]);
    localStorage.removeItem(STORAGE_KEY);
    toast.success('All saved searches cleared');
  };

  return {
    savedSearches,
    saveSearch,
    deleteSearch,
    updateLastUsed,
    clearAllSearches,
  };
};

