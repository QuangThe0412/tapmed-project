import { BACKEND_ENDPOINT } from "@src/utils/contanst";
import axiosInstance from "@src/utils/http";

export const getBlogs = () => {
  return axiosInstance
    .get(`${BACKEND_ENDPOINT}/blogs`)
    .then((res) => (res && res?.data ? res.data : null))
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
      throw error; // Ném lỗi để nơi gọi hàm xử lý
    });
};

export const getBlogByCategory = (
  category: string,
  page: number,
  size: number
) => {
  return axiosInstance
    .get(
      `${BACKEND_ENDPOINT}/blogs/category/${category}` +
        `?page=${page}&size=${size}`
    )
    .then((res) => (res && res?.data ? res.data : null))
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
      throw error; // Ném lỗi để nơi gọi hàm xử lý
    });
};
