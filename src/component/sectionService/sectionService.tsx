import React from "react";
import "./sectionService.css";

type itemsProps = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

const ItemComponent = (props: itemsProps) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-6">
      <div className="item">
        <div className="icon mb-4 flex items-center justify-center">
          <img src={props.src} alt={props.alt} />
        </div>
        <div className="main">
          <h3 className="text-lg font-semibold">{props.title}</h3>
          <p className="mt-2 text-gray-700 text-sm">{props.description}</p>
        </div>
      </div>
    </div>
  );
};

const data = [
  {
    src: "https://tapmed.vn/TapMedVn/images/service-icon-1.svg",
    alt: "Sản phẩm chất lượng",
    title: "Sản phẩm chất lượng",
    description: "Từ nhà máy nhà phân phối uy tín",
  },
  {
    src: "https://tapmed.vn/TapMedVn/images/service-icon-2.svg",
    alt: "Hướng dẫn đặt hàng",
    title: "Hướng dẫn đặt hàng",
    description: "Giao diện dễ sử dụng thao tác nhanh gọn",
  },
  {
    src: "https://tapmed.vn/TapMedVn/images/service-icon-3.svg",
    alt: "Đội ngũ chuyên nghiệp",
    title: "Đội ngũ chuyên nghiệp",
    description: "Tư vấn miễn phí, tận tình và chu đáo",
  },
  {
    src: "https://tapmed.vn/TapMedVn/images/service-icon-4.svg",
    alt: "Giao hàng nhanh",
    title: "Giao hàng nhanh",
    description: "Đảm bảo thời gian giao hàng nhanh nhất, an toàn và tin cậy",
  },
];

const SectionService: React.FC = () => {
  return (
    <section className="section-service">
      <div className="container mx-auto px-4">
        <div className="block-title mb-6">
          <h3>Dịch vụ của chúng tôi</h3>
        </div>
        <div className="flex flex-wrap -mx-4">
          {data.map((item, index) => (
            <ItemComponent
              key={index}
              src={item.src}
              alt={item.alt}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionService;
