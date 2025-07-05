"use server";

import { cookies } from "next/headers";
import api from "../axios";

export async function getAuctionsBySellerId() {
  try {
    const cookiesStore = await cookies();
    const userId = cookiesStore.get("userId").value;
    const response = await api.get(`auctions/seller/${userId}`);

    return response.data.data;
  } catch (error) {
    console.log("Error fetching auctions:", error);
    return [];
  }
}
