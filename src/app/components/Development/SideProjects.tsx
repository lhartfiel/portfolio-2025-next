"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import { SkillType } from "./Projects";
import { SkillsTag } from "./SkillsTag";
import parse, {
  domToReact,
  Element,
  HTMLReactParserOptions,
  DOMNode,
} from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ButtonLink } from "../ButtonLink";
import { getFullImageUrl } from "@/utils/getImagePath";
import styles from "./development.module.scss";

const arrowRight = (
  <FontAwesomeIcon
    className="flex self-center relative z-10 text-h3 text-white"
    icon={faArrowRight}
  />
);

type SideProjectType = {
  order: number;
  image: string;
  imageAlt: string;
  moreinfoHeading?: string;
  moreinfoDescription?: string;
  sideprojectDescription: string;
  sideprojectTitle: string;
  skill: SkillType[];
  webUrl: string;
};

const SideProjects = ({
  heading,
  sideprojects,
}: {
  heading: string;
  sideprojects: SideProjectType[];
}) => {
  const [showAllContent, setShowAllContent] = useState<Record<string, boolean>>(
    {}
  );

  const sortedSideprojects = useMemo(
    () =>
      [...sideprojects].sort(
        (a: SideProjectType, b: SideProjectType) => a?.order - b?.order
      ),
    [sideprojects]
  );

  const transformLink: HTMLReactParserOptions["replace"] = (node: DOMNode) => {
    // Prevent links within richtext from bubbling to parent button when clicked
    if (node.type === "tag" && node.name === "a") {
      const el = node as Element;
      return (
        <a
          {...el.attribs}
          onClick={(e) => {
            e.stopPropagation();
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          {domToReact(el.children as DOMNode[], { replace: transformLink })}
        </a>
      );
    }

    return undefined;
  };

  const readMoreHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    title: string
  ) => {
    e.stopPropagation();
    e.preventDefault();
    setShowAllContent((prev) => {
      return {
        ...prev,
        [title]: !prev[title],
      };
    });
  };
  return (
    <section className="text-black grid items-start justify-center grid-cols-4 md:grid-cols-12 xl:[grid-template-columns:repeat(12,72px)] mx-auto gap-x-6 md:gap-y-6 px-6 pb-7 md:pb-11">
      {heading && (
        <h2 className="col-span-full text-black text-h2-sm md:text-h2 font-kanit font-bold text-left md:text-center w-full mb-4">
          {heading}
        </h2>
      )}
      <div
        className={`grid grid-cols-subgrid md:h-auto md:flex-wrap items-start col-span-full gap-x-6 gap-y-12 overflow-hidden`}
      >
        {sortedSideprojects.map((project) => {
          const rawDescription = project?.sideprojectDescription || "";
          const truncatedDescription =
            rawDescription.length > 320
              ? rawDescription.substring(0, 320) + "..."
              : rawDescription;
          return (
            <button
              onClick={() => window.open(project.webUrl)}
              className={`side-project transition duration-300 ease-in-out group grid grid-cols-subgrid col-span-full md:col-start-1 lg:col-start-2 relative bg-transparent overflow-hidden hover:cursor-pointer hover:shadow-card text-left my-4 mx-2`}
              key={project.sideprojectTitle}
            >
              <div className="relative col-span-full lg:col-span-7 lg:col-start-1 h-[350px] md:h-full aspect-[16/11] w-full overflow-hidden">
                <Image
                  src={getFullImageUrl(project.image)}
                  alt={project.imageAlt}
                  className="transition duration-400 group-hover:scale-105"
                  fill
                  sizes="(max-width: 768px) 100vw, 900px"
                  style={{
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                ></Image>
              </div>
              <div className="flex flex-wrap items-between col-span-full col-start-1 lg:col-span-4 lg:col-start-8 mt-6 md:mt-0 bg-white p-3 pb-4">
                <span>
                  {project.sideprojectTitle && (
                    <h3 className="min-w-0 break-words text-wrap text-h3-sm md:text-h3 md:ml-0 mb-2 font-bold">
                      {project.sideprojectTitle}
                    </h3>
                  )}
                  {truncatedDescription && (
                    <span
                      suppressHydrationWarning
                      className={`${styles.sideproject} text-body-sm mt-4 lg:mt-0`}
                    >
                      {showAllContent[project.sideprojectTitle]
                        ? parse(rawDescription, {
                            replace: transformLink,
                          })
                        : parse(truncatedDescription, {
                            replace: transformLink,
                          })}
                    </span>
                  )}
                  {truncatedDescription.length > 320 ? (
                    <ButtonLink
                      buttonText={
                        showAllContent[project.sideprojectTitle]
                          ? "Read Less"
                          : "Read More"
                      }
                      customClass="relative justify-end text-right text-[16px] text-primary font-semibold mt-2 z-20"
                      callback={(e) =>
                        readMoreHandler(e, project.sideprojectTitle)
                      }
                    />
                  ) : (
                    ""
                  )}
                  <div className="flex flex-wrap tags mt-6">
                    {project.skill.map((skillTag: SkillType) => (
                      <SkillsTag key={skillTag?.type} tag={skillTag} />
                    ))}
                  </div>
                </span>
                <span className="relative z-100 my-4 md:my-0 transition-[width, opacity] duration-400 ease-in-out flex justify-center self-end relative text-right rounded-full bg-primary max-w-[32px] h-[32px] ml-auto p-2 group-hover:max-w-[260px] group-hover:shadow-lg">
                  <p className="relative transition-all duration-400 ease-in-out overflow-hidden whitespace-nowrap max-w-0 opacity-0 group-hover:max-w-[200px] group-hover:px-2 group-hover:opacity-100 text-white font-semibold text-body-min-sm leading-[18px]">
                    Go to website
                  </p>
                  {arrowRight}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export { SideProjects };
