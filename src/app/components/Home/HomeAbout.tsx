import parse from "html-react-parser";

const HomeAbout = ({
  aboutHeading,
  aboutDescription,
}: {
  aboutHeading: string;
  aboutDescription: string;
}) => {
  return (
    <section className="col-span-4 px-6 grid grid-cols-4 md:grid-cols-12 gap-x-6 w-full justify-center items-center border-t-primary border-t-[10px] bg-secondary text-black py-7 md:py-11">
      <h2 className="col-span-4 md:col-span-12 lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3 text-h2-sm md:text-h2 font-kanit font-bold text-center w-full mb-4">
        {aboutHeading}
      </h2>
      <span className="text-body-sm md:text-body columns-2 col-span-4 md:col-span-12 lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3 gap-7">
        {parse(aboutDescription)}
      </span>
    </section>
  );
};

export default HomeAbout;
