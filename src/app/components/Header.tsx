"use client";
import Nav from "./Nav";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { useContext } from "react";
import { MobileNavDispatchContext, MobileNavContext } from "./NavContext";

const Header = () => {
  const mobileNavIsActive = useContext(MobileNavContext);
  const dispatch = useContext(MobileNavDispatchContext);
  const toggleMobileNav = () => {
    if (dispatch) dispatch();
  };
  return (
    <header
      className={`flex justify-center w-full mx-auto  ${
        mobileNavIsActive ? "h-screen overflow-y-auto" : ""
      }`}
    >
      <div className="flex flex-wrap sm:flex-nowrap justify-between items-center max-w-screen-2xl w-full">
        <Link
          href="/"
          className="logo flex items-center min-w-[80px] lg:min-w-[250px] "
        >
          LH
        </Link>
        <MobileMenu toggleMobileNav={toggleMobileNav} />
        <Nav />
      </div>
    </header>
  );
};
export default Header;
