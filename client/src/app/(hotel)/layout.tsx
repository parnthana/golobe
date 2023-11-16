import TopMenu from "@/components/TopMenu";

export default function HotelRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-screen min-h-screen bg-[#FAFBFC]">
      <TopMenu />
      <div className="py-12 px-24">{children}</div>
    </main>
  );
}
