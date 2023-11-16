import { LoginLogicProps } from "@/app/containers/Login/LoginLogic.type";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export function LoginLogic({ render }: LoginLogicProps) {
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
  const handleToSignUp = () => {
    try {
      router.push("/signup");
    } catch (error) {
      console.error(error);
    }
  };
  return render({
    email,
    onInputEmail: setEmail,
    password,
    onInputPassword: setPassword,
    signIn: handleSignIn,
    toSignUp: handleToSignUp,
  });
}
