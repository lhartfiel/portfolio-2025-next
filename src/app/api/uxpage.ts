import { getClient } from "../ApolloClient";
import { ApolloError } from "@apollo/client";
import { GET_UX_PAGE } from "../api/graphql/queries";

const getUserExperiencePageData = async () => {
  let uxData = [];
  try {
    const { data } = await getClient().query({ query: GET_UX_PAGE });
    if (!data?.userExperience) {
      console.warn("No UX data returned from GraphQL.");
      return null;
    }

    uxData = data?.userExperience || [];
    return uxData;
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
export default getUserExperiencePageData;
