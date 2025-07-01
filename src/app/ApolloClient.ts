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
  return Promise.race<Response>([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(() => {
        console.error("GraphQL fetch to", url, "timed out");
        reject(new Error("Fetch timed out"));
      }, timeout)
    ),
  ]);
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
