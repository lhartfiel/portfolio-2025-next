"use client";
import { useContext } from "react";
import { MobileNavContext } from "./NavContext";

const MobileMenu = ({ toggleMobileNav }: { toggleMobileNav: () => void }) => {
  const mobileNavIsActive = useContext(MobileNavContext);
  return (
    <button
      className="sm:hidden flex flex-wrap justify-end relative w-11 h-8 m-4"
      onClick={() => toggleMobileNav()}
    >
      <div
        data-testid="mobile-line1"
        className={`line absolute w-11 h-1 bg-primary border-primary border-1 rounded-sm ${
          mobileNavIsActive
            ? "transition delay-[100] duration-150 ease-in-out top-2 rotate-45 bg-white border-white"
            : "top-0"
        }`}
      ></div>
      <div
        className={`line absolute top-2 h-1 bg-primary border-primary border-1 rounded-sm  ${
          mobileNavIsActive ? "transition ease-in-out w-0 " : "top-2 w-11"
        }`}
      ></div>
      <div
        className={`line absolute w-11 h-1 bg-primary border-primary border-1 rounded-sm ${
          mobileNavIsActive
            ? "transition delay-[100] duration-150 ease-in-out top-2 -rotate-45 bg-white border-white"
            : "top-4"
        }`}
      ></div>
    </button>
  );
};
export default MobileMenu;
