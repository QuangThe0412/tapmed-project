import React, { useEffect, useState } from "react";
import useAuthModalStore from "@src/component/authentication/authModalStore";
import { LoginType, loginUser } from "./authEndpoint";
import toast from "react-hot-toast";
import useAuthStore, { User } from "./useAuthStore";

const initFormLogin: LoginType = {
  username: "",
  password: "",
};

const FormLogin: React.FC = () => {
  const [formLogin, setFormLogin] = useState<LoginType>(initFormLogin);
  const { closeLoginModal } = useAuthModalStore();
  const { setAuthenticated } = useAuthStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormLogin({ ...formLogin, [name]: value });
  };

  //test
  useEffect(() => {
    setFormLogin({
      username: "09014658499", // Giá trị mặc định cho username
      password: "string", // Giá trị mặc định cho password
    });
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await loginUser({
        ...formLogin,
      });

      if (res) {
        const { user: data } = res;
        const user: User = {
          id: data.id,
          username: data.name,
          fullName: data.fullName,
          phone: data.phone,
          address: data.address,
          avatar: data.avatar,
          email: data.email,
          roles: data.roles,
        };

        localStorage.setItem("accessToken", res.token);
        localStorage.setItem("refreshToken", res.refreshToken);
        setAuthenticated(user);

        toast.success("Đăng nhập thành công");
        closeLoginModal();
      }
    } catch (error: any) {
      console.error("Lỗi đăng nhập:", error.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="form-group">
        <label htmlFor="username">Số điện thoại</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formLogin.username}
          onChange={handleChange}
          tabIndex={1}
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
          tabIndex={2}
          required
        />
      </div>
      <button type="submit">Đăng nhập</button>
    </form>
  );
};

export default FormLogin;
