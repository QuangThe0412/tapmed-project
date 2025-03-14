import useDrawerStore from "../../stores/menuMobileStore";
import "./header.css";
import SearchInput from "../input/search";
import ButtonCustom from "../button/buttonCustom";
import { paths } from "../../../src/utils/contanst";
import { Link } from "react-router-dom";
import useAuthModalStore from "@src/stores/useAuthModal";

const HeaderMenuMobile: React.FC = () => {
  const { openRegisterModal, openLoginModal } = useAuthModalStore();

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
          </ul>
        </nav>
      </div>
    </>
  );
};

export default HeaderMenuMobile;
