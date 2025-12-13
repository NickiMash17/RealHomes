/**
 * Centralized error handling utility
 * Can be extended with Sentry or other error tracking services
 */

class ErrorHandler {
  constructor() {
    this.isProduction = import.meta.env.PROD;
    this.sentryEnabled = false; // Set to true when Sentry is configured
  }

  /**
   * Initialize error tracking (e.g., Sentry)
   */
  init() {
    // Placeholder for Sentry initialization
    // if (import.meta.env.VITE_SENTRY_DSN) {
    //   Sentry.init({...});
    //   this.sentryEnabled = true;
    // }
  }

  /**
   * Log error with context
   */
  logError(error, context = {}) {
    const errorInfo = {
      message: error?.message || 'Unknown error',
      stack: error?.stack,
      context,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    // Log to console in development
    if (!this.isProduction) {
      console.error('Error logged:', errorInfo);
    }

    // Send to error tracking service (Sentry, etc.)
    if (this.sentryEnabled) {
      // Sentry.captureException(error, { extra: context });
    }

    return errorInfo;
  }

  /**
   * Log API error
   */
  logApiError(error, endpoint, requestData = {}) {
    const errorInfo = {
      type: 'API_ERROR',
      endpoint,
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      data: error?.response?.data,
      requestData,
      message: error?.message,
      timestamp: new Date().toISOString(),
    };

    if (!this.isProduction) {
      console.error('API Error:', errorInfo);
    }

    if (this.sentryEnabled) {
      // Sentry.captureException(error, {
      //   tags: { type: 'api_error', endpoint },
      //   extra: requestData,
      // });
    }

    return errorInfo;
  }

  /**
   * Log user action for analytics
   */
  logUserAction(action, data = {}) {
    const actionInfo = {
      action,
      data,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    };

    if (!this.isProduction) {
      console.log('User action:', actionInfo);
    }

    // Send to analytics service
    // analytics.track(action, data);
  }
}

// Export singleton instance
export const errorHandler = new ErrorHandler();

// Initialize on import
errorHandler.init();

