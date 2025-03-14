import { Autoplay, Pagination } from "swiper/modules";
import { DataSlider, Slider } from "../slider/slider";
import "./sectionHotSale.css";

const SectionHotSale: React.FC = () => {
  const data: DataSlider[] = [
    {
      id: 1,
      title: "TB CT TẶNG CHUYẾN DU LỊCH DU THUYỀN HẠ LONG 5 SAO NHÂN 8/3",
      image: "https://tapmed.vn/storage/image/tapmed1734411099.jpg",
    },
    {
      id: 2,
      title: "Chương trình khuyến mại voucher cước",
      image: "https://tapmed.vn/storage/image/1117292255751731513589.png",
    },
    {
      id: 3,
      title:
        "Tháng 8 rực rỡ với Thạch Junior Calcium Jelly 🌟: Mua 1 tặng 1, quà tặng siêu cute! 🎁",
      image:
        "https://tapmed.vn/storage/image/z5726275886617_2127645f3ceacf59b0a487b2b18bcd591723530689.jpg",
    },
    {
      id: 4,
      title: "Chương trình khuyến mại voucher cước",
      image: "https://tapmed.vn/storage/image/1117292255751731513589.png",
    },
  ];

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
          <Slider data={data} settings={sliderSettings} />
        </div>
      </div>
    </section>
  );
};

export default SectionHotSale;
