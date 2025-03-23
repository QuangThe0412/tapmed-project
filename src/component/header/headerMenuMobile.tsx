import React from "react";
import useDrawerStore from "../../stores/useMenuMobileStore";
import "./header.css";
import SearchInput from "../input/search";
import ButtonCustom from "../button/buttonCustom";
import { paths } from "../../../src/utils/contanst";
import { Link, useLocation } from "react-router-dom";
import useAuthStore from "@src/component/authentication/useAuthStore";
import useAuthModalStore from "@src/component/authentication/authModalStore";
import { useEffect } from "react";
import UserMenu from "../user/userMenu";
import { checkActivePath } from "@src/utils/common";

const HeaderMenuMobile: React.FC = () => {
  const { openRegisterModal, openLoginModal } = useAuthModalStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();
  const { isOpen, closeDrawer } = useDrawerStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    closeDrawer();
  }, [location.pathname]);

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
        <nav className="header-menu-mobile  h-full">
          <ul className="flex flex-col space-y-4 p-4 h-full">
            <li className="w-full">
              <SearchInput placeholder="Tìm kiếm sản phẩm..." />
            </li>

            {paths &&
              paths.map(
                (path, index) =>
                  path.isShowMenu && (
                    <li key={index}>
                      <Link
                        to={path.path}
                        className={`text-gray-700 hover:text-blue-500 ${
                          checkActivePath(path.path)
                            ? "text-blue-500 font-medium header-menu-mobile-active"
                            : ""
                        }`}
                      >
                        {path.breadcrums}
                      </Link>
                    </li>
                  )
              )}

            {!isAuthenticated && (
              <>
                <li>
                  <ButtonCustom
                    label="Đăng nhập"
                    className="active"
                    onClick={() => {
                      closeDrawer();
                      openLoginModal();
                    }}
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
              </>
            )}

            {isAuthenticated && user && (
              <li className="border-t border-gray-200 pt-3 mt-auto">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <UserMenu isMobile={true} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{user.fullName}</p>
                    <p className="text-sm text-gray-500">{user.phone}</p>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default HeaderMenuMobile;
