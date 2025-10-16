"use client";

import api from "../axios";

export async function getSellerOrdersClient() {
  try {
    console.log("[getSellerOrdersClient] invoked");
    // Read token from cookies (same as server version expectation)
    let token = null;
    if (typeof document !== "undefined") {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; token=`);
      if (parts.length === 2) token = parts.pop().split(";").shift();
    }

    console.log("[getSellerOrdersClient] token present:", Boolean(token));
    const response = await api.get(`/orders/my-orders/detail`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      withCredentials: true,
    });
    console.log("[getSellerOrdersClient] response status:", response?.status);
    console.log(
      "[getSellerOrdersClient] orders count:",
      Array.isArray(response?.data?.data) ? response.data.data.length : 0,
    );
    return {
      success: response.data?.success !== false,
      data: response.data?.data || [],
      message: response.data?.message,
    };
  } catch (error) {
    console.log("[getSellerOrdersClient] error:", error?.message);
    console.log(
      "[getSellerOrdersClient] error.response:",
      error?.response?.data,
    );
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
