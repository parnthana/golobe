import { IHotel } from "@/models/hotel.model";
import { IUser } from "./user.model";

export interface IBooking {
  _id: string;
  bookingDate: Date;
  checkoutDate: Date;
  user: IUser;
  hotel: IHotel;
  createdAt: Date;
}

