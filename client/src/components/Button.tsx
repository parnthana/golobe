interface ButtonProps {
  text?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className="w-full px-4 py-2 bg-mint-green rounded-[4px] font-montserrat font-semibold mt-10"
    >
      {props.text}
    </button>
  );
}
