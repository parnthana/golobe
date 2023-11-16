"use client";
import HotelPanel from "@/components/HotelPanel";
import { AddIcon } from "@/components/icons";
import InputField from "@/components/InputField";
import PopUpModal from "@/components/PopUpModal";
import authService from "@/libs/authService";
import hotelService from "@/libs/hotelService";
import { IHotel } from "@/models/hotel.model";
import { IUser } from "@/models/user.model";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function HotelPage() {
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
  const handleDeleteHotel = async (hotelId: string) => {
    const updatedHotels = hotels.filter((hotel) => hotel.id != hotelId);
    setHotels(updatedHotels);
    if (hotels) {
      const res = await hotelService.deleteHotel(hotelId);
      if (res) {
        toast.success("Successfully delete hotel", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };
  const [user, setUser] = useState<IUser | null>(null);
  const { data: session } = useSession();
  useEffect(() => {
    const getMe = async () => {
      try {
        authService.getMe().then((user) => setUser(user));
      } catch (err) {
        console.log(err);
      }
    };
    if (session) getMe();
  }, [session]);
  const [isCreateHotel, setIsCreateHotel] = useState(false);
  const [newAddress, setNewAddress] = useState<string>();
  const [newTel, setNewTel] = useState<string>();
  const [newPrice, setNewPrice] = useState<string>();
  const [newDistrict, setNewDistrict] = useState<string>();
  const [newProvince, setNewProvince] = useState<string>();
  const [newPostalCode, setNewPostalCode] = useState<string>();
  const [newPicture, setNewPicture] = useState<string>();
  const [newName, setNewName] = useState<string>();
  const handleCreateHotel = async () => {
    if (
      newName &&
      newAddress &&
      newPicture &&
      newDistrict &&
      newTel &&
      newPostalCode &&
      newPrice &&
      newProvince
    ) {
      const newHotel = {
        name: newName,
        address: newAddress,
        tel: newTel,
        price: newPrice,
        province: newProvince,
        picture: newPicture,
        district: newDistrict,
        postalcode: newPostalCode,
      };
      const res = await hotelService.createHotel(newHotel);
      const hotel = res.data as IHotel;
      if (res.success) {
        toast.success("Successfully create hotel", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setHotels((prevState) => [...prevState, hotel]);
      } else {
        toast.error("An error occurred", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      handleClosePopUp();
    }
  };
  const createHotelContext = () => {
    return (
      <div className="px-8 pb-8 flex flex-col space-y-9">
        <div className="font-medium text-3xl mb-3">Create Hotel</div>
        <div className="flex-col flex space-y-4">
          <div className="flex flex-col space-y-3">
            Name
            <InputField
              value={newName}
              placeholder="Name"
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-3">
            Address
            <InputField
              placeholder="Address"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
            />
          </div>
          <div className="flex flex-row space-x-4 w-full">
            <div className="flex flex-col space-y-3 w-1/2">
              District
              <InputField
                placeholder="District"
                value={newDistrict}
                onChange={(e) => setNewDistrict(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-3 w-1/2">
              Province
              <InputField
                placeholder="Province"
                value={newProvince}
                onChange={(e) => setNewProvince(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row space-x-4">
            <div className="flex flex-col space-y-3 w-1/2">
              Postal Code
              <InputField
                placeholder="Postal Code"
                value={newPostalCode}
                onChange={(e) => setNewPostalCode(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-3 w-1/2">
              Tel
              <InputField
                placeholder="Tel"
                value={newTel}
                onChange={(e) => {
                  setNewTel(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            Price
            <InputField
              placeholder="price"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-3">
            Picture URL
            <InputField
              value={newPicture}
              placeholder="Picture URL"
              onChange={(e) => setNewPicture(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={() => handleCreateHotel()}
          className="w-full py-4 bg-mint-green rounded-[4px] font-montserrat font-semibold text-center disabled:bg-neutrals-gray-2 disabled:text-neutrals-gray-5"
        >
          Create Hotel
        </button>
      </div>
    );
  };
  const handleClosePopUp = () => {
    setNewName(undefined);
    setNewTel(undefined);
    setNewPrice(undefined);
    setNewPicture(undefined);
    setNewProvince(undefined);
    setNewDistrict(undefined);
    setNewPostalCode(undefined);
    setNewAddress(undefined);
    setIsCreateHotel(false);
  };
  return (
    <>
      <main className="space-y-6">
        <div className="flex flex-row w-full justify-between">
          <div className="font-medium text-2xl flex justify-center items-center">
            Available Hotel
          </div>
          {user?.role === "admin" && (
            <div
              onClick={() => setIsCreateHotel(true)}
              className="p-2 bg-transparent border-2 border-mint-green rounded-full font-montserrat font-semibold hover:cursor-pointer items-center justify-center flex"
            >
              <AddIcon className="w-6 h-6" />
            </div>
          )}
        </div>
        <HotelPanel
          isAdmin={user?.role === "admin"}
          handleDeleteHotel={handleDeleteHotel}
          hotels={hotels}
        />
      </main>
      <PopUpModal
        context={createHotelContext()}
        visible={isCreateHotel}
        onClosed={handleClosePopUp}
      />
    </>
  );
}
