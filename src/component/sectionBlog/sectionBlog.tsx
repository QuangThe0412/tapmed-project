import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { DataSlider, Slider } from "../slider/slider";
import "./sectionBlog.css";
import useBlogStore from "@src/stores/useBlogStore";

const SectionBlog: React.FC = () => {
  const { blogPosts } = useBlogStore();
  let _data: DataSlider[] = [];

  if (blogPosts && blogPosts.length > 0) {
    _data = blogPosts
      .filter((item) => item.category === "news")
      .slice(0, 4) as DataSlider[];
  }

  const sliderSettings = {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: false,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    modules: [Autoplay, Pagination],
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  };

  return (
    <section className="section-blog flex justify-center">
      <div className="container px-3">
        <div className="block-title">
          <h3>Tin tức mới nhất</h3>
        </div>
        <div className="block-content">
          <Slider data={_data} settings={sliderSettings} />
        </div>
      </div>
    </section>
  );
};

export default SectionBlog;
