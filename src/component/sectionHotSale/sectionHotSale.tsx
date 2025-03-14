import { Autoplay, Pagination } from "swiper/modules";
import { DataSlider, Slider } from "../slider/slider";
import "./sectionHotSale.css";
import useBlogStore from "@src/stores/blogStore";

const SectionHotSale: React.FC = () => {
  const { blogPosts } = useBlogStore();

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
    <section className="section-hot-sale flex justify-center">
      <div className="container px-3">
        <div className="block-title">
          <h3>Ưu đãi mới hôm nay</h3>
        </div>
        <div className="block-content">
          <Slider data={blogPosts as DataSlider[]} settings={sliderSettings} />
        </div>
      </div>
    </section>
  );
};

export default SectionHotSale;
