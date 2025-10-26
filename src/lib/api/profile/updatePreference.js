"use server";

import { cookies } from "next/headers";
import api from "../axios";

export async function updateAuctionPreference(data) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return {
        success: false,
        data: null,
        message: "No authentication token found",
      };
    }

    const response = await api.put("buyers/preferences", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
        "Could not update auction preferences.",
    };
  }
}
