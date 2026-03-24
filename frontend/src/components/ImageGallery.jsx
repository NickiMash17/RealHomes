import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import OptimizedImage from "./OptimizedImage";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const ImageGallery = ({ images = [] }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[4/3] bg-ivory-200 rounded-2xl flex items-center justify-center">
        <p className="text-neutral-500">No images available</p>
      </div>
    );
  }

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-ivory-200 shadow-lg">
      {/* Main Image with Swipe Gestures */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          className="absolute inset-0 w-full h-full"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
          <OptimizedImage
            src={images[imageIndex]}
            alt={`Property image ${imageIndex + 1}`}
            className="w-full h-full"
            objectFit="cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <motion.button
            onClick={() => paginate(-1)}
            className="absolute top-1/2 left-3 z-10 -translate-y-1/2 p-2.5 rounded-full bg-white/70 backdrop-blur-sm text-charcoal-900 hover:bg-white transition-all shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous image"
          >
            <FaChevronLeft className="w-4 h-4" />
          </motion.button>

          <motion.button
            onClick={() => paginate(1)}
            className="absolute top-1/2 right-3 z-10 -translate-y-1/2 p-2.5 rounded-full bg-white/70 backdrop-blur-sm text-charcoal-900 hover:bg-white transition-all shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next image"
          >
            <FaChevronRight className="w-4 h-4" />
          </motion.button>
        </>
      )}

      {/* Pagination Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === imageIndex
                  ? "bg-white scale-125 shadow-md"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;