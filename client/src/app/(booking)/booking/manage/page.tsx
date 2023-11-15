"use client";
import authService from "@/libs/authService";
import { IUser } from "@/models/user.model";
import { useEffect, useState } from "react";

export default function ManageBookingPage() {
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    const getMe = async () => {
      try {
        authService.getMe().then((user) => setUser(user));
      } catch (err) {
        console.log(err);
      }
    };
    getMe();
  }, []);
  return <main className="min-h-screen w-screen p-8">{user?.role}</main>;
}
