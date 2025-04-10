import { UserType } from "@src/component/authentication/useAuthStore";
import { BACKEND_ENDPOINT } from "@src/utils/contanst";
import axiosInstance from "@src/utils/http";

export const getUsersEndpoint = () => {
  return axiosInstance
    .get(`${BACKEND_ENDPOINT}/users`)
    .then((res) => (res && res?.data ? res.data : null))
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
      throw error; // Ném lỗi để nơi gọi hàm xử lý
    });
};

export const getUserByIdEndpoint = (id: number) => {
  return axiosInstance
    .get(`${BACKEND_ENDPOINT}/users/getById?id=${id}`)
    .then((res) => (res && res?.data ? res.data : null))
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
      throw error; // Ném lỗi để nơi gọi hàm xử lý
    });
};

export const deleteUserByIdEndpoint = (id: number) => {
  return axiosInstance
    .delete(`${BACKEND_ENDPOINT}/users/deleteById?id=${id}`)
    .then((res) => (res && res?.data ? res.data : null))
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
      throw error; // Ném lỗi để nơi gọi hàm xử lý
    });
};

//add user
export const addOrCreateUserEndpoint = (user: UserType | null) => {
  if (!user) {
    throw new Error("User không hợp lệ");
  }

  return axiosInstance
    .post(`${BACKEND_ENDPOINT}/users/createOrUpdate`, { ...user })
    .then((res) => (res && res?.data ? res.data : null))
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
      throw error; // Ném lỗi để nơi gọi hàm xử lý
    });
};
