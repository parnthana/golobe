"use client";
import Button from "@/components/Button";
import { LogoIcon } from "@/components/icons";
import InputField from "@/components/InputField";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignIn = async () => {
    setEmail("");
    setPassword("");
    try {
      await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
        callbackUrl: "/",
      }).then((value) => {
        if (value && value?.ok) {
          window.location.href = "/";
        } else {
          toast.error("Invalid Username/Email Address or Password.", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  const linkToSignUp = useMemo(() => {
    const handleLinkToSignUp = () => {
      try {
        router.push("/signup");
      } catch (error) {
        console.error(error);
      }
    };
    return (
      <span
        className="text-salmon font-semibold hover:cursor-pointer"
        onClick={handleLinkToSignUp}
      >
        Sign Up
      </span>
    );
  }, []);
  return (
    <main className="min-h-screen p-24 bg-white flex flex-row space-x-24">
      <div className="w-1/2 flex flex-col">
        <div className="h-fit">
          <LogoIcon className="h-12 w-36" />
        </div>
        <div className="mt-16">
          <div className="text-[40px] font-tradegothic-bold">Login</div>
          <div className="font-montserrat mt-4 text-base">
            Login to access your Golobe account
          </div>
        </div>
        <form className="w-full mt-12 space-y-6">
          <InputField
            onKeyDown={(e) => (e.key === "Enter" ? handleSignIn() : null)}
            value={email}
            label="Email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            onKeyDown={(e) => (e.key === "Enter" ? handleSignIn() : null)}
            value={password}
            label="Password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <Button text="Login" onClick={handleSignIn} />
        <span className="mt-4 font-montserrat text-center w-full">
          {"Don't have an account?"} {linkToSignUp}
        </span>
      </div>
      <div className="w-1/2 relative">
        <Image
          src="/assets/images/Login.png"
          alt="hotel picture"
          layout="fill"
          objectFit="cover"
          className="rounded-3xl"
        />
      </div>
    </main>
  );
}
