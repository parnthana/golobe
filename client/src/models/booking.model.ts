import { IHotel } from "@/models/hotel.model";

export interface IBooking {
  _id: string;
  bookingDate: Date;
  checkoutDate: Date;
  user: string;
  hotel: IHotel;
  createdAt: Date;
}
