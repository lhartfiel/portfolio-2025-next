import Image from "next/image";
import PageIntroContent from "./PageIntroContent";

type PageIntro = {
  image?: string;
  imageAlt?: string;
  title: string;
  intro: string;
};
const PageIntro = ({ image, imageAlt, title, intro }: PageIntro) => {
  return (
    <section className="w-full px-6 gap-6 lg:grid lg:grid-cols-12">
      {image ? (
        <>
          <div
            className="order-1 relative float-right w-1/2 ml-4 mb-4
                  lg:float-none lg:w-auto lg:ml-0 lg:mb-0
                  lg:order-2 lg:col-span-6 lg:col-start-7"
          >
            <div className="rounded-full max-w-full relative overflow-hidden md:-top-8 lg:absolute lg:left-0">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${image}/`}
                alt={imageAlt || "Page Image"}
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
          <div className="order-2 lg:order-1 lg:col-span-5 lg:col-start-2 xl:col-span-4 xl:col-start-3 my-9 lg:my-14">
            <PageIntroContent title={title} intro={intro} />
          </div>
        </>
      ) : (
        <div className="col-span-4 lg:col-span-10 lg:col-start-2 xl:col-span-6 xl:col-start-4 justify-center text-center my-9 lg:my-14">
          <PageIntroContent title={title} intro={intro} />
        </div>
      )}
    </section>
  );
};

export default PageIntro;
