import React from "react";
import "./topBar.css";
import { Link } from "react-router-dom";

const TopBar: React.FC = () => {
  return (
    <div className="flew w-full h-auto">
      <Link to="https://tapmed.vn/tin-tuc/quay-la-trung-100-khach-hang-tham-gia-deu-se-rinh-duoc-giai-thuong-80.html">
        <img
          className="h-auto object-cover block"
          alt="July - Best price"
          src="https://tapmed.vn//upload_editor/posts/images/hihiihih%20(1).png"
          decoding="async"
        />
      </Link>
    </div>
  );
};

export default TopBar;
