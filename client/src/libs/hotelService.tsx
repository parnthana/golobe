import { IHotel } from "@/models/hotel.model";
import axios from "axios";

async function getAllHotels() {
  const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/hotels");
  if (!res) {
    throw new Error("Failed to get hotels");
  }
  return (await res.data.data) as IHotel[];
}

async function getHotel(hotelId: string) {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + `/hotels/${hotelId}`,
  );
  if (!res) {
    throw new Error("Failed to get hotels");
  }
  return (await res.data.data) as IHotel;
}

const hotelService = { getAllHotels, getHotel };
export default hotelService;
