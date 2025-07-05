"use server";

import { cookies } from "next/headers";
import api from "../axios";

export async function updateAuctionPreference(data) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    const response = await api.put(
      "sellers/profile/set/auction-preferences",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const userData = response.data.data;

    return {
      success: true,
      data: {
        ...userData,
      },
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Could not update password.",
    };
  }
}
