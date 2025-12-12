import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useProperties from "../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import Item from "../components/Item";
import { FaSearch, FaTimes, FaFilter, FaSort, FaHome, FaBuilding, FaCrown, FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Listing = () => {
  const navigate = useNavigate();
  const { data, isError, isLoading, error, refetch } = useProperties();
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Debug logging (development only)
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('Listing Page - Data:', data);
      console.log('Listing Page - isLoading:', isLoading);
      console.log('Listing Page - isError:', isError);
    }
  }, [data, isLoading, isError]);

  // Process and deduplicate properties
  const uniqueProperties = useMemo(() => {
    try {
      if (!data) {
        if (import.meta.env.DEV) {
          console.log('No data available');
        }
        return [];
      }
      
      // Handle different data structures
      let dataArray = [];
      if (Array.isArray(data)) {
        dataArray = data;
      } else if (data && typeof data === 'object') {
        dataArray = data.data || data.properties || data.results || [];
        if (!Array.isArray(dataArray)) {
          dataArray = [];
        }
      }
      
      if (import.meta.env.DEV) {
        console.log('Processed data array length:', dataArray.length);
      }
      
      const seen = new Set();
      const processed = dataArray.filter(property => {
        if (!property || typeof property !== 'object') return false;
        
        const id = property.id || property._id || `${property.title || 'property'}-${property.address || 'unknown'}-${Math.random()}`;
        if (!id || seen.has(id)) return false;
        seen.add(id);
        return true;
      });
      
      return processed;
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Error processing properties:', err);
      }
      return [];
    }
  }, [data]);

  // Filter and sort properties
  const filteredAndSortedProperties = useMemo(() => {
    let filtered = [...uniqueProperties];

    // Search filter
    if (filter) {
      const filterLower = filter.toLowerCase();
      filtered = filtered.filter((property) => 
        property.title?.toLowerCase().includes(filterLower) ||
        property.city?.toLowerCase().includes(filterLower) ||
        property.country?.toLowerCase().includes(filterLower) ||
        property.address?.toLowerCase().includes(filterLower) ||
        property.description?.toLowerCase().includes(filterLower)
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((property) => {
        const category = property.category?.toLowerCase() || '';
        return category.includes(categoryFilter.toLowerCase());
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'featured':
          const aFeatured = a.featured || a.facilities?.featured || false;
          const bFeatured = b.featured || b.facilities?.featured || false;
          return bFeatured - aFeatured;
        case 'newest':
        default:
          const aDate = new Date(a.createdAt || 0);
          const bDate = new Date(b.createdAt || 0);
          return bDate - aDate;
      }
    });

    return filtered;
  }, [uniqueProperties, filter, categoryFilter, sortBy]);

  const handlePropertyClick = (propertyId) => {
    navigate(`/listing/${propertyId}`);
  };

  const categories = [
    { value: 'all', label: 'All Properties', icon: FaHome },
    { value: 'house', label: 'Houses', icon: FaHome },
    { value: 'apartment', label: 'Apartments', icon: FaBuilding },
    { value: 'villa', label: 'Villas', icon: FaCrown },
    { value: 'penthouse', label: 'Penthouses', icon: FaStar },
  ];

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white pt-24 pb-16">
        <div className="text-center max-w-md mx-auto px-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="text-6xl mb-4"
          >
            ⚠️
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Properties</h2>
          <p className="text-gray-600 mb-6">
            {error?.message || "Unable to load properties. Please try again later."}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => refetch()}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Retry
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-all"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <PuffLoader
            height="80"
            width="80"
            radius={1}
            color="#f59e0b"
            aria-label="puff-loading"
          />
          <p className="mt-4 text-gray-600 font-medium">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Property Listings</h1>
          <p className="text-gray-600">Discover your perfect property in South Africa</p>
        </motion.div>

        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search properties by title, city, address, or description..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 text-base font-medium bg-white shadow-md hover:shadow-lg"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            {filter && (
              <button
                onClick={() => setFilter("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-md border border-gray-200">
              <FaFilter className="text-gray-500" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border-0 focus:outline-none focus:ring-0 bg-transparent text-gray-700 font-medium cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-md border border-gray-200">
              <FaSort className="text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-0 focus:outline-none focus:ring-0 bg-transparent text-gray-700 font-medium cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="rating">Highest Rated</option>
                <option value="featured">Featured First</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="ml-auto text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{filteredAndSortedProperties.length}</span> of{" "}
              <span className="font-semibold text-gray-900">{uniqueProperties.length}</span> properties
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        {filteredAndSortedProperties.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredAndSortedProperties.map((property, index) => {
                const propertyId = property.id || property._id || `property-${index}`;
                return (
                  <motion.div
                    key={propertyId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Item 
                      property={property}
                      onClick={() => handlePropertyClick(propertyId)}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : uniqueProperties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Properties Available</h3>
            <p className="text-gray-600 mb-6">There are currently no properties listed.</p>
            <button
              onClick={() => navigate('/addproperty')}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              List a Property
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Properties Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
            <button
              onClick={() => {
                setFilter("");
                setCategoryFilter("all");
              }}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default Listing;
