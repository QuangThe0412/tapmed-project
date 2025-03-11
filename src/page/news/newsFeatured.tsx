import { Autoplay, Pagination } from "swiper/modules";
import { SliderMoreInfo } from "../../component/slider/sliderMoreInfo";
import { NewsDataType } from "./news";
import "./news.css";

// Dữ liệu tin tức nổi bật
const featuredPosts: NewsDataType[] = [
  {
    id: 124,
    title: "⛈️5 nhóm bệnh cần đặc biệt chú ý sau bão lũ và cách phòng tránh",
    imageUrl:
      "https://tapmed.vn/storage/image/z5862634041994_e61eaaa007e861c2e0f3d0ea6b0155271727167728.jpg",
    link: "https://tapmed.vn/tin-tuc/5-nhom-benh-can-dac-biet-chu-y-sau-bao-lu-va-cach-phong-tranh-124.html",
    content:
      "Mưa, ngập úng là điều kiện thuận lợi để các mầm bệnh sinh sôi và gây bệnh cho con người. Các vi sinh vật, rác, chất thải… theo dòng nước tràn ra nhiều nơi, gây ô nhiễm môi trường.",
  },
  {
    id: 123,
    title:
      "😫Khô rát cổ họng? 5 giải pháp đơn giản giúp bạn vượt qua mùa gió mùa",
    imageUrl:
      "https://tapmed.vn/storage/image/z5862633973588_ca90bbb8eb22a31c2294cdd7e343f65c1727167683.jpg",
    link: "https://tapmed.vn/tin-tuc/kho-rat-co-hong-5-giai-phap-don-gian-giup-ban-vuot-qua-mua-gio-mua-123.html",
    content:
      "Mùa gió mùa với thời tiết hanh khô khiến cổ họng của chúng ta dễ bị khô rát, gây ra nhiều khó chịu. Để bảo vệ cổ họng, hãy cùng tham khảo 4 cách chăm sóc đơn giản nhưng hiệu quả sau đây:",
  },
  {
    id: 121,
    title: '3 PHƯƠNG PHÁP GIÚP "CỘT SỐNG" GEN Z LUÔN KHỎE MẠNH',
    imageUrl:
      "https://tapmed.vn/storage/image/z5838365428255_ecb7ed6e62ec0535096d2ea348c6d0a91726539060.jpg",
    link: "https://tapmed.vn/tin-tuc/3-phuong-phap-giup-cot-song-gen-z-luon-khoe-manh-121.html",
    content: "Thay đổi lối sống sẽ giúp bạn khỏe hơn mỗi ngày !!",
  },
  {
    id: 119,
    title: "🌧️Phòng chống dịch bệnh trong và sau mùa mưa bão số 3",
    imageUrl:
      "https://tapmed.vn/storage/image/z5818843251347_f3270fd4bd4e97197916b6e7db7074841726025369.jpg",
    link: "https://tapmed.vn/tin-tuc/phong-chong-dich-benh-trong-va-sau-mua-mua-bao-so-3-119.html",
    content:
      "Mùa mưa bão đang diễn ra, thời tiết bất thường kèm theo lũ lớn đổ về gây ngập lụt và tình trạng ô nhiễm môi trường là điều kiện thuận lợi làm cho dịch bệnh phát triển mạnh",
  },
  {
    id: 118,
    title: "🌧️ CHẬM TRỄ ĐƠN HÀNG DO TÌNH HÌNH MƯA BÃO KÉO DÀI 🌧️",
    imageUrl:
      "https://tapmed.vn/storage/image/z5815133354042_fe8e2b696e6f84583ab9d65cc8a701ac1725937108.jpg",
    link: "https://tapmed.vn/tin-tuc/cham-tre-don-hang-do-tinh-hinh-mua-bao-keo-dai-118.html",
    content: "Tapmed xin thông báo 📢 do ảnh hưởng của mưa bão và các tuyến",
  },
];

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

const NewsFeatured = () => {
  return (
    <div className="blogs-featured">
      <div className="container">
        <div className="block-title">
          <h2>Tin tức nổi bật</h2>
        </div>
        <div className="block-content">
          <SliderMoreInfo data={featuredPosts} settings={sliderSettings} />
        </div>
      </div>
    </div>
  );
};

export default NewsFeatured;
