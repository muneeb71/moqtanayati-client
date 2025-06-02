"use server";

import api from "../axios";

export async function getUserProfile(userId) {
  try {
    const response = await api.get("sellers/profile/" + userId);

    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Could not get user data.",
    };
  }
}
