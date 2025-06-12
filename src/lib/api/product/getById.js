"use server";

import api from "../axios";

export async function getProductById(id) {
  try {
    const response = await api.get(`products/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return [];
  }
}