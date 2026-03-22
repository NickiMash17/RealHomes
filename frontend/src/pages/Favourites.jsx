import React, { useState, useEffect } from "react";
import { useMockAuth } from "../context/MockAuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useFavourites from "../hooks/useFavourites";
import { PuffLoader } from "react-spinners";
import Item from "../components/Item";
import EmptyState from "../components/EmptyState";

const Favourites = () => {
  const { data, isError, isLoading, error, refetch } = useFavourites();
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
      <div className="min-h-screen flex items-center justify-center bg-ivory-200">
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#1B3A5C"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-ivory-200 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-ivory-300 shadow-sm p-12 text-center"
          >
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaExclamationTriangle className="text-red-500 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-charcoal-900 mb-4">
              Error Loading Favourites
            </h2>
            <p className="text-neutral-600 mb-6">
              {error?.message ||
                "We couldn't load your favourites. Please try again."}
            </p>
            <motion.button
              onClick={() => refetch()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-navy-700 hover:bg-navy-800 text-white rounded-xl font-semibold transition-colors"
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
      <div className="min-h-screen flex items-center justify-center bg-ivory-200">
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#1B3A5C"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  const filteredFavourites =
    data?.filter(
      (property) =>
        property.title?.toLowerCase().includes(filter.toLowerCase()) ||
        property.city?.toLowerCase().includes(filter.toLowerCase()) ||
        property.country?.toLowerCase().includes(filter.toLowerCase()) ||
        property.address?.toLowerCase().includes(filter.toLowerCase()),
    ) || [];

  return (
    <main className="min-h-screen bg-ivory-200 pb-16">
      {/* ── Hero header ── */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-navy-900 text-white pt-24 pb-12 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 flex-wrap">
            <FaHeart className="text-gold-400 text-2xl flex-shrink-0" />
            <h1 className="font-display font-bold text-3xl text-white">
              My Favourites
            </h1>
            {data && data.length > 0 && (
              <span className="bg-gold-600 text-white rounded-full px-3 py-1 text-sm font-bold leading-none flex items-center">
                {data.length}
              </span>
            )}
          </div>
          <p className="text-white/70 mt-2">
            Your saved properties for easy access
          </p>
        </div>
      </motion.section>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="Search favourites by property name, city, or address..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-12 pr-10 py-3 border-2 border-ivory-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-600/20 focus:border-gold-600 transition-all duration-300 text-sm font-medium bg-white text-charcoal-900 placeholder:text-neutral-400 shadow-sm"
            />
            <FaHeart className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-400 w-4 h-4" />
            {filter && (
              <button
                onClick={() => setFilter("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-charcoal-900 text-lg leading-none transition-colors"
              >
                ×
              </button>
            )}
          </div>
        </motion.div>

        {/* Favourites grid / empty state */}
        {filteredFavourites.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredFavourites.map((property, i) => (
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
        ) : filter ? (
          <EmptyState
            type="search"
            title="No favourites found"
            description="Try adjusting your search terms to find your saved properties."
            actionLabel="Clear Search"
            onAction={() => setFilter("")}
          />
        ) : (
          <EmptyState type="favorites" onAction={() => navigate("/listing")} />
        )}

        {/* Stats */}
        {data && data.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-white rounded-2xl border border-ivory-300 shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Total Favourites</p>
                <p className="text-3xl font-bold text-charcoal-900">
                  {data.length}
                </p>
              </div>
              {filter && (
                <div className="text-right">
                  <p className="text-sm text-neutral-600">Filtered Results</p>
                  <p className="text-3xl font-bold text-navy-700">
                    {filteredFavourites.length}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default Favourites;
