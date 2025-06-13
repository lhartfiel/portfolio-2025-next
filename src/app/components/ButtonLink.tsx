"use client";
import { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const ButtonLink = ({
  buttonText,
  customClass,
  callback,
}: {
  buttonText: string;
  customClass: string;
  callback: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}) => {
  const [clickIcon, setClickIcon] = useState(false);
  const clickHandler = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      setClickIcon((prev) => !prev);
      if (callback) callback(e);
    },
    [callback]
  );

  return (
    <>
      <a
        href="#"
        className={`flex w-full text-link-wrapper body-sm font-semibold ${customClass}`}
        onClick={clickHandler}
      >
        <span className="text-link relative">{buttonText}</span>
        <span className="arrow-down ml-2">
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`ml-1 transition duration-300 ${
              clickIcon ? "rotate-180" : "rotate-0"
            }`}
          />
        </span>
      </a>
    </>
  );
};

export { ButtonLink };
