"use client";
import hotelService from "@/libs/hotelService";
import { IHotel } from "@/models/hotel.model";
import { useEffect, useState } from "react";

export default function HotelDetailPage({
  params,
}: {
  params: { hid: string };
}) {
  const [hotel, setHotel] = useState<IHotel | null>(null);
  useEffect(() => {
    const getHotel = async () => {
      const hotel = await hotelService.getHotel(params.hid);
      if (hotel) {
        setHotel(hotel);
      }
    };
    getHotel();
  }, []);
  return <main>{hotel?.id}</main>;
}
