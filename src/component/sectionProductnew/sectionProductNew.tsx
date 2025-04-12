import React, { useEffect, useState } from "react";
import { DataSlider, Slider } from "../slider/slider";
import "./sectionProductNew.css";
import { Autoplay, Pagination } from "swiper/modules";
import { generateSlug } from "@src/utils/common";
import { getNewestProducts } from "../../page/product/productEndPoint";
import { ProductItemType } from "@src/types/typeProduct";

const SectionProductNew: React.FC = () => {
  const [products, setProducts] = useState<DataSlider[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = (await getNewestProducts()) as ProductItemType[];
      if (!res) {
        throw new Error("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      }

      const _products = res.map((item) => {
        const { name: title, id, imageUrls } = item;

        const slug = generateSlug(title);
        const url = `/products/${slug}-${id}.html`;
        const image = imageUrls ? imageUrls[0] : "";

        return {
          title,
          link: url,
          image,
        };
      }) as DataSlider[];

      setProducts(_products);
    };

    fetchData();
  }, []);

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
