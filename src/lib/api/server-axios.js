// lib/server-axios.js
import axios from "axios";
import { cookies } from "next/headers";

// Server-side axios instance with authentication
export const createServerApi = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    withCredentials: true,
    timeout: 10000, // 10 second timeout
  });
};

// Server-side API functions
export const getServerUserOrders = async () => {
  try {
    const api = createServerApi();
    const response = await api.get("/orders");
    return response.data;
  } catch (error) {
    console.log("Error fetching user orders:", error);
    throw error.response?.data || error;
  }
};
