interface InputFieldProps {
  label?: string;
  placeholder?: string;
  type?: string | "text";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function InputField(props: InputFieldProps) {
  return (
    <input
      onKeyDown={props.onKeyDown}
      type={props.type}
      className={`${
        props.error
          ? "border-salmon border-2 focus:border-salmon focus:border-2"
          : "border-blackish-green focus:border-2 focus:border-mint-green"
      } font-montserrat w-full px-4 py-3 rounded-[4px] border outline-none focus:outline-none focus:py-[11px] focus:px-[15px]`}
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  );
}
