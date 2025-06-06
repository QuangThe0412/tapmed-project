import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { ReviewType } from "@src/types/typeReview";

type SliderProps = {
  data: ReviewType[];
  settings?: {};
  renderPagination?: (slides: number) => React.ReactNode;
};

export function SliderReview({
  data,
  settings,
  renderPagination,
}: SliderProps) {
  const swiperRef = useRef<any>(null);

  const totalSlides = data?.length;

  const Customer: React.FC<ReviewType> = ({
    name,
    address,
    avatar,
    content,
  }) => {
    return (
      <div className="item w-full">
        <div className="info flex">
          <div className="avartar w-1/3">
            <img
              className="w-16 rounded-lg hover:scale-95"
              src={avatar}
              alt={`${name} - ${address}`}
            />
          </div>
          <div className="name w-2/3">
            {name} - {address}
          </div>
        </div>
        <div className="content flex">
          <div className="link w-1/3">
            <Link to="" title={name}>
              <img
                src="https://tapmed.vn/TapMedVn/images/link.png"
                alt={name}
              />
            </Link>
          </div>
          <div className="desc w-2/3 text-justify line-clamp-4">{content}</div>
        </div>
      </div>
    );
  };

  return (
    <Swiper
      ref={swiperRef}
      spaceBetween={30}
      className="mySwiper"
      {...settings}
    >
      {data &&
        data.map((item: ReviewType, index) => (
          <SwiperSlide key={index}>
            <Customer {...item} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
