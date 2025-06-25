"use client";
import Image from "next/image";
import { HomeImg } from "./Home/HomeImg";

import { PageIntroContent } from "./PageIntroContent";

type PageIntro = {
  highFiveCount?: number;
  image?: string;
  imageAlt?: string;
  title: string;
  intro: string;
  type?: string;
  id?: number;
};
const PageIntro = ({
  highFiveCount,
  image,
  imageAlt,
  title,
  intro,
  type,
  id,
}: PageIntro) => {
  return (
    <section className="w-full px-6 gap-6 lg:grid lg:grid-cols-12">
      {image ? (
        <>
          <div
            className="order-1 relative float-right w-1/2 ml-4 mb-4
                  lg:float-none lg:w-auto lg:ml-0 lg:mb-0
                  lg:order-2 lg:col-span-6 lg:col-start-7"
          >
            {type === "home" && (
              <Image
                className="absolute z-20 top-0 -left-[10%] w-[36%]"
                src="/assets/arrow.svg"
                alt="yellow arrow"
                width={100}
                height={100}
              />
            )}
            <div className="rounded-full max-w-full relative  xl:-top-8 lg:absolute lg:left-0">
              {type === "home" ? (
                <HomeImg
                  image={image}
                  imageAlt={imageAlt || "Page Image"}
                  highFiveCount={highFiveCount}
                  id={id}
                />
              ) : (
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${image}`}
                  alt={imageAlt || "Page Image"}
                  width={600}
                  height={600}
                  style={{
                    borderRadius: "50%",
                    objectFit: "contain",
                    objectPosition: "center",
                  }}
                />
              )}
            </div>
          </div>
          <div
            data-testid="content-wrapper"
            className="order-2 lg:order-1 lg:col-span-5 lg:col-start-2 xl:col-span-4 xl:col-start-3 my-9 lg:my-14"
          >
            <PageIntroContent title={title} intro={intro} />
          </div>
        </>
      ) : (
        <div
          data-testid="content-wrapper"
          className="col-span-4 lg:col-span-10 lg:col-start-2 xl:col-span-6 xl:col-start-4 justify-center text-center my-9 lg:my-14"
        >
          <PageIntroContent title={title} intro={intro} />
        </div>
      )}
    </section>
  );
};

export { PageIntro };
