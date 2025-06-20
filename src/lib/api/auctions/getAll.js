"use server";

import api from "../axios";

export async function getAllAuctions() {
  try {
    const response = await api.get("auctions");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching auctions:", error);
    return [];
  }
} 