import React from "react";
import { DataSlider, Slider } from "../slider/slider";
import "./sectionProductNew.css";
import { Autoplay, Pagination } from "swiper/modules";
import { useProductStore } from "@src/stores/productStore";

const SectionProductNew: React.FC = () => {
  const { products } = useProductStore();
  const _products = [] as DataSlider[];
  products.forEach((item) => {
    _products.push({
      id: item.id,
      title: item.name,
      link: item?.link || "#",
      image: item.images ? item.images[0] : "",
    });
  });

  const sliderSettings = {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 10,
    navigation: false,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    modules: [Autoplay, Pagination],
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 5,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 6,
        spaceBetween: 20,
      },
    },
  };

  return (
    <section className="section-product-new">
      <div className="container">
        <div className="block-title">
          <h3>SẢN PHẨM NỔI BẬT</h3>
        </div>
        <div className="block-content">
          <Slider data={_products} settings={sliderSettings} />
        </div>
      </div>
    </section>
  );
};

export default SectionProductNew;
