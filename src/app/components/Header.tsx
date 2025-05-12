"use client";
import Nav from "./Nav";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { useState } from "react";

const Header = () => {
  const [mobileNavIsActive, setMobileNavIsActive] = useState(false);
  const toggleMobileNav = () => {
    setMobileNavIsActive((prev) => !prev);
  };
  return (
    <header className="flex justify-center w-full mx-auto">
      <div className="flex flex-wrap sm:flex-nowrap justify-between items-center max-w-screen-2xl w-full">
        <Link
          href="/"
          className="logo flex items-center min-w-[80px] lg:min-w-[250px]"
        >
          LH
        </Link>
        <MobileMenu
          toggleMobileNav={toggleMobileNav}
          mobileNavIsActive={mobileNavIsActive}
        />
        <Nav mobileNavIsActive={mobileNavIsActive} />
      </div>
    </header>
  );
};
export default Header;
