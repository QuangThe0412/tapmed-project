import { BACKEND_ENDPOINT } from "@src/utils/contanst";
import axiosInstance from "@src/utils/http";

export enum PaymentMethod {
  CASH = "CASH",
  PAYPAL = "PAYPAL",
  // CREDIT_CARD = "CREDIT_CARD",
  // MOMO = "MOMO",
  // ZALO_PAY = "ZALO_PAY",
}

export type PaymentRequestType = {
  orderId: number;
  paymentMethod: PaymentMethod;
  address: string;
  description: string;
};

export const paymentEndPoint = (data: PaymentRequestType) => {
  return axiosInstance
    .post(`${BACKEND_ENDPOINT}/payments/create`, { ...data })
    .then((res) => (res && res?.data ? res.data : null))
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
      throw error; // Ném lỗi để nơi gọi hàm xử lý
    });
};
