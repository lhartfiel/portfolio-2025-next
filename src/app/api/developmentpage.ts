import { GET_DEVELOPMENT_PAGE } from "./graphql/queries";
import { getClient } from "../ApolloClient";
import { ApolloError } from "@apollo/client";

const getDevData = async () => {
  let devData = [];
  try {
    const { data } = await getClient().query({ query: GET_DEVELOPMENT_PAGE });
    devData = data?.development || [];
    return devData;
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

export default getDevData;
