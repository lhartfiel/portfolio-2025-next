import { ButtonSize } from "./Button";

const ButtonText = ({
  text,
  size,
  disabled,
}: {
  text: string;
  size: ButtonSize;
  disabled?: boolean;
}) => {
  return (
    <button
      disabled={disabled ? true : false}
      type="button"
      className={`
        ${size === "large" ? "w-[230px]" : "px-[14px]"} ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {text}
    </button>
  );
};

export { ButtonText };
