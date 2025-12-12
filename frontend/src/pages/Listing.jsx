import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useProperties from "../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import Item from "../components/Item";
import { FaSearch, FaTimes } from "react-icons/fa";

const Listing = () => {
  const navigate = useNavigate();
  const { data, isError, isLoading, error } = useProperties();
  const [filter, setFilter] = useState("");

  // Deduplicate properties by ID - Optimized
  const uniqueProperties = useMemo(() => {
    try {
      if (!data) return [];
      // Handle different data structures
      const dataArray = Array.isArray(data) ? data : (data.data || []);
      if (!Array.isArray(dataArray)) return [];
      
      const seen = new Set();
      return dataArray.filter(property => {
        if (!property) return false;
        // Use a more efficient ID generation
        const id = property.id || property._id || `${property.title || 'property'}-${property.address || 'unknown'}`;
        if (!id || seen.has(id)) return false;
        seen.add(id);
        return true;
      });
    } catch (err) {
      console.error('Error processing properties:', err);
      return [];
    }
  }, [data]);

  // Filter properties
  const filteredProperties = useMemo(() => {
    if (!filter) return uniqueProperties;
    const filterLower = filter.toLowerCase();
    return uniqueProperties.filter((property) => 
      property.title?.toLowerCase().includes(filterLower) ||
      property.city?.toLowerCase().includes(filterLower) ||
      property.country?.toLowerCase().includes(filterLower) ||
      property.address?.toLowerCase().includes(filterLower)
    );
  }, [uniqueProperties, filter]);

  const handlePropertyClick = (propertyId) => {
    navigate(`/listing/${propertyId}`);
  };

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white pt-24 pb-16">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Properties</h2>
          <p className="text-gray-600 mb-6">
            {error?.message || "Unable to load properties. Please try again later."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#f59e0b"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="w-full max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search properties by title, city, or address..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 text-sm font-medium bg-white shadow-md"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              {filter && (
                <button
                  onClick={() => setFilter("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredProperties.length}</span> of <span className="font-semibold text-gray-900">{uniqueProperties.length}</span> properties
          </p>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property, index) => {
              const propertyId = property.id || property._id || `property-${index}`;
              return (
                <Item 
                  key={propertyId} 
                  property={property}
                  onClick={() => handlePropertyClick(propertyId)}
                />
              );
            })}
          </div>
        ) : uniqueProperties.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Properties Available</h3>
            <p className="text-gray-600 mb-6">There are currently no properties listed.</p>
            <button
              onClick={() => navigate('/addproperty')}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              List a Property
            </button>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Properties Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
            <button
              onClick={() => setFilter("")}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Listing;
