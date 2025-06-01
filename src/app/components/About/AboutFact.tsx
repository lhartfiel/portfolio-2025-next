const AboutFact = ({
  heading,
  value,
  description,
}: {
  heading: string;
  value: string;
  description: string;
}) => {
  return (
    <section className="order-2 md:order-1 flex flex-wrap justify-center py-7 md:py-11">
      <h2 className="text-h2-sm md:text-h2 w-full text-center text-black font-bold font-kanit mb-4">
        {heading}
      </h2>
      <span className="flex text-black w-full justify-center items-center text-center">
        <p className="text-h2-sm md:text-h2 font-kanit font-bold">{value}</p>
        <p className="text-intro-min-sm md:text-intro-min ml-2">
          {description}
        </p>
      </span>
    </section>
  );
};

export default AboutFact;
