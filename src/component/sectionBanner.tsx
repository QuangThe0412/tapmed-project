import React from "react";

const SectionBanner: React.FC = () => {
  return (
    <section className="section-banner">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8 col-12">
            <section
              className="splide splide--loop splide--ltr splide--draggable is-active is-overflow is-initialized"
              aria-labelledby="carousel-heading"
              id="splide01"
              aria-roledescription="carousel"
            >
              <div className="splide__arrows splide__arrows--ltr">
                <button
                  className="splide__arrow splide__arrow--prev"
                  type="button"
                  aria-label="Previous slide"
                  aria-controls="splide01-track"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 40 40"
                    width="40"
                    height="40"
                    focusable="false"
                  >
                    <path d="m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z"></path>
                  </svg>
                </button>
                <button
                  className="splide__arrow splide__arrow--next"
                  type="button"
                  aria-label="Next slide"
                  aria-controls="splide01-track"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 40 40"
                    width="40"
                    height="40"
                    focusable="false"
                  >
                    <path d="m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z"></path>
                  </svg>
                </button>
              </div>
              <div
                className="splide__track splide__track--loop splide__track--ltr splide__track--draggable"
                id="splide01-track"
                style={{ paddingLeft: 0, paddingRight: 0 }}
                aria-live="off"
                aria-atomic="true"
                aria-busy="false"
              >
                <ul
                  className="splide__list"
                  id="splide01-list"
                  role="presentation"
                  style={{
                    transform: "translateX(-5840px)",
                    transition:
                      "transform 1000ms cubic-bezier(0.25, 1, 0.5, 1)",
                  }}
                >
                  <li
                    className="splide__slide splide__slide--clone"
                    id="splide01-clone01"
                    role="tabpanel"
                    aria-roledescription="slide"
                    aria-label="7 of 8"
                    style={{ width: "calc(100%)", height: "401.5px" }}
                    aria-hidden="true"
                  >
                    <a href="#" tabIndex={-1}>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        className="owl-lazy"
                        data-src="/upload_editor/posts/images/Artboard%202%402x-8.png"
                        alt=""
                        src="/upload_editor/posts/images/Artboard%202%402x-8.png"
                      />
                    </a>
                  </li>
                  <li
                    className="splide__slide splide__slide--clone"
                    id="splide01-clone02"
                    role="tabpanel"
                    aria-roledescription="slide"
                    aria-label="8 of 8"
                    style={{ width: "calc(100%)", height: "401.5px" }}
                    aria-hidden="true"
                  >
                    <a
                      href="https://tapmed.vn/trang-san-pham.html?policy_id=1"
                      tabIndex={-1}
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        className="owl-lazy"
                        data-src="/upload_editor/posts/images/z5660296545770_29416ba6fd447ee30c73d372526caf2b.jpg"
                        alt=""
                        src="/upload_editor/posts/images/z5660296545770_29416ba6fd447ee30c73d372526caf2b.jpg"
                      />
                    </a>
                  </li>
                  <li
                    className="splide__slide"
                    id="splide01-slide01"
                    role="tabpanel"
                    aria-roledescription="slide"
                    aria-label="1 of 8"
                    style={{ width: "calc(100%)", height: "401.5px" }}
                    aria-hidden="true"
                  >
                    <a
                      href="https://tapmed.vn/tin-tuc/tb-ct-tang-chuyen-du-lich-du-thuyen-ha-long-5-sao-nhan-83-139.html"
                      tabIndex={-1}
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        className="owl-lazy"
                        data-src="/upload_editor/posts/files/tapmed.jpg"
                        alt=""
                        src="/upload_editor/posts/files/tapmed.jpg"
                      />
                    </a>
                  </li>
                  <li
                    className="splide__slide"
                    id="splide01-slide02"
                    role="tabpanel"
                    aria-roledescription="slide"
                    aria-label="2 of 8"
                    style={{ width: "calc(100%)", height: "401.5px" }}
                    aria-hidden="true"
                  >
                    <a
                      href="https://tapmed.vn/tin-tuc/chuong-trinh-khuyen-mai-voucher-cuoc-135.html"
                      tabIndex={-1}
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        className="owl-lazy"
                        data-src="/upload_editor/posts/files/2024-10-15-03%20-%20BANNER%20WEB.png"
                        alt=""
                        src="/upload_editor/posts/files/2024-10-15-03%20-%20BANNER%20WEB.png"
                      />
                    </a>
                  </li>
                  <li
                    className="splide__slide"
                    id="splide01-slide03"
                    role="tabpanel"
                    aria-roledescription="slide"
                    aria-label="3 of 8"
                    style={{ width: "calc(100%)", height: "401.5px" }}
                    aria-hidden="true"
                  >
                    <a href="#" tabIndex={-1}>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        className="owl-lazy"
                        data-src="/upload_editor/posts/images/Artboard%201%402x-8.png"
                        alt=""
                        src="/upload_editor/posts/images/Artboard%201%402x-8.png"
                      />
                    </a>
                  </li>
                  <li
                    className="splide__slide"
                    id="splide01-slide04"
                    role="tabpanel"
                    aria-roledescription="slide"
                    aria-label="4 of 8"
                    style={{ width: "calc(100%)", height: "401.5px" }}
                    aria-hidden="true"
                  >
                    <a
                      href="https://tapmed.vn/trang-san-pham.html?producer_id=1705"
                      tabIndex={-1}
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        className="owl-lazy"
                        data-src="/upload_editor/posts/images/z5684638969760_f99dd5bc5361df1570bf4bb016160442.jpg"
                        alt=""
                        src="/upload_editor/posts/images/z5684638969760_f99dd5bc5361df1570bf4bb016160442.jpg"
                      />
                    </a>
                  </li>
                  <li
                    className="splide__slide is-prev"
                    id="splide01-slide05"
                    role="tabpanel"
                    aria-roledescription="slide"
                    aria-label="5 of 8"
                    style={{ width: "calc(100%)", height: "401.5px" }}
                    aria-hidden="true"
                  >
                    <a
                      href="https://tapmed.vn/tin-tuc/bung-no-uu-dai-chao-don-hang-moi-xit-hong-keo-ong-progreen-95.html"
                      tabIndex={-1}
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        className="owl-lazy"
                        data-src="/upload_editor/posts/images/Artboard%204%403x-8.png"
                        alt=""
                        src="/upload_editor/posts/images/Artboard%204%403x-8.png"
                      />
                    </a>
                  </li>
                  <li
                    className="splide__slide is-active is-visible"
                    id="splide01-slide06"
                    role="tabpanel"
                    aria-roledescription="slide"
                    aria-label="6 of 8"
                    style={{ width: "calc(100%)", height: "401.5px" }}
                  >
                    <a href="https://tapmed.vn/tin-tuc/quay-moi-tinh-tuong-nhan-qua-tung-bung-90.html">
                      <img
                        style={{ width: "100%", height: "100%" }}
                        className="owl-lazy"
                        data-src="/upload_editor/posts/images/z5656506777743_4ae5e7479b3c112072fee737530a3167.jpg"
                        alt=""
                        src="/upload_editor/posts/images/z5656506777743_4ae5e7479b3c112072fee737530a3167.jpg"
                      />
                    </a>
                  </li>
                  <li
                    className="splide__slide is-next"
                    id="splide01-slide07"
                    role="tabpanel"
                    aria-roledescription="slide"
                    aria-label="7 of 8"
                    style={{ width: "calc(100%)", height: "401.5px" }}
                    aria-hidden="true"
                  >
                    <a href="#" tabIndex={-1}>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        className="owl-lazy"
                        data-src="/upload_editor/posts/images/Artboard%202%402x-8.png"
                        alt=""
                        src="/upload_editor/posts/images/Artboard%202%402x-8.png"
                      />
                    </a>
                  </li>
                  <li
                    className="splide__slide"
                    id="splide01-slide08"
                    role="tabpanel"
                    aria-roledescription="slide"
                    aria-label="8 of 8"
                    style={{ width: "calc(100%)", height: "401.5px" }}
                    aria-hidden="true"
                  >
                    <a
                      href="https://tapmed.vn/trang-san-pham.html?policy_id=1"
                      tabIndex={-1}
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        className="owl-lazy"
                        data-src="/upload_editor/posts/images/z5660296545770_29416ba6fd447ee30c73d372526caf2b.jpg"
                        alt=""
                        src="/upload_editor/posts/images/z5660296545770_29416ba6fd447ee30c73d372526caf2b.jpg"
                      />
                    </a>
                  </li>
                  <li
                    className="splide__slide splide__slide--clone"
                    id="splide01-clone03"
                    role="tabpanel"
                    aria-roledescription="slide"
                    aria-label="1 of 8"
                    style={{ width: "calc(100%)", height: "401.5px" }}
                    aria-hidden="true"
                  >
                    <a
                      href="https://tapmed.vn/tin-tuc/tb-ct-tang-chuyen-du-lich-du-thuyen-ha-long-5-sao-nhan-83-139.html"
                      tabIndex={-1}
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        className="owl-lazy"
                        data-src="/upload_editor/posts/files/tapmed.jpg"
                        alt=""
                        src="/upload_editor/posts/files/tapmed.jpg"
                      />
                    </a>
                  </li>
                  <li
                    className="splide__slide splide__slide--clone"
                    id="splide01-clone04"
                    role="tabpanel"
                    aria-roledescription="slide"
                    aria-label="2 of 8"
                    style={{ width: "calc(100%)", height: "401.5px" }}
                    aria-hidden="true"
                  >
                    <a
                      href="https://tapmed.vn/tin-tuc/chuong-trinh-khuyen-mai-voucher-cuoc-135.html"
                      tabIndex={-1}
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        className="owl-lazy"
                        data-src="/upload_editor/posts/files/2024-10-15-03%20-%20BANNER%20WEB.png"
                        alt=""
                        src="/upload_editor/posts/files/2024-10-15-03%20-%20BANNER%20WEB.png"
                      />
                    </a>
                  </li>
                </ul>
              </div>
              <ul
                className="splide__pagination splide__pagination--ltr"
                role="tablist"
                aria-label="Select a slide to show"
              >
                <li role="presentation">
                  <button
                    className="splide__pagination__page"
                    type="button"
                    role="tab"
                    aria-controls="splide01-slide01"
                    aria-label="Go to slide 1"
                    tabIndex={-1}
                  ></button>
                </li>
                <li role="presentation">
                  <button
                    className="splide__pagination__page"
                    type="button"
                    role="tab"
                    aria-controls="splide01-slide02"
                    aria-label="Go to slide 2"
                    tabIndex={-1}
                  ></button>
                </li>
                <li role="presentation">
                  <button
                    className="splide__pagination__page"
                    type="button"
                    role="tab"
                    aria-controls="splide01-slide03"
                    aria-label="Go to slide 3"
                    tabIndex={-1}
                  ></button>
                </li>
                <li role="presentation">
                  <button
                    className="splide__pagination__page"
                    type="button"
                    role="tab"
                    aria-controls="splide01-slide04"
                    aria-label="Go to slide 4"
                    tabIndex={-1}
                  ></button>
                </li>
                <li role="presentation">
                  <button
                    className="splide__pagination__page"
                    type="button"
                    role="tab"
                    aria-controls="splide01-slide05"
                    aria-label="Go to slide 5"
                    tabIndex={-1}
                  ></button>
                </li>
                <li role="presentation">
                  <button
                    className="splide__pagination__page"
                    type="button"
                    role="tab"
                    aria-controls="splide01-slide06"
                    aria-label="Go to slide 6"
                    tabIndex={-1}
                  ></button>
                </li>
                <li role="presentation">
                  <button
                    className="splide__pagination__page is-active"
                    type="button"
                    role="tab"
                    aria-controls="splide01-slide07"
                    aria-label="Go to slide 7"
                    aria-selected="true"
                  ></button>
                </li>
                <li role="presentation">
                  <button
                    className="splide__pagination__page"
                    type="button"
                    role="tab"
                    aria-controls="splide01-slide08"
                    aria-label="Go to slide 8"
                    tabIndex={-1}
                  ></button>
                </li>
              </ul>
            </section>
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
