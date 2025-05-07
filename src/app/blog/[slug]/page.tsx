import { GET_SINGLE_BLOG_POST } from "../../apis/queries";
import { getClient } from "../../ApolloClient";
import parse from "html-react-parser";
interface BlogPageParams {
  params: Promise<{
    slug: string;
  }>;
}

interface BlogPost {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  createdAt: string;
  updatedDate: string;
  content: string;
  slug: string;
}

const BlogPage = async ({ params }: BlogPageParams) => {
  const { slug } = await params;
  let blog = {} as BlogPost;
  try {
    const { data } = await getClient().query({
      query: GET_SINGLE_BLOG_POST,
      variables: {
        slug, // replace with actual slug
      },
    });
    blog = data?.blogBySlug || {};
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }

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
