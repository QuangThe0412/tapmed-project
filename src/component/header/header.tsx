import "./header.css";
import SearchInput from "../input/search";
import ButtonCustom from "../button/buttonCustom";
import HeaderCart from "../cart/headerCart";
import useDrawerStore from "../../stores/useMenuMobileStore";
import { Menu } from "lucide-react";
import useAuthStore from "@src/component/authentication/useAuthStore";
import useAuthModalStore from "@src/component/authentication/authModalStore";
import UserMenu from "../user/userMenu";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const { openDrawer } = useDrawerStore();
  const { openLoginModal, openRegisterModal } = useAuthModalStore();
  const { user } = useAuthStore();

  return (
    <div className="header bg-white">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="lg:hidden block my-3 ml-2">
          <button
            className="hamburger-menu !bg-white"
            type="button"
            onClick={() => openDrawer()}
          >
            <Menu size={32} color="black" />
          </button>
        </div>

        <div className="lg:w-3/12 md:w-4/12 w-11/12 flex justify-between lg:justify-start px-4 header-wrap-logo">
          <div className="logo">
            <Link to="/" title="Logo">
              <img
                src="https://tapmed.vn/upload_editor/posts/images/Artboard%201%404x-8.png"
                alt="Tapmed Chuyên Phân Phối Thuốc Sỉ, Dược Sỉ"
                className="h-full flex justify-center items-center object-contain"
              />
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-center lg:w-4/12 w-full hidden lg:block px-4">
          <SearchInput placeholder="Tìm kiếm sản phẩm..." />
        </div>

        <div className="lg:w-5/12 md:w-7/12 w-full md:block px-4">
          <div className="flex justify-center items-center space-x-4">
            <div className="items-center hidden lg:flex space-x-2">
              {user ? (
                <div className="border-r-1 border-color-gray-200">
                  <UserMenu />
                </div>
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
            <HeaderCart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
