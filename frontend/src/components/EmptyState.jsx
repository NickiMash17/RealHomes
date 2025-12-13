import { motion } from 'framer-motion';
import { FaHome, FaSearch, FaHeart, FaCalendar, FaInbox } from 'react-icons/fa';

/**
 * EmptyState Component
 * Beautiful empty states for different scenarios
 */
const EmptyState = ({ 
  type = 'default',
  title,
  description,
  actionLabel,
  onAction,
  icon: CustomIcon
}) => {
  const iconMap = {
    properties: FaHome,
    search: FaSearch,
    favorites: FaHeart,
    bookings: FaCalendar,
    messages: FaInbox,
    default: FaHome
  };

  const Icon = CustomIcon || iconMap[type] || iconMap.default;

  const defaultContent = {
    properties: {
      title: 'No Properties Found',
      description: 'We couldn\'t find any properties matching your criteria. Try adjusting your filters or search terms.',
      actionLabel: 'View All Properties',
      onAction: () => window.location.href = '/listing'
    },
    search: {
      title: 'No Results',
      description: 'Try different search terms or clear your filters to see more properties.',
      actionLabel: 'Clear Filters',
      onAction: null
    },
    favorites: {
      title: 'No Favorites Yet',
      description: 'Start exploring properties and save your favorites to view them here.',
      actionLabel: 'Browse Properties',
      onAction: () => window.location.href = '/listing'
    },
    bookings: {
      title: 'No Bookings',
      description: 'You haven\'t scheduled any property viewings yet. Browse properties and book a viewing.',
      actionLabel: 'Browse Properties',
      onAction: () => window.location.href = '/listing'
    },
    default: {
      title: 'Nothing Here',
      description: 'There\'s nothing to display at the moment.',
      actionLabel: null,
      onAction: null
    }
  };

  const content = defaultContent[type] || defaultContent.default;
  const finalTitle = title || content.title;
  const finalDescription = description || content.description;
  const finalActionLabel = actionLabel || content.actionLabel;
  const finalOnAction = onAction || content.onAction;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-6"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900 dark:to-yellow-900 rounded-full flex items-center justify-center shadow-lg">
          <Icon className="w-12 h-12 text-amber-600 dark:text-amber-400" />
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3"
      >
        {finalTitle}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 dark:text-gray-300 max-w-md mb-8 text-base sm:text-lg"
      >
        {finalDescription}
      </motion.p>

      {finalActionLabel && finalOnAction && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={finalOnAction}
          className="px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {finalActionLabel}
        </motion.button>
      )}
    </motion.div>
  );
};

export default EmptyState;

