import React from "react";
import { DataSlider, Slider } from "../slider/slider";
import "./sectionBanner.css";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import FormBooking from "./formBooking";
import { SliderWithoutContent } from "../slider/sliderWithoutContent";

const SectionBanner: React.FC = () => {
  const bannerImgs: DataSlider[] = [
    {
      imageUrl:
        "https://tapmed.vn/upload_editor/posts/images/Artboard%201%402x-8.png",
    },
    {
      imageUrl:
        "https://tapmed.vn/upload_editor/posts/images/z5684638969760_f99dd5bc5361df1570bf4bb016160442.jpg",
    },
    {
      imageUrl:
        "https://tapmed.vn/upload_editor/posts/images/z5656506777743_4ae5e7479b3c112072fee737530a3167.jpg",
    },
    {
      imageUrl:
        "https://tapmed.vn/upload_editor/posts/images/z5660296545770_29416ba6fd447ee30c73d372526caf2b.jpg",
    },
  ];

  const bannerSettings = {
    autoHeight: true,
    loop: true,
    navigation: true,
    pagination: {
      clickable: true,
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    modules: [Autoplay, EffectFade, Navigation, Pagination],
  };

  return (
    <section className="section-banner py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap w-full">
          <div className="w-full lg:w-8/12 px-4 overflow-hidden">
            <SliderWithoutContent data={bannerImgs} settings={bannerSettings} />
          </div>
          <div className="w-full lg:w-4/12">
            <FormBooking />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionBanner;
