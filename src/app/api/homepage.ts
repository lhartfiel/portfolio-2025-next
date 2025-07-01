import { getClient } from "../ApolloClient";
import { ApolloError } from "@apollo/client";
import { GET_HOME_PAGE } from "../api/graphql/queries";

const getHomepageData = async () => {
  let homeData = [];
  try {
    const { data } = await getClient().query({ query: GET_HOME_PAGE });
    homeData = data?.home || [];
    return homeData;
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
export default getHomepageData;
