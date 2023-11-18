import { Logo2Icon } from "@/components/icons";

export default function Footer() {
  return (
    <div className="h-[80px] bg-mint-green z-30 fixed bottom-0 w-full flex flex-row justify-between shadow-lg px-12 py-5">
      <Logo2Icon className="h-12 w-36" />
    </div>
  );
}
