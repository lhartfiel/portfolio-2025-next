import { GET_ABOUT_PAGE } from "../api/graphql/queries";
import apiCall from "./apiCall";

/**
 * Fetches About Page data by calling the shared apiCall function
 */
const getAboutpageData = async () => {
  return apiCall(GET_ABOUT_PAGE, "about");
};
export default getAboutpageData;
