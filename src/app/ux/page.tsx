import getUserExperiencePageData from "../api/uxpage";
import { getUxProjectData } from "../api/uxprojects";
import { PageIntro } from "@/components/PageIntro";
import { UxProcess } from "@/components/UX/UxProcess";
import { UxProject } from "@/components/UX/UxProject";

const UserExperience = async () => {
  let uxData,
    uxProject = null;

  try {
    uxData = await getUserExperiencePageData();
  } catch (error) {
    console.error("Error loading about UX page data:", error);
  }

  try {
    uxProject = await getUxProjectData();
  } catch (error) {
    console.error("Error loading about UX page data:", error);
  }

  if (!uxProject) {
    return (
      <div className="w-full mx-[12px]">
        <p className="text-red-500 text-lg">
          {"Sorry. We're having trouble loading the data."}
        </p>
      </div>
    );
  }

  console.log("proj", uxProject);

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
      {uxProject ? (
        <UxProject projects={uxProject} />
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
