import { motion } from "framer-motion";

/**
 * PropertySkeleton Component
 * Prestige design — ivory/navy shimmer palette
 */
const PropertySkeleton = ({ viewMode = "grid", count = 6 }) => {
  const skeletons = Array.from({ length: count });

  const shimmerStyle = {
    background: "linear-gradient(90deg, #f0ede6 25%, #e8e4da 50%, #f0ede6 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.6s infinite",
  };

  if (viewMode === "list") {
    return (
      <div className="space-y-5">
        {skeletons.map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, ease: "easeOut" }}
            className="bg-white rounded-2xl border border-ivory-300 overflow-hidden"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="flex flex-col sm:flex-row">
              {/* Image skeleton */}
              <div
                className="sm:w-56 lg:w-72 h-52 sm:h-auto flex-shrink-0"
                style={shimmerStyle}
              />

              {/* Content skeleton */}
              <div className="flex-1 p-6 space-y-4">
                {/* Type badge */}
                <div className="h-6 w-20 rounded-full" style={shimmerStyle} />

                {/* Title */}
                <div className="h-6 rounded-lg w-3/4" style={shimmerStyle} />

                {/* Location */}
                <div className="h-4 rounded-lg w-1/2" style={shimmerStyle} />

                {/* Price */}
                <div className="h-8 rounded-lg w-1/3" style={shimmerStyle} />

                {/* Amenities */}
                <div className="flex gap-4 pt-2">
                  <div className="h-9 w-20 rounded-lg" style={shimmerStyle} />
                  <div className="h-9 w-20 rounded-lg" style={shimmerStyle} />
                  <div className="h-9 w-20 rounded-lg" style={shimmerStyle} />
                </div>

                {/* CTA */}
                <div
                  className="h-10 rounded-xl w-36 mt-2"
                  style={shimmerStyle}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // ── Grid View ────────────────────────────────────────────────────────────
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {skeletons.map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.06, ease: "easeOut" }}
          className="bg-white rounded-2xl border border-ivory-300 overflow-hidden"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          {/* Image skeleton */}
          <div className="relative" style={{ aspectRatio: "4/3" }}>
            <div className="absolute inset-0" style={shimmerStyle} />

            {/* Simulated type badge */}
            <div
              className="absolute top-3 left-3 h-6 w-20 rounded-full"
              style={{
                background: "rgba(27,58,92,0.12)",
              }}
            />

            {/* Simulated action buttons */}
            <div className="absolute top-3 right-3 flex gap-1.5">
              <div
                className="w-8 h-8 rounded-full"
                style={{ background: "rgba(27,58,92,0.12)" }}
              />
              <div
                className="w-8 h-8 rounded-full"
                style={{ background: "rgba(27,58,92,0.12)" }}
              />
            </div>

            {/* Simulated price pill */}
            <div className="absolute bottom-3 left-3">
              <div
                className="h-8 w-28 rounded-xl"
                style={{ background: "rgba(27,58,92,0.12)" }}
              />
            </div>
          </div>

          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            {/* Title */}
            <div className="h-5 rounded-lg w-5/6" style={shimmerStyle} />

            {/* Location */}
            <div className="h-4 rounded-lg w-3/5" style={shimmerStyle} />

            {/* Divider */}
            <div className="border-t pt-3" style={{ borderColor: "#EDE9E0" }}>
              {/* Amenities */}
              <div className="flex items-center justify-between">
                <div className="h-8 w-14 rounded-lg" style={shimmerStyle} />
                <div className="h-8 w-14 rounded-lg" style={shimmerStyle} />
                <div className="h-8 w-14 rounded-lg" style={shimmerStyle} />
              </div>
            </div>

            {/* CTA button */}
            <div className="h-10 rounded-xl w-full" style={shimmerStyle} />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PropertySkeleton;
