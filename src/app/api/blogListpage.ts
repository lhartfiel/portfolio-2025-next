import { GET_ALL_BLOG_POSTS, GET_SINGLE_BLOG_POST } from "./graphql/queries";
import apiCall from "./apiCall";

/**
 * Fetches Blog List and Blog Page data by calling the shared apiCall function
 */
const getBlogList = () => {
  return apiCall(GET_ALL_BLOG_POSTS, "allBlogs");
};

const getBlogPage = (slug: string | null | undefined) => {
  return apiCall(GET_SINGLE_BLOG_POST, "blogBySlug", { slug });
};

export { getBlogList, getBlogPage };
