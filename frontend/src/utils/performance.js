// Performance monitoring and optimization utilities

/**
 * Measure and log performance metrics
 */
export const measurePerformance = () => {
  if (typeof window === 'undefined' || !window.performance) {
    return;
  }

  // Measure page load time
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
    const firstPaint = performance.getEntriesByType('paint').find(
      entry => entry.name === 'first-paint'
    );
    const firstContentfulPaint = performance.getEntriesByType('paint').find(
      entry => entry.name === 'first-contentful-paint'
    );

    if (import.meta.env.DEV) {
      console.log('Performance Metrics:', {
        pageLoadTime: `${pageLoadTime}ms`,
        domReadyTime: `${domReadyTime}ms`,
        firstPaint: firstPaint ? `${Math.round(firstPaint.startTime)}ms` : 'N/A',
        firstContentfulPaint: firstContentfulPaint ? `${Math.round(firstContentfulPaint.startTime)}ms` : 'N/A',
      });
    }

    // Send to analytics in production
    if (import.meta.env.PROD) {
      // Example: Send to analytics service
      // analytics.track('page_performance', { pageLoadTime, domReadyTime });
    }
  });
};

/**
 * Preload critical resources
 */
export const preloadCriticalResources = () => {
  if (typeof document === 'undefined') return;

  const criticalImages = [
    // Add critical images to preload
  ];

  criticalImages.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

/**
 * Lazy load images with Intersection Observer
 */
export const setupLazyLoading = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });

  // Observe all images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img);
  });
};

/**
 * Debounce function for performance optimization
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function for performance optimization
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Register service worker
 */
export const registerServiceWorker = () => {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  if (import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          if (import.meta.env.DEV) {
            console.log('Service Worker registered:', registration);
          }

          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker available
                if (import.meta.env.DEV) {
                  console.log('New service worker available');
                }
              }
            });
          });
        })
        .catch((error) => {
          if (import.meta.env.DEV) {
            console.error('Service Worker registration failed:', error);
          }
        });
    });
  }
};

/**
 * Prefetch routes for faster navigation
 */
export const prefetchRoute = (path) => {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = path;
  link.as = 'document';
  document.head.appendChild(link);
};

/**
 * Initialize all performance optimizations
 */
export const initPerformanceOptimizations = () => {
  measurePerformance();
  registerServiceWorker();
  setupLazyLoading();
  
  // Prefetch common routes
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      prefetchRoute('/listing');
      prefetchRoute('/contact');
    }, 2000); // Prefetch after 2 seconds
  }
};

