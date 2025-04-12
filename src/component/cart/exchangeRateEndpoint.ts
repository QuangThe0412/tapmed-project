import { BACKEND_ENDPOINT } from "@src/utils/contanst";
import axiosInstance from "@src/utils/http";

export const getExChangeRateEndPoint = () => {
  return axiosInstance
    .get(`${BACKEND_ENDPOINT}/currency-exchange?targetCurrency=VND`)
    .then((res) => (res && res?.data ? res.data : null))
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
      throw error; // Ném lỗi để nơi gọi hàm xử lý
    });
};
