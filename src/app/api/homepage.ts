import { getClient } from "../ApolloClient";
import { GET_HOME_PAGE } from "../api/graphql/queries";

const getHomepageData = async () => {
  let homeData = [];
  try {
    const { data } = await getClient().query({ query: GET_HOME_PAGE });
    homeData = data?.home || [];
    return homeData;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return null;
  }
};
export default getHomepageData;
