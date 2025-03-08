import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { DataSlider, Slider } from "./splide/splide";

const SectionHotSale: React.FC = () => {
  const data: DataSlider[] = [
    {
      id: 1,
      title: "TB CT TẶNG CHUYẾN DU LỊCH DU THUYỀN HẠ LONG 5 SAO NHÂN 8/3",
      imageUrl: "https://tapmed.vn/storage/image/tapmed1734411099.jpg",
      link: "https://tapmed.vn/tin-tuc/tb-ct-tang-chuyen-du-lich-du-thuyen-ha-long-5-sao-nhan-83-139.html",
    },
    {
      id: 2,
      title: "Chương trình khuyến mại voucher cước",
      imageUrl: "https://tapmed.vn/storage/image/1117292255751731513589.png",
      link: "https://tapmed.vn/tin-tuc/chuong-trinh-khuyen-mai-voucher-cuoc-135.html",
    },
    {
      id: 3,
      title:
        "Tháng 8 rực rỡ với Thạch Junior Calcium Jelly 🌟: Mua 1 tặng 1, quà tặng siêu cute! 🎁",
      imageUrl:
        "https://tapmed.vn/storage/image/z5726275886617_2127645f3ceacf59b0a487b2b18bcd591723530689.jpg",
      link: "https://tapmed.vn/tin-tuc/thang-8-ruc-ro-voi-thach-junior-calcium-jelly-mua-1-tang-1-qua-tang-sieu-cute-104.html",
    },
  ];

  const sliderSettings = {
    type: "loop",
    drag: "free",
    focus: "center",
    perPage: 3,
    gap: 20,
    arrows: false,
    pagination: true,
    // autoplay: true,
    interval: 2000,
    extensions: { AutoScroll },
    autoScroll: {
      pauseOnHover: false,
      pauseOnFocus: false,
      rewind: false,
      speed: 1,
    },
    breakpoints: {
      768: {
        perPage: 2,
      },
      576: {
        perPage: 1,
      },
    },
  };

  return (
    <section className="section-hot-sale">
      <div className="container">
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
