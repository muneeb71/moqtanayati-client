import api from "../axios";

export const sendEmailOtp = async (data) => {
  try {
    const response = await api.post('/auth/send-otp', data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // console.log("Error sending email OTP:", error);
    return {
      success: false,
      // error: error.response?.data?.message || 'Failed to send email OTP',
    };
  }
};

export const verifyEmailOtp = async (data) => {
  try {
    const response = await api.post('/auth/verify-otp', data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // console.log("Error verifying email OTP:", error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to verify email OTP',
    };
  }
}; 