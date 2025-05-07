import { GET_SINGLE_BLOG_POST } from "../../apis/queries";
import { getClient } from "../../ApolloClient";
import parse from "html-react-parser";
interface BlogPageParams {
  params: Promise<{
    slug: string;
  }>;
}

const BlogPage = async ({ params }: BlogPageParams) => {
  const { slug } = await params;
  console.log("slug", slug);
  const { data } = await getClient().query({
    query: GET_SINGLE_BLOG_POST,
    variables: {
      slug, // replace with actual slug
    },
  });
  const blog = data.blogBySlug;
  return (
    <>
      <h1>Blog Page</h1>
      {blog?.title && (
        <div>
          <h1>{blog?.title}</h1>
          {parse(blog.content)}
        </div>
      )}
    </>
  );
};

export default BlogPage;
