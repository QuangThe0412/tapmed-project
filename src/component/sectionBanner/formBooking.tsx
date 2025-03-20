import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./formBooking.css";
import { useWebsocket } from "../websocket/WebsocketProvider";

const FormBooking: React.FC = () => {
  const { sendMessage } = useWebsocket();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    business: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Kiểm tra nếu có trường nào không được điền
    if (!formData.name) {
      toast.error("Vui lòng điền họ và tên!");
      return;
    }
    if (!formData.phone) {
      toast.error("Vui lòng điền số điện thoại!");
      return;
    } else {
      if (formData.phone.length < 10) {
        toast.error("Số điện thoại không hợp lệ!");
        return;
      }
    }
    if (!formData.business) {
      toast.error("Vui lòng điền tên cơ sở kinh doanh!");
      return;
    }
    if (!formData.address) {
      toast.error("Vui lòng điền địa chỉ!");
      return;
    }

    // Xử lý logic gửi form ở đây
    // console.log("Form data submitted:", formData);

    sendMessage("/ws/app/test", "test websocket send from booking form");
  };

  return (
    <div id="form-booking">
      <h3>Liên Hệ Đặt Hàng (HOTLINE: 0963.74.4567)</h3>
      <div id="alert-danger-trieu" className="mb-4">
        <div className="alert alert-danger p-2 text-sm text-red-600 bg-red-100 rounded">
          <ul>
            <li>Quý khách đã có tài khoản vui lòng chọn đăng nhập.</li>
          </ul>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="block mb-2">Họ và tên</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control w-full p-2 border border-gray-300 rounded"
            placeholder="Tên đầy đủ của bạn"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="block mb-2">Số điện thoại</label>
          <input
            type="number"
            id="phone"
            name="phone"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            className="form-control w-full p-2 border border-gray-300 rounded"
            placeholder="Số điện thoại"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="block mb-2">Tên cơ sở kinh doanh</label>
          <input
            type="text"
            id="business"
            name="business"
            className="form-control w-full p-2 border border-gray-300 rounded"
            placeholder="Tên cơ sở kinh doanh"
            value={formData.business}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="block mb-2">Địa chỉ</label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-control w-full p-2 border border-gray-300 rounded"
            placeholder="Địa chỉ"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Liên hệ ngay
        </button>
      </form>
    </div>
  );
};

export default FormBooking;
