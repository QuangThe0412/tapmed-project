import React from "react";
import "./header.css";

const HeaderMenu: React.FC = () => {
  return (
    <nav className="flex justify-center header-menu shadow-md hidden lg:flex">
      <div className="container ">
        <ul className="flex justify-evenly">
          <li className="flex-grow text-center">
            <a href="/">Trang chủ</a>
          </li>
          <li className="flex-grow text-center">
            <a href="/san-pham">Sản phẩm</a>
          </li>
          <li className="flex-grow text-center">
            <a href="/dat-hang-nhanh">Đặt hàng nhanh</a>
          </li>
          <li className="flex-grow text-center">
            <a href="/khuyen-mai">Khuyến mãi</a>
          </li>
          <li className="flex-grow text-center">
            <a href="/tin-tuc">Tin tức</a>
          </li>
          <li className="flex-grow text-center">
            <a href="/chinh-sach">Chính sách</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HeaderMenu;
