import React from "react";

const Header: React.FC = () => {
  return (
    <header id="header" style={{ boxShadow: "0px 3px 17px #d3d3d3" }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-3 col-md-4 col-8 ul-control">
            <div className="menu-bar d-block d-lg-none">
              <img
                src="https://tapmed.vn/TapMedVn/images/menu-bar.png"
                alt="Tapmed Chuyên Phân Phối Thuốc Sỉ, Dược Sỉ"
                className="img-fluid"
              />
            </div>
            <div className="logo">
              <a href="/" title="Logo">
                <img
                  src="https://tapmed.vn/upload_editor/posts/images/Artboard%201%404x-8.png"
                  alt="Tapmed Chuyên Phân Phối Thuốc Sỉ, Dược Sỉ"
                  className="img-fluid"
                />
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-12 d-none d-lg-block">
            <div className="search-header">
              <form
                action="/danh-sach-san-pham.html"
                method="get"
                className="search-form"
                role="search"
              >
                <input
                  type="text"
                  name="search"
                  required
                  className="input-group-field form-control"
                  placeholder="Tìm kiếm sản phẩm..."
                  autoComplete="off"
                />
                <input type="hidden" value="product" />
                <button
                  className="btn btn-default"
                  type="submit"
                  aria-label="Tìm kiếm"
                >
                  <img
                    src="https://tapmed.vn/TapMedVn/images/ic-search.png"
                    alt="Tapmed Chuyên Phân Phối Thuốc Sỉ, Dược Sỉ"
                  />
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-12 header-account d-none d-md-block">
            <div className="header-control">
              <a
                href="#"
                data-toggle="modal"
                data-target="#modalLogin"
                className="btn btn-login"
                title="Đăng nhập"
              >
                Đăng nhập
              </a>
              <a
                href="#"
                data-toggle="modal"
                data-target="#modalRegister"
                className="btn btn-register"
                title="Đăng ký"
              >
                Đăng ký
              </a>
            </div>
          </div>
          <div className="col-lg-1 col-md-2 col-4 header-cart"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
