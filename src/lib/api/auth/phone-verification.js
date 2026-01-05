import api from "../axios";

export const sendPhoneOtp = async ({ phone }) => {
  try {
    if (!phone || typeof phone !== "string") {
      throw new Error("Phone number is required and must be a string");
    }

    const response = await api.post("/auth/send-otp", { phone });

    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to send phone OTP",
    };
  }
};

export const verifyPhoneOtp = async ({ phone, otp }) => {
  try {
    const response = await api.post("/auth/verify-otp", { phone, otp });
    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Failed to verify phone OTP",
    };
  }
};
