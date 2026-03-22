import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePropertyComparison } from "../hooks/usePropertyComparison";
import { useNavigate } from "react-router-dom";
import {
  FaTimes,
  FaTrash,
  FaBalanceScale,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaStar,
  FaEye,
} from "react-icons/fa";
import OptimizedImage from "./OptimizedImage";

const PropertyComparison = ({ isOpen, onClose }) => {
  const { comparisonList, removeFromComparison, clearComparison } =
    usePropertyComparison();
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-ivory-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-navy-50 rounded-xl flex items-center justify-center">
                <FaBalanceScale className="text-navy-700 w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-charcoal-900">
                  Compare Properties
                </h3>
                <p className="text-sm text-neutral-500">
                  {comparisonList.length} properties selected
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {comparisonList.length > 0 && (
                <button
                  onClick={clearComparison}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-ivory-200 rounded-xl transition-colors"
              >
                <FaTimes className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {comparisonList.length === 0 ? (
              <div className="text-center py-12">
                <FaBalanceScale className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-charcoal-900 mb-2">
                  No Properties to Compare
                </h4>
                <p className="text-neutral-500">
                  Add properties to comparison to see them side by side
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {comparisonList.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl border-2 border-ivory-300 overflow-hidden hover:border-gold-300 transition-colors relative group"
                  >
                    {/* Remove button */}
                    <button
                      onClick={() => removeFromComparison(property.id)}
                      className="absolute top-2 right-2 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                      aria-label="Remove from comparison"
                    >
                      <FaTrash className="w-4 h-4 text-red-500" />
                    </button>

                    {/* Image */}
                    <div
                      className="relative h-48 overflow-hidden bg-gray-100 cursor-pointer"
                      onClick={() => {
                        navigate(`/listing/${property.id}`);
                        onClose();
                      }}
                    >
                      <OptimizedImage
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        width={400}
                        height={300}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h4
                        className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-navy-700 transition-colors cursor-pointer"
                        onClick={() => {
                          navigate(`/listing/${property.id}`);
                          onClose();
                        }}
                      >
                        {property.title}
                      </h4>

                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                        <FaMapMarkerAlt className="w-3 h-3 text-gold-600" />
                        <span className="line-clamp-1">
                          {property.address || property.city || "Location TBD"}
                        </span>
                      </div>

                      <div className="text-2xl font-bold text-navy-700 mb-4">
                        {property.price
                          ? formatPrice(property.price)
                          : "Price on request"}
                      </div>

                      {/* Facilities */}
                      <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-ivory-300">
                        <div className="text-center">
                          <FaBed className="w-4 h-4 text-navy-400 mx-auto mb-1" />
                          <div className="text-sm font-semibold text-gray-900">
                            {property.facilities?.bedrooms ||
                              property.facilities?.bed ||
                              0}
                          </div>
                          <div className="text-xs text-gray-600">Beds</div>
                        </div>
                        <div className="text-center">
                          <FaBath className="w-4 h-4 text-navy-400 mx-auto mb-1" />
                          <div className="text-sm font-semibold text-gray-900">
                            {property.facilities?.bathrooms ||
                              property.facilities?.bath ||
                              0}
                          </div>
                          <div className="text-xs text-gray-600">Baths</div>
                        </div>
                        <div className="text-center">
                          <FaRulerCombined className="w-4 h-4 text-navy-400 mx-auto mb-1" />
                          <div className="text-sm font-semibold text-gray-900">
                            {property.facilities?.area || 0}m²
                          </div>
                          <div className="text-xs text-gray-600">Area</div>
                        </div>
                      </div>

                      {/* Rating */}
                      {property.rating && (
                        <div className="flex items-center gap-1 mb-3">
                          <FaStar className="w-4 h-4 text-gold-500" />
                          <span className="text-sm font-semibold text-gray-900">
                            {property.rating}
                          </span>
                        </div>
                      )}

                      {/* View button */}
                      <button
                        onClick={() => {
                          navigate(`/listing/${property.id}`);
                          onClose();
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-navy-700 hover:bg-navy-800 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
                      >
                        <FaEye className="w-4 h-4" />
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PropertyComparison;
