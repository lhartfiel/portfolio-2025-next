"use client";
import Image from "next/image";
import parse from "html-react-parser";
import { Post } from "../../blog/page";
import { Button } from "../Button";
import dayjs from "dayjs";

const BlogItems = ({ post, idx }: { post: Post; idx: number }) => {
  const hostname = process.env.NEXT_PUBLIC_IMAGE_PATH;
  const date = dayjs(post.createdAt, "MMM D, YYYY");

  return (
    <>
      {idx !== 0 && (
        <div className="flex flex-col w-full md:w-1/2 lg:w-1/3 px-[40px] mb-20 text-black ">
          <div className="flex flex-col p-5 h-full transition duration-300 rounded-md hover:shadow-xl shadow-xl md:shadow-none">
            {post.image && (
              <span className="relative img-wrapper h-[180px] w-full overflow-hidden mb-6 xl:mb-8">
                <Image
                  src={`${hostname}${post.image}`}
                  alt={`Photo for ${post.title}`}
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </span>
            )}
            <div className="flex flex-col flex-1">
              <span>
                <h3 className="text-h4 lg:text-h3 font-semibold w-full">
                  {post.title}
                </h3>
                <p data-testid="blog-date" className="text-body-sm w-full my-3">
                  {date.format("MMM D, YYYY")}
                </p>
                {post.subtitle ? (
                  <p
                    data-testid="blog-subtitle"
                    className="text-body-sm lg:text-intro-min-sm mb-4"
                  >
                    {post.subtitle}
                  </p>
                ) : (
                  post.excerpt && (
                    <span
                      data-testid="blog-excerpt"
                      className="text-body-sm lg:text-intro-min-sm mb-4"
                    >
                      {parse(post.excerpt)}
                    </span>
                  )
                )}
              </span>
              <div className="mt-auto ml-auto pt-4">
                <Button
                  size="small"
                  type="secondary"
                  link={`/blog/${post.slug}`}
                  text="Read More"
                ></Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { BlogItems };
