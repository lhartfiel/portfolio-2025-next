import Image from "next/image";
import parse from "html-react-parser";

type HomeIntro = {
  image: string;
  imageAlt: string;
  title: string;
  intro: string;
};
const HomeIntro = ({ image, imageAlt, title, intro }: HomeIntro) => {
  return (
    <section className="w-full px-6 gap-6 lg:grid lg:grid-cols-12">
      <div
        className="order-1 float-right w-1/2 ml-4 mb-4
                  lg:float-none lg:w-auto lg:ml-0 lg:mb-0
                  lg:order-2 lg:col-span-6 lg:col-start-7"
      >
        <div className="rounded-full max-w-full relative overflow-hidden md:-top-8">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${image}/`}
            alt={imageAlt || "Home Image"}
            width={600}
            height={600}
            style={{
              borderRadius: "50%",
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        </div>
      </div>
      <div className="order-2 lg:order-1 lg:col-span-5 lg:col-start-2 xl:col-span-4 xl:col-start-3 mb-8">
        <h1 className="text-h1-sm md:text-h1 text-primary font-kanit font-bold mb-6 mt-9 lg:mt-14">
          {title}
        </h1>
        <span className="text-intro-sm md:text-intro text-black">
          {parse(intro)}
        </span>
      </div>
    </section>
  );
};

export default HomeIntro;
