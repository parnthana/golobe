"use client";
import Button from "@/components/Button";
import { LocationIcon, PhoneIcon } from "@/components/icons";
import { IHotel } from "@/models/hotel.model";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface HotelCardProps {
  hotelInfo: IHotel;
}

export default function HotelCard(props: HotelCardProps) {
  const router = useRouter();
  return (
    <div className="flex flex-row w-full h-full bg-white shadow-md rounded-md">
      <div className="w-[300px] relative flex items-start rounded-tl-md rounded-bl-md">
        <Image
          src={props.hotelInfo.picture}
          alt="hotel picture"
          fill={true}
          className="object-cover rounded-tl-md rounded-bl-md"
        />
      </div>
      <div className="w-full flex flex-col p-6 justify-between">
        <div className="flex-row flex justify-between">
          <div className="flex-col flex space-y-2">
            <div className="font-tradegothic-bold text-xl">
              {props.hotelInfo.name}
            </div>
            <div className="flex flex-row space-x-[4px]">
              <LocationIcon className="w-4 h-4" />
              <div className="font-montserrat text-sm font-medium">
                {props.hotelInfo.address}
              </div>
            </div>
            <div className="flex flex-row space-x-[4px]">
              <PhoneIcon className="w-4 h-4" />
              <div className="font-montserrat text-sm font-medium">
                {props.hotelInfo.tel}
              </div>
            </div>
          </div>
          <p className="text-salmon font-bold text-2xl">
            ${props.hotelInfo.price}
            <span className="text-base font-medium">/night</span>
          </p>
        </div>
        <div className="h-[2px] w-full bg-blackish-green mt-2"></div>
        <Button
          text="View Place"
          onClick={() => router.push(`/hotel/${props.hotelInfo.id}`)}
        />
      </div>
    </div>
  );
}
