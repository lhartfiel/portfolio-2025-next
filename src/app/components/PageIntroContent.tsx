import parse from "html-react-parser";
const PageIntroContent = ({
  title,
  intro,
}: {
  title: string;
  intro: string;
}) => {
  return (
    <>
      <h1 className="text-h1-sm md:text-h1 text-primary font-kanit font-bold mb-6">
        {title}
      </h1>
      {intro && (
        <span className="text-intro-sm md:text-intro text-black">
          {parse(intro)}
        </span>
      )}
    </>
  );
};

export { PageIntroContent };
