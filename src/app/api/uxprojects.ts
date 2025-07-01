import { getClient } from "../ApolloClient";
import { ApolloError } from "@apollo/client";
import { GET_UX_PROJECTS, GET_UX_PROJECT_BY_SLUG } from "./graphql/queries";

export interface ImageType {
  image: string;
  imageAlt: string;
}

export interface Block {
  id: string;
  heading?: string;
  description?: string;
  blockquote?: string;
  images?: [ImageType];
  showBackgroundColor: boolean;
  slidesPerView: number;
  limitHeight: boolean;
}

interface Project {
  title: string;
  intro: string;
  excerpt?: string;
  excerptImage: string;
  slug: string;
  role: string;
  duration: string;
  projectType: string;
  blocks: Block;
}

const getUxProjectData = async () => {
  let uxProjectData = [];
  try {
    const { data } = await getClient().query({ query: GET_UX_PROJECTS });
    uxProjectData = data?.uxProject || [];
    return uxProjectData;
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

const getUxProjectBySlug = async ({ slug }: { slug: string }) => {
  let uxProjectData = {} as Project;
  try {
    const { data } = await getClient().query({
      query: GET_UX_PROJECT_BY_SLUG,
      variables: {
        slug,
      },
    });
    uxProjectData = data?.uxProjectBySlug || {};
    return uxProjectData;
  } catch (error) {
    console.error("Error fetching UX Project:", error);
    return null;
  }
};

export { getUxProjectData, getUxProjectBySlug };
