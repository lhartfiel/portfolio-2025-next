import { GET_DEVELOPMENT_PAGE } from "./graphql/queries";
import apiCall from "./apiCall";

/**
 * Fetches Development Page data by calling the shared apiCall function
 */
const getDevData = async () => {
  return apiCall(GET_DEVELOPMENT_PAGE, "development");
};

export default getDevData;
