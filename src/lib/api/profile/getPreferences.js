"use server";

import { cookies } from "next/headers";
import api from "../axios";

export async function getAuctionPreferences() {
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

    const response = await api.get("buyers/preferences", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response prefernces: ", response);
    console.log("response prefernces data: ", response.data);
    console.log("response prefernces data data: ", response.data.data);

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Could not fetch auction preferences.",
    };
  }
}
