import React from "react";
import "./bottomNavMenu.css";
import { paths } from "@src/utils/contanst";
import { Link, useLocation } from "react-router-dom";
import { CircleUser, User } from "lucide-react";
import useAuthStore from "@src/component/authentication/useAuthStore";
import useAuthModalStore from "@src/component/authentication/authModalStore";
import { checkActivePath } from "@src/utils/common";

const BottomNavMenu: React.FC = () => {
  const { openLoginModal } = useAuthModalStore();
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  const LoginElement = () => {
    if (!isAuthenticated) {
      return (
        <li className="flex-1 text-center" onClick={openLoginModal}>
          <div className="text-style">
            <CircleUser size={24} />
            <span className="line-clamp-1">Đăng nhập</span>
          </div>
        </li>
      );
    }
  };

  return (
    <div className="header-fixed block lg:hidden">
      <div className="container mx-auto">
        <ul className="fixed-menu flex justify-between gap-2">
          {paths.map((path, index) => {
            const text = path.textMobile || path.breadcrums;

            if (index < 4 && path.icon) {
              const Icon = path.icon;
              return (
                <li key={path.path} className="flex-1 text-center">
                  <Link
                    to={path.path}
                    className={`text-style ${
                      checkActivePath(path.path) ? "active" : ""
                    }`}
                  >
                    <Icon size={24} />
                    <span className="line-clamp-1">{text}</span>
                  </Link>
                </li>
              );
            }
            return null;
          })}
          <LoginElement />
        </ul>
      </div>
    </div>
  );
};

export default BottomNavMenu;
