import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./slider.css";
import { DataSlider } from "./slider";
import { Link } from "react-router-dom";

type SliderProps = {
  data: DataSlider[];
  settings?: {};
  renderPagination?: (slides: number) => React.ReactNode;
};

export function SliderWithoutContent({
  data,
  settings,
  renderPagination,
}: SliderProps) {
  const swiperRef = useRef<any>(null);

  const totalSlides = data?.length;
  return (
    <Swiper
      ref={swiperRef}
      spaceBetween={30}
      className="mySwiper"
      {...settings}
    >
      {data &&
        data?.map((item: DataSlider, index) => {
          const { id, link, title = "", image } = item;

          return (
            <SwiperSlide key={index}>
              <Link to={link || "#"}>
                <img src={image} alt={title} />
              </Link>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}
