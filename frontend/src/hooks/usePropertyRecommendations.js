import { useMemo } from 'react';
import { useRecentlyViewed } from './useRecentlyViewed';
import { useSavedSearches } from './useSavedSearches';

/**
 * Custom hook to generate property recommendations based on:
 * - Recently viewed properties
 * - Saved search criteria
 * - Property features (category, price range, location, etc.)
 */
export const usePropertyRecommendations = (allProperties = []) => {
  const { recentlyViewed } = useRecentlyViewed();
  const { savedSearches } = useSavedSearches();

  const recommendations = useMemo(() => {
    if (!Array.isArray(allProperties) || allProperties.length === 0) {
      return [];
    }

    // If no viewing history or saved searches, return empty
    if (recentlyViewed.length === 0 && savedSearches.length === 0) {
      return [];
    }

    const scoredProperties = new Map();

    // Score properties based on recently viewed
    recentlyViewed.forEach(viewedProperty => {
      const viewedCategory = viewedProperty.category?.toLowerCase() || '';
      const viewedCity = viewedProperty.city?.toLowerCase() || '';
      const viewedPrice = viewedProperty.price || 0;
      const viewedBedrooms = viewedProperty.facilities?.bedrooms || viewedProperty.bedrooms || 0;
      const priceRange = viewedPrice * 0.3; // ±30% price range

      allProperties.forEach(property => {
        // Skip if it's the same property
        if (String(property.id || property._id) === String(viewedProperty.id || viewedProperty._id)) {
          return;
        }

        const propertyId = String(property.id || property._id);
        let score = scoredProperties.get(propertyId) || 0;

        // Category match (high weight)
        if (property.category?.toLowerCase() === viewedCategory && viewedCategory) {
          score += 10;
        }

        // City match (high weight)
        if (property.city?.toLowerCase() === viewedCity && viewedCity) {
          score += 10;
        }

        // Price similarity (medium weight)
        const propertyPrice = property.price || 0;
        if (Math.abs(propertyPrice - viewedPrice) <= priceRange) {
          score += 8;
        }

        // Bedrooms similarity (medium weight)
        const propertyBedrooms = property.facilities?.bedrooms || property.bedrooms || 0;
        if (Math.abs(propertyBedrooms - viewedBedrooms) <= 1) {
          score += 6;
        }

        // Featured properties get bonus
        if (property.featured || property.facilities?.featured) {
          score += 5;
        }

        // High rating bonus
        if (property.rating && property.rating >= 4) {
          score += 3;
        }

        scoredProperties.set(propertyId, score);
      });
    });

    // Score properties based on saved searches
    savedSearches.forEach(search => {
      const criteria = search.criteria || {};
      const searchCategory = criteria.selectedCategory?.toLowerCase() || criteria.category?.toLowerCase() || '';
      const searchTerm = criteria.searchTerm?.toLowerCase() || '';
      const maxPrice = criteria.maxPrice || 50000000;
      const minBedrooms = criteria.minBedrooms !== 'any' ? parseInt(criteria.minBedrooms) : 0;

      allProperties.forEach(property => {
        const propertyId = String(property.id || property._id);
        let score = scoredProperties.get(propertyId) || 0;

        // Category match
        if (searchCategory && searchCategory !== 'all') {
          if (property.category?.toLowerCase().includes(searchCategory)) {
            score += 8;
          }
        }

        // Search term match
        if (searchTerm) {
          const matchesTitle = property.title?.toLowerCase().includes(searchTerm);
          const matchesDescription = property.description?.toLowerCase().includes(searchTerm);
          const matchesAddress = property.address?.toLowerCase().includes(searchTerm);
          const matchesCity = property.city?.toLowerCase().includes(searchTerm);
          
          if (matchesTitle || matchesDescription || matchesAddress || matchesCity) {
            score += 7;
          }
        }

        // Price match
        const propertyPrice = property.price || 0;
        if (propertyPrice <= maxPrice) {
          score += 5;
        }

        // Bedrooms match
        const propertyBedrooms = property.facilities?.bedrooms || property.bedrooms || 0;
        if (minBedrooms === 0 || propertyBedrooms >= minBedrooms) {
          score += 4;
        }

        scoredProperties.set(propertyId, score);
      });
    });

    // Convert to array, sort by score, and return top recommendations
    const recommendationsArray = Array.from(scoredProperties.entries())
      .map(([id, score]) => {
        const property = allProperties.find(p => String(p.id || p._id) === id);
        return property ? { ...property, recommendationScore: score } : null;
      })
      .filter(Boolean)
      .sort((a, b) => (b.recommendationScore || 0) - (a.recommendationScore || 0))
      .slice(0, 12); // Top 12 recommendations

    return recommendationsArray;
  }, [allProperties, recentlyViewed, savedSearches]);

  const hasRecommendations = recommendations.length > 0;

  return {
    recommendations,
    hasRecommendations,
    count: recommendations.length
  };
};

