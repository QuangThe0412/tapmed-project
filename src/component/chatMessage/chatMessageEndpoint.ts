import { BACKEND_ENDPOINT } from "@src/utils/contanst";
import axiosInstance from "@src/utils/http";

export type ChatMessageType = {
  id: number;
  senderId: number; // ID của người gửi
  senderName: string; // Tên của người gửi
  message: string; // Nội dung tin nhắn
  createdAt: string; // Thời gian gửi tin nhắn
};

export const getChatMessageEndPoint = () => {
  return axiosInstance
    .get(`${BACKEND_ENDPOINT}/chat-messages/getAllMessages`)
    .then((res) => (res && res?.data ? res.data : null))
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
      throw error; // Ném lỗi để nơi gọi hàm xử lý
    });
};
