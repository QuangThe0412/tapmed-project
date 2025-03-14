import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { DataSlider, Slider } from "../slider/slider";
import "./sectionBlog.css";

const SectionBlog: React.FC = () => {
  const data: DataSlider[] = [
    {
      id: 1,
      image: "https://tapmed.vn/storage/image/tapmed1734411099.jpg",
      title: "TB CT TẶNG CHUYẾN DU LỊCH DU THUYỀN HẠ LONG 5 SAO NHÂN 8/3",
    },
    {
      id: 2,
      image: "https://tapmed.vn/storage/image/1117292255751731513589.png",
      title: `😍Chúc mừng ngày "DƯỢC SĨ THẾ GIỚI" 25/9`,
    },
    {
      id: 3,
      image:
        "https://tapmed.vn/storage/image/z5865881226036_4d1ae1bdbbb63ecc88122cb76cd8b58f1727250773.jpg",
      title: "TB CT TẶNG CHUYẾN DU LỊCH DU THUYỀN HẠ LONG 5 SAO NHÂN 8/3",
    },
    {
      id: 4,
      image: "https://tapmed.vn/storage/image/tapmed1734411099.jpg",
      title: "TB CT TẶNG CHUYẾN DU LỊCH DU THUYỀN HẠ LONG 5 SAO NHÂN 8/3",
    },
    {
      id: 5,
      image:
        "https://tapmed.vn/storage/image/z5865881226036_4d1ae1bdbbb63ecc88122cb76cd8b58f1727250773.jpg",
      title: "TB CT TẶNG CHUYẾN DU LỊCH DU THUYỀN HẠ LONG 5 SAO NHÂN 8/3",
    },
    {
      id: 6,
      image: "https://tapmed.vn/storage/image/1117292255751731513589.png",
      title: `😍Chúc mừng ngày "DƯỢC SĨ THẾ GIỚI" 25/9`,
    },
  ];

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
          <Slider data={data} settings={sliderSettings} />
        </div>
      </div>
    </section>
  );
};

export default SectionBlog;
