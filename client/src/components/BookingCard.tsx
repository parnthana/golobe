"use client";
import {
  BuildingIcon,
  LocationIcon,
  PenIcon,
  PhoneIcon,
  TrashIcon,
  Vector1Icon,
  Vector4Icon,
} from "@/components/icons";
import bookingService from "@/libs/bookingService";
import { IBooking } from "@/models/booking.model";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";

interface BookingCardProps {
  bookingInfo: IBooking;
  handleDeleteBooking: (bookingId: string) => void;
}

export default function BookingCard(props: BookingCardProps) {
  const [bookingDate, setBookingDate] = useState<Date>(
    new Date(props.bookingInfo.bookingDate),
  );
  const [checkoutDate, setCheckoutDate] = useState<Date>(
    new Date(props.bookingInfo.checkoutDate),
  );
  // const bookingDate = new Date(props.bookingInfo.bookingDate);
  const bookingDateString = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(bookingDate);
  // const checkoutDate = new Date(props.bookingInfo.checkoutDate);
  const checkoutDateString = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(checkoutDate);

  const [booking, setBooking] = useState<IBooking | null>(props.bookingInfo);
  const [isEditBooking, setIsEditBooking] = useState(false);
  const [newBookingDate, setNewBookingDate] = useState<Dayjs | null>(null);
  const [newCheckoutDate, setNewCheckoutDate] = useState<Dayjs | null>(null);

  const handleEditBooking = async () => {
    try {
      if (booking && newBookingDate && newCheckoutDate) {
        const res = await bookingService.updateBooking(
          newBookingDate.toDate(),
          newCheckoutDate.toDate(),
          booking._id,
        );
        if (res.success) {
          toast.success("Successfully update booking!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setBooking(res.data as IBooking);
          setBookingDate(new Date(res.data.bookingDate));
          setCheckoutDate(new Date(res.data.checkoutDate));
        } else {
          toast.error("An error occurred", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        setNewBookingDate(null);
        setNewCheckoutDate(null);
        setIsEditBooking(false);
      }
    } catch (e) {
      toast.error("An error occurred!, please try again later");
      console.log(e);
    }
  };

  return (
    <div className="flex flex-row w-full h-full bg-white shadow-lg rounded-lg">
      <div className="w-[246px] relative flex items-start rounded-tl-lg rounded-bl-lg bg-[#EBF6F2] flex-col justify-between px-6 py-8">
        <div className="font-montserrat font-semibold text-2xl">
          {bookingDateString}
        </div>
        <div className="flex flex-row space-x-[4px]">
          <div className="font-montserrat text-xs font-medium text-blackish-green">
            Check-In
          </div>
        </div>
        <Vector1Icon className="w-[26px] h-[36px]" />
        <BuildingIcon className="w-[24px] h-[24px]" />
        <Vector4Icon className="w-[26px] h-[36px]" />
        <div className="font-montserrat font-semibold text-2xl">
          {checkoutDateString}
        </div>
        <div className="flex flex-row space-x-[4px]">
          <div className="font-montserrat text-xs font-medium">Check-Out</div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-between">
        <div className="flex w-full relative items-center bg-mint-green justify-center rounded-tr-lg font-tradegothic-bold text-xl text-center py-4">
          {props.bookingInfo.user.name}
        </div>
        <div className="p-8">
          <div className="flex flex-col space-y-2 justify-between">
            <div className="font-tradegothic text-xl">
              {props.bookingInfo.hotel.name}
            </div>
            <div className="flex flex-row space-x-[4px]">
              <LocationIcon className="w-4 h-4" />
              <div className="font-montserrat text-sm font-medium">
                {props.bookingInfo.hotel.address}
              </div>
            </div>
            <div className="flex flex-row space-x-[4px]">
              <PhoneIcon className="w-4 h-4" />
              <div className="font-montserrat text-sm font-medium">
                {props.bookingInfo.hotel.tel}
              </div>
            </div>
          </div>
          <div className="h-[2px] w-full bg-blackish-green mt-4"></div>
          <div className="flex flex-row justify-between w-full mt-6">
            <div>
              {isEditBooking ? (
                <div className="flex flex-row space-x-4">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="flex-row flex space-x-2">
                      <DatePicker
                        disablePast
                        label="Check-In Date"
                        className="bg-white"
                        value={newBookingDate}
                        onChange={(value) => setNewBookingDate(value)}
                      />
                      <div className="w-[24px] h-[1px] bg-blackish-green my-6 justify-center"></div>
                      <DatePicker
                        disablePast
                        label="Check-Out Date"
                        className="bg-white"
                        value={newCheckoutDate}
                        onChange={(value) => setNewCheckoutDate(value)}
                        minDate={newBookingDate}
                        maxDate={newBookingDate?.add(3, "d")}
                      />
                    </div>
                  </LocalizationProvider>
                  <button
                    disabled={
                      !newCheckoutDate ||
                      !newBookingDate ||
                      newCheckoutDate < newBookingDate ||
                      newCheckoutDate.diff(newBookingDate, "d") > 3
                    }
                    onClick={() => handleEditBooking()}
                    className="px-9 py-4 bg-mint-green rounded-[4px] font-montserrat font-semibold text-center disabled:bg-neutrals-gray-2 disabled:text-neutrals-gray-5"
                  >
                    Done
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="flex flex-row space-x-4">
              <div
                onClick={() => setIsEditBooking(!isEditBooking)}
                className="p-4 bg-mint-green border-2 border-mint-green rounded-[4px] font-montserrat font-semibold hover:cursor-pointer items-center justify-center flex"
              >
                <PenIcon className="w-6 h-6" />
              </div>
              <div
                onClick={() => props.handleDeleteBooking(props.bookingInfo._id)}
                className="p-4 bg-transparent border-2 border-mint-green rounded-[4px] font-montserrat font-semibold hover:cursor-pointer items-center justify-center flex"
              >
                <TrashIcon className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
