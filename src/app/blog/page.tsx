import { GET_ALL_BLOG_POSTS } from "../apis/queries";
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
  let blogsPosts = [];
  try {
    const { data } = await getClient().query({ query: GET_ALL_BLOG_POSTS });
    blogsPosts = data?.allBlogs || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    blogsPosts = [
      {
        heading: "Fallback Skill",
        description: "<p>Data fetch failed.</p>",
        icon: { type: "fallback", className: "fallback-icon" },
      },
    ];
  }

  return (
    <>
      <h1>Blog List</h1>
      {blogsPosts.length > 0 &&
        blogsPosts.map((post: Post) => {
          return (
            <div key={post.id}>
              <Link href={{ pathname: `/blog/${post.slug}` }} key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.subtitle}</p>
              </Link>
              <img src={post.image} alt={post.title} />
              <p>{new Date(post.createdAt).toLocaleDateString()}</p>
              {/* TODO:// This won't work with prod until the django update is pushed */}
              {parse(post.excerpt)}
            </div>
          );
        })}
    </>
  );
};

export default BlogList;
