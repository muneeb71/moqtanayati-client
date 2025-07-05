"use server";

import api from "../axios";

export async function getProducts() {
    try {
      const response = await api.get("products/");

  
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
        message: "Product fetched successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message:
          error?.response?.data?.message ||
          error.message ||
          "Could not fetch product data.",
      };
    }
  }
  