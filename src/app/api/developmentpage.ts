import { GET_DEVELOPMENT_PAGE } from "./graphql/queries";
import { getClient } from "../ApolloClient";

const getDevData = async () => {
  let devData = [];
  try {
    const { data } = await getClient().query({ query: GET_DEVELOPMENT_PAGE });
    devData = data?.development || [];
    return devData;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return null;
  }
};

export default getDevData;
