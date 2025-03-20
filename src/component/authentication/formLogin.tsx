import React, { useState } from "react";
import useAuthStore from "@src/component/authentication/useAuthStore";
import useAuthModalStore from "@src/component/authentication/authModalStore";
import toast, { Toaster } from "react-hot-toast";

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
  const { login, isLoading, error } = useAuthStore();
  const { closeLoginModal } = useAuthModalStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormLogin({ ...formLogin, [name]: value });
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formLogin);
    //call API login here
    try {
      login(formLogin.name, formLogin.password).then((user) => {
        console.log(user);
        toast.success("Đăng nhập thành công!");
        closeLoginModal();
      });
    } catch (err) {
      // Error is handled by the store
    }
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
          disabled={isLoading}
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
          disabled={isLoading}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className={isLoading ? "opacity-70 cursor-not-allowed" : ""}
      >
        {isLoading ? "Đang xử lý..." : "Đăng nhập"}
      </button>
    </form>
  );
};

export default FormLogin;
