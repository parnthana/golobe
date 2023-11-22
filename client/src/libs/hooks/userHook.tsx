import authService from "@/libs/authService";
import { IUser } from "@/models/user.model";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useUser() {
  const [user, setUser] = useState<IUser | null>(null);
  const { data: session } = useSession();
  useEffect(() => {
    const getMe = async () => {
      try {
        authService.getMe().then((user) => setUser(user));
      } catch (err) {
        console.log(err);
      }
    };
    if (session) getMe();
  }, [session]);
  return { user };
}
