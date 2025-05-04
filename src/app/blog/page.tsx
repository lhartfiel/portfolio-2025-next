import { GET_ALL_BLOG_POSTS } from "../apis/schema";
import { getClient } from "../ApolloClient";
import Link from "next/link";
import parse from "html-react-parser";

interface Post {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  createdAt: string;
  excerpt: string;
  slug: string;
}
const BlogList = async () => {
  const { loading, error, data } = await getClient().query({
    query: GET_ALL_BLOG_POSTS,
  });
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h1>Blog List</h1>
      {data.allBlogs.length > 0 &&
        data.allBlogs.map((post: Post) => {
          return (
            <>
              <Link href={{ pathname: `/blog/${post.slug}` }} key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.subtitle}</p>
              </Link>
              <img src={post.image} alt={post.title} />
              <p>{new Date(post.createdAt).toLocaleDateString()}</p>
              {parse(post.excerpt)}
            </>
          );
        })}
    </>
  );
};

export default BlogList;
