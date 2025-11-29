"use client";
import { useState } from "react";
import Image from "next/image";
import { BlogPost } from "../../blog/[slug]/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { getFullImageUrl } from "@/utils/getImagePath";

const loader = <FontAwesomeIcon icon={faSpinner} spin />;
const BlogPageImage = ({ blog }: { blog: BlogPost }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <>
      {isImageLoading && (
        <div
          data-testid="img-loader"
          className="flex justify-center items-center text-primary color-primary text-6xl"
        >
          {loader}
        </div>
      )}
      {blog.image && blog.title && (
        <Image
          data-testid="blog-img"
          src={getFullImageUrl(blog.image)}
          alt={`Photo for ${blog.title}`}
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          onLoad={() => setIsImageLoading(false)}
        />
      )}
    </>
  );
};

export { BlogPageImage };
