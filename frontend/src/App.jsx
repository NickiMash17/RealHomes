import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Listing from "./pages/Listing";
import AddProperty from "./pages/AddProperty";
import { QueryClient, QueryClientProvider } from "react-query"
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from 'react-query/devtools';
import "react-toastify/dist/ReactToastify.css"
import Property from "./pages/Property";
import { Suspense, useState, useEffect } from "react";
import UserDetailContext from "./context/UserDetailContext";
import Layout from "./components/Layout";
import Favourites from "./pages/Favourites";
import Bookings from "./pages/Bookings";
import Contact from "./pages/Contact";
import { useMockAuth } from "./context/MockAuthContext";
import { motion, AnimatePresence } from 'framer-motion';
import { PremiumLoader } from './components/LoadingSpinner';

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
  console.log("AppContent is rendering"); // Debug log
  
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
    },
  });
  
  const [userDetails, setUserDetails] = useState({
    favourites: [],
    bookings: [],
    token: null
  })

  // Clear cache on app load
  useEffect(() => {
    console.log("AppContent useEffect running"); // Debug log
    // Clear any cached data
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }
  }, []);
  
  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }} >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<PremiumLoader />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/listing" >
                  <Route index element={<Listing />} />
                  <Route path=":propertyId" element={<Property />} />
                </Route>
                <Route path="/addproperty" element={<AddProperty />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/favourites" element={<Favourites />} />
                <Route path="/contact" element={<Contact />} />
              </Route>
            </Routes>
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
  )
}

export default function App() {
  console.log("App component is rendering"); // Debug log
  
  const { isLoading, error } = useMockAuth();

  if (error) {
    console.log("Auth error:", error); // Debug log
    return <ErrorComponent error={error} />;
  }

  if (isLoading) {
    console.log("Auth is loading"); // Debug log
    return <PremiumLoader />;
  }

  console.log("App rendering normally"); // Debug log

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AppContent />
      </motion.div>
    </AnimatePresence>
  );
}