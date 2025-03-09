import React from "react";
import "./contact.css";

const Contact: React.FC = () => {
  return (
    <div className="w3-fixed-contact">
      <div className="w3-row block fadeInRight animated">
        <div className="w3-contact w3-deep-orange w3-trans">
          <a href="tel:0984233773" title="Gọi điện">
            <img
              src="https://tapmed.vn/lib/image/phone.png"
              className="w3-center-top"
              alt="Gọi điện"
            />
          </a>
        </div>
        <div className="w3-contact w3-blue w3-trans">
          <a
            href="https://zalo.me/2026867773930567367"
            id="folowZalo"
            target="_b"
            title="Liên hệ Zalo"
            rel="noreferrer"
          >
            <img
              src="https://tapmed.vn/lib/image/zalo.png"
              className="w3-center-top"
              alt="Liên hệ Zalo"
            />
            <span
              className="badge"
              style={{
                position: "absolute",
                top: "1px",
                right: "45px",
                padding: "6px 5px",
                borderRadius: "11%",
                background: "red",
                color: "white",
                width: "90px",
                height: "25px",
              }}
            >
              Theo dõi zalo
            </span>
          </a>
        </div>
        <div className="w3-contact w3-green w3-trans">
          <a
            href="https://www.messenger.com/t/2047877302189560"
            title="Nhắn tin facebook"
          >
            <img
              src="https://tapmed.vn/lib/image/messenger.png"
              className="w3-center-top"
              alt="Nhắn tin facebook"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
