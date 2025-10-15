"use client";
import api from "../axios";

export async function updateUserProfile({ userId, data }) {
  try {
    console.log("profile data  : ", data);

    const response = await api.patch("/sellers/profile/" + userId, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const userData = response.data.data;

    console.log("profile data res  : ", userData);

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
