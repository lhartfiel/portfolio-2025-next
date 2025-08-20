import { ButtonSize } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const arrowIcon = (
  <FontAwesomeIcon icon={faArrowRight} className="text-intro-sm" />
);
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
    <p
      className={`group relative flex items-center justify-center
        ${size === "large" ? "w-[230px] py-[9px]" : "py-[7px] px-[14px]"} ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {text}
      {size === "large" && !disabled && (
        <span className="opacity-0 absolute transition-all duration-300 right-[32px] group-hover:right-4 group-hover:opacity-100 h-[20px]">
          {arrowIcon}
        </span>
      )}
    </p>
  );
};

export { ButtonText };
