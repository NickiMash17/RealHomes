import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Searchbar from "../components/Searchbar";
import useProperties from "../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import Item from "../components/Item";

const Listing = () => {
  const navigate = useNavigate();
  const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = useState("");

  // Deduplicate properties by ID
  const uniqueProperties = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    const seen = new Set();
    return data.filter(property => {
      const id = property.id || property._id || JSON.stringify(property);
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Properties</h2>
          <p className="text-gray-600">Please try again later</p>
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
          <Searchbar filter={filter} setFilter={setFilter} />
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
            {filteredProperties.map((property) => (
              <Item 
                key={property.id || property._id} 
                property={property}
                onClick={() => handlePropertyClick(property.id || property._id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Properties Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
            <button
              onClick={() => setFilter("")}
              className="px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
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
