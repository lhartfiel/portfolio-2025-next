import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPeopleArrows,
  faFileLines,
  faLightbulb,
  faObjectGroup,
  faComment,
  faArrowsSpin,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import getUserExperiencePageData from "../api/uxpage";
import PageIntro from "@/components/PageIntro";

library.add(
  faPeopleArrows,
  faFileLines,
  faLightbulb,
  faObjectGroup,
  faComment,
  faArrowsSpin
);

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
    </>
  );
};
export default UserExperience;
