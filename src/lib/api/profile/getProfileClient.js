"use client";

import { getCookie } from "cookies-next";
import api from "../axios";

export async function getUserProfileClient() {
  try {
    console.log("🔍 [getUserProfileClient] Starting profile fetch...");

    const userId = getCookie("userId");
    const role = getCookie("role");
    const token = getCookie("token");

    console.log("🔍 [getUserProfileClient] User role from cookies:", role);
    console.log("🔍 [getUserProfileClient] Token present:", !!token);

    if (!userId) {
      console.error("🔍 [getUserProfileClient] No userId found in cookies");
      return {
        success: false,
        data: null,
        message: "User ID not found in cookies. Please log in again.",
      };
    }

    if (!token) {
      console.error("🔍 [getUserProfileClient] No token found in cookies");
      return {
        success: false,
        data: null,
        message: "Authentication token not found. Please log in again.",
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
    console.error("🔍 [getUserProfileClient] Error:", error);
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
