"use server";

import api from "../axios";

export async function updateProductStock(id, stock) {
  try {
    const response = await api.patch(`products/${id}/stock`, { stock });
    return response.data.data;
  } catch (error) {
    console.log("Error fetching product:", error);
    return [];
  }
}
