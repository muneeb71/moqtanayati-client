import api from "../axios";

export const sendPhoneOtp = async (phone) => {
  try {
    console.log("sending OTP for phone:", phone);

    const response = await api.post("/auth/send-otp", { phone });

    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data,
    };
  } catch (error) {
    console.error("Error sending phone OTP:", error.response?.data || error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to send phone OTP",
    };
  }
};

export const verifyPhoneOtp = async (phone) => {
  try {
    console.log("verifying OTP for phone:", phone);

    const response = await api.post("/auth/verify-otp", phone);

    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data,
    };
  } catch (error) {
    console.log("Error verifying phone OTP:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to verify phone OTP",
    };
  }
};
