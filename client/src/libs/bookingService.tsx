import { IBooking } from "@/models/booking.model";
import axios from "axios";
import { getSession } from "next-auth/react";

async function getAllBookings() {
  const session = await getSession();
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${session?.user.token}`,
    },
  };
  const res = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/bookings",
    config,
  );
  if (!res) {
    throw new Error("Failed to get bookings");
  }
  return (await res.data.data) as IBooking[];
}

async function getBookingsForHotel(hotelId: string) {
  const session = await getSession();
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${session?.user.token}`,
    },
  };
  const res = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + `/hotels/${hotelId}/bookings`,
    config,
  );
  if (!res) {
    throw new Error("Failed to get bookings for a hotel");
  }
  return res.data;
}

async function getBooking(bookingId: string) {
  const session = await getSession();
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${session?.user.token}`,
    },
  };
  const res = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + `/bookings/${bookingId}`,
    config,
  );
  if (!res) {
    throw new Error("Failed to get booking");
  }
  return res.data;
}

async function createNewBooking(
  bookingDate: Date,
  checkoutDate: Date,
  hotelId: string,
) {
  const session = await getSession();
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${session?.user.token}`,
    },
  };
  const res = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + `/hotels/${hotelId}/bookings`,
    { bookingDate, checkoutDate },
    config,
  );
  if (!res) {
    throw new Error("Failed to create booking");
  }
  return res.data;
}

async function updateBooking(
  bookingDate: Date,
  checkoutDate: Date,
  bookingId: string,
) {
  const session = await getSession();
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${session?.user.token}`,
    },
  };
  const res = await axios.put(
    process.env.NEXT_PUBLIC_API_URL + `/bookings/${bookingId}`,
    { bookingDate, checkoutDate },
    config,
  );
  if (!res) {
    throw new Error("Failed to update booking");
  }
  return await res.data;
}

async function deleteBooking(bookingId: string) {
  const session = await getSession();
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${session?.user.token}`,
    },
  };
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_API_URL + `/bookings/${bookingId}`,
    config,
  );
  if (!res) {
    throw new Error("Failed to delete booking");
  }
  return res.data;
}

const bookingService = {
  getAllBookings,
  getBookingsForHotel,
  getBooking,
  createNewBooking,
  updateBooking,
  deleteBooking,
};
export default bookingService;
