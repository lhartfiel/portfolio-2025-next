import { ButtonSize } from "./Button";

const ButtonText = ({ text, size }: { text: string; size: ButtonSize }) => {
  return (
    <button
      type="button"
      className={`cursor-pointer
        ${size === "large" ? "w-[230px]" : "px-[14px]"}`}
    >
      {text}
    </button>
  );
};

export { ButtonText };
