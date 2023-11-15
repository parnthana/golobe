import TopMenu from "@/components/TopMenu";

export default function HotelRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-screen min-h-screen">
      <TopMenu />
      <div className="mt-[80px] bg-white">{children}</div>
    </main>
  );
}
