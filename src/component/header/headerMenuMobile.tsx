import React from "react";
import useDrawerStore from "../../stores/menuMobileStore";
import "./header.css";
import SearchInput from "../input/search";
import ButtonCustom from "../button/buttonCustom";
import { paths } from "../../../src/utils/contanst";
import { Link, useLocation } from "react-router-dom";
import useAuthStore from "@src/stores/authStore";
import useAuthModalStore from "@src/stores/authModalStore";
import { User, ShoppingBag, LogOut } from "lucide-react";
import { useEffect } from "react";

const HeaderMenuMobile: React.FC = () => {
  const { openRegisterModal, openLoginModal } = useAuthModalStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();
  const { isOpen, closeDrawer } = useDrawerStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    closeDrawer();
  }, [location.pathname]);

  const handleSearch = (value: string) => {
    console.log(value);
  };

  const handleLogout = () => {
    logout();
    closeDrawer();
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

            {isAuthenticated && user && (
              <li className="border-b border-gray-200 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User size={20} className="text-blue-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">
                      {user.drugStoreName}
                    </p>
                  </div>
                </div>
              </li>
            )}

            {paths &&
              paths.map(
                (path, index) =>
                  path.isShowMenu && (
                    <li key={index}>
                      <Link
                        to={path.path}
                        className="text-gray-700 hover:text-blue-500"
                      >
                        {path.breadcrums}
                      </Link>
                    </li>
                  )
              )}

            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center text-gray-700 hover:text-blue-500"
                    onClick={closeDrawer}
                  >
                    <User size={16} className="mr-2" /> Tài khoản
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orders"
                    className="flex items-center text-gray-700 hover:text-blue-500"
                    onClick={closeDrawer}
                  >
                    <ShoppingBag size={16} className="mr-2" /> Đơn hàng
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left text-red-600 hover:text-red-700"
                  >
                    <LogOut size={16} className="mr-2" /> Đăng xuất
                  </button>
                </li>
              </>
            ) : (
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
          </ul>
        </nav>
      </div>
    </>
  );
};

export default HeaderMenuMobile;
