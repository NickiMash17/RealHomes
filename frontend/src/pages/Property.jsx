import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import Map from "../components/Map";
import { getProperty, removeBooking } from "../utils/api";
import useAuthCheck from "../hooks/useAuthCheck";
import { useMockAuth } from '../context/MockAuthContext'
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
import { FaLocationDot, FaArrowLeft, FaShare, FaStar } from "react-icons/fa";
import { CgRuler } from "react-icons/cg";
import HeartBtn from "../components/HeartBtn";

const Property = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const id = pathname.split("/").slice(-1)[0];
  const { data, isLoading, isError, error } = useQuery(["resd", id], () =>
    getProperty(id)
  );
  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const { user } = useMockAuth();

  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(UserDetailContext);

  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id),
      }));
      toast.success("Booking cancelled", { position: "bottom-right" });
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: data?.title,
          text: `Check out this property: ${data?.title}`,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!", { position: "bottom-right" });
    }
  };

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
            {error?.message || "The property you're looking for doesn't exist or has been removed."}
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

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white pt-24 pb-16">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">🏠</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Property Data</h2>
          <p className="text-gray-600 mb-6">Unable to load property information.</p>
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

  const isBooked = bookings?.some((booking) => booking.id === id);
  const bookingDate = bookings?.find((booking) => booking?.id === id)?.date;

  return (
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
          <img
            src={data?.image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80"}
            alt={data?.title || "Property"}
            className="w-full h-64 sm:h-80 lg:h-[500px] object-cover"
            loading="eager"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80";
            }}
          />
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleShare}
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all hover:scale-110"
              aria-label="Share property"
            >
              <FaShare className="w-5 h-5 text-gray-700" />
            </button>
            <div className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
              <HeartBtn id={id} />
            </div>
          </div>
          {/* Featured Badge */}
          {data?.featured && (
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
                <FaLocationDot className="text-amber-500" />
                <span>{data?.city || 'Unknown'}, {data?.country || 'South Africa'}</span>
              </div>

              {/* Title and Price */}
              <div className="mb-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                  {data?.title || 'Property'}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="text-3xl sm:text-4xl font-bold text-amber-600">
                    {formatPrice(data?.price || 0)}
                  </div>
                  {data?.rating && (
                    <div className="flex items-center gap-1 px-3 py-1 bg-amber-50 rounded-full">
                      <FaStar className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-semibold text-gray-900">{data.rating}</span>
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
                    <div className="text-2xl font-bold text-gray-900">{data?.facilities?.bedrooms || 0}</div>
                    <div className="text-xs text-gray-600">Bedrooms</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-50 rounded-lg">
                    <MdOutlineBathtub className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{data?.facilities?.bathrooms || 0}</div>
                    <div className="text-xs text-gray-600">Bathrooms</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-50 rounded-lg">
                    <MdOutlineGarage className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{data?.facilities?.parkings || 0}</div>
                    <div className="text-xs text-gray-600">Parking</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-50 rounded-lg">
                    <CgRuler className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{data?.facilities?.area || 'N/A'}</div>
                    <div className="text-xs text-gray-600">Area (m²)</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-600 leading-relaxed text-base">
                  {data?.description || 'No description available for this property.'}
                </p>
              </div>

              {/* Address */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Address</h2>
                <div className="flex items-start gap-3 text-gray-600 bg-gray-50 p-4 rounded-lg">
                  <FaLocationDot className="text-amber-500 mt-1 flex-shrink-0" />
                  <p className="text-base">
                    {data?.address || 'Address not specified'}, {data?.city || ''}, {data?.country || 'South Africa'}
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
              <Map
                address={data?.address}
                city={data?.city}
                country={data?.country}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Property;
