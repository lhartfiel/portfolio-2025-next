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
      <div className="col-span-full grid grid-cols-2 sm:grid-cols-2 lg:[grid-template-columns:repeat(3,288px)] mx-auto gap-4 md:gap-6">
        {processes?.length > 0 &&
          processes.map((step) => {
            const { heading, description, icon } = step;
            const processIcon =
              icon in iconMap
                ? iconMap[icon as keyof typeof iconMap]
                : undefined;
            return (
              <div
                key={icon}
                className="flex flex-col sm:flex-row sm:items-start"
              >
                <div className="flex items-center">
                  {processIcon && (
                    <div className="shrink-0 icon text-[22px] sm:text-[28px] md:text-[32px] w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-primary text-tertiary rounded-full flex justify-center items-center">
                      <FontAwesomeIcon icon={processIcon} />
                    </div>
                  )}
                  {/* Show this heading on mobile so it's on the same line as the icon */}
                  {heading && (
                    <h3 className="sm:hidden ml-3 text-h3-sm md:text-h3 font-semibold text-black">
                      {heading}
                    </h3>
                  )}
                </div>
                <div className="flex flex-wrap sm:ml-4">
                  {/* Show this heading on larger screens so the heading and text are aligned to the right of the icon */}
                  {heading && (
                    <h3 className="hidden sm:block text-h3-sm md:text-h3 font-semibold text-black">
                      {heading}
                    </h3>
                  )}
                  {description && (
                    <span className="mt-3 sm:mt-2 mb-4 text-body-min-sm md:text-body-min">
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
