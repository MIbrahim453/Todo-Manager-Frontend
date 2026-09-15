import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

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
    const isAuthRequest = error.config?.url?.includes("/auth/");

    if ((status === 401 || status === 403) && !isAuthRequest) {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("Refresh Token not found");
        }
        const res = await api.post("/auth/refresh-token", {
          refreshToken,
        });
        if (res?.data?.accessToken) {
          const { accessToken } = res.data;
          localStorage.setItem("accessToken", accessToken);

          const originalRequest = error.config;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          return await api(originalRequest);
        }
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
