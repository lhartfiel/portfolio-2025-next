"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import {
  faBookOpenReader,
  faGlobe,
  faCookieBite,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import parse from "html-react-parser";
import ButtonLink from "../ButtonLink";
import { useState, useCallback } from "react";

const iconMap = { faPersonRunning, faBookOpenReader, faGlobe, faCookieBite };
library.add(faPersonRunning, faBookOpenReader, faGlobe, faCookieBite);

type Interest = {
  name: string;
  icon: string;
  heading: string;
  description: string;
};
const AboutInterests = ({ interests }: { interests: [Interest] }) => {
  const [showAllContent, setShowAllContent] = useState<Record<string, boolean>>(
    {}
  );

  const readMoreHandler = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, key: string) => {
      e.preventDefault();
      setShowAllContent((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    },
    []
  );
  return (
    <section className="grid items-start justify-center grid-cols-4 md:grid-cols-12 xl:[grid-template-columns:repeat(12,72px)] mx-auto gap-x-6 md:gap-y-6 px-6 py-7 md:py-11">
      {interests.map((interest, idx) => {
        const aboutIcon =
          interest.icon in iconMap
            ? iconMap[interest.icon as keyof typeof iconMap]
            : undefined;
        const truncatedDescription = `${interest.description.substring(
          0,
          245
        )}...`;
        return (
          <div
            className={`relative md:min-h-[375px] lg:min-h-[440px] xl:min-h-[415px] h-auto flex flex-wrap col-span-4 md:col-span-5 lg:col-span-3 border-2 border-primary px-6 pb-5
              ${
                idx % 2 === 0
                  ? "bg-white text-blac md:col-start-2 "
                  : "bg-primary text-white"
              } `}
            key={interest.name}
          >
            <div
              className={`md:hidden divider border-l-1 border-dashed absolute top-0 bottom-0 left-[42px] ${
                idx % 2 === 0 ? "text-primary" : "text-tertiary"
              }`}
            ></div>
            <div
              className={`icon flex justify-center items-center absolute -top-[18px] md:-left-[22px] rounded-full text-[24px] md:text-[42px] w-9 h-9 md:w-[64px] md:h-[64px] ${
                idx % 2 === 0
                  ? "bg-primary text-tertiary "
                  : "bg-tertiary text-primary"
              }`}
            >
              {aboutIcon && (
                <FontAwesomeIcon
                  icon={aboutIcon}
                  className="relative mx-auto"
                />
              )}
            </div>
            <span className="pl-[60px] md:pl-0">
              <h3 className="text-h3-sm md:text-h3 pt-4 md:pt-13 font-bold">
                {interest.heading}
              </h3>
              <span className="transition duration-300 transition-ease-in-out">
                {showAllContent[interest.name]
                  ? parse(interest.description)
                  : parse(truncatedDescription)}
              </span>
            </span>
            <ButtonLink
              buttonText={
                showAllContent[interest.name] ? "Read Less" : "Read More"
              }
              callback={(e) => readMoreHandler(e, interest.name)}
              customClass={`block mt-auto ml-auto pt-4 text-right ${
                idx % 2 === 0 ? "text-primary " : "text-text-white"
              }`}
            ></ButtonLink>
          </div>
        );
      })}
    </section>
  );
};

export default AboutInterests;
