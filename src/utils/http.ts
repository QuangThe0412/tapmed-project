import {
  getAccessToken,
  getUserId,
  getUsername,
  isAuthenticated,
} from "@src/component/authentication/authUntils";
import axios from "axios";
import { API_BASE_URL } from "./contanst";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Origin-Device": "web",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers["IP-Address"] = localStorage.getItem("ipAddress") || "";

    if (isAuthenticated()) {
      config.headers["Authorization"] = `Bearer ${getAccessToken()}`;
    }

    const requestorId = getUserId();

    if (!!requestorId) {
      config.headers["RequestorId"] = requestorId;

      const currentPrams = config.params || {};

      config.params = {
        ...currentPrams,
        requestorId: requestorId,
      };
    }

    if (!!getUsername()) {
      config.headers["Username"] = getUsername();
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    let res = error.response;
    let originalRequest = error.config;

    if (res) {
      console.log("Error response:", res);
      const { data } = res;
      switch (res.status) {
        case 302:
          //Chuyển hướng đến URL khác.
          break;
        case 400:
          //Yêu cầu không hợp lệ.
          break;
        case 401:
          //Chưa xác thực hoặc token không hợp lệ.
          break;
        case 403:
          //Không có quyền truy cập tài nguyên.
          break;
        case 404:
          //Tài nguyên không tồn tại.
          break;
        case 409:
          //Xung đột trong yêu cầu.
          break;
        case 429:
          //Quá nhiều yêu cầu trong một khoảng thời gian ngắn (rate limit).
          break;
        case 440:
          //Phiên đăng nhập hết hạn (mã tùy chỉnh, không phải HTTP chuẩn).
          break;
        case 500:
          // toast.error(data.message);
          //Server gặp lỗi không xác định.
          break;
        case 503:
          //Server không thể xử lý yêu cầu do quá tải hoặc bảo trì.
          break;
        default:
      }
    }

    if (originalRequest?._retry) {
      return Promise.resolve(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
