import { getClient } from "../ApolloClient";
import { GET_ABOUT_PAGE } from "../api/graphql/queries";

const getAboutpageData = async () => {
  let aboutData = [];
  try {
    const { data } = await getClient().query({ query: GET_ABOUT_PAGE });
    aboutData = data?.about || [];
    return aboutData;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return null;
  }
};
export default getAboutpageData;
