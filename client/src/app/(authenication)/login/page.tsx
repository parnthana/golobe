"use client";
import { LoginLogic } from "@/containers/Login/LoginLogic";
import Button from "@/components/Button";
import { LogoIcon } from "@/components/icons";
import InputField from "@/components/InputField";
import Image from "next/image";

export default function LoginPage() {
  return (
    <LoginLogic
      render={({
        email,
        onInputEmail,
        password,
        onInputPassword,
        signIn,
        toSignUp,
      }) => (
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
                onKeyDown={(e) => (e.key === "Enter" ? signIn : null)}
                value={email}
                label="Email"
                placeholder="Email"
                onChange={(e) => onInputEmail(e.target.value)}
              />
              <InputField
                onKeyDown={(e) => (e.key === "Enter" ? signIn : null)}
                value={password}
                label="Password"
                type="password"
                placeholder="Password"
                onChange={(e) => onInputPassword(e.target.value)}
              />
            </form>
            <Button text="Login" onClick={signIn} />
            <span className="mt-4 font-montserrat text-center w-full">
              {"Don't have an account?"}{" "}
              <span
                className="text-salmon font-semibold hover:cursor-pointer"
                onClick={toSignUp}
              >
                Sign Up
              </span>
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
      )}
    />
  );
}
