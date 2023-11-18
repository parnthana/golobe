"use client";
import BookingCard from "@/components/BookingCard";
import bookingService from "@/libs/bookingService";
import { IBooking } from "@/models/booking.model";
import { useRouter } from "next/navigation";

interface BookingPanelProps {
  bookings: IBooking[] | undefined;
  handleDeleteBooking: (bookingId: string) => void;
}

export default function BookingPanel(props: BookingPanelProps) {
  const router = useRouter();
  return (
    <div className="w-full space-y-6 h-auto">
      {props.bookings &&
        (props.bookings.length === 0 ? (
          <div className="w-full text-center text-xl flex flex-col space-y-4">
            <div>You have no booking.</div>
            <span
              className="text-mint-green text-xl font-semibold hover:cursor-pointer"
              onClick={() => router.push("/hotel")}
            >
              Start booking
            </span>
          </div>
        ) : (
          props.bookings.map((booking: IBooking) => (
            <BookingCard
              key={booking._id}
              bookingInfo={booking}
              handleDeleteBooking={props.handleDeleteBooking}
            />
          ))
        ))}
    </div>
  );
}
