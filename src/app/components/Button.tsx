import Link from "next/link";
import { ButtonText } from "./ButtonText";

export type ButtonSize = "small" | "large";

const Button = ({
  type,
  size,
  text,
  link,
  disabled,
  callback,
  customClass,
}: {
  type: string;
  size: ButtonSize;
  text: string;
  link?: string;
  disabled?: boolean;
  callback?: () => void;
  customClass?: string;
}) => {
  return (
    <>
      {link !== undefined ? (
        <Link
          href={link}
          className={`relative inline-block font-kanit font-bold rounded-[20px] transition duration-300 ease-in-out
          ${customClass ? customClass : ""}
          ${size === "large" ? "py-[9px]" : "py-[7px] px-[14px]"}
        ${
          type === "primary"
            ? "bg-accent border-1 border-accent text-black"
            : "bg-white border-1 border-accent text-accent hover:bg-accent hover:text-white "
        }`}
        >
          <ButtonText text={text} size={size} />
        </Link>
      ) : (
        <a
          onClick={() => (callback ? callback() : null)}
          className={`relative inline-block font-kanit font-bold justify-center rounded-[20px] transition duration-300 ease-in-out
            ${customClass ? customClass : ""}
          ${size === "large" ? "py-[9px]" : "py-[7px] px-[14px]"}
        ${
          type === "primary" && !disabled
            ? "bg-accent border-1 border-accent text-black"
            : !disabled &&
              "bg-white border-1 border-accent text-accent hover:bg-accent hover:text-white "
        }
        ${disabled ? "bg-portfolio-gray cursor-not-allowed text-black" : ""}
        `}
        >
          <ButtonText text={text} size={size} disabled={disabled} />
        </a>
      )}
    </>
  );
};

export { Button };
