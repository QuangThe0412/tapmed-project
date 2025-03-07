import React from "react";

const HeaderMenu: React.FC = () => {
  return (
    <div className="header-menu">
      <div className="container">
        <div className="search-menu d-lg-none">
          <form
            action="/danh-sach-san-pham.html"
            method="get"
            className="search-form"
            role="search"
          >
            <input
              type="text"
              name="query"
              required
              className="input-group-field form-control"
              placeholder="Tìm kiếm sản phẩm..."
              autoComplete="off"
            />
            <input type="hidden" name="type" value="product" />
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
        <nav className="header-nav">
          <ul className="item_big">
            <li className="nav-item">
              <a href="/">Trang chủ</a>
            </li>
            <li className="nav-item">
              <a href="https://tapmed.vn/danh-sach-san-pham.html">Sản phẩm</a>
            </li>
            <li className="nav-item">
              <a href="https://tapmed.vn/dat-hang.html">Đặt hàng nhanh</a>
            </li>
            <li className="nav-item">
              <a href="https://tapmed.vn/chuong-trinh-khuyen-mai.html">
                Khuyến mãi
              </a>
            </li>
            <li className="nav-item">
              <a href="https://tapmed.vn/tin-tuc.html">Tin tức</a>
            </li>
            <li className="nav-item">
              <a href="https://tapmed.vn/chinh-sach.html">Chính sách</a>
            </li>
          </ul>
        </nav>
        <div className="account-menu d-lg-none">
          <div className="header-control">
            <a
              href="#"
              data-toggle="modal"
              data-target="#modalRegister"
              className="btn btn-register"
              title="Đăng ký"
            >
              Đăng ký
            </a>
            <a
              href="#"
              data-toggle="modal"
              data-target="#modalLogin"
              className="btn btn-login"
              title="Đăng nhập"
            >
              Đăng nhập
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
