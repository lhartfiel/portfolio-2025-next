import { GET_UX_PAGE } from "../api/graphql/queries";
import apiCall from "./apiCall";

/**
 * Fetches UX Page data by calling the shared apiCall function
 */
const getUserExperiencePageData = async () => {
  return apiCall(GET_UX_PAGE, "userExperience");
};
export default getUserExperiencePageData;
