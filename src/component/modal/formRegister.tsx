import React, { useState } from "react";

type FormRegisterType = {
  name: string;
  drugStoreName: string;
  phone: string;
  province: string;
  district: string;
  commune: string;
  address: string;
  password: string;
};

const initFormRegister: FormRegisterType = {
  name: "",
  drugStoreName: "",
  phone: "",
  province: "",
  district: "",
  commune: "",
  address: "",
  password: "",
};

const FormRegister: React.FC = () => {
  const [formRegister, setFormRegister] =
    useState<FormRegisterType>(initFormRegister);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormRegister({ ...formRegister, [name]: value });
  };

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formRegister);
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="form-group">
        <label htmlFor="name">Họ và tên</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formRegister.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="drugStoreName">Tên cửa hàng</label>
        <input
          type="text"
          id="drugStoreName"
          name="drugStoreName"
          value={formRegister.drugStoreName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Số điện thoại</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formRegister.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="province">Tỉnh/Thành phố</label>
        <input
          type="text"
          id="province"
          name="province"
          value={formRegister.province}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="district">Quận/Huyện</label>
        <input
          type="text"
          id="district"
          name="district"
          value={formRegister.district}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="commune">Phường/Xã</label>
        <input
          type="text"
          id="commune"
          name="commune"
          value={formRegister.commune}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Địa chỉ</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formRegister.address}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Mật khẩu</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formRegister.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Đăng ký</button>
    </form>
  );
};

export default FormRegister;
