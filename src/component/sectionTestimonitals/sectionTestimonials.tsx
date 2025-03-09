import React from "react";
import "./sectionTestimonials.css";
import { Autoplay, Pagination } from "swiper/modules";
import { CustomerProps, SliderCustomer } from "../slider/sliderCustomer";

const SectionTestimonials: React.FC = () => {
  const data: CustomerProps[] = [
    {
      name: "Chị Lan",
      address: "TP. Hồ Chí Minh",
      avatar: "https://tapmed.vn/TapMedVn/images/av2.jpg",
      content:
        "Tôi rất hài lòng với dịch vụ của Tapmed. Thuốc được giao nhanh chóng và đúng hẹn, chất lượng đảm bảo. Đặc biệt, nhân viên tư vấn rất nhiệt tình và chu đáo. Tôi chắc chắn sẽ tiếp tục hợp tác lâu dài với Tapmed.",
    },
    {
      name: "Anh Hùng",
      address: "Hà Nội",
      avatar: "https://tapmed.vn/TapMedVn/images/av1.jpg",
      content:
        "Tapmed luôn cung cấp các sản phẩm thuốc sỉ với giá cả hợp lý và chất lượng đáng tin cậy. Quy trình đặt hàng và giao nhận rất chuyên nghiệp, giúp tôi yên tâm hơn trong công việc kinh doanh của mình.",
    },
    {
      name: "Chị Hoa",
      address: "Đà Nẵng",
      avatar: "https://tapmed.vn/TapMedVn/images/av4.jpg",
      content:
        "Tapmed không chỉ cung cấp thuốc chất lượng mà còn có dịch vụ chăm sóc khách hàng tuyệt vời và hỗ trợ kịp thời khi có bất kỳ vấn đề nào phát sinh. Cảm ơn Tapmed đã đồng hành cùng chúng tôi!",
    },
    {
      name: "Anh Tuấn",
      address: "Cần Thơ",
      avatar: "https://tapmed.vn/TapMedVn/images/av5.jpg",
      content:
        "Tapmed thực sự là đối tác tin cậy của chúng tôi. Chất lượng thuốc luôn đảm bảo, giá cả cạnh tranh, và dịch vụ hậu mãi tốt. Tôi rất ấn tượng với cách Tapmed xử lý các đơn hàng và giao hàng nhanh chóng.",
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
    <section className="section-testimonials">
      <div className="container px-4">
        <div className="block-title">
          <h3>
            Khách hàng nói gì về <span style={{ color: "#136d39" }}>TAP</span>
            <span>MED</span>
          </h3>
        </div>
        <div className="block-content">
          {data && <SliderCustomer data={data} settings={sliderSettings} />}
        </div>
      </div>
    </section>
  );
};

export default SectionTestimonials;
