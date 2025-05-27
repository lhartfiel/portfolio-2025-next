import { GET_SINGLE_BLOG_POST } from "../../api/graphql/queries";
import { getClient } from "../../ApolloClient";
import parse from "html-react-parser";
import Image from "next/image";
import styles from "../blog.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

const calendarIcon = (
  <FontAwesomeIcon icon={faCalendarDays} className="w-4 mx-2" />
);

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
  const hostname = process.env.NEXT_PUBLIC_IMAGE_PATH;
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
    <article className={`blog flex flex-col w-full`}>
      <div className="img-wrapper h-[230px] lg:h-[405px] relative mb-8 lg:mb-14">
        <Image
          src={`${hostname}${blog.image}`}
          alt={`Photo for ${blog.title}`}
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
      <section className="grid grid-cols-12 justify-center">
        {blog?.title && (
          <div className="col-span-10 col-start-2 lg:col-span-8 lg:col-start-3">
            <h1 className="text-h1-sm lg:text-h1 font-kanit font-bold text-center">
              {blog?.title}
            </h1>
            <span className="flex flex-nowrap justify-center items-center text-black text-intro-min-sm md:text-intro mb-8 mt-3 lg:mt-2">
              {calendarIcon}
              <p className="text-black text-body-min-sm md:text-intro-sm text-center">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </span>
          </div>
        )}
        <div
          className={`${styles.blog} blog-body col-span-10 col-start-2 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 text-black text-body-sm lg:text-body`}
        >
          {parse(blog.content)}
        </div>
      </section>
    </article>
  );
};

export default BlogPage;
