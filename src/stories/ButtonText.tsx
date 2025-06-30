import { ButtonSize } from "../app/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export interface ButtonTextProps {
  text: string;
  size: ButtonSize;
  disabled?: boolean;
}

const arrowIcon = (
  <FontAwesomeIcon
    icon={faArrowRight}
    className="text-intro-sm leading-[20px]"
  />
);
export const ButtonText = ({
  text,
  size,
  disabled = false,
}: ButtonTextProps) => {
  const truncatedText = text?.length > 16 ? `${text.slice(0, 16)}...` : text;
  return (
    <p
      className={`group relative flex items-center justify-center
        ${size === "large" ? "w-[230px] py-[9px]" : "py-[7px] px-[14px]"} ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {truncatedText}
      {size === "large" && !disabled && (
        <span className="opacity-0 absolute h-[20px] transition-all duration-300 right-[32px] group-hover:right-4 group-hover:opacity-100 ">
          {arrowIcon}
        </span>
      )}
    </p>
  );
};
