"use client";

const MobileMenu = ({
  toggleMobileNav,
  mobileNavIsActive,
}: {
  toggleMobileNav: () => void;
  mobileNavIsActive: boolean;
}) => {
  return (
    <button
      className="sm:hidden flex flex-wrap justify-end relative w-11 h-8 mt-2"
      onClick={() => toggleMobileNav()}
    >
      <div
        data-testid="mobile-line1"
        className={`line absolute w-11 h-[3px] bg-gray-500 border-gray-500 border-1 rounded-sm ${
          mobileNavIsActive
            ? "transition delay-[100] duration-150 ease-in-out top-2 rotate-45"
            : "top-0"
        }`}
      ></div>
      <div
        className={`line absolute top-2 h-[3px] bg-gray-500 border-gray-500 border-1 rounded-sm ${
          mobileNavIsActive ? "transition ease-in-out w-0" : "top-2 w-11"
        }`}
      ></div>
      <div
        className={`line absolute w-11 h-[3px] bg-gray-500 border-gray-500 border-1 rounded-sm ${
          mobileNavIsActive
            ? "transition delay-[100] duration-150 ease-in-out top-2 -rotate-45"
            : "top-4"
        }`}
      ></div>
    </button>
  );
};
export default MobileMenu;
