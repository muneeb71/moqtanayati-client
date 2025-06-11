"use server";

import api from "../axios";

export async function getDraftProducts(storeId) {
  try {
    const response = await api.get(`products/store/${storeId}/drafts`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching draft products:", error);
    return [];
  }
}