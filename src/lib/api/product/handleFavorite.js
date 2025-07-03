"use server";

import api from "../axios";

export async function handleFavorite(productId) {    
  try {
    const response = await api.post(`/products/${productId}/favorite`, {});
    return response;
  } catch (error) {
    console.log("Error fetching product:", error);
    return [];
  }
}