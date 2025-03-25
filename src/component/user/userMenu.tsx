import React, { useState, useRef, useEffect } from "react";
import { User, LogOut, ShoppingBag } from "lucide-react";
import useAuthStore from "@src/component/authentication/useAuthStore";
import { Link } from "react-router-dom";
import "./userMenu.css";
import { emitLogoutEvent } from "../authentication/authEvent";

type UserMenuProps = {
  isMobile?: boolean;
};

const UserMenu: React.FC<UserMenuProps> = ({ isMobile }) => {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    emitLogoutEvent();
    setIsOpen(false);
  };

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <div
        onClick={toggleMenu}
        className="flex items-center space-x-2 text-gray-700 focus:outline-none !bg-transparent  px-2 py-1 rounded-md cursor-pointer"
      >
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <User size={20} className="text-blue-500" />
        </div>
      </div>
      {/* bottom: 130%;
      left: 20%; */}
      {isOpen && (
        <div
          className={`${
            isMobile && "modal-mobile-user-menu"
          } absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50`}
        >
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              Xin chào, {user.fullName}!!!
            </p>
            <p className="text-xs text-gray-500">{user.phone}</p>
          </div>

          <Link
            to="/"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <User size={16} className="mr-2" /> Tài khoản
          </Link>
          {/* 
          <Link
            to="/orders"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <ShoppingBag size={16} className="mr-2" /> Đơn hàng
          </Link> */}

          <div
            onClick={handleLogout}
            className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-red-600 flex items-center bg-white"
          >
            <LogOut size={16} className="mr-2" /> Đăng xuất
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
