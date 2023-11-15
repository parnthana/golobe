import Banner from "@/components/Banner";
import TopMenu from "@/components/TopMenu";

export default function Home() {
  return (
    <>
      <TopMenu />
      <main className="flex min-h-screen w-screen bg-white -mt-[80px]">
        <Banner />
      </main>
    </>
  );
}
