"use client";
import Link from "next/link";
import { useContext } from "react";
import { MobileNavContext, MobileNavDispatchContext } from "./NavContext";
import SocialLinks from "./SocialLinks";

const navItems = [
  { link: "/development", text: "Development" },
  { link: "/ux", text: "UX" },
  { link: "/blog", text: "Blog" },
  { link: "/about", text: "About" },
  { link: "/contact", text: "Contact" },
];

const Nav = () => {
  const mobileNavIsActive = useContext(MobileNavContext);
  const dispatch = useContext(MobileNavDispatchContext);
  return (
    <nav className="flex flex-wrap h-full relative z-10 sm:flex-nowrap items-center justify-end sm:justify-evenly w-full">
      <div
        data-testid="nav-items"
        className={`nav-items w-full overflow-y-auto justify-between sm:flex flex-col sm:flex-row sm:items-center sm:justify-end py-4 text-primary text-body md:text-[28px] font-medium ${
          mobileNavIsActive
            ? "flex flex-wrap right-6 text-white ml-8"
            : "max-sm:hidden right-full"
        }`}
      >
        {navItems.map((item) => {
          return (
            <Link
              key={item.text}
              className={`sm:mr-[50px] ${
                mobileNavIsActive
                  ? "pt-9 pb-5 border-b-[0.5px] border-b-white"
                  : ""
              }`}
              href={item.link}
              onClick={() => {
                if (dispatch) dispatch();
              }}
            >
              {item.text}
            </Link>
          );
        })}
      </div>
      {mobileNavIsActive && (
        <div className="flex flex-nowrap justify-center w-full mt-12">
          <SocialLinks />
        </div>
      )}
    </nav>
  );
};

export default Nav;
