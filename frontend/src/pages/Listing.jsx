import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useProperties from "../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import Item from "../components/Item";
import EmptyState from "../components/EmptyState";
import {
  FaSearch,
  FaTimes,
  FaFilter,
  FaSort,
  FaHome,
  FaBuilding,
  FaCrown,
  FaStar,
  FaExclamationCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import PropertySkeleton from "../components/PropertySkeleton";

// Listing page component
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
      console.log("Listing Page - Data:", data);
      console.log("Listing Page - isLoading:", isLoading);
      console.log("Listing Page - isError:", isError);
    }
  }, [data, isLoading, isError]);

  // Process and deduplicate properties
  const uniqueProperties = useMemo(() => {
    try {
      if (!data) {
        if (import.meta.env.DEV) {
          console.log("No data available");
        }
        return [];
      }

      // Handle different data structures
      let dataArray = [];
      if (Array.isArray(data)) {
        dataArray = data;
      } else if (data && typeof data === "object") {
        dataArray = data.data || data.properties || data.results || [];
        if (!Array.isArray(dataArray)) {
          dataArray = [];
        }
      }

      if (import.meta.env.DEV) {
        console.log("Processed data array length:", dataArray.length);
      }

      const seen = new Set();
      const processed = dataArray.filter((property) => {
        if (!property || typeof property !== "object") return false;

        const id =
          property.id ||
          property._id ||
          `${property.title || "property"}-${property.address || "unknown"}-${Math.random()}`;
        if (!id || seen.has(id)) return false;
        seen.add(id);
        return true;
      });

      return processed;
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Error processing properties:", err);
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
      filtered = filtered.filter(
        (property) =>
          property.title?.toLowerCase().includes(filterLower) ||
          property.city?.toLowerCase().includes(filterLower) ||
          property.country?.toLowerCase().includes(filterLower) ||
          property.address?.toLowerCase().includes(filterLower) ||
          property.description?.toLowerCase().includes(filterLower),
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((property) => {
        const category = property.category?.toLowerCase() || "";
        return category.includes(categoryFilter.toLowerCase());
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-high":
          return (b.price || 0) - (a.price || 0);
        case "price-low":
          return (a.price || 0) - (b.price || 0);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "featured":
          const aFeatured = a.featured || a.facilities?.featured || false;
          const bFeatured = b.featured || b.facilities?.featured || false;
          return bFeatured - aFeatured;
        case "newest":
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
    { value: "all", label: "All Properties", icon: FaHome },
    { value: "house", label: "Houses", icon: FaHome },
    { value: "apartment", label: "Apartments", icon: FaBuilding },
    { value: "villa", label: "Villas", icon: FaCrown },
    { value: "penthouse", label: "Penthouses", icon: FaStar },
  ];

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  /* ── Error state ─────────────────────────────────────────── */
  if (isError) {
    return (
      <>
        <SEO
          title="Properties - RealHomes"
          description="Browse our extensive collection of luxury properties across South Africa. Find your dream home today."
        />
        <div className="min-h-screen bg-ivory-200 pt-24 pb-20 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl p-12 text-center max-w-md w-full shadow-card border border-ivory-300"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5, delay: 0.1 }}
              className="w-20 h-20 bg-gold-50 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <FaExclamationCircle className="w-10 h-10 text-gold-600" />
            </motion.div>

            <h2 className="font-display font-bold text-charcoal-900 text-2xl mb-3">
              Error Loading Properties
            </h2>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              {error?.message ||
                "Unable to load properties. Please try again later."}
            </p>

            <div className="flex gap-4 justify-center">
              <button onClick={() => refetch()} className="btn-gold">
                Retry
              </button>
              <button
                onClick={() => window.location.reload()}
                className="btn-outline-navy"
              >
                Reload Page
              </button>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  /* ── Loading state ───────────────────────────────────────── */
  if (isLoading) {
    return (
      <>
        <SEO
          title="Properties - RealHomes"
          description="Browse our extensive collection of luxury properties across South Africa. Find your dream home today."
        />
        <main className="min-h-screen bg-ivory-200 pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <div className="h-10 bg-ivory-300 rounded-xl w-64 mb-4 animate-pulse" />
              <div className="h-5 bg-ivory-300 rounded-xl w-80 animate-pulse" />
            </div>
            <PropertySkeleton count={6} viewMode="grid" />
          </div>
        </main>
      </>
    );
  }

  const seoTitle = searchQuery
    ? `Properties matching "${searchQuery}" - RealHomes`
    : "Properties - RealHomes";
  const seoDescription = searchQuery
    ? `Find properties matching "${searchQuery}" in South Africa. Browse our curated selection of luxury homes and apartments.`
    : "Browse our extensive collection of luxury properties across South Africa. Find your dream home in Cape Town, Johannesburg, Durban, and more.";

  /* ── Main render ─────────────────────────────────────────── */
  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={`properties, real estate, ${searchQuery}, South Africa, property listings`}
      />

      <main className="min-h-screen bg-ivory-200 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Page Header ── */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="font-display font-bold text-charcoal-900 text-3xl sm:text-4xl">
              Property Listings
            </h1>
            <p className="text-neutral-500 mt-2">
              Discover your perfect property in South Africa
            </p>
          </motion.div>

          {/* ── Search & Filter Bar ── */}
          <div className="mb-8 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by title, city, address, or description…"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="input-enhanced pl-12 pr-12"
              />
              {filter && (
                <button
                  onClick={() => setFilter("")}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-navy-700 transition-colors"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Controls */}
            <div className="bg-white rounded-xl border border-ivory-300 shadow-sm px-4 py-3 flex flex-wrap items-center gap-4">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <FaFilter className="text-gold-600 flex-shrink-0 w-3.5 h-3.5" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="border-0 focus:outline-none focus:ring-0 bg-transparent text-charcoal-700 font-medium cursor-pointer text-sm"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Divider */}
              <div className="h-5 w-px bg-ivory-300" />

              {/* Sort Filter */}
              <div className="flex items-center gap-2">
                <FaSort className="text-gold-600 flex-shrink-0 w-3.5 h-3.5" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border-0 focus:outline-none focus:ring-0 bg-transparent text-charcoal-700 font-medium cursor-pointer text-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="rating">Highest Rated</option>
                  <option value="featured">Featured First</option>
                </select>
              </div>

              {/* Results Count */}
              <div className="ml-auto text-sm text-neutral-500">
                <span className="font-bold text-charcoal-900">
                  {filteredAndSortedProperties.length}
                </span>{" "}
                of{" "}
                <span className="font-bold text-charcoal-900">
                  {uniqueProperties.length}
                </span>{" "}
                properties
              </div>
            </div>
          </div>

          {/* ── Properties Grid / Empty State ── */}
          {filteredAndSortedProperties.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredAndSortedProperties.map((property, index) => {
                  const propertyId =
                    property.id || property._id || `property-${index}`;
                  return (
                    <motion.div
                      key={propertyId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: index * 0.05, duration: 0.35 }}
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
            <EmptyState
              type="properties"
              title="No Properties Available"
              description="There are currently no properties listed. Be the first to add a property!"
              actionLabel="List a Property"
              onAction={() => navigate("/addproperty")}
            />
          ) : (
            <EmptyState
              type="search"
              title="No Properties Found"
              