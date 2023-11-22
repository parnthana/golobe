import { SignUpLogicProps } from "@/containers/SignUp/SignUpLogic.type";
import authService from "@/libs/authService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export function SignUpLogic({ render }: SignUpLogicProps) {
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
  const handleToSignIn = () => {
    try {
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return render({
    email,
    onInputEmail: setEmail,
    password,
    onInputPassword: setPassword,
    name,
    onInputName: setName,
    tel,
    onInputTel: setTel,
    confirmPassword,
    onInputConfirmPassword: setConfirmPassword,
    toLogin: handleToSignIn,
    signUp: handleSignUp,
    emailError,
    passwordError,
    telError,
  });
}
