"use client";
import parse from "html-react-parser";
import { useState, useCallback } from "react";
import ButtonLink from "../ButtonLink";

type Project = {
  order: number;
  projectDescription: string;
  projectTitle: string;
  skill: [{ type: string }];
};

const Projects = ({
  heading,
  projects,
}: {
  heading: string;
  projects: [Project];
}) => {
  const [showAllContent, setShowAllContent] = useState<Record<string, boolean>>(
    {}
  );
  // TODO: Add the numbers next to the projects and align each column

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

  function stripHtml(html: string) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }
  return (
    <section className="grid items-start justify-center grid-cols-4 md:grid-cols-12 xl:[grid-template-columns:repeat(12,72px)] mx-auto gap-x-6 md:gap-y-6 px-6 py-7 md:py-11">
      {heading && (
        <h2 className="col-span-full text-h2-sm md:text-h2 font-kanit font-bold text-left md:text-center w-full mb-4">
          {heading}
        </h2>
      )}
      <div className="flex flex-wrap md:flex-nowrap items-start col-span-full lg:col-span-10 lg:col-start-2 gap-11 lg:gap-14">
        {projects.map((project) => {
          const rawDescription = project?.projectDescription || "";
          const cleanText = stripHtml(rawDescription);
          const truncatedDescription =
            cleanText.length > 120
              ? cleanText.substring(0, 120) + "..."
              : cleanText;

          return (
            <div
              key={project.order}
              className="flex flex-wrap w-full md:w-1/3 text-black"
            >
              <h3 className="text-h3-sm lg:text-h3 font-semibold">
                {project.projectTitle}
              </h3>
              <span className="text-body-sm lg:text-body">
                {showAllContent[project.projectTitle]
                  ? parse(project.projectDescription)
                  : parse(truncatedDescription)}

                {cleanText.length > 120 ? (
                  <ButtonLink
                    buttonText="Read More"
                    customClass="block text-right text-[16px] text-primary font-semibold mt-2"
                    callback={(e) => readMoreHandler(e, project.projectTitle)}
                  />
                ) : (
                  ""
                )}
              </span>
              <div className="flex flex-wrap tags mt-12">
                {project.skill.map((skillTag) => {
                  return (
                    <span
                      key={skillTag.type}
                      className="bg-primary text-white font-medium text-[12px] px-2 py-1 mr-3 mb-4"
                    >
                      {skillTag.type}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default Projects;
