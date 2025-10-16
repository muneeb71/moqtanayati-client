"use client";

import api from "../axios";

export async function updateUserProfile({ userId, data }) {
  try {
    console.log("profile data  : ", data.entries());
    console.log("Making request to: ", `/sellers/profile/${userId}`);

    // Try with explicit Content-Type like the working store upload
    const response = await api.patch(`/sellers/profile/${userId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("profile data res 0  : ", response);
    console.log("profile data res 1  : ", response.data);
    console.log("profile data res 2  : ", response.data.data);
    const userData = response.data.data;

    console.log("profile data res  : ", userData);

    return {
      success: true,
      data: {
        ...userData,
      },
    };
  } catch (error) {
    console.error("Profile update error:", error);
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    });

    // Log the full error response from backend
    if (error.response?.data) {
      console.error("Backend error response:", error.response.data);
    }

    return {
      success: false,
      data: null,
      message:
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        "Could not update user data.",
    };
  }
}
