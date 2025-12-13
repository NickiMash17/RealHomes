import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { FaStar, FaHome, FaArrowRight } from 'react-icons/fa';
import { usePropertyRecommendations } from '../hooks/usePropertyRecommendations';
import { getAllProperties } from '../utils/api';
import Item from './Item';
import EmptyState from './EmptyState';

const PropertyRecommendations = ({ properties: propsProperties = null }) => {
  // Fetch properties if not provided
  const { data: fetchedProperties } = useQuery(
    'allProperties',
    getAllProperties,
    {
      enabled: propsProperties === null,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    }
  );

  // Use provided properties or fetched properties
  const allProperties = propsProperties || fetchedProperties || [];
  
  // Deduplicate properties
  const properties = React.useMemo(() => {
    if (!Array.isArray(allProperties)) return [];
    const seen = new Set();
    return allProperties.filter(property => {
      const id = property.id || property._id || `${property.title}-${property.address}`;
      if (!id || seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  }, [allProperties]);

  const { recommendations, hasRecommendations } = usePropertyRecommendations(properties);

  if (!hasRecommendations) {
    return null; // Don't show section if no recommendations
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="max-padd-container py-16 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full mb-4">
            <FaStar className="w-4 h-4" />
            <span className="text-sm font-semibold">Personalized For You</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Recommended Properties
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Based on your viewing history and saved searches, we think you'll love these properties
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {recommendations.map((property, index) => (
            <motion.div
              key={property.id || property._id || index}
              variants={itemVariants}
              className="relative"
            >
              {/* Recommendation Badge */}
              <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                <FaStar className="w-3 h-3" />
                Recommended
              </div>
              <Item property={property} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mt-12">
          <motion.a
            href="/listing"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold text-sm hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Properties
            <FaArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PropertyRecommendations;

