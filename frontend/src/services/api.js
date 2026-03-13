import axios from "axios";

import { clearAuthStorage, getStoredAuth, persistAuth } from "../utils/storage";


const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

export const api = axios.create({
  baseURL,
});

const refreshClient = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const auth = getStoredAuth();
  if (auth?.access) {
    config.headers.Authorization = `Bearer ${auth.access}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const auth = getStoredAuth();
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      auth?.refresh &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const { data } = await refreshClient.post("/login/refresh", {
          refresh: auth.refresh,
        });
        const nextTokens = { access: data.access, refresh: data.refresh || auth.refresh };
        persistAuth(nextTokens);
        originalRequest.headers.Authorization = `Bearer ${nextTokens.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        clearAuthStorage();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

