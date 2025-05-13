"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const houseIcon = <FontAwesomeIcon icon={faHouse} className="w-4 mr-2" />;

const Nav = ({ mobileNavIsActive }: { mobileNavIsActive: boolean }) => {
  return (
    <nav className="flex flex-wrap sm:flex-nowrap items-center justify-end sm:justify-evenly w-full">
      <div
        data-testid="nav-items"
        className={`nav-items w-full justify-between sm:flex flex-col sm:flex-row sm:items-center sm:justify-evenly py-4 text-gray-800 ${
          mobileNavIsActive ? "flex flex-wrap ml-0" : "max-sm:hidden"
        }`}
      >
        <Link className={`${mobileNavIsActive ? "py-3" : ""}`} href="/">
          {houseIcon} Home
        </Link>
        <Link className={`${mobileNavIsActive ? "py-3" : ""}`} href="/about">
          About
        </Link>
        <Link
          className={`${mobileNavIsActive ? "py-3" : ""}`}
          href="/development"
        >
          Development
        </Link>
        <Link className={`${mobileNavIsActive ? "py-3" : ""}`} href="/ux">
          UX
        </Link>
        <Link className={`${mobileNavIsActive ? "py-3" : ""}`} href="/blog">
          Blog
        </Link>
        <Link className={`${mobileNavIsActive ? "py-3" : ""}`} href="/contact">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
