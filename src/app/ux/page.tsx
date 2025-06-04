import getUserExperiencePageData from "../api/uxpage";
import PageIntro from "@/components/PageIntro";
import UxProcess from "@/components/UX/UxProcess";

const UserExperience = async () => {
  let uxData = null;

  try {
    uxData = await getUserExperiencePageData();
  } catch (error) {
    console.error("Error loading about UX page data:", error);
  }

  if (!uxData) {
    return (
      <div className="w-full mx-[12px]">
        <p className="text-red-500 text-lg">
          {"Sorry. We're having trouble loading the data."}
        </p>
      </div>
    );
  }
  return (
    <>
      <PageIntro title={uxData.title} intro={uxData.intro} />
      <UxProcess
        processHeading={uxData.processHeading}
        processes={uxData.processes}
      />
      ;
    </>
  );
};
export default UserExperience;
