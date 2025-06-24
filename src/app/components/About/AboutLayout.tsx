"use client";
import { PageAbout } from "@/components/PageAbout";
import { PageIntro } from "@/components/PageIntro";
import { AboutInterests } from "@/components/About/AboutInterests";
import { AboutFact } from "@/components/About/AboutFact";
import useScreenSize from "src/app/hooks/useScreenSize";

export type aboutInterest = {
  name: string;
  icon: string;
  heading: string;
  description: string;
};

type aboutDataType = {
  description: string;
  funFactDescription: string;
  funFactHeading: string;
  funFactValue: string;
  image: string;
  imageAlt: string;
  intro: string;
  interests: aboutInterest[];
  subheading: string;
  title: string;
};

const AboutLayout = ({ aboutData }: { aboutData: aboutDataType }) => {
  const screenSize = useScreenSize("sm");
  return (
    <>
      <PageIntro
        image={aboutData?.image}
        imageAlt={aboutData?.imageAlt}
        title={aboutData.title}
        intro={aboutData.intro}
      />
      <PageAbout
        aboutHeading={aboutData.subheading}
        aboutDescription={aboutData.description}
        screenSize={screenSize}
        truncateLength={720}
      />
      <AboutFact
        heading={aboutData.funFactHeading}
        value={aboutData.funFactValue}
        description={aboutData.funFactDescription}
      ></AboutFact>
      <AboutInterests interests={aboutData.interests} />
    </>
  );
};

export { AboutLayout };
