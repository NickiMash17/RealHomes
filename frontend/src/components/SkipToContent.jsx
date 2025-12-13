import { motion } from 'framer-motion';

/**
 * SkipToContent Component
 * Provides keyboard navigation for accessibility
 */
const SkipToContent = () => {
  return (
    <motion.a
      href="#main-content"
      className="absolute -top-20 left-4 z-[100] px-4 py-2 bg-amber-600 text-white rounded-lg font-semibold shadow-lg outline-none ring-2 ring-amber-500 ring-offset-2 focus:top-4 transition-all duration-200"
      initial={{ opacity: 0, y: -20 }}
      whileFocus={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      aria-label="Skip to main content"
    >
      Skip to main content
    </motion.a>
  );
};

export default SkipToContent;

