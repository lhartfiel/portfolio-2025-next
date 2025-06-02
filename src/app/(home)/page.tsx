import getHomepageData from "../api/homepage";
import HomeSkills from "@/components/Home/HomeSkills";
import HomeSnapshot from "@/components/Home/HomeSnapshot";
import PageAbout from "@/components/PageAbout";
import PageIntro from "@/components/PageIntro";

const Home = async () => {
  let homeData = null;
  try {
    homeData = await getHomepageData();
  } catch (error) {
    console.error("Error loading homepage data:", error);
  }

  if (!homeData) {
    return (
      <div className="w-full mx-[12px]">
        <p className="text-red-500 text-lg">
          {"Sorry. We're having trouble loading the data."}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mx-[12px]">
      <PageIntro
        image={homeData.image}
        imageAlt={homeData.imageAlt}
        title={homeData.title}
        intro={homeData.intro}
      />
      <PageAbout
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
