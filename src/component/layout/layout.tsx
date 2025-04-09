import { ReactNode, useEffect } from "react";
import TopBar from "../topBar/topBar";
import Header from "../header/header";
import HeaderMenu from "../header/headerMenu";
import HeaderMenuMobile from "../header/headerMenuMobile";
import Footer from "../footer/footer";
import BottomNavMenu from "../bottomNavMenu/bottomNavMenu";
import Contact from "../contact/contact";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";
import { useProvinceStore } from "@src/stores/useProvinceStore";
import useAuthModalStore from "@src/component/authentication/authModalStore";
import CustomModal from "../modal/customModal";
import FormRegister from "../authentication/formRegister";
import FormLogin from "../authentication/formLogin";
import useBlogStore from "@src/stores/useBlogStore";
import { Toaster } from "react-hot-toast";
import { getBlogs } from "@src/page/news/blogEndpoint";
import useOrderStore, { initOrderType } from "@src/stores/useOrderStore";
import useAuthStore from "../authentication/useAuthStore";
import { authEvent, removeLogoutEvent } from "../authentication/authEvent";
import { clearStorage } from "../authentication/authUntils";
import { logoutEndpoint } from "../authentication/authEndpoint";
import { pingEvent, removePingEvent } from "../websocket/pingEvent";
import { link } from "fs";
import { BlogType } from "@src/types/typeBlog";
import { generateSlug } from "@src/utils/common";

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const { setBlogPosts } = useBlogStore();
  const fetchProvinces = useProvinceStore((state) => state.fetchProvinces);
  const { setOrders } = useOrderStore();
  const { setUser } = useAuthStore();

  useEffect(() => {
    fetchProvinces();
    const fetchData = async () => {
      try {
        //blog data
        const resBlogs = await getBlogs();
        if (!resBlogs) {
          throw new Error("Không thể tải dữ liệu. Vui lòng thử lại sau.");
        }

        const _data = resBlogs.map((item: BlogType) => {
          const { id, title } = item;
          const slug = generateSlug(title);
          const url = `/news/${slug}-${id}.html`;

          return {
            ...item,
            link: url,
          };
        });

        setBlogPosts(_data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        // toast.error("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      }
    };

    fetchData();
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

  useEffect(() => {
    authEvent.on("LOGOUT", () => {
      logoutEndpoint();
      clearStorage();
      setOrders(initOrderType);
      setUser(null);
    });

    return () => {
      removeLogoutEvent();
    };
  }, []);

  useEffect(() => {
    pingEvent.on("PING", () => {
      console.log("PING event received");
      // Handle the PING event here, e.g., by sending a ping response or updating the UI
    });

    return () => {
      removePingEvent();
    };
  }, []);

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
