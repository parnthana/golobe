"use client";
import HotelCard from "@/components/HotelCard";
import hotelService from "@/libs/hotelService";
import { IHotel } from "@/models/hotel.model";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface HotelPanelProps {
  hotels: IHotel[];
  isAdmin: boolean;
  handleDeleteHotel: (hotelId: string) => void;
}

export default function HotelPanel(props: HotelPanelProps) {
  // const [hotels, setHotels] = useState<IHotel[]>([]);
  // useEffect(() => {
  //   const getAllHotels = async () => {
  //     const hotels = await hotelService.getAllHotels();
  //     if (hotels) {
  //       setHotels(hotels);
  //     }
  //   };
  //   getAllHotels();
  // }, []);
  // const handleDeleteHotel = async (hotelId: string) => {
  //   const updatedHotels = hotels.filter((hotel) => hotel.id != hotelId);
  //   setHotels(updatedHotels);
  //   if (hotels) {
  //     const res = await hotelService.deleteHotel(hotelId);
  //     if (res) {
  //       toast.success("Successfully delete hotel", {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //     }
  //   }
  // };
  return (
    <div className="w-full space-y-6 h-auto">
      {props.hotels.map((hotel: IHotel) => (
        <HotelCard
          isAdmin={props.isAdmin}
          key={hotel.id}
          hotelInfo={hotel}
          handleDeleteHotel={props.handleDeleteHotel}
        />
      ))}
    </div>
  );
}
