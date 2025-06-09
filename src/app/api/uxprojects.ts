import { getClient } from "../ApolloClient";
import { GET_UX_PROJECTS, GET_UX_PROJECT_BY_SLUG } from "./graphql/queries";

export interface Image {
  image: string;
  imageAlt: string;
}

export interface Block {
  id: string;
  heading?: string;
  description?: string;
  blockquote?: string;
  images?: [Image];
  showBackgroundColor: boolean;
  slidesPerView: number;
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
    console.error("Error fetching blog posts:", error);
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
