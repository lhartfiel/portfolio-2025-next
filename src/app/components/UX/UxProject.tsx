"use client";
import { sanitize } from "@/utils/sanitize";
import parse from "html-react-parser";
import { Button } from "../Button";
import Image from "next/image";
import useScreenSize from "src/app/hooks/useScreenSize";
import { getFullImageUrl } from "@/utils/getImagePath";

type Project = {
  duration: string;
  excerpt: string;
  excerptImage?: string | null;
  intro: string;
  projectType: string;
  role: string;
  slug: string;
  title: string;
};

const UxProject = ({ projects }: { projects: Project[] }) => {
  const lgSize = useScreenSize("lg");
  return (
    <section className="grid items-start justify-center grid-cols-4 md:grid-cols-12 xl:[grid-template-columns:repeat(12,72px)] mx-auto gap-x-6 md:gap-y-6 px-6 py-7 md:py-11">
      <h2 className="col-span-full text-black text-h2-sm md:text-h2 font-kanit font-bold text-center md:text-center w-full mb-4">
        UX Projects
      </h2>
      <div className="flex flex-wrap justify-center items-start col-span-full lg:col-span-10 lg:col-start-2 gap-11 lg:gap-14">
        {projects &&
          projects.map((project, idx) => {
            return (
              <div
                data-testid="project"
                key={project.title}
                className="relative flex flex-wrap md:flex-nowrap w-full justify-center items-stretch text-primary border-1 border-portfolio-gray-light shadow rounded-lg"
              >
                <div
                  data-testid="number"
                  className="flex-shrink-0 absolute z-10 flex justify-center items-center -top-4 -left-4 lg:-left-6 bg-tertiary font-kanit text-primary text-2xl lg:text-[32px] w-9 h-9 lg:w-11 lg:h-11 rounded-full"
                >
                  {idx + 1}
                </div>
                {project?.excerptImage && project.excerptImage.length > 0 && (
                  <div
                    data-testid="img-wrapper"
                    className={`relative overflow-hidden h-[200px] md:h-[450px] w-full md:w-2/3 ${
                      (idx + 1) % 2 === 0 ? "md:order-2" : "md:order-1"
                    }`}
                  >
                    <Image
                      src={getFullImageUrl(project.excerptImage)}
                      alt={"Page Image"}
                      fill
                      sizes={
                        "(max-width: 768px) 500px, (max-width: 1200px) 620px"
                      }
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                      }}
                    />
                  </div>
                )}
                <div
                  data-testid="project-content"
                  className={`flex flex-col justify-start bg-portfolio-gray-light items-start mt-4 md:mt-0 w-full md:w-1/3 p-6  ${
                    (idx + 1) % 2 === 0 ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <h3 className="text-h3-sm md:text-h3 font-semibold mb-4">
                    {project.title}
                  </h3>
                  {project.excerpt && (
                    <span
                      data-testid="project-excerpt"
                      className="mb-8 text-black"
                    >
                      {parse(sanitize(project.excerpt))}
                    </span>
                  )}
                  <Button
                    size={`${lgSize ? "large" : "small"}`}
                    type="primary"
                    text="View More"
                    link={`ux/${project.slug}`}
                    customClass="mx-auto "
                  ></Button>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export { UxProject };
