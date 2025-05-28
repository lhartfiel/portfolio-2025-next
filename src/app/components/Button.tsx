import Link from "next/link";
import ButtonText from "./ButtonText";

export type ButtonSize = "small" | "large";

const Button = ({
  type,
  size,
  text,
  link,
  callback,
  customClass,
}: {
  type: string;
  size: ButtonSize;
  text: string;
  link?: string;
  callback?: () => void;
  customClass?: string;
}) => {
  console.log("link", link);
  return (
    <>
      {link !== undefined ? (
        <Link
          href={link}
          className={`relative font-semibold rounded-[20px] transition duration-300 ease-in-out
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
        <div
          onClick={() => (callback ? callback() : null)}
          className={`relative font-semibold justify-center rounded-[20px] transition duration-300 ease-in-out
            ${customClass ? customClass : ""}
          ${size === "large" ? "py-[9px]" : "py-[7px] px-[14px]"}
        ${
          type === "primary"
            ? "bg-accent border-1 border-accent text-black"
            : "bg-white border-1 border-accent text-accent hover:bg-accent hover:text-white "
        }`}
        >
          <ButtonText text={text} size={size} />
        </div>
      )}
    </>
  );
};

export default Button;
