import React, { useEffect, useState } from "react";
import { DataSlider, Slider } from "../slider/slider";
import "./sectionBanner.css";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import FormBooking from "./formBooking";
import { SliderWithoutContent } from "../slider/sliderWithoutContent";
import useBlogStore from "@src/stores/blogStore";

const SectionBanner: React.FC = () => {
  const { blogPosts } = useBlogStore();
  const _data = blogPosts.slice(0, 3) as DataSlider[];

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
            <SliderWithoutContent data={_data} settings={bannerSettings} />
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
