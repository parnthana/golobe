import { SearchIcon } from "@/components/icons";
import { IHotel } from "@/models/hotel.model";
import { ChangeEvent, useState } from "react";

export default function SearchBox({
  hotels,
  onSearch,
}: {
  hotels: IHotel[];
  onSearch: (filteredHotels: IHotel[]) => void;
}) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    filterHotels(newSearchTerm);
  };

  const filterHotels = (term: string) => {
    const filteredHotels = hotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(term.toLowerCase()),
    );
    onSearch(filteredHotels);
  };

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-md flex flex-row space-x-4 items-center">
      <SearchIcon className="w-6 h-6" />
      <input
        value={searchTerm}
        type="text"
        className={`w-full py-2 focus:outline-none border-gray-200 border-b ${
          searchTerm ? "border-mint-green" : "border-blackish-green"
        } outline-none`}
        onChange={handleSearchChange}
        placeholder="Search Hotel"
      />
    </div>
  );
}
