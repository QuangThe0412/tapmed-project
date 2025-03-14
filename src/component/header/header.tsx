import React from "react";
import "./header.css";
import SearchInput from "../input/search";
import ButtonCustom from "../button/buttonCustom";
import HeaderCart from "../cart/headerCart";
import useDrawerStore from "../../stores/menuMobileStore";
import { List } from "lucide-react";
import useAuthStore from "@src/stores/authStore";
import useAuthModalStore from "@src/stores/authModalStore";
import UserMenu from "../user/userMenu";

const Header: React.FC = () => {
  const { openDrawer } = useDrawerStore();
  const { openLoginModal, openRegisterModal } = useAuthModalStore();
  const { isAuthenticated } = useAuthStore();

  const handleSearch = (value: string) => {
    console.log(value);
  };

  return (
    <div className="header bg-white">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
        <div className="lg:hidden block my-3 ml-2">
          <button
            className="hamburger-menu"
            type="button"
            onClick={() => openDrawer()}
          >
            <List size={32} />
          </button>
        </div>

        <div className="lg:w-3/12 md:w-4/12 w-11/12 flex justify-between lg:justify-start px-4 header-wrap-logo">
          <div className="logo-mobile block lg:hidden">
            <img
              src="https://tapmed.vn/TapMedVn/images/logo-mobile.svg"
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
            placeholder="Tìm kiếm sản phẩm..."
            handleSearch={handleSearch}
          />
        </div>

        <div className="lg:w-4/12 md:w-6/12 w-full hidden md:block px-4">
          <div className="flex justify-center items-center space-x-4">
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <>
                <ButtonCustom
                  label="Đăng nhập"
                  className="active"
                  onClick={() => {
                    openLoginModal();
                  }}
                />
                <ButtonCustom
                  label="Đăng ký"
                  className=""
                  onClick={() => {
                    openRegisterModal();
                  }}
                />
              </>
            )}
          </div>
        </div>

        <div className="flex justify-end lg:w-1/12 md:w-2/12 w-4/12 px-4">
          <HeaderCart />
        </div>
      </div>
    </div>
  );
};

export default Header;
