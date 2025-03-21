//get all product

import { ProductItemType } from "@src/types/typeProduct";
import { BACKEND_ENDPOINT } from "@src/utils/contanst";
import axiosInstance from "@src/utils/http";

export const getProducts = (data: Partial<ProductItemType>) => {
  return axiosInstance
    .post(`${BACKEND_ENDPOINT}/auth/login`, data)
    .then((res) => (res && res?.data ? res.data : null))
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
      throw error; // Ném lỗi để nơi gọi hàm xử lý
    });
};
