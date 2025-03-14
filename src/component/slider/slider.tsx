import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./slider.css";
import { link } from "fs";
import { Link } from "react-router-dom";

export type DataSlider = {
  image: string;
  title?: string;
  id?: number;
  link?: string;
};

type SliderProps = {
  data: DataSlider[];
  settings?: {};
  renderPagination?: (slides: number) => React.ReactNode;
};

export function Slider({ data, settings, renderPagination }: SliderProps) {
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
        data.map((item: DataSlider, index) => {
          const { link = "#", title, image } = item;
          return (
            <SwiperSlide key={index}>
              <div className="item">
                <div className="item_product_main">
                  <div className="product-thumbnail">
                    <Link className="image_thumb" to={link} title={title}>
                      <img src={image} alt={title} />
                    </Link>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">
                      <Link to={link} title={title}>
                        {title}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}
