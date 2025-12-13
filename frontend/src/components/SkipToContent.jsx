import React from 'react';
import { motion } from 'framer-motion';

const SkipToContent = () => {
  const handleSkip = (e) => {
    e.preventDefault();
    const mainContent = document.querySelector('main') || document.querySelector('#main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Make it focusable if it isn't already
      if (!mainContent.hasAttribute('tabindex')) {
        mainContent.setAttribute('tabindex', '-1');
      }
    }
  };

  return (
    <motion.a
      href="#main-content"
      onClick={handleSkip}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-amber-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
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
