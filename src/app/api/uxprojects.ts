import { getClient } from "../ApolloClient";
import { GET_UX_PROJECTS, GET_UX_PROJECT_BY_SLUG } from "./graphql/queries";

interface Image {
  image: string;
  imageAlt: string;
}

interface Block {
  heading?: string;
  description?: string;
  blockquote?: string;
  image?: Image;
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
  block: Block;
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
    console.log("proj", uxProjectData);
    return uxProjectData;
  } catch (error) {
    console.error("Error fetching UX Project:", error);
    return null;
  }
};

export { getUxProjectData, getUxProjectBySlug };
