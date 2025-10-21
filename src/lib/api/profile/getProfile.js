"use server";

import { cookies } from "next/headers";
import api from "../axios";

export async function getUserProfile() {
  try {
    console.log("🔍 [getUserProfile] Starting profile fetch...");

    const cookiesStore = await cookies();
    console.log("🔍 [getUserProfile] Cookies retrieved:", {
      hasCookies: !!cookiesStore,
      cookieNames: cookiesStore.getAll().map((c) => c.name),
    });

    const userId = cookiesStore.get("userId")?.value;
    console.log(
      "🔍 [getUserProfile] User ID from cookies:",
      userId ? `${userId.substring(0, 10)}...` : "null",
    );

    if (!userId) {
      console.error("🔍 [getUserProfile] No userId found in cookies");
      return {
        success: false,
        data: null,
        message: "User ID not found in cookies. Please log in again.",
      };
    }

    console.log(
      "🔍 [getUserProfile] Making API request to: sellers/profile/" + userId,
    );
    const response = await api.get("sellers/profile/" + userId);
    console.log("🔍 [getUserProfile] API response status:", response.status);
    console.log("🔍 [getUserProfile] API response data structure:", {
      hasData: !!response.data,
      dataKeys: response.data ? Object.keys(response.data) : "no data",
      hasUserData: !!response.data?.data,
    });

    const userData = response.data.data;
    console.log("🔍 [getUserProfile] User data extracted:", {
      hasUserData: !!userData,
      userDataKeys: userData ? Object.keys(userData) : "no user data",
      userId: userData?.id,
      userEmail: userData?.email,
    });

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

    console.log("🔍 [getUserProfile] Profile processing completed:", {
      joinedDate,
      averageRating,
      hasReviews: !!userData?.reviews?.length,
    });

    const result = {
      success: true,
      data: {
        ...userData,
        joinedDate,
        averageRating,
      },
    };

    console.log("🔍 [getUserProfile] Returning success result");
    return result;
  } catch (error) {
    console.error("🔍 [getUserProfile] Error occurred:", {
      errorMessage: error.message,
      errorStack: error.stack,
      responseStatus: error?.response?.status,
      responseData: error?.response?.data,
      errorCode: error?.code,
    });

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
