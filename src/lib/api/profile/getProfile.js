"use server";

import { cookies } from "next/headers";
import api from "../axios";

export async function getUserProfile() {
  try {
    const cookiesStore = await cookies();
    const userId = cookiesStore.get("userId")?.value;
    const role = cookiesStore.get("role")?.value;

    if (!userId) {
      return {
        success: false,
        data: null,
        message: "User ID not found in cookies. Please log in again.",
      };
    }

    // Choose endpoint based on role
    const endpoint = role === "buyer" ? "buyers/profile/" : "sellers/profile/";

    const response = await api.get(endpoint + userId);

    const userData = response.data.data;

    const date = new Date(userData?.createdAt);
    const options = { year: "numeric", month: "short" };
    const joinedDate = date.toLocaleString("en-US", options);

    const averageRating =
      userData?.reviews && userData.reviews.length > 0
        ? (
            userData.reviews.reduce(
              (sum, review) => sum + (review.rating || 0),
              0,
            ) / userData.reviews.length
          ).toFixed(1)
        : 0;

    const result = {
      success: true,
      data: {
        ...userData,
        joinedDate,
        averageRating,
      },
    };

    return result;
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Could not get user data.",
    };
  }
}
