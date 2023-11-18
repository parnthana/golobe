"use client";
import BookingPanel from "@/components/BookingPanel";
import bookingService from "@/libs/bookingService";
import { IBooking } from "@/models/booking.model";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function BookingPage() {
  const [bookings, setBookings] = useState<IBooking[]>();
  useEffect(() => {
    const getAllBookings = async () => {
      const bookings = await bookingService.getAllBookings();
      if (bookings) {
        setBookings(bookings);
      }
    };
    getAllBookings();
  }, []);
  const handleDeleteBooking = async (bookingId: string) => {
    if (bookings) {
      const updatedBookings = bookings.filter(
        (booking) => booking._id != bookingId,
      );
      setBookings(updatedBookings);
      const res = await bookingService.deleteBooking(bookingId);
      if (res) {
        toast.success("Successfully delete booking", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };
  return (
    <main className="space-y-6">
      <div className="flex flex-row w-full justify-between">
        <div className="font-medium text-3xl flex justify-center items-center">
          Bookings
        </div>
      </div>
      <BookingPanel
        handleDeleteBooking={handleDeleteBooking}
        bookings={bookings}
      />
    </main>
  );
}
