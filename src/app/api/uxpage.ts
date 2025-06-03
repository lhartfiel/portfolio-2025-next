import { getClient } from "../ApolloClient";
import { GET_UX_PAGE } from "../api/graphql/queries";

const getUserExperiencePageData = async () => {
  let uxData = [];
  try {
    const { data } = await getClient().query({ query: GET_UX_PAGE });
    uxData = data?.userExperience || [];
    return uxData;
  } catch (error) {
    console.error("Error fetching UX data:", error);
    return null;
  }
};
export default getUserExperiencePageData;
