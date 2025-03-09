import React from "react";
import ButtonCustom from "../button/buttonCustom";
import SearchInput from "../input/search";
import HeaderCart from "../cart/headerCart";

const Header: React.FC = () => {
  const handleSearch = (searchTerm: string) => {
    console.log(searchTerm);
  };

  return (
    <div className="mx-auto px-4 py-5 bg-white shadow-md flex justify-center items-center">
      <div className="container flex flex-wrap items-center -mx-4 space-between">
        <div className="flex lg:w-3/12 md:w-4/12 w-8/12 px-4">
          <div className="block lg:hidden">
            <img
              style={{ minHeight: "75px" }}
              src="https://tapmed.vn/TapMedVn/images/menu-bar.png"
              alt="Tapmed Chuyên Phân Phối Thuốc Sỉ, Dược Sỉ"
              className="flex justify-center items-center object-contain"
            />
          </div>
          <div className="logo">
            <a href="/" title="Logo">
              <img
                src="https://tapmed.vn/upload_editor/posts/images/Artboard%201%404x-8.png"
                alt="Tapmed Chuyên Phân Phối Thuốc Sỉ, Dược Sỉ"
                className="h-full flex justify-center items-center object-contain"
              />
            </a>
          </div>
        </div>

        <div className="flex justify-center items-center lg:w-4/12 w-full hidden lg:block px-4">
          <SearchInput
            placeholder="Tìm kiếm sản phẩm"
            handleSearch={handleSearch}
          />
        </div>

        <div className="lg:w-4/12 md:w-6/12 w-full hidden md:block px-4">
          <div className="flex justify-center items-center space-x-4">
            <ButtonCustom
              label="Đăng nhập"
              className="active"
              onClick={() => {}}
            />
            <ButtonCustom label="Đăng ký" className="" onClick={() => {}} />
          </div>
        </div>

        <div className="flex lg:w-1/12 md:w-2/12 w-4/12 px-4">
          <HeaderCart itemCount={5} />
        </div>
      </div>
    </div>
  );
};

export default Header;
