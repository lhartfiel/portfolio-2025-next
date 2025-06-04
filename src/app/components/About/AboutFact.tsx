import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

const lightbulbIcon = <FontAwesomeIcon icon={faLightbulb} />;

const AboutFact = ({
  heading,
  value,
  description,
}: {
  heading: string;
  value: string;
  description: string;
}) => {
  const headingItems = heading.split(" ");
  return (
    <section className="grid grid-cols-4 md:grid-cols-12 xl:[grid-template-columns:repeat(12,72px)] gap-6 justify-center mx-4 py-7 md:py-11">
      <h2 className=" col-span-full justify-center text-center text-h2-sm md:text-h2 mb-11 text-black font-kanit font-bold">
        A Few of My Favorite Things:
      </h2>
      <span className="col-span-4 md:col-span-8 md:col-start-3 xl:col-span-6 xl:col-start-4 bg-tertiary shadow-[1px_3px_6px_rgba(0,0,0,0.25)] items-center relative py-7">
        <div className="heading flex flex-wrap w-auto justify-center absolute left-0 right-0 -top-4">
          <h3 className="relative flex flex-wrap text-h3-sm md:text-h3 text-center bg-primary px-4 py-1 w-auto text-tertiary font-semibold mb-4">
            <span className="mr-8">{headingItems[0]}</span>
            <div className="icon absolute left-0 right-0 -top-7 text-tertiary mx-2 text-6xl">
              {lightbulbIcon}
            </div>
            <span className="ml-8">{headingItems[1]}</span>
          </h3>
        </div>
        <span className="flex text-primary w-full justify-center items-center text-center">
          <p className="text-h2-sm md:text-h2 font-kanit font-bold">{value}</p>
          <p className="text-intro-min-sm md:text-intro-min ml-2 pt-2">
            {description}
          </p>
        </span>
      </span>
    </section>
  );
};

export { AboutFact };
