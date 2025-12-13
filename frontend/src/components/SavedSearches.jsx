import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSavedSearches } from '../hooks/useSavedSearches';
import { useNavigate } from 'react-router-dom';
import { 
  FaSearch, 
  FaTimes, 
  FaTrash, 
  FaBookmark, 
  FaClock,
  FaFilter,
  FaChevronRight 
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const SavedSearches = ({ onSearchSelect }) => {
  const { savedSearches, deleteSearch, updateLastUsed, clearAllSearches } = useSavedSearches();
  const navigate = useNavigate();

  const handleSearchClick = (search) => {
    updateLastUsed(search.id);
    
    // Build query string from saved params
    const params = new URLSearchParams();
    if (search.params.searchTerm) params.set('q', search.params.searchTerm);
    if (search.params.category && search.params.category !== 'all') params.set('category', search.params.category);
    if (search.params.minBedrooms && search.params.minBedrooms !== 'any') params.set('bedrooms', search.params.minBedrooms);
    if (search.params.maxPrice && search.params.maxPrice < 50000000) params.set('maxPrice', search.params.maxPrice);
    if (search.params.city) params.set('city', search.params.city);
    if (search.params.sortBy) params.set('sort', search.params.sortBy);

    // Navigate to listings with params
    navigate(`/listing?${params.toString()}`);
    
    // Call callback if provided
    if (onSearchSelect) {
      onSearchSelect(search.params);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (savedSearches.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
            <FaBookmark className="text-amber-600 w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Saved Searches</h3>
            <p className="text-sm text-gray-600">{savedSearches.length} saved</p>
          </div>
        </div>
        {savedSearches.length > 0 && (
          <button
            onClick={clearAllSearches}
            className="text-sm text-red-600 hover:text-red-700 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {savedSearches.map((search, index) => (
            <motion.div
              key={search.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              className="group flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-amber-50 transition-colors cursor-pointer"
              onClick={() => handleSearchClick(search)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <FaSearch className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <h4 className="font-semibold text-gray-900 truncate">{search.name}</h4>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-600 ml-6">
                  {search.params.searchTerm && (
                    <span className="truncate">"{search.params.searchTerm}"</span>
                  )}
                  {search.params.category !== 'all' && (
                    <span className="flex items-center gap-1">
                      <FaFilter className="w-3 h-3" />
                      {search.params.category}
                    </span>
                  )}
                  {search.resultCount > 0 && (
                    <span>{search.resultCount} results</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 ml-6 mt-1">
                  <FaClock className="w-3 h-3" />
                  <span>Last used {formatDate(search.lastUsed)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSearch(search.id);
                  }}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Delete search"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
                <FaChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SavedSearches;

