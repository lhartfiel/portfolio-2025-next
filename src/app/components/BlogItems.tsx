"use client";
import Image from "next/image";
import parse from "html-react-parser";
import { Post } from "../blog/page";
import Button from "./Button";

const BlogItems = ({ post, idx }: { post: Post; idx: number }) => {
  const hostname = process.env.NEXT_PUBLIC_IMAGE_PATH;
  return (
    <>
      {idx !== 0 && (
        <div className="flex flex-col w-full md:w-1/2 lg:w-1/3 px-[40px] mb-20 text-black ">
          <div className="flex flex-col p-5 h-full transition duration-300 rounded-md hover:shadow-xl shadow-xl md:shadow-none">
            <span className="relative img-wrapper h-[180px] w-full overflow-hidden mb-6 xl:mb-8">
              <Image
                src={`${hostname}${post.image}/`}
                alt={`Photo for ${post.title}`}
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </span>
            <div className="flex flex-col flex-1">
              <span className="">
                <h3 className="text-h3 font-semibold w-full">{post.title}</h3>
                <p className="text-body-sm w-full my-3">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                {post.subtitle ? (
                  <p className="text-intro-min-sm mb-4">{post.subtitle}</p>
                ) : (
                  <span className="text-intro-min-sm mb-4">
                    {parse(post.excerpt)}
                  </span>
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

export default BlogItems;
