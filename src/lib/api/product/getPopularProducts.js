"use server";

import api from "../axios";

export async function getPopularProducts() {
  try {
    const response = await api.get("products/popular");

    if (!response.data) {
      console.log("🔍 [getPopularProducts] No data in response");
      return {
        success: false,
        data: null,
        message: "Invalid response from server",
      };
    }

    const products = response.data.data || response.data;

    return {
      success: true,
      data: products,
      message: "Popular products fetched successfully",
    };
  } catch (error) {
    console.error(
      "🔍 [getPopularProducts] Error fetching popular products:",
      error,
    );
    return {
      success: false,
      data: null,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Could not fetch popular products data.",
    };
  }
}
