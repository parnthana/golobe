"use client"
import BookingPanel from "@/components/BookingPanel";
import authService from "@/libs/authService";
import bookingService from "@/libs/bookingService";
import hotelService from "@/libs/hotelService";
import { IHotel } from "@/models/hotel.model";
import { IUser } from "@/models/user.model";
import { IBooking } from "@/models/booking.model";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


export default function BookingPage() {

  const [bookings, setBookings] = useState<IBooking[]>([]);
  useEffect(() => {
    const getAllBookings = async () => {
      const bookings = await bookingService.getAllBookings();
      if (bookings) {
        setBookings(bookings);
      }
    };
    getAllBookings();
  },[]);
  const handleDeleteBooking = async (bookingId: string) => {
    const updatedBookings = bookings.filter((booking) => booking._id != bookingId);
    setBookings(updatedBookings);
    if (bookings) {
      const res = await bookingService.deleteBooking(bookingId);
      if (res) {
        toast.success("Successfully delete booking", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };
  const [user, setUser] = useState<IUser | null>(null);
  const { data: session } = useSession();
  useEffect(() => {
    const getMe = async () => {
      try {
        authService.getMe().then((user) => setUser(user));
      } catch (err) {
        console.log(err);
      }
    };
    if (session) getMe();
  }, [session]);

  

  return (
    <main className="space-y-6">
      <div className="flex flex-row w-full justify-between">
        <div className="font-medium text3xl flex justify-center items-center">
              Bookings
        </div>
      </div>
      <BookingPanel
          handleDeleteBooking={handleDeleteBooking}
          bookings={bookings}
        />
    </main>
  )

  
}
