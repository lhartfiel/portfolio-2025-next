import getHomepageData from "../api/homepage";
import { HomeSkills } from "@/components/Home/HomeSkills";
import { HomeSnapshot } from "@/components/Home/HomeSnapshot";
import { PageAbout } from "@/components/PageAbout";
import { PageIntro } from "@/components/PageIntro";
import { DataError } from "@/components/DataError";

const Home = async () => {
  let homeData = null;
  try {
    homeData = await getHomepageData();
  } catch (error) {
    console.error("Error loading homepage data:", error);
  }

  if (!homeData) {
    return <DataError />;
  }

  return (
    <div className="w-full mx-[12px]">
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
        truncateLength={560}
      />
      <HomeSkills
        skillsHeading={homeData.skillsHeading}
        skills={homeData.skills}
      />
      <HomeSnapshot
        snapshotHeading={homeData.snapshotHeading}
        snapshots={homeData.snapshots}
      />
    </div>
  );
};

export default Home;
