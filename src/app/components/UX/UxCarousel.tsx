"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectFade,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Zoom,
  Mousewheel,
} from "swiper/modules";
import { ImageType } from "src/app/api/uxprojects";
import { getFullImageUrl } from "@/utils/getImagePath";

import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import styles from "../../ux/ux.module.scss";

const UxCarousel = ({
  images,
  slidesPerView = 1,
  limitHeight,
}: {
  images: [ImageType];
  slidesPerView: number;
  limitHeight?: boolean;
}) => {
  return (
    <div className={`${styles.carousel}`}>
      <Swiper
        className={`${limitHeight && "limit-height"}`}
        modules={[
          Navigation,
          Pagination,
          EffectFade,
          A11y,
          Zoom,
          Scrollbar,
          Mousewheel,
        ]}
        spaceBetween={50}
        slidesPerView={slidesPerView}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        zoom
        mousewheel={true}
        autoHeight={true}
        freeMode={true}
      >
        {images.map((img) => {
          return (
            <SwiperSlide key={img.image}>
              <div className="swiper-zoom-container">
                <img src={getFullImageUrl(img.image)} alt={img.imageAlt} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export { UxCarousel };
