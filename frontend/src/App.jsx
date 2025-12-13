import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query"
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from 'react-query/devtools';
import "react-toastify/dist/ReactToastify.css"
import { Suspense, useState, lazy } from "react";
import UserDetailContext from "./context/UserDetailContext";
import Layout from "./components/Layout";
import { useMockAuth } from "./context/MockAuthContext";
import { motion } from 'framer-motion';
import { PremiumLoader } from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';
import SkipToContent from './components/SkipToContent';
import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'dayjs/locale/en';

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
    className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="text-center max-w-md mx-auto px-6">
      <motion.div
        className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-10 h-10 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
      </motion.div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Authentication Error
      </h2>
      <p className="text-gray-600 mb-6">
        {error.message || 'An error occurred during authentication. Please try again.'}
      </p>
      <motion.button
        className="px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-500 text-white rounded-xl font-semibold"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.location.reload()}
      >
        Retry
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
    token: null
  })
  
  return (
    <ErrorBoundary>
      <MantineProvider>
        <DatesProvider settings={{ firstDayOfWeek: 0 }}>
          <UserDetailContext.Provider value={{ userDetails, setUserDetails }} >
            <QueryClientProvider client={queryClient}>
              <BrowserRouter>
                <SkipToContent />
                <ScrollToTop />
                <Suspense fallback={<PremiumLoader />}>
                  <ErrorBoundary>
                    <Routes>
                  <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/listing" >
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
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              toastClassName="rounded-xl shadow-lg"
            />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </UserDetailContext.Provider>
        </DatesProvider>
      </MantineProvider>
    </ErrorBoundary>
  )
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