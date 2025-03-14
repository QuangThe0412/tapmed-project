import React from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { SliderWithoutContent } from "@src/component/slider/sliderWithoutContent";

type ProductDetailSliderProps = {
  images: string[];
};

const ProductDetailSlider: React.FC<ProductDetailSliderProps> = ({
  images,
}) => {
  const imagesData = images.map((imageUrl) => ({ imageUrl }));

  const settings = {
    autoHeight: true,
    loop: true,
    navigation: true,
    pagination: {
      clickable: true,
    },
    // autoplay: {
    //   delay: 2000,
    //   disableOnInteraction: false,
    // },
    modules: [Autoplay, EffectFade, Navigation, Pagination],
  };

  return (
    <>
      <SliderWithoutContent data={imagesData} settings={settings} />
    </>
  );
};

export default ProductDetailSlider;
