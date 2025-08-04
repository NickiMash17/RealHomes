import React, { useContext, useEffect, useRef } from "react";
import UserDetailContext from "../context/UserDetailContext";
import { useQuery } from "react-query";
import { getBookings, getAllProperties } from "../utils/api";
import { useMockAuth } from "../context/MockAuthContext";

const useBookings = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const queryRef = useRef();
  const { user, getAccessTokenSilently } = useMockAuth();

  const { data: bookingIds, isLoading: bookingLoading, isError: bookingError, refetch: bookingRefetch } = useQuery({
    queryKey: "allBookings",
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return getBookings(user?.email, token)
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
