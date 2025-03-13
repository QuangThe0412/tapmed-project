import React, { useState } from "react";
import useDrawerStore from "../../stores/menuMobileStore";
import "./header.css";
import SearchInput from "../input/search";
import ButtonCustom from "../button/buttonCustom";
import { paths } from "../../../src/utils/contanst";
import FormRegister from "../modal/formRegister";
import CustomModal from "../modal/customModal";
import FormLogin from "../modal/formLogin";

const HeaderMenuMobile: React.FC = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

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
                placeholder="Tìm kiếm sản phẩm..."
                handleSearch={handleSearch}
              />
            </li>
            {paths &&
              paths.map((path, index) => (
                <li key={index}>
                  <a
                    href={path.path}
                    className="text-gray-700 hover:text-blue-500"
                  >
                    {path.breadcrums}
                  </a>
                </li>
              ))}
            <li>
              <ButtonCustom
                label="Đăng nhập"
                className="active"
                onClick={() => openLoginModal()}
              />
            </li>
            <li>
              <ButtonCustom
                label="Đăng ký"
                className=""
                onClick={() => {
                  closeDrawer();
                  openRegisterModal();
                }}
              />
            </li>
          </ul>
        </nav>
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
    </>
  );
};

export default HeaderMenuMobile;
