import { ContainerCommon } from "@/containers/shared/common_container";
import { Dispatch, SetStateAction } from "react";

interface SignUpLogic {
  email: string;
  onInputEmail: Dispatch<SetStateAction<string>>;
  password: string;
  onInputPassword: Dispatch<SetStateAction<string>>;
  tel: string;
  onInputTel: Dispatch<SetStateAction<string>>;
  name: string;
  onInputName: Dispatch<SetStateAction<string>>;
  confirmPassword: string;
  onInputConfirmPassword: Dispatch<SetStateAction<string>>;
  emailError: string;
  passwordError: string;
  telError: string;
  signUp: () => void;
  toLogin: () => void;
}

export type SignUpLogicProps = ContainerCommon<SignUpLogic>;
