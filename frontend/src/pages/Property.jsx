import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import Map from "../components/Map";
import { getProperty, removeBooking } from "../utils/api";
import useAuthCheck from "../hooks/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
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
  const { user } = useAuth0();

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

  return (
    <section className="max-padd-container my-[99px]">
      <div className="pb-2 relative">
        <img
          src={data?.image}
          alt={data?.title}
          className="rounded-xl max-h-[27rem] self-center w-full object-cover"
        />
        {/* like btn */}
        <div className="absolute top-8 right-8">
          <HeartBtn id={id}/>
        </div>
      </div>
      {/* container */}
      <div className="xl:flexBetween gap-8">
        {/* left side */}
        <div className="flex-1 rounded-2xl bg-white p-2">
          <h5 className="bold-16 my-1 text-secondary">{data?.city}</h5>
          <div className="flexBetween">
            <h4 className="medium-18">{data?.title}</h4>
            <div className="bold-20">${data?.price}.00</div>
          </div>
          {/* info */}
          <div className="flex gap-x-4 py-2">
            <div className="flexCenter gap-x-2 border-r-2 border-gray-900/80 pr-4 font-[500]">
              <MdOutlineBed /> {data?.facilities.bedrooms}
            </div>
            <div className="flexCenter gap-x-2 border-r-2 border-gray-900/80 pr-4 font-[500]">
              <MdOutlineBathtub /> {data?.facilities.bathrooms}
            </div>
            <div className="flexCenter gap-x-2 border-r-2 border-gray-900/80 pr-4 font-[500]">
              <MdOutlineGarage /> {data?.facilities.parkings}
            </div>
            <div className="flexCenter gap-x-2 border-r-2 border-gray-900/80 pr-4 font-[500]">
              <CgRuler /> 400
            </div>
          </div>
          <p className="pt-2 mb-4">{data?.description}</p>
          <div className="flexStart gap-x-2 my-5">
            <FaLocationDot />
            <div>
              {data?.address} {data?.city} {data?.country}
            </div>
          </div>
          <div>
            {bookings?.map((booking) => booking.id).includes(id) ? (
              <>
                <Button
                  onClick={() => cancelBooking()}
                  variant="outline"
                  w={"100%"}
                  color="red"
                  disabled={cancelling}
                >
                  Cancel booking
                </Button>
                <p className="text-red-500 medium-15 mt-3">
                  You've Already booked visit for{" "}
                  {bookings?.filter((booking) => booking?.id === id)[0].date}
                </p>
              </>
            ) : (
              <button
                onClick={() => {
                  validateLogin() && setModalOpened(true);
                }}
                className="btn-secondary rounded-xl !px-5 !py-[7px] shadow-sm"
              >
                Book the visit
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
        {/* right side */}
        <div className="flex-1">
          <Map
            address={data?.address}
            city={data?.city}
            country={data?.country}
          />
        </div>
      </div>
    </section>
  );
};

export default Property;
