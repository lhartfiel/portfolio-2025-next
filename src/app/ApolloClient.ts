import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";

// GraphQL client for server-side rendering
const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL;

if (!GRAPHQL_URL) {
  throw new Error("Missing NEXT_PUBLIC_GRAPHQL_URL environment variable");
}

function fetchWithTimeout(
  url: RequestInfo | URL,
  options: RequestInit = {},
  timeout = 5000
): Promise<Response> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      console.error("GraphQL fetch to", url, "timed out");
      reject(new Error("Fetch timed out"));
    }, timeout);

    fetch(url, options)
      .then((res) => {
        clearTimeout(timer); // 🛑 Stop the timeout from firing
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer); // 🛑 Also stop it on failure
        reject(err);
      });
  });
}

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // this needs to be an absolute url, as relative urls cannot be used in SSR
      uri: `${GRAPHQL_URL}`,
      fetch: (url, options) => fetchWithTimeout(url, options, 5000),
    }),
  });
});
