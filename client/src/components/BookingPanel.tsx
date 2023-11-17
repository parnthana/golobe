"use client";
import BookingCard from '@/components/BookingCard';
import bookingService from "@/libs/bookingService";
import { IBooking } from "@/models/booking.model";

interface BookingPanelProps {
    bookings: IBooking[];
    handleDeleteBooking: (bookingId: string) => void;
}

export default function BookingPanel(props: BookingPanelProps){
    return (
        <div className="w-full space-y-6 h-auto">
          {props.bookings.map((booking: IBooking) => (
            <BookingCard
              key={booking._id}
              bookingInfo={booking}
              handleDeleteBooking={props.handleDeleteBooking}
            />
          ))}
        </div>
      );
}