import { BACKEND_ENDPOINT } from "@src/utils/contanst";
import axiosInstance from "@src/utils/http";

export const getProducts = () => {
  return axiosInstance
    .get(`${BACKEND_ENDPOINT}/products`)
    .then((res) => (res && res?.data ? res.data : null))
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
      throw error; // Ném lỗi để nơi gọi hàm xử lý
    });
};

//findTop15ByIsDeletedFalseOrderByIdDesc
export const getNewestProducts = () => {
  return axiosInstance
    .get(`${BACKEND_ENDPOINT}/products/latest`)
    .then((res) => (res && res?.data ? res.data : null))
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
      throw error; // Ném lỗi để nơi gọi hàm xử lý
    });
};
