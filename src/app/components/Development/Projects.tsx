"use client";
import parse from "html-react-parser";
import { useState, useCallback } from "react";
import { ButtonLink } from "../ButtonLink";
import { sanitize } from "isomorphic-dompurify";

type Project = {
  order?: number | null;
  projectDescription: string;
  projectTitle: string;
  skill: { type: string }[];
};

const Projects = ({
  heading,
  projects,
}: {
  heading: string;
  projects: Project[];
}) => {
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
      {heading && (
        <h2 className="col-span-full text-black text-h2-sm md:text-h2 font-kanit font-bold text-left md:text-center w-full mb-4">
          {heading}
        </h2>
      )}
      <div className="flex flex-wrap md:h-auto md:flex-nowrap items-start col-span-full lg:col-span-10 lg:col-start-2 gap-11 lg:gap-14">
        {projects?.length > 0 &&
          projects.map((project, idx) => {
            const rawDescription = project?.projectDescription || "";
            const cleanText = sanitize(rawDescription);
            const truncatedDescription =
              cleanText.length > 120
                ? cleanText.substring(0, 120) + "..."
                : cleanText;

            return (
              <div
                data-testid="project"
                key={`${project.order}-${project.projectTitle}`}
                className="flex flex-wrap md:min-h-[375px] lg:min-h-[440px] xl:min-h-[415px] h-auto justify-start items-start relative w-full md:w-1/3 text-black"
              >
                <span className="flex items-start">
                  <div
                    data-testid="order-number"
                    className="relative flex-shrink-0 lg:absolute flex justify-center items-center lg:-top-4 lg:-left-14 bg-tertiary font-kanit text-primary text-2xl lg:text-[32px] w-9 h-9 lg:w-11 lg:h-11 rounded-full"
                  >
                    {project.order ?? idx + 1}
                  </div>
                  <h3 className="min-w-0 break-words text-wrap text-h3-sm lg:text-h3 font-semibold ml-4 lg:ml-0 mb-2">
                    {project.projectTitle}
                  </h3>
                </span>
                <span className="text-body-sm lg:text-body mt-4 lg:mt-0">
                  <span data-testid="project-desc">
                    {showAllContent[project.projectTitle] &&
                    project.projectDescription
                      ? parse(project.projectDescription)
                      : parse(truncatedDescription)}
                  </span>
                  {cleanText.length > 120 ? (
                    <ButtonLink
                      buttonText={
                        showAllContent[project.projectTitle]
                          ? "Read Less"
                          : "Read More"
                      }
                      customClass="justify-end text-[16px] text-primary font-semibold mt-2"
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
                        data-testid="project-skill"
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
export { Projects };
