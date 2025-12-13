import React, { useContext, useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import Map from "../components/Map";
import { getProperty, removeBooking } from "../utils/api";
import useAuthCheck from "../hooks/useAuthCheck";
import { useMockAuth } from '../context/MockAuthContext'
import { useRecentlyViewed } from '../hooks/useRecentlyViewed'
import BookingModal from "../components/BookingModal";
import UserDetailContext from "../context/UserDetailContext";
import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  MdOutlineBed,
  MdOutlineBathtub,
  MdOutlineGarage,
} from "react-icons/md";
import { FaMapMarkerAlt, FaArrowLeft, FaShare, FaStar, FaWhatsapp, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { CgRuler } from "react-icons/cg";
import HeartBtn from "../components/HeartBtn";
import SEO from "../components/SEO";
import OptimizedImage from "../components/OptimizedImage";
import { shareProperty, shareViaWhatsApp, shareViaEmail, shareViaFacebook, shareViaTwitter, shareViaLinkedIn } from "../utils/shareProperty";
import { errorHandler } from "../utils/errorHandler";

const Property = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const id = pathname.split("/").slice(-1)[0];
  
  // Validate ID before making query
  const isValidId = id && id !== 'listing' && id !== '';
  
  const { data, isLoading, isError, error } = useQuery(
    ["resd", id], 
    () => getProperty(id),
    {
      enabled: isValidId, // Only run query if ID is valid
      retry: 2,
      retryDelay: 1000,
      onError: (err) => {
        if (import.meta.env.DEV) {
          console.error('Property fetch error:', err);
        }
      }
    }
  );
  const [modalOpened, setModalOpened] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const { validateLogin } = useAuthCheck();
  const { user } = useMockAuth();
  const { addToRecentlyViewed } = useRecentlyViewed();

  const userDetailContext = useContext(UserDetailContext);
  const token = userDetailContext?.userDetails?.token || null;
  const bookings = userDetailContext?.userDetails?.bookings || [];
  const setUserDetails = userDetailContext?.setUserDetails || (() => {});

  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => {
      if (!id || !user?.email || !token) {
        throw new Error('Missing required information to cancel booking');
      }
      return removeBooking(id, user.email, token);
    },
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings?.filter((booking) => {
          const bookingId = booking?.id || booking?.propertyId || booking?._id;
          return bookingId !== id && String(bookingId) !== String(id);
        }) || [],
      }));
      toast.success("Booking cancelled", { position: "bottom-right" });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to cancel booking. Please try again.", { position: "bottom-right" });
    },
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Handle invalid ID
  if (!isValidId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white pt-24 pb-16">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid Property ID</h2>
          <p className="text-gray-600 mb-6">
            The property ID is missing or invalid. Please select a property from the listings.
          </p>
          <button
            onClick={() => navigate('/listing')}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
          >
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <PuffLoader
            height="80"
            width="80"
            radius={1}
            color="#f59e0b"
            aria-label="puff-loading"
          />
          <p className="mt-4 text-gray-600 font-medium">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white pt-24 pb-16">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <p className="text-gray-600 mb-6">
            {error?.message || error?.response?.data?.message || "The property you're looking for doesn't exist or has been removed."}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/listing')}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Back to Listings
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Safely check if data exists and has required fields
  if (!data || (!data.id && !data._id)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white pt-24 pb-16">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">🏠</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Property Data</h2>
          <p className="text-gray-600 mb-6">
            Unable to load property information. The property may not exist or the data is incomplete.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/listing')}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Back to Listings
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Safely check bookings
  const isBooked = bookings?.some((booking) => {
    const bookingId = booking?.id || booking?.propertyId || booking?._id;
    return bookingId === id || String(bookingId) === String(id);
  });
  const bookingDate = bookings?.find((booking) => {
    const bookingId = booking?.id || booking?.propertyId || booking?._id;
    return bookingId === id || String(bookingId) === String(id);
  })?.date;

  // Safely access data with fallbacks
  const propertyData = data || {};
  const propertyId = propertyData.id || propertyData._id || id;
  const propertyTitle = propertyData.title || 'Property';
  const propertyPrice = propertyData.price || 0;
  const propertyImage = propertyData.image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80";
  const propertyDescription = propertyData.description || 'No description available for this property.';
  const propertyCity = propertyData.city || 'Unknown';
  const propertyCountry = propertyData.country || 'South Africa';
  const propertyAddress = propertyData.address || 'Address not specified';
  const propertyRating = propertyData.rating || null;
  const propertyFacilities = propertyData.facilities || {};
  const isFeatured = propertyData.featured || false;

  // Track property view
  useEffect(() => {
    if (data && propertyId) {
      addToRecentlyViewed(data);
      errorHandler.logUserAction('property_view', { propertyId, title: propertyTitle });
    }
  }, [data, propertyId, propertyTitle, addToRecentlyViewed]);

  const handleShare = async (method = 'native') => {
    try {
      const property = {
        id: propertyId,
        title: propertyTitle,
        description: propertyDescription,
        image: propertyImage,
        address: propertyAddress,
        city: propertyCity,
      };

      let result;
      switch (method) {
        case 'whatsapp':
          shareViaWhatsApp(property);
          toast.success("Opening WhatsApp...", { position: "bottom-right" });
          break;
        case 'email':
          shareViaEmail(property);
          break;
        case 'facebook':
          shareViaFacebook(property);
          break;
        case 'twitter':
          shareViaTwitter(property);
          break;
        case 'linkedin':
          shareViaLinkedIn(property);
          break;
        default:
          result = await shareProperty(property);
          if (result.success && result.method === 'clipboard') {
            toast.success(result.message || "Link copied to clipboard!", { position: "bottom-right" });
          }
      }
      
      setShowShareMenu(false);
      errorHandler.logUserAction('property_share', { propertyId, method });
    } catch (err) {
      errorHandler.logError(err, { action: 'share_property', propertyId });
      if (err.name !== 'AbortError') {
        toast.error("Failed to share property", { position: "bottom-right" });
      }
    }
  };

  // SEO data for property page
  const seoTitle = `${propertyTitle} - RealHomes`;
  const seoDescription = propertyDescription.length > 160 
    ? propertyDescription.substring(0, 157) + '...' 
    : propertyDescription;

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        image={propertyImage}
        type="article"
        property={propertyData}
        keywords={`${propertyTitle}, ${propertyCity}, ${propertyCountry}, real estate, property for sale`}
      />
      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/listing')}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
        >
          <FaArrowLeft className="w-4 h-4" />
          Back to Listings
        </motion.button>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8 relative rounded-xl overflow-hidden shadow-xl"
        >
          <OptimizedImage
            src={propertyImage}
            alt={propertyTitle}
            className="w-full h-64 sm:h-80 lg:h-[500px]"
            width={1200}
            height={500}
            loading="eager"
            priority={true}
            objectFit="cover"
          />
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all hover:scale-110"
                aria-label="Share property"
              >
                <FaShare className="w-5 h-5 text-gray-700" />
              </button>
              
              {/* Share Menu Dropdown */}
              {showShareMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowShareMenu(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-2xl p-2 min-w-[200px] z-50 border border-gray-100"
                  >
                    <button
                      onClick={() => handleShare('native')}
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-3 transition-colors"
                    >
                      <FaShare className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium">Share</span>
                    </button>
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-3 transition-colors"
                    >
                      <FaWhatsapp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">WhatsApp</span>
                    </button>
                    <button
                      onClick={() => handleShare('email')}
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-3 transition-colors"
                    >
                      <FaEnvelope className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium">Email</span>
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-3 transition-colors"
                    >
                      <FaFacebook className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">Facebook</span>
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-3 transition-colors"
                    >
                      <FaTwitter className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium">Twitter</span>
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-3 transition-colors"
                    >
                      <FaLinkedin className="w-4 h-4 text-blue-700" />
                      <span className="text-sm font-medium">LinkedIn</span>
                    </button>
                  </motion.div>
                </>
              )}
            </div>
            <div className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
              <HeartBtn id={id} />
            </div>
          </div>
          {/* Featured Badge */}
          {isFeatured && (
            <div className="absolute top-4 left-4">
              <span className="px-4 py-2 bg-amber-500 text-white rounded-full text-sm font-semibold shadow-lg">
                ⭐ Featured
              </span>
            </div>
          )}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left side - Property Details */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
            >
              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                <FaMapMarkerAlt className="text-amber-500" />
                <span>{propertyCity}, {propertyCountry}</span>
              </div>

              {/* Title and Price */}
              <div className="mb-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                  {propertyTitle}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="text-3xl sm:text-4xl font-bold text-amber-600">
                    {formatPrice(propertyPrice)}
                  </div>
                  {propertyRating && (
                    <div className="flex items-center gap-1 px-3 py-1 bg-amber-50 rounded-full">
                      <FaStar className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-semibold text-gray-900">{propertyRating}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Property Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-gray-200 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-50 rounded-lg">
                    <MdOutlineBed className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{propertyFacilities.bedrooms || 0}</div>
                    <div className="text-xs text-gray-600">Bedrooms</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-50 rounded-lg">
                    <MdOutlineBathtub className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{propertyFacilities.bathrooms || 0}</div>
                    <div className="text-xs text-gray-600">Bathrooms</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-50 rounded-lg">
                    <MdOutlineGarage className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{propertyFacilities.parkings || 0}</div>
                    <div className="text-xs text-gray-600">Parking</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-50 rounded-lg">
                    <CgRuler className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{propertyFacilities.area || 'N/A'}</div>
                    <div className="text-xs text-gray-600">Area (m²)</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-600 leading-relaxed text-base">
                  {propertyDescription}
                </p>
              </div>

              {/* Address */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Address</h2>
                <div className="flex items-start gap-3 text-gray-600 bg-gray-50 p-4 rounded-lg">
                  <FaMapMarkerAlt className="text-amber-500 mt-1 flex-shrink-0" />
                  <p className="text-base">
                    {propertyAddress}, {propertyCity}, {propertyCountry}
                  </p>
                </div>
              </div>

              {/* Booking Section */}
              <div className="pt-6 border-t border-gray-200">
                {isBooked ? (
                  <div className="space-y-4">
                    <Button
                      onClick={() => cancelBooking()}
                      variant="outline"
                      w={"100%"}
                      color="red"
                      disabled={cancelling}
                      size="lg"
                    >
                      {cancelling ? "Cancelling..." : "Cancel Booking"}
                    </Button>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                      <p className="text-red-700 font-medium">
                        You've already booked a visit for{" "}
                        <span className="font-bold">{bookingDate || 'a future date'}</span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      if (validateLogin()) {
                        setModalOpened(true);
                      }
                    }}
                    className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 text-lg hover:scale-105"
                  >
                    Book a Visit
                  </button>
                )}
                <BookingModal
                  opened={modalOpened}
                  setOpened={setModalOpened}
                  propertyId={id}
                  email={user?.email}
                />
              </div>
            </motion.div>
          </div>

          {/* Right side - Map */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-24"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                <Map
                  address={propertyAddress}
                  city={propertyCity}
                  country={propertyCountry}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Property;
