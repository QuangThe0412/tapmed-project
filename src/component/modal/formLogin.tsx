import React, { useState } from "react";

type FormLoginType = {
  name: string;
  password: string;
};

const initFormLogin: FormLoginType = {
  name: "",
  password: "",
};

const FormLogin: React.FC = () => {
  const [formLogin, setFormLogin] = useState<FormLoginType>(initFormLogin);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormLogin({ ...formLogin, [name]: value });
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formLogin);
    //call API login here
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="form-group">
        <label htmlFor="name">Tên đăng nhập</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formLogin.name}
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
          value={formLogin.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Đăng nhập</button>
    </form>
  );
};

export default FormLogin;
