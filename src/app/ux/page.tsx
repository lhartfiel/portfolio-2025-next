import getUserExperiencePageData from "../api/uxpage";
import { getUxProjectData } from "../api/uxprojects";
import { PageIntro } from "@/components/PageIntro";
import { UxProcess } from "@/components/UX/UxProcess";
import { UxProject } from "@/components/UX/UxProject";
import { DataError } from "@/components/DataError";

export const revalidate = 86400; // Revalidate every 24 hours
export const dynamic = "force-static";

const UserExperience = async () => {
  let uxData,
    uxProjectData = null;

  try {
    uxData = await getUserExperiencePageData();
  } catch (error) {
    console.error("Error loading about UX page data:", error);
    return null;
  }

  try {
    uxProjectData = await getUxProjectData();
  } catch (error) {
    console.error("Error loading about UX page data:", error);
    return null;
  }

  if (!uxProjectData || !uxData) {
    return <DataError />;
  }

  return (
    <>
      <PageIntro title={uxData.title} intro={uxData.intro} />

      {uxData ? (
        <UxProcess
          processHeading={uxData.processHeading}
          processes={uxData.processes}
        />
      ) : (
        <div className="w-full mx-[12px]">
          <p className="text-red-500 text-lg">
            {"Sorry. We're having trouble loading the data."}
          </p>
        </div>
      )}
      {uxProjectData ? (
        <UxProject projects={uxProjectData} />
      ) : (
        <div className="w-full mx-[12px]">
          <p className="text-red-500 text-lg">
            {"Sorry. We're having trouble loading the data."}
          </p>
        </div>
      )}
    </>
  );
};
export default UserExperience;
