"use client";
import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHouse } from "@fortawesome/free-solid-svg-icons";

// const houseIcon = <FontAwesomeIcon icon={faHouse} className="w-4 mr-2" />;
const navItems = [
  { link: "/development", text: "Development" },
  { link: "/ux", text: "UX" },
  { link: "/blog", text: "Blog" },
  { link: "/about", text: "About" },
  { link: "/contact", text: "Contact" },
];

const Nav = ({ mobileNavIsActive }: { mobileNavIsActive: boolean }) => {
  return (
    <nav className="flex flex-wrap sm:flex-nowrap items-center justify-end sm:justify-evenly w-full">
      <div
        data-testid="nav-items"
        className={`nav-items w-full justify-between sm:flex flex-col sm:flex-row sm:items-center sm:justify-end py-4 text-primary text-body md:text-[28px] font-medium ${
          mobileNavIsActive ? "flex flex-wrap ml-0" : "max-sm:hidden"
        }`}
      >
        {navItems.map((item) => {
          return (
            <Link
              key={item.text}
              className={`sm:mr-[50px] ${mobileNavIsActive ? "py-3" : ""}`}
              href={item.link}
            >
              {item.text}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;
