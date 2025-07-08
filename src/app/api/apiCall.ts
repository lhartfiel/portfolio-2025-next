import { ApolloError, DocumentNode } from "@apollo/client";
import { getClient } from "../ApolloClient";

const apiCall = async (
  query: DocumentNode,
  objectName: string,
  variables?: Record<string, string | number | boolean | null | undefined>
) => {
  let dataList = [];
  try {
    const { data } = await getClient().query({
      query,
      variables,
    });
    console.log("Fetching data...");
    dataList = data?.[objectName] || [];
    return dataList;
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

export default apiCall;
