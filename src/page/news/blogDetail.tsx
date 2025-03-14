import React, { useEffect } from "react";
import "./blogDetail.css";
import { getIdFromSlug } from "@src/utils/common";
import { Autoplay, Pagination } from "swiper/modules";
import { SliderMoreInfo } from "@src/component/slider/sliderMoreInfo";

const BlogDetails: React.FC = () => {
  const fetchNewsData = async () => {
    try {
      const data = await import("@dataMockup/blogData.json");
      return data.default;
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  const [newsData, setNewsData] = React.useState<any>(null);
  useEffect(() => {
    fetchNewsData().then((data) => setNewsData(data));
  }, []);

  const id = getIdFromSlug();
  const news = newsData?.find((item: any) => item.id === id);
  const { title, image, content } = news || {};

  const sliderSettings = {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: false,
    // autoplay: {
    //   delay: 2000,
    //   disableOnInteraction: false,
    // },
    modules: [Autoplay, Pagination],
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
    },
  };

  return (
    <section className="layout-page">
      <div className="container mx-auto px-4">
        <div className="py-5">
          <div className="w-full text-center">
            <span className="text-3xl font-bold text-center">{title}</span>
          </div>
          <div className="flex flex-wrap justify-center my-5">
            <div className="w-full md:w-1/2 lg:w-1/3 mx-auto">
              <img
                src={image}
                alt={title}
                className="max-w-full h-auto rounded"
              />
            </div>
          </div>
          <div
            className="text-base text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>

      <div className="py-5 bg-gray-100">
        <div className="container mx-auto px-0 lg:px-4">
          <div className="mb-5">
            <h2 className="text-3xl text-center font-bold">Tin tức khác</h2>
          </div>
          <div className="w-screen lg:w-full">
            <SliderMoreInfo data={newsData} settings={sliderSettings} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
