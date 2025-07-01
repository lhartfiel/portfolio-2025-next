import { GET_DEVELOPMENT_PAGE } from "./graphql/queries";
import { getClient } from "../ApolloClient";

const getDevData = async () => {
  let devData = [];
  try {
    const { data } = await getClient().query({ query: GET_DEVELOPMENT_PAGE });
    devData = data?.development || [];
    return devData;
  } catch (error: any) {
    console.error("GraphQL fetch error:", error?.message);
    console.error("Full error:", JSON.stringify(error, null, 2));
    return null;
  }
};

export default getDevData;
