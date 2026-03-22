import { motion } from "framer-motion";
import { FaHome, FaSearch, FaHeart, FaCalendar, FaInbox } from "react-icons/fa";

/**
 * EmptyState Component
 * Prestige design — navy / gold / ivory palette
 */
const EmptyState = ({
  type = "default",
  title,
  description,
  actionLabel,
  onAction,
  icon: CustomIcon,
}) => {
  const iconMap = {
    properties: FaHome,
    search: FaSearch,
    favorites: FaHeart,
    bookings: FaCalendar,
    messages: FaInbox,
    default: FaHome,
  };

  const Icon = CustomIcon || iconMap[type] || iconMap.default;

  const defaultContent = {
    properties: {
      title: "No Properties Found",
      description:
        "We couldn't find any properties matching your criteria. Try adjusting your filters or search terms.",
      actionLabel: "View All Properties",
      onAction: () => (window.location.href = "/listing"),
    },
    search: {
      title: "No Results",
      description:
        "Try different search terms or clear your filters to see more properties.",
      actionLabel: "Clear Filters",
      onAction: null,
    },
    favorites: {
      title: "No Favourites Yet",
      description:
        "Start exploring properties and save your favourites to view them here.",
      actionLabel: "Browse Properties",
      onAction: () => (window.location.href = "/listing"),
    },
    bookings: {
      title: "No Bookings",
      description:
        "You haven't scheduled any property viewings yet. Browse properties and book a viewing.",
      actionLabel: "Browse Properties",
      onAction: () => (window.location.href = "/listing"),
    },
    default: {
      title: "Nothing Here",
      description: "There's nothing to display at the moment.",
      actionLabel: null,
      onAction: null,
    },
  };

  const content = defaultContent[type] || defaultContent.default;
  const finalTitle = title || content.title;
  const finalDescription = description || content.description;
  const finalActionLabel = actionLabel || content.actionLabel;
  const finalOnAction = onAction || content.onAction;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      {/* Icon circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 0.15,
          type: "spring",
          stiffness: 220,
          damping: 16,
        }}
        className="mb-7"
      >
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center shadow-md"
          style={{
            background: "linear-gradient(135deg, #EEF4FB 0%, #FBF0D9 100%)",
            border: "2px solid #EDE9E0",
          }}
        >
          <Icon className="w-10 h-10" style={{ color: "#C9962C" }} />
        </div>
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="font-display text-2xl sm:text-3xl font-bold mb-3"
        style={{ color: "#1A1A2E" }}
      >
        {finalTitle}
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="text-neutral-500 max-w-md mb-9 text-base leading-relaxed"
      >
        {finalDescription}
      </motion.p>

      {/* CTA button */}
      {finalActionLabel && finalOnAction && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          onClick={finalOnAction}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-white transition-all duration-300"
          style={{
            background: "#1B3A5C",
            boxShadow: "0 8px 24px rgba(27,58,92,0.25)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#122740")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#1B3A5C")}
        >
          {finalActionLabel}
        </motion.button>
      )}
    </motion.div>
  );
};

export default EmptyState;
