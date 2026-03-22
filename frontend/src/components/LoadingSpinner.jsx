import React from "react";
import { motion } from "framer-motion";
import { FaCrown } from "react-icons/fa";

const LoadingSpinner = ({ size = "medium", text = "Loading..." }) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-8 h-8",
    large: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const textSizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
    xl: "text-xl",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <motion.div
          className={`${sizeClasses[size]} rounded-full border-2 border-navy-100`}
          style={{ borderTopColor: "#1B3A5C", borderRightColor: "#C9962C" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
        />
      </div>
      {text && (
        <motion.p
          className={`${textSizes[size]} text-neutral-500 font-medium`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

const PremiumLoader = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        background:
          "linear-gradient(160deg, #091524 0%, #0F2339 40%, #1B3A5C 100%)",
      }}
    >
      <div className="text-center select-none">
        {/* Logo mark */}
        <motion.div
          className="flex justify-center mb-8"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <FaCrown className="text-4xl" style={{ color: "#C9962C" }} />
          </div>
        </motion.div>

        {/* Brand name */}
        <motion.h2
          className="font-display text-3xl font-black text-white mb-2 tracking-tight"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          RealHomes
        </motion.h2>

        <motion.p
          className="text-sm font-semibold tracking-widest uppercase mb-8"
          style={{ color: "rgba(201,150,44,0.85)" }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
        >
          Prestige Properties
        </motion.p>

        {/* Progress bar */}
        <div
          className="w-48 mx-auto h-0.5 rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.10)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #1B3A5C, #C9962C, #E8BC64)",
            }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
};

const SkeletonLoader = ({ type = "card" }) => {
  const shimmer = {
    background: "linear-gradient(90deg, #f0ede6 25%, #e8e4da 50%, #f0ede6 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.6s infinite",
  };

  if (type === "card") {
    return (
      <div
        className="bg-white rounded-2xl border border-ivory-300 overflow-hidden"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="h-52" style={shimmer} />
        <div className="p-5 space-y-3">
          <div className="h-5 rounded-lg w-3/4" style={shimmer} />
          <div className="h-4 rounded-lg w-1/2" style={shimmer} />
          <div className="flex gap-3 pt-1">
            <div className="h-8 w-16 rounded-lg" style={shimmer} />
            <div className="h-8 w-16 rounded-lg" style={shimmer} />
            <div className="h-8 w-16 rounded-lg" style={shimmer} />
          </div>
          <div className="h-10 rounded-xl mt-2" style={shimmer} />
        </div>
      </div>
    );
  }

  if (type === "text") {
    return (
      <div className="space-y-3">
        <div className="h-7 rounded-lg" style={shimmer} />
        <div className="h-5 rounded-lg" style={shimmer} />
        <div className="h-5 rounded-lg w-3/4" style={shimmer} />
      </div>
    );
  }

  return null;
};

const ShimmerLoader = () => {
  const shimmer = {
    background: "linear-gradient(90deg, #f0ede6 25%, #e8e4da 50%, #f0ede6 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.6s infinite",
  };

  return (
    <div
      className="bg-white rounded-2xl border border-ivory-300 overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="h-52" style={shimmer} />
      <div className="p-5 space-y-3">
        <div className="h-5 rounded-lg w-3/4" style={shimmer} />
        <div className="h-4 rounded-lg w-1/2" style={shimmer} />
        <div className="flex gap-3 pt-1">
          <div className="h-8 w-16 rounded-lg" style={shimmer} />
          <div className="h-8 w-16 rounded-lg" style={shimmer} />
          <div className="h-8 w-16 rounded-lg" style={shimmer} />
        </div>
        <div className="h-10 rounded-xl" style={shimmer} />
      </div>
    </div>
  );
};

export { LoadingSpinner, PremiumLoader, SkeletonLoader, ShimmerLoader };
export default LoadingSpinner;
