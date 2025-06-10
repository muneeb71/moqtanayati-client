"use server";

import api from "../axios";

export async function addProduct(data) {
  try {
    const response = await api.post("products/", data);
    const productData = response.data.data;

    return {
      success: true,
      data: {
        ...productData,
      },
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Could not add product data.",
    };
  }
}
