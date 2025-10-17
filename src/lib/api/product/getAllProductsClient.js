"use client";

import api from "../axios";

export async function getProductsClient() {
  try {
    console.log("🔍 [getProductsClient] Fetching all products...");

    const response = await api.get("products/");

    console.log("🔍 [getProductsClient] Response:", response.data);
    console.log(
      "🔍 [getProductsClient] Products count:",
      response.data?.data?.length || 0,
    );

    if (!response.data) {
      return {
        success: false,
        data: null,
        message: "Invalid response from server",
      };
    }

    return {
      success: true,
      data: response.data.data || response.data,
      message: "Products fetched successfully",
    };
  } catch (error) {
    console.error("🔍 [getProductsClient] Error:", error);
    return {
      success: false,
      data: null,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Could not fetch products data.",
    };
  }
}
