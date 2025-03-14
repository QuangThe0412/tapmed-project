import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./slider.css";

export type DataSlider = {
  image: string;
  title?: string;
  id?: number;
};

type SliderProps = {
  data: DataSlider[];
  settings?: {};
  renderPagination?: (slides: number) => React.ReactNode;
};

export function Slider({ data, settings, renderPagination }: SliderProps) {
  const swiperRef = useRef<any>(null);

  const totalSlides = data?.length;

  //khúc này chưa làm href
  return (
    <Swiper
      ref={swiperRef}
      spaceBetween={30}
      className="mySwiper"
      {...settings}
    >
      {data &&
        data.map((item: DataSlider, index) => (
          <SwiperSlide key={index}>
            <div className="item">
              <div className="item_product_main">
                <div className="product-thumbnail">
                  <a className="image_thumb" href={"#"} title={item.title}>
                    <img src={item.image} alt={item.title} />
                  </a>
                </div>
                <div className="product-info">
                  <h3 className="product-name">
                    <a href={"#"} title={item.title}>
                      {item.title}
                    </a>
                  </h3>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
