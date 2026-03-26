import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { FaStar, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { usePropertyRecommendations } from "../hooks/usePropertyRecommendations";
import { getAllProperties } from "../utils/api";
import Item from "./Item";

const PropertyRecommendations = ({ properties: propsProperties = null }) => {
  // Fetch properties if not provided
  const { data: fetchedProperties } = useQuery(
    "allProperties",
    getAllProperties,
    {
      enabled: propsProperties === null,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  );

  // Use provided properties or fetched properties
  const allProperties = propsProperties || fetchedProperties || [];

  // Deduplicate properties
  const properties = React.useMemo(() => {
    if (!Array.isArray(allProperties)) return [];
    const seen = new Set();
    return allProperties.filter((property) => {
      const id =
        property.id || property._id || `${property.title}-${property.address}`;
      if (!id || seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  }, [allProperties]);

  const { recommendations, hasRecommendations } =
    usePropertyRecommendations(properties);

  if (!hasRecommendations) {
    return null; // Don't show section if no recommendations
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="max-padd-container py-12 sm:py-16 overflow-x-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-gold-600/15 text-gold-700 border border-gold-600/30 px-4 py-2 rounded-full mb-4 max-w-full">
            <FaStar className="w-4 h-4 flex-shrink-0 text-gold-600" />
            <span className="text-sm font-semibold truncate">
              Personalized For You
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-charcoal-900 mb-3 sm:mb-4">
            Recommended Properties
          </h2>
          <p className="text-sm sm:text-lg text-neutral-600 max-w-2xl mx-auto">
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
              <div className="absolute top-3 left-3 z-10 hidden sm:flex bg-navy-700 text-white px-3 py-1 rounded-full text-[11px] font-bold shadow-lg items-center gap-1 pointer-events-none max-w-[85%]">
                <FaStar className="w-3 h-3 text-gold-400 flex-shrink-0" />
                <span className="truncate">Recommended</span>
              </div>
              <Item property={property} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mt-12">
          <motion.div
            className="flex justify-center"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/listing"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 bg-navy-700 hover:bg-navy-800 text-white rounded-xl font-semibold text-sm shadow-navy transition-all duration-300"
            >
              View All Properties
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PropertyRecommendations;

