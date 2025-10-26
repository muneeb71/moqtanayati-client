"use client";

import api from "../axios";

export async function getUserOrdersClient(filter = "all") {
  try {
    console.log("🔍 [getUserOrdersClient] Fetching user orders...");

    // Read token from cookies
    let token = null;
    if (typeof document !== "undefined") {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; token=`);
      if (parts.length === 2) token = parts.pop().split(";").shift();
    }

    console.log("🔍 [getUserOrdersClient] Token present:", Boolean(token));

    const response = await api.get(`/orders`, {
      params: { filter },
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      withCredentials: true,
    });

    console.log("🔍 [getUserOrdersClient] Response:", response.data);
    console.log(
      "🔍 [getUserOrdersClient] Orders count:",
      response.data?.data?.length || 0,
    );

    return {
      success: response.data?.success !== false,
      data: response.data?.data || [],
      message: response.data?.message || "Orders fetched successfully",
    };
  } catch (error) {
    console.error("🔍 [getUserOrdersClient] Error:", error);
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
