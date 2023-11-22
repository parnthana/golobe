import { IconIcon } from "@/components/icons";
import Image from "next/image";

interface CustomImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

export default function CustomImage(props: CustomImageProps) {
  const isRelativePath = props.src.startsWith("/");
  if (
    !isRelativePath &&
    !props.src.startsWith("http://") &&
    !props.src.startsWith("https://")
  ) {
    return (
      <div className="items-center flex justify-center w-full h-full">
        <IconIcon className="w-20 h-20" />
      </div>
    );
  }
  return (
    <Image
      onError={(error) => console.log(error)}
      src={props.src}
      alt={props.alt}
      className={props.className}
      fill={true}
    />
  );
}
