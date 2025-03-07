import React from "react";

const TopBar: React.FC = () => {
  return (
    <div
      className="container"
      style={{
        paddingRight: "0px",
        paddingLeft: "0px",
        maxWidth: "100% !important",
      }}
    >
      <div
        className="styles_countdownBarFullWrapper"
        style={{ backgroundColor: "rgb(255, 255, 255)" }}
      >
        <a href="https://tapmed.vn/tin-tuc/quay-la-trung-100-khach-hang-tham-gia-deu-se-rinh-duoc-giai-thuong-80.html">
          <img
            alt="July - Best price"
            src="https://tapmed.vn//upload_editor/posts/images/hihiihih%20(1).png"
            decoding="async"
            className="top-banner"
            style={{
              boxSizing: "border-box",
              padding: "0px",
              border: "none",
              margin: "auto",
              display: "block",
              width: "100%",
              height: "0px",
            }}
          />
        </a>
      </div>
    </div>
  );
};

export default TopBar;
