import { getClient } from "../ApolloClient";
import { ApolloError } from "@apollo/client";
import { GET_ABOUT_PAGE } from "../api/graphql/queries";

const getAboutpageData = async () => {
  let aboutData = [];
  try {
    const { data } = await getClient().query({ query: GET_ABOUT_PAGE });
    console.log("Fetching about data...");
    aboutData = data?.about || [];
    return aboutData;
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error("ApolloError:", {
        message: error.message,
        graphQLErrors: error.graphQLErrors,
        networkError: error.networkError,
      });
    } else if (error instanceof Error) {
      console.error("Error:", error.message, error.stack);
    } else {
      console.error("Unknown error type", error);
    }
    return null;
  }
};
export default getAboutpageData;
