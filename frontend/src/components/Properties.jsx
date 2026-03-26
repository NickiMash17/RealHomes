import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaTimes,
  FaThLarge,
  FaList,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaHome,
  FaBuilding,
  FaCrown,
  FaStar,
  FaGem,
  FaTrophy,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowRight,
  FaArrowLeft,
  FaBookmark,
  FaSave,
  FaBell,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { useQuery } from "react-query";
import { getAllProperties } from "../utils/api";
import Item from "./Item";
import LoadingSpinner from "./LoadingSpinner";
import SavedSearches from "./SavedSearches";
import { useSavedSearches } from "../hooks/useSavedSearches";
import { usePropertyAlerts } from "../hooks/usePropertyAlerts";
import PropertyAlerts from "./PropertyAlerts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Properties = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [minBedrooms, setMinBedrooms] = useState("any");
  const [minBathrooms, setMinBathrooms] = useState("any");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000000);
  const [minArea, setMinArea] = useState(0);
  const [maxArea, setMaxArea] = useState(10000);
  const [selectedCity, setSelectedCity] = useState("all");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [showSaveSearchModal, setShowSaveSearchModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showCreateAlertModal, setShowCreateAlertModal] = useState(false);
  const [alertName, setAlertName] = useState("");
  const [searchName, setSearchName] = useState("");
  const { saveSearch } = useSavedSearches();
  const { createAlert } = usePropertyAlerts();

  // Fetch properties from API with optimized caching
  const {
    data: propertiesData,
    isLoading,
    isError,
    error,
  } = useQuery("allProperties", getAllProperties, {
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes - keep in cache
    refetchOnMount: false, // Don't refetch if data exists in cache
  });

  // Deduplicate properties by ID - Optimized
  const properties = useMemo(() => {
    if (!propertiesData) return [];
    const dataArray = Array.isArray(propertiesData) ? propertiesData : [];
    const seen = new Set();
    return dataArray.filter((property) => {
      const id =
        property.id || property._id || `${property.title}-${property.address}`;
      if (!id || seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  }, [propertiesData]);

  // Stats data
  const stats = [
    { value: "2,847", label: "Properties Listed", icon: FaHome, color: "navy" },
    {
      value: "R5.2B+",
      label: "Total Portfolio Value",
      icon: FaGem,
      color: "gold",
    },
    {
      value: "99%",
      label: "Client Satisfaction",
      icon: FaCheckCircle,
      color: "navy",
    },
    { value: "25+", label: "Years Experience", icon: FaTrophy, color: "gold" },
  ];

  // Calculate category counts from actual data
  const categoryCounts = useMemo(() => {
    const counts = { all: properties.length };
    properties.forEach((prop) => {
      const category = prop.category?.toLowerCase() || "other";
      counts[category] = (counts[category] || 0) + 1;
      counts.all = properties.length;
    });
    return counts;
  }, [properties]);

  const categories = [
    {
      value: "all",
      label: "All Properties",
      icon: FaHome,
      count: categoryCounts.all || 0,
    },
    {
      value: "house",
      label: "Houses",
      icon: FaHome,
      count: categoryCounts.house || 0,
    },
    {
      value: "apartment",
      label: "Apartments",
      icon: FaBuilding,
      count: categoryCounts.apartment || 0,
    },
    {
      value: "villa",
      label: "Villas",
      icon: FaCrown,
      count: categoryCounts.villa || 0,
    },
    {
      value: "penthouse",
      label: "Penthouses",
      icon: FaStar,
      count: categoryCounts.penthouse || 0,
    },
    {
      value: "estate",
      label: "Estates",
      icon: FaGem,
      count: categoryCounts.estate || 0,
    },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "popular", label: "Most Popular" },
    { value: "featured", label: "Featured" },
  ];

  // Filter and sort properties
  const filteredAndSortedProperties = useMemo(() => {
    let filtered = [...properties];

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (prop) =>
          prop.title?.toLowerCase().includes(searchLower) ||
          prop.description?.toLowerCase().includes(searchLower) ||
          prop.address?.toLowerCase().includes(searchLower) ||
          prop.city?.toLowerCase().includes(searchLower),
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((prop) =>
        prop.category?.toLowerCase().includes(selectedCategory.toLowerCase()),
      );
    }

    // Bedrooms filter
    if (minBedrooms !== "any") {
      filtered = filtered.filter(
        (prop) =>
          (prop.facilities?.bedrooms || prop.bedrooms || 0) >=
          parseInt(minBedrooms),
      );
    }

    // Price filter
    filtered = filtered.filter((prop) => prop.price <= maxPrice);

    // Sort
    switch (sortBy) {
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "featured":
        filtered.sort((a, b) => {
          const aFeatured = a.featured || a.facilities?.featured || false;
          const bFeatured = b.featured || b.facilities?.featured || false;
          return bFeatured - aFeatured;
        });
        break;
      case "popular":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
      default:
        filtered.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
        );
        break;
    }

    return filtered;
  }, [
    properties,
    searchTerm,
    selectedCategory,
    minBedrooms,
    minBathrooms,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    selectedCity,
    featuredOnly,
    sortBy,
  ]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortBy("newest");
    setMinBedrooms("any");
    setMinBathrooms("any");
    setMinPrice(0);
    setMaxPrice(50000000);
    setMinArea(0);
    setMaxArea(10000);
    setSelectedCity("all");
    setFeaturedOnly(false);
  };

  // Get unique cities from properties
  const cities = useMemo(() => {
    const citySet = new Set();
    properties.forEach((prop) => {
      if (prop.city) citySet.add(prop.city);
    });
    return Array.from(citySet).sort();
  }, [properties]);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedCategory !== "all") count++;
    if (minBedrooms !== "any") count++;
    if (minBathrooms !== "any") count++;
    if (minPrice > 0) count++;
    if (maxPrice < 50000000) count++;
    if (minArea > 0) count++;
    if (maxArea < 10000) count++;
    if (selectedCity !== "all") count++;
    if (featuredOnly) count++;
    return count;
  }, [
    searchTerm,
    selectedCategory,
    minBedrooms,
    minBathrooms,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    selectedCity,
    featuredOnly,
  ]);

  const handleSaveSearch = () => {
    const searchParams = {
      searchTerm,
      selectedCategory,
      minBedrooms,
      maxPrice,
      sortBy,
      resultCount: filteredAndSortedProperties.length,
    };
    const success = saveSearch(searchName, searchParams);
    if (success) {
      setShowSaveSearchModal(false);
      setSearchName("");
    }
  };

  const handleCreateAlert = () => {
    const alertCriteria = {
      searchTerm,
      selectedCategory,
      minBedrooms,
      maxPrice,
      sortBy,
    };
    const success = createAlert(alertName, alertCriteria);
    if (success) {
      setShowCreateAlertModal(false);
      setAlertName("");
    }
  };

  // Load search params from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("q")) setSearchTerm(params.get("q"));
    if (params.get("category")) setSelectedCategory(params.get("category"));
    if (params.get("bedrooms")) setMinBedrooms(params.get("bedrooms"));
    if (params.get("maxPrice")) setMaxPrice(parseInt(params.get("maxPrice")));
    if (params.get("city")) setSearchTerm((prev) => prev || params.get("city"));
    if (params.get("sort")) setSortBy(params.get("sort"));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  /* ─── Loading state ─────────────────────────────────────────────── */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-ivory-200 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  /* ─── Error state ───────────────────────────────────────────────── */
  if (isError) {
    return (
      <div className="min-h-screen bg-ivory-200 flex items-center justify-center">
        <div
          className="text-center bg-white rounded-2xl border border-ivory-300 p-10 max-w-md mx-4"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaTimes className="w-7 h-7 text-navy-700" />
          </div>
          <h2 className="font-display text-2xl font-bold text-charcoal-900 mb-3">
            Error Loading Properties
          </h2>
          <p className="text-neutral-500 mb-6 text-sm">
            {error?.message || "Failed to load properties. Please try again."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-gold w-full justify-center"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* ─── Main render ───────────────────────────────────────────────── */
  return (
    <motion.div
      className="min-h-screen bg-ivory-200 pt-24 pb-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ══════════════════════════════════════════════════════════
            SECTION HEADER
        ══════════════════════════════════════════════════════════ */}
        <motion.div
          className="flex items-start justify-between mb-8 sm:mb-10"
          variants={itemVariants}
        >
          <div>
            {/* Section label badge */}
            <span className="section-label-gold mb-3 inline-flex">
              <FaGem className="w-3 h-3" />
              Premium Listings
            </span>

            {/* Heading */}
            <h1 className="font-display font-bold text-charcoal-900 text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
              Discover Your
              <span className="block text-gradient-prestige">Perfect Home</span>
            </h1>
            <p className="text-neutral-500 text-sm sm:text-base mt-2 max-w-xl">
              Explore our curated collection of luxury properties across South
              Africa
            </p>
          </div>

          {/* View All link */}
          <a
            href="/properties"
            className="hidden sm:flex items-center gap-2 text-gold-600 hover:text-gold-700 font-semibold text-sm transition-colors duration-300 mt-2 whitespace-nowrap group"
          >
            View All
            <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
          </a>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════
            STATS ROW
        ══════════════════════════════════════════════════════════ */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10"
          variants={itemVariants}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-ivory-300 p-4 sm:p-5 flex items-center gap-3 sm:gap-4 transition-all duration-300 hover:-translate-y-0.5"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  stat.color === "gold"
                    ? "bg-gold-50 text-gold-600"
                    : "bg-navy-50 text-navy-700"
                }`}
              >
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              {/* Text */}
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl font-bold text-navy-700 leading-none">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-neutral-600 mt-0.5 truncate">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ══════════════════════════════════════════════════════════
            SEARCH + TOOLBAR
        ══════════════════════════════════════════════════════════ */}
        <motion.div
          className="bg-white rounded-2xl border border-ivory-300 p-4 sm:p-5 mb-5 sm:mb-6"
          style={{ boxShadow: "var(--shadow-card)" }}
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by title, location, or city…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-enhanced pl-10 text-sm py-2.5 w-full"
              />
            </div>

            {/* Sort select */}
            <div className="hidden sm:flex items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-2 border-ivory-300 rounded-xl bg-white text-charcoal-900 text-sm px-3 py-2.5 pr-8 font-medium focus:outline-none focus:border-gold-600 transition-colors duration-300 cursor-pointer appearance-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23737373'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.5rem center",
                  backgroundSize: "1rem",
                }}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-ivory-200 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-white text-navy-700 shadow-sm"
                    : "text-neutral-500 hover:text-navy-700"
                }`}
                aria-label="Grid view"
              >
                <FaThLarge className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-white text-navy-700 shadow-sm"
                    : "text-neutral-500 hover:text-navy-700"
                }`}
                aria-label="List view"
              >
                <FaList className="w-4 h-4" />
              </button>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap gap-2">
              {/* Save Search */}
              <motion.button
                onClick={() => setShowSaveSearchModal(true)}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-ivory-300 bg-white text-navy-700 hover:bg-navy-50 hover:border-navy-700 text-xs sm:text-sm font-semibold transition-all duration-300"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                <FaBookmark className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Save</span>
              </motion.button>

              {/* Create Alert */}
              <motion.button
                onClick={() => setShowCreateAlertModal(true)}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-ivory-300 bg-white text-navy-700 hover:bg-navy-50 hover:border-navy-700 text-xs sm:text-sm font-semibold transition-all duration-300"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                <FaBell className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Alert</span>
              </motion.button>

              {/* View Alerts */}
              <motion.button
                onClick={() => setShowAlertModal(true)}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-ivory-300 bg-white text-navy-700 hover:bg-navy-50 hover:border-navy-700 text-xs sm:text-sm font-semibold transition-all duration-300"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                <FaStar className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">View</span>
              </motion.button>

              {/* Filter Toggle */}
              <motion.button
                onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
                className={`relative flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  showAdvancedFilter
                    ? "bg-navy-700 text-white border border-navy-700 shadow-navy"
                    : "bg-white text-navy-700 border border-ivory-300 hover:bg-navy-50 hover:border-navy-700"
                }`}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                <FaFilter className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-gold-600 text-white text-[10px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold px-1">
                    {activeFilterCount}
                  </span>
                )}
              </motion.button>
            </div>
          </div>

          {/* ── Advanced Filter Panel ── */}
          <AnimatePresence>
            {showAdvancedFilter && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mt-5 pt-5 border-t border-ivory-300 overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {/* Property Type */}
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-charcoal-800 mb-2">
                      <FaHome className="w-3 h-3 text-gold-600" />
                      Property Type
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="input-enhanced text-sm"
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label} {cat.count > 0 && `(${cat.count})`}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="block text-sm font-semibold text-charcoal-800 mb-2">
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="input-enhanced text-sm"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-charcoal-800 mb-2">
                      <FaBed className="w-3 h-3 text-gold-600" />
                      Min Bedrooms
                    </label>
                    <select
                      value={minBedrooms}
                      onChange={(e) => setMinBedrooms(e.target.value)}
                      className="input-enhanced text-sm"
                    >
                      <option value="any">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                      <option value="5">5+</option>
                      <option value="6">6+</option>
                    </select>
                  </div>

                  {/* Bathrooms */}
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-charcoal-800 mb-2">
                      <FaBath className="w-3 h-3 text-gold-600" />
                      Min Bathrooms
                    </label>
                    <select
                      value={minBathrooms}
                      onChange={(e) => setMinBathrooms(e.target.value)}
                      className="input-enhanced text-sm"
                    >
                      <option value="any">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                      <option value="5">5+</option>
                    </select>
                  </div>

                  {/* Location / City */}
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-charcoal-800 mb-2">
                      <FaMapMarkerAlt className="w-3 h-3 text-gold-600" />
                      Location
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="input-enhanced text-sm"
                    >
                      <option value="all">All Cities</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price Range */}
                <div className="mt-5 pt-5 border-t border-ivory-300">
                  <label className="block text-sm font-semibold text-charcoal-800 mb-3">
                    Price Range
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <label className="block text-xs text-neutral-500 mb-1.5 font-medium">
                          Min Price
                        </label>
                        <input
                          type="number"
                          min="0"
                          max={maxPrice}
                          step="100000"
                          value={minPrice}
                          onChange={(e) =>
                            setMinPrice(
                              Math.max(0, parseInt(e.target.value) || 0),
                            )
                          }
                          className="input-enhanced text-sm w-full"
                          placeholder="R0"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs text-neutral-500 mb-1.5 font-medium">
                          Max Price
                        </label>
                        <input
                          type="number"
                          min={minPrice}
                          max="50000000"
                          step="100000"
                          value={maxPrice}
                          onChange={(e) =>
                            setMaxPrice(
                              Math.min(
                                50000000,
                                parseInt(e.target.value) || 50000000,
                              ),
                            )
                          }
                          className="input-enhanced text-sm w-full"
                          placeholder="R50M"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="50000000"
                        step="500000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                        className="w-full h-2 bg-ivory-300 rounded-lg appearance-none cursor-pointer accent-gold-600"
                      />
                      <div className="flex justify-between text-xs text-neutral-500 mt-1.5">
                        <span>{formatPrice(minPrice)}</span>
                        <span className="text-gold-600 font-semibold">
                          {formatPrice(maxPrice)}
                        </span>
                        <span>R50M+</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Area Range */}
                <div className="mt-5 pt-5 border-t border-ivory-300">
                  <label className="flex items-center gap-2 text-sm font-semibold text-charcoal-800 mb-3">
                    <FaRulerCombined className="w-3.5 h-3.5 text-gold-600" />
                    Area (m²)
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <label className="block text-xs text-neutral-500 mb-1.5 font-medium">
                        Min Area
                      </label>
                      <input
                        type="number"
                        min="0"
                        max={maxArea}
                        step="10"
                        value={minArea}
                        onChange={(e) =>
                          setMinArea(Math.max(0, parseInt(e.target.value) || 0))
                        }
                        className="input-enhanced text-sm w-full"
                        placeholder="0 m²"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-neutral-500 mb-1.5 font-medium">
                        Max Area
                      </label>
                      <input
                        type="number"
                        min={minArea}
                        max="10000"
                        step="10"
                        value={maxArea}
                        onChange={(e) =>
                          setMaxArea(
                            Math.min(10000, parseInt(e.target.value) || 10000),
                          )
                        }
                        className="input-enhanced text-sm w-full"
                        placeholder="10,000 m²"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Options */}
                <div className="mt-5 pt-5 border-t border-ivory-300">
                  <label className="block text-sm font-semibold text-charcoal-800 mb-3">
                    Additional Options
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer w-fit">
                    <input
                      type="checkbox"
                      id="featuredOnly"
                      checked={featuredOnly}
                      onChange={(e) => setFeaturedOnly(e.target.checked)}
                      className="w-4 h-4 text-gold-600 border-ivory-300 rounded focus:ring-gold-500"
                    />
                    <span className="text-sm text-charcoal-800 font-medium flex items-center gap-1.5">
                      <FaStar className="w-3.5 h-3.5 text-gold-500" />
                      Featured Properties Only
                    </span>
                  </label>
                </div>

                {/* Filter actions */}
                <div className="flex items-center justify-end gap-3 mt-5 pt-5 border-t border-ivory-300">
                  <button
                    onClick={clearFilters}
                    className="text-sm font-medium text-neutral-500 hover:text-navy-700 transition-colors duration-300 px-3 py-2"
                  >
                    Clear Filters
                  </button>
                  <button
                    onClick={() => setShowAdvancedFilter(false)}
                    className="btn-gold text-sm px-5 py-2.5"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════
            CATEGORY PILLS
        ══════════════════════════════════════════════════════════ */}
        <motion.div
          className="flex gap-2 mb-5 sm:mb-6 overflow-x-auto pb-2 scrollbar-hide sm:flex-wrap sm:overflow-visible"
          variants={itemVariants}
        >
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border whitespace-nowrap transition-all duration-300 active:scale-95 ${
                selectedCategory === category.value
                  ? "bg-navy-700 text-white border-navy-700 shadow-sm"
                  : "bg-white text-neutral-600 border-ivory-300 hover:border-gold-400 hover:text-navy-700"
              }`}
            >
              <category.icon
                className={`w-3.5 h-3.5 flex-shrink-0 ${
                  selectedCategory === category.value
                    ? "text-gold-400"
                    : "text-neutral-400"
                }`}
              />
              <span className="hidden xs:inline sm:hidden">
                {category.label.split(" ")[0]}
              </span>
              <span className="hidden sm:inline">{category.label}</span>
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-bold flex-shrink-0 ${
                  selectedCategory === category.value
                    ? "bg-white/20 text-white"
                    : "bg-ivory-200 text-neutral-500"
                }`}
              >
                {category.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* ══════════════════════════════════════════════════════════
            RESULTS HEADER (count + mobile sort/view)
        ══════════════════════════════════════════════════════════ */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-2">
          <div>
            <h2 className="font-display font-bold text-charcoal-900 text-lg sm:text-xl">
              {selectedCategory === "all"
                ? "All Properties"
                : categories.find((c) => c.value === selectedCategory)?.label}
            </h2>
            <p className="text-neutral-500 text-sm mt-0.5">
              {filteredAndSortedProperties.length}{" "}
              {filteredAndSortedProperties.length === 1
                ? "property"
                : "properties"}{" "}
              found
            </p>
          </div>

          {/* Mobile: sort + view toggle */}
          <div className="flex items-center gap-2 sm:hidden w-full">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 border-2 border-ivory-300 rounded-xl bg-white text-charcoal-900 text-sm px-3 py-2 font-medium focus:outline-none focus:border-gold-600 transition-colors duration-300"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-1 bg-ivory-200 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-white text-navy-700 shadow-sm"
                    : "text-neutral-500"
                }`}
                aria-label="Grid view"
              >
                <FaThLarge className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-white text-navy-700 shadow-sm"
                    : "text-neutral-500"
                }`}
                aria-label="List view"
              >
                <FaList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            PROPERTIES GRID / LIST
        ══════════════════════════════════════════════════════════ */}
        {filteredAndSortedProperties.length > 0 ? (
          <motion.div
            className={`grid gap-4 sm:gap-5 md:gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
            variants={itemVariants}
          >
            {filteredAndSortedProperties.map((property, index) => (
              <Item
                key={property.id || property._id || index}
                property={property}
                viewMode={viewMode}
                onClick={() =>
                  navigate(`/listing/${property.id || property._id}`)
                }
              />
            ))}
          </motion.div>
        ) : (
          /* ── Empty State ── */
          <motion.div className="text-center py-20" variants={itemVariants}>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-navy-50 rounded-full mb-6">
              <FaHome className="w-9 h-9 text-navy-700" />
            </div>
            <h3 className="font-display text-2xl font-bold text-charcoal-900 mb-3">
              No Properties Found
            </h3>
            <p className="text-neutral-500 mb-8 max-w-md mx-auto text-sm sm:text-base">
              Try adjusting your search criteria or browse our full collection
              below.
            </p>
            <button
              onClick={clearFilters}
              className="btn-outline-navy inline-flex items-center gap-2"
            >
              <FaTimes className="w-4 h-4" />
              Clear All Filters
            </button>
          </motion.div>
        )}
      </div>
      {/* /max-w-7xl */}

      {/* ══════════════════════════════════════════════════════════
          SAVE SEARCH MODAL
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showSaveSearchModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm z-50"
              onClick={() => {
                setShowSaveSearchModal(false);
                setSearchName("");
              }}
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
            >
              <div
                className="bg-white rounded-2xl border border-ivory-300 max-w-md w-full p-6 pointer-events-auto"
                style={{ boxShadow: "var(--shadow-card-hover)" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-navy-50 rounded-xl flex items-center justify-center">
                      <FaBookmark className="w-4 h-4 text-navy-700" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-charcoal-900">
                      Save Search
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setShowSaveSearchModal(false);
                      setSearchName("");
                    }}
                    className="p-2 hover:bg-ivory-200 rounded-xl transition-colors text-neutral-500 hover:text-charcoal-900"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-neutral-500 mb-4 text-sm">
                  Save your current search filters to quickly access them later.
                </p>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-charcoal-800 mb-2">
                    Search Name
                  </label>
                  <input
                    type="text"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    placeholder="e.g., Luxury Cape Town Homes"
                    className="input-enhanced w-full"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handleSaveSearch();
                    }}
                    autoFocus
                  />
                </div>

                {/* Criteria summary */}
                <div className="bg-ivory-200 rounded-xl border border-ivory-300 p-3.5 mb-5 text-sm">
                  <p className="text-charcoal-800 font-semibold mb-2">
                    Search Criteria:
                  </p>
                  <ul className="space-y-1 text-neutral-600">
                    {searchTerm && <li>• Search: "{searchTerm}"</li>}
                    {selectedCategory !== "all" && (
                      <li>• Category: {selectedCategory}</li>
                    )}
                    {minBedrooms !== "any" && (
                      <li>• Bedrooms: {minBedrooms}+</li>
                    )}
                    {maxPrice < 50000000 && (
                      <li>• Max Price: {formatPrice(maxPrice)}</li>
                    )}
                    {sortBy !== "newest" && (
                      <li>
                        • Sort:{" "}
                        {sortOptions.find((o) => o.value === sortBy)?.label}
                      </li>
                    )}
                    <li>
                      • Results: {filteredAndSortedProperties.length} properties
                    </li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowSaveSearchModal(false);
                      setSearchName("");
                    }}
                    className="btn-ghost flex-1 justify-center"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveSearch}
                    disabled={!searchName.trim()}
                    className="btn-gold flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaSave className="w-4 h-4" />
                    Save Search
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════
          CREATE ALERT MODAL
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showCreateAlertModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm z-50"
              onClick={() => {
                setShowCreateAlertModal(false);
                setAlertName("");
              }}
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
            >
              <div
                className="bg-white rounded-2xl border border-ivory-300 max-w-md w-full p-6 pointer-events-auto"
                style={{ boxShadow: "var(--shadow-card-hover)" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-gold-50 rounded-xl flex items-center justify-center">
                      <FaBell className="w-4 h-4 text-gold-600" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-charcoal-900">
                      Create Property Alert
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setShowCreateAlertModal(false);
                      setAlertName("");
                    }}
                    className="p-2 hover:bg-ivory-200 rounded-xl transition-colors text-neutral-500 hover:text-charcoal-900"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-neutral-500 mb-4 text-sm">
                  Get notified when new properties match your search criteria.
                </p>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-charcoal-800 mb-2">
                    Alert Name
                  </label>
                  <input
                    type="text"
                    value={alertName}
                    onChange={(e) => setAlertName(e.target.value)}
                    placeholder="e.g., Luxury Cape Town Alerts"
                    className="input-enhanced w-full"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handleCreateAlert();
                    }}
                    autoFocus
                  />
                </div>

                {/* Criteria summary */}
                <div className="bg-gold-50 rounded-xl border border-gold-100 p-3.5 mb-5 text-sm">
                  <p className="text-charcoal-800 font-semibold mb-2">
                    Alert Criteria:
                  </p>
                  <ul className="space-y-1 text-neutral-600">
                    {searchTerm && <li>• Search: "{searchTerm}"</li>}
                    {selectedCategory !== "all" && (
                      <li>• Category: {selectedCategory}</li>
                    )}
                    {minBedrooms !== "any" && (
                      <li>• Bedrooms: {minBedrooms}+</li>
                    )}
                    {maxPrice < 50000000 && (
                      <li>• Max Price: {formatPrice(maxPrice)}</li>
                    )}
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowCreateAlertModal(false);
                      setAlertName("");
                    }}
                    className="btn-ghost flex-1 justify-center"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateAlert}
                    disabled={!alertName.trim()}
                    className="btn-gold flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaBell className="w-4 h-4" />
                    Create Alert
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Property Alerts Panel ── */}
      <PropertyAlerts
        opened={showAlertModal}
        onClose={() => setShowAlertModal(false)}
      />
    </motion.div>
  );
};

export default Properties;
