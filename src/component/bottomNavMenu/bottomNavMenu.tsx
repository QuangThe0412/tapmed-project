import React from "react";
import "./bottomNavMenu.css";

const BottomNavMenu: React.FC = () => {
  return (
    <div className="header-fixed block lg:hidden">
      <div className="container mx-auto">
        <ul className="fixed-menu flex justify-evenly">
          <li>
            <a
              href="https://tapmed.vn"
              aria-label="Trang chủ"
              title="Trang chủ"
            >
              <img
                src="https://tapmed.vn/TapMedVn/images/ic-home.svg"
                alt="Trang chủ"
                className="w-full h-auto"
              />
              <span>Trang chủ</span>
            </a>
          </li>
          <li>
            <a
              href="https://tapmed.vn/dat-hang.html"
              aria-label="Sản phẩm"
              title="Sản phẩm"
            >
              <img
                src="https://tapmed.vn/TapMedVn/images/ic-search.svg"
                alt="Sản phẩm"
                className="w-full h-auto"
              />
              <span>Sản phẩm</span>
            </a>
          </li>
          <li>
            <a
              href="https://tapmed.vn/chinh-sach.html"
              aria-label="Chính sách"
              title="Chính sách"
            >
              <img
                src="https://tapmed.vn/TapMedVn/images/ic-policy.svg"
                alt="Chính sách"
                className="w-full h-auto"
              />
              <span>Chính sách</span>
            </a>
          </li>
          <li>
            <a
              href="https://tapmed.vn/chuong-trinh-khuyen-mai.html"
              aria-label="Khuyến mãi"
              title="Khuyến mãi"
            >
              <img
                src="https://tapmed.vn/TapMedVn/images/ic-km.svg"
                alt="Khuyến mãi"
                className="w-full h-auto"
              />
              <span>Khuyến mãi</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-label="Đăng nhập"
              title="Đăng nhập"
              data-toggle="modal"
              data-target="#modalLogin"
            >
              <img
                src="https://tapmed.vn/TapMedVn/images/ic-account.svg"
                alt="Đăng nhập"
                className="w-full h-auto"
              />
              <span>Đăng nhập</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-label="Đăng ký"
              title="Đăng ký"
              data-toggle="modal"
              data-target="#modalRegister"
            >
              <img
                src="https://tapmed.vn/TapMedVn/images/ic-account.svg"
                alt="Đăng ký"
                className="w-full h-auto"
              />
              <span>Đăng ký</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BottomNavMenu;
