"use client";
import Button from "@/components/Button";
import { LogoIcon } from "@/components/icons";
import InputField from "@/components/InputField";
import authService from "@/libs/authService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [telError, setTelError] = useState("");
  const verifyEmail = () => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
  };
  const verifyPassword = () => {
    return password === confirmPassword && password.length >= 6;
  };
  const verifyTel = () => {
    const telRegex =
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    return telRegex.test(tel);
  };
  const handleSignUp = async () => {
    if (!verifyEmail()) {
      setEmailError("Invalid email address");
      toast.error("Invalid email address", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    } else {
      setEmailError("");
    }
    if (!verifyTel()) {
      setTelError("Invalid phone number");
      toast.error("Invalid phone number", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    } else {
      setTelError("");
    }
    if (!verifyPassword()) {
      setPasswordError("Passwords do not match or too short");
      toast.error("Passwords do not match or too short", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    } else {
      setPasswordError("");
    }
    try {
      await authService.signUp(name, email, tel, "user", password);
      toast.success("Successfully create account.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => router.push("/login"), 3000);
    } catch (err) {
      toast.error("An error occurred.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(err);
    }
  };
  const linkToSignIn = useMemo(() => {
    const handleLinkToSignIn = () => {
      try {
        router.push("/login");
      } catch (error) {
        console.error(error);
      }
    };
    return (
      <span
        className="text-salmon font-semibold hover:cursor-pointer"
        onClick={handleLinkToSignIn}
      >
        Login
      </span>
    );
  }, []);

  return (
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
            Let’s get you all set up so you can access your personal account.
          </div>
        </div>
        <form className="w-full mt-12">
          <InputField
            value={email}
            label="Email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
          />
        </form>
        <form className="w-full space-x-6 flex flex-row mt-6">
          <InputField
            value={name}
            label="Name"
            type="text"
            placeholder="Username"
            onChange={(e) => setName(e.target.value)}
          />
          <InputField
            label="Tel."
            value={tel}
            type="text"
            placeholder="Tel"
            onChange={(e) => setTel(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            value={confirmPassword}
            error={passwordError}
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </form>
        <Button text="Create account" onClick={handleSignUp} />
        <span className="font-montserrat mb-8 w-full text-center mt-4">
          Already have an account? {linkToSignIn}
        </span>
      </div>
    </main>
  );
}
