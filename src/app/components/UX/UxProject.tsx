import parse from "html-react-parser";
import { Button } from "../Button";
import Image from "next/image";

type Project = {
  duration: string;
  excerpt: string;
  excerptImage: string;
  intro: string;
  projectType: string;
  role: string;
  slug: string;
  title: string;
};
const UxProject = ({ projects }: { projects: [Project] }) => {
  return (
    <section className="grid items-start justify-center grid-cols-4 md:grid-cols-12 xl:[grid-template-columns:repeat(12,72px)] mx-auto gap-x-6 md:gap-y-6 px-6 py-7 md:py-11">
      <h2 className="col-span-full text-black text-h2-sm md:text-h2 font-kanit font-bold text-left md:text-center w-full mb-4">
        UX Projects
      </h2>
      <div className="flex flex-wrap justify-center md:h-full md:flex-nowrap items-start col-span-full lg:col-span-10 lg:col-start-2 gap-11 lg:gap-14">
        {projects &&
          projects.map((project) => {
            return (
              <div
                key={project.title}
                className="flex flex-wrap justify-center text-black shadow w-1/3"
              >
                {project.excerptImage && (
                  <div className="relative overflow-hidden h-[200px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${project.excerptImage}/`}
                      alt={"Page Image"}
                      width={600}
                      height={400}
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                      }}
                    />
                  </div>
                )}
                <div className="flex flex-wrap justify-start p-6">
                  <h3 className="text-h3-sm md:text-h3 font-semibold">
                    {project.title}
                  </h3>
                  <span>{parse(project.excerpt)}</span>
                  <Button
                    size="large"
                    type="primary"
                    text="View More"
                    link={`ux/${project.slug}`}
                    customClass="mx-auto mt-8"
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
