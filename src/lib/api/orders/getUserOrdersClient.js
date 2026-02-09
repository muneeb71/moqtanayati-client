"use client";

import { getCookie } from "cookies-next";
import api from "../axios";

export async function getUserOrdersClient(filter = "all") {
  try {
    const token = getCookie("token");
    const userId = getCookie("userId");

    if (!token || !userId) {
      return {
        success: false,
        data: [],
        message: "Sign in to view orders",
      };
    }

    const response = await api.get(`/orders`, {
      params: { filter },
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    return {
      success: response.data?.success !== false,
      data: response.data?.data || [],
      message: response.data?.message || "Orders fetched successfully",
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message:
        error?.response?.data?.message ||
        error.message ||
        "Failed to fetch orders",
    };
  }
}
