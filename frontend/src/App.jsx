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
import { useAuth0 } from "@auth0/auth0-react";

function AppContent() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
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
            <Suspense fallback={<div>Loading...</div>}>
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
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserDetailContext.Provider>
  )
}

export default function App() {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Authentication Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <AppContent />;
}