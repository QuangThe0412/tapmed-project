import React, { useEffect, useState } from "react";
import useAuthModalStore from "@src/component/authentication/authModalStore";
import { authenticateUser } from "./authEndpoint";
import toast from "react-hot-toast";
import useAuthStore, { User } from "./useAuthStore";

type FormLoginType = {
  username: string;
  password: string;
};

const initFormLogin: FormLoginType = {
  username: "",
  password: "",
};

const FormLogin: React.FC = () => {
  const [formLogin, setFormLogin] = useState<FormLoginType>(initFormLogin);
  const { closeLoginModal } = useAuthModalStore();
  const { setAuthenticated } = useAuthStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormLogin({ ...formLogin, [name]: value });
  };

  //test
  useEffect(() => {
    setFormLogin({
      username: "string", // Giá trị mặc định cho username
      password: "string", // Giá trị mặc định cho password
    });
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await authenticateUser({
        ...formLogin,
      });

      if (res) {
        const user: User = {
          id: res.id,
          username: res.name,
          fullName: res.fullName,
          phone: res.phone,
          drugStoreName: res.drugStoreName,
          address: res.address,
          avatar: res.avatar,
          email: res.email,
          roles: res.roles,
        };

        localStorage.setItem("accessToken", res.token);
        localStorage.setItem("refreshToken", res.refreshToken);
        setAuthenticated(user);

        toast.success("Đăng nhập thành công");
        closeLoginModal();
      }
    } catch (error: any) {
      console.error("Lỗi đăng nhập:", error.message);
      toast.error("Đăng nhập thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="form-group">
        <label htmlFor="username">Tên đăng nhập</label>
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
