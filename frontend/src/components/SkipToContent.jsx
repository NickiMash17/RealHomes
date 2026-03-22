import React from "react";
import { motion } from "framer-motion";

const SkipToContent = () => {
  const handleSkip = (e) => {
    e.preventDefault();
    const mainContent =
      document.querySelector("#main-content") || document.querySelector("main");
    if (mainContent) {
      if (!mainContent.hasAttribute("tabindex")) {
        mainContent.setAttribute("tabindex", "-1");
      }
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.a
      href="#main-content"
      onClick={handleSkip}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-5 focus:py-2.5 focus:rounded-xl focus:font-semibold focus:text-sm focus:shadow-lg focus:outline-none"
      style={{
        "--focus-bg": "#1B3A5C",
        "--focus-color": "#ffffff",
        "--focus-ring": "rgba(201,150,44,0.4)",
      }}
      initial={{ opacity: 0, y: -16 }}
      whileFocus={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      aria-label="Skip to main content"
      onFocus={(e) => {
        e.currentTarget.style.background = "#1B3A5C";
        e.currentTarget.style.color = "#ffffff";
        e.currentTarget.style.boxShadow =
          "0 0 0 3px rgba(201,150,44,0.4), 0 8px 24px rgba(27,58,92,0.25)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.background = "";
        e.currentTarget.style.color = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      Skip to main content
    </motion.a>
  );
};

export default SkipToContent;
