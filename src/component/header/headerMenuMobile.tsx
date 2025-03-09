import React from "react";
import useDrawerStore from "../../store/menuMobileStore";
import "./header.css";
import SearchInput from "../input/search";
import ButtonCustom from "../button/buttonCustom";

const HeaderMenuMobile: React.FC = () => {
  const { isOpen, closeDrawer } = useDrawerStore();

  const handleSearch = (value: string) => {
    console.log(value);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={closeDrawer}
        ></div>
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="header-menu-mobile">
          <ul className="flex flex-col space-y-4 p-4">
            <li className="w-full">
              <SearchInput
                placeholder="Tìm kiếm sản phẩm"
                handleSearch={handleSearch}
              />
            </li>
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
              <a
                href="/khuyen-mai"
                className="text-gray-700 hover:text-blue-500"
              >
                Khuyến mãi
              </a>
            </li>
            <li>
              <a href="/tin-tuc" className="text-gray-700 hover:text-blue-500">
                Tin tức
              </a>
            </li>
            <li>
              <a
                href="/chinh-sach"
                className="text-gray-700 hover:text-blue-500"
              >
                Chính sách
              </a>
            </li>
            <li>
              <ButtonCustom
                label="Đăng nhập"
                className="active"
                onClick={() => {}}
              />
            </li>
            <li>
              <ButtonCustom label="Đăng ký" className="" onClick={() => {}} />
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default HeaderMenuMobile;
