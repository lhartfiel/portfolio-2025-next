import getDevData from "../api/developmentpage";
import { PageIntro } from "@/components/PageIntro";
import { Experience } from "@/components/Development/Experience";
import { Projects } from "@/components/Development/Projects";
import { DataError } from "@/components/DataError";

export const revalidate = 86400;
export const dynamic = "force-static";

const Development = async () => {
  let devData = null;

  try {
    devData = await getDevData();
  } catch (error) {
    console.error("Error loading about page data:", error);
    return null;
  }

  if (!devData) {
    return <DataError />;
  }
  return (
    <>
      <PageIntro title={devData.title} intro={devData.intro}></PageIntro>
      <Experience
        heading={devData.experienceHeading}
        subheading={devData.experienceSubheading}
        skills={devData.skills}
      />
      <Projects heading={devData.projectHeading} projects={devData.projects} />
    </>
  );
};

export default Development;
