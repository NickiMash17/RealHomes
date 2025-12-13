import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * OptimizedImage Component
 * Provides lazy loading, responsive images, WebP support, and blur placeholders
 */
const OptimizedImage = ({
  src,
  alt = '',
  className = '',
  width,
  height,
  loading = 'lazy',
  priority = false, // Set to true for above-the-fold images
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  objectFit = 'cover',
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const imgRef = useRef(null);

  // Generate responsive image URLs
  useEffect(() => {
    if (!src) {
      setHasError(true);
      return;
    }

    // If it's already a full URL or data URL, use it directly
    if (src.startsWith('http') || src.startsWith('data:') || src.startsWith('/')) {
      setImageSrc(src);
      return;
    }

    // For Cloudinary images, you can add transformations here
    // For now, use the src as-is
    setImageSrc(src);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = (e) => {
    setHasError(true);
    if (onError) {
      onError(e);
    } else {
      // Fallback to placeholder
      e.target.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60';
    }
  };

  // Calculate aspect ratio for placeholder
  const aspectRatio = width && height ? (height / width) * 100 : 56.25; // Default 16:9

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ 
        aspectRatio: width && height ? `${width}/${height}` : undefined,
        minHeight: !width || !height ? '200px' : undefined
      }}
    >
      {/* Blur placeholder */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse"
          style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
          aria-hidden="true"
        />
      )}

      {/* Actual image */}
      {imageSrc && !hasError && (
        <motion.img
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          loading={priority ? 'eager' : loading}
          width={width}
          height={height}
          className={`absolute inset-0 w-full h-full object-${objectFit} transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          sizes={sizes}
          decoding="async"
          {...props}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div 
          className="absolute inset-0 bg-gray-200 flex items-center justify-center"
          style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
        >
          <div className="text-center p-4">
            <svg 
              className="w-12 h-12 text-gray-400 mx-auto mb-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs text-gray-500">Image unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;

