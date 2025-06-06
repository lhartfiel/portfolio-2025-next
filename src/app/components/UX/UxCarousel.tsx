"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, A11y, Zoom } from "swiper/modules";
import { Image } from "src/app/api/uxprojects";

import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "../../ux/ux.module.scss";

// Customizations:
// slidesPerView

const UxCarousel = ({ images }: { images: [Image] }) => {
  const imagePath = process.env.NEXT_PUBLIC_IMAGE_PATH;
  return (
    <div className={`${styles.carousel}`}>
      <Swiper
        modules={[Navigation, Pagination, EffectFade, A11y, Zoom]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {images.map((img) => {
          return (
            <SwiperSlide key={img.image}>
              <div className="swiper-zoom-container">
                <img src={`${imagePath}${img.image}`} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export { UxCarousel };
