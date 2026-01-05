import api from "../axios";

export const sendEmailOtp = async (email) => {
  try {
    const response = await api.post("/auth/send-otp", { email });
    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to send email OTP",
    };
  }
};

export const verifyEmailOtp = async ({ email, otp }) => {
  try {
    const response = await api.post("/auth/verify-otp", { email, otp });
    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to verify email OTP",
    };
  }
};
