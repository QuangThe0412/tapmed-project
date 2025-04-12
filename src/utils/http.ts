import { refreshTokenEndpoint } from "@src/component/authentication/authEndpoint";
import { emitLogoutEvent } from "@src/component/authentication/authEvent";
import {
  getAccessToken,
  getRefreshToken,
  getUserId,
  getPhone,
  isAuthenticated,
  setAccessToken,
} from "@src/component/authentication/authUntils";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
let _retry = false;

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
    // let url = config.url || "";
    if (isAuthenticated()) {
      config.headers["Authorization"] = `Bearer ${getAccessToken()}`;

      const requestorId = getUserId();

      if (!!requestorId) {
        config.headers["RequestorId"] = requestorId;

        const currentPrams = config.params || {};

        config.params = {
          ...currentPrams,
          requestorId: requestorId,
        };
      }

      if (!!getPhone()) {
        config.headers["Username"] = getPhone();
      }
    }

    return config;
  },
  function (error) {
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
      switch (res.status) {
        case 302:
          //Chuyển hướng đến URL khác.
          break;
        case 400:
          //Yêu cầu không hợp lệ.
          break;
        case 401:
          const refreshToken = getRefreshToken();

          if (!refreshToken) {
            emitLogoutEvent();
          }

          if (!_retry) {
            _retry = true;

            delete axiosInstance.defaults.headers.common["Authorization"];

            try {
              const data = await refreshTokenEndpoint(refreshToken || "");
              if (data && data.accessToken) {
                const newAccessToken = data.accessToken;
                setAccessToken(newAccessToken);

                axiosInstance.defaults.headers.common[
                  "Authorization"
                ] = `Bearer ${newAccessToken}`;

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                error = await Promise.resolve(
                  await axiosInstance.request(originalRequest)
                );
              } else {
                emitLogoutEvent();
                toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
              }
            } catch (error) {
              emitLogoutEvent();
              toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
            }
          }

          _retry = false;
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
          toast.error(res.message);
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
