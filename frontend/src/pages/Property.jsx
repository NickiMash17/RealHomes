import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import Map from "../components/Map";
import { getProperty, removeBooking } from "../utils/api";
import useAuthCheck from "../hooks/useAuthCheck";
import { useMockAuth } from '../context/MockAuthContext'
import BookingModal from "../components/BookingModal";
import UserDetailContext from "../context/UserDetailContext";
import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import {
  MdOutlineBed,
  MdOutlineBathtub,
  MdOutlineGarage,
} from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { CgRuler } from "react-icons/cg";
import HeartBtn from "../components/HeartBtn";

const Property = () => {
  const { pathname } = useLocation();
  // console.log(pathname);
  const id = pathname.split("/").slice(-1)[0];
  // console.log(id)
  const { data, isLoading, isError } = useQuery(["resd", id], () =>
    getProperty(id)
  );
  // console.log(data)
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

  if (isLoading) {
    return (
      <div className="h-64 flexCenter">
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#555"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <span>Error while fetching data</span>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <section className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Image Section */}
        <div className="mb-6 sm:mb-8 relative rounded-xl overflow-hidden shadow-lg">
          <img
            src={data?.image}
            alt={data?.title}
            className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            loading="eager"
          />
          {/* Like button */}
          <div className="absolute top-4 right-4">
            <HeartBtn id={id}/>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left side - Property Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8">
              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                <FaLocationDot className="text-amber-500" />
                <span>{data?.city}, {data?.country}</span>
              </div>

              {/* Title and Price */}
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  {data?.title}
                </h1>
                <div className="text-3xl sm:text-4xl font-bold text-amber-600">
                  {formatPrice(data?.price || 0)}
                </div>
              </div>

              {/* Property Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-gray-200 mb-6">
                <div className="flex items-center gap-2">
                  <MdOutlineBed className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-lg font-bold text-gray-900">{data?.facilities?.bedrooms || 0}</div>
                    <div className="text-xs text-gray-600">Bedrooms</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MdOutlineBathtub className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-lg font-bold text-gray-900">{data?.facilities?.bathrooms || 0}</div>
                    <div className="text-xs text-gray-600">Bathrooms</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MdOutlineGarage className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-lg font-bold text-gray-900">{data?.facilities?.parkings || 0}</div>
                    <div className="text-xs text-gray-600">Parking</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CgRuler className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-lg font-bold text-gray-900">{data?.facilities?.area || 'N/A'}</div>
                    <div className="text-xs text-gray-600">Area (m²)</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">{data?.description}</p>
              </div>

              {/* Address */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Address</h2>
                <div className="flex items-start gap-2 text-gray-600">
                  <FaLocationDot className="text-amber-500 mt-1 flex-shrink-0" />
                  <p>{data?.address}, {data?.city}, {data?.country}</p>
                </div>
              </div>

              {/* Booking Section */}
              <div className="pt-6 border-t border-gray-200">
                {bookings?.map((booking) => booking.id).includes(id) ? (
                  <div>
                    <Button
                      onClick={() => cancelBooking()}
                      variant="outline"
                      w={"100%"}
                      color="red"
                      disabled={cancelling}
                      size="lg"
                    >
                      Cancel booking
                    </Button>
                    <p className="text-red-500 text-sm mt-3 text-center">
                      You've already booked a visit for{" "}
                      {bookings?.filter((booking) => booking?.id === id)[0].date}
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      validateLogin() && setModalOpened(true);
                    }}
                    className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
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
            </div>
          </div>

          {/* Right side - Map */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
              <Map
                address={data?.address}
                city={data?.city}
                country={data?.country}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Property;
