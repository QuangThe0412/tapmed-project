import React from "react";
import "./header.css";

const HeaderMenu: React.FC = () => {
  return (
    <nav className="header-menu">
      <div className="container">
        <ul className="flex justify-evenly">
          <li>
            <a href="/" className="text-gray-700 hover:text-blue-500">
              Trang chủ
            </a>
          </li>
          <li>
            <a href="/san-pham" className="text-gray-700 hover:text-blue-500">
              Sản phẩm
            </a>
          </li>
          <li>
            <a
              href="/dat-hang-nhanh"
              className="text-gray-700 hover:text-blue-500"
            >
              Đặt hàng nhanh
            </a>
          </li>
          <li>
            <a href="/khuyen-mai" className="text-gray-700 hover:text-blue-500">
              Khuyến mãi
            </a>
          </li>
          <li>
            <a href="/tin-tuc" className="text-gray-700 hover:text-blue-500">
              Tin tức
            </a>
          </li>
          <li>
            <a href="/chinh-sach" className="text-gray-700 hover:text-blue-500">
              Chính sách
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HeaderMenu;
