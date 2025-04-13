import { useState } from "react";
import "./sectionAbout.css";
import { Link } from "react-router-dom";

const SectionAbout: React.FC = () => {
  const [activeTab, setActiveTab] = useState("vision");

  return (
    <section className="section-about">
      <div className="container">
        <div className="block-title">
          <h3>
            Giới thiệu về <span style={{ color: "#136d39" }}>TAP</span>
            <span>MED</span>
          </h3>
        </div>
        <div className="tabs-container">
          <ul className="nav nav-tabs">
            <div className="icon">
              <img
                src="https://tapmed.vn/TapMedVn/images/icon-about.png"
                alt="Dược phẩm TAPMED"
              />
            </div>
            <li>
              <Link
                data-toggle="tab"
                to="#home"
                className={activeTab === "vision" ? "active" : ""}
                onClick={() => setActiveTab("vision")}
              >
                Tầm nhìn
              </Link>
            </li>
            <li>
              <Link
                data-toggle="tab"
                to="#menu1"
                className={activeTab === "mission" ? "active" : ""}
                onClick={() => setActiveTab("mission")}
              >
                Sứ mệnh
              </Link>
            </li>
          </ul>

          <div className="tab-content">
            <div
              id="vision"
              className={activeTab === "vision" ? "show" : "hidden"}
            >
              <p style={{ fontSize: 18, textAlign: "justify" }}>
                Tapmed muốn trở thành công ty hàng đầu tại Việt Nam trong lĩnh
                vực y tế, tiên phong trong việc cung cấp nguồn thuốc sỉ tới tay
                khách hàng một cách tiện lợi và nhanh chóng, nâng cao chất lượng
                chăm sóc sức khỏe cộng đồng.
                <br />
                Với mục tiêu cung cấp dịch vụ y tế chất lượng cao và chi phí hợp
                lý, Tapmed cam kết tạo nên một hệ thống y tế bền vững, đổi mới
                và hiệu quả.
              </p>
            </div>
            <div
              id="mission"
              className={activeTab === "mission" ? "show" : "hidden"}
            >
              <p style={{ fontSize: 18, textAlign: "justify" }}>
                Sứ mệnh của Tapmed: Cung cấp mô hình nhập thuốc dễ dàng giải
                quyết vấn đề y tế một cách nhanh chóng và chất lượng.
                <br />
                Đối với Quý khách hàng: Sử dụng dịch vụ các giải pháp đặt hàng
                dược phẩm và được giải quyết vấn đề nhanh chóng, chất lượng với
                các cam kết về nguồn gốc sản phẩm và hiệu quả chi phí.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionAbout;
