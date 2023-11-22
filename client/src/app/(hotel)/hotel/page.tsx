"use client";
import { useUser } from "@/libs/hooks/userHook";
import HotelPanel from "@/components/HotelPanel";
import { AddIcon } from "@/components/icons";
import InputField from "@/components/InputField";
import PopUpModal from "@/components/PopUpModal";
import SearchBox from "@/components/SearchBox";
import hotelService from "@/libs/hotelService";
import { IHotel } from "@/models/hotel.model";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function HotelPage() {
  const [value, setValue] = useState<number[] | number>();
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const [minCost, setMinCost] = useState<number>();
  const [maxCost, setMaxCost] = useState<number>();
  const { user } = useUser();
  const [isCreateHotel, setIsCreateHotel] = useState(false);
  const [newAddress, setNewAddress] = useState<string>();
  const [newTel, setNewTel] = useState<string>();
  const [newPrice, setNewPrice] = useState<string>();
  const [newDistrict, setNewDistrict] = useState<string>();
  const [newProvince, setNewProvince] = useState<string>();
  const [newPostalCode, setNewPostalCode] = useState<string>();
  const [newPicture, setNewPicture] = useState<string>();
  const [newName, setNewName] = useState<string>();
  const [filteredHotels, setFilteredHotels] = useState<IHotel[]>(hotels);
  const [postalcodeError, setPostalcodeError] = useState("");
  const [telError, setTelError] = useState("");
  const [priceError, setPriceError] = useState("");

  useEffect(() => {
    const getAllHotels = async () => {
      const hotels = await hotelService.getAllHotels();
      if (hotels) {
        setHotels(hotels);
      }
    };
    getAllHotels();
  }, []);
  useEffect(() => {
    if (hotels.length != 0) {
      const min = hotels.reduce(
        (min, hotel) => (hotel.price < min ? hotel.price : min),
        hotels[0].price,
      );
      setMinCost(min);
      const max = hotels.reduce(
        (max, hotel) => (hotel.price > max ? hotel.price : max),
        hotels[0].price,
      );
      setMaxCost(max);
      setValue([min, max]);
    }
    setFilteredHotels(hotels);
  }, [hotels]);
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
      if (newPostalCode.length > 5) {
        toast.error("Postal code cannot be more than 5 digits.", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setPostalcodeError("Error");
        setTelError("");
        return;
      }
      if (newTel.length != 10) {
        toast.error("Please input valid tel.", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTelError("Error");
        setPostalcodeError("");
        return;
      }
      if (isNaN(parseInt(newPrice))) {
        toast.error("Please input valid price.", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTelError("");
        setPostalcodeError("");
        setPriceError("Error");
        return;
      }
      setPostalcodeError("");
      setTelError("");
      setPriceError("");
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
      try {
        const res = await hotelService.createHotel(newHotel);
        const hotel = res.data as IHotel;
        if (res.success) {
          toast.success("Successfully create hotel", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setHotels((prevState) => [...prevState, hotel]);
        } else {
          toast.error("An error occurred!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (err) {
        toast.error("An error occurred!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(err);
      }
      handleClosePopUp();
    }
  };
  const createHotelContext = () => {
    return (
      <div className="px-8 pb-8 flex flex-col space-y-9 w-full">
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
                error={postalcodeError}
                placeholder="Postal Code"
                value={newPostalCode}
                onChange={(e) => setNewPostalCode(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-3 w-1/2">
              Tel
              <InputField
                error={telError}
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
              error={priceError}
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
          disabled={
            !newName ||
            !newAddress ||
            !newPicture ||
            !newDistrict ||
            !newTel ||
            !newPostalCode ||
            !newPrice ||
            !newProvince
          }
          onClick={() => handleCreateHotel()}
          className="w-full py-4 bg-mint-green rounded-[4px] font-montserrat font-semibold text-center disabled:bg-neutrals-gray-2 disabled:text-neutrals-gray-5"
        >
          Create Hotel
        </button>
      </div>
    );
  };
  const handleClosePopUp = () => {
    setTelError("");
    setPostalcodeError("");
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

  const handleSearch = (filteredHotels: IHotel[]) => {
    setFilteredHotels(filteredHotels);
  };
  const handleSetValue = (value: number[] | number) => {
    setValue(value);
    const filteredHotels = hotels.filter((hotel) => {
      if (Array.isArray(value)) {
        return hotel.price <= value[1] && hotel.price >= value[0];
      }
      return true;
    });
    setFilteredHotels(filteredHotels);
  };
  return (
    <>
      <main>
        <div className="flex flex-row space-x-6 h-full">
          <div className="flex flex-col w-1/5 space-y-9">
            <div className="font-semibold text-2xl">Filter</div>
            <div className="flex flex-col space-y-4">
              <div className="font-semibold text-base">Price</div>
              {hotels && value && maxCost && minCost && (
                <div className="flex flex-col w-full">
                  <div className="w-full flex px-4">
                    <Slider
                      pushable={true}
                      range
                      defaultValue={[minCost, maxCost]}
                      min={minCost}
                      max={maxCost}
                      onChange={(value) => handleSetValue(value)}
                    />
                  </div>
                  <div className="flex flex-row justify-between w-full text-sm mt-2">
                    {Array.isArray(value) ? <div>${value[0]}</div> : null}
                    {Array.isArray(value) ? <div>${value[1]}</div> : null}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="max-h-screen bg-gray-300 w-[1px]"></div>
          <div className="flex flex-col w-4/5 h-full space-y-6">
            <div className="flex flex-row justify-between space-x-4 items-center">
              {hotels && <SearchBox hotels={hotels} onSearch={handleSearch} />}
              {user?.role === "admin" && (
                <div
                  onClick={() => setIsCreateHotel(true)}
                  className="p-2 bg-transparent border-2 border-mint-green rounded-full w-fit h-fit font-montserrat font-semibold hover:cursor-pointer items-center justify-center flex"
                >
                  <AddIcon className="w-6 h-6" />
                </div>
              )}
            </div>
            <HotelPanel
              isAdmin={user?.role === "admin"}
              handleDeleteHotel={handleDeleteHotel}
              hotels={filteredHotels}
            />
          </div>
        </div>
      </main>
      <PopUpModal
        context={createHotelContext()}
        visible={isCreateHotel}
        onClosed={handleClosePopUp}
      />
    </>
  );
}
