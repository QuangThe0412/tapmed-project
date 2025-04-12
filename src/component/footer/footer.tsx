import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer id="footer">
      <div className="top-footer">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-full">
              <div className="footer-info">
                <h3>Công ty cổ phần XNK Dược phẩm TAPMED</h3>
                <p>
                  <b>Trụ sở</b>: CT1-CT2, khu nhà ở CBNV viện bỏng Lê Hữu Trác,
                  Tân Triều, Thanh Trì, Hà Nội
                </p>
                <p>
                  <b>Showroom</b>: Quầy 441, Trung tâm phân phối thuốc Hapulico,
                  số 85 Vũ Trọng Phụng, Thanh Xuân, Hà Nội
                </p>
                <p>
                  <b>Hotline</b>:{" "}
                  <Link to="tel:0963.744.567">0963.744.567</Link>
                </p>
                <p>
                  <b>Email</b>:{" "}
                  <Link to="mailto:info@tapmed.vn">info@tapmed.vn</Link>
                </p>
                <p>
                  <b>Tên người đại diện</b>: Bà Nguyễn Thị Hà
                </p>
                <p>
                  <b>Số GCN DKKD</b>: 0106459996 - Ngày Cấp:19/02/2014 - Nơi
                  cấp: Sở kế hoạch đầu tư TP Hà Nội
                </p>
                <p>
                  <b>Số GCN đủ điều kiện kinh doanh thuốc</b>: 01757/HNO-CCHND -
                  Ngày Cấp:19/03/2014 - Nơi cấp: Sở y tế Hà Nội
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="container mx-auto">
          <p className="text-coppy-right">
            Bản quyền thuộc về CÔNG TY CP NXK DƯỢC PHẨM TAPMED - 2024.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
