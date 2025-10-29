import api from "../axios";

export const sendPhoneOtp = async ({ phone }) => {
  try {
    console.log("sending OTP for phone:", phone);
    console.log("Request payload:", { phone });
    console.log("Phone type:", typeof phone);
    console.log("Phone length:", phone?.length);

    // Validate phone format
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
    console.error("Error sending phone OTP - Full error object:", error);
    console.error("Error sending phone OTP - Error message:", error.message);
    console.error("Error sending phone OTP - Error response:", error.response);
    console.error(
      "Error sending phone OTP - Error response data:",
      error.response?.data,
    );
    console.error(
      "Error sending phone OTP - Error response status:",
      error.response?.status,
    );
    console.error("Error sending phone OTP - Error code:", error.code);
    console.error("Error sending phone OTP - Error config:", error.config);

    // Log the request that was sent
    console.error("Error sending phone OTP - Request URL:", error.config?.url);
    console.error(
      "Error sending phone OTP - Request method:",
      error.config?.method,
    );
    console.error(
      "Error sending phone OTP - Request data:",
      error.config?.data,
    );
    console.error(
      "Error sending phone OTP - Request headers:",
      error.config?.headers,
    );

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
    console.log("verifying OTP for phone:", phone, "otp:", otp);

    const response = await api.post("/auth/verify-otp", { phone, otp });

    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data,
    };
  } catch (error) {
    console.error("Error verifying phone OTP:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      fullError: error,
    });
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Failed to verify phone OTP",
    };
  }
};
