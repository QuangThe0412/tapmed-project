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
      imageUrl: "https://tapmed.vn/storage/image/Artboard 121702022945.png",
      link: "/san-pham/aki-maxdusen-duong-tam-an-hop-3-vi-x-10-vien-tapmed-17342.html",
    },
    {
      id: 2,
      title: "Xinorli Orlistat 120Mg 2 Vỉ X 21 Viên Reliv - Tapmed",
      imageUrl: "https://tapmed.vn/storage/image/Artboard 181702022881.png",
      link: "/san-pham/xinorli-orlistat-120mg-2-vi-x-21-vien-reliv-tapmed-17955.html",
    },
    {
      id: 3,
      title: "Bio Thanh Giong Men Tiêu Hoá Hộp 20 Ống X 10Ml - Tapmed",
      imageUrl: "https://tapmed.vn/storage/image/Artboard 141702022833.png",
      link: "/san-pham/bio-thanh-giong-men-tieu-hoa-hop-20-ong-x-10ml-tapmed-18117.html",
    },
    {
      id: 4,
      title: "Aki Cerekan Giloba Hộp 6 Vỉ X 5 Viên - Tapmed",
      imageUrl: "https://tapmed.vn/storage/image/Artboard 31702022820.png",
      link: "/san-pham/aki-cerekan-giloba-hop-6-vi-x-5-vien-tapmed-18181.html",
    },
    {
      id: 5,
      title: "Aki Feron Hộp 3 Vỉ X 10 Viên - Tapmed",
      imageUrl: "https://tapmed.vn/storage/image/aki1717995559.jpg",
      link: "/san-pham/aki-feron-hop-3-vi-x-10-vien-tapmed-18948.html",
    },
    {
      id: 6,
      title: "Melamkid Zinc Hộp 20 Ống X 10Ml - Tapmed",
      imageUrl: "https://tapmed.vn/storage/image/Capture1727840630.PNG",
      link: "/san-pham/melamkid-zinc-hop-20-ong-x-10ml-tapmed-19747.html",
    },
    {
      id: 7,
      title: "Melamkid Fegyma Hộp 20 Ống X 10Ml - Tapmed",
      imageUrl: "https://tapmed.vn/storage/image/Capture1727840474.PNG",
      link: "/san-pham/melamkid-fegyma-hop-20-ong-x-10ml-tapmed-19748.html",
    },
    {
      id: 8,
      title: "Melamkid Chất Xơ Hữu Cơ - Hộp 20 Ống X 10Ml - Tapmed",
      imageUrl: "https://tapmed.vn/storage/image/Capture1728289914.PNG",
      link: "/san-pham/melamkid-chat-xo-huu-co-hop-20-ong-x-10ml-tapmed-19784.html",
    },
    {
      id: 9,
      title: "Viên Giải Rượu Non Alco Hộp 4 Viên - Tapmed",
      imageUrl:
        "https://tapmed.vn/storage/image/giải rượu vitath1728379890.jpg",
      link: "/san-pham/vien-giai-ruou-non-alco-hop-4-vien-tapmed-19803.html",
    },
    {
      id: 10,
      title: "Calcium D3-K2 Tap Hộp 30 Viên - Tapmed",
      imageUrl: "https://tapmed.vn/storage/image/d3 -k21729586975.PNG",
      link: "/san-pham/calcium-d3-k2-tap-hop-30-vien-tapmed-19807.html",
    },
    {
      id: 11,
      title: "Viên Tiểu Đêm - Tap Hộp 30 Viên - Tapmed",
      imageUrl: "https://tapmed.vn/storage/image/11729571484.png",
      link: "/san-pham/vien-tieu-dem-tap-hop-30-vien-tapmed-19872.html",
    },
    {
      id: 12,
      title: "An Tràng 2In1 Gold Tap Hộp 60 Viên -Tapmed",
      imageUrl: "https://tapmed.vn/storage/image/an tràng1729735150.jpg",
      link: "/san-pham/an-trang-2in1-gold-tap-hop-60-vien-tapmed-19889.html",
    },
    {
      id: 13,
      title: "An Dạ Nexigastro Hộp 30 Viên - Tapmed",
      imageUrl: "https://tapmed.vn/storage/image/an dạ1729850500.PNG",
      link: "/san-pham/an-da-nexigastro-hop-30-vien-tapmed-19904.html",
    },
    {
      id: 14,
      title: "Viên Ngậm Bảo Khí Thanh Strepa Extra Hộp 20 Viên - Tapmed",
      imageUrl: "https://tapmed.vn/storage/image/199561730960113.jpg",
      link: "/san-pham/vien-ngam-bao-khi-thanh-strepa-extra-hop-20-vien-tapmed-19956.html",
    },
  ];

  const sliderSettings = {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 10,
    navigation: false,
    // autoplay: {
    //   delay: 2000,
    //   disableOnInteraction: false,
    // },
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
