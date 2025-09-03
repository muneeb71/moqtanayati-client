"use server";

import api from "../axios";
import { cookies } from "next/headers";

export async function getMyBids() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token").value;

    const response = await api.get("/auctions/bids", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: response.success,
      message: response.message,
      data: response.data,
    };
  } catch (e) {
    return {
      success: false,
      message: e.message,
    };
  }
}
