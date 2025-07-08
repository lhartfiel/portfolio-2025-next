import { GET_HOME_PAGE } from "../api/graphql/queries";
import apiCall from "./apiCall";

/**
 * Fetches homepage data by calling the shared apiCall function
 */
const getHomepageData = async () => {
  return apiCall(GET_HOME_PAGE, "home");
};
export default getHomepageData;
