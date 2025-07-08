import parse from "html-react-parser";
import styles from "../blog.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { Suspense } from "react";
import { BlogPageImage } from "@/components/Blog/BlogPageImage";
import dayjs from "dayjs";
import { getBlogPage } from "src/app/api/blogListpage";

const calendarIcon = (
  <FontAwesomeIcon icon={faCalendarDays} className="w-4 mx-2" />
);

interface BlogPageParams {
  params: Promise<{
    slug: string;
  }>;
}

export interface BlogPost {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  createdAt: string;
  updatedDate: string;
  content: string;
  slug: string;
}

export const revalidate = 14400; //revalidate every 4 hours

const BlogPage = async ({ params }: BlogPageParams) => {
  const { slug } = await params;
  let blog = {} as BlogPost;

  blog = await getBlogPage(slug);

  const date = dayjs(blog.createdAt, "MMM D, YYYY");
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <article className={`blog flex flex-col w-full`}>
        <div
          className="flex items-center justify-center img-wrapper h-[230px] lg:h-[405px] relative mb-8
          l<g:mb-14"
        >
          {blog.image && <BlogPageImage blog={blog} />}
        </div>
        <section className="grid grid-cols-12 justify-center">
          {blog?.title && (
            <div className="col-span-10 col-start-2 lg:col-span-8 lg:col-start-3">
              <h1 className="text-h1-sm lg:text-h1 font-kanit font-bold text-center">
                {blog?.title}
              </h1>
            </div>
          )}
          <div className="col-span-10 col-start-2 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 text-black text-body-sm lg:text-body">
            <div className="intro mt-6 mb-10 lg:mt-8 lg:mb-12 text-primary">
              {blog.subtitle && (
                <p className="text-intro-sm lg:text-intro text-center">
                  {blog.subtitle}
                </p>
              )}
              <span className="flex flex-nowrap justify-center items-center text-primary text-intro-min-sm md:text-intro mb-8 mt-3 lg:mt-2">
                {calendarIcon}
                <p className="text-primary text-body-min-sm md:text-intro-sm text-center">
                  {date.format("MMM D, YYYY")}
                </p>
              </span>
            </div>
            {blog.content && (
              <div className={`${styles.blog} blog-body`}>
                {parse(blog.content)}
              </div>
            )}
          </div>
        </section>
      </article>
    </Suspense>
  );
};

export default BlogPage;
