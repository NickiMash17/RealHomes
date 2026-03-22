import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaHeart,
  FaShare,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaStar,
  FaCrown,
  FaGem,
  FaEye,
  FaArrowRight,
  FaBalanceScale,
} from "react-icons/fa";
import OptimizedImage from "./OptimizedImage";
import { useMockAuth } from "../context/MockAuthContext";
import { toFav } from "../utils/api";
import { usePropertyComparison } from "../hooks/usePropertyComparison";

const Item = ({ property: prop, viewMode = "grid", onClick }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, getAccessTokenSilently } = useMockAuth();
  const { addToComparison, isInComparison, canAddMore } =
    usePropertyComparison();
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Use provided property or fallback to mock data
  const property = prop || {
    id: 1,
    title: "Luxury Beachfront Villa",
    location: "Camps Bay, Cape Town",
    price: 25000000,
    type: "Villa",
    status: "For Sale",
    rating: 4.9,
    beds: 5,
    baths: 4,
    area: 450,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format&fit=crop&q=80",
    features: ["Ocean View", "Private Pool", "Garden", "Security"],
  };

  // Get property ID
  const propertyId = property?.id || property?._id;

  // Check if property is in favorites on mount and when propertyId changes
  useEffect(() => {
    if (propertyId) {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      const idString = String(propertyId);
      setIsLiked(favorites.includes(idString));
    }
  }, [propertyId]);

  // Handle favorite toggle
  const handleToggleFavorite = async (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please login to add favorites");
      return;
    }

    if (!propertyId) {
      toast.error("Invalid property");
      return;
    }

    try {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      const idString = String(propertyId);

      // Update localStorage first (optimistic update)
      let newFavorites;
      if (isLiked) {
        // Remove from favorites
        newFavorites = favorites.filter((favId) => String(favId) !== idString);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        setIsLiked(false);
        toast.success("Removed from favorites");
      } else {
        // Add to favorites
        newFavorites = [...favorites, idString];
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        setIsLiked(true);
        toast.success("Added to favorites");
      }

      // Call API to sync with backend (non-blocking)
      if (user?.email) {
        // Don't await - let it run in background
        (async () => {
          try {
            const token = getAccessTokenSilently
              ? await getAccessTokenSilently()
              : "mock-token";
            await toFav(propertyId, user.email, token);
          } catch (apiError) {
            // Silently fail - favorites are already saved in localStorage
            // Only log in development
            if (import.meta.env.DEV) {
              console.warn(
                "Failed to sync favorites with backend (favorites still saved locally):",
                apiError?.response?.data || apiError?.message,
              );
            }
          }
        })();
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      // Only show error if localStorage operation failed
      toast.error("Failed to save favorite. Please try again.");
    }
  };

  // Handle click - use provided onClick or default navigation
  const handleClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      if (onClick) {
        onClick();
      } else if (propertyId) {
        // Ensure ID is a string and valid
        const validId = String(propertyId).trim();
        if (validId && validId !== "undefined" && validId !== "null") {
          navigate(`/listing/${validId}`);
        } else {
          if (import.meta.env.DEV) {
            console.warn("Invalid property ID:", propertyId);
          }
          toast.error("Invalid property. Please try another property.");
        }
      } else {
        if (import.meta.env.DEV) {
          console.warn("No property ID or onClick handler provided", property);
        }
        toast.error(
          "Property information is missing. Please try another property.",
        );
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Navigation error:", error);
      }
      toast.error("Unable to load property. Please try again.");
    }
  };

  // Handle card click
  const handleCardClick = (e) => {
    // Don't navigate if clicking on buttons
    if (e.target.closest("button") || e.target.closest("a")) {
      return;
    }
    handleClick();
  };

  // Extract data from property object
  const title = property.title || "Property";
  const location = property.address
    ? `${property.address}, ${property.city || ""}`
    : property.location || "Location TBD";
  const price = property.price || 0;
  const type = property.category || property.type || "Property";
  const rating = property.rating || property.facilities?.rating || 4.5;
  const facilities = property.facilities || {};
  const beds = facilities.bedrooms || facilities.bed || property.beds || 0;
  const baths = facilities.bathrooms || facilities.bath || property.baths || 0;
  const area = facilities.area || property.area || 0;
  const image =
    property.image ||
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format&fit=crop&q=80";
  const features = property.features || [];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const containerVariants = {
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

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  /* ─────────────────────────────────────────────────────────────────
     LIST VIEW
  ───────────────────────────────────────────────────────────────── */
  if (viewMode === "list") {
    return (
      <motion.article
        className="group bg-white rounded-2xl border border-ivory-300 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-gold-300"
        style={{ boxShadow: "var(--shadow-card)" }}
        whileHover={{ boxShadow: "var(--shadow-card-hover)" }}
        variants={containerVariants}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="article"
        aria-label={`${title} - ${type} in ${location} - ${formatPrice(price)}`}
      >
        <div className="flex flex-row">
          {/* ── Image Section ── */}
          <div className="relative overflow-hidden w-48 sm:w-64 flex-shrink-0 self-stretch">
            <OptimizedImage
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              width={400}
              height={400}
              loading="lazy"
              objectFit="cover"
            />

            {/* Subtle left-to-right overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

            {/* Type badge */}
            <div className="absolute top-3 left-3">
              <span className="bg-navy-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                {type}
              </span>
            </div>

            {/* Action buttons – stacked vertically */}
            <div className="absolute top-3 right-3 flex flex-col gap-1.5">
              {/* Favorite */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFavorite(e);
                }}
                type="button"
                className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 ${
                  isLiked
                    ? "bg-red-500 text-white shadow-lg"
                    : "bg-black/30 hover:bg-black/50"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={
                  isLiked
                    ? `Remove ${title} from favorites`
                    : `Add ${title} to favorites`
                }
                aria-pressed={isLiked}
              >
                <FaHeart className="w-3.5 h-3.5 text-white" />
              </motion.button>

              {/* Compare */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  if (canAddMore) {
                    addToComparison(property);
                  }
                }}
                disabled={!canAddMore || isInComparison(propertyId)}
                type="button"
                className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 ${
                  isInComparison(propertyId)
                    ? "bg-navy-700 text-white shadow-lg"
                    : canAddMore
                      ? "bg-black/30 hover:bg-black/50"
                      : "bg-black/20 cursor-not-allowed"
                }`}
                whileHover={
                  canAddMore && !isInComparison(propertyId)
                    ? { scale: 1.1 }
                    : {}
                }
                whileTap={
                  canAddMore && !isInComparison(propertyId)
                    ? { scale: 0.9 }
                    : {}
                }
                aria-label={
                  isInComparison(propertyId)
                    ? `${title} is in comparison list`
                    : canAddMore
                      ? `Add ${title} to comparison`
                      : "Comparison list is full (maximum 4 properties)"
                }
                aria-disabled={!canAddMore || isInComparison(propertyId)}
              >
                <FaBalanceScale className="w-3.5 h-3.5 text-white" />
              </motion.button>
            </div>
          </div>

          {/* ── Content Section ── */}
          <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between min-w-0">
            {/* Top: title, location, features */}
            <div>
              {/* Title */}
              <h3 className="font-display font-bold text-charcoal-900 text-base sm:text-lg leading-snug mb-1.5 group-hover:text-navy-700 transition-colors duration-300 line-clamp-1">
                {title}
              </h3>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-neutral-500 text-sm mb-3">
                <FaMapMarkerAlt className="text-gold-600 w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{location}</span>
              </div>

              {/* Feature badges */}
              {features.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="bg-gold-100 text-gold-700 border border-gold-200 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom: amenities, price, CTA */}
            <div>
              {/* Amenities row */}
              <div className="flex items-center gap-4 text-neutral-600 text-sm border-t border-ivory-300 pt-3 mb-3">
                {beds > 0 && (
                  <div className="flex items-center gap-1.5">
                    <FaBed className="text-navy-600 w-3.5 h-3.5" />
                    <span className="font-medium">{beds} Beds</span>
                  </div>
                )}
                {baths > 0 && (
                  <div className="flex items-center gap-1.5">
                    <FaBath className="text-navy-600 w-3.5 h-3.5" />
                    <span className="font-medium">{baths} Baths</span>
                  </div>
                )}
                {area > 0 && (
                  <div className="flex items-center gap-1.5">
                    <FaRulerCombined className="text-navy-600 w-3.5 h-3.5" />
                    <span className="font-medium">{area}m²</span>
                  </div>
                )}
              </div>

              {/* Price + Rating + CTA */}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-navy-700">
                    {formatPrice(price)}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <FaStar className="text-gold-400 w-3 h-3" />
                    <span className="text-xs text-neutral-500 font-medium">
                      {typeof rating === "number" ? rating.toFixed(1) : rating}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleClick}
                  type="button"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy-50 hover:bg-navy-700 text-navy-700 hover:text-white text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-navy-700 focus:ring-offset-2 whitespace-nowrap"
                  aria-label={`View details for ${title}`}
                >
                  View Details
                  <FaArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  /* ─────────────────────────────────────────────────────────────────
     GRID VIEW  (default)
  ───────────────────────────────────────────────────────────────── */
  return (
    <motion.article
      className="group bg-white rounded-2xl border border-ivory-300 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-300 focus-within:ring-2 focus-within:ring-gold-400 focus-within:ring-offset-2"
      style={{ boxShadow: "var(--shadow-card)" }}
      whileHover={{ boxShadow: "var(--shadow-card-hover)" }}
      variants={containerVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="article"
      aria-label={`${title} - ${type} in ${location} - ${formatPrice(price)}`}
    >
      {/* ── Image section ── */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <OptimizedImage
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          width={600}
          height={450}
          loading="lazy"
          objectFit="cover"
        />

        {/* Dark gradient overlay at bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Top-left: Type badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-navy-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
            {type}
          </span>
        </div>

        {/* Top-right: Action buttons */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          {/* Favorite button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFavorite(e);
            }}
            type="button"
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 ${
              isLiked
                ? "bg-red-500 text-white shadow-lg"
                : "bg-black/30 hover:bg-black/50"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={
              isLiked
                ? `Remove ${title} from favorites`
                : `Add ${title} to favorites`
            }
            aria-pressed={isLiked}
          >
            <FaHeart className="w-3.5 h-3.5 text-white" />
          </motion.button>

          {/* Compare button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              if (canAddMore) {
                addToComparison(property);
              }
            }}
            disabled={!canAddMore || isInComparison(propertyId)}
            type="button"
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 ${
              isInComparison(propertyId)
                ? "bg-navy-700 text-white shadow-lg"
                : canAddMore
                  ? "bg-black/30 hover:bg-black/50"
                  : "bg-black/20 cursor-not-allowed"
            }`}
            whileHover={
              canAddMore && !isInComparison(propertyId) ? { scale: 1.1 } : {}
            }
            whileTap={
              canAddMore && !isInComparison(propertyId) ? { scale: 0.9 } : {}
            }
            aria-label={
              isInComparison(propertyId)
                ? `${title} is in comparison list`
                : canAddMore
                  ? `Add ${title} to comparison`
                  : "Comparison list is full (maximum 4 properties)"
            }
            aria-disabled={!canAddMore || isInComparison(propertyId)}
          >
            <FaBalanceScale className="w-3.5 h-3.5 text-white" />
          </motion.button>
        </div>

        {/* Bottom of image: Price pill + Rating pill */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div className="bg-black/50 backdrop-blur-sm text-white text-lg font-bold px-3 py-1.5 rounded-xl">
            {formatPrice(price)}
          </div>
          <div className="bg-black/50 backdrop-blur-sm text-gold-400 text-sm font-semibold px-2.5 py-1.5 rounded-xl flex items-center gap-1">
            <FaStar className="text-gold-400 w-3 h-3" />
            {typeof rating === "number" ? rating.toFixed(1) : rating}
          </div>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-display font-bold text-charcoal-900 text-base leading-snug mb-1.5 group-hover:text-navy-700 transition-colors duration-300 line-clamp-1">
          {title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-neutral-500 text-sm mb-3">
          <FaMapMarkerAlt className="text-gold-600 w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>

        {/* Divider + Amenities row */}
        <div className="border-t border-ivory-300 pt-3">
          <div className="flex items-center justify-between text-neutral-600 text-sm">
            {beds > 0 && (
              <div className="flex items-center gap-1.5">
                <FaBed className="text-navy-600 w-3.5 h-3.5" />
                <span className="font-medium">{beds}</span>
              </div>
            )}
            {baths > 0 && (
              <div className="flex items-center gap-1.5">
                <FaBath className="text-navy-600 w-3.5 h-3.5" />
                <span className="font-medium">{baths}</span>
              </div>
            )}
            {area > 0 && (
              <div className="flex items-center gap-1.5">
                <FaRulerCombined className="text-navy-600 w-3.5 h-3.5" />
                <span className="font-medium">{area}m²</span>
              </div>
            )}
          </div>
        </div>

        {/* View details button */}
        <button
          onClick={handleClick}
          type="button"
          className="mt-3 w-full py-2.5 rounded-xl bg-navy-50 hover:bg-navy-700 text-navy-700 hover:text-white text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-navy-700 focus:ring-offset-2"
          aria-label={`View details for ${title}`}
        >
          View Details
          <FaArrowRight className="w-3 h-3" />
        </button>
      </div>
    </motion.article>
  );
};

export default Item;
