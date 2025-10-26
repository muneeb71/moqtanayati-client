"use server";

import api from "./axios";

export async function getCategories() {
  try {
    const response = await api.get("products/category");

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
      message: "Categories fetched successfully",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Could not fetch categories data.",
    };
  }
}
