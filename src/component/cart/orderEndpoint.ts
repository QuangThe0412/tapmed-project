import { OrderType } from "@src/types/typeOrder";
import { BACKEND_ENDPOINT } from "@src/utils/contanst";
import axiosInstance from "@src/utils/http";

export const getOrdersEndPoint = () => {
  return axiosInstance
    .get(`${BACKEND_ENDPOINT}/orders`)
    .then((res) => (res && res?.data ? res.data : null))
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
      throw error; // Ném lỗi để nơi gọi hàm xử lý
    });
};

//createOrUpdate
export const createOrUpdateOrderEndPoint = (order: OrderType) => {
  return axiosInstance
    .post(`${BACKEND_ENDPOINT}/orders/createOrUpdate`, { ...order })
    .then((res) => (res && res?.data ? res.data : null))
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
      throw error; // Ném lỗi để nơi gọi hàm xử lý
    });
};
