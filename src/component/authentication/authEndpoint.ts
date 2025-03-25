import { BACKEND_ENDPOINT } from "@src/utils/contanst";
import axiosInstance from "@src/utils/http";

export type LoginType = {
  username: string;
  password: string;
};

export type RegisterType = {
  fullname: string;
  password: string;
  phone: string;
  address: string;
  email: string;
};

export const loginUser = (data: Partial<LoginType>) => {
  return axiosInstance
    .post(`${BACKEND_ENDPOINT}/auth/login`, data)
    .then((res) => (res && res?.data ? res.data : null))
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
      throw error; // Ném lỗi để nơi gọi hàm xử lý
    });
};

export const registerUser = (data: Partial<RegisterType>) => {
  return axiosInstance
    .post(`${BACKEND_ENDPOINT}/auth/registerAndLogin`, data)
    .then((res) => (res && res?.data ? res.data : null))
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
      throw error; // Ném lỗi để nơi gọi hàm xử lý
    });
};

export const refreshTokenEndpoint = (refreshToken: String) => {
  if (!refreshToken) {
    return null;
  }

  return axiosInstance
    .post(`${BACKEND_ENDPOINT}/auth/refresh-token`)
    .then((res) => (res && res?.data ? res.data : null))
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
      throw error; // Ném lỗi để nơi gọi hàm xử lý
    });
};
