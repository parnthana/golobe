"use client";
import { useUser } from "@/app/containers/shared/hooks/userHook";
import CustomImage from "@/components/CustomImage";
import { LocationIcon, PenIcon, PhoneIcon } from "@/components/icons";
import InputField from "@/components/InputField";
import PopUpModal from "@/components/PopUpModal";
import bookingService from "@/libs/bookingService";
import hotelService from "@/libs/hotelService";
import { IHotel } from "@/models/hotel.model";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function HotelDetailPage({
  params,
}: {
  params: { hid: string };
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [hotel, setHotel] = useState<IHotel | null>(null);
  const { user } = useUser();
  const [bookingSectionVisible, setBookingSectionVisible] = useState(false);
  const [bookingDate, setBookingDate] = useState<Dayjs | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<Dayjs | null>(null);
  const [isEditHotel, setIsEditHotel] = useState(false);
  const [newAddress, setNewAddress] = useState<string>();
  const [newTel, setNewTel] = useState<string>();
  const [newPrice, setNewPrice] = useState<string>();
  const [newDistrict, setNewDistrict] = useState<string>();
  const [newProvince, setNewProvince] = useState<string>();
  const [newPostalCode, setNewPostalCode] = useState<string>();
  const [newPicture, setNewPicture] = useState<string>();
  const [newName, setNewName] = useState<string>();
  useEffect(() => {
    const getHotel = async () => {
      const hotel = await hotelService.getHotel(params.hid);
      if (hotel) {
        setHotel(hotel);
      }
    };
    getHotel();
  }, []);
  const handleClosePopUp = () => {
    setNewName(undefined);
    setNewTel(undefined);
    setNewPrice(undefined);
    setNewPicture(undefined);
    setNewProvince(undefined);
    setNewDistrict(undefined);
    setNewPostalCode(undefined);
    setNewAddress(undefined);
    setBookingDate(null);
    setCheckoutDate(null);
    setBookingSectionVisible(false);
    setIsEditHotel(false);
  };
  const handleBooking = async () => {
    try {
      if (bookingDate && checkoutDate && hotel) {
        const res = await bookingService.createNewBooking(
          bookingDate.toDate(),
          checkoutDate.toDate(),
          hotel.id,
        );
        if (res.success) {
          toast.success("Booking success!");
        }
        setTimeout(() => router.push("/booking"), 1000);
        handleClosePopUp();
      }
    } catch (e) {
      toast.error("An error occurred!, please try again later");
      console.log(e);
    }
  };
  const handleEditHotel = async () => {
    try {
      if (hotel) {
        const res = await hotelService.updateHotel(hotel?.id, {
          name: newName,
          address: newAddress,
          province: newProvince,
          district: newDistrict,
          tel: newTel,
          picture: newPicture,
          price: newPrice,
          postalcode: newPostalCode,
        });
        if (res.success) {
          toast.success("Successfully update hotel", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setHotel(res.data as IHotel);
        } else {
          toast.error("An error occurred", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        handleClosePopUp();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const editHotelContext = () => {
    return (
      <div className="px-8 pb-8 flex flex-col space-y-9 w-full">
        <div className="font-medium text-3xl mb-3">Edit Hotel</div>
        <div className="flex-col flex space-y-4">
          <div className="flex flex-col space-y-3">
            Name
            <InputField
              value={newName}
              placeholder={hotel?.name}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-3">
            Address
            <InputField
              placeholder={hotel?.address}
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
            />
          </div>
          <div className="flex flex-row space-x-4 w-full">
            <div className="flex flex-col space-y-3 w-1/2">
              District
              <InputField
                placeholder={hotel?.district}
                value={newDistrict}
                onChange={(e) => setNewDistrict(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-3 w-1/2">
              Province
              <InputField
                placeholder={hotel?.province}
                value={newProvince}
                onChange={(e) => setNewProvince(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row space-x-4">
            <div className="flex flex-col space-y-3 w-1/2">
              Postal Code
              <InputField
                placeholder={hotel?.postalcode}
                value={newPostalCode}
                onChange={(e) => setNewPostalCode(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-3 w-1/2">
              Tel
              <InputField
                placeholder={hotel?.tel}
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
              placeholder={hotel?.price.toString()}
              value={newPrice?.toString()}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-3">
            Picture URL
            <InputField
              value={newPicture}
              placeholder={hotel?.picture}
              onChange={(e) => setNewPicture(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={() => handleEditHotel()}
          className="w-full py-4 bg-mint-green rounded-[4px] font-montserrat font-semibold text-center disabled:bg-neutrals-gray-2 disabled:text-neutrals-gray-5"
        >
          Done
        </button>
      </div>
    );
  };
  const bookingContext = () => {
    return (
      <div className="px-8 pb-8 flex flex-col space-y-9 w-full">
        <div className="font-medium text-3xl mb-3">Booking Detail</div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex-col flex space-y-6">
            <DatePicker
              disablePast
              label="Check-In Date"
              className="bg-white"
              value={bookingDate}
              onChange={(value) => setBookingDate(value)}
            />

            <DatePicker
              disablePast
              label="Check-Out Date"
              className="bg-white"
              value={checkoutDate}
              onChange={(value) => setCheckoutDate(value)}
              minDate={bookingDate}
              maxDate={bookingDate?.add(3, "d")}
            />
          </div>
        </LocalizationProvider>
        <button
          disabled={
            !bookingDate ||
            !checkoutDate ||
            checkoutDate < bookingDate ||
            checkoutDate.diff(bookingDate, "d") > 3
          }
          onClick={() => handleBooking()}
          className="w-full py-4 bg-mint-green rounded-[4px] font-montserrat font-semibold text-center disabled:bg-neutrals-gray-2 disabled:text-neutrals-gray-5"
        >
          Book
        </button>
      </div>
    );
  };
  return (
    hotel && (
      <>
        <main className="space-y-8">
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col space-y-4">
              <div className="font-tradegothic-bold text-2xl">{hotel.name}</div>
              <div className="flex flex-row space-x-[4px]">
                <LocationIcon className="w-4 h-4" />
                <div className="font-montserrat text-sm font-medium">
                  {hotel.address}
                </div>
              </div>
              <div className="flex flex-row space-x-[4px]">
                <PhoneIcon className="w-4 h-4" />
                <div className="font-montserrat text-sm font-medium">
                  {hotel.tel}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <p className="text-salmon font-bold text-2xl w-full text-right">
                ${hotel.price}
                <span className="text-sm font-medium">/night</span>
              </p>
              <div className="flex flex-row space-x-4">
                {user?.role === "admin" && (
                  <div
                    onClick={() => setIsEditHotel(true)}
                    className="px-4 bg-transparent border-2 border-mint-green rounded-[4px] font-montserrat font-semibold hover:cursor-pointer items-center justify-center flex"
                  >
                    <PenIcon className="w-6 h-6" />
                  </div>
                )}
                <div
                  onClick={() =>
                    !session
                      ? router.push("/login")
                      : setBookingSectionVisible(!bookingSectionVisible)
                  }
                  className="px-9 py-4 bg-mint-green rounded-[4px] font-montserrat font-semibold hover:cursor-pointer"
                >
                  Book Now
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-center flex-row space-x-8">
            <div className="h-[550px] w-full relative">
              <CustomImage
                src={hotel.picture}
                alt="hotel picture"
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
        </main>
        <PopUpModal
          visible={bookingSectionVisible || isEditHotel}
          onClosed={() => handleClosePopUp()}
          context={isEditHotel ? editHotelContext() : bookingContext()}
        />
      </>
    )
  );
}
