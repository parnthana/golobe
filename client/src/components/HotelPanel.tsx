import HotelCard from "@/components/HotelCard";
import { IHotel } from "@/models/hotel.model";

interface HotelPanelProps {
  hotels: IHotel[];
  isAdmin: boolean;
  handleDeleteHotel: (hotelId: string) => void;
}

export default function HotelPanel(props: HotelPanelProps) {
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
