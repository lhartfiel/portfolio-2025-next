type ButtonSize = "small" | "large";
import Link from "next/link";

const Button = ({
  type,
  size,
  text,
  link,
}: {
  type: string;
  size: ButtonSize;
  text: string;
  link: string;
}) => {
  return (
    <Link
      href={link}
      className={`relative font-semibold rounded-[20px] transition duration-300 ease-in-out
        ${size === "large" ? "py-[9px]" : "py-[7px] px-[14px]"}
      ${
        type === "primary"
          ? "bg-accent border-1 border-accent text-black"
          : "bg-white border-1 border-accent text-accent hover:bg-accent hover:text-white "
      }`}
    >
      <button
        type="button"
        className={`cursor-pointer
      ${size === "large" ? "w-[230px] py-[9px]" : "py-[7px] px-[14px]"}`}
      >
        {text}
      </button>
    </Link>
  );
};

export default Button;
