import React from "react";
import { Link } from "react-router-dom";
import "./notFound.css";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Không tìm thấy trang</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 !text-white font-medium py-2 px-6 rounded transition duration-300"
      >
        Trở về trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
