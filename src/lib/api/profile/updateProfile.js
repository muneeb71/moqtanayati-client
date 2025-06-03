"use server";

import { cookies } from "next/headers";
import api from "../axios";

export async function updateUserProfile({ userId, data }) {
  try {
    console.log("USER ID", userId);
    const response = await api.put("sellers/profile/" + userId, data);
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
        "Could not update user data.",
    };
  }
}
