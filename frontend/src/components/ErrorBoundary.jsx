import React from "react";
import { motion } from "framer-motion";
import { FaExclamationTriangle, FaHome, FaRedo } from "react-icons/fa";
import { errorHandler } from "../utils/errorHandler";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    errorHandler.logError(error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex items-center justify-center p-4"
          style={{ backgroundColor: "#F8F5EF" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-lg w-full bg-white rounded-3xl p-10 text-center"
            style={{
              boxShadow:
                "0 24px 56px rgba(27,58,92,0.14), 0 8px 16px rgba(0,0,0,0.06)",
              border: "1px solid #EDE9E0",
            }}
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="flex justify-center mb-7"
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #EEF4FB 0%, #FBF0D9 100%)",
                  border: "2px solid #EDE9E0",
                }}
              >
                <FaExclamationTriangle
                  className="text-3xl"
                  style={{ color: "#C9962C" }}
                />
              </div>
            </motion.div>

            {/* Heading */}
            <h1
              className="text-3xl font-bold mb-3"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#1A1A2E",
              }}
            >
              Something Went Wrong
            </h1>

            {/* Body */}
            <p className="text-neutral-500 mb-8 leading-relaxed">
              We're sorry — something unexpected happened. Please try refreshing
              the page or return to the home page.
            </p>

            {/* Dev error details */}
            {import.meta.env.DEV && this.state.error && (
              <details
                className="mb-7 text-left rounded-xl overflow-auto max-h-52 text-xs"
                style={{
                  background: "#F8F5EF",
                  border: "1px solid #EDE9E0",
                  padding: "1rem",
                }}
              >
                <summary
                  className="cursor-pointer font-semibold mb-2"
                  style={{ color: "#374151" }}
                >
                  Error Details (Dev Only)
                </summary>
                <pre style={{ color: "#DC2626", whiteSpace: "pre-wrap" }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                onClick={this.handleReset}
                whileHover={{
                  y: -2,
                  boxShadow: "0 16px 40px rgba(27,58,92,0.35)",
                }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all"
                style={{
                  background: "#1B3A5C",
                  boxShadow: "0 8px 24px rgba(27,58,92,0.25)",
                }}
              >
                <FaRedo className="w-4 h-4" />
                Refresh Page
              </motion.button>

              <motion.button
                onClick={() => (window.location.href = "/")}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all"
                style={{
                  background: "transparent",
                  border: "2px solid #1B3A5C",
                  color: "#1B3A5C",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1B3A5C";
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#1B3A5C";
                }}
              >
                <FaHome className="w-4 h-4" />
                Go Home
              </motion.button>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
