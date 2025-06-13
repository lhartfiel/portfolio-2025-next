"use client";
import { useState } from "react";
import parse from "html-react-parser";
import useScreenSize from "../hooks/useScreenSize";
import { ButtonLink } from "./ButtonLink";
import striptags from "striptags";

const PageAbout = ({
  aboutHeading,
  aboutDescription,
  truncateLength = 600,
}: {
  aboutHeading?: string;
  aboutDescription: string;
  truncateLength: number;
}) => {
  const [showMore, setShowMore] = useState(false);
  const screenSize = useScreenSize("sm");
  const truncatedText =
    striptags(aboutDescription, ["p", "br"]).substring(0, truncateLength) +
    "...";

  const toggleButton = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setShowMore((prev) => !prev);
  };
  return (
    <section className="relative z-10 col-span-4 px-6 grid grid-cols-4 md:grid-cols-12 gap-x-6 w-full justify-center items-center border-t-primary border-t-[10px] bg-secondary text-black py-7 md:py-11">
      {aboutHeading && (
        <h2 className="col-span-4 md:col-span-12 lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3 text-h2-sm md:text-h2 font-kanit font-bold text-center w-full mb-4">
          {aboutHeading}
        </h2>
      )}
      {aboutDescription && (
        <span className="abt-description text-body-sm md:text-body sm:columns-2 col-span-4 md:col-span-12 lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3 gap-7">
          {screenSize ? (
            parse(aboutDescription)
          ) : (
            <>
              {showMore ? parse(aboutDescription) : parse(truncatedText)}
              <ButtonLink
                buttonText={showMore ? "Read Less" : "Read More"}
                customClass="justify-end text-primary mt-4"
                callback={toggleButton}
              />
            </>
          )}
        </span>
      )}
    </section>
  );
};

export { PageAbout };
