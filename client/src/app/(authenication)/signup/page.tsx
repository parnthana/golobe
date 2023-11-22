"use client";
import { SignUpLogic } from "@/containers/SignUp/SignUpLogic";
import Button from "@/components/Button";
import { LogoIcon } from "@/components/icons";
import InputField from "@/components/InputField";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <SignUpLogic
      render={({
        email,
        onInputEmail,
        password,
        onInputPassword,
        confirmPassword,
        onInputConfirmPassword,
        emailError,
        passwordError,
        signUp,
        toLogin,
        onInputName,
        onInputTel,
        telError,
        tel,
        name,
      }) => (
        <main className="min-h-screen p-24 bg-white flex flex-row space-x-24">
          <div className="w-1/2 relative">
            <Image
              src="/assets/images/Login.png"
              alt="hotel picture"
              layout="fill"
              objectFit="cover"
              className="rounded-3xl"
            />
          </div>
          <div className="w-1/2 flex flex-col">
            <div className="h-fit">
              <LogoIcon className="h-12 w-36" />
            </div>
            <div className="mt-16">
              <div className="text-[40px] font-tradegothic-bold">Sign up</div>
              <div className="font-montserrat mt-4 text-base">
                Let’s get you all set up so you can access your personal
                account.
              </div>
            </div>
            <form className="w-full mt-12">
              <InputField
                value={email}
                label="Email"
                placeholder="Email"
                onChange={(e) => onInputEmail(e.target.value)}
                error={emailError}
              />
            </form>
            <form className="w-full space-x-6 flex flex-row mt-6">
              <InputField
                value={name}
                label="Name"
                type="text"
                placeholder="Username"
                onChange={(e) => onInputName(e.target.value)}
              />
              <InputField
                label="Tel."
                value={tel}
                type="text"
                placeholder="Tel"
                onChange={(e) => onInputTel(e.target.value)}
                error={telError}
              />
            </form>
            <form className="w-full space-y-6 mt-6">
              <InputField
                value={password}
                label="Password"
                type="password"
                placeholder="Password"
                error={passwordError}
                onChange={(e) => onInputPassword(e.target.value)}
              />
              <InputField
                value={confirmPassword}
                error={passwordError}
                label="Confirm Password"
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => onInputConfirmPassword(e.target.value)}
              />
            </form>
            <Button text="Create account" onClick={signUp} />
            <span className="font-montserrat mb-8 w-full text-center mt-4">
              Already have an account?{" "}
              <span
                className="text-salmon font-semibold hover:cursor-pointer"
                onClick={toLogin}
              >
                Login
              </span>
            </span>
          </div>
        </main>
      )}
    />
  );
}
