import { PageAbout } from "@/components/PageAbout";
import { PageIntro } from "@/components/PageIntro";
import getAboutpageData from "../api/aboutpage";
import { AboutInterests } from "@/components/About/AboutInterests";
import { AboutFact } from "@/components/About/AboutFact";
import { DataError } from "@/components/DataError";

const About = async () => {
  let aboutData = null;
  try {
    aboutData = await getAboutpageData();
  } catch (error) {
    console.error("Error loading about page data:", error);
  }

  if (!aboutData) {
    return <DataError />;
  }

  return (
    <div className="w-full">
      <PageIntro
        image={aboutData?.image}
        imageAlt={aboutData?.imageAlt}
        title={aboutData.title}
        intro={aboutData.intro}
      />
      <PageAbout
        aboutHeading={aboutData.subheading}
        aboutDescription={aboutData.description}
      />
      <AboutFact
        heading={aboutData.funFactHeading}
        value={aboutData.funFactValue}
        description={aboutData.funFactDescription}
      ></AboutFact>
      <AboutInterests interests={aboutData.interests} />
    </div>
  );
};

export default About;
