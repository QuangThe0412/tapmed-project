import "./sectionSteps.css";

const SectionSteps: React.FC = () => {
  return (
    <div className="section-steps">
      <div className="container">
        <div className="block-title">
          <h3>
            Các bước trở thành khách hàng{" "}
            <span style={{ color: "#136d39" }}>TAP</span>
            <span>MED</span>
          </h3>
        </div>
        <div className="block-content">
          <div className="items step-old">
            <div className="item-space"></div>
            <div className="item-steps">
              <div className="step-icon">1</div>
              <div className="step-content">
                <h3>Đăng kí tài khoản</h3>
                <p>Cung cấp thông tin:</p>
                <ul>
                  <li>Họ tên khách hàng.</li>
                  <li>Tên cơ sở kinh doanh</li>
                  <li>Số điện thoại khách hàng</li>
                  <li>Địa chỉ khách hàng</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="items step-even">
            <div className="item-steps">
              <div className="step-icon">2</div>
              <div className="step-content">
                <h3>Kích hoạt tài khoản</h3>
                <p style={{ textAlign: "justify" }}>
                  Sau khi đăng ký tài khoản, nhân viên TAPMED sẽ liên hệ trong
                  vòng 24 giờ để xác nhận thông tin đã cung cấp và kích hoạt tài
                  khoản.
                </p>
              </div>
            </div>
            <div className="item-space"></div>
          </div>
          <div className="items step-old">
            <div className="item-space"></div>
            <div className="item-steps">
              <div className="step-icon">3</div>
              <div className="step-content">
                <h3>Đăng nhập và tra cứu sản phẩm</h3>
                <p style={{ textAlign: "justify" }}>
                  Đăng nhập và tra cứu sản phẩm tìm kiếm tên thuốc, khám phá các
                  chương trình khuyến mại - ưu đãi - quà tặng.
                </p>
              </div>
            </div>
          </div>
          <div className="items step-even">
            <div className="item-steps">
              <div className="step-icon">4</div>
              <div className="step-content">
                <h3>Đặt hàng</h3>
                <p>
                  Đặt hàng thành công, nhân viên kinh doanh liên hệ xác nhận đơn
                  hàng.
                </p>
              </div>
            </div>
            <div className="item-space"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionSteps;
