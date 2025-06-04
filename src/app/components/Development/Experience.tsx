"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCode,
  faToolbox,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import useScreenSize from "src/app/hooks/useScreenSize";

library.add(faCode, faToolbox, faListCheck);

const iconMap = {
  faCode,
  faToolbox,
  faListCheck,
};
type Skills = {
  heading: string;
  description: string;
  icon: string;
  skillIcon: [
    {
      type: string;
    }
  ];
};

const Experience = ({
  heading,
  subheading,
  skills,
}: {
  heading: string;
  subheading: string;
  skills: [Skills];
}) => {
  const mediumScreen = useScreenSize("md");
  return (
    <section className="relative z-10 col-span-4 px-6 grid grid-cols-4 md:grid-cols-12 gap-x-6 w-full justify-center items-center border-t-primary border-t-[10px] bg-secondary text-black py-7 md:py-11">
      <div className="col-span-4 md:col-span-12 lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3 justify-center">
        {heading && (
          <h2 className=" text-h2-sm md:text-h2 font-kanit font-bold text-left md:text-center w-full mb-4">
            {heading}
          </h2>
        )}
        {subheading && (
          <p className="text-intro-min-sm lg:text-intro-min text-black text-left md:text-center mb-7">
            {subheading}
          </p>
        )}
        <div className="col-span-4 flex flex-wrap items-start md:flex-nowrap lg:gap-x-[84px] lg:justify-between w-full lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3">
          {skills &&
            skills.map((skill) => {
              const skillIcon =
                skill.icon in iconMap
                  ? iconMap[skill.icon as keyof typeof iconMap]
                  : undefined;
              return (
                <span
                  key={skill.icon}
                  className="flex flex-nowrap gap-6 md:gap-0 md:flex-wrap justify-start md:justify-center items-start w-full md:w-1/3"
                >
                  <div className="flex icon text-4xl min-w-12 md:text-5xl md:w-auto text-primary text-center mb-7">
                    {skillIcon && <FontAwesomeIcon icon={skillIcon} />}
                  </div>

                  <div className="flex flex-wrap justify-start text-left mb-8">
                    <h3 className="block w-auto md:w-full text-center text-h3-sm lg:text-h3 font-semibold mb-3">
                      {skill.heading}
                    </h3>
                    <p className="skills w-full text-left md:text-center text-body-min-sm lg:text-body-min">
                      {skill.skillIcon.map((skillType, idx) => (
                        <span key={skillType.type} className="inline-block ">
                          {skillType.type}
                          <span
                            className={`mx-2 ${
                              skill.skillIcon.length === idx + 1 ? "hidden" : ""
                            }`}
                          >
                            {mediumScreen ? "\u2022" : "|"}
                          </span>
                        </span>
                      ))}
                    </p>
                  </div>
                </span>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export { Experience };
