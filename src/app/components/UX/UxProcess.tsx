import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPeopleArrows,
  faFileLines,
  faLightbulb,
  faObjectGroup,
  faComment,
  faArrowsSpin,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import parse from "html-react-parser";

library.add(
  faPeopleArrows,
  faFileLines,
  faLightbulb,
  faObjectGroup,
  faComment,
  faArrowsSpin
);

const iconMap = {
  faPeopleArrows,
  faFileLines,
  faLightbulb,
  faObjectGroup,
  faComment,
  faArrowsSpin,
};

type Process = {
  heading: string;
  description: string;
  icon: string;
};

const UxProcess = ({
  processHeading,
  processes,
}: {
  processHeading: string;
  processes: [Process];
}) => {
  return (
    <section className="relative z-10 col-span-4 px-6 grid grid-cols-4 md:grid-cols-12 gap-x-6 w-full justify-center items-center border-t-primary border-t-[10px] bg-secondary text-black py-7 md:py-11">
      {processHeading && (
        <h2 className="col-span-4 md:col-span-12 lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3 text-h2-sm md:text-h2 font-kanit font-bold text-center w-full mb-6">
          {processHeading}
        </h2>
      )}
      <div className="col-span-full grid grid-cols-2 lg:[grid-template-columns:repeat(3,288px)] mx-auto gap-6">
        {processes?.length > 0 &&
          processes.map((step) => {
            const { heading, description, icon } = step;
            const processIcon =
              icon in iconMap
                ? iconMap[icon as keyof typeof iconMap]
                : undefined;
            return (
              <div key={icon} className="flex flex-nowrap">
                {processIcon && (
                  <div className="shrink-0 icon text-[30px] md:text-[32px] w-14 h-14 md:w-16 md:h-16 bg-primary text-tertiary rounded-full flex justify-center items-center">
                    <FontAwesomeIcon icon={processIcon} />
                  </div>
                )}
                <div className="content ml-4">
                  {heading && (
                    <h3 className="text-h3-sm md:text-h3 font-semibold text-black">
                      {heading}
                    </h3>
                  )}
                  {description && (
                    <span className="text-body-min-sm md:text-body-min">
                      {parse(description)}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export { UxProcess };
