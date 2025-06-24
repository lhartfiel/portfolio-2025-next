"use client";
import { PageIntro } from "../PageIntro";
import { PageAbout } from "../PageAbout";
import { HomeSkills } from "./HomeSkills";
import { HomeSnapshot } from "./HomeSnapshot";
import useScreenSize from "src/app/hooks/useScreenSize";

type homeDataType = {
  highFiveCount: number;
  image: string;
  imageAlt: string;
  title: string;
  intro: string;
  type: string;
  id: number;
  string: string;
  aboutHeading: string;
  aboutDescription: string;
  skillsHeading: string;
  skills: [];
  snapshotHeading: string;
  snapshots: [];
};

const HomeLayout = ({ homeData }: { homeData: homeDataType }) => {
  return (
    <>
      <PageIntro
        highFiveCount={homeData.highFiveCount}
        image={homeData.image}
        imageAlt={homeData.imageAlt}
        title={homeData.title}
        intro={homeData.intro}
        type="home"
        id={homeData.id}
      />
      <PageAbout
        aboutHeading={homeData.aboutHeading}
        aboutDescription={homeData.aboutDescription}
        screenSize={useScreenSize("sm")}
        truncateLength={560}
      />
      <HomeSkills
        skillsHeading={homeData.skillsHeading}
        skills={homeData.skills}
        isMdUp={useScreenSize("md")}
      />
      <HomeSnapshot
        snapshotHeading={homeData.snapshotHeading}
        snapshots={homeData.snapshots}
      />
    </>
  );
};

export { HomeLayout };
