import HotelPanel from "@/components/HotelPanel";

export default function HotelPage() {
  return (
    <main className="p-8 space-y-6">
      <div className="font-medium text-2xl">Available Hotel</div>
      <HotelPanel />
    </main>
  );
}
