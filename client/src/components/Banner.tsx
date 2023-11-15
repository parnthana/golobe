import PaperPlaneIcon from "@/components/icons/PaperPlaneIcon";
import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="relative w-full max-h-screen">
      <Image
        src="/assets/images/Banner.png"
        alt="banner"
        fill={true}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <p className="text-white text-[65px] font-tradegothic">
          Helping Others
        </p>
        <p className="text-white md:text-[100px] font-tradegothic-bold">
          LIVE & TRAVEL
        </p>
        <p className="text-white text-[40px] font-tradegothic">
          Special offers to suit your plan
        </p>
        <Link href="/hotel">
          <div className="flex flex-row p-4 bg-mint-green bg-opacity-75 space-x-2 mt-4 rounded hover:cursor-pointer hover:bg-[#A5EBD3] transition-all duration-500">
            <PaperPlaneIcon className="w-6 h-6" />
            <div className="font-medium">Show Hotels</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
