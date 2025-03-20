import React, { ReactNode, useEffect } from "react";
import TopBar from "../topBar/topBar";
import Header from "../header/header";
import HeaderMenu from "../header/headerMenu";
import HeaderMenuMobile from "../header/headerMenuMobile";
import Footer from "../footer/footer";
import BottomNavMenu from "../bottomNavMenu/bottomNavMenu";
import Contact from "../contact/contact";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";
import { useProductStore } from "../../stores/useProductStore";
import { useProvinceStore } from "@src/stores/useProvinceStore";
import useAuthModalStore from "@src/component/authentication/authModalStore";
import CustomModal from "../modal/customModal";
import FormRegister from "../authentication/formRegister";
import FormLogin from "../authentication/formLogin";
import useBlogStore from "@src/stores/useBlogStore";
import { Toaster, toast } from "react-hot-toast";

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const fetchProvinces = useProvinceStore((state) => state.fetchProvinces);
  const fetchBlogs = useBlogStore((state) => state.fetchBlogs);

  useEffect(() => {
    fetchProducts();
    fetchProvinces();
    fetchBlogs();
  }, []);

  const {
    isRegisterModalOpen,
    openRegisterModal,
    closeRegisterModal,
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
  } = useAuthModalStore();

  useEffect(() => {
    if (isRegisterModalOpen || isLoginModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isRegisterModalOpen, isLoginModalOpen]);

  return (
    <>
      <Toaster position="top-right" />
      <div className="app-container">
        <div className="flew flex-col">
          <TopBar />
          <Header />
          <HeaderMenu />
          <HeaderMenuMobile />
          <Breadcrumbs />
          <main>{children}</main>
          <Footer />
          <BottomNavMenu />
          <Contact />
        </div>
        <CustomModal
          children={<FormRegister />}
          title="Đăng ký"
          isOpen={isRegisterModalOpen}
          onRequestClose={closeRegisterModal}
          footer={
            <div className="mt-4 flex flex-wrap justify-between text-center">
              <span className="w-full text-center text-black">
                Nếu bạn đã có tài khoản vui lòng
              </span>
              <button
                onClick={() => {
                  closeRegisterModal();
                  openLoginModal();
                }}
                className="text-blue-500 cursor-pointer float-right !bg-white shadow-md w-full"
              >
                Đăng nhập
              </button>
            </div>
          }
        />
        <CustomModal
          children={<FormLogin />}
          title="Đăng nhập"
          isOpen={isLoginModalOpen}
          onRequestClose={closeLoginModal}
          footer={
            <div className="mt-4 flex flex-wrap justify-between text-center">
              <span className="w-full text-center text-black">
                Nếu bạn chưa có tài khoản vui lòng
              </span>
              <button
                onClick={() => {
                  closeLoginModal();
                  openRegisterModal();
                }}
                className="text-blue-500 cursor-pointer float-right !bg-white shadow-md w-full"
              >
                Đăng ký
              </button>
            </div>
          }
        />
      </div>
    </>
  );
}

export default MainLayout;
