import api from "../axios";

export const sendEmailOtp = async (email) => {
  try {
    console.log("sending OTP for email:", email);

    const response = await api.post("/auth/send-otp", { email });

    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data,
    };
  } catch (error) {
    console.error("Error sending email OTP:", error.response?.data || error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to send email OTP",
    };
  }
};

export const verifyEmailOtp = async (email) => {
  try {
    console.log("verifying OTP for email:", email);

    const response = await api.post("/auth/verify-otp", email);

    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data,
    };
  } catch (error) {
    console.log("Error verifying email OTP:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to verify email OTP",
    };
  }
};
