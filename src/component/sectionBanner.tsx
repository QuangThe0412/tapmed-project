import React from "react";
import { DataSlider, Slider } from "./splide/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

const SectionBanner: React.FC = () => {
  const bannerImgs: DataSlider[] = [
    {
      imageUrl:
        "https://tapmed.vn/upload_editor/posts/images/Artboard%201%402x-8.png",
    },
    {
      imageUrl:
        "https://tapmed.vn/upload_editor/posts/images/z5684638969760_f99dd5bc5361df1570bf4bb016160442.jpg",
    },
    {
      imageUrl:
        "https://tapmed.vn/upload_editor/posts/images/z5656506777743_4ae5e7479b3c112072fee737530a3167.jpg",
    },
    {
      imageUrl:
        "https://tapmed.vn/upload_editor/posts/images/z5660296545770_29416ba6fd447ee30c73d372526caf2b.jpg",
    },
  ];

  const bannerSettings = {
    type: "loop",
    drag: "free",
    perPage: 1,
    arrows: true,
    pagination: true,
    autoplay: true,
    interval: 2000,
    extensions: { AutoScroll },
    autoScroll: {
      pauseOnHover: false,
      pauseOnFocus: false,
      rewind: false,
      speed: 1,
    },
  };

  return (
    <section className="section-banner">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8 col-12">
            <Slider data={bannerImgs} settings={bannerSettings} />
          </div>
          <div className="col-xl-4 col-lg-4 col-12">
            <div id="form-booking">
              <h3 style={{ fontSize: "17px !important" }}>
                Liên Hệ Đặt Hàng (HOTLINE: 0963.74.4567)
              </h3>
              <div id="alert-danger-trieu">
                <div className="alert alert-danger">
                  <ul>
                    <li style={{ fontSize: "12px" }}>
                      {" "}
                      Quý khách đã có tài khoản vui lòng chọn đăng nhập.{" "}
                    </li>
                  </ul>
                </div>
              </div>
              <form action="" method="">
                <div className="form-group">
                  <label>Họ và tên</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    required
                    placeholder="Tên đầy đủ của bạn"
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    className="form-control"
                    required
                    placeholder="Số điện thoại"
                  />
                </div>
                <div className="form-group">
                  <label>Tên cơ sở kinh doanh</label>
                  <input
                    type="text"
                    id="business"
                    name="business"
                    className="form-control"
                    required
                    placeholder="Tên cơ sở kinh doanh"
                  />
                </div>
                <div className="form-group">
                  <label>Địa chỉ</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="form-control"
                    required
                    placeholder="Địa chỉ"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Liên hệ ngay
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionBanner;
