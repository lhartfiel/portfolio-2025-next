import PageAbout from "@/components/PageAbout";
import PageIntro from "@/components/PageIntro";
import getAboutpageData from "../api/aboutpage";

const About = async () => {
  const aboutData = await getAboutpageData();
  return (
    <div className="w-full">
      <PageIntro
        image={aboutData.image}
        imageAlt={aboutData.imageAlt}
        title={aboutData.title}
        intro={aboutData.intro}
      />
      <PageAbout
        aboutHeading={aboutData.subheading}
        aboutDescription={aboutData.description}
      />
    </div>
  );
};

export default About;
