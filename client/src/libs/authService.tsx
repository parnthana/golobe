import { IUser } from "@/models/user.model";
import axios from "axios";
import { getSession } from "next-auth/react";

async function login(email: string, password: string) {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/auth/login",
    {
      email,
      password,
    },
  );

  if (!res) {
    throw new Error("Failed to login");
  }

  return await res.data;
}

async function signUp(
  name: string,
  email: string,
  tel: string,
  role: string,
  password: string,
) {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/auth/register",
    {
      name,
      email,
      tel,
      role,
      password,
    },
  );
  if (!res) {
    throw new Error("Failed to sign up");
  }
  return await res.data;
}

async function getMe() {
  const session = await getSession();
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${session?.user.token}`,
    },
  };
  const res = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/auth/me",
    config,
  );
  return (await res.data.data) as IUser;
}

const authService = { login, signUp, getMe };
export default authService;
