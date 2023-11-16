import { IHotel } from "@/models/hotel.model";
import axios from "axios";
import { getSession } from "next-auth/react";

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
    throw new Error("Failed to get hotel");
  }
  return (await res.data.data) as IHotel;
}

async function createHotel(body: Object) {
  const session = await getSession();
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${session?.user.token}`,
    },
  };
  const res = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/hotels",
    body,
    config,
  );
  if (!res) {
    throw new Error("Failed to create hotel");
  }
  return await res.data;
}

async function updateHotel(hotelId: string, body: Object) {
  const session = await getSession();
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${session?.user.token}`,
    },
  };
  const res = await axios.put(
    process.env.NEXT_PUBLIC_API_URL + `/hotels/${hotelId}`,
    body,
    config,
  );
  if (!res) {
    throw new Error("Failed to update hotel");
  }
  return await res.data;
}

async function deleteHotel(hotelId: string) {
  const session = await getSession();
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${session?.user.token}`,
    },
  };
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_API_URL + `/hotels/${hotelId}`,
    config,
  );
  if (!res) {
    throw new Error("Failed to delete hotel");
  }
  return await res.data;
}

const hotelService = {
  getAllHotels,
  getHotel,
  createHotel,
  updateHotel,
  deleteHotel,
};
export default hotelService;
