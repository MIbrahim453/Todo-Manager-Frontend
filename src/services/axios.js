import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
let refreshPromise = null;

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("Request Error:", error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const status = error.response?.status;
    const originalRequest = error.config;
    const isAuthRequest = originalRequest?.url?.includes("/auth/");

    if (
      (status === 401 || status === 403) &&
      !isAuthRequest &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("Refresh Token not found");
        }

        if (!refreshPromise) {
          refreshPromise = api
            .post("/auth/refresh-token", { refreshToken })
            .then((res) => res?.data?.accessToken)
            .finally(() => {
              refreshPromise = null;
            });
        }

        const accessToken = await refreshPromise;
        if (!accessToken) {
          throw new Error("Access Token was not returned");
        }

        localStorage.setItem("accessToken", accessToken);
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        console.error("Token refresh failed:", error);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
