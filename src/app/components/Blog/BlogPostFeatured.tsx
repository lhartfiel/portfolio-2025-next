"use client";
import Image from "next/image";
import parse from "html-react-parser";
import { Post } from "../../blog/page";
import { Button } from "../Button";
import dayjs from "dayjs";

const BlogPostFeatured = ({ post }: { post: Post }) => {
  const hostname = process.env.NEXT_PUBLIC_IMAGE_PATH;
  const date = dayjs(post.createdAt, "MMM D, YYYY");
  return (
    <div className="flex flex-wrap items-center justify-center relative w-full h-[405px] mb-16">
      <div className="overlay absolute top-o bottom-0 left-0 right-0 w-full h-full z-10 bg-black opacity-60"></div>
      <Image
        data-testid="feat-img"
        src={`${hostname}${post.image}`}
        alt={`Photo for ${post.title}`}
        fill
        sizes="(max-width: 1440px) 100vw, 1440px"
        style={{
          objectFit: "cover",
          objectPosition: "center",
          backgroundColor: "black",
        }}
      />
      <div className="grid grid-cols-12 h-full absolute mx-auto text-center left-0 right-0 z-20">
        <h1 className="self-end col-span-10 col-start-2 xl:col-span-8 xl:col-start-3 w-full text-h1-sm md:text-h2 lg:text-h1 text-white font-kanit text-shadow-xl mb-3">
          {post.title}
        </h1>
        <div className="h-full justify-between lg:justify-start flex flex-col col-span-10 col-start-2 xl:col-span-6 xl:col-start-4">
          <p
            data-testid="blog-date"
            className="text-white text-body-min-sm md:text-body-min text-shadow-xl my-3"
          >
            {date.format("MMM D, YYYY")}
          </p>
          {post.excerpt && (
            <span
              data-testid="blog-excerpt"
              className="block text-white text-intro-sm lg:text-intro text-shadow-xl mb-6 w-full"
            >
              {parse(post.excerpt)}
            </span>
          )}
          <div className="wrapper mt-auto -mb-[18px] lg:mb-0 lg:mt-0">
            <Button
              size="large"
              type="primary"
              text="Read More"
              link={`/blog/${post.slug}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { BlogPostFeatured };
