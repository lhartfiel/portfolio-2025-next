"use client";
import { useState } from "react";
import Image from "next/image";
import { BlogPost } from "../../blog/[slug]/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const loader = <FontAwesomeIcon icon={faSpinner} spin />;
const BlogPageImage = ({ blog }: { blog: BlogPost }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const hostname = process.env.NEXT_PUBLIC_IMAGE_PATH;

  return (
    <>
      {isImageLoading && (
        <div className="flex justify-center items-center text-primary color-primary text-6xl">
          {loader}
        </div>
      )}
      <Image
        src={`${hostname}${blog.image}`}
        alt={`Photo for ${blog.title}`}
        fill
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
        onLoadingComplete={() => setIsImageLoading(false)}
      />
    </>
  );
};

export { BlogPageImage };
