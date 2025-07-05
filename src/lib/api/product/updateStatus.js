"use server";

import api from "../axios";

export async function updateProductStatus(id, status) {
  try {
    const response = await api.patch(`products/${id}/status`, { status });
    return response.data.data;
  } catch (error) {
    console.log("Error fetching product:", error);
    return [];
  }
}
