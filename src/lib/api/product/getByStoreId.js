"use server";

import api from "../axios";

export async function getProductsByStoreId(storeId) {
  try {
    const response = await api.get(`products/store/${storeId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
