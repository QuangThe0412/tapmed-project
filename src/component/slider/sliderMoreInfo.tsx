import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./slider.css";
import { NewsDataType } from "../../page/news/news";

type SliderProps = {
  data: NewsDataType[];
  settings?: {};
  renderPagination?: (slides: number) => React.ReactNode;
};

export function SliderMoreInfo({
  data,
  settings,
  renderPagination,
}: SliderProps) {
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
        data.map((item: NewsDataType, index) => (
          <SwiperSlide key={index}>
            <div className="item-blog mb-6">
              <div className="flex flex-col md:flex-row">
                <div className="w-full lg:w-5/12 md:w-1/2 mb-4 md:mb-0 text-left block-thumb">
                  <a
                    className="block overflow-hidden rounded"
                    href={item.link}
                    title={item.title}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </a>
                </div>
                <div className="w-full lg:w-7/12 md:w-1/2 pl-0 md:pl-4 text-left block-content">
                  <h3 className="text-lg font-semibold mb-2">
                    <a
                      href={item.link}
                      title={item.title}
                      className="text-gray-800 hover:text-blue-600 transition-colors"
                    >
                      {item.title}
                    </a>
                  </h3>
                  <div className="text-gray-600 text-sm">{item.content}</div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
