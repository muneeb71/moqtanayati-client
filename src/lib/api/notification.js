import api from "./axios";

// Helper to get cookie value (client-side only)
function getCookie(name) {
  if (typeof window === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export async function getUserNotifications() {
  try {
    const userId = getCookie("userId");
    if (!userId) {
      return {
        success: false,
        data: null,
        message: "User ID not found in cookies.",
      };
    }
    const response = await api.get(`/notification/user/${userId}`);
    if (!response.data) {
      return {
        success: false,
        data: null,
        message: "Invalid response from server",
      };
    }
    return {
      success: true,
      data: response.data.data || response.data,
      message: "Notifications fetched successfully",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Could not fetch notifications.",
    };
  }
} 