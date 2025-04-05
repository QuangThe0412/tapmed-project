import { DataSlider, Slider } from "../slider/slider";
import "./sectionBanner.css";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import FormBooking from "./formBooking";
import { SliderWithoutContent } from "../slider/sliderWithoutContent";
import useBlogStore from "@src/stores/useBlogStore";
import ChatMessage from "../chatMessage/chatMessage";

const SectionBanner: React.FC = () => {
  const { blogPosts } = useBlogStore();
  let featuredData: DataSlider[] = [];

  if (blogPosts && blogPosts.length > 0) {
    featuredData = blogPosts
      .filter((item) => !!item.featured === true)
      .slice(0, 5) as DataSlider[];
  }

  const bannerSettings = {
    autoHeight: true,
    loop: true,
    navigation: true,
    pagination: {
      clickable: true,
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    modules: [Autoplay, EffectFade, Navigation, Pagination],
  };

  return (
    <section className="section-banner py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap w-full">
          <div className="w-full lg:w-8/12 px-1 overflow-hidden rounded-2xl">
            <SliderWithoutContent
              data={featuredData}
              settings={bannerSettings}
            />
          </div>
          <div className="w-full lg:w-4/12 px-1">
            {/* <FormBooking /> */}
            <ChatMessage />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionBanner;
