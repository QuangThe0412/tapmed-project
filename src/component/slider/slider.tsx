import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./slider.css";

export type DataSlider = {
  imageUrl: string;
  link?: string;
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

  const totalSlides = data.length;

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
            {item.title == null ? (
              <img src={item.imageUrl} alt={`Image ${index + 1}`} />
            ) : (
              <div className="item">
                <div className="item_product_main">
                  <div className="product-thumbnail">
                    <a
                      className="image_thumb"
                      href={item.link || "#"}
                      title={item.title}
                    >
                      <img src={item.imageUrl} alt={item.title} />
                    </a>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">
                      <a href={item.link || "#"} title={item.title}>
                        {item.title}
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
