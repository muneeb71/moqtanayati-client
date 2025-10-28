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

console.log(
  "process.env.NEXT_PUBLIC_API_BASE_URL: ",
  process.env.NEXT_PUBLIC_API_BASE_URL,
);
if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  console.warn(
    "WARN: NEXT_PUBLIC_API_BASE_URL is not set. API calls will fail unless the backend URL is configured.",
  );
}

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

    // Don't set Content-Type for FormData - let browser handle it
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNREFUSED" || error.code === "ERR_NETWORK") {
      // Throttle repeated logs to avoid console spam
      if (!globalThis.__lastNetworkErrorLogAt)
        globalThis.__lastNetworkErrorLogAt = 0;
      const now = Date.now();
      if (now - globalThis.__lastNetworkErrorLogAt > 8000) {
        globalThis.__lastNetworkErrorLogAt = now;
        console.error(
          "❌ API Connection Error: Backend server is not running or unreachable",
        );
        console.error(
          "Please check if your backend server is running and the API URL is correct",
        );
        console.error("Current API URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
        if (error.config?.url) console.error("Request URL:", error.config.url);
        console.error("Full error:", error);
      }
    }

    if (error.response?.status === 401) {
      console.log("Unauthorized");
    }

    return Promise.reject(error);
  },
);

export default api;
