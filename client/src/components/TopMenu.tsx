"use client";
import { LogoIcon } from "@/components/icons";
import BedIcon from "@/components/icons/BedIcon";
import MyBookingIcon from "@/components/icons/MyBookingIcon";
import UserIcon from "@/components/icons/UserIcon";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function TopMenu() {
  const { data: session } = useSession();
  return (
    <div className="h-[80px] bg-white fixed top-0 right-0 left-0 z-30 flex flex-row justify-between shadow-lg px-24">
      <div className="flex flex-row space-x-8">
        <Link href="/hotel">
          <div className="h-full justify-center flex items-center space-x-2 border-b-4 border-transparent hover:border-mint-green">
            <BedIcon className="w-6 h-6" />
            <div className="font-montserrat font-semibold">Find Stays</div>
          </div>
        </Link>

        {session && (
          <Link href="/booking">
            <div className="h-full justify-center flex items-center space-x-2 border-b-4 border-transparent hover:border-mint-green">
              <MyBookingIcon className="w-6 h-6" />
              <div className="font-montserrat font-semibold">My Bookings</div>
            </div>
          </Link>
        )}
      </div>
      <Link href="/">
        <div className="h-full flex justify-center items-center">
          <LogoIcon className="h-[36px] w-[108px]" />
        </div>
      </Link>
      <div className="flex flex-row space-x-2 h-full items-center justify-center">
        {session ? (
          <div className="flex flex-row h-full">
            <div className="h-full justify-center flex items-center space-x-2">
              <UserIcon className="w-6 h-6" />
              <div className="font-montserrat font-semibold">
                {session.user.name}
              </div>
            </div>
            <div className="py-4">
              <div className="h-full bg-blackish-green w-[2px] mx-8"></div>
            </div>
            <div
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center h-full font-montserrat font-semibold border-b-4 border-transparent hover:border-salmon hover:cursor-pointer"
            >
              Logout
            </div>
          </div>
        ) : (
          <div className="space-x-8 flex flex-row">
            <Link href="/login">
              <div className="flex items-center h-full font-montserrat font-semibold">
                Login
              </div>
            </Link>
            <Link href="/signup">
              <div className="flex items-center h-full font-montserrat font-semibold bg-blackish-green text-neutrals px-6 py-4 rounded-lg">
                Sign up
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
