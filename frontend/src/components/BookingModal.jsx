import React, { useState } from "react";
import { Modal, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMutation, useQueryClient } from "react-query";
import { useMockAuth } from '../context/MockAuthContext'
import { bookVisit } from "../utils/api";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const BookingModal = ({ opened, setOpened, email, propertyId }) => {
  const [value, setValue] = useState(null);
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useMockAuth()

  const handleBookingSuccess = () => {
    toast.success("You have successfully booked visit", {
      position: "bottom-right",
    });
    // Refresh bookings data
    queryClient.invalidateQueries(["bookings", email]);
    setOpened(false);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const token = await getAccessTokenSilently()
      return bookVisit(value, propertyId, email, token)
    },
    onSuccess: () => handleBookingSuccess(),
    onError: (error) => toast.error(error?.response?.data?.message || error?.message || "Something went wrong"),
  });

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Select your date of visit"
      centered
    >
      <div className="flexCenter flex-col gap-4">
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />
        <Button disabled={!value || isLoading} onClick={() => mutate()}>
          Book visit
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
