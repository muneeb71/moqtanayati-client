"use server";

import api from "../axios";

export async function getAuctionById(id) {
  try {
    const response = await api.get(`/auctions/${id}`);

    return response.data.data;
  } catch (error) {
    console.log("Error fetching auctions:", error);
    return [];
  }
}
