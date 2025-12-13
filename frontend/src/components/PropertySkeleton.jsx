import { motion } from 'framer-motion';

/**
 * PropertySkeleton Component
 * Beautiful skeleton loader for property cards
 */
const PropertySkeleton = ({ viewMode = 'grid', count = 6 }) => {
  const skeletons = Array.from({ length: count });

  if (viewMode === 'list') {
    return (
      <div className="space-y-6">
        {skeletons.map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Image Skeleton */}
              <div className="lg:w-1/3 h-64 lg:h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
              
              {/* Content Skeleton */}
              <div className="flex-1 p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded-lg w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded-lg w-1/2 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded-lg w-2/3 animate-pulse" />
                
                <div className="flex gap-4 pt-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-lg animate-pulse" />
                  <div className="h-12 w-12 bg-gray-200 rounded-lg animate-pulse" />
                  <div className="h-12 w-12 bg-gray-200 rounded-lg animate-pulse" />
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="h-8 bg-gray-200 rounded-lg w-32 animate-pulse" />
                  <div className="h-10 bg-gray-200 rounded-xl w-32 animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // Grid View
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {skeletons.map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          {/* Image Skeleton */}
          <div className="relative h-48 sm:h-56 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
            <div className="absolute top-3 left-3 h-6 w-20 bg-gray-300 rounded-full animate-pulse" />
            <div className="absolute top-3 right-3 h-8 w-8 bg-gray-300 rounded-full animate-pulse" />
          </div>
          
          {/* Content Skeleton */}
          <div className="p-6 space-y-4">
            <div className="h-5 bg-gray-200 rounded-lg w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded-lg w-1/2 animate-pulse" />
            
            <div className="flex gap-4 pt-2">
              <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse" />
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="h-6 bg-gray-200 rounded-lg w-24 animate-pulse" />
              <div className="h-9 bg-gray-200 rounded-xl w-28 animate-pulse" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PropertySkeleton;

