import React from "react";
import "./bottomNavMenu.css";
import { paths } from "@src/utils/contanst";
import { Link, useLocation } from "react-router-dom";
import { CircleUser } from "lucide-react";
import useAuthModalStore from "@src/stores/authModalStore";

const BottomNavMenu: React.FC = () => {
  const { openLoginModal } = useAuthModalStore();
  const location = useLocation();

  const LoginElement = () => {
    return (
      <li className="flex-1 text-center" onClick={openLoginModal}>
        <div className="text-style">
          <CircleUser size={24} />
          <span className="line-clamp-1">Đăng nhập</span>
        </div>
      </li>
    );
  };

  return (
    <div className="header-fixed block lg:hidden">
      <div className="container mx-auto">
        <ul className="fixed-menu flex justify-between gap-2">
          {paths.map((path, index) => {
            const text = path.textMobile || path.breadcrums;
            const isActive = location.pathname === path.path;
            return path.isShowMenu ? (
              <li
                key={index}
                className={`bottom-nav-item flex-1 text-center ${
                  isActive ? "active" : ""
                }`}
              >
                <Link
                  className="text-style"
                  to={path.path}
                  aria-label={path.breadcrums}
                  title={path.breadcrums}
                >
                  {path.icon && <path.icon />}
                  <span className="line-clamp-1">{text}</span>
                </Link>
              </li>
            ) : null;
          })}
          <LoginElement />
        </ul>
      </div>
    </div>
  );
};

export default BottomNavMenu;
