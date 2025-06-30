import getAboutpageData from "../api/aboutpage";
import { DataError } from "@/components/DataError";
import { AboutLayout } from "@/components/About/AboutLayout";

export const revalidate = 86400;
export const dynamic = "force-static";

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
      <AboutLayout aboutData={aboutData} />
    </div>
  );
};

export default About;
