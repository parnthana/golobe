import { ContainerCommon } from "@/app/containers/shared/common_container";
import { Dispatch, SetStateAction } from "react";

interface LoginLogic {
  email: string;
  onInputEmail: Dispatch<SetStateAction<string>>;
  password: string;
  onInputPassword: Dispatch<SetStateAction<string>>;
  signIn: () => void;
  toSignUp: () => void;
}

export type LoginLogicProps = ContainerCommon<LoginLogic>;
