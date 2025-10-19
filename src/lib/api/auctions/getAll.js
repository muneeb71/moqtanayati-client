"use server";

import api from "../axios";

export async function getAllAuctions() {
  try {
    const response = await api.get("auctions");
    console.log("auctions response from api 1 : ", response.data);
    console.log("auctions response from api 2 : ", response.data.data);
    return response.data.data;
  } catch (error) {
    console.log("Error fetching auctions:", error);
    return [];
  }
}
