"use client";
import { Button } from "@/components/Button";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsersRectangle } from "@fortawesome/free-solid-svg-icons";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";

//Note: any new icons passed in the django admin will need to be added here as the entire FontAwesome library is NOT being imported
const iconMap = {
  faUsersRectangle,
  faLaptopCode,
};
library.add(faUsersRectangle, faLaptopCode);

type Skill = {
  description: string;
  icon: string;
  iconAlt: string;
  link: string;
  subhead: string;
};

const HomeSkills = ({
  skillsHeading,
  skills,
  isMdUp,
}: {
  skillsHeading: string;
  skills: Skill[];
  isMdUp: boolean;
}) => {
  return (
    <section className="px-6 grid grid-cols-4 col-span-4 md:grid-cols-12 gap-x-6 w-full justify-center items-center bg-white text-black py-7 md:py-11">
      <h2 className="col-span-4 md:col-span-12 lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3 text-h2-sm md:text-h2 font-kanit font-bold text-center w-full mb-12">
        {skillsHeading}
      </h2>
      <div className="col-span-4 col-start-1 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 flex flex-wrap justify-center md:flex-nowrap gap-x-8 text-center">
        {skills?.length > 0 &&
          skills.map((skill: Skill, idx: number) => {
            const skillIcon =
              skill.icon in iconMap
                ? iconMap[skill.icon as keyof typeof iconMap]
                : undefined;
            const cleanedDesc = DOMPurify.sanitize(skill.description);
            return (
              <div
                data-testid="skill"
                key={`${skill.icon}-${idx}`}
                className="flex flex-nowrap md:flex-wrap justify-start md:justify-center w-full md:w-1/2 mb-10 last:mb-0 md:mb-0"
              >
                {skillIcon && (
                  <div
                    data-testid="skill-icon"
                    className="icon text-primary text-6xl w-auto md:w-full mb-8 mr-5 md:mr-0 text-left md:text-center"
                  >
                    <FontAwesomeIcon icon={skillIcon} />
                  </div>
                )}
                <div className="skill-content justify-start md:justify-center text-left md:text-center">
                  <h3
                    className="text-h3-sm lg:text-h3
       font-bold mb-4"
                  >
                    {skill.subhead}
                  </h3>
                  {skill.description && (
                    <span
                      data-testid="description"
                      className="block text-body-sm lg:text-body mb-6"
                    >
                      {parse(cleanedDesc)}
                    </span>
                  )}
                  <div className="btn-wrapper text-right md:text-center">
                    <Button
                      customClass="font-bold inline"
                      size={isMdUp ? "large" : "small"}
                      type="primary"
                      link={skill.link}
                      text="Learn More"
                    ></Button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export { HomeSkills };
