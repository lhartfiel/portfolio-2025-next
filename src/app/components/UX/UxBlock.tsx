import { Block } from "src/app/api/uxprojects";
import parse from "html-react-parser";
import styles from "../../blog/blog.module.scss";
import { UxCarousel } from "./UxCarousel";
import { UxCallout } from "./UxCallout";

const UxBlock = ({ blocks }: { blocks: Block[] }) => {
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
            <div
              className={`grid items-start justify-center grid-cols-4 md:grid-cols-12 xl:[grid-template-columns:repeat(12,72px)] mx-auto gap-x-6 md:gap-y-6 px-6 pb-7 md:pb-8 ${
                block.showBackgroundColor ? "py-4 md:py-6" : ""
              }`}
            >
              <div className="col-span-full md:col-start-3 md:col-span-8">
                {block.heading && (
                  <h2 className="text-h2-sm md:text-h2 font-semibold font-kanit mb-3 md:mb-4 py-4 md:py-6">
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
                {block.images && block?.images.length > 0 && (
                  <UxCarousel
                    images={block.images}
                    slidesPerView={block.slidesPerView}
                    limitHeight={block.limitHeight}
                  />
                )}
                {block.blockquote && <UxCallout callout={block.blockquote} />}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export { UxBlock };
