import React, { useState } from "react";
import ButtonCustom from "../button/buttonCustom";
import SearchInput from "../input/search";
import HeaderCart from "../cart/headerCart";
import useDrawerStore from "../../stores/menuMobileStore";
import FormRegister from "../modal/formRegister";
import CustomModal from "../modal/customModal";
import FormLogin from "../modal/formLogin";

const Header: React.FC = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { openDrawer } = useDrawerStore();
  const handleSearch = (searchTerm: string) => {
    console.log(searchTerm);
  };

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <div className="mx-auto px-4 py-0 lg:py-5 bg-white shadow-md flex justify-center items-center">
      <div className="container flex flex-wrap items-center -mx-4 space-between">
        <div className="flex items-center lg:w-3/12 md:w-4/12 w-8/12 px-4">
          <div className="block lg:hidden">
            <img
              onClick={openDrawer}
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
            placeholder="Tìm kiếm sản phẩm..."
            handleSearch={handleSearch}
          />
        </div>

        <div className="lg:w-4/12 md:w-6/12 w-full hidden md:block px-4">
          <div className="flex justify-center items-center space-x-4">
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
          </div>
        </div>

        <div className="flex justify-end lg:w-1/12 md:w-2/12 w-4/12 px-4">
          <HeaderCart />
        </div>
      </div>
      <CustomModal
        children={<FormRegister />}
        title="Đăng ký"
        isOpen={isRegisterModalOpen}
        onRequestClose={closeRegisterModal}
        footer={
          <p>
            Nếu bạn đã có tài khoản vui lòng,{" "}
            <button
              onClick={() => {
                closeRegisterModal();
                openLoginModal();
              }}
              className="text-blue-500 cursor-pointer"
            >
              Đăng nhập
            </button>
          </p>
        }
      />
      <CustomModal
        children={<FormLogin />}
        title="Đăng nhập"
        isOpen={isLoginModalOpen}
        onRequestClose={closeLoginModal}
        footer={
          <p>
            Nếu bạn chưa có tài khoản vui lòng,{" "}
            <button
              onClick={() => {
                closeLoginModal();
                openRegisterModal();
              }}
              className="text-blue-500 cursor-pointer"
            >
              Đăng ký
            </button>
          </p>
        }
      />
    </div>
  );
};

export default Header;
