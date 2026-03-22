import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools";
import "react-toastify/dist/ReactToastify.css";
import { Suspense, useState, lazy } from "react";
import UserDetailContext from "./context/UserDetailContext";
import Layout from "./components/Layout";
import { useMockAuth } from "./context/MockAuthContext";
import { motion } from "framer-motion";
import { PremiumLoader } from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import SkipToContent from "./components/SkipToContent";
import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "dayjs/locale/en";

// Lazy load routes for code splitting
const Home = lazy(() => import("./pages/Home"));
const Listing = lazy(() => import("./pages/Listing"));
const Property = lazy(() => import("./pages/Property"));
const AddProperty = lazy(() => import("./pages/AddProperty"));
const Favourites = lazy(() => import("./pages/Favourites"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Contact = lazy(() => import("./pages/Contact"));

// Error Component
const ErrorComponent = ({ error }) => (
  <motion.div
    className="min-h-screen flex items-center justify-center"
    style={{ backgroundColor: "#F8F5EF" }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="text-center max-w-md mx-auto px-6">
      <motion.div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
        style={{
          background: "linear-gradient(135deg, #EEF4FB 0%, #FBF0D9 100%)",
          border: "2px solid #EDE9E0",
        }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          className="w-9 h-9"
          style={{ color: "#C9962C" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      </motion.div>
      <h2
        className="text-2xl font-bold mb-3"
        style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A2E" }}
      >
        Authentication Error
      </h2>
      <p className="text-neutral-500 mb-8 leading-relaxed">
        {error.message ||
          "An error occurred during authentication. Please try again."}
      </p>
      <motion.button
        style={{
          background: "#1B3A5C",
          boxShadow: "0 8px 24px rgba(27,58,92,0.25)",
        }}
        className="px-7 py-3 text-white rounded-xl font-semibold transition-all"
        whileHover={{ y: -2, boxShadow: "0 16px 40px rgba(27,58,92,0.35)" }}
        whileTap={{ scale: 0.97 }}
        onClick={() => window.location.reload()}
      >
        Try Again
      </motion.button>
    </div>
  </motion.div>
);

function AppContent() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
        retry: 2,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: false,
      },
    },
  });

  const [userDetails, setUserDetails] = useState({
    favourites: [],
    bookings: [],
    token: null,
  });

  return (
    <ErrorBoundary>
      <MantineProvider>
        <DatesProvider settings={{ firstDayOfWeek: 0 }}>
          <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
            <QueryClientProvider client={queryClient}>
              <BrowserRouter>
                <SkipToContent />
                <ScrollToTop />
                <Suspense fallback={<PremiumLoader />}>
                  <ErrorBoundary>
                    <Routes>
                      <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/listing">
                          <Route index element={<Listing />} />
                          <Route path=":propertyId" element={<Property />} />
                        </Route>
                        <Route path="/addproperty" element={<AddProperty />} />
                        <Route path="/add-property" element={<AddProperty />} />
                        <Route path="/bookings" element={<Bookings />} />
                        <Route path="/favourites" element={<Favourites />} />
                        <Route path="/contact" element={<Contact />} />
                      </Route>
                    </Routes>
                  </ErrorBoundary>
                </Suspense>
              </BrowserRouter>
              <ToastContainer
                position="top-right"
                autoClose={4500}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                toastClassName="rounded-2xl shadow-lg border border-ivory-300 font-sans text-sm"
                progressStyle={{ background: "#C9962C" }}
              />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </UserDetailContext.Provider>
        </DatesProvider>
      </MantineProvider>
    </ErrorBoundary>
  );
}

export default function App() {
  const { isLoading, error } = useMockAuth();

  if (error) {
    return <ErrorComponent error={error} />;
  }

  if (isLoading) {
    return <PremiumLoader />;
  }

  return <AppContent />;
}
