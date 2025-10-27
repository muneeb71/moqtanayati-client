// lib/axios.ts
import axios from "axios";

// Helper function to get cookie value (client-side only)
const getCookie = (name) => {
  if (typeof window === "undefined") {
    // Server-side: return null, will be handled by server components
    return null;
  }

  // Client-side: use document.cookie
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000, // 10 second timeout
});

api.interceptors.request.use(
  async (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNREFUSED") {
      console.error(
        "❌ API Connection Error: Backend server is not running or unreachable",
      );
      console.error(
        "Please check if your backend server is running and the API URL is correct",
      );
      console.error("Current API URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
    }

    if (error.response?.status === 401) {
      console.log("Unauthorized");
    }

    return Promise.reject(error);
  },
);

export default api;
