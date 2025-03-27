import React, { useState } from "react";
import useAuthModalStore from "@src/component/authentication/authModalStore";
import { LoginType, loginUser } from "./authEndpoint";
import toast from "react-hot-toast";
import useAuthStore, { UserType } from "./useAuthStore";
import { z } from "zod";

const initFormLogin: LoginType = {
  username: "09014658488",
  password: "string",
};

// Schema validation cho form login
const loginSchema = z.object({
  username: z
    .string()
    .nonempty("Số điện thoại không được để trống")
    .regex(/^\d{10,11}$/, "Số điện thoại không hợp lệ"),
  password: z
    .string()
    .nonempty("Mật khẩu không được để trống")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

const FormLogin: React.FC = () => {
  const [formLogin, setFormLogin] = useState<LoginType>(initFormLogin);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { closeLoginModal } = useAuthModalStore();
  const { setUser } = useAuthStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormLogin({ ...formLogin, [name]: value });
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const validatedData = loginSchema.parse(formLogin);
      setErrors({}); // Xóa lỗi cũ nếu dữ liệu hợp lệ

      const res = await loginUser(validatedData);

      if (res && res.user) {
        const { user: data } = res;
        const user: UserType = {
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
        setUser(user);

        toast.success("Đăng nhập thành công");
        closeLoginModal();
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors); // Lưu lỗi vào state
      } else {
        toast.error(error.response?.data?.message || "Đăng nhập thất bại");
      }
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
          // required
        />
        {errors.username && <p className="error-message">{errors.username}</p>}
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
          // required
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>
      <button type="submit">Đăng nhập</button>
    </form>
  );
};

export default FormLogin;
