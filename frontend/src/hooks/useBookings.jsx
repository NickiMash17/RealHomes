import React, { useContext, useEffect, useRef } from "react";
import UserDetailContext from "../context/UserDetailContext";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllBookings, getAllProperties } from "../utils/api";

const useBookings = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const queryRef = useRef();
  const { user, getAccessTokenSilently } = useAuth0();

  const { data: bookingIds, isLoading: bookingLoading, isError: bookingError, refetch: bookingRefetch } = useQuery({
    queryKey: "allBookings",
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return getAllBookings(user?.email, token)
    },
    onSuccess: (data) =>
      setUserDetails((prev) => ({ ...prev, bookings: data })),
    enabled: user !== undefined,
    staleTime: 30000,
  });

  const { data: allProperties, isLoading: propertiesLoading } = useQuery({
    queryKey: "allProperties",
    queryFn: () => getAllProperties(),
    staleTime: 30000
  });

  // Filter properties to only show booked ones
  const bookedProperties = allProperties?.filter(property => 
    bookingIds?.includes(property.id)
  ) || [];

  queryRef.current = bookingRefetch;

  useEffect(() => {
    queryRef.current && queryRef.current();
  }, [userDetails?.token]);
  
  return { 
    data: bookedProperties, 
    isError: bookingError, 
    isLoading: bookingLoading || propertiesLoading, 
    refetch: bookingRefetch 
  };
};

export default useBookings;
