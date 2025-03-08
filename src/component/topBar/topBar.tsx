import React from "react";
import "./topBar.css";
import { Link } from "react-router-dom";

const TopBar: React.FC = () => {
  return (
    <div className="top-bar">
      <Link to="https://tapmed.vn/tin-tuc/quay-la-trung-100-khach-hang-tham-gia-deu-se-rinh-duoc-giai-thuong-80.html">
        {/* <Image
          height="auto"
          width="100%"
          alt="July - Best price"
          src="https://tapmed.vn//upload_editor/posts/images/hihiihih%20(1).png"
          decoding="async"
          className="top-banner"
          style={{}}
        /> */}
      </Link>
    </div>
  );
};

export default TopBar;
