import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./slider.css";
import { BlogType } from "@src/types/typeBlog";
import { generateSlug } from "@src/utils/common";
import { Link } from "react-router-dom";

type SliderProps = {
  data: BlogType[];
  settings?: {};
  renderPagination?: (slides: number) => React.ReactNode;
};

export function SliderMoreInfo({
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
        data.map((item: BlogType, index) => {
          const { id, title, image, content } = item;

          const slug = generateSlug(title);
          const blogtUrl = `/news/${slug}-${id}.html`;

          return (
            <SwiperSlide key={index}>
              <div className="item-blog mb-6">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full lg:w-5/12 md:w-1/2 mb-4 md:mb-0 text-left block-thumb">
                    <Link
                      to={blogtUrl}
                      title={title}
                      className="block overflow-hidden rounded"
                    >
                      <img
                        src={image}
                        alt={title}
                        className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </Link>
                  </div>
                  <div className="w-full lg:w-7/12 md:w-1/2 pl-0 md:pl-4 text-left block-content">
                    <h3 className="text-lg font-semibold mb-2">
                      <Link
                        to={blogtUrl}
                        title={title}
                        className="text-gray-800 hover:text-blue-600 transition-colors"
                      >
                        {title}
                      </Link>
                    </h3>
                    <div className="text-gray-600 text-sm">{content}</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}
