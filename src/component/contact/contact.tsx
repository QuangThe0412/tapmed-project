import "./contact.css";
import { Link } from "react-router-dom";

const Contact: React.FC = () => {
  return (
    <div className="w3-fixed-contact">
      <div className="w3-row block fadeInRight animated">
        <div className="w3-contact w3-deep-orange w3-trans">
          <Link to="tel:0984233773" title="Gọi điện" className="wrapper-icon">
            <img
              src="https://tapmed.vn/lib/image/phone.png"
              className="w3-center-top"
              alt="Gọi điện"
            />
          </Link>
        </div>
        <div className="w3-contact w3-blue w3-trans">
          <Link
            className="wrapper-icon"
            to="https://zalo.me/2026867773930567367"
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
          </Link>
        </div>
        <div className="w3-contact w3-green w3-trans">
          <Link
            className="wrapper-icon"
            to="https://www.messenger.com/t/2047877302189560"
            title="Nhắn tin facebook"
          >
            <img
              src="https://tapmed.vn/lib/image/messenger.png"
              className="w3-center-top"
              alt="Nhắn tin facebook"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
