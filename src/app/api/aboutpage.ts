import { getClient } from "../ApolloClient";
import { GET_ABOUT_PAGE } from "../api/graphql/queries";

const getAboutpageData = async () => {
  let aboutData = [];
  try {
    const { data } = await getClient().query({ query: GET_ABOUT_PAGE });
    aboutData = data?.about || [];
    return aboutData;
  } catch (error: any) {
    console.error("GraphQL fetch error:", error?.message);
    console.error("Full error:", JSON.stringify(error, null, 2));
    return null;
  }
};
export default getAboutpageData;
