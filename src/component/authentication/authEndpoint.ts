import { BACKEND_ENDPOINT } from "@src/utils/contanst";
import axiosInstance from "@src/utils/http";

export type AuthenticationType = {
  username: string;
  password: string;
};

export const authenticateUser = (data: Partial<AuthenticationType>) => {
  return axiosInstance
    .post(`${BACKEND_ENDPOINT}/auth/login`, data)
    .then((res) => (res && res?.data ? res.data : null))
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
      throw error; // Ném lỗi để nơi gọi hàm xử lý
    });
};
