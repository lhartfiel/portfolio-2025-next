import { GET_ALL_BLOG_POSTS } from "../api/graphql/queries";
import { getClient } from "../ApolloClient";
import { ApolloError } from "@apollo/client";
import { BlogItems } from "@/components/Blog/BlogItems";
import { BlogPostFeatured } from "@/components/Blog/BlogPostFeatured";
import { DataError } from "@/components/DataError";

export interface Post {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  createdAt: string;
  excerpt: string;
  slug: string;
}

export const revalidate = 14400; //revalidate every 4 hours

const BlogList = async () => {
  let blogsPosts = [];
  try {
    const { data } = await getClient().query({ query: GET_ALL_BLOG_POSTS });
    blogsPosts = data?.allBlogs || [];
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

  if (blogsPosts.length === 0) {
    return <DataError />;
  }

  return (
    <>
      {blogsPosts[0] && <BlogPostFeatured post={blogsPosts[0]} />}
      {blogsPosts.length > 0 && (
        <article className="grid grid-cols-12 mx-[12px] gap-6">
          <div className="col-span-12">
            <div className="flex flex-wrap justify-start">
              {blogsPosts.map((post: Post, idx: number) => {
                return <BlogItems post={post} idx={idx} key={post.id} />;
              })}
            </div>
          </div>
        </article>
      )}
    </>
  );
};

export default BlogList;
