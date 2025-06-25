"use client";
import { Nav } from "./Nav";
import Link from "next/link";
import Image from "next/image";
import { MobileMenu } from "./MobileMenu";
import { useContext } from "react";
import { MobileNavDispatchContext, MobileNavContext } from "./NavContext";

const Header = () => {
  const mobileNavIsActive = useContext(MobileNavContext);
  const dispatch = useContext(MobileNavDispatchContext);
  const toggleMobileNav = () => {
    if (dispatch) dispatch();
  };
  const logoSrc = mobileNavIsActive
    ? "/assets/logo-inverse.svg"
    : "/assets/logo-main.svg";
  return (
    <header
      className={`flex justify-center w-full mx-auto bg-white shadow lg:z-10  ${
        mobileNavIsActive ? "h-screen overflow-y-auto md:h-auto" : "h-auto z-10"
      }`}
    >
      <div className="flex flex-wrap sm:flex-nowrap justify-between items-center max-w-screen-2xl w-full">
        <Link
          data-testid="logo"
          href="/"
          onClick={() => {
            if (dispatch && mobileNavIsActive) dispatch();
          }}
          className="logo flex items-center min-w-[80px] lg:min-w-[250px] py-2 px-4 z-20"
        >
          <Image
            src={logoSrc}
            width={60}
            height={60}
            alt="Logo with initials LH"
          />
        </Link>
        <MobileMenu toggleMobileNav={toggleMobileNav} />
        <Nav />
      </div>
    </header>
  );
};
export { Header };
