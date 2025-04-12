import { BACKEND_ENDPOINT } from "@src/utils/contanst";
import axiosInstance from "@src/utils/http";

export const getChatMessageEndPoint = (accessToken: string) => {
  return axiosInstance
    .get(
      `${BACKEND_ENDPOINT}/auth/getRolesByAccessToken?accessToken=${accessToken}`
    )
    .then((res) => (res && res?.data ? res.data : null))
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
      throw error; // Ném lỗi để nơi gọi hàm xử lý
    });
};
