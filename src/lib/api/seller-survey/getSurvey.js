"use client";

import api from "../axios";

export async function getSellerSurvey(userId) {
  try {
    if (!userId) {
      return { success: false, data: null, message: "Missing userId" };
    }
    const res = await api.get(`survey/${userId}`);
    return res?.data || { success: false, data: null };
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Failed to fetch survey",
    };
  }
}
