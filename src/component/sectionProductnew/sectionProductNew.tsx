import React from "react";
import { DataSlider, Slider } from "../slider/slider";
import "./sectionProductNew.css";
import { Autoplay, Pagination } from "swiper/modules";

const SectionProductNew: React.FC = () => {
  // Product data
  const products: DataSlider[] = [
    {
      id: 1,
      title: "Aki Maxdusen Dưỡng Tâm An Hộp 3 Vỉ X 10 Viên - Tapmed",
      image: "https://tapmed.vn/storage/image/Artboard 121702022945.png",
    },
    {
      id: 2,
      title: "Xinorli Orlistat 120Mg 2 Vỉ X 21 Viên Reliv - Tapmed",
      image: "https://tapmed.vn/storage/image/Artboard 181702022881.png",
    },
    {
      id: 3,
      title: "Bio Thanh Giong Men Tiêu Hoá Hộp 20 Ống X 10Ml - Tapmed",
      image: "https://tapmed.vn/storage/image/Artboard 141702022833.png",
    },
    {
      id: 4,
      title: "Aki Cerekan Giloba Hộp 6 Vỉ X 5 Viên - Tapmed",
      image: "https://tapmed.vn/storage/image/Artboard 31702022820.png",
    },
    {
      id: 5,
      title: "Aki Feron Hộp 3 Vỉ X 10 Viên - Tapmed",
      image: "https://tapmed.vn/storage/image/aki1717995559.jpg",
    },
    {
      id: 6,
      title: "Melamkid Zinc Hộp 20 Ống X 10Ml - Tapmed",
      image: "https://tapmed.vn/storage/image/Capture1727840630.PNG",
    },
    {
      id: 7,
      title: "Melamkid Fegyma Hộp 20 Ống X 10Ml - Tapmed",
      image: "https://tapmed.vn/storage/image/Capture1727840474.PNG",
    },
    {
      id: 8,
      title: "Melamkid Chất Xơ Hữu Cơ - Hộp 20 Ống X 10Ml - Tapmed",
      image: "https://tapmed.vn/storage/image/Capture1728289914.PNG",
    },
    {
      id: 9,
      title: "Viên Giải Rượu Non Alco Hộp 4 Viên - Tapmed",
      image: "https://tapmed.vn/storage/image/giải rượu vitath1728379890.jpg",
    },
    {
      id: 10,
      title: "Calcium D3-K2 Tap Hộp 30 Viên - Tapmed",
      image: "https://tapmed.vn/storage/image/d3 -k21729586975.PNG",
    },
    {
      id: 11,
      title: "Viên Tiểu Đêm - Tap Hộp 30 Viên - Tapmed",
      image: "https://tapmed.vn/storage/image/11729571484.png",
    },
    {
      id: 12,
      title: "An Tràng 2In1 Gold Tap Hộp 60 Viên -Tapmed",
      image: "https://tapmed.vn/storage/image/an tràng1729735150.jpg",
    },
    {
      id: 13,
      title: "An Dạ Nexigastro Hộp 30 Viên - Tapmed",
      image: "https://tapmed.vn/storage/image/an dạ1729850500.PNG",
    },
    {
      id: 14,
      title: "Viên Ngậm Bảo Khí Thanh Strepa Extra Hộp 20 Viên - Tapmed",
      image: "https://tapmed.vn/storage/image/199561730960113.jpg",
    },
  ];

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
          <Slider data={products} settings={sliderSettings} />
        </div>
      </div>
    </section>
  );
};

export default SectionProductNew;
