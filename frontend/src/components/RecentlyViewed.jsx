import React from 'react';
import { motion } from 'framer-motion';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaTimes, FaEye } from 'react-icons/fa';
import OptimizedImage from './OptimizedImage';

const RecentlyViewed = () => {
  const { recentlyViewed, clearRecentlyViewed, removeFromRecentlyViewed } = useRecentlyViewed();
  const navigate = useNavigate();

  if (!recentlyViewed || recentlyViewed.length === 0) {
    return null;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="max-padd-container py-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
            <FaClock className="text-amber-600 w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
            <p className="text-sm text-gray-600">Properties you've recently checked out</p>
          </div>
        </div>
        {recentlyViewed.length > 0 && (
          <button
            onClick={clearRecentlyViewed}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recentlyViewed.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer relative"
            onClick={() => navigate(`/listing/${property.id}`)}
          >
            {/* Remove button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFromRecentlyViewed(property.id);
              }}
              className="absolute top-2 right-2 z-10 p-1.5 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
              aria-label="Remove from recently viewed"
            >
              <FaTimes className="w-3 h-3 text-gray-600 hover:text-red-600" />
            </button>

            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <OptimizedImage
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                width={400}
                height={300}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-amber-600 transition-colors">
                {property.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                {property.address || property.city || 'Location TBD'}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-amber-600">
                  {property.price ? formatPrice(property.price) : 'Price on request'}
                </span>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <FaEye className="w-3 h-3" />
                  <span>Viewed</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;

