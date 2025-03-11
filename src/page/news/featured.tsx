import { Autoplay, Pagination } from "swiper/modules";
import { SliderMoreInfo } from "../../component/slider/sliderMoreInfo";
import { NewsDataType } from "./news";
import "./news.css";

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

const FeaturedComponent: React.FC<{ data: NewsDataType[] }> = ({ data }) => {
  return (
    <div className="blogs-featured">
      <div className="container">
        <div className="block-title">
          <h2>Tin tức nổi bật</h2>
        </div>
        <div className="block-content">
          <SliderMoreInfo data={data} settings={sliderSettings} />
        </div>
      </div>
    </div>
  );
};

export default FeaturedComponent;
