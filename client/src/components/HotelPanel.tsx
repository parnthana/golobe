"use client";
import HotelCard from "@/components/HotelCard";
import hotelService from "@/libs/hotelService";
import { IHotel } from "@/models/hotel.model";
import { useEffect, useState } from "react";

export default function HotelPanel() {
  const [hotels, setHotels] = useState<IHotel[]>([]);
  useEffect(() => {
    const getAllHotels = async () => {
      const hotels = await hotelService.getAllHotels();
      if (hotels) {
        setHotels(hotels);
      }
    };
    getAllHotels();
  }, []);
  return (
    <div className="w-full space-y-6 h-auto">
      {hotels.map((hotel: IHotel) => (
        <HotelCard key={hotel.id} hotelInfo={hotel} />
      ))}
    </div>
  );
}
