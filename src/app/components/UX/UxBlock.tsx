import { Block } from "src/app/api/uxprojects";
import parse from "html-react-parser";
import styles from "../../blog/blog.module.scss";
import { UxCarousel } from "./UxCarousel";

const UxBlock = ({ blocks }: { blocks: [Block] }) => {
  console.log("block", blocks);

  // heading?: string;
  //   description?: string;
  //   blockquote?: string;
  //   image?: Image;
  return (
    <>
      {blocks.map((block) => {
        return (
          <div
            key={block.id}
            className={`${
              block.showBackgroundColor ? "bg-portfolio-gray-light" : ""
            } w-full`}
          >
            <div className="grid items-start justify-center grid-cols-4 md:grid-cols-12 xl:[grid-template-columns:repeat(12,72px)] mx-auto gap-x-6 md:gap-y-6 px-6 py-7 md:py-11">
              <div className="col-span-full md:col-start-3 md:col-span-8">
                {block.heading && (
                  <h2 className="text-h2-sm md:text-h2 font-semibold font-kanit mb-3 md:mb-4">
                    {block.heading}
                  </h2>
                )}
                {block.description && (
                  <span
                    className={`${styles.block} text-black text-body-sm md:text-body`}
                  >
                    {parse(block.description)}
                  </span>
                )}
                {block.images && <UxCarousel images={block.images} />}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export { UxBlock };
