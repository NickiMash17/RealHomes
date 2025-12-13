import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const STORAGE_KEY = 'propertyComparison';
const MAX_COMPARISON_ITEMS = 4;

/**
 * Hook to manage property comparison
 */
export const usePropertyComparison = () => {
  const [comparisonList, setComparisonList] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setComparisonList(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load comparison list:', error);
    }
  }, []);

  /**
   * Add property to comparison
   */
  const addToComparison = (property) => {
    if (!property || !property.id) {
      toast.error('Invalid property');
      return false;
    }

    const propertyId = String(property.id || property._id);

    setComparisonList((prev) => {
      // Check if already in comparison
      if (prev.some(p => String(p.id) === propertyId)) {
        toast.info('Property already in comparison');
        return prev;
      }

      // Check if max items reached
      if (prev.length >= MAX_COMPARISON_ITEMS) {
        toast.error(`You can compare up to ${MAX_COMPARISON_ITEMS} properties`);
        return prev;
      }

      // Add property
      const newList = [
        ...prev,
        {
          id: propertyId,
          title: property.title || property.name,
          price: property.price || 0,
          image: property.image,
          address: property.address,
          city: property.city,
          facilities: property.facilities || {},
          rating: property.rating,
          category: property.category,
        },
      ];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
      toast.success('Property added to comparison');
      return newList;
    });

    return true;
  };

  /**
   * Remove property from comparison
   */
  const removeFromComparison = (propertyId) => {
    setComparisonList((prev) => {
      const updated = prev.filter(p => String(p.id) !== String(propertyId));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      toast.success('Property removed from comparison');
      return updated;
    });
  };

  /**
   * Clear all comparisons
   */
  const clearComparison = () => {
    setComparisonList([]);
    localStorage.removeItem(STORAGE_KEY);
    toast.success('Comparison cleared');
  };

  /**
   * Check if property is in comparison
   */
  const isInComparison = (propertyId) => {
    return comparisonList.some(p => String(p.id) === String(propertyId));
  };

  return {
    comparisonList,
    addToComparison,
    removeFromComparison,
    clearComparison,
    isInComparison,
    canAddMore: comparisonList.length < MAX_COMPARISON_ITEMS,
  };
};

