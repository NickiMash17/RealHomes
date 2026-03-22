import React from "react";
import { motion } from "framer-motion";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import { useNavigate } from "react-router-dom";
import { FaClock, FaTimes, FaEye, FaMapMarkerAlt } from "react-icons/fa";
import OptimizedImage from "./OptimizedImage";

const RecentlyViewed = () => {
  const { recentlyViewed, clearRecentlyViewed, removeFromRecentlyViewed } =
    useRecentlyViewed();
  const navigate = useNavigate();

  if (!recentlyViewed || recentlyViewed.length === 0) {
    return null;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="max-padd-container py-16">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#EEF4FB" }}
          >
            <FaClock className="w-4 h-4" style={{ color: "#1B3A5C" }} />
          </div>
          <div>
            <h2
              className="text-2xl font-bold leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#1A1A2E",
              }}
            >
              Recently Viewed
            </h2>
            <p className="text-sm text-neutral-500 mt-0.5">
              Properties you've recently checked out
            </p>
          </div>
        </div>

        <button
          onClick={clearRecentlyViewed}
          className="text-sm font-medium transition-colors duration-200"
          style={{ color: "#6B7280" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1B3A5C")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
        >
          Clear all
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {recentlyViewed.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, ease: "easeOut" }}
            className="group bg-white rounded-2xl overflow-hidden cursor-pointer relative transition-all duration-300"
            style={{
              border: "1px solid #EDE9E0",
              boxShadow: "var(--shadow-card, 0 2px 8px rgba(0,0,0,0.06))",
            }}
            onClick={() => navigate(`/listing/${property.id}`)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.borderColor = "rgba(201,150,44,0.4)";
              e.currentTarget.style.boxShadow =
                "0 12px 32px rgba(27,58,92,0.14), 0 4px 8px rgba(0,0,0,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "#EDE9E0";
              e.currentTarget.style.boxShadow =
                "0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)";
            }}
            tabIndex={0}
            role="article"
            aria-label={`View ${property.title}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate(`/listing/${property.id}`);
              }
            }}
          >
            {/* Remove button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFromRecentlyViewed(property.id);
              }}
              className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(8px)",
                border: "1px solid #EDE9E0",
              }}
              aria-label="Remove from recently viewed"
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#FEE2E2")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.92)")
              }
            >
              <FaTimes className="w-2.5 h-2.5 text-neutral-500" />
            </button>

            {/* "Viewed" badge */}
            <div className="absolute top-2.5 left-2.5 z-10">
              <span
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: "rgba(27,58,92,0.85)",
                  backdropFilter: "blur(8px)",
                  color: "#ffffff",
                }}
              >
                <FaEye className="w-2.5 h-2.5" />
                Viewed
              </span>
            </div>

            {/* Image */}
            <div
              className="relative overflow-hidden bg-ivory-200"
              style={{ aspectRatio: "4/3" }}
            >
              <OptimizedImage
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                width={400}
                height={300}
                loading="lazy"
              />
              {/* Bottom gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(9,21,36,0.55) 0%, transparent 55%)",
                }}
              />

              {/* Price overlay at bottom of image */}
              <div className="absolute bottom-3 left-3">
                <span
                  className="text-sm font-bold px-2.5 py-1 rounded-lg"
                  style={{
                    background: "rgba(0,0,0,0.50)",
                    backdropFilter: "blur(8px)",
                    color: "#ffffff",
                  }}
                >
                  {property.price
                    ? formatPrice(property.price)
                    : "Price on request"}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Title */}
              <h3
                className="font-bold text-sm leading-snug mb-1.5 line-clamp-1 transition-colors duration-200"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#1A1A2E",
                }}
              >
                {property.title}
              </h3>

              {/* Location */}
              <div className="flex items-center gap-1.5">
                <FaMapMarkerAlt
                  className="w-3 h-3 flex-shrink-0"
                  style={{ color: "#C9962C" }}
                />
                <p className="text-xs text-neutral-500 truncate">
                  {property.address || property.city || "Location TBD"}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;
