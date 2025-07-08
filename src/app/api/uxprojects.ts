import { GET_UX_PROJECTS, GET_UX_PROJECT_BY_SLUG } from "./graphql/queries";
import apiCall from "./apiCall";

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

export interface Project {
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

/**
 * Fetches UX Project data by calling the shared apiCall function
 */
const getUxProjectData = async () => {
  return apiCall(GET_UX_PROJECTS, "uxProject");
};

const getUxProjectBySlug = async ({ slug }: { slug: string }) => {
  return apiCall(GET_UX_PROJECT_BY_SLUG, "uxProjectBySlug", { slug });
};

export { getUxProjectData, getUxProjectBySlug };
