import React, { useState, useEffect } from "react";
import { useMockAuth } from "../context/MockAuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendar, FaMapMarkerAlt, FaExclamationTriangle, FaHome, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import useBookings from "../hooks/useBookings";
import { PuffLoader } from "react-spinners";
import Item from "../components/Item";
import { toast } from "react-toastify";

const Bookings = () => {
  const { data, isError, isLoading, error, refetch } = useBookings();
  const [filter, setFilter] = useState("");
  const { isAuthenticated, loginWithRedirect } = useMockAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
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

  if (isError) {
    return (
      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-12 text-center"
          >
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaExclamationTriangle className="text-red-600 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Bookings</h2>
            <p className="text-gray-600 mb-6">
              {error?.message || "We couldn't load your bookings. Please try again."}
            </p>
            <motion.button
              onClick={() => refetch()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition-colors"
            >
              Try Again
            </motion.button>
          </motion.div>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
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

  const filteredBookings = data?.filter((property) => 
    property.title?.toLowerCase().includes(filter.toLowerCase()) ||
    property.city?.toLowerCase().includes(filter.toLowerCase()) ||
    property.country?.toLowerCase().includes(filter.toLowerCase()) ||
    property.address?.toLowerCase().includes(filter.toLowerCase())
  ) || [];

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">My Bookings</h1>
          <p className="text-lg text-gray-600">Manage and view all your property visit bookings</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="Search bookings by property name, city, or address..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 text-sm font-medium bg-white shadow-md"
            />
            <FaCalendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            {filter && (
              <button
                onClick={() => setFilter("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>
        </motion.div>

        {/* Bookings Grid */}
        {filteredBookings.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredBookings.map((property, i) => (
                <motion.div
                  key={property.id || property._id || i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Item property={property} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-lg p-12 text-center"
          >
            <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCalendar className="text-amber-600 text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {filter ? 'No bookings found' : 'No bookings yet'}
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {filter
                ? 'Try adjusting your search terms to find your bookings.'
                : 'Start exploring properties and book a visit to see them here.'}
            </p>
            {!filter && (
              <motion.button
                onClick={() => navigate('/listing')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition-colors"
              >
                <FaHome className="w-4 h-4" />
                Browse Properties
                <FaArrowRight className="w-4 h-4" />
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Stats */}
        {data && data.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900">{data.length}</p>
              </div>
              {filter && (
                <div>
                  <p className="text-sm text-gray-600">Filtered Results</p>
                  <p className="text-3xl font-bold text-amber-600">{filteredBookings.length}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default Bookings;
