import { Autoplay, Pagination } from "swiper/modules";
import { DataSlider, Slider } from "../slider/slider";
import "./sectionHotSale.css";
import useBlogStore from "@src/stores/useBlogStore";

const SectionHotSale: React.FC = () => {
  const { blogPosts } = useBlogStore();
  let _data: DataSlider[] = [];

  if (blogPosts && blogPosts?.length > 0) {
    _data = blogPosts
      .filter((item) => item.category === "promotion")
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
    <section className="section-hot-sale flex justify-center">
      <div className="container px-3">
        <div className="block-title">
          <h3>Ưu đãi mới hôm nay</h3>
        </div>
        <div className="block-content">
          <Slider data={_data} settings={sliderSettings} />
        </div>
      </div>
    </section>
  );
};

export default SectionHotSale;
