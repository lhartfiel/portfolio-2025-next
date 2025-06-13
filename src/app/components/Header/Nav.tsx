"use client";
import Link from "next/link";
import { useContext } from "react";
import { MobileNavContext, MobileNavDispatchContext } from "./NavContext";
import { SocialLinks } from "../SocialLinks";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const arrowIcon = (
  <FontAwesomeIcon icon={faArrowRight} className="text-intro-sm" />
);

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
  const pathname = usePathname();

  return (
    <nav
      className={`flex flex-wrap ${
        mobileNavIsActive ? "h-full" : "h-auto"
      } relative z-10 sm:flex-nowrap items-start lg:items-center justify-end sm:justify-evenly w-full`}
    >
      <div
        data-testid="nav-items"
        className={`nav-items w-full overflow-y-auto justify-between sm:flex flex-col sm:flex-row sm:items-center sm:justify-end py-4 text-primary text-body md:text-[28px] font-medium ${
          mobileNavIsActive
            ? "flex flex-wrap right-6 text-white md:text-primary md:flex-nowrap pl-8"
            : "max-sm:hidden right-full"
        }`}
      >
        {navItems.map((item) => {
          return (
            <Link
              key={item.text}
              className={`group flex justify-between relative z-10 sm:mr-[50px]
                ${
                  mobileNavIsActive &&
                  pathname === item.link &&
                  " text-tertiary before:absolute before:w-[6px] before:h-[6px] before:-left-3 before:z-10 before:rounded-full before:top-[50%] before:translate-y-[50%] before:bg-tertiary"
                }
                ${
                  mobileNavIsActive
                    ? "pt-9 pb-5 border-b-[0.5px] border-b-white md:p-0"
                    : `${
                        pathname === item.link
                          ? "before:h-1 before:bg-tertiary before:w-full before:absolute before:-bottom-1 cursor-default"
                          : "before:h-1 before:bg-transparent before:transition-all before:duration-400 before:absolute before:w-full before:bottom-4 hover:before:bg-primary hover:before:-bottom-1"
                      } `
                }`}
              href={item.link}
              onClick={() => {
                if (dispatch && mobileNavIsActive) dispatch();
              }}
            >
              {item.text}
              {mobileNavIsActive && pathname !== item.link && (
                <span className="inline-block relative transition-all duration-300 -left-4 group-hover:left-0 opacity-0 pr-8 group-hover:pr-0 group-hover:opacity-100 text-white">
                  {arrowIcon}
                </span>
              )}
            </Link>
          );
        })}
      </div>
      {mobileNavIsActive && (
        <div className="flex flex-nowrap justify-center w-full mt-12 md:hidden">
          <SocialLinks />
        </div>
      )}
    </nav>
  );
};

export { Nav };
