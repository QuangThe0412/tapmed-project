import { BACKEND_ENDPOINT } from "@src/utils/contanst";
import axiosInstance from "@src/utils/http";

export const getNewestProducts = () => {
  return axiosInstance
    .get(`${BACKEND_ENDPOINT}/products/latest`)
    .then((res) => (res && res?.data ? res.data : null))
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
      throw error; // Ném lỗi để nơi gọi hàm xử lý
    });
};

//get product by id
export const getProductById = (id: number) => {
  return axiosInstance
    .get(`${BACKEND_ENDPOINT}/products/${id}`)
    .then((res) => (res && res?.data ? res.data : null))
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
      throw error; // Ném lỗi để nơi gọi hàm xử lý
    });
};

export const getProducts = (
  page?: number,
  size?: number,
  producerId?: number,
  categoryId?: number,
  sortBy?: string,
  sortDirection?: string,
  search?: string
) => {
  return axiosInstance
    .get(`${BACKEND_ENDPOINT}/products`, {
      params: {
        page: page,
        size: size,
        categoryId: categoryId,
        producerId: producerId,
        sortBy: sortBy,
        sortDirection: sortDirection,
        search: search,
      },
    })
    .then((res) => (res && res?.data ? res.data : null))
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
      throw error; // Ném lỗi để nơi gọi hàm xử lý
    });
};
