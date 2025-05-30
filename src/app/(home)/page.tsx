import getHomepageData from "../api/homepage";
import HomeSkills from "@/components/Home/HomeSkills";
import HomeSnapshot from "@/components/Home/HomeSnapshot";
import HomeIntro from "@/components/Home/HomeIntro";
import HomeAbout from "@/components/Home/HomeAbout";

const Home = async () => {
  const homeData = await getHomepageData();

  return (
    <div className="w-full mx-[12px]">
      <HomeIntro
        image={homeData.image}
        imageAlt={homeData.imageAlt}
        title={homeData.title}
        intro={homeData.intro}
      />
      <HomeAbout
        aboutHeading={homeData.aboutHeading}
        aboutDescription={homeData.aboutDescription}
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
